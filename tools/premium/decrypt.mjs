#!/usr/bin/env node
/*
 * tunn.sat Premium — decrypts encrypted Advanced tests (tests/premium/<name>.js) back to plaintext test files, so
 * the owner can edit them. Needs the PRIVATE key, which is NEVER in the repository (the owner keeps it in the Apps
 * Script project and in a private backup):
 *   PREMIUM_PRIVATE_KEY_FILE=/path/outside/the/repo/private-key.json   or   --key <file>
 *   PREMIUM_PRIVATE_KEY='<JWK JSON>'                                     (environment variable with the JSON itself)
 *
 *   node tools/premium/decrypt.mjs <name> [<name> …] [--out <dir>]   writes <dir>/<name>.js
 *   node tools/premium/decrypt.mjs --all [--out <dir>]                every file in tests/premium/
 *   options: --root <site folder> (default: this repository), --key <file>
 *
 * The output folder defaults to a new temporary folder and must be OUTSIDE the repository: the tool refuses to write
 * anywhere inside it or inside any other copy of the site (tests/ would publish the plaintext). Each output file is a
 * normal test file (SATLibrary.register(…)) that registers exactly the decrypted test (checked before writing), so
 * after editing it outside the repository, copy it to tests/<name>.js and run `node tools/premium/encrypt.mjs` right
 * away: that encrypts it again and deletes the plaintext. Never commit the decrypted file.
 *
 * The private key is only read from the given place; it is never printed or copied.
 * Exit codes: 0 = OK, 1 = some files could not be decrypted, 2 = usage or key error.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, '..', '..');
const STUB_RE = /^SATLibrary\.registerPremium\((\{.*\})\);\s*$/m;
const NAME_RE = /^[A-Za-z0-9_-]{1,80}$/;

class UsageError extends Error {}

const USAGE = 'Usage: node tools/premium/decrypt.mjs <name> [<name> …] | --all  [--out <dir outside the repository>] [--key <private-key.json>] [--root <site folder>]';

function parseArgs(argv) {
  const o = { names: [], all: false, out: '', key: '', root: '', help: false };
  const val = (i, flag) => { if (i + 1 >= argv.length || !argv[i + 1]) throw new UsageError(flag + ' needs a value.'); return argv[i + 1]; };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--all') o.all = true;
    else if (a === '--help' || a === '-h') o.help = true;
    else if (a === '--out' || a === '--key' || a === '--root') { o[a.slice(2)] = val(i, a); i++; }
    else if (/^--(out|key|root)=/.test(a)) o[a.slice(2, a.indexOf('='))] = a.slice(a.indexOf('=') + 1);
    else if (a.startsWith('-')) throw new UsageError('Unknown option: ' + a);
    else {
      const name = a.replace(/\\/g, '/').replace(/^(?:tests\/)?(?:premium\/)?/, '').replace(/\.js$/, '');
      if (!NAME_RE.test(name)) throw new UsageError('Not a test name: ' + a + ' (use the file name in tests/premium/, e.g. geometry-a).');
      o.names.push(name);
    }
  }
  if (!o.help && !o.all && !o.names.length) throw new UsageError('Name the tests to decrypt, or use --all.');
  if (o.all && o.names.length) throw new UsageError('Use either --all or test names, not both.');
  return o;
}

/** Real path of p, resolving symbolic links of the part that exists (p itself may not exist yet). */
function realPath(p) {
  let cur = path.resolve(p);
  const rest = [];
  for (;;) {
    try { return path.join(fs.realpathSync(cur), ...rest.reverse()); } catch (e) {
      const parent = path.dirname(cur);
      if (parent === cur) return path.resolve(p);
      rest.push(path.basename(cur));
      cur = parent;
    }
  }
}

/** True if child is parent or inside it (case-insensitive where the file system usually is). */
function isInside(child, parent) {
  const fold = process.platform === 'darwin' || process.platform === 'win32' ? (s) => s.toLowerCase() : (s) => s;
  const r = path.relative(fold(parent), fold(child));
  return r === '' || (!r.startsWith('..') && !path.isAbsolute(r));
}

/** The folder of a copy of the site (a folder with assets/premium-key.json) that contains dir, or ''. */
function siteCopyAbove(dir) {
  for (let cur = dir; ; cur = path.dirname(cur)) {
    if (fs.existsSync(path.join(cur, 'assets', 'premium-key.json'))) return cur;
    if (path.dirname(cur) === cur) return '';
  }
}

/** Reads the private key without ever printing it (JSON.parse messages can quote the text, so they are not shown). */
function loadPrivateKey(opts, env) {
  let text = '';
  if (opts.key || env.PREMIUM_PRIVATE_KEY_FILE) {
    const file = opts.key || env.PREMIUM_PRIVATE_KEY_FILE;
    try { text = fs.readFileSync(file, 'utf8'); } catch (e) { throw new UsageError('Could not read the private key file (' + (e.code || 'error') + ').'); }
  } else if (env.PREMIUM_PRIVATE_KEY) {
    text = env.PREMIUM_PRIVATE_KEY;
  } else {
    throw new UsageError('Set PREMIUM_PRIVATE_KEY_FILE (or pass --key <file>) to the private key JWK. It is not in the repository: use the owner\'s private backup.');
  }
  let jwk;
  try { jwk = JSON.parse(text); } catch (e) { throw new UsageError('The private key is not valid JSON (a JWK is expected).'); }
  if (!jwk || typeof jwk !== 'object' || jwk.kty !== 'RSA') throw new UsageError('The private key must be an RSA JWK.');
  if (!jwk.d) throw new UsageError('The key has no "d" member: that is a public key, not the private key.');
  let key;
  try { key = crypto.createPrivateKey({ key: jwk, format: 'jwk' }); } catch (e) { throw new UsageError('The private key JWK is not valid (' + (e.code || 'error') + ').'); }
  return { key, kid: typeof jwk.kid === 'string' ? jwk.kid : '' };
}

/** Decrypts one tests/premium file text; returns { stub, plaintext } (plaintext = JSON text of the test). */
export function decryptStubText(text, privateKey) {
  const m = STUB_RE.exec(String(text));
  if (!m) throw new Error('not an encrypted Premium test file');
  let stub;
  try { stub = JSON.parse(m[1]); } catch (e) { throw new Error('the encrypted file is damaged (invalid JSON)'); }
  if (!stub || typeof stub.key !== 'string' || typeof stub.iv !== 'string' || typeof stub.data !== 'string') throw new Error('the encrypted file is missing key / iv / data');
  let aes;
  try {
    aes = crypto.privateDecrypt({ key: privateKey, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, oaepHash: 'sha256' }, Buffer.from(stub.key, 'base64'));
  } catch (e) {
    throw new Error('this private key cannot open it (it was encrypted for key "' + stub.kid + '")');
  }
  try {
    if (aes.length !== 32) throw new Error('bad key length');
    const data = Buffer.from(stub.data, 'base64');
    const iv = Buffer.from(stub.iv, 'base64');
    if (iv.length !== 12 || data.length < 16) throw new Error('bad iv / data');
    const d = crypto.createDecipheriv('aes-256-gcm', aes, iv, { authTagLength: 16 });
    d.setAuthTag(data.subarray(data.length - 16));
    const plaintext = Buffer.concat([d.update(data.subarray(0, data.length - 16)), d.final()]).toString('utf8');
    return { stub, plaintext };
  } catch (e) {
    throw new Error('the encrypted data is damaged or was modified (' + e.message + ')');
  } finally {
    aes.fill(0);
  }
}

/** What a plaintext test file registers (run in a sandbox; it is our own generated code). */
function registered(code) {
  const defs = [];
  vm.runInContext(code, vm.createContext({ SATLibrary: { register: (d) => { defs.push(d); } } }), { timeout: 10000 });
  return defs;
}

/**
 * Text of an editable plaintext test file that registers exactly the test whose JSON text is `plaintext`.
 * Uses the usual { id, source: String.raw`…` } form when that is exact, otherwise JSON; both are verified.
 */
export function plainFileText(plaintext, title) {
  const def = JSON.parse(plaintext);
  const label = String(title || (def && def.id) || 'Premium test').replace(/\*\//g, '* /').replace(/\s+/g, ' ');
  const header = '/*\n * ' + label + ' (Premium, decrypted for editing).\n' +
    ' * Do NOT commit this file. Edit it outside the repository, then copy it to tests/<name>.js and run\n' +
    ' * `node tools/premium/encrypt.mjs` right away (it encrypts it again and deletes the plaintext).\n */\n';
  const bodies = [];
  if (def && typeof def === 'object' && !Array.isArray(def) && Object.keys(def).join(',') === 'id,source' &&
      typeof def.id === 'string' && typeof def.source === 'string') {
    bodies.push('SATLibrary.register({\n  id: ' + JSON.stringify(def.id) + ',\n  source: String.raw`' + def.source + '`\n});\n');
  }
  bodies.push('SATLibrary.register(' + JSON.stringify(def, null, 2) + ');\n');
  for (const body of bodies) {
    let defs = null;
    try { defs = registered(header + body); } catch (e) { defs = null; }
    if (defs && defs.length === 1 && JSON.stringify(defs[0]) === plaintext) return header + body;
  }
  throw new Error('could not write it as a test file that registers exactly the same test');
}

export function main(argv, env = process.env, out = console) {
  let opts;
  try { opts = parseArgs(argv); } catch (e) { out.error('decrypt: ' + e.message + '\n' + USAGE); return 2; }
  if (opts.help) { out.log(USAGE); return 0; }
  const root = path.resolve(opts.root || REPO);
  const premiumDir = path.join(root, 'tests', 'premium');
  try {
    // Never write plaintext inside the repository (or the site folder given with --root).
    const protectedDirs = [realPath(REPO), realPath(root)];
    let outDir = opts.out ? realPath(opts.out) : '';
    if (outDir && (protectedDirs.some((d) => isInside(outDir, d)) || siteCopyAbove(outDir))) {
      throw new UsageError('Refusing to write decrypted tests inside the repository or a copy of the site (' + outDir + '): anything there can be committed and published. Use a folder outside it (the default is a new temporary folder).');
    }
    if (!fs.existsSync(premiumDir)) throw new UsageError('No tests/premium/ folder in ' + root + '.');
    const names = opts.all ? fs.readdirSync(premiumDir).filter((f) => f.endsWith('.js')).sort().map((f) => f.slice(0, -3)) : opts.names;
    if (!names.length) throw new UsageError('tests/premium/ has no encrypted tests.');
    const pk = loadPrivateKey(opts, env);
    if (!outDir) outDir = fs.mkdtempSync(path.join(os.tmpdir(), 'premium-plain-'));
    // A key that does not match the site's public key cannot open files encrypted with it.
    try {
      const pubJson = JSON.parse(fs.readFileSync(path.join(root, 'assets', 'premium-key.json'), 'utf8'));
      const spki = crypto.createPublicKey(pk.key).export({ type: 'spki', format: 'der' }).toString('base64');
      if (pubJson.spki !== spki) out.error('decrypt: warning: this private key does not match assets/premium-key.json (kid "' + pubJson.kid + '").');
    } catch (e) { /* no public key to compare with */ }
    fs.mkdirSync(outDir, { recursive: true, mode: 0o700 });
    let failed = 0;
    for (const name of names) {
      const src = path.join(premiumDir, name + '.js');
      try {
        let text;
        try { text = fs.readFileSync(src, 'utf8'); } catch (e) { throw new Error(e.code === 'ENOENT' ? 'no such file' : 'cannot read it (' + (e.code || e.message) + ')'); }
        const { stub, plaintext } = decryptStubText(text, pk.key);
        const file = path.join(outDir, name + '.js');
        let existing = null;
        try { existing = fs.lstatSync(file); } catch (e) { existing = null; }
        if (existing && !existing.isFile()) throw new Error(file + ' exists and is not a regular file (not overwritten)');
        fs.writeFileSync(file, plainFileText(plaintext, stub.title), { encoding: 'utf8', mode: 0o600 });
        out.log(file);
      } catch (e) {
        failed++;
        out.error('decrypt: tests/premium/' + name + '.js: ' + e.message);
      }
    }
    out.error('Decrypted ' + (names.length - failed) + ' of ' + names.length + ' test(s) into ' + outDir +
      '. Do NOT commit these files; after editing, copy one to tests/<name>.js and run node tools/premium/encrypt.mjs.');
    return failed ? 1 : 0;
  } catch (e) {
    out.error('decrypt: ' + (e && e.message || e));
    return e instanceof UsageError ? 2 : 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  process.exitCode = main(process.argv.slice(2));
}
