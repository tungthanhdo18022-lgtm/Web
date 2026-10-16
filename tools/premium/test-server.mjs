#!/usr/bin/env node
/*
 * Tests for the Premium server (tools/premium/server/Code.gs), run in the Apps Script simulator
 * (tools/premium/sim.mjs). Only Node built-ins are used (node:test).
 *
 *   PREMIUM_PRIVATE_KEY_FILE=/path/outside/repo/private-key.json node tools/premium/test-server.mjs
 *   node tools/premium/test-server.mjs --key /path/outside/repo/private-key.json
 *
 * With the private key, the server runs with the site's real key pair (installed through the owner's menu) and
 * the file keys are wrapped with assets/premium-key.json exactly like tools/premium/encrypt.mjs does. Without it,
 * the license logic still runs, with a throw-away RSA key put straight into Script Properties, and the tests
 * that need the real key are skipped (they are listed as "skipped"). The private key is only read from the
 * given path: it is never printed, copied or written anywhere.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { createSim, startServer, CODE_GS_PATH } from './sim.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, '..', '..');
const SIM_PATH = path.join(HERE, 'sim.mjs');
const GUIDE_PATH = path.join(HERE, 'HUONG-DAN.md');
const CLIENT_PATH = path.join(REPO, 'assets', 'js', 'premium.js');
const SITE_KEY = JSON.parse(fs.readFileSync(path.join(REPO, 'assets', 'premium-key.json'), 'utf8'));
const SITE_PUBLIC = crypto.createPublicKey({ key: Buffer.from(SITE_KEY.spki, 'base64'), format: 'der', type: 'spki' });

const ALPHABET = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
const T0 = Date.parse('2026-10-12T08:00:00.000Z');
const DAY = 86400000;
const MIN = 60000;
const HOUR = 3600000;

/* ---------------- Private key (path only) ---------------- */
let keyFile = process.env.PREMIUM_PRIVATE_KEY_FILE || '';
const argv = process.argv.slice(2);
for (let i = 0; i < argv.length; i++) {
  if (argv[i] === '--key') keyFile = argv[++i] || '';
  else if (argv[i].startsWith('--key=')) keyFile = argv[i].slice(6);
}
let REAL = null; // { text, jwk } of the site's real private key
if (keyFile) {
  if (path.resolve(keyFile).startsWith(REPO + path.sep)) {
    throw new Error('The private key file must live OUTSIDE the repository (it is public). Move it and try again.');
  }
  const text = fs.readFileSync(keyFile, 'utf8');
  REAL = { text, jwk: JSON.parse(text) };
  const pub = crypto.createPublicKey(crypto.createPrivateKey({ key: REAL.jwk, format: 'jwk' }));
  if (pub.export({ format: 'der', type: 'spki' }).toString('base64') !== SITE_KEY.spki) {
    throw new Error('The private key given does not match assets/premium-key.json.');
  }
} else {
  console.log('# PREMIUM_PRIVATE_KEY_FILE / --key not given: using a throw-away key; tests that need the site key are skipped.');
}
const needReal = REAL ? false : 'needs the private key (PREMIUM_PRIVATE_KEY_FILE or --key)';

function throwAwayKey(kid) {
  const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 });
  const jwk = { ...privateKey.export({ format: 'jwk' }), kid, alg: 'RSA-OAEP-256' };
  return { jwk, text: JSON.stringify(jwk), publicKey };
}
const OTHER = throwAwayKey('other'); // a key that is NOT the site key
const SERVER = REAL ? { text: REAL.text, jwk: REAL.jwk, publicKey: SITE_PUBLIC } : throwAwayKey('test');

/* ---------------- Helpers ---------------- */
function makeSim({ moveAfterDays, now = T0, key = true } = {}) {
  const sim = createSim({ keyText: key && REAL ? REAL.text : undefined, moveAfterDays, now });
  if (key && !REAL) sim.setProperty('PRIVATE_KEY_JWK', SERVER.text);
  return sim;
}
/** No call to a missing Apps Script API, no write outside the lock, no uncaught error, no Apps Script error. */
function clean(sim, { allowThrown = false } = {}) {
  assert.deepEqual(sim.problems, [], 'simulator problems');
  if (!allowThrown) assert.deepEqual(sim.thrown, [], 'Apps Script errors raised during the test');
}
// A device is an RSA key pair (the browser makes it non-extractable); its id is "k_" + base64url(SHA-256(SPKI)).
const DEVICES = new Map(); // device id -> { spki: base64 SPKI, privateKey }
function newDevice() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 });
  const der = publicKey.export({ format: 'der', type: 'spki' });
  const id = 'k_' + crypto.createHash('sha256').update(der).digest('base64url');
  DEVICES.set(id, { spki: der.toString('base64'), privateKey });
  return id;
}
/** A random device id as made by pages before device keys (v1). */
const legacyDevice = () => crypto.randomBytes(16).toString('base64url');
const wrap = (publicKey, bytes) => crypto.publicEncrypt({ key: publicKey, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, oaepHash: 'sha256' }, bytes).toString('base64');
/** A request from device (an id from newDevice: its deviceKey is sent too). */
function req(action, code, device, extra = {}) {
  const d = DEVICES.get(device);
  return { action, code, device, ...(d ? { deviceKey: d.spki } : {}), info: 'Windows · Chrome', files: [], ...extra };
}
/** The AES keys of an ok answer (base64), unwrapped with the private key of the device they were wrapped for. */
function openKeys(r, device) {
  const d = DEVICES.get(device);
  assert.ok(d, 'unknown device');
  assert.equal(r.wrapped, true);
  const out = {};
  for (const [id, b64] of Object.entries(r.keys)) {
    out[id] = crypto.privateDecrypt({ key: d.privateKey, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, oaepHash: 'sha256' }, Buffer.from(b64, 'base64')).toString('base64');
  }
  return out;
}
function checkSymbolRef(data) {
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += (i + 1) * ALPHABET.indexOf(data[i]);
  return ALPHABET[sum % 31];
}
const display = (sym12) => 'TUNN-' + sym12.slice(0, 4) + '-' + sym12.slice(4, 8) + '-' + sym12.slice(8, 12);
const symbolsOf = (code) => code.replace(/^TUNN-/, '').replace(/-/g, '');
const iso = (ms) => new Date(ms).toISOString();
const time = (v) => (v instanceof Date ? v.getTime() : v);

const OK_KEYS = ['checkAfter', 'code', 'device', 'expires', 'keys', 'moved', 'ok', 'status', 'wrapped'];
function assertOk(r, { code, expires = null, moved = false, device } = {}) {
  assert.equal(r.ok, true, 'expected ok, got ' + JSON.stringify(r));
  assert.deepEqual(Object.keys(r).filter((k) => k !== 'bad').sort(), OK_KEYS);
  assert.equal(r.status, 'active');
  assert.equal(r.wrapped, true, 'keys are always wrapped for the device key');
  assert.match(r.device, /^k_[A-Za-z0-9_-]{43}$/);
  if (device) assert.equal(r.device, device);
  if (code) assert.equal(r.code, code);
  assert.match(r.code, /^TUNN-[0-9A-HJKMNP-TV-Z]{4}-[0-9A-HJKMNP-TV-Z]{4}-[0-9A-HJKMNP-TV-Z]{4}$/);
  assert.equal(r.expires, expires === null ? null : iso(expires));
  assert.equal(r.moved, moved);
  assert.equal(r.checkAfter, 86400);
  assert.equal(typeof r.keys, 'object');
  assert.ok(r.keys && !Array.isArray(r.keys));
  if ('bad' in r) assert.ok(Array.isArray(r.bad) && r.bad.length > 0);
}
function assertErr(r, error, { retryAfter } = {}) {
  assert.equal(r.ok, false, 'expected error ' + error + ', got ' + JSON.stringify(r).slice(0, 300));
  assert.equal(r.error, error, 'error code (' + r.message + ')');
  for (const k of Object.keys(r)) assert.ok(['ok', 'error', 'message', 'retryAfter'].includes(k), 'unexpected field ' + k);
  assert.equal(typeof r.message, 'string');
  assert.match(r.message, /^[\x20-\x7E]{10,300}$/, 'English sentence for the student');
  if (retryAfter === null) assert.ok(!('retryAfter' in r), 'no retryAfter expected');
  else if (retryAfter !== undefined) assert.equal(r.retryAfter, iso(retryAfter));
  assert.ok(!('keys' in r));
}

/* ================================================================================================
 * Code.gs source
 * ============================================================================================== */
test('Code.gs: parses, no raw U+2028/U+2029, no APIs that Apps Script lacks', () => {
  const src = fs.readFileSync(CODE_GS_PATH, 'utf8');
  new vm.Script(src, { filename: 'Code.gs' });
  assert.ok(!/[\u2028\u2029]/.test(src), 'raw U+2028 / U+2029 in Code.gs');
  assert.ok(!src.includes('﻿'), 'BOM in Code.gs');
  const code = src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '').replace(/\s\/\/\s.*$/gm, '');
  const forbidden = /\b(TextEncoder|TextDecoder|atob|btoa|fetch|require|structuredClone|Buffer|setTimeout|setInterval|queueMicrotask|crypto|XMLHttpRequest|process)\b/g;
  assert.deepEqual(code.match(forbidden) || [], []);
  assert.ok(!/^\s*(import|export)\s/m.test(code), 'ES module syntax');
  assert.ok(src.startsWith('/** @OnlyCurrentDoc */'), 'keeps the authorization scope to this spreadsheet');
});

test('Code.gs: embedded site public key equals assets/premium-key.json', () => {
  const src = fs.readFileSync(CODE_GS_PATH, 'utf8');
  assert.equal(/SITE_PUBLIC_KEY_SPKI:\s*'([^']*)'/.exec(src)[1], SITE_KEY.spki);
  assert.equal(/SITE_KEY_KID:\s*'([^']*)'/.exec(src)[1], SITE_KEY.kid);
});

test('simulator: execution contexts have no Node / browser globals', () => {
  const sim = makeSim({ key: false });
  const { context } = sim.callWithContext('checkSymbol_', '00000000000');
  for (const name of ['TextEncoder', 'TextDecoder', 'atob', 'btoa', 'fetch', 'require', 'Buffer', 'structuredClone', 'setTimeout', 'crypto', 'process', 'window']) {
    assert.equal(vm.runInContext('typeof ' + name, context), 'undefined', name);
  }
  assert.throws(() => vm.runInContext('SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Codes").getRangeList', context), /not an Apps Script API/);
  sim.problems.length = 0;
  clean(sim);
});

test('simulator: Utilities works on Java signed bytes and rejects unsigned ones', () => {
  const sim = makeSim({ key: false });
  const { context } = sim.callWithContext('checkSymbol_', '0');
  const run = (code) => JSON.parse(vm.runInContext('JSON.stringify(' + code + ')', context));
  const signed = (buf) => [...buf].map((b) => (b > 127 ? b - 256 : b));
  assert.deepEqual(run('Utilities.newBlob("é€A").getBytes()'), signed(Buffer.from('é€A', 'utf8')));
  assert.deepEqual(run('Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, "abc")'), signed(crypto.createHash('sha256').update('abc').digest()));
  assert.deepEqual(run('Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, [-1, 0, 127, -128])'), signed(crypto.createHash('sha256').update(Buffer.from([255, 0, 127, 128])).digest()));
  assert.equal(run('Utilities.base64Encode([-1, -2, 3])'), Buffer.from([255, 254, 3]).toString('base64'));
  assert.equal(run('Utilities.base64EncodeWebSafe([-5, -1, -65])'), Buffer.from([251, 255, 191]).toString('base64url') + '');
  assert.deepEqual(run('Utilities.base64Decode("//79")'), signed(Buffer.from('//79', 'base64')));
  assert.deepEqual(run('Utilities.base64DecodeWebSafe("__79")'), signed(Buffer.from('//79', 'base64')));
  assert.match(run('Utilities.getUuid()'), /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  assert.equal(run('Session.getScriptTimeZone()'), 'Asia/Ho_Chi_Minh');
  assert.throws(() => vm.runInContext('Utilities.base64Encode([200])', context), /signed Java bytes/);
  assert.throws(() => vm.runInContext('Utilities.computeDigest("SHA_256", "x")', context), /DigestAlgorithm/);
  assert.throws(() => vm.runInContext('Utilities.base64Decode("abc")', context), /Could not decode/);
  assert.throws(() => vm.runInContext('Utilities.formatString("%s", 1)', context), /not an Apps Script API/);
  assert.equal(vm.runInContext('typeof MailApp + typeof UrlFetchApp + typeof DriveApp', context), 'undefinedundefinedundefined');
  assert.equal(sim.problems.length, 3);
  sim.problems.length = 0;
  sim.thrown.length = 0;
  clean(sim);
});

test('simulator: fake clock, CacheService TTL / limits, LockService', () => {
  const sim = makeSim({ key: false });
  const { context } = sim.callWithContext('checkSymbol_', '0');
  const run = (code) => vm.runInContext(code, context);
  assert.equal(run('Date.now()'), T0);
  assert.equal(run('new Date().getTime()'), T0);
  assert.equal(run('new Date(5).getTime()'), 5);
  assert.equal(run('Object.prototype.toString.call(new Date())'), '[object Date]');
  sim.advance(1234);
  assert.equal(run('Date.now()'), T0 + 1234);
  assert.equal(run('Date()'), new Date(T0 + 1234).toString());

  run('CacheService.getScriptCache().put("a", "1", 2)');
  assert.equal(run('CacheService.getScriptCache().get("a")'), '1');
  sim.advance(1999);
  assert.equal(run('CacheService.getScriptCache().get("a")'), '1');
  sim.advance(1);
  assert.equal(run('CacheService.getScriptCache().get("a")'), null);
  run('CacheService.getScriptCache().putAll({ b: "2", c: "3" })');
  assert.equal(JSON.stringify(run('CacheService.getScriptCache().getAll(["b", "c", "d"])')), '{"b":"2","c":"3"}');
  sim.advance(600 * 1000);
  assert.equal(run('CacheService.getScriptCache().get("b")'), null, 'default expiration is 10 minutes');
  assert.throws(() => run('CacheService.getScriptCache().put("x".repeat(251), "1")'), /key/);
  assert.throws(() => run('CacheService.getScriptCache().put("big", "x".repeat(102401))'), /too large/);
  assert.throws(() => run('CacheService.getScriptCache().put("t", "1", 21601)'), /21600/);
  assert.throws(() => run('CacheService.getScriptCache().put("n", 5)'), /string/);
  assert.throws(() => run('PropertiesService.getScriptProperties().setProperty("p", "x".repeat(9300))'), /too large/);

  assert.equal(run('var l1 = LockService.getScriptLock(); l1.tryLock(100)'), true);
  assert.equal(run('LockService.getScriptLock().tryLock(100)'), false, 'held by another Lock');
  assert.throws(() => run('LockService.getScriptLock().waitLock(100)'), /Lock timeout/);
  assert.equal(run('l1.hasLock()'), true);
  run('l1.releaseLock()');
  sim.holdLock(true);
  assert.equal(run('LockService.getScriptLock().tryLock(10000)'), false);
  sim.holdLock(false);
  // Writing to a sheet without the lock is reported.
  assert.throws(() => run('SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Log").appendRow(["x"])'), /outside LockService/);
  assert.throws(() => run('SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Log").getRange(1, 1, 0, 1)'), /at least 1/);
  assert.throws(() => run('SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Log").getRange(1001, 1)'), /outside the dimensions/);
  assert.equal(sim.problems.length, 3, sim.problems.join(' | ')); // expiration, non-string value, write outside the lock
  sim.problems.length = 0;
  sim.thrown.length = 0;
  clean(sim);
});

/* ================================================================================================
 * Code format (spec section 3)
 * ============================================================================================== */
test('codes: check symbol test vectors', () => {
  const sim = makeSim({ key: false });
  const vectors = [
    ['00000000000', '0'],  // sum 0
    ['10000000000', '1'],  // 1*1 = 1
    ['00000000001', 'B'],  // 11*1 = 11 -> B
    ['11111111111', '4'],  // 1+2+...+11 = 66; 66 mod 31 = 4
    ['ZZZZZZZZZZZ', '0'],  // 31*66 = 2046 = 66*31 -> 0
    ['123456789AB', 'A'],  // 1^2+...+11^2 = 506; 506 mod 31 = 10 -> A
    ['7KQ4M2XD9HP', 'K'],  // 7+38+69+16+100+12+203+104+81+170+242 = 1042; 1042 mod 31 = 19 -> K
    ['0000000000Z', '0']   // 11*31 = 341, a multiple of 31 -> 0
  ];
  const { context } = sim.callWithContext('checkSymbol_', '00000000000');
  for (const [data, check] of vectors) {
    assert.equal(checkSymbolRef(data), check, 'reference ' + data);
    assert.equal(context.checkSymbol_(data), check, 'Code.gs ' + data);
    assert.equal(context.normalizeCode_(display(data + check)), display(data + check));
  }
  clean(sim);
});

test('codes: normalisation (case, spaces, dashes, O/0, I/L/1, prefix, checksum)', () => {
  const sim = makeSim({ key: false });
  const { context } = sim.callWithContext('checkSymbol_', '00000000000');
  const n = (s) => context.normalizeCode_(s);
  const C = 'TUNN-7KQ4-M2XD-9HPK';
  for (const input of [C, 'tunn-7kq4-m2xd-9hpk', ' TUNN 7KQ4 M2XD 9HPK ', 'TUNN7KQ4M2XD9HPK', '7KQ4-M2XD-9HPK', '7kq4m2xd9hpk',
    'tunn–7kq4—m2xd_9hpk', 'TUNN.7KQ4.M2XD.9HPK', '7KQ4 M2XD 9HPK\n', 'Tunn-7KQ4-M2XD-9HPK']) {
    assert.equal(n(input), C, JSON.stringify(input));
  }
  // O -> 0, I and L -> 1
  const withZeroOne = display('10000000000' + '1'); // TUNN-1000-0000-0001
  assert.equal(n('TUNN-IOOO-OOOO-OOOL'), withZeroOne);
  assert.equal(n('tunn-lOoO-0000-000i'), withZeroOne);
  assert.equal(n('TUNN-1000-0000-0001'), withZeroOne);
  // invalid
  for (const bad of ['', 'TUNN', 'TUNN-7KQ4-M2XD-9HP', 'TUNN-7KQ4-M2XD-9HPKK', 'TUNN-7KQ4-M2XD-9HPA', 'TUNN-7KQ4-M2XD-9HPU',
    'TUNNTUNN-7KQ4-M2XD-9HPK', 'XUNN-7KQ4-M2XD-9HPK', '7KQ4-M2XD-9HPK-0', 'TUNN-7KQ4-M2XD-9HPĶ', null, undefined, 12345, {}]) {
    assert.equal(n(bad), null, JSON.stringify(bad));
  }
  clean(sim);
});

test('codes: every single-character substitution and adjacent transposition is detected', () => {
  const sim = makeSim({ key: false });
  const { context } = sim.callWithContext('checkSymbol_', '00000000000');
  const sample = '7KQ4M2XD9HPK'; // no 0 / Z among the data symbols
  assert.equal(context.normalizeCode_(display(sample)), display(sample));
  let tried = 0;
  for (let i = 0; i < 12; i++) {
    for (const ch of ALPHABET + 'U') {
      if (ch === sample[i]) continue;
      const s = sample.slice(0, i) + ch + sample.slice(i + 1);
      assert.equal(context.normalizeCode_(display(s)), null, 'substitution ' + s);
      tried++;
    }
  }
  for (let i = 0; i < 11; i++) {
    if (sample[i] === sample[i + 1]) continue;
    const s = sample.slice(0, i) + sample[i + 1] + sample[i] + sample.slice(i + 2);
    assert.equal(context.normalizeCode_(display(s)), null, 'transposition ' + s);
    tried++;
  }
  assert.equal(tried, 12 * 32 + 11);

  // Over many random codes, the only undetected errors are the ones the spec's mod-31 check cannot see:
  // '0' <-> 'Z' (values 0 and 31) in a data position, or swapping adjacent '0' and 'Z' data symbols.
  const codes = sim.call('generateUniqueCodes_', 300, {});
  for (const code of codes) {
    const sym = symbolsOf(code);
    for (let i = 0; i < 12; i++) {
      for (const ch of ALPHABET) {
        if (ch === sym[i]) continue;
        const s = sym.slice(0, i) + ch + sym.slice(i + 1);
        if (context.normalizeCode_(s) !== null) {
          assert.ok(i < 11 && ((sym[i] === '0' && ch === 'Z') || (sym[i] === 'Z' && ch === '0')), 'undetected substitution ' + code + ' -> ' + s);
        }
      }
    }
    for (let i = 0; i < 11; i++) {
      if (sym[i] === sym[i + 1]) continue;
      const s = sym.slice(0, i) + sym[i + 1] + sym[i] + sym.slice(i + 2);
      if (context.normalizeCode_(s) !== null) {
        assert.ok(i < 10 && ((sym[i] + sym[i + 1]) === '0Z' || (sym[i] + sym[i + 1]) === 'Z0'), 'undetected transposition ' + code + ' -> ' + s);
      }
    }
  }
  // The known blind spot, made explicit (the spec's check symbol is mod 31 over 32 symbols).
  assert.equal(context.normalizeCode_('TUNN-Z000-0000-0000'), 'TUNN-Z000-0000-0000');
  clean(sim);
});

test('codes: assets/js/premium.js and Code.gs normalise every input the same way', () => {
  const sim = makeSim({ key: false });
  const { context } = sim.callWithContext('checkSymbol_', '00000000000');
  const client = loadClient({ sim }).Premium;
  const valid = sim.call('generateUniqueCodes_', 50, {});
  const inputs = ['', 'TUNN', 'tunn-', 'TUNN-7KQ4-M2XD-9HPK', '7kq4 m2xd 9hpk', 'TUNNTUNN7KQ4M2XD9HPK', 'TUNN7KQ4M2XD9HP',
    'tunn-iooo-oooo-oool', 'TUNN-TUNN-0000-000J', 'TUNNTUNN0000', 'TUNN0000000000000', 'ŦUNN-7KQ4-M2XD-9HPK',
    // whole messages pasted from a chat app
    'Mã Premium của em: TUNN-7KQ4-M2XD-9HPK', 'Your code: tunn 7kq4 m2xd 9hpk (valid 30 days)', 'TUNN-7KQ4-M2XD-9HPK.',
    'Code: 7KQ4-M2XD-9HPK', 'TUNN-7KQ4-M2XD-9HPKX', 'TUNN-7KQ4-M2XD-9HP K'];
  const rnd = (n) => crypto.randomInt(n);
  const pieces = ['TUNN', 'tunn', '-', ' ', '_', 'O', 'o', 'I', 'i', 'L', 'l', 'U', '0', '1', 'Z', 'é', '\t'];
  for (const code of valid) {
    inputs.push(code, code.toLowerCase(), symbolsOf(code), code.replace(/0/g, 'O').replace(/1/g, 'I'));
    for (let k = 0; k < 20; k++) {
      let s = rnd(2) ? code : symbolsOf(code);
      const pos = rnd(s.length + 1);
      s = rnd(2) ? s.slice(0, pos) + pieces[rnd(pieces.length)] + s.slice(pos) : s.slice(0, pos) + s.slice(pos + 1);
      inputs.push(s);
    }
  }
  for (let k = 0; k < 1500; k++) {
    let s = '';
    const len = rnd(22);
    for (let j = 0; j < len; j++) s += rnd(4) ? (ALPHABET + 'OILU-').charAt(rnd(37)) : pieces[rnd(pieces.length)];
    inputs.push(s);
  }
  let validCount = 0;
  for (const s of inputs) {
    const c = client.normalize(s);
    const server = context.normalizeCode_(s);
    assert.equal(c.ok ? c.code : null, server, 'input ' + JSON.stringify(s));
    if (server) validCount++;
  }
  assert.ok(validCount >= 200, 'enough valid inputs were compared (' + validCount + ')');
  clean(sim);
});

test('codes: 2000 generated codes are valid, unique, canonical and use every symbol', () => {
  const sim = makeSim({ key: false });
  const { context } = sim.callWithContext('checkSymbol_', '00000000000');
  const uuidBefore = sim.uuidCalls;
  const codes = sim.call('generateUniqueCodes_', 2000, {});
  assert.equal(codes.length, 2000);
  assert.equal(new Set(codes).size, 2000);
  assert.ok(sim.uuidCalls - uuidBefore >= 2000, 'random bits come from Utilities.getUuid()');
  const seen = Array.from({ length: 12 }, () => new Set());
  for (const code of codes) {
    assert.match(code, /^TUNN-[0-9A-HJKMNP-TV-Z]{4}-[0-9A-HJKMNP-TV-Z]{4}-[0-9A-HJKMNP-TV-Z]{4}$/);
    assert.equal(context.normalizeCode_(code), code);
    const sym = symbolsOf(code);
    assert.equal(sym[11], checkSymbolRef(sym.slice(0, 11)));
    [...sym].forEach((ch, i) => seen[i].add(ch));
  }
  for (let i = 0; i < 11; i++) assert.equal(seen[i].size, 32, 'data position ' + i + ' uses all 32 symbols');
  assert.equal(seen[11].size, 31, 'the check symbol takes 31 values (never Z)');
  // Existing codes are never generated again.
  const existing = {};
  for (const c of codes) existing[c] = true;
  const more = sim.call('generateUniqueCodes_', 200, existing);
  assert.ok(more.every((c) => !existing[c]));
  clean(sim);
});

/* ================================================================================================
 * Activation, devices, moves (spec section 5)
 * ============================================================================================== */
test('GET answers the service banner as JSON', () => {
  const sim = makeSim();
  assert.deepEqual(sim.doGet(), { ok: true, service: 'tunn.sat premium', version: 2 });
  assert.equal(sim.doGetRaw().mimeType, 'application/json');
  clean(sim);
});

test('activate binds the code to the device; the same device re-activates and refreshes', () => {
  const sim = makeSim();
  const [code] = sim.createCodes(1, 0, 'Lan');
  const dev = newDevice();
  const before = sim.codeRecord(code);
  assert.equal(before.Status, 'new');
  assert.equal(before.Device, '');

  const raw = sim.doPostRaw(req('activate', code.toLowerCase().replace(/-/g, ' '), dev, { info: 'iPhone · Safari' }));
  assert.equal(raw.mimeType, 'application/json');
  const r = JSON.parse(raw.content);
  assertOk(r, { code, expires: null });
  assert.deepEqual(r.keys, {});
  let row = sim.codeRecord(code);
  assert.equal(row.Status, 'active');
  assert.equal(row.Device, dev);
  assert.equal(row['Device info'], 'iPhone · Safari');
  assert.equal(time(row.Activated), T0);
  assert.equal(row.Expires, '');
  assert.equal(time(row['Last check']), T0);
  assert.equal(row.Moved, '');
  assert.equal(row.Moves, 0);
  assert.equal(row.Note, 'Lan');

  sim.advance(3 * DAY);
  assertOk(sim.doPost(req('activate', code, dev, { info: 'iPhone · Chrome' })), { code });
  sim.advance(DAY);
  assertOk(sim.doPost(req('refresh', code, dev, { info: 'iPhone · Chrome' })), { code });
  row = sim.codeRecord(code);
  assert.equal(time(row.Activated), T0, 'Activated is kept');
  assert.equal(time(row['Last check']), T0 + 4 * DAY);
  assert.equal(row['Device info'], 'iPhone · Chrome');
  assert.equal(row.Moves, 0);

  const log = sim.records('Log');
  assert.ok(log.some((l) => l.Action === 'activate' && l.Code === code && l.Device === dev && /^ok/.test(l.Result)));
  assert.ok(log.some((l) => l.Action === 'refresh' && l.Code === code && /^ok/.test(l.Result)));
  clean(sim);
});

test('another device gets "device" with retryAfter; moves after the wait; the old device is then refused', () => {
  const sim = makeSim();
  const [code] = sim.createCodes(1);
  const A = newDevice();
  const B = newDevice();
  assertOk(sim.doPost(req('activate', code, A)));

  sim.advance(2 * DAY);
  assertErr(sim.doPost(req('activate', code, B)), 'device', { retryAfter: T0 + 7 * DAY });
  assertErr(sim.doPost(req('refresh', code, B)), 'device', { retryAfter: T0 + 7 * DAY });
  assert.equal(sim.codeRecord(code).Device, A, 'nothing changed');

  sim.setNow(T0 + 7 * DAY - 1);
  assertErr(sim.doPost(req('activate', code, B)), 'device', { retryAfter: T0 + 7 * DAY });
  sim.setNow(T0 + 7 * DAY);
  assertErr(sim.doPost(req('refresh', code, B)), 'device'); // refresh never moves
  assert.equal(sim.codeRecord(code).Device, A);
  const moved = sim.doPost(req('activate', code, B, { info: 'Android · Chrome' }));
  assertOk(moved, { code, moved: true });
  let row = sim.codeRecord(code);
  assert.equal(row.Device, B);
  assert.equal(row['Device info'], 'Android · Chrome');
  assert.equal(time(row.Moved), T0 + 7 * DAY);
  assert.equal(row.Moves, 1);
  assert.equal(time(row.Activated), T0);

  // The old device: refresh -> device (client locks), and it cannot move back before Moved + 7 days.
  sim.advance(HOUR);
  assertErr(sim.doPost(req('refresh', code, A)), 'device', { retryAfter: T0 + 14 * DAY });
  assertErr(sim.doPost(req('activate', code, A)), 'device', { retryAfter: T0 + 14 * DAY });
  assertOk(sim.doPost(req('refresh', code, B)), { code });

  sim.setNow(T0 + 14 * DAY);
  assertOk(sim.doPost(req('activate', code, A)), { code, moved: true });
  row = sim.codeRecord(code);
  assert.equal(row.Device, A);
  assert.equal(row.Moves, 2);
  assertErr(sim.doPost(req('refresh', code, B)), 'device');
  assert.ok(sim.records('Log').some((l) => l.Result === 'ok (moved) · keys 0'));
  clean(sim);
});

test('"Move after days" = 0: only the owner can move a code (no retryAfter)', () => {
  const sim = makeSim({ moveAfterDays: 0 });
  const [code] = sim.createCodes(1);
  const A = newDevice();
  assertOk(sim.doPost(req('activate', code, A)));
  sim.advance(1000 * DAY);
  const r = sim.doPost(req('activate', code, newDevice()));
  assertErr(r, 'device', { retryAfter: null });
  assert.match(r.message, /site owner/);
  assert.equal(sim.codeRecord(code).Device, A);
  assert.equal(sim.codeRecord(code).Moves, 0);

  // A value typed by the owner in the Settings sheet is used: activated 1000 days ago, so a move is allowed now.
  sim.setSetting('Move after days', '3');
  assertOk(sim.doPost(req('activate', code, newDevice())), { code, moved: true });
  assertErr(sim.doPost(req('activate', code, newDevice())), 'device', { retryAfter: sim.now() + 3 * DAY });
  clean(sim);
});

test('status "new" + refresh -> device; refresh never binds', () => {
  const sim = makeSim();
  const [code] = sim.createCodes(1, 30);
  const dev = newDevice();
  const r = sim.doPost(req('refresh', code, dev));
  assertErr(r, 'device', { retryAfter: null });
  const row = sim.codeRecord(code);
  assert.equal(row.Status, 'new');
  assert.equal(row.Device, '');
  assert.equal(row.Activated, '');
  assert.equal(row.Expires, '');
  assert.equal(row['Last check'], '');
  clean(sim);
});

test('owner resets the device (menu): the old device is refused, a new one binds and the wait starts again', () => {
  const sim = makeSim();
  const [, code] = sim.createCodes(2, 30, 'Minh');
  const A = newDevice();
  const B = newDevice();
  assertOk(sim.doPost(req('activate', code, A)), { code, expires: T0 + 30 * DAY });
  sim.advance(10 * DAY);
  assertOk(sim.doPost(req('activate', code, B)), { code, moved: true, expires: T0 + 30 * DAY }); // self-service move
  sim.advance(DAY);

  sim.select('Codes', sim.codeRow(code));
  const out = sim.runMenu('Gỡ thiết bị của mã đang chọn', ['YES']);
  assert.match(out.alerts[0].message, new RegExp(code));
  assert.match(out.alerts.at(-1).message, /Đã gỡ thiết bị khỏi 1 mã/);
  let row = sim.codeRecord(code);
  assert.equal(row.Device, '');
  assert.equal(row['Device info'], '');
  assert.equal(row.Moved, '');
  assert.equal(row.Moves, 1, 'Moves is kept');
  assert.equal(time(row.Activated), T0);
  assert.equal(time(row.Expires), T0 + 30 * DAY, 'the end date does not change');
  assert.ok(sim.records('Log').some((l) => l.Action === 'reset' && l.Code === code && l.Device === B));

  assertErr(sim.doPost(req('refresh', code, B)), 'device', { retryAfter: null });
  const C = newDevice();
  assertOk(sim.doPost(req('activate', code, C)), { code, expires: T0 + 30 * DAY, moved: false });
  row = sim.codeRecord(code);
  assert.equal(row.Device, C);
  assert.equal(time(row.Activated), T0);
  assert.equal(time(row.Moved), T0 + 11 * DAY, 'binding after a reset restarts the move wait');
  // Another device cannot take the code over right away.
  assertErr(sim.doPost(req('activate', code, newDevice())), 'device', { retryAfter: T0 + 18 * DAY });

  // Answering NO changes nothing.
  sim.select('Codes', sim.codeRow(code));
  sim.runMenu('menuResetDevice', ['NO']);
  assert.equal(sim.codeRecord(code).Device, C);
  clean(sim);
});

test('notfound for a well-formed code that is not in the sheet; codes typed by hand still match', () => {
  const sim = makeSim();
  const dev = newDevice();
  assertErr(sim.doPost(req('activate', 'TUNN-7KQ4-M2XD-9HPK', dev)), 'notfound');
  assertErr(sim.doPost(req('refresh', 'TUNN-7KQ4-M2XD-9HPK', dev)), 'notfound');
  // The owner typed a code by hand, in lowercase without dashes.
  sim.appendRows('Codes', [["'tunn 7kq4 m2xd 9hpk", 'new', 0, 'typed', '', '', '', '', '', '', '', 0]]);
  assertOk(sim.doPost(req('activate', 'TUNN-7KQ4-M2XD-9HPK', dev)), { code: 'TUNN-7KQ4-M2XD-9HPK' });
  assert.equal(sim.records('Codes').at(-1).Device, dev);
  clean(sim);
});

/* ================================================================================================
 * Revocation and expiry
 * ============================================================================================== */
test('revoked codes (typed by the owner, any case / spaces) are refused for everyone', () => {
  const sim = makeSim();
  const codes = sim.createCodes(3);
  const dev = newDevice();
  const files = [{ id: 'geometry-a', key: wrap(SERVER.publicKey, crypto.randomBytes(32)) }];
  ['revoked', ' Revoked ', 'REVOKED'].forEach((typed, i) => {
    assertOk(sim.doPost(req('activate', codes[i], dev, { files })));
    sim.setCodeField(codes[i], 'Status', typed);
    assertErr(sim.doPost(req('refresh', codes[i], dev, { files })), 'revoked');
    assertErr(sim.doPost(req('activate', codes[i], dev, { files })), 'revoked');
    assertErr(sim.doPost(req('activate', codes[i], newDevice(), { files })), 'revoked');
  });
  // The owner turns one back on.
  sim.setCodeField(codes[0], 'Status', 'active');
  assertOk(sim.doPost(req('refresh', codes[0], dev)));
  clean(sim);
});

test('revoke through the menu ("Thu hồi mã đang chọn")', () => {
  const sim = makeSim();
  const codes = sim.createCodes(3);
  const dev = newDevice();
  assertOk(sim.doPost(req('activate', codes[1], dev)));
  // Select rows of codes[0] and codes[1] (two rows), answer NO first.
  sim.select('Codes', sim.codeRow(codes[0]), 2);
  sim.runMenu('Thu hồi mã đang chọn', ['NO']);
  assert.equal(sim.codeRecord(codes[1]).Status, 'active');
  const out = sim.runMenu('Thu hồi mã đang chọn', ['YES']);
  assert.match(out.alerts.at(-1).message, /Đã thu hồi 2 mã/);
  assert.equal(sim.codeRecord(codes[0]).Status, 'revoked');
  assert.equal(sim.codeRecord(codes[1]).Status, 'revoked');
  assert.equal(sim.codeRecord(codes[2]).Status, 'new');
  assertErr(sim.doPost(req('refresh', codes[1], dev)), 'revoked');
  assert.equal(sim.records('Log').filter((l) => l.Action === 'revoke').length, 2);

  // A selection across filtered-out (or hidden) rows only acts on the rows the owner can see.
  const more = sim.createCodes(3);
  const top = sim.codeRow(more[0]);
  sim.hideRows('Codes', [top + 1]);
  sim.select('Codes', top, 3);
  const filtered = sim.runMenu('Thu hồi mã đang chọn', ['YES']);
  assert.match(filtered.alerts[0].message, /^Thu hồi 2 mã sau\?/);
  assert.ok(!filtered.alerts[0].message.includes(more[1]));
  assert.deepEqual(more.map((c) => sim.codeRecord(c).Status), ['revoked', 'new', 'revoked']);
  sim.hideRows('Codes', [top + 1], { byFilter: false });
  sim.hideRows('Codes', []);
  sim.select('Codes', top, 3);
  sim.runMenu('Gỡ thiết bị của mã đang chọn', ['YES']);
  assert.ok(!sim.records('Log').some((l) => l.Action === 'reset' && l.Code === more[1]), 'hidden row untouched');
  sim.hideRows('Codes', [], { byFilter: false });
  // A single selected row is used even when hidden (the owner picked it).
  sim.hideRows('Codes', [top + 1]);
  sim.select('Codes', top + 1);
  sim.runMenu('Thu hồi mã đang chọn', ['YES']);
  assert.equal(sim.codeRecord(more[1]).Status, 'revoked');
  sim.hideRows('Codes', []);

  // Wrong selection: the header row, or another sheet.
  sim.select('Codes', 1);
  assert.match(sim.runMenu('menuRevokeSelected').alerts[0].message, /chưa chọn dòng nào/);
  sim.select('Log', 2);
  assert.match(sim.runMenu('menuRevokeSelected').alerts[0].message, /Codes/);
  clean(sim);
});

test('expiry: Days counts from activation; the server writes Expires and Status "expired"', () => {
  const sim = makeSim();
  const [code] = sim.createCodes(1, 30);
  const dev = newDevice();
  sim.advance(5 * DAY); // created earlier, activated later
  const act = T0 + 5 * DAY;
  assertOk(sim.doPost(req('activate', code, dev)), { code, expires: act + 30 * DAY });
  assert.equal(time(sim.codeRecord(code).Expires), act + 30 * DAY);

  sim.setNow(act + 30 * DAY);
  assertOk(sim.doPost(req('refresh', code, dev)), { code, expires: act + 30 * DAY }); // the last moment
  sim.setNow(act + 30 * DAY + 1);
  assertErr(sim.doPost(req('refresh', code, dev)), 'expired');
  assert.equal(sim.codeRecord(code).Status, 'expired');
  assertErr(sim.doPost(req('activate', code, dev)), 'expired');
  assertErr(sim.doPost(req('activate', code, newDevice())), 'expired');

  // Renewal: the owner moves Expires into the future.
  sim.setCodeField(code, 'Expires', '2027-06-01');
  const r = sim.doPost(req('refresh', code, dev));
  assertOk(r, { code, expires: time(sim.codeRecord(code).Expires) });
  assert.equal(sim.codeRecord(code).Status, 'active');
  clean(sim);
});

test('expiry: Days 0 or blank = lifetime; an Expires typed before activation also counts', () => {
  const sim = makeSim();
  const [life, blank, preset] = sim.createCodes(3, 0);
  sim.setCodeField(blank, 'Days', '');
  const dev = newDevice();
  assertOk(sim.doPost(req('activate', life, dev)), { expires: null });
  assertOk(sim.doPost(req('activate', blank, dev)), { expires: null });
  sim.advance(3650 * DAY);
  assertOk(sim.doPost(req('refresh', life, dev)), { expires: null });
  assertOk(sim.doPost(req('refresh', blank, dev)), { expires: null });
  assert.equal(sim.codeRecord(life).Expires, '');

  sim.setCodeField(preset, 'Expires', '2030-01-01');
  assertErr(sim.doPost(req('activate', preset, dev)), 'expired');
  assert.equal(sim.codeRecord(preset).Device, '', 'an expired code is not bound');
  clean(sim);
});

/* ================================================================================================
 * Rate limit
 * ============================================================================================== */
test('rate limit: 10 failures (notfound / invalid) within 15 minutes block the device for 15 minutes', () => {
  const sim = makeSim();
  const [code] = sim.createCodes(1);
  const X = newDevice();
  for (let i = 0; i < 9; i++) {
    sim.advance(MIN);
    assertErr(sim.doPost(req('activate', i % 2 ? 'TUNN-7KQ4-M2XD-9HPK' : 'TUNN-7KQ4-M2XD-9HPA', X)), i % 2 ? 'notfound' : 'invalid');
  }
  assertOk(sim.doPost(req('activate', code, X)), { code }); // success does not count
  sim.advance(MIN);
  const tenth = sim.now();
  assertErr(sim.doPost(req('activate', 'TUNN-7KQ4-M2XD-9HPK', X)), 'notfound');
  // Blocked now, even with a good code.
  assertErr(sim.doPost(req('refresh', code, X)), 'rate', { retryAfter: tenth + 15 * MIN });
  assertErr(sim.doPost(req('activate', 'TUNN-7KQ4-M2XD-9HPK', X)), 'rate', { retryAfter: tenth + 15 * MIN });
  // Other devices are not affected.
  assertErr(sim.doPost(req('activate', 'TUNN-7KQ4-M2XD-9HPK', newDevice())), 'notfound');
  assert.ok(sim.records('Log').some((l) => l.Action === 'rate' && l.Device === X));
  sim.setNow(tenth + 15 * MIN - 1);
  assertErr(sim.doPost(req('refresh', code, X)), 'rate');
  sim.setNow(tenth + 15 * MIN);
  assertOk(sim.doPost(req('refresh', code, X)), { code });
  clean(sim);
});

test('rate limit: sliding 15-minute window; device / revoked / expired errors do not count', () => {
  const sim = makeSim();
  const [code, other] = sim.createCodes(2, 1);
  const X = newDevice();
  for (let i = 0; i < 9; i++) assertErr(sim.doPost(req('activate', 'TUNN-7KQ4-M2XD-9HPK', X)), 'notfound');
  sim.advance(16 * MIN); // the first 9 left the window
  for (let i = 0; i < 9; i++) assertErr(sim.doPost(req('activate', 'TUNN-7KQ4-M2XD-9HPK', X)), 'notfound');
  sim.advance(10 * MIN); // still inside the window of the last 9
  assertErr(sim.doPost(req('activate', 'TUNN-7KQ4-M2XD-9HPK', X)), 'notfound');
  assertErr(sim.doPost(req('activate', code, X)), 'rate');

  const Y = newDevice();
  assertOk(sim.doPost(req('activate', other, newDevice())), { expires: sim.now() + DAY });
  sim.setCodeField(code, 'Status', 'revoked');
  for (let i = 0; i < 12; i++) assertErr(sim.doPost(req('activate', other, Y)), 'device');
  for (let i = 0; i < 12; i++) assertErr(sim.doPost(req('activate', code, Y)), 'revoked');
  sim.advance(2 * DAY);
  for (let i = 0; i < 12; i++) assertErr(sim.doPost(req('refresh', other, Y)), 'expired');
  assertErr(sim.doPost(req('activate', 'TUNN-7KQ4-M2XD-9HPK', Y)), 'notfound');
  clean(sim);
});

/* ================================================================================================
 * Concurrency (LockService + SpreadsheetApp.flush)
 * ============================================================================================== */
test('concurrency: two devices activating the same new code at the same moment cannot both win', () => {
  const sim = makeSim();
  const [code, code2] = sim.createCodes(2);
  const A = newDevice();
  const B = newDevice();

  // B's request arrives while A's request holds the lock, right after A read the (still empty) code row.
  // (Apps Script would make B wait up to 10 s for the lock and then answer "device"; the simulator cannot
  // suspend A, so B gets the "busy" answer at once. Either way B does not get the code.)
  let reads = 0;
  let during = null;
  sim.after('Range.getValues', (info) => {
    if (info.execution !== 'web' || !info.lockHeld) return false;
    if (++reads < 3) return false; // 1 = header, 2 = Code column, 3 = the code's row
    during = sim.doPost(req('activate', code, B));
    return true;
  });
  assertOk(sim.doPost(req('activate', code, A)), { code });
  assertErr(during, 'server');
  assert.match(during.message, /busy/);
  assert.equal(sim.codeRecord(code).Device, A);
  assertErr(sim.doPost(req('activate', code, B)), 'device');

  // B's request gets the lock the moment A's request releases it (A is still running): B must see A's
  // writes, which is why Code.gs flushes before releasing the lock (the simulator reports a missing flush).
  let next = null;
  sim.after('Lock.releaseLock', (info) => {
    if (info.execution !== 'web' || next) return false;
    next = sim.doPost(req('activate', code2, B));
    return true;
  });
  assertOk(sim.doPost(req('activate', code2, A)), { code: code2 });
  assertErr(next, 'device');
  assert.equal(sim.codeRecord(code2).Device, A);
  assert.equal(sim.codeRecord(code2).Moves, 0);
  clean(sim);
});

test('concurrency: the simulator reports a Code.gs that releases the lock without flushing', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'tunn-codegs-'));
  try {
    const src = fs.readFileSync(CODE_GS_PATH, 'utf8');
    assert.ok(src.includes('      SpreadsheetApp.flush();'), 'withLock_ flushes');
    const file = path.join(dir, 'Code.gs');
    fs.writeFileSync(file, src.replace('      SpreadsheetApp.flush();', '      // (flush removed)'));
    const sim = createSim({ codePath: file, now: T0 });
    assert.ok(sim.problems.some((p) => /released the script lock with unflushed sheet writes/.test(p)), sim.problems.join(' | '));
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

/* ================================================================================================
 * The owner edits the sheet by hand
 * ============================================================================================== */
test('owner edits: Status typed in Vietnamese or English, any case, accents or spaces; an unknown Status is refused', () => {
  const sim = makeSim();
  const cases = [
    ['thu hồi', 'revoked'], ['Đã thu hồi', 'revoked'], ['THU HOI', 'revoked'], ['thu hồi', 'revoked'],
    ['khóa', 'revoked'], ['Khoá', 'revoked'], ['hủy', 'revoked'], [' revoke ', 'revoked'], ['Disabled', 'revoked'],
    ['hết hạn', 'expired'], ['Expired ', 'expired'],
    ['mới', 'ok'], ['', 'ok'], ['NEW', 'ok'], ['đang dùng', 'ok'], [' Active', 'ok'],
    ['paid', 'server'], ['đã thanh toán', 'server'], [5, 'server'], ['revokedd', 'server']
  ];
  const codes = sim.createCodes(cases.length);
  cases.forEach(([typed, want], i) => {
    sim.setCodeField(codes[i], 'Status', typed);
    const dev = newDevice();
    const r = sim.doPost(req('activate', codes[i], dev));
    if (want === 'ok') {
      assertOk(r, { code: codes[i] });
      assert.equal(sim.codeRecord(codes[i]).Device, dev);
    } else {
      assertErr(r, want);
      assert.equal(sim.codeRecord(codes[i]).Device, '', typed + ': not bound');
    }
  });
  // An unknown Status: refused (no key is handed out), the owner's text is kept, the Log names the cell,
  // and it does not count towards the rate limit.
  const paid = codes[cases.findIndex((c) => c[0] === 'paid')];
  const r = sim.doPost(req('activate', paid, newDevice()));
  assert.match(r.message, /site owner/);
  assert.equal(sim.codeRecord(paid).Status, 'paid');
  assert.ok(sim.records('Log').some((l) => l.Code === paid && /^sheet \(dòng \d+: cột Status "paid" không phải new \/ active \/ expired \/ revoked\)$/.test(l.Result)));
  // A device already using a code keeps it (soft error) when the owner mistypes its Status.
  const [c] = sim.createCodes(1);
  const dev = newDevice();
  assertOk(sim.doPost(req('activate', c, dev)));
  sim.setCodeField(c, 'Status', 'ok?');
  assertErr(sim.doPost(req('refresh', c, dev)), 'server');
  sim.setCodeField(c, 'Status', 'active');
  assertOk(sim.doPost(req('refresh', c, dev)));
  assert.ok(!sim.cacheKeys().some((k) => k.startsWith('rb:')), 'no device was rate limited');
  // "Kiểm tra cài đặt" lists the rows the server cannot read.
  const check = sim.runMenu('Kiểm tra cài đặt').alerts[0];
  assert.match(check.title, /cần sửa \d+ mục/); // (with a throw-away key, the key check fails too)
  assert.match(check.message, /\[CẦN SỬA\] Trang Codes có 4 chỗ cần sửa/);
  assert.match(check.message, /cột Status "paid"/);
  assert.match(check.message, /cột Status "đã thanh toán"/);
  clean(sim);
});

test('owner edits: Days and date cells typed as text or numbers; unreadable cells are refused, never guessed', () => {
  const sim = makeSim();
  const local = (y, m, d, h = 0, mi = 0) => new Date(y, m - 1, d, h, mi).getTime();

  // Days typed as text.
  const daysCases = [['30 ngày', 30], ['30 ngay', 30], ['45 days', 45], ['7d', 7], ['1,5', 1.5], [' 10 ', 10], ['vĩnh viễn', 0], ['', 0], [0, 0], [90, 90]];
  const dayCodes = sim.createCodes(daysCases.length);
  daysCases.forEach(([typed, days], i) => {
    sim.setCodeField(dayCodes[i], 'Days', typed);
    assertOk(sim.doPost(req('activate', dayCodes[i], newDevice())), { code: dayCodes[i], expires: days ? T0 + days * DAY : null });
  });

  // Unreadable Days while it is needed (no Expires yet): refused, nothing written, the cell is named in the Log.
  const badDays = ['ba mươi ngày', '-5', '1 năm', true];
  const badDayCodes = sim.createCodes(badDays.length, 30);
  badDays.forEach((typed, i) => {
    sim.setCodeField(badDayCodes[i], 'Days', typed);
    const r = sim.doPost(req('activate', badDayCodes[i], newDevice()));
    assertErr(r, 'server');
    assert.match(r.message, /site owner/);
    const row = sim.codeRecord(badDayCodes[i]);
    assert.equal(row.Device, '');
    assert.equal(row.Status, 'new');
    assert.equal(row.Activated, '');
    assert.equal(row.Expires, '');
  });
  assert.ok(sim.records('Log').some((l) => /^sheet \(dòng \d+: cột Days "ba mươi ngày" không phải số ngày/.test(l.Result)));
  // ... but not needed once Expires is set.
  const [withExpires] = sim.createCodes(1, 30);
  sim.setCodeField(withExpires, 'Days', 'abc');
  sim.setCodeField(withExpires, 'Expires', new Date(T0 + 10 * DAY));
  assertOk(sim.doPost(req('activate', withExpires, newDevice())), { code: withExpires, expires: T0 + 10 * DAY });

  // Expires typed as text (Sheets did not recognise it as a date) or shown as a number.
  const textDates = [
    ["'31/12/2027", local(2027, 12, 31)],
    ["'31/12/2027 23:59", local(2027, 12, 31, 23, 59)],
    ["'31-12-2027", local(2027, 12, 31)],
    ["'12/31/2027", local(2027, 12, 31)],
    ["'2027-12-31", local(2027, 12, 31)],
    ["'2027-12-31 08:30", local(2027, 12, 31, 8, 30)],
    ["'2027.12.31", local(2027, 12, 31)],
    ["'2027-12-31T10:00:00Z", Date.parse('2027-12-31T10:00:00Z')],
    [new Date(Date.UTC(2027, 11, 31)), Date.UTC(2027, 11, 31)],
    [Date.UTC(2027, 11, 31) / DAY + 25569, Date.UTC(2027, 11, 31)]
  ];
  const dateCodes = sim.createCodes(textDates.length, 30);
  textDates.forEach(([typed, want], i) => {
    sim.setCodeField(dateCodes[i], 'Expires', typed);
    const before = sim.codeRecord(dateCodes[i]).Expires;
    assertOk(sim.doPost(req('activate', dateCodes[i], newDevice())), { code: dateCodes[i], expires: want });
    assert.deepEqual(sim.codeRecord(dateCodes[i]).Expires, before, 'the owner\'s Expires is kept');
  });

  // Unreadable dates: refused; the owner's value is NOT replaced by Activated + Days.
  const badDates = ["'31/02/2027", "'next year", "'2027-13-01", "'32/12/2027", "'1/2/27", 30, new Date(Date.UTC(1899, 11, 30, 8))];
  const badDateCodes = sim.createCodes(badDates.length, 30);
  badDates.forEach((typed, i) => {
    sim.setCodeField(badDateCodes[i], 'Expires', typed);
    const before = sim.codeRecord(badDateCodes[i]).Expires;
    assertErr(sim.doPost(req('activate', badDateCodes[i], newDevice())), 'server');
    const row = sim.codeRecord(badDateCodes[i]);
    assert.deepEqual(row.Expires, before);
    assert.equal(row.Device, '');
  });
  assert.ok(sim.records('Log').some((l) => /^sheet \(dòng \d+: cột Expires "31\/02\/2027" không phải ngày giờ hợp lệ/.test(l.Result)));

  // Activated / Moved broken on a code in use: soft "server" error; Last check is informational only.
  const [a, m, lc] = sim.createCodes(3, 30);
  const dev = newDevice();
  for (const c of [a, m, lc]) assertOk(sim.doPost(req('activate', c, dev)), { code: c, expires: T0 + 30 * DAY });
  sim.setCodeField(a, 'Activated', "'hôm qua");
  sim.setCodeField(m, 'Moved', "'abc");
  sim.setCodeField(lc, 'Last check', "'abc");
  assertErr(sim.doPost(req('refresh', a, dev)), 'server');
  assertErr(sim.doPost(req('activate', m, newDevice())), 'server');
  assertOk(sim.doPost(req('refresh', lc, dev)), { code: lc, expires: T0 + 30 * DAY });
  assert.equal(time(sim.codeRecord(lc)['Last check']), sim.now());

  const check = sim.runMenu('Kiểm tra cài đặt').alerts[0];
  assert.match(check.title, /cần sửa \d+ mục/);
  // 4 Days + 1 Days (withExpires) + 7 Expires + Activated + Moved
  assert.match(check.message, /\[CẦN SỬA\] Trang Codes có 14 chỗ cần sửa/);
  assert.match(check.message, /cột Days "ba mươi ngày"/);
  assert.match(check.message, /… và 4 chỗ khác/);
  clean(sim);
});

test('owner edits: rows deleted (even while a request runs), columns inserted, codes typed in any form', () => {
  const sim = makeSim();
  const codes = sim.createCodes(5);
  const A = newDevice();
  const B = newDevice();
  assertOk(sim.doPost(req('activate', codes[2], A)));
  sim.deleteRows('Codes', 2); // codes[0], between two requests
  assertOk(sim.doPost(req('refresh', codes[2], A)), { code: codes[2] });
  assert.equal(sim.codeRow(codes[0]), 0);

  // The owner deletes a row above while a request runs, after the server found the row of codes[3] and before
  // it read that row: the row now holds codes[4]. The server must notice and look again.
  let reads = 0;
  sim.after('Range.getValues', (info) => {
    if (info.execution !== 'web' || !info.lockHeld) return false;
    if (++reads < 2) return false; // 1 = header, 2 = Code column
    sim.deleteRows('Codes', 2); // codes[1]
    return true;
  });
  assertOk(sim.doPost(req('activate', codes[3], B)), { code: codes[3] });
  assert.equal(sim.codeRecord(codes[3]).Device, B);
  assert.equal(sim.codeRecord(codes[4]).Device, '', 'the code that moved up was not touched');
  assert.equal(sim.codeRecord(codes[2]).Device, A);

  // Rows keep moving under the server: it gives up after 3 tries ("busy"), writing nothing.
  const more = sim.createCodes(6);
  const top = sim.codeRow(more[0]);
  let n = 0;
  const stop = sim.after('Range.getValues', (info) => {
    if (info.execution !== 'web' || !info.lockHeld) return false;
    n++;
    if (n % 2 === 0) sim.deleteRows('Codes', top); // after every Code column read: more[0], more[1], more[2]
    return false;
  });
  const busy = sim.doPost(req('activate', more[5], B));
  stop();
  assertErr(busy, 'server');
  assert.match(busy.message, /busy/);
  assert.equal(sim.codeRecord(more[5]).Device, '');
  assert.equal(sim.codeRecord(more[3]).Device, '');
  assert.equal(sim.codeRow(more[2]), 0);
  assert.ok(sim.records('Log').some((l) => l.Result === 'busy (rows moved while reading)'));

  // Codes typed or pasted by hand: lowercase, spaces, O for 0, l for 1; an extra column after Moves is fine.
  const sym = '01010101010';
  const canonical = display(sym + checkSymbolRef(sym));
  const typed = '  ' + canonical.toLowerCase().replace(/0/g, 'o').replace(/1/g, 'l').replace(/-/g, ' ') + ' ';
  sim.appendRows('Codes', [["'" + typed, 'new', 0, 'typed', '', '', '', '', '', '', '', 0]]);
  sim.setCell('Codes', 1, 13, 'Phone');
  sim.setCell('Codes', sim.codeRow(codes[2]), 13, "'0900 000 000");
  const C = newDevice();
  assertOk(sim.doPost(req('activate', canonical, C)), { code: canonical });
  assert.equal(sim.records('Codes').at(-1).Device, C);
  assertOk(sim.doPost(req('refresh', codes[2], A)), { code: codes[2] });

  // "Kiểm tra cài đặt" points out duplicated and mistyped codes.
  sim.appendRows('Codes', [["'" + codes[2], 'new', 0, '', '', '', '', '', '', '', '', 0], ["'TUNN-0000-0000-0001", 'new', 0, '', '', '', '', '', '', '', '', 0]]);
  let check = sim.runMenu('Kiểm tra cài đặt').alerts[0];
  assert.match(check.message, new RegExp('mã ' + codes[2] + ' trùng với dòng \\d+'));
  assert.match(check.message, /cột Code "TUNN-0000-0000-0001" không phải mã hợp lệ/);

  // A column inserted in the middle: columns would be read wrongly, so every request is refused ("setup").
  sim.insertColumns('Codes', 2);
  assertErr(sim.doPost(req('refresh', codes[2], A)), 'setup');
  assertErr(sim.doPost(req('activate', more[4], newDevice())), 'setup');
  assert.equal(sim.records('Codes').find((r) => r[''] !== undefined && String(r.Code) === more[4]).Device, '');
  assert.ok(sim.records('Log').some((l) => l.Result === 'setup (Codes header changed)'));
  check = sim.runMenu('Kiểm tra cài đặt').alerts[0];
  assert.match(check.message, /Hàng tiêu đề của trang Codes khác mẫu/);
  assert.match(check.message, /bên phải cột Moves/);
  clean(sim);
});

test('create codes: rows beyond the first 1000 also get the Status dropdown and formats', () => {
  const sim = makeSim({ key: false });
  sim.createCodes(500);
  sim.createCodes(500);
  const last = sim.createCodes(100);
  assert.equal(sim.codeRow(last.at(-1)), 1101);
  const info = sim.sheetInfo('Codes');
  assert.ok(info.maxRows >= 1101);
  const covers = (r, row, col) => r.col <= col && r.col + r.numCols > col && r.row <= row && r.row + r.numRows > row;
  for (const row of [2, 1000, 1001, 1002, 1101]) {
    assert.ok(info.validations.some((v) => v.rule && covers(v, row, 2)), 'Status dropdown on row ' + row);
    assert.ok(info.formats.some((f) => f.kind === 'numberFormat' && f.value === 'yyyy-mm-dd hh:mm' && covers(f, row, 7)), 'Expires format on row ' + row);
  }
  clean(sim);
});

test('Code.gs: the Vietnamese accent table covers every vowel with every tone', () => {
  const sim = makeSim({ key: false });
  const { context } = sim.callWithContext('checkSymbol_', '0');
  const letters = vm.runInContext('VI_LETTERS_', context);
  const bases = vm.runInContext('VI_BASES_', context);
  assert.equal(letters.length, bases.length);
  assert.equal(new Set(letters).size, letters.length);
  for (let i = 0; i < letters.length; i++) {
    assert.equal(bases[i], letters[i] === 'đ' ? 'd' : letters[i].normalize('NFD')[0], letters[i]);
  }
  const needed = new Set(['đ']);
  for (const v of 'aăâeêioôơuưy') {
    for (const tone of ['', '̀', '́', '̣', '̉', '̃']) {
      const ch = (v + tone).normalize('NFC');
      if (ch.length === 1 && ch.charCodeAt(0) > 127) needed.add(ch);
    }
  }
  assert.deepEqual([...needed].filter((ch) => !letters.includes(ch)), []);
  assert.equal(letters.length, needed.size);
  for (const [text, word] of [['Đã Thu Hồi', 'dathuhoi'], ['ĐÃ THU HỒI', 'dathuhoi'], ['đã thu hồi'.normalize('NFD'), 'dathuhoi'], [' Vĩnh viễn ', 'vinhvien'], ['Hết hạn!', 'hethan']]) {
    assert.equal(sim.call('foldWord_', text), word, text);
  }
  clean(sim);
});

/* ================================================================================================
 * Malformed requests
 * ============================================================================================== */
test('malformed / oversized requests -> "invalid", without crashing or prototype pollution', () => {
  const sim = makeSim();
  const [code] = sim.createCodes(1);
  const dev = newDevice();
  const key = wrap(SERVER.publicKey, crypto.randomBytes(32));
  const good = req('activate', code, dev);
  const bodies = [
    '', ' ', 'not json', '{', '[', 'null', 'true', '123', '"text"', '[]', '{}', '[{"action":"activate"}]',
    JSON.stringify({ ...good, action: undefined }),
    JSON.stringify({ ...good, action: 'delete' }),
    JSON.stringify({ ...good, action: ['activate'] }),
    JSON.stringify({ ...good, device: undefined }),
    JSON.stringify({ ...good, device: 'short-id-15char' }),
    JSON.stringify({ ...good, device: 'x'.repeat(65) }),
    JSON.stringify({ ...good, device: 'AAAAAAAAAAAAAAAA+AAAAA' }),
    JSON.stringify({ ...good, device: 12345678901234567890 }),
    JSON.stringify({ ...good, code: undefined }),
    JSON.stringify({ ...good, code: 1234 }),
    JSON.stringify({ ...good, code: code + ' '.repeat(100) }),
    JSON.stringify({ ...good, code: 'TUNN-0000-0000-0001' }),
    JSON.stringify({ ...good, files: 'all' }),
    JSON.stringify({ ...good, files: { length: 1 } }),
    JSON.stringify({ ...good, files: [null] }),
    JSON.stringify({ ...good, files: [{ id: 'a' }] }),
    JSON.stringify({ ...good, files: [{ id: 'a', key: '' }] }),
    JSON.stringify({ ...good, files: [{ id: 'a', key: 5 }] }),
    JSON.stringify({ ...good, files: [{ id: '__proto__', key }] }),
    JSON.stringify({ ...good, files: [{ id: 'a'.repeat(81), key }] }),
    JSON.stringify({ ...good, files: [{ id: 'a/b', key }] }),
    JSON.stringify({ ...good, files: [{ id: '', key }] }),
    JSON.stringify({ ...good, files: [{ id: 'a', key: 'A'.repeat(1025) }] }),
    JSON.stringify({ ...good, files: Array.from({ length: 301 }, (_, i) => ({ id: 't' + i, key })) }),
    '{"__proto__": {"action":"activate","device":"' + dev + '","code":"' + code + '"}}',
    '{"constructor": {"prototype": {"polluted": 1}}, "action":"activate","device":"' + dev + '"}',
    JSON.stringify({ ...good, padding: 'x'.repeat(530000) })
  ];
  const baseline = vm.runInContext('Object.getOwnPropertyNames(Object.prototype).sort().join()', sim.callWithContext('checkSymbol_', '0').context);
  for (const body of bodies) {
    sim.clearCache(); // keep the rate limit out of this test
    const r = sim.doPost(body);
    assertErr(r, 'invalid');
    const ctx = sim.lastContext;
    assert.equal(vm.runInContext('Object.getOwnPropertyNames(Object.prototype).sort().join()', ctx), baseline, 'Object.prototype changed by ' + body.slice(0, 80));
    assert.equal(vm.runInContext('({}).polluted', ctx), undefined);
  }
  assert.equal(({}).polluted, undefined);
  assert.equal(sim.codeRecord(code).Status, 'new', 'no request changed the code');
  // An event without postData (e.g. run from the editor) is also "invalid".
  assertErr(sim.call('handleApiRequest_', undefined), 'invalid');
  assertErr(sim.call('handleApiRequest_', { postData: { contents: 42 } }), 'invalid');
  clean(sim);
});

test('unusual but valid input: long / hostile device info, odd file ids, other content types', () => {
  const sim = makeSim();
  const [code] = sim.createCodes(1);
  const dev = newDevice();
  const info = '=IMPORTXML("http://evil.example","//a")\u0000\u2028' + 'x'.repeat(500);
  const k1 = crypto.randomBytes(32);
  const k2 = crypto.randomBytes(32);
  const files = [
    { id: 'hasOwnProperty', key: wrap(SERVER.publicKey, k1) },
    { id: 'constructor', key: wrap(SERVER.publicKey, k2) },
    { id: 'hasOwnProperty', key: 'AAAA' }, // duplicate id: the first one wins
    { id: 'toString', key: 'AAAA' }
  ];
  const r = sim.doPost(req('activate', code, dev, { info, files }), 'application/json');
  assertOk(r, { code });
  const opened = openKeys(r, dev);
  assert.equal(opened.hasOwnProperty, k1.toString('base64'));
  assert.equal(opened.constructor, k2.toString('base64'));
  assert.deepEqual(r.bad, ['toString']);
  const row = sim.codeRecord(code);
  assert.ok(row['Device info'].length <= 80);
  assert.ok(row['Device info'].startsWith('=IMPORTXML('), 'kept as plain text, never a formula');
  assert.ok(!/[\u0000-\u001f\u2028\u2029]/.test(row['Device info']));
  // Missing info / files are fine.
  assertOk(sim.doPost({ action: 'refresh', code, device: dev, deviceKey: DEVICES.get(dev).spki }), { code });
  clean(sim);
});

/* ================================================================================================
 * File keys
 * ============================================================================================== */
test('keys: wrapped with assets/premium-key.json, the server returns exactly the same bytes', { skip: needReal }, () => {
  const sim = makeSim();
  const [code] = sim.createCodes(1);
  const dev = newDevice();
  const want = {};
  const files = [];
  for (let i = 0; i < 5; i++) {
    const k = crypto.randomBytes(32);
    want['test-' + i] = k.toString('base64');
    files.push({ id: 'test-' + i, key: wrap(SITE_PUBLIC, k) });
  }
  const r = sim.doPost(req('activate', code, dev, { files }));
  assertOk(r, { code });
  assert.deepEqual(openKeys(r, dev), want);
  assert.ok(!('bad' in r));
  clean(sim);
});

test('keys: 200 random keys (CRT / OAEP paths), then the 300-file maximum, cache hits and misses', () => {
  const sim = makeSim();
  const [code] = sim.createCodes(1);
  const dev = newDevice();
  const want = {};
  const files = [];
  for (let i = 0; i < 200; i++) {
    // Some keys with leading zero bytes / 0xFF bytes, to exercise padding of the big integers.
    const k = crypto.randomBytes(32);
    if (i % 10 === 1) k.fill(0, 0, 4);
    if (i % 10 === 2) k.fill(255, 0, 4);
    want['f' + i] = k.toString('base64');
    files.push({ id: 'f' + i, key: wrap(SERVER.publicKey, k) });
  }
  const r = sim.doPost(req('activate', code, dev, { files }));
  assertOk(r, { code });
  assert.deepEqual(openKeys(r, dev), want);
  const cached = sim.cacheKeys().filter((k) => k.startsWith('uk:'));
  assert.equal(cached.length, 200, 'unwrapped keys are cached');
  assert.ok(cached.every((k) => k.length <= 250));

  // Served from the cache (same answer); a damaged cache entry is ignored; an empty cache still works.
  assert.deepEqual(openKeys(sim.doPost(req('refresh', code, dev, { files })), dev), want);
  sim.clearCache();
  const more = files.concat(Array.from({ length: 100 }, (_, i) => {
    const k = crypto.randomBytes(32);
    want['g' + i] = k.toString('base64');
    return { id: 'g' + i, key: wrap(SERVER.publicKey, k) };
  }));
  assert.equal(more.length, 300);
  const r3 = sim.doPost(req('refresh', code, dev, { files: more }));
  assertOk(r3, { code });
  assert.deepEqual(openKeys(r3, dev), want);
  clean(sim);
});

test('keys: damaged keys, keys wrapped for another RSA key and wrong lengths land in "bad"', () => {
  const sim = makeSim();
  const [code] = sim.createCodes(1);
  const dev = newDevice();
  const k = crypto.randomBytes(32);
  const good = wrap(SERVER.publicKey, k);
  const bytes = Buffer.from(good, 'base64');
  const flip = (i) => { const b = Buffer.from(bytes); b[i] ^= 0x01; return b.toString('base64'); };
  const modulus = Buffer.from(SERVER.jwk.n, 'base64url');
  const files = [
    { id: 'good', key: good },
    { id: 'good-url', key: Buffer.from(good, 'base64').toString('base64url') },
    { id: 'flip-middle', key: flip(128) },
    { id: 'flip-first', key: flip(0) },
    { id: 'flip-last', key: flip(255) },
    { id: 'short', key: bytes.subarray(0, 255).toString('base64') },
    { id: 'long', key: Buffer.concat([bytes, Buffer.from([1])]).toString('base64') },
    { id: 'zeros', key: Buffer.alloc(256).toString('base64') },
    { id: 'modulus', key: modulus.toString('base64') },
    { id: 'all-ff', key: Buffer.alloc(256, 255).toString('base64') },
    { id: 'not-base64', key: '!!!!' + good.slice(4) },
    { id: 'other-key', key: wrap(OTHER.publicKey, k) },
    { id: 'len-16', key: wrap(SERVER.publicKey, crypto.randomBytes(16)) },
    { id: 'len-33', key: wrap(SERVER.publicKey, crypto.randomBytes(33)) },
    { id: 'len-0', key: wrap(SERVER.publicKey, Buffer.alloc(0)) },
    { id: 'pkcs1', key: crypto.publicEncrypt({ key: SERVER.publicKey, padding: crypto.constants.RSA_PKCS1_PADDING }, k).toString('base64') },
    { id: 'oaep-sha1', key: crypto.publicEncrypt({ key: SERVER.publicKey, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, oaepHash: 'sha1' }, k).toString('base64') }
  ];
  const r = sim.doPost(req('activate', code, dev, { files }));
  assertOk(r, { code });
  assert.deepEqual(openKeys(r, dev), { good: k.toString('base64'), 'good-url': k.toString('base64') });
  assert.deepEqual(r.bad.slice().sort(), files.map((f) => f.id).filter((id) => !id.startsWith('good')).sort());
  clean(sim);
});

/** EME-OAEP (RFC 8017, SHA-256, empty label) written independently of Code.gs, with knobs to break it. */
function mgf1(seed, len) {
  const out = [];
  for (let c = 0; out.length < len; c++) {
    const ctr = Buffer.alloc(4);
    ctr.writeUInt32BE(c);
    out.push(...crypto.createHash('sha256').update(Buffer.concat([seed, ctr])).digest());
  }
  return Buffer.from(out.slice(0, len));
}
const xorBuf = (a, b) => Buffer.from(a.map((x, i) => x ^ b[i]));
function oaepEncode(msg, k, { lHash, first = 0, sep = 1, ps = (p) => p } = {}) {
  const hLen = 32;
  const db = Buffer.concat([lHash || crypto.createHash('sha256').update(Buffer.alloc(0)).digest(),
    ps(Buffer.alloc(k - msg.length - 2 * hLen - 2)), Buffer.from([sep]), msg]);
  const seed = crypto.randomBytes(hLen);
  const maskedDb = xorBuf(db, mgf1(seed, k - hLen - 1));
  return Buffer.concat([Buffer.from([first]), xorBuf(seed, mgf1(maskedDb, hLen)), maskedDb]);
}
const rawRsa = (em) => crypto.publicEncrypt({ key: SERVER.publicKey, padding: crypto.constants.RSA_NO_PADDING }, em).toString('base64');

test('keys: hand-made OAEP encodings (raw RSA): only a correct encoding of a 32-byte key is accepted', () => {
  const sim = makeSim();
  const [code] = sim.createCodes(1);
  const dev = newDevice();
  const k = 256;
  const priv = crypto.createPrivateKey({ key: SERVER.jwk, format: 'jwk' });
  const want = {};
  const files = [];
  for (let i = 0; i < 100; i++) {
    const aes = crypto.randomBytes(32);
    const em = oaepEncode(aes, k);
    const key = rawRsa(em);
    // The independent encoder agrees with OpenSSL's OAEP decoder.
    assert.deepEqual(crypto.privateDecrypt({ key: priv, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, oaepHash: 'sha256' }, Buffer.from(key, 'base64')), aes);
    want['ok' + i] = aes.toString('base64');
    files.push({ id: 'ok' + i, key });
  }
  const aes = crypto.randomBytes(32);
  const broken = {
    'first-byte-1': oaepEncode(aes, k, { first: 1 }),
    'first-byte-80': oaepEncode(aes, k, { first: 0x80 }),
    'other-label': oaepEncode(aes, k, { lHash: crypto.createHash('sha256').update('tunn').digest() }),
    'ps-not-zero': oaepEncode(aes, k, { ps: (p) => { p[5] = 7; return p; } }),
    'ps-last-not-zero': oaepEncode(aes, k, { ps: (p) => { p[p.length - 1] = 0xff; return p; } }),
    'separator-2': oaepEncode(aes, k, { sep: 2 }),
    'no-separator': oaepEncode(Buffer.alloc(32), k, { sep: 0 }),
    'message-31': oaepEncode(aes.subarray(0, 31), k),
    'message-33': oaepEncode(Buffer.concat([aes, Buffer.from([9])]), k),
    'message-empty': oaepEncode(Buffer.alloc(0), k),
    'one': Buffer.concat([Buffer.alloc(255), Buffer.from([1])]),
    'em-all-zero-but-first': Buffer.concat([Buffer.from([0]), Buffer.alloc(255, 0x11)])
  };
  for (const [id, em] of Object.entries(broken)) {
    assert.equal(em.length, k, id);
    files.push({ id, key: id === 'one' ? em.toString('base64') : rawRsa(em) });
  }
  const r = sim.doPost(req('activate', code, dev, { files }));
  assertOk(r, { code });
  assert.deepEqual(openKeys(r, dev), want);
  assert.deepEqual(r.bad.slice().sort(), Object.keys(broken).sort());
  clean(sim);
});

test('keys are only unwrapped after the license checks pass (no decryption oracle)', () => {
  const sim = makeSim();
  const [code, revoked] = sim.createCodes(2);
  const files = [{ id: 'x', key: wrap(SERVER.publicKey, crypto.randomBytes(32)) }];
  assertOk(sim.doPost(req('activate', code, newDevice())));
  sim.setCodeField(revoked, 'Status', 'revoked');
  const stranger = newDevice();
  assertErr(sim.doPost(req('activate', code, stranger, { files })), 'device');
  assertErr(sim.doPost(req('activate', revoked, stranger, { files })), 'revoked');
  assertErr(sim.doPost(req('activate', 'TUNN-7KQ4-M2XD-9HPK', stranger, { files })), 'notfound');
  assertErr(sim.doPost(req('refresh', sim.createCodes(1)[0], stranger, { files })), 'device');
  // A row the server cannot read, or a changed header: refused before any key is unwrapped.
  const [odd] = sim.createCodes(1);
  sim.setCodeField(odd, 'Status', 'paid?');
  assertErr(sim.doPost(req('activate', odd, stranger, { files })), 'server');
  sim.setCell('Codes', 1, 'Moves', 'Moves count');
  assertErr(sim.doPost(req('activate', code, stranger, { files })), 'setup');
  assert.deepEqual(sim.cacheKeys().filter((k) => k.startsWith('uk:')), [], 'no key was unwrapped');
  clean(sim);
});

/* ================================================================================================
 * Setup, menus, sheets
 * ============================================================================================== */
test('setup: no private key -> "setup"; a broken stored key -> "setup"; no Codes sheet -> "setup"', () => {
  const sim = makeSim({ key: false });
  const [code] = sim.createCodes(1);
  const dev = newDevice();
  assertErr(sim.doPost(req('activate', code, dev)), 'setup');
  assertErr(sim.doPost(req('refresh', code, dev)), 'setup');
  assert.equal(sim.codeRecord(code).Device, '');
  assert.ok(sim.records('Log').some((l) => /^setup \(no private key\)/.test(l.Result)));
  const check = sim.runMenu('Kiểm tra cài đặt').alerts[0];
  assert.match(check.title, /cần sửa 1 mục/);
  assert.match(check.message, /Chưa cài khóa bí mật/);

  sim.setProperty('PRIVATE_KEY_JWK', '{"kty":"RSA","n":"broken"}');
  assertErr(sim.doPost(req('activate', code, dev)), 'setup');

  const sim2 = makeSim();
  sim2.deleteSheet('Codes');
  assertErr(sim2.doPost(req('activate', 'TUNN-7KQ4-M2XD-9HPK', dev)), 'setup');
  clean(sim);
  clean(sim2);
});

test('install key: a key that does not match the site key, the public key, junk and damaged keys are refused', () => {
  const sim = makeSim({ key: false });
  const refused = (text, pattern) => {
    const out = sim.installKey(text);
    const alert = out.alerts.at(-1);
    assert.equal(alert.title, 'Chưa cài được khóa');
    assert.match(alert.message, pattern);
    assert.equal(sim.property('PRIVATE_KEY_JWK'), null, 'nothing stored');
    for (const part of ['n', 'd', 'p', 'q', 'dp', 'dq', 'qi']) {
      if (OTHER.jwk[part]) assert.ok(!alert.message.includes(OTHER.jwk[part].slice(0, 16)), 'no key material in the message');
    }
  };
  refused(OTHER.text, /KHÔNG khớp/);
  refused(fs.readFileSync(path.join(REPO, 'assets', 'premium-key.json'), 'utf8'), /CÔNG KHAI/);
  refused('', /chưa dán/);
  refused('hello', /Không tìm thấy/);
  refused('{"kty":"RSA","n":"abc"', /Không tìm thấy|bị lỗi/);
  refused(JSON.stringify({ ...OTHER.jwk, d: undefined }), /CÔNG KHAI/);
  refused(JSON.stringify({ ...OTHER.jwk, qi: undefined }), /thiếu phần "qi"/);
  refused(JSON.stringify({ ...OTHER.jwk, dp: OTHER.jwk.dq }), /không khớp nhau/);
  refused(JSON.stringify({ ...OTHER.jwk, kty: 'EC' }), /không phải khóa RSA/);
  const log = sim.records('Log').filter((l) => l.Action === 'install-key');
  assert.ok(log.length >= 9 && log.every((l) => l.Result === 'failed'));
  // Cancel at the prompt: nothing happens.
  sim.runMenu('Cài đặt khóa bí mật…', [null]);
  assert.equal(sim.property('PRIVATE_KEY_JWK'), null);
  clean(sim);
});

test('install key: the site private key is accepted through the menu, then "Kiểm tra cài đặt" is all OK', { skip: needReal }, () => {
  const sim = makeSim({ key: false });
  const out = sim.runMenu('Cài đặt khóa bí mật…', [REAL.text]);
  assert.equal(out.prompts.length, 1);
  assert.equal(out.alerts.at(-1).title, 'Đã cài khóa bí mật');
  const stored = JSON.parse(sim.property('PRIVATE_KEY_JWK'));
  for (const k of ['n', 'e', 'd', 'p', 'q', 'dp', 'dq', 'qi', 'kid']) assert.equal(stored[k], REAL.jwk[k], 'stored ' + k);
  const check = sim.runMenu('Kiểm tra cài đặt').alerts[0];
  assert.equal(check.title, 'Kiểm tra cài đặt: OK');
  assert.match(check.message, /Khóa khớp với khóa công khai/);
  assert.match(check.message, /Tự kiểm tra mã hóa\/giải mã: OK/);
  assert.ok(!/CẦN SỬA/.test(check.message));
  // Replacing asks first; NO keeps the installed key; a wrong key is still refused.
  const again = sim.runMenu('menuInstallPrivateKey', ['NO']);
  assert.equal(again.alerts[0].buttons, 'YES_NO');
  sim.installKey(OTHER.text);
  assert.equal(JSON.parse(sim.property('PRIVATE_KEY_JWK')).d, REAL.jwk.d);
  // A key pasted with extra text and line breaks around it (copied from an editor) is fine.
  sim.installKey('\n  ' + JSON.stringify(REAL.jwk, null, 2) + '\n');
  assert.equal(JSON.parse(sim.property('PRIVATE_KEY_JWK')).d, REAL.jwk.d);
  clean(sim);
});

test('create codes menu ("Tạo mã mới…"): rows, dialog, validation of the answers', () => {
  const sim = makeSim();
  const out = sim.runMenu('Tạo mã mới…', ['5', '30', 'Nguyễn Văn A =SUM(1)']);
  assert.equal(out.prompts.length, 3);
  const dialog = out.dialogs[0];
  assert.match(dialog.title, /5 mã mới/);
  const codes = dialog.html.match(/TUNN-[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{4}/g);
  assert.equal(codes.length, 5);
  const { context } = sim.callWithContext('checkSymbol_', '0');
  const rows = sim.records('Codes');
  assert.equal(rows.length, 5);
  rows.forEach((row, i) => {
    assert.equal(row.Code, codes[i]);
    assert.equal(context.normalizeCode_(row.Code), row.Code);
    assert.equal(row.Status, 'new');
    assert.equal(row.Days, 30);
    assert.equal(row.Note, 'Nguyễn Văn A =SUM(1)');
    assert.equal(time(row.Created), T0);
    for (const h of ['Activated', 'Expires', 'Device', 'Device info', 'Last check', 'Moved']) assert.equal(row[h], '');
    assert.equal(row.Moves, 0);
  });
  assert.ok(sim.records('Log').some((l) => l.Action === 'create' && /created 5 code/.test(l.Result)));

  // Lifetime with an empty Days answer; long note is cut to 200 characters.
  const life = sim.runMenu('menuCreateCodes', ['1', '', 'n'.repeat(300)]);
  assert.match(life.dialogs[0].html, /vĩnh viễn/);
  assert.equal(sim.records('Codes').at(-1).Days, 0);
  assert.equal(sim.records('Codes').at(-1).Note.length, 200);

  for (const bad of ['0', '501', 'abc', '', '2.5', '-1']) {
    const r = sim.runMenu('menuCreateCodes', [bad]);
    assert.equal(r.alerts[0].title, 'Số lượng không hợp lệ', bad);
  }
  for (const bad of ['-1', 'x', '1.5', '36501']) {
    const r = sim.runMenu('menuCreateCodes', ['1', bad]);
    assert.equal(r.alerts[0].title, 'Số ngày không hợp lệ', bad);
  }
  sim.runMenu('menuCreateCodes', [null]);
  sim.runMenu('menuCreateCodes', ['3', null]);
  sim.runMenu('menuCreateCodes', ['3', '7', null]);
  assert.equal(sim.records('Codes').length, 6, 'invalid answers and Cancel add nothing');

  // Many codes over several runs stay unique; 500 at once works.
  sim.runMenu('menuCreateCodes', ['500', '365', 'batch']);
  const all = sim.records('Codes').map((r) => r.Code);
  assert.equal(all.length, 506);
  assert.equal(new Set(all).size, 506);
  clean(sim);
});

test('sheets and menu created by onOpen match the spec layout', () => {
  const sim = makeSim({ key: false });
  assert.deepEqual(sim.sheetNames(), ['Codes', 'Settings', 'Orders', 'Log']);
  assert.deepEqual(sim.rows('Codes')[0], ['Code', 'Status', 'Days', 'Note', 'Created', 'Activated', 'Expires', 'Device', 'Device info', 'Last check', 'Moved', 'Moves']);
  assert.deepEqual(sim.rows('Log')[0], ['Time', 'Action', 'Code', 'Device', 'Result']);
  const settings = sim.rows('Settings');
  assert.deepEqual(settings[0].slice(0, 2), ['Setting', 'Value']);
  assert.deepEqual(settings.slice(1).map((r) => r.slice(0, 2)), [['Move after days', 7], ['Refresh hours', 24]]);
  const info = sim.sheetInfo('Codes');
  assert.equal(info.frozenRows, 1);
  const rule = info.validations.find((v) => v.col === 2);
  assert.ok(rule && rule.row === 2 && rule.numCols === 1, 'Status dropdown');
  assert.deepEqual(rule.rule.values, ['new', 'active', 'expired', 'revoked']);
  assert.deepEqual(sim.menus, [{
    caption: 'tunn.sat Premium',
    items: [
      { caption: 'Tạo mã mới…', fn: 'menuCreateCodes' },
      { caption: 'Thu hồi mã đang chọn', fn: 'menuRevokeSelected' },
      { caption: 'Gỡ thiết bị của mã đang chọn', fn: 'menuResetDevice' },
      { separator: true },
      { caption: 'Cài đặt thanh toán (webhook)…', fn: 'menuPaymentSetup' },
      { caption: 'Cài đặt khóa bí mật…', fn: 'menuInstallPrivateKey' },
      { caption: 'Kiểm tra cài đặt', fn: 'menuCheckSetup' }
    ]
  }]);
  // Opening again does not duplicate anything; the owner's settings are kept.
  sim.setSetting('Move after days', 3);
  sim.open();
  assert.deepEqual(sim.rows('Settings').slice(1).map((r) => r.slice(0, 2)), [['Move after days', 3], ['Refresh hours', 24]]);
  assert.deepEqual(sim.sheetNames(), ['Codes', 'Settings', 'Orders', 'Log']);
  // "Refresh hours" sets checkAfter.
  clean(sim);
});

test('Refresh hours setting sets checkAfter', () => {
  const sim = makeSim();
  const [code] = sim.createCodes(1);
  sim.setSetting('Refresh hours', 6);
  const r = sim.doPost(req('activate', code, newDevice()));
  assert.equal(r.checkAfter, 6 * 3600);
  clean(sim);
});

test('HUONG-DAN.md uses the exact menu captions of Code.gs', () => {
  const guide = fs.readFileSync(GUIDE_PATH, 'utf8');
  const sim = makeSim({ key: false });
  for (const menu of sim.menus) {
    assert.ok(guide.includes(menu.caption), menu.caption);
    for (const item of menu.items) if (item.caption) assert.ok(guide.includes(item.caption), 'guide mentions "' + item.caption + '"');
  }
  for (const word of ['Move after days', 'Refresh hours', 'TUNN-XXXX-XXXX-XXXX', '/exec', 'New version', 'Who has access', 'Anyone']) {
    assert.ok(guide.includes(word), word);
  }
  // Log results the owner may see, exactly as Code.gs writes them.
  const src = fs.readFileSync(CODE_GS_PATH, 'utf8');
  for (const result of ['setup (Codes header changed)', 'sheet (dòng ', 'ok (moved)', 'bên phải cột Moves']) {
    assert.ok(src.includes(result), 'Code.gs writes ' + result);
    assert.ok(guide.includes(result.replace(/ $/, '')), 'guide explains ' + result);
  }
  clean(sim);
});

/* ================================================================================================
 * Log, errors, lock
 * ============================================================================================== */
test('the Log never contains key material; it is trimmed to the newest 5000 entries', () => {
  const sim = makeSim();
  const [code] = sim.createCodes(1);
  const dev = newDevice();
  const secrets = [];
  for (const part of ['n', 'd', 'p', 'q', 'dp', 'dq', 'qi']) {
    secrets.push(SERVER.jwk[part], Buffer.from(SERVER.jwk[part], 'base64url').toString('base64'), Buffer.from(SERVER.jwk[part], 'base64url').toString('hex'));
  }
  const files = [];
  for (let i = 0; i < 5; i++) {
    const k = crypto.randomBytes(32); // the unwrapped keys are secret; the wrapped ones are public
    files.push({ id: 'k' + i, key: wrap(SERVER.publicKey, k) });
    secrets.push(k.toString('base64'), k.toString('hex'));
  }
  files.push({ id: 'bad', key: 'QUFB' + files[0].key.slice(4) });
  assertOk(sim.doPost(req('activate', code, dev, { files })));
  assertOk(sim.doPost(req('refresh', code, dev, { files })));
  sim.doPost(req('activate', files[0].key.slice(0, 40), dev, { files }));
  sim.doPost('{"action":"activate","device":"' + dev + '","code":"' + files[1].key.slice(0, 100) + '"}');
  sim.fault('Cache.get', new Error('Cache failed for ' + secrets[1]));
  assertErr(sim.doPost(req('refresh', code, dev, { files })), 'server');
  sim.fault('Cache.get', null);
  if (REAL) sim.installKey(REAL.text);
  sim.runMenu('Kiểm tra cài đặt');

  const chunks = new Set();
  for (const s of secrets) for (let i = 0; i + 20 <= s.length; i += 10) chunks.add(s.slice(i, i + 20));
  const texts = [];
  for (const row of sim.rows('Log')) for (const cell of row) texts.push(String(cell));
  for (const line of sim.console) texts.push(line.text);
  for (const t of texts) for (const ch of chunks) assert.ok(!t.includes(ch), 'key material in the Log / console: ' + t.slice(0, 80));
  assert.ok(sim.records('Log').some((l) => l.Action === 'error' && /Cache failed/.test(l.Result)), 'errors are logged');

  // Trimming: fill the Log close to the limit, then one more request.
  const filler = Array.from({ length: 5150 - sim.records('Log').length }, () => [new Date(T0), 'filler', '', '', 'x']);
  sim.appendRows('Log', filler);
  assert.equal(sim.records('Log').length, 5150);
  assertOk(sim.doPost(req('refresh', code, dev)));
  const log = sim.records('Log');
  assert.equal(log.length, 5000);
  assert.equal(log.at(-1).Action, 'refresh');
  clean(sim);
});

test('busy script lock -> "server" (busy message); an unexpected error -> "server" and a Log entry', () => {
  const sim = makeSim();
  const [code] = sim.createCodes(1);
  const dev = newDevice();
  sim.holdLock(true);
  const r = sim.doPost(req('activate', code, dev));
  assertErr(r, 'server');
  assert.match(r.message, /busy/);
  assert.equal(sim.codeRecord(code).Device, '', 'nothing written without the lock');
  sim.holdLock(false);
  assertOk(sim.doPost(req('activate', code, dev)));

  sim.fault('Sheet.getRange', new Error('Service Spreadsheets failed'));
  const r2 = sim.doPost(req('refresh', code, dev));
  assertErr(r2, 'server');
  assert.match(r2.message, /went wrong/);
  sim.fault('Sheet.getRange', null);
  assert.ok(sim.records('Log').some((l) => l.Action === 'error' && /Service Spreadsheets failed/.test(l.Result)));
  assertOk(sim.doPost(req('refresh', code, dev)));
  clean(sim);
});

/* ================================================================================================
 * The real client (assets/js/premium.js) against the simulator
 * ============================================================================================== */
/**
 * Just enough IndexedDB for premium.js: one object store with get / put / add, answered asynchronously.
 * db.data holds what is stored (CryptoKey objects are kept as they are, like the browser does).
 */
function fakeIndexedDB(db = { created: false, data: new Map() }) {
  const later = (fn) => setTimeout(fn, 0);
  return {
    db,
    open() {
      const open = {};
      later(() => {
        open.result = {
          createObjectStore() { db.created = true; },
          close() {},
          transaction(name, mode) {
            const tx = {};
            const run = (fn) => {
              const r = {};
              later(() => {
                try {
                  r.result = fn();
                  if (r.onsuccess) r.onsuccess();
                  later(() => { if (tx.oncomplete) tx.oncomplete(); });
                } catch (e) {
                  r.error = tx.error = e;
                  if (r.onerror) r.onerror();
                  if (tx.onerror) tx.onerror();
                  if (tx.onabort) tx.onabort();
                }
              });
              return r;
            };
            const write = () => { if (mode !== 'readwrite') throw new Error('ReadOnlyError'); };
            tx.objectStore = () => ({
              get: (key) => run(() => db.data.get(key)),
              put: (value, key) => { write(); return run(() => { db.data.set(key, value); return key; }); },
              add: (value, key) => {
                write();
                return run(() => {
                  if (db.data.has(key)) { const e = new Error('Key already exists'); e.name = 'ConstraintError'; throw e; }
                  db.data.set(key, value);
                  return key;
                });
              }
            });
            return tx;
          }
        };
        if (!db.created && open.onupgradeneeded) open.onupgradeneeded();
        if (open.onsuccess) open.onsuccess();
      });
      return open;
    }
  };
}

function loadClient({ sim, userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1', stubs = [], store = new Map(), idb = fakeIndexedDB() }) {
  const unlocked = {};
  const requests = [];
  const ctx = vm.createContext({
    console, setTimeout, clearTimeout, AbortController, TextDecoder, atob, btoa,
    crypto: globalThis.crypto, isSecureContext: true, addEventListener() {}, indexedDB: idb,
    navigator: { userAgent, maxTouchPoints: 5 },
    document: { addEventListener() {}, createElement() { return { set innerHTML(v) { this.textContent = String(v).replace(/<[^>]*>/g, ''); } }; } },
    APP_CONFIG: { premium: { api: 'https://script.google.com/macros/s/SIM/exec', contact: null } },
    U: {
      lsGet(k, def) { return store.has(k) ? JSON.parse(store.get(k)) : def; },
      lsSet(k, v) { store.set(k, JSON.stringify(v)); return true; },
      lsDel(k) { store.delete(k); },
      esc(s) { return String(s); },
      toast() {}, icon() { return ''; }, modal() { return Promise.resolve(false); }
    },
    SATLibrary: {
      premiumStubs: () => stubs,
      isPremium: (id) => stubs.some((s) => s.id === id),
      isLocked: (id) => !unlocked[id],
      unlockPremium: (id, def) => { unlocked[id] = def; return true; },
      lockPremium: () => { for (const k of Object.keys(unlocked)) delete unlocked[k]; }
    },
    fetch: async (url, init) => {
      assert.equal(url, 'https://script.google.com/macros/s/SIM/exec');
      assert.equal(init.method, 'POST');
      assert.equal(init.redirect, 'follow');
      assert.deepEqual(Object.keys(init.headers), ['Content-Type']);
      assert.match(init.headers['Content-Type'], /^text\/plain/);
      const body = JSON.parse(init.body);
      requests.push(body);
      const out = sim.doPostRaw(init.body, init.headers['Content-Type']);
      assert.equal(out.mimeType, 'application/json');
      return { text: async () => out.content };
    }
  });
  vm.runInContext('globalThis.window = globalThis;', ctx);
  vm.runInContext(fs.readFileSync(CLIENT_PATH, 'utf8'), ctx, { filename: 'premium.js' });
  return { Premium: ctx.Premium, store, unlocked, requests, idb };
}

function encryptStub(publicKey, def) {
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const data = Buffer.concat([cipher.update(Buffer.from(JSON.stringify(def), 'utf8')), cipher.final(), cipher.getAuthTag()]);
  return {
    v: 1, id: def.id, title: def.id, category: '', description: '', section: 'advanced',
    questionCount: 1, mcqCount: 1, sprCount: 0, totalTime: 2, moduleCount: 1,
    kid: 'k1', key: wrap(publicKey, key), iv: iv.toString('base64'), data: data.toString('base64'),
    rawKey: key.toString('base64') // for the tests only (a real stub never has it)
  };
}

test('client: assets/js/premium.js activates, unlocks, refreshes and locks again against the server', async () => {
  const sim = makeSim();
  const [code] = sim.createCodes(1, 365, 'client test');
  const defs = ['geometry-a', 'algebra-b', 'advanced-c'].map((id, i) => ({
    id, source: 'title: ' + id + '\nsection: advanced\n\n1. Question ' + i + ' — “quotes” √2 ≤ π\nA. 1\nB. 2\nC. 3\nD. 4\nAnswer: A\n'
  }));
  const stubs = defs.map((d) => encryptStub(SERVER.publicKey, d));
  const a = loadClient({ sim, stubs });
  const r = await a.Premium.activate('  ' + code.toLowerCase().replace(/-/g, ' ') + ' ');
  assert.equal(r.ok, true, JSON.stringify(r));
  assert.equal(r.unlocked, 3);
  assert.equal(r.expires, iso(T0 + 365 * DAY));
  for (const d of defs) assert.deepEqual(JSON.parse(JSON.stringify(a.unlocked[d.id])), d);
  const req0 = a.requests[0];
  assert.deepEqual(Object.keys(req0).sort(), ['action', 'code', 'device', 'deviceKey', 'files', 'info']);
  assert.equal(req0.action, 'activate');
  assert.equal(req0.code, code);
  // The device is a non-extractable key pair kept in IndexedDB; its id is the hash of the public key
  assert.match(req0.device, /^k_[A-Za-z0-9_-]{43}$/);
  assert.equal(req0.device, 'k_' + crypto.createHash('sha256').update(Buffer.from(req0.deviceKey, 'base64')).digest('base64url'));
  const stored = a.idb.db.data.get('device');
  assert.equal(stored.privateKey.extractable, false, 'the private key can never be exported');
  await assert.rejects(globalThis.crypto.subtle.exportKey('pkcs8', stored.privateKey));
  assert.equal(sim.codeRecord(code).Device, req0.device);
  assert.equal(sim.codeRecord(code)['Device info'], 'iPhone · Safari');
  const saved = JSON.parse(a.store.get('tunn.premium.v1'));
  assert.equal(saved.code, code);
  assert.equal(saved.device, req0.device);
  assert.equal(saved.wrapped, true);
  assert.equal(Object.keys(saved.keys).length, 3);
  for (const st of stubs) assert.notEqual(saved.keys[st.id], st.rawKey, 'only wrapped keys are saved');

  // Reload (same browser): the saved wrapped keys open the tests again without the server.
  const a2 = loadClient({ sim, stubs, store: a.store, idb: a.idb });
  const before = a2.requests.length;
  await a2.Premium.boot();
  assert.equal(Object.keys(a2.unlocked).length, 3);
  assert.equal(a2.requests.length, before, 'no server call needed');
  // IndexedDB failing for a moment (not "no key") keeps the license for the next visit.
  const a3 = loadClient({ sim, stubs, store: a.store, idb: { open() { throw new Error('IndexedDB is broken'); } } });
  await a3.Premium.boot();
  assert.equal(a3.store.has('tunn.premium.v1'), true);
  assert.deepEqual(Object.keys(a3.unlocked), []);

  // Copying this browser's saved data (localStorage) to another browser opens nothing there, with or
  // without a device key of its own, and the copied license is dropped with an explanation.
  const copy = () => new Map(a.store);
  const c1 = loadClient({ sim, stubs, store: copy() });
  await c1.Premium.boot();
  assert.deepEqual(Object.keys(c1.unlocked), []);
  assert.equal(c1.store.has('tunn.premium.v1'), false);
  assert.equal(JSON.parse(c1.store.get('tunn.premium.lost.v1')).reason, 'reset');
  assert.equal(c1.requests.length, 0);
  const c2 = loadClient({ sim, stubs, store: new Map() });
  assert.equal((await c2.Premium.activate('TUNN-0000-0000-0000')).error, 'notfound'); // gives c2 a device key
  for (const [k, v] of a.store) c2.store.set(k, v);
  await c2.Premium.boot();
  assert.deepEqual(Object.keys(c2.unlocked), []);
  // Even a hand-made request with the copied device id and public key only gets keys it cannot unwrap.
  const forged = sim.doPost({ action: 'refresh', code, device: req0.device, deviceKey: req0.deviceKey, info: 'x', files: req0.files });
  assert.equal(forged.ok, true);
  for (const st of stubs) assert.notEqual(forged.keys[st.id], st.rawKey);
  const own = c2.requests.at(-1);
  const stolen = sim.doPost({ ...own, action: 'refresh', code, device: req0.device });
  assert.equal(stolen.error, 'device', 'another device key is another device');

  sim.advance(DAY);
  const rf = await a.Premium.refresh();
  assert.equal(rf.error, undefined, JSON.stringify(rf));
  assert.equal(a.requests.at(-1).action, 'refresh');

  // A second browser cannot use the same code; the client passes retryAfter on.
  const b = loadClient({ sim, stubs, userAgent: 'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 Chrome/126.0 Mobile Safari/537.36' });
  const rb = await b.Premium.activate(code);
  assert.equal(rb.ok, false);
  assert.equal(rb.error, 'device');
  assert.equal(rb.retryAfter, iso(T0 + 7 * DAY));
  assert.match(b.Premium.errorText(rb, true), /another device/);

  // The owner revokes: the next refresh locks the first browser again.
  sim.setCodeField(code, 'Status', 'revoked');
  const rr = await a.Premium.refresh();
  assert.equal(rr.error, 'revoked');
  assert.equal(rr.changed, true);
  assert.equal(a.store.has('tunn.premium.v1'), false);
  assert.deepEqual(Object.keys(a.unlocked), []);
  clean(sim);
});

test('device keys: requests need a valid key; a v1 device id moves to the key once; a key-bound code only matches its key', () => {
  const sim = makeSim();
  const [code, code2] = sim.createCodes(2);
  const dev = newDevice();
  const d = DEVICES.get(dev);

  // No key (a page from before device keys): "update", never keys; nothing is bound.
  assertErr(sim.doPost({ action: 'activate', code, device: legacyDevice(), info: 'x', files: [] }), 'update');
  assert.equal(sim.codeRecord(code).Device, '');
  // Broken / unusual keys are refused as bad requests.
  const pub = (opts) => crypto.generateKeyPairSync('rsa', opts).publicKey.export({ format: 'der', type: 'spki' }).toString('base64');
  for (const bad of ['', 'AAAA', 'x'.repeat(2000), 123, pub({ modulusLength: 1024 }), pub({ modulusLength: 2048, publicExponent: 3 }),
    crypto.generateKeyPairSync('ec', { namedCurve: 'P-256' }).publicKey.export({ format: 'der', type: 'spki' }).toString('base64')]) {
    assertErr(sim.doPost({ ...req('activate', code, dev), deviceKey: bad }), 'invalid');
  }
  assert.equal(sim.codeRecord(code).Device, '');
  // A 3072-bit key works too.
  const big = crypto.generateKeyPairSync('rsa', { modulusLength: 3072 });
  const bigSpki = big.publicKey.export({ format: 'der', type: 'spki' });
  const bigId = 'k_' + crypto.createHash('sha256').update(bigSpki).digest('base64url');
  DEVICES.set(bigId, { spki: bigSpki.toString('base64'), privateKey: big.privateKey });
  const k = crypto.randomBytes(32);
  const rb = sim.doPost(req('activate', code2, bigId, { files: [{ id: 'x', key: wrap(SERVER.publicKey, k) }] }));
  assertOk(rb, { code: code2, device: bigId });
  assert.equal(openKeys(rb, bigId).x, k.toString('base64'));

  // The device id the page sends does not matter: the key decides (the sheet holds the id of the key).
  assertOk(sim.doPost({ ...req('activate', code, dev), device: legacyDevice() }), { code, device: dev });
  assert.equal(sim.codeRecord(code).Device, dev);

  // A code bound to a v1 random id (activated before device keys)...
  const old = legacyDevice();
  sim.setCodeField(code, 'Device', old);
  // ...is not taken over by another key claiming some other id, nor by its key without the old id,
  assertErr(sim.doPost({ ...req('refresh', code, dev), device: legacyDevice() }), 'device');
  assertErr(sim.doPost(req('refresh', code, dev)), 'device');
  assert.equal(sim.codeRecord(code).Device, old);
  // ...but moves to the key of the browser that sends that old id (once), without counting as a move.
  const up = sim.doPost({ ...req('refresh', code, dev), device: old });
  assertOk(up, { code, device: dev });
  const row = sim.codeRecord(code);
  assert.equal(row.Device, dev);
  assert.equal(Number(row.Moves || 0), 0, 'an upgrade is not a move');
  assert.ok(sim.records('Log').some((l) => l.Code === code && l.Device === dev && /^ok \(upgraded\)/.test(l.Result)));
  // From now on the old id means nothing, whatever key comes with it.
  const other = newDevice();
  assertErr(sim.doPost({ ...req('refresh', code, other), device: old }), 'device');
  assertErr(sim.doPost({ ...req('refresh', code, other), device: dev }), 'device');
  assertOk(sim.doPost(req('refresh', code, dev)), { code, device: dev });
  assert.ok(d);
  clean(sim);
});

test('client: a license from before device keys moves to a device key on its next check', async () => {
  const sim = makeSim();
  const [code] = sim.createCodes(1, 0, 'legacy');
  const defs = ['legacy-a', 'legacy-b'].map((id, i) => ({ id, source: 'title: ' + id + '\nsection: advanced\n\n1. Q' + i + '\nA. 1\nB. 2\nC. 3\nD. 4\nAnswer: B\n' }));
  const stubs = defs.map((x) => encryptStub(SERVER.publicKey, x));
  // What an earlier version of the page saved: a random device id and the plain AES keys.
  const old = legacyDevice();
  sim.setCodeField(code, 'Device', old);
  sim.setCodeField(code, 'Status', 'active');
  sim.setCodeField(code, 'Activated', new Date(T0 - DAY));
  const store = new Map([
    ['tunn.device.v1', JSON.stringify(old)],
    ['tunn.premium.v1', JSON.stringify({ code, device: old, expires: null, keys: Object.fromEntries(stubs.map((st) => [st.id, st.rawKey])), checkedAt: Date.now() - 2 * HOUR, checkAfter: 86400 })]
  ]);
  const c = loadClient({ sim, stubs, store });
  await c.Premium.boot();
  assert.equal(Object.keys(c.unlocked).length, 2, 'the plain keys still open the tests meanwhile');
  const r = await c.Premium.refresh();
  assert.equal(r.error, undefined, JSON.stringify(r));
  const sent = c.requests.at(-1);
  assert.equal(sent.device, old, 'the old id is sent so the server can move the code');
  assert.match(sent.deviceKey, /^[A-Za-z0-9+/]+=*$/);
  const saved = JSON.parse(c.store.get('tunn.premium.v1'));
  assert.equal(saved.wrapped, true);
  assert.match(saved.device, /^k_/);
  assert.equal(sim.codeRecord(code).Device, saved.device);
  for (const st of stubs) assert.notEqual(saved.keys[st.id], st.rawKey, 'the plain keys are gone');
  // After a reload the wrapped keys open the tests.
  const c2 = loadClient({ sim, stubs, store: c.store, idb: c.idb });
  await c2.Premium.boot();
  for (const x of defs) assert.deepEqual(JSON.parse(JSON.stringify(c2.unlocked[x.id])), x);
  clean(sim);
});

test('rate limit: requests without a valid device key never count against the device id they claim', () => {
  const sim = makeSim();
  const [code] = sim.createCodes(1);
  const victim = newDevice();
  assertOk(sim.doPost(req('activate', code, victim)), { code });
  for (let i = 0; i < 15; i++) {
    assertErr(sim.doPost({ ...req('refresh', 'TUNN-0000-0000-0000', victim), deviceKey: 'AAAA' }), 'invalid');
    assertErr(sim.doPost({ action: 'activate', code: 'TUNN-0000-0000-0000', device: victim, info: 'x', files: [] }), 'update');
  }
  assertOk(sim.doPost(req('refresh', code, victim)), { code });
  clean(sim);
});

test('client: v1 code after a dropped license, v1 ids starting with k_, IndexedDB that never answers, tests encrypted again', async () => {
  const sim = makeSim();
  const defs = ['again-a', 'again-b'].map((id, i) => ({ id, source: 'title: ' + id + '\nsection: advanced\n\n1. Q' + i + '\nA. 1\nB. 2\nC. 3\nD. 4\nAnswer: C\n' }));
  const stubs = defs.map((x) => encryptStub(SERVER.publicKey, x));
  const bindV1 = (code, id) => {
    sim.setCodeField(code, 'Device', id);
    sim.setCodeField(code, 'Status', 'active');
    sim.setCodeField(code, 'Activated', new Date(T0 - DAY));
  };

  // A code bound to this browser's v1 id whose saved license was dropped (revoked, then restored by the owner):
  // entering it again works, and moves it to the device key.
  const [code, code2] = sim.createCodes(2);
  const old = legacyDevice();
  bindV1(code, old);
  const c = loadClient({ sim, stubs, store: new Map([['tunn.device.v1', JSON.stringify(old)]]) });
  const r = await c.Premium.activate(code);
  assert.equal(r.ok, true, JSON.stringify(r));
  assert.equal(c.requests.at(-1).device, old);
  assert.match(sim.codeRecord(code).Device, /^k_[A-Za-z0-9_-]{43}$/);
  assert.equal(Object.keys(c.unlocked).length, 2);

  // A v1 id is 22 random characters: one that happens to start with "k_" is still a v1 id.
  const odd = 'k_' + crypto.randomBytes(15).toString('base64url');
  assert.equal(odd.length, 22);
  bindV1(code2, odd);
  const d = loadClient({ sim, stubs, store: new Map([['tunn.device.v1', JSON.stringify(odd)]]) });
  assert.equal((await d.Premium.activate(code2)).ok, true);
  assert.equal(d.requests.at(-1).device, odd);

  // IndexedDB that never answers (a known WebKit hang): start-up and the unlock dialog give up after a few seconds.
  const hang = { open() { return {}; } };
  const e = loadClient({ sim, stubs, store: new Map(c.store), idb: hang });
  let t = Date.now();
  await e.Premium.boot();
  assert.ok(Date.now() - t < 4500, 'boot waited ' + (Date.now() - t) + ' ms');
  assert.equal(e.store.has('tunn.premium.v1'), true, 'the license is kept for the next visit');
  t = Date.now();
  assert.equal((await e.Premium.activate(code2)).error, 'storage');
  assert.ok(Date.now() - t < 4500, 'activate waited ' + (Date.now() - t) + ' ms');

  // The tests are encrypted again (new AES keys): the saved keys no longer open them, so the next visit asks the
  // server once and gets the new keys.
  const stubs2 = defs.map((x) => encryptStub(SERVER.publicKey, x));
  const f = loadClient({ sim, stubs: stubs2, store: c.store, idb: c.idb });
  await f.Premium.boot();
  await f.Premium.refresh();
  assert.equal(f.requests.length, 1);
  for (const x of defs) assert.deepEqual(JSON.parse(JSON.stringify(f.unlocked[x.id])), x);
  clean(sim);
});

/* ================================================================================================
 * HTTP server and command line
 * ============================================================================================== */
test('HTTP: GET, OPTIONS, POST through the Apps Script style redirect and without it', async () => {
  const sim = makeSim();
  const [code] = sim.createCodes(1);
  const dev = newDevice();
  for (const redirect of [true, false]) {
    const server = await startServer(sim, { port: 0, quiet: true, redirect });
    const base = 'http://127.0.0.1:' + server.address().port;
    try {
      const g = await fetch(base + '/exec');
      assert.equal(g.status, 200);
      assert.equal(g.headers.get('access-control-allow-origin'), '*');
      assert.match(g.headers.get('content-type'), /^application\/json/);
      assert.deepEqual(await g.json(), { ok: true, service: 'tunn.sat premium', version: 2 });

      const o = await fetch(base + '/exec', { method: 'OPTIONS' });
      assert.equal(o.status, 204);
      assert.equal(o.headers.get('access-control-allow-origin'), '*');

      const p = await fetch(base + '/exec', {
        method: 'POST', redirect: 'follow', headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(req('activate', code, dev, { info: 'Mac · Safari' }))
      });
      assert.equal(p.status, 200);
      assert.equal(p.redirected, redirect);
      assert.equal(p.headers.get('access-control-allow-origin'), '*');
      assertOk(await p.json(), { code });

      const bad = await fetch(base + '/exec', { method: 'POST', body: 'nonsense' });
      assertErr(await bad.json(), 'invalid');
      const codes = await (await fetch(base + '/__sim/codes')).json();
      assert.equal(codes[0].Code, code);
    } finally {
      await new Promise((resolve) => server.close(resolve));
    }
  }
  clean(sim);
});

function runCli(args, env = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [SIM_PATH, ...args], { env: { ...process.env, PREMIUM_PRIVATE_KEY_FILE: '', ...env }, stdio: ['ignore', 'pipe', 'pipe'] });
    let out = '';
    let err = '';
    const timer = setTimeout(() => { child.kill(); reject(new Error('CLI did not start: ' + out + err)); }, 15000);
    child.stdout.on('data', (d) => {
      out += d;
      if (out.includes('Ctrl+C stops.')) { clearTimeout(timer); resolve({ child, out, err: () => err }); }
    });
    child.stderr.on('data', (d) => { err += d; });
    child.on('exit', (c) => { clearTimeout(timer); reject(new Error('CLI exited with ' + c + ': ' + out + err)); });
  });
}

test('command line: --key installs the key through the menu, --codes prints codes, the server answers', { skip: needReal }, async () => {
  const { child, out } = await runCli(['--port', '0', '--key', keyFile, '--codes', '2', '--days', '30', '--move-after-days', '3', '--now', '2026-10-12T08:00:00Z', '--no-redirect']);
  try {
    assert.ok(!out.includes(REAL.jwk.d.slice(0, 20)), 'the key is never printed');
    const codes = out.match(/TUNN-[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{4}/g);
    assert.equal(codes.length, 2);
    const url = /Web app URL : (\S+)/.exec(out)[1].replace('//localhost:', '//127.0.0.1:');
    assert.match(out, /Move after days = 3/);
    const k = crypto.randomBytes(32);
    const dev = newDevice();
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(req('activate', codes[0], dev, { files: [{ id: 'x', key: wrap(SITE_PUBLIC, k) }] })) });
    const r = await res.json();
    assertOk(r, { code: codes[0], expires: T0 + 30 * DAY, device: dev });
    assert.equal(openKeys(r, dev).x, k.toString('base64'));
  } finally {
    child.kill();
  }
});

test('command line: without a key every request is answered with "setup"', async () => {
  const { child, out } = await runCli(['--port', '0', '--codes', '1']);
  try {
    const code = out.match(/TUNN-[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{4}/)[0];
    const url = /Web app URL : (\S+)/.exec(out)[1].replace('//localhost:', '//127.0.0.1:');
    const res = await fetch(url, { method: 'POST', body: JSON.stringify(req('activate', code, newDevice())) });
    assert.ok(res.redirected, 'answers through a redirect by default');
    assertErr(await res.json(), 'setup');
  } finally {
    child.kill();
  }
});

/* ================================================================================================
 * Payments: orders and the bank-transfer webhook
 * ============================================================================================== */
const ORDER_RE = /^TUNN[0-9A-HJKMNP-TV-Z]{8}$/;
function orderReq(action, device, extra = {}) {
  return { action, deviceKey: DEVICES.get(device).spki, ...extra };
}
function webhookToken(sim) {
  sim.open();
  const r = sim.runMenu('menuPaymentSetup', []);
  const m = /\?hook=([A-Za-z0-9_-]+)/.exec(r.dialogs[0].html);
  assert.ok(m, 'the dialog shows ?hook=<token>');
  return m[1];
}
function transfer(content, amount, id = Math.floor(Math.random() * 1e9)) {
  return { id, gateway: 'MBBank', transactionDate: '2026-10-12 15:00:00', accountNumber: '0000000000', code: null,
    content, transferType: 'in', transferAmount: amount, accumulated: 1000000, subAccount: null,
    referenceCode: 'FT' + id, description: 'BankAPINotify ' + content };
}

test('payments: order -> webhook -> the paying device gets the code and activates it', () => {
  const sim = makeSim();
  const token = webhookToken(sim);
  assert.match(token, /^[A-Za-z0-9_-]{32}$/);
  const dev = newDevice();
  const o = sim.doPost(orderReq('order', dev, { plan: '1m' }));
  assert.equal(o.ok, true, JSON.stringify(o));
  assert.match(o.order, ORDER_RE);
  assert.deepEqual([o.status, o.plan, o.amount, o.days], ['pending', '1m', 69000, 30]);
  assert.equal(o.expiresAt, iso(T0 + 24 * HOUR));
  assert.equal(sim.doPost(orderReq('orderStatus', dev, { order: o.order })).status, 'pending');

  // The bank adds its own text and dots; the reference is still found.
  const w = sim.doPost(transfer('MBVCB.1234.' + o.order.toLowerCase() + '.chuyen tien', 69000, 555), 'application/json', { hook: token });
  assert.deepEqual(w, { success: true, message: 'paid · code created' });
  const rec = sim.records('Orders')[0];
  assert.equal(rec.Status, 'paid');
  assert.match(String(rec.Payment), /txn 555/);
  const st = sim.doPost(orderReq('orderStatus', dev, { order: o.order }));
  assert.equal(st.status, 'paid');
  assert.equal(st.code, rec.Code);
  assert.equal(sim.codeRecord(st.code).Status, 'new');
  assert.equal(sim.codeRecord(st.code).Days, 30);
  assert.equal(sim.codeRecord(st.code).Note, 'Order ' + o.order);
  // The page then activates the code the usual way.
  assertOk(sim.doPost(req('activate', st.code, dev)), { code: st.code, expires: T0 + 30 * DAY, device: dev });
  // The same transfer sent again does nothing more.
  assert.equal(sim.doPost(transfer(o.order, 69000, 555), 'application/json', { hook: token }).message, 'already paid');
  assert.equal(sim.records('Codes').length, 1);
  clean(sim);
});

test('payments: the code is only answered to the device that made the order', () => {
  const sim = makeSim();
  const token = webhookToken(sim);
  const dev = newDevice();
  const o = sim.doPost(orderReq('order', dev, { plan: '3m' }));
  assert.deepEqual([o.amount, o.days], [189000, 90]);
  sim.doPost(transfer(o.order, 189000), 'application/json', { hook: token });
  const other = sim.doPost(orderReq('orderStatus', newDevice(), { order: o.order }));
  assertErr(other, 'notfound');
  assert.match(other.message, /payment was not found/);
  assert.equal(sim.doPost(orderReq('orderStatus', dev, { order: o.order })).status, 'paid');
  // No device key -> "update"; bad plan / order -> invalid
  assertErr(sim.doPost({ action: 'order', plan: '1m' }), 'update');
  assertErr(sim.doPost(orderReq('order', dev, { plan: '12m' })), 'invalid');
  assertErr(sim.doPost(orderReq('orderStatus', dev, { order: 'TUNN-0000' })), 'invalid');
  clean(sim);
});

test('payments: wrong token, too little money, no reference, outgoing transfer', () => {
  const sim = makeSim();
  const token = webhookToken(sim);
  const dev = newDevice();
  const o = sim.doPost(orderReq('order', dev, { plan: '1m' }));
  assert.deepEqual(sim.doPost(transfer(o.order, 69000), 'application/json', { hook: 'x' + token.slice(1) }), { success: false, message: 'unauthorized' });
  // Without ?hook the body goes to the code API, which refuses it
  assertErr(sim.doPost(transfer(o.order, 69000), 'application/json', {}), 'invalid');
  assert.equal(sim.doPost(transfer(o.order, 50000), 'application/json', { hook: token }).message, 'underpaid');
  assert.equal(sim.records('Orders')[0].Status, 'pending');
  assert.match(String(sim.records('Orders')[0].Note), /Underpaid: received 50000 of 69000/);
  assert.equal(sim.doPost(transfer('chuyen tien hoc phi', 69000), 'application/json', { hook: token }).message, 'no order');
  assert.equal(sim.doPost({ ...transfer(o.order, 69000), transferType: 'out' }, 'application/json', { hook: token }).message, 'ignored');
  assert.equal(sim.doPost(transfer('TUNNZZZZZZZZ', 69000), 'application/json', { hook: token }).message, 'order not found');
  assert.equal(sim.records('Codes').length, 0);
  // Paying the rest later (a second transfer of the full amount) still works.
  assert.equal(sim.doPost(transfer(o.order, 69000), 'application/json', { hook: token }).message, 'paid · code created');
  clean(sim);
});

test('payments: no webhook token installed -> every webhook call is refused', () => {
  const sim = makeSim();
  sim.open();
  const dev = newDevice();
  const o = sim.doPost(orderReq('order', dev, { plan: '1m' }));
  assert.equal(sim.doPost(transfer(o.order, 69000), 'application/json', { hook: '' }).success, false);
  assert.equal(sim.doPost(transfer(o.order, 69000), 'application/json', { hook: 'anything' }).success, false);
  clean(sim);
});

test('payments: the owner marks an order paid by hand (Status = paid) and the page gets a code', () => {
  const sim = makeSim();
  sim.open();
  const dev = newDevice();
  const o = sim.doPost(orderReq('order', dev, { plan: '3m' }));
  sim.setCell('Orders', 2, 'Status', 'paid');
  const st = sim.doPost(orderReq('orderStatus', dev, { order: o.order.toLowerCase() }));
  assert.equal(st.status, 'paid');
  assert.match(st.code, /^TUNN-/);
  assert.equal(sim.codeRecord(st.code).Days, 90);
  // Asking again gives the same code (no second code).
  assert.equal(sim.doPost(orderReq('orderStatus', dev, { order: o.order })).code, st.code);
  assert.equal(sim.records('Codes').length, 1);
  clean(sim);
});

test('payments: an unpaid order expires after 24 hours; a payment after that still counts', () => {
  const sim = makeSim();
  const token = webhookToken(sim);
  const dev = newDevice();
  const o = sim.doPost(orderReq('order', dev, { plan: '1m' }));
  sim.advance(25 * HOUR);
  assert.equal(sim.doPost(orderReq('orderStatus', dev, { order: o.order })).status, 'expired');
  assert.equal(sim.records('Orders')[0].Status, 'expired');
  sim.doPost(transfer(o.order, 69000), 'application/json', { hook: token });
  assert.equal(sim.doPost(orderReq('orderStatus', dev, { order: o.order })).status, 'paid');
  clean(sim);
});

test('payments: at most 5 new orders per device per hour', () => {
  const sim = makeSim();
  sim.open();
  const dev = newDevice();
  const ids = new Set();
  for (let i = 0; i < 5; i++) ids.add(sim.doPost(orderReq('order', dev, { plan: '1m' })).order);
  assert.equal(ids.size, 5);
  const sixth = sim.doPost(orderReq('order', dev, { plan: '1m' }));
  assertErr(sixth, 'rate');
  assert.match(sixth.message, /payment requests/);
  assert.equal(sim.doPost(orderReq('order', newDevice(), { plan: '1m' })).ok, true, 'other devices are not affected');
  sim.advance(61 * MIN);
  assert.equal(sim.doPost(orderReq('order', dev, { plan: '1m' })).ok, true);
  clean(sim);
});

test('payments: an edited Orders header turns payments off (no guessing columns)', () => {
  const sim = makeSim();
  const token = webhookToken(sim);
  const dev = newDevice();
  const o = sim.doPost(orderReq('order', dev, { plan: '1m' }));
  sim.setCell('Orders', 1, 2, 'Trạng thái');
  assertErr(sim.doPost(orderReq('orderStatus', dev, { order: o.order })), 'setup');
  assertErr(sim.doPost(orderReq('order', dev, { plan: '1m' })), 'setup');
  assert.equal(sim.doPost(transfer(o.order, 69000), 'application/json', { hook: token }).message, 'setup');
  clean(sim);
});

test('payments: the webhook token can be shown again or replaced from the menu', () => {
  const sim = makeSim({ key: false });
  const first = webhookToken(sim);
  const again = sim.runMenu('menuPaymentSetup', ['YES']);
  assert.ok(again.dialogs[0].html.includes('?hook=' + first));
  const renewed = sim.runMenu('menuPaymentSetup', ['NO']);
  const second = /\?hook=([A-Za-z0-9_-]+)/.exec(renewed.dialogs[0].html)[1];
  assert.notEqual(second, first);
  clean(sim);
});
