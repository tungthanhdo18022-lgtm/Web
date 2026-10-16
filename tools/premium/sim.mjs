#!/usr/bin/env node
/*
 * tunn.sat Premium server simulator: runs tools/premium/server/Code.gs UNCHANGED in Node (node:vm) with
 * fake Google Apps Script services, so the server can be tested locally without the owner's live
 * Apps Script project or real codes. Only Node built-ins are used (Node >= 18).
 *
 * Command line (a local server the site can talk to):
 *
 *   node tools/premium/sim.mjs --key /path/outside/repo/private-key.json [--port 8787] [--host 127.0.0.1]
 *        [--codes 3] [--days 0] [--note text] [--move-after-days 7] [--now 2026-10-12T08:00:00Z] [--no-redirect]
 *
 *   The private key is installed through the same code path as the owner's menu ("Cài đặt khóa bí mật…"),
 *   then --codes new codes are created through the "Tạo mã mới…" menu and printed. HTTP:
 *     GET  /exec (any path)   -> doGet(e)
 *     POST /exec (any path)   -> doPost(e) with e.postData.contents / e.postData.type
 *                               (like Apps Script, answered through a 302 redirect to /__sim/echo unless --no-redirect)
 *     OPTIONS                 -> 204; every response carries Access-Control-Allow-Origin: *
 *     GET  /__sim/codes, /__sim/log, /__sim/settings -> the sheet rows as JSON (simulator only)
 *   To try the site against it, serve the repo (python3 -m http.server 8080) and set, WITHOUT committing it,
 *   APP_CONFIG.premium.api = 'http://localhost:8787/exec' in assets/js/config.js.
 *
 * Programmatic API (used by tools/premium/test-server.mjs):
 *
 *   import { createSim } from './sim.mjs';
 *   const sim = createSim({ keyPath, moveAfterDays: 7, now: Date.parse('2026-10-12T08:00:00Z') });
 *   sim.doPost({ action: 'activate', code, device, info, files })   // -> parsed JSON answer
 *   sim.doGet()                                                     // -> parsed JSON answer
 *   sim.runMenu('menuCreateCodes' | 'Tạo mã mới…', ['5', '30', 'note'])   // scripted ui.prompt / ui.alert answers
 *   sim.createCodes(5, 30, 'note')                                  // -> ['TUNN-…', …] via the menu
 *   sim.rows('Codes'), sim.records('Codes'), sim.codeRecord(code)   // sheet contents (Dates for date cells)
 *   sim.setNow(ms | Date | ISO), sim.advance(ms), sim.now()         // fake clock (Date / new Date() inside Code.gs follow it)
 *   sim.setCell(sheet, row, colOrHeader, value), sim.setCodeField(code, header, value), sim.setSetting(name, value)
 *   sim.select(sheet, row, numRows) before runMenu('menuRevokeSelected' | 'menuResetDevice')
 *   sim.deleteRows(sheet, start, count), sim.insertColumns(sheet, before, count)   // owner edits (no script lock)
 *   sim.after('Lock.releaseLock' | 'Range.getValues' | …, (info) => …)  // run code (e.g. a 2nd request) in the middle of an execution
 *   sim.call('normalizeCode_', 'tunn …')                            // any global function of Code.gs, fresh execution
 *   sim.problems  // every call to a missing Apps Script API, write outside the script lock, formula written, … (should stay [])
 *
 * Every execution (doGet, doPost, a menu item, onOpen, call) loads Code.gs into a FRESH vm context, as Apps Script
 * does, so nothing survives between executions except the spreadsheet, Script Properties and the cache. Service
 * objects are strict: reading an API that Apps Script does not have (or that this simulator does not implement)
 * throws AND is recorded in sim.problems, so a call hidden inside a try/catch of Code.gs is still caught.
 * Utilities.* takes and returns Java-style SIGNED bytes (-128..127) and rejects anything else.
 * Sheet writes must happen while the execution holds the script lock, and must be flushed (SpreadsheetApp.flush())
 * before the lock is released: Apps Script batches writes, so another execution could otherwise read old values.
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import http from 'node:http';
import crypto from 'node:crypto';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
export const CODE_GS_PATH = path.join(HERE, 'server', 'Code.gs');

export class SimError extends Error {
  constructor(message) {
    super('[Apps Script sim] ' + message);
    this.name = 'AppsScriptSimError';
  }
}

const DAY = 86400000;
const PASSTHROUGH = new Set(['then', 'toJSON', 'asymmetricMatch', 'nodeType', '$$typeof']);

function describe(v) {
  if (v === null) return 'null';
  if (Array.isArray(v)) return 'array';
  return Object.prototype.toString.call(v).slice(8, -1).toLowerCase();
}
function isDateObj(v) { return Object.prototype.toString.call(v) === '[object Date]'; }
function isInt(v) { return typeof v === 'number' && Number.isInteger(v); }

/* ------------------------------------------------------------------------------------------------
 * Time zone helper (typed date strings are read in the spreadsheet's time zone, like Sheets does)
 * ---------------------------------------------------------------------------------------------- */
function tzOffsetMs(tz, utcMs) {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone: tz, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  });
  const parts = {};
  for (const p of dtf.formatToParts(new Date(utcMs))) parts[p.type] = p.value;
  const asUtc = Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute, +parts.second);
  return asUtc - Math.floor(utcMs / 1000) * 1000;
}

/* ------------------------------------------------------------------------------------------------
 * Spreadsheet model
 * ---------------------------------------------------------------------------------------------- */
class SheetData {
  constructor(name, id) {
    this.name = name;
    this.id = id;
    this.rows = [];          // rows[r-1][c-1] = cell ('' | number | boolean | string | { date: ms })
    this.maxRows = 1000;     // a new Google Sheet has 1000 rows x 26 columns
    this.maxCols = 26;
    this.frozenRows = 0;
    this.frozenCols = 0;
    this.widths = {};
    this.formats = [];       // [{ kind, row, col, numRows, numCols, value }]
    this.validations = [];   // [{ row, col, numRows, numCols, rule }]
    this.hiddenByFilter = new Set(); // row numbers
    this.hiddenByUser = new Set();
  }
  get(r, c) {
    const row = this.rows[r - 1];
    const v = row ? row[c - 1] : undefined;
    return v === undefined ? '' : v;
  }
  set(r, c, cell) {
    while (this.rows.length < r) this.rows.push([]);
    this.rows[r - 1][c - 1] = cell;
  }
  lastRow() {
    for (let r = this.rows.length; r >= 1; r--) {
      const row = this.rows[r - 1];
      if (row && row.some((v) => v !== undefined && v !== '')) return r;
    }
    return 0;
  }
  lastCol() {
    let m = 0;
    for (const row of this.rows) {
      if (!row) continue;
      for (let c = row.length; c > m; c--) {
        if (row[c - 1] !== undefined && row[c - 1] !== '') { m = c; break; }
      }
    }
    return m;
  }
  insertRowsAfter(after, n) {
    while (this.rows.length < after) this.rows.push([]);
    this.rows.splice(after, 0, ...Array.from({ length: n }, () => []));
    this.maxRows += n;
  }
  deleteRows(start, n) {
    this.rows.splice(start - 1, n);
    this.maxRows -= n;
  }
}

/* ------------------------------------------------------------------------------------------------
 * Date replacement installed in every execution context (fake clock)
 * ---------------------------------------------------------------------------------------------- */
const FAKE_DATE_SRC = `(function (nowFn) {
  'use strict';
  var RealDate = Date;
  function Date_() {
    if (!new.target) return new RealDate(nowFn()).toString();
    if (arguments.length === 0) return Reflect.construct(RealDate, [nowFn()], new.target);
    return Reflect.construct(RealDate, Array.prototype.slice.call(arguments), new.target);
  }
  Date_.prototype = RealDate.prototype;
  Object.defineProperty(RealDate.prototype, 'constructor', { value: Date_, writable: true, configurable: true });
  Object.defineProperty(Date_, 'name', { value: 'Date' });
  Date_.now = function now() { return nowFn(); };
  Date_.parse = RealDate.parse;
  Date_.UTC = RealDate.UTC;
  globalThis.Date = Date_;
  return {
    Date: Date_,
    newArray: function () { return []; },
    newObject: function () { return {}; }
  };
})`;

/* ------------------------------------------------------------------------------------------------
 * The simulator
 * ---------------------------------------------------------------------------------------------- */
export function createSim(options = {}) {
  const codePath = options.codePath || CODE_GS_PATH;
  const source = fs.readFileSync(codePath, 'utf8');
  for (let i = 0; i < source.length; i++) {
    const ch = source.charCodeAt(i);
    if (ch === 0x2028 || ch === 0x2029) throw new SimError('Code.gs contains a raw U+' + ch.toString(16).toUpperCase() + ' character at offset ' + i);
  }
  const script = new vm.Script(source, { filename: 'Code.gs' });
  const timeZone = options.timeZone || 'Asia/Ho_Chi_Minh';

  const state = {
    clock: options.now !== undefined && options.now !== null ? toMs(options.now) : null, // null = real time
    sheets: [],
    nextSheetId: 0,
    activeSheet: null,
    activeRange: null,       // { sheet, row, col, numRows, numCols }
    props: new Map(),
    cache: new Map(),        // key -> { value, expires }
    lock: { holder: null },  // lock id ('<exec>:<n>') or 'external'
    menus: [],
    faults: new Map(),
    hooks: new Map(),        // 'Service.method' -> [{ fn }] (sim.after)
    execCounter: 0,
    current: null,           // execution being run
    console: [],
    loggerLines: [],
    executions: [],
    uuidCalls: 0
  };
  const problems = [];
  const thrown = [];   // Apps Script runtime errors raised by the fake services (e.g. range outside the sheet)

  function toMs(t) {
    if (t instanceof Date || isDateObj(t)) return t.getTime();
    if (typeof t === 'number') return t;
    const ms = Date.parse(t);
    if (!Number.isFinite(ms)) throw new SimError('bad time: ' + t);
    return ms;
  }
  function now() { return state.clock === null ? Date.now() : state.clock; }

  function problem(msg) {
    problems.push(msg);
    return new SimError(msg);
  }
  /**
   * Hooks registered with sim.after(): called right after a service method returns, inside the execution
   * that called it (e.g. to run a second request "at the same time"). A hook that returns true is removed.
   */
  function runHooks(key) {
    const list = state.hooks.get(key);
    if (!list) return;
    const ex = state.current;
    const info = { execution: ex ? ex.kind : null, executionId: ex ? ex.id : null, lockHeld: !!(ex && state.lock.holder && state.lock.holder.startsWith(ex.id + ':')) };
    for (const h of list.slice()) {
      if (h.busy) continue; // a hook does not re-enter itself
      h.busy = true;
      let done;
      try {
        done = h.fn(info);
      } finally {
        h.busy = false;
      }
      if (done === true) list.splice(list.indexOf(h), 1);
    }
    if (!list.length) state.hooks.delete(key);
  }
  /** An error that real Apps Script raises too (recorded, so a try/catch in Code.gs cannot hide it). */
  function nativeError(msg) {
    thrown.push(msg);
    return new Error(msg);
  }

  /* -------------------------------- strict wrappers -------------------------------- */
  function strict(api, name) {
    return new Proxy(api, {
      get(t, p, r) {
        if (typeof p === 'symbol') return Reflect.get(t, p, r);
        const fault = state.faults.get(name + '.' + p);
        if (fault && typeof t[p] === 'function') return function () { throw fault; };
        const hooks = state.hooks.get(name + '.' + p);
        if (hooks && hooks.length && typeof t[p] === 'function') {
          const fn = t[p];
          return function () {
            const result = fn.apply(t, arguments);
            runHooks(name + '.' + p);
            return result;
          };
        }
        if (p in t) return Reflect.get(t, p, r);
        if (PASSTHROUGH.has(p)) return undefined;
        throw problem(name + '.' + p + ' is not an Apps Script API (or the simulator does not implement it)');
      },
      set(t, p) { throw problem('cannot assign ' + name + '.' + String(p)); },
      defineProperty(t, p) { throw problem('cannot define ' + name + '.' + String(p)); },
      deleteProperty(t, p) { throw problem('cannot delete ' + name + '.' + String(p)); }
    });
  }
  function enumOf(name, keys, values) {
    const out = {};
    keys.forEach((k, i) => {
      out[k] = Object.freeze({ name: k, value: values ? values[i] : k, toString() { return k; }, toJSON() { return k; } });
    });
    return strict(Object.freeze(out), name);
  }
  function argCount(where, args, min, max) {
    if (args.length < min || args.length > max) {
      throw problem(where + ' called with ' + args.length + ' argument(s); Apps Script expects ' +
        (min === max ? min : min + '-' + max));
    }
  }
  function needInt(where, v, min, max) {
    if (!isInt(v) || v < min || (max !== undefined && v > max)) {
      throw problem(where + ': expected an integer' + (max !== undefined ? ' in ' + min + '..' + max : ' >= ' + min) + ', got ' + String(v));
    }
  }
  function needString(where, v) {
    if (typeof v !== 'string') throw problem(where + ': expected a string, got ' + describe(v));
  }

  /* -------------------------------- cells -------------------------------- */
  function inputToCell(v, where) {
    if (v === null || v === undefined) return '';
    if (typeof v === 'number') {
      if (!Number.isFinite(v)) throw problem('non-finite number written to ' + where);
      return v;
    }
    if (typeof v === 'boolean') return v;
    if (isDateObj(v)) {
      const t = v.getTime();
      if (!Number.isFinite(t)) throw problem('invalid Date written to ' + where);
      return { date: t };
    }
    if (typeof v === 'string') {
      if (v === '') return '';
      if (v.charAt(0) === "'") return v.slice(1); // text marker: stored as plain text, apostrophe hidden
      if (v.charAt(0) === '=') {
        throw problem('a formula was written to ' + where + ': ' + JSON.stringify(v.slice(0, 60)));
      }
      const s = v.trim();
      if (/^[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?$/.test(s)) return Number(s);
      if (/^(true|false)$/i.test(s)) return s.toLowerCase() === 'true';
      const m = /^(\d{4})-(\d{1,2})-(\d{1,2})(?:[ T](\d{1,2}):(\d{2})(?::(\d{2}))?)?$/.exec(s);
      if (m) {
        const local = Date.UTC(+m[1], +m[2] - 1, +m[3], +(m[4] || 0), +(m[5] || 0), +(m[6] || 0));
        return { date: local - tzOffsetMs(timeZone, local) };
      }
      return v;
    }
    throw problem('cannot write a ' + describe(v) + ' to ' + where + ' (Sheets accepts strings, numbers, booleans and Dates)');
  }
  function cellToMain(cell) {
    if (cell && typeof cell === 'object' && 'date' in cell) return new Date(cell.date);
    return cell;
  }

  /* -------------------------------- book -------------------------------- */
  function addSheet(name, index) {
    const sd = new SheetData(name, state.nextSheetId++);
    if (index === undefined || index > state.sheets.length) state.sheets.push(sd);
    else state.sheets.splice(index, 0, sd);
    return sd;
  }
  addSheet('Sheet1');
  state.activeSheet = state.sheets[0];
  function sheetByName(name) { return state.sheets.find((s) => s.name === name) || null; }
  function needSheet(name) {
    const sd = sheetByName(name);
    if (!sd) throw new SimError('no sheet named ' + name);
    return sd;
  }

  /* -------------------------------- executions -------------------------------- */
  function startExecution(kind, uiAnswers) {
    const ex = {
      id: ++state.execCounter,
      kind,                      // 'web' | 'menu' | 'trigger' | 'editor'
      answers: uiAnswers ? uiAnswers.slice() : [],
      ui: [],
      lockSeq: 0,
      unflushed: null,           // description of the last sheet write not yet flushed
      outputs: new WeakMap(),    // TextOutput / HtmlOutput proxy -> state
      startedAt: Date.now()
    };
    const ctx = vm.createContext({}, { name: 'Apps Script execution ' + ex.id });
    vm.runInContext('delete globalThis.console;', ctx);
    const realm = vm.runInContext(FAKE_DATE_SRC, ctx)(now);
    ex.Date = realm.Date;
    ex.newArray = realm.newArray;
    ex.newObject = realm.newObject;
    const services = buildServices(ex);
    for (const k of Object.keys(services)) {
      Object.defineProperty(ctx, k, { value: services[k], writable: false, enumerable: false, configurable: false });
    }
    ex.ctx = ctx;
    state.current = ex;
    script.runInContext(ctx);
    return ex;
  }
  function endExecution(ex) {
    if (state.lock.holder && state.lock.holder.startsWith(ex.id + ':')) {
      problems.push('execution ' + ex.id + ' (' + ex.kind + ') ended without releasing the script lock');
      state.lock.holder = null;
    }
    if (ex.answers.length) {
      const left = ex.answers.length;
      ex.answers.length = 0;
      state.current = null;
      throw new SimError(left + ' scripted UI answer(s) were not used');
    }
    state.executions.push({ id: ex.id, kind: ex.kind, ms: Date.now() - ex.startedAt });
    state.current = null;
  }
  function vmArray(ex, list) {
    const a = ex.newArray();
    for (let i = 0; i < list.length; i++) a.push(list[i]);
    return a;
  }
  function cellToVm(ex, cell) {
    if (cell && typeof cell === 'object' && 'date' in cell) return new ex.Date(cell.date);
    return cell;
  }

  /* -------------------------------- services -------------------------------- */
  function buildServices(ex) {
    const writeCheck = (what) => {
      const h = state.lock.holder;
      if (!h || !h.startsWith(ex.id + ':')) {
        throw problem(what + ' outside LockService.getScriptLock() (execution ' + ex.id + ', ' + ex.kind + ')');
      }
      // Apps Script batches spreadsheet writes: until SpreadsheetApp.flush() (or the end of the execution)
      // another execution may not see them. Releasing the lock before flushing is reported (see Lock below).
      ex.unflushed = what;
    };

    /* ---------- Range ---------- */
    function makeRange(sd, row, col, numRows, numCols) {
      const where = () => sd.name + '!' + a1(row, col, numRows, numCols);
      const fmt = (kind, value) => { writeCheck('Range.' + kind + ' on ' + where()); sd.formats.push({ kind, row, col, numRows, numCols, value }); return proxy; };
      const api = {
        getRow() { return row; },
        getColumn() { return col; },
        getLastRow() { return row + numRows - 1; },
        getLastColumn() { return col + numCols - 1; },
        getNumRows() { return numRows; },
        getNumColumns() { return numCols; },
        getSheet() { return sheetApi(sd); },
        getA1Notation() { return a1(row, col, numRows, numCols); },
        getValues() {
          const out = ex.newArray();
          for (let r = 0; r < numRows; r++) {
            const line = ex.newArray();
            for (let c = 0; c < numCols; c++) line.push(cellToVm(ex, sd.get(row + r, col + c)));
            out.push(line);
          }
          return out;
        },
        getValue() { return cellToVm(ex, sd.get(row, col)); },
        getDisplayValues() {
          const out = ex.newArray();
          for (let r = 0; r < numRows; r++) {
            const line = ex.newArray();
            for (let c = 0; c < numCols; c++) {
              const v = sd.get(row + r, col + c);
              line.push(v && typeof v === 'object' ? new Date(v.date).toISOString() : String(v));
            }
            out.push(line);
          }
          return out;
        },
        setValues(values) {
          argCount('Range.setValues', arguments, 1, 1);
          if (!Array.isArray(values)) throw problem('Range.setValues on ' + where() + ': expected a 2D array, got ' + describe(values));
          if (values.length !== numRows) {
            throw problem('Range.setValues on ' + where() + ': the data has ' + values.length + ' rows but the range has ' + numRows);
          }
          values.forEach((line, i) => {
            if (!Array.isArray(line)) throw problem('Range.setValues on ' + where() + ': row ' + i + ' is not an array');
            if (line.length !== numCols) {
              throw problem('Range.setValues on ' + where() + ': the data has ' + line.length + ' columns but the range has ' + numCols);
            }
          });
          writeCheck('Range.setValues on ' + where());
          const cells = values.map((line, i) => line.map((v, j) => inputToCell(v, sd.name + '!' + a1(row + i, col + j, 1, 1))));
          cells.forEach((line, i) => line.forEach((cell, j) => sd.set(row + i, col + j, cell)));
          return proxy;
        },
        setValue(v) {
          argCount('Range.setValue', arguments, 1, 1);
          writeCheck('Range.setValue on ' + where());
          const cell = inputToCell(v, where());
          for (let r = 0; r < numRows; r++) for (let c = 0; c < numCols; c++) sd.set(row + r, col + c, cell);
          return proxy;
        },
        clearContent() {
          writeCheck('Range.clearContent on ' + where());
          for (let r = 0; r < numRows; r++) for (let c = 0; c < numCols; c++) sd.set(row + r, col + c, '');
          return proxy;
        },
        setNumberFormat(f) { needString('Range.setNumberFormat', f); return fmt('numberFormat', f); },
        setNumberFormats(formats) {
          if (!Array.isArray(formats) || formats.length !== numRows || formats.some((l) => !Array.isArray(l) || l.length !== numCols || l.some((f) => typeof f !== 'string'))) {
            throw problem('Range.setNumberFormats on ' + where() + ': expected a ' + numRows + 'x' + numCols + ' array of strings');
          }
          return fmt('numberFormats', formats.map((l) => l.slice()));
        },
        setFontWeight(w) {
          if (w !== null && w !== 'bold' && w !== 'normal') throw problem('Range.setFontWeight: expected "bold", "normal" or null, got ' + String(w));
          return fmt('fontWeight', w);
        },
        setFontFamily(f) { if (f !== null) needString('Range.setFontFamily', f); return fmt('fontFamily', f); },
        setFontColor(c) { if (c !== null) needString('Range.setFontColor', c); return fmt('fontColor', c); },
        setBackground(c) { if (c !== null) needString('Range.setBackground', c); return fmt('background', c); },
        setHorizontalAlignment(a) { return fmt('horizontalAlignment', a); },
        setVerticalAlignment(a) { return fmt('verticalAlignment', a); },
        setWrap(b) { if (typeof b !== 'boolean') throw problem('Range.setWrap: expected a boolean'); return fmt('wrap', b); },
        setDataValidation(rule) {
          argCount('Range.setDataValidation', arguments, 1, 1);
          if (rule !== null && !validationRules.has(rule)) throw problem('Range.setDataValidation: expected a DataValidation from SpreadsheetApp.newDataValidation().build()');
          writeCheck('Range.setDataValidation on ' + where());
          sd.validations.push({ row, col, numRows, numCols, rule: rule ? validationRules.get(rule) : null });
          return proxy;
        },
        activate() { state.activeSheet = sd; state.activeRange = { sheet: sd, row, col, numRows, numCols }; return proxy; }
      };
      const proxy = strict(api, 'Range');
      return proxy;
    }
    function a1(row, col, numRows, numCols) {
      const letters = (c) => { let s = ''; while (c > 0) { const m = (c - 1) % 26; s = String.fromCharCode(65 + m) + s; c = Math.floor((c - 1) / 26); } return s; };
      const first = letters(col) + row;
      return numRows === 1 && numCols === 1 ? first : first + ':' + letters(col + numCols - 1) + (row + numRows - 1);
    }
    function parseA1(sd, text) {
      const m = /^([A-Z]+)(\d+)(?::([A-Z]+)(\d+))?$/.exec(String(text).trim().toUpperCase());
      if (!m) throw problem('Sheet.getRange: unsupported A1 notation ' + JSON.stringify(text));
      const colOf = (s) => s.split('').reduce((n, ch) => n * 26 + ch.charCodeAt(0) - 64, 0);
      const r1 = +m[2]; const c1 = colOf(m[1]);
      const r2 = m[3] ? +m[4] : r1; const c2 = m[3] ? colOf(m[3]) : c1;
      return [Math.min(r1, r2), Math.min(c1, c2), Math.abs(r2 - r1) + 1, Math.abs(c2 - c1) + 1];
    }

    /* ---------- Sheet ---------- */
    function sheetApi(sd) {
      const live = () => {
        if (!state.sheets.includes(sd)) throw problem('the sheet "' + sd.name + '" was deleted');
      };
      const api = {
        getName() { live(); return sd.name; },
        setName(name) {
          live();
          needString('Sheet.setName', name);
          if (!name.trim()) throw problem('Sheet.setName: empty name');
          const other = sheetByName(name);
          if (other && other !== sd) throw nativeError('A sheet with the name "' + name + '" already exists. Please enter another name.');
          writeCheck('Sheet.setName');
          sd.name = name;
          return proxy;
        },
        getSheetId() { return sd.id; },
        getIndex() { live(); return state.sheets.indexOf(sd) + 1; },
        getParent() { return spreadsheetApi(); },
        getRange(a, b, c, d) {
          live();
          let row, col, numRows = 1, numCols = 1;
          if (arguments.length === 1 && typeof a === 'string') {
            [row, col, numRows, numCols] = parseA1(sd, a);
          } else {
            argCount('Sheet.getRange', arguments, 2, 4);
            row = a; col = b;
            if (arguments.length >= 3) numRows = c;
            if (arguments.length === 4) numCols = d;
            for (const [n, v] of [['row', row], ['column', col]]) {
              if (!isInt(v) || v < 1) throw nativeError('Sheet.getRange: the ' + n + ' must be an integer >= 1 (got ' + String(v) + ')');
            }
            if (!isInt(numRows) || numRows < 1) throw nativeError('The number of rows in the range must be at least 1. (got ' + String(numRows) + ')');
            if (!isInt(numCols) || numCols < 1) throw nativeError('The number of columns in the range must be at least 1. (got ' + String(numCols) + ')');
          }
          if (row + numRows - 1 > sd.maxRows || col + numCols - 1 > sd.maxCols) {
            throw nativeError('The coordinates of the range are outside the dimensions of the sheet.');
          }
          return makeRange(sd, row, col, numRows, numCols);
        },
        getDataRange() {
          live();
          return makeRange(sd, 1, 1, Math.max(1, sd.lastRow()), Math.max(1, sd.lastCol()));
        },
        getLastRow() { live(); return sd.lastRow(); },
        getLastColumn() { live(); return sd.lastCol(); },
        getMaxRows() { live(); return sd.maxRows; },
        getMaxColumns() { live(); return sd.maxCols; },
        appendRow(values) {
          live();
          argCount('Sheet.appendRow', arguments, 1, 1);
          if (!Array.isArray(values) || !values.length) throw problem('Sheet.appendRow: expected a non-empty array');
          writeCheck('Sheet.appendRow on ' + sd.name);
          const r = sd.lastRow() + 1;
          const cells = values.map((v, j) => inputToCell(v, sd.name + '!' + a1(r, j + 1, 1, 1)));
          if (r > sd.maxRows) sd.maxRows = r;
          if (cells.length > sd.maxCols) sd.maxCols = cells.length;
          cells.forEach((cell, j) => sd.set(r, j + 1, cell));
          return proxy;
        },
        insertRowsAfter(after, howMany) {
          live();
          needInt('Sheet.insertRowsAfter(afterPosition)', after, 1, sd.maxRows);
          needInt('Sheet.insertRowsAfter(howMany)', howMany, 1);
          writeCheck('Sheet.insertRowsAfter on ' + sd.name);
          sd.insertRowsAfter(after, howMany);
          return proxy;
        },
        insertRows(rowIndex, numRows) {
          live();
          needInt('Sheet.insertRows(rowIndex)', rowIndex, 1, sd.maxRows);
          if (numRows === undefined) numRows = 1;
          needInt('Sheet.insertRows(numRows)', numRows, 1);
          writeCheck('Sheet.insertRows on ' + sd.name);
          sd.insertRowsAfter(rowIndex - 1, numRows);
        },
        insertRowsBefore(before, howMany) {
          live();
          needInt('Sheet.insertRowsBefore(beforePosition)', before, 1, sd.maxRows);
          needInt('Sheet.insertRowsBefore(howMany)', howMany, 1);
          writeCheck('Sheet.insertRowsBefore on ' + sd.name);
          sd.insertRowsAfter(before - 1, howMany);
          return proxy;
        },
        deleteRows(start, howMany) {
          live();
          needInt('Sheet.deleteRows(rowPosition)', start, 1, sd.maxRows);
          needInt('Sheet.deleteRows(howMany)', howMany, 1, sd.maxRows - start + 1);
          writeCheck('Sheet.deleteRows on ' + sd.name);
          if (sd.maxRows - howMany <= sd.frozenRows) throw nativeError('Sorry, it is not possible to delete all non-frozen rows.');
          sd.deleteRows(start, howMany);
        },
        deleteRow(position) {
          live();
          needInt('Sheet.deleteRow', position, 1, sd.maxRows);
          writeCheck('Sheet.deleteRow on ' + sd.name);
          if (sd.maxRows - 1 <= sd.frozenRows) throw nativeError('Sorry, it is not possible to delete all non-frozen rows.');
          sd.deleteRows(position, 1);
          return proxy;
        },
        setFrozenRows(n) {
          live();
          needInt('Sheet.setFrozenRows', n, 0, sd.maxRows - 1);
          writeCheck('Sheet.setFrozenRows on ' + sd.name);
          sd.frozenRows = n;
        },
        getFrozenRows() { return sd.frozenRows; },
        setFrozenColumns(n) {
          live();
          needInt('Sheet.setFrozenColumns', n, 0, sd.maxCols - 1);
          writeCheck('Sheet.setFrozenColumns on ' + sd.name);
          sd.frozenCols = n;
        },
        getFrozenColumns() { return sd.frozenCols; },
        setColumnWidth(col, width) {
          live();
          needInt('Sheet.setColumnWidth(columnPosition)', col, 1, sd.maxCols);
          needInt('Sheet.setColumnWidth(width)', width, 0);
          writeCheck('Sheet.setColumnWidth on ' + sd.name);
          sd.widths[col] = width;
          return proxy;
        },
        setColumnWidths(start, num, width) {
          live();
          needInt('Sheet.setColumnWidths(startColumn)', start, 1, sd.maxCols);
          needInt('Sheet.setColumnWidths(numColumns)', num, 1, sd.maxCols - start + 1);
          needInt('Sheet.setColumnWidths(width)', width, 0);
          writeCheck('Sheet.setColumnWidths on ' + sd.name);
          for (let i = 0; i < num; i++) sd.widths[start + i] = width;
          return proxy;
        },
        getColumnWidth(col) { return sd.widths[col] || 100; },
        isRowHiddenByFilter(r) { live(); needInt('Sheet.isRowHiddenByFilter', r, 1, sd.maxRows); return sd.hiddenByFilter.has(r); },
        isRowHiddenByUser(r) { live(); needInt('Sheet.isRowHiddenByUser', r, 1, sd.maxRows); return sd.hiddenByUser.has(r); },
        activate() { live(); state.activeSheet = sd; return proxy; }
      };
      const proxy = strict(api, 'Sheet');
      return proxy;
    }

    /* ---------- Spreadsheet ---------- */
    let ssProxy = null;
    function spreadsheetApi() {
      if (ssProxy) return ssProxy;
      const api = {
        getName() { return 'tunn.sat Premium (simulator)'; },
        getId() { return 'sim-spreadsheet'; },
        getUrl() { return 'https://docs.google.com/spreadsheets/d/sim-spreadsheet/edit'; },
        getSpreadsheetTimeZone() { return timeZone; },
        getSheetByName(name) {
          argCount('Spreadsheet.getSheetByName', arguments, 1, 1);
          needString('Spreadsheet.getSheetByName', name);
          const sd = sheetByName(name);
          return sd ? sheetApi(sd) : null;
        },
        getSheets() { return vmArray(ex, state.sheets.map(sheetApi)); },
        getNumSheets() { return state.sheets.length; },
        insertSheet(a, b) {
          let name = null;
          let index;
          if (typeof a === 'string') { name = a; index = b; } else if (a !== undefined) { index = a; }
          if (index !== undefined) needInt('Spreadsheet.insertSheet(sheetIndex)', index, 0, state.sheets.length);
          if (name !== null) {
            if (!name.trim()) throw problem('Spreadsheet.insertSheet: empty sheet name');
            if (sheetByName(name)) throw nativeError('A sheet with the name "' + name + '" already exists. Please enter another name.');
          } else {
            let i = state.sheets.length + 1;
            while (sheetByName('Sheet' + i)) i++;
            name = 'Sheet' + i;
          }
          writeCheck('Spreadsheet.insertSheet');
          const sd = addSheet(name, index);
          state.activeSheet = sd;
          return sheetApi(sd);
        },
        deleteSheet(sheet) {
          const sd = state.sheets.find((s) => s.id === sheet.getSheetId());
          if (!sd) throw problem('Spreadsheet.deleteSheet: unknown sheet');
          if (state.sheets.length === 1) throw nativeError('You can\'t remove all the sheets in a document.');
          writeCheck('Spreadsheet.deleteSheet');
          state.sheets.splice(state.sheets.indexOf(sd), 1);
          if (state.activeSheet === sd) state.activeSheet = state.sheets[0];
        },
        getActiveSheet() { return sheetApi(state.activeSheet || state.sheets[0]); },
        setActiveSheet(sheet) {
          const sd = state.sheets.find((s) => s.id === sheet.getSheetId());
          if (!sd) throw problem('Spreadsheet.setActiveSheet: unknown sheet');
          state.activeSheet = sd;
          return sheet;
        },
        getActiveRange() { return activeRange(); },
        toast(msg, title, seconds) { ex.ui.push({ type: 'toast', message: String(msg), title: title === undefined ? '' : String(title), seconds }); }
      };
      ssProxy = strict(api, 'Spreadsheet');
      return ssProxy;
    }
    function activeRange() {
      const ar = state.activeRange;
      if (!ar || !state.sheets.includes(ar.sheet)) return null;
      return makeRange(ar.sheet, ar.row, ar.col, ar.numRows, ar.numCols);
    }

    /* ---------- Data validation ---------- */
    const validationRules = new WeakMap();
    function newDataValidation() {
      const rule = { type: null, values: null, showDropdown: true, allowInvalid: true, helpText: '' };
      const api = {
        requireValueInList(values, showDropdown) {
          if (!Array.isArray(values) || !values.length || values.some((v) => typeof v !== 'string')) {
            throw problem('DataValidationBuilder.requireValueInList: expected a non-empty array of strings');
          }
          rule.type = 'VALUE_IN_LIST';
          rule.values = Array.from(values);
          if (showDropdown !== undefined) {
            if (typeof showDropdown !== 'boolean') throw problem('requireValueInList(values, showDropdown): showDropdown must be a boolean');
            rule.showDropdown = showDropdown;
          }
          return proxy;
        },
        setAllowInvalid(b) {
          if (typeof b !== 'boolean') throw problem('DataValidationBuilder.setAllowInvalid: expected a boolean');
          rule.allowInvalid = b;
          return proxy;
        },
        setHelpText(t) { needString('DataValidationBuilder.setHelpText', t); rule.helpText = t; return proxy; },
        build() {
          if (!rule.type) throw problem('DataValidationBuilder.build: no criteria set');
          const frozen = Object.freeze({ ...rule, values: Array.from(rule.values) });
          const dv = strict({
            getCriteriaType() { return frozen.type; },
            getCriteriaValues() { return vmArray(ex, [vmArray(ex, frozen.values), frozen.showDropdown]); },
            getAllowInvalid() { return frozen.allowInvalid; },
            getHelpText() { return frozen.helpText; }
          }, 'DataValidation');
          validationRules.set(dv, frozen);
          return dv;
        }
      };
      const proxy = strict(api, 'DataValidationBuilder');
      return proxy;
    }

    /* ---------- Ui ---------- */
    const ButtonSet = enumOf('Ui.ButtonSet', ['OK', 'OK_CANCEL', 'YES_NO', 'YES_NO_CANCEL']);
    const Button = enumOf('Ui.Button', ['CLOSE', 'OK', 'CANCEL', 'YES', 'NO']);
    const BUTTONS_OF = { OK: ['OK', 'CLOSE'], OK_CANCEL: ['OK', 'CANCEL', 'CLOSE'], YES_NO: ['YES', 'NO', 'CLOSE'], YES_NO_CANCEL: ['YES', 'NO', 'CANCEL', 'CLOSE'] };
    const isButtonSet = (v) => Object.keys(BUTTONS_OF).some((k) => ButtonSet[k] === v);
    function dialogArgs(where, args) {
      // (prompt) | (prompt, buttons) | (title, prompt, buttons)
      let title = '', message, buttons = ButtonSet.OK;
      if (args.length === 1) message = args[0];
      else if (args.length === 2) { message = args[0]; buttons = args[1]; }
      else if (args.length === 3) { title = args[0]; message = args[1]; buttons = args[2]; }
      else throw problem(where + ' called with ' + args.length + ' arguments');
      needString(where + '(title)', title);
      needString(where + '(prompt)', message);
      if (!isButtonSet(buttons)) throw problem(where + ': buttons must be a Ui.ButtonSet value');
      return { title, message, buttons: buttons.name };
    }
    let uiProxy = null;
    function getUi() {
      if (ex.kind === 'web') throw problem('Cannot call SpreadsheetApp.getUi() from this context (web app execution).');
      if (uiProxy) return uiProxy;
      const api = {
        ButtonSet,
        Button,
        alert() {
          const d = dialogArgs('Ui.alert', arguments);
          let answer = 'OK';
          if (d.buttons !== 'OK') {
            if (!ex.answers.length) throw new SimError('no scripted answer for ui.alert(' + JSON.stringify(d.title || d.message.slice(0, 60)) + ')');
            answer = String(ex.answers.shift() || '').toUpperCase();
            if (!BUTTONS_OF[d.buttons].includes(answer)) throw new SimError('scripted answer ' + answer + ' is not a button of ' + d.buttons);
          }
          ex.ui.push({ type: 'alert', title: d.title, message: d.message, buttons: d.buttons, answer });
          return Button[answer];
        },
        prompt() {
          const d = dialogArgs('Ui.prompt', arguments);
          if (!ex.answers.length) throw new SimError('no scripted answer for ui.prompt(' + JSON.stringify(d.title || d.message.slice(0, 60)) + ')');
          let a = ex.answers.shift();
          if (a === null) a = { button: d.buttons === 'YES_NO' ? 'NO' : d.buttons === 'OK' ? 'CLOSE' : 'CANCEL', text: '' };
          else if (typeof a === 'string') a = { button: d.buttons.startsWith('YES') ? 'YES' : 'OK', text: a };
          if (!BUTTONS_OF[d.buttons].includes(a.button)) throw new SimError('scripted answer ' + a.button + ' is not a button of ' + d.buttons);
          ex.ui.push({ type: 'prompt', title: d.title, message: d.message, buttons: d.buttons, answer: a.button, text: a.text });
          return strict({
            getResponseText() { return String(a.text); },
            getSelectedButton() { return Button[a.button]; }
          }, 'PromptResponse');
        },
        showModalDialog(output, title) {
          argCount('Ui.showModalDialog', arguments, 2, 2);
          const o = ex.outputs.get(output);
          if (!o || o.kind !== 'html') throw problem('Ui.showModalDialog: expected an HtmlOutput');
          needString('Ui.showModalDialog(title)', title);
          ex.ui.push({ type: 'dialog', modal: true, title, html: o.content, width: o.width, height: o.height });
        },
        showModelessDialog(output, title) {
          argCount('Ui.showModelessDialog', arguments, 2, 2);
          const o = ex.outputs.get(output);
          if (!o || o.kind !== 'html') throw problem('Ui.showModelessDialog: expected an HtmlOutput');
          ex.ui.push({ type: 'dialog', modal: false, title, html: o.content, width: o.width, height: o.height });
        },
        showSidebar(output) {
          const o = ex.outputs.get(output);
          if (!o || o.kind !== 'html') throw problem('Ui.showSidebar: expected an HtmlOutput');
          ex.ui.push({ type: 'sidebar', html: o.content });
        },
        createMenu(caption) {
          needString('Ui.createMenu', caption);
          return makeMenu(caption);
        }
      };
      uiProxy = strict(api, 'Ui');
      return uiProxy;
    }
    function makeMenu(caption) {
      const menu = { caption, items: [] };
      const api = {
        addItem(itemCaption, functionName) {
          argCount('Menu.addItem', arguments, 2, 2);
          needString('Menu.addItem(caption)', itemCaption);
          needString('Menu.addItem(functionName)', functionName);
          menu.items.push({ caption: itemCaption, fn: functionName });
          return proxy;
        },
        addSeparator() { menu.items.push({ separator: true }); return proxy; },
        addSubMenu(sub) { menu.items.push({ submenu: sub }); return proxy; },
        addToUi() {
          for (const it of menu.items) {
            if (it.fn && typeof ex.ctx[it.fn] !== 'function') throw problem('menu item "' + it.caption + '" calls ' + it.fn + '(), which is not a global function');
          }
          state.menus = state.menus.filter((m) => m.caption !== caption).concat([menu]);
        }
      };
      const proxy = strict(api, 'Menu');
      return proxy;
    }

    const SpreadsheetApp = strict({
      getActiveSpreadsheet() { return spreadsheetApi(); },
      getActive() { return spreadsheetApi(); },
      getActiveSheet() { return spreadsheetApi().getActiveSheet(); },
      getActiveRange() { return activeRange(); },
      getActiveRangeList() {
        const r = activeRange();
        if (!r) return null;
        return strict({ getRanges() { return vmArray(ex, [r]); } }, 'RangeList');
      },
      getUi,
      newDataValidation,
      flush() { argCount('SpreadsheetApp.flush', arguments, 0, 0); ex.unflushed = null; }
    }, 'SpreadsheetApp');

    /* ---------- PropertiesService ---------- */
    const scriptProps = strict({
      getProperty(key) {
        argCount('Properties.getProperty', arguments, 1, 1);
        needString('Properties.getProperty', key);
        return state.props.has(key) ? state.props.get(key) : null;
      },
      setProperty(key, value) {
        argCount('Properties.setProperty', arguments, 2, 2);
        needString('Properties.setProperty(key)', key);
        needString('Properties.setProperty(value)', value);
        if (Buffer.byteLength(value, 'utf8') > 9 * 1024) throw nativeError('Argument too large: value');
        state.props.set(key, value);
        let total = 0;
        for (const [k, v] of state.props) total += Buffer.byteLength(k + v, 'utf8');
        if (total > 500 * 1024) { state.props.delete(key); throw nativeError('You have exceeded the property storage quota.'); }
        return scriptProps;
      },
      deleteProperty(key) { needString('Properties.deleteProperty', key); state.props.delete(key); return scriptProps; },
      getKeys() { return vmArray(ex, [...state.props.keys()]); },
      getProperties() { const o = ex.newObject(); for (const [k, v] of state.props) o[k] = v; return o; },
      deleteAllProperties() { state.props.clear(); return scriptProps; }
    }, 'Properties');
    const PropertiesService = strict({ getScriptProperties() { return scriptProps; } }, 'PropertiesService');

    /* ---------- CacheService ---------- */
    const cacheGet = (key) => {
      const e = state.cache.get(key);
      if (!e) return null;
      if (e.expires <= now()) { state.cache.delete(key); return null; }
      return e.value;
    };
    const cacheKey = (where, key) => {
      needString(where + '(key)', key);
      if (!key.length || key.length > 250) throw nativeError('Argument too large: key (' + key.length + ' characters; the maximum is 250)');
    };
    const cachePut = (where, key, value, ttl) => {
      cacheKey(where, key);
      needString(where + '(value)', value);
      if (Buffer.byteLength(value, 'utf8') > 100 * 1024) throw nativeError('Argument too large: value');
      state.cache.set(key, { value, expires: now() + ttl * 1000 });
    };
    const cacheTtl = (where, ttl) => {
      if (ttl === undefined) return 600;
      if (typeof ttl !== 'number' || !Number.isFinite(ttl) || ttl < 1 || ttl > 21600) {
        throw problem(where + ': expirationInSeconds must be 1..21600, got ' + String(ttl));
      }
      return Math.floor(ttl);
    };
    const scriptCache = strict({
      get(key) { argCount('Cache.get', arguments, 1, 1); cacheKey('Cache.get', key); return cacheGet(key); },
      getAll(keys) {
        argCount('Cache.getAll', arguments, 1, 1);
        if (!Array.isArray(keys)) throw problem('Cache.getAll: expected an array of keys');
        const out = ex.newObject();
        for (const k of keys) { cacheKey('Cache.getAll', k); const v = cacheGet(k); if (v !== null) out[k] = v; }
        return out;
      },
      put(key, value, ttl) {
        argCount('Cache.put', arguments, 2, 3);
        cachePut('Cache.put', key, value, cacheTtl('Cache.put', ttl));
      },
      putAll(values, ttl) {
        argCount('Cache.putAll', arguments, 1, 2);
        if (!values || typeof values !== 'object' || Array.isArray(values)) throw problem('Cache.putAll: expected an object');
        const t = cacheTtl('Cache.putAll', ttl);
        const keys = Object.keys(values);
        if (keys.length > 1000) throw problem('Cache.putAll: more than 1000 entries');
        for (const k of keys) cachePut('Cache.putAll', k, values[k], t);
      },
      remove(key) { argCount('Cache.remove', arguments, 1, 1); cacheKey('Cache.remove', key); state.cache.delete(key); },
      removeAll(keys) {
        if (!Array.isArray(keys)) throw problem('Cache.removeAll: expected an array of keys');
        for (const k of keys) { cacheKey('Cache.removeAll', k); state.cache.delete(k); }
      }
    }, 'Cache');
    const CacheService = strict({ getScriptCache() { return scriptCache; } }, 'CacheService');

    /* ---------- LockService ---------- */
    function makeLock() {
      const id = ex.id + ':' + (++ex.lockSeq);
      const timeout = (where, ms) => {
        if (typeof ms !== 'number' || !Number.isFinite(ms) || ms < 0 || ms > 300000) throw problem(where + ': timeoutInMillis must be 0..300000, got ' + String(ms));
      };
      const tryLock = (ms) => {
        if (state.lock.holder === id) return true;
        if (state.lock.holder === null) { state.lock.holder = id; return true; }
        return false; // another execution (or another Lock object) holds it
      };
      const api = {
        tryLock(ms) { argCount('Lock.tryLock', arguments, 1, 1); timeout('Lock.tryLock', ms); return tryLock(ms); },
        waitLock(ms) {
          argCount('Lock.waitLock', arguments, 1, 1);
          timeout('Lock.waitLock', ms);
          if (!tryLock(ms)) throw nativeError('Lock timeout: another process was holding the lock for too long.');
        },
        releaseLock() {
          if (state.lock.holder !== id) return;
          if (ex.unflushed) {
            problems.push('execution ' + ex.id + ' (' + ex.kind + ') released the script lock with unflushed sheet writes (last: ' +
              ex.unflushed + '); call SpreadsheetApp.flush() first, or the next execution may read old values');
          }
          state.lock.holder = null;
        },
        hasLock() { return state.lock.holder === id; }
      };
      return strict(api, 'Lock');
    }
    const LockService = strict({ getScriptLock() { return makeLock(); } }, 'LockService');

    /* ---------- Utilities ---------- */
    const DigestAlgorithm = enumOf('Utilities.DigestAlgorithm', ['MD2', 'MD5', 'SHA_1', 'SHA_256', 'SHA_384', 'SHA_512']);
    const HASH_OF = { MD5: 'md5', SHA_1: 'sha1', SHA_256: 'sha256', SHA_384: 'sha384', SHA_512: 'sha512' };
    const Charset = enumOf('Utilities.Charset', ['US_ASCII', 'UTF_8']);
    const charsetName = (where, cs) => {
      if (cs === undefined) return 'utf8';
      if (cs === Charset.UTF_8) return 'utf8';
      if (cs === Charset.US_ASCII) return 'ascii';
      throw problem(where + ': charset must be a Utilities.Charset value');
    };
    const bytesIn = (where, value, charset) => {
      if (typeof value === 'string') return Buffer.from(value, charsetName(where, charset));
      if (!Array.isArray(value)) throw problem(where + ': expected Byte[] (an array of -128..127) or a string, got ' + describe(value));
      const buf = Buffer.alloc(value.length);
      for (let i = 0; i < value.length; i++) {
        const b = value[i];
        if (!isInt(b) || b < -128 || b > 127) {
          throw problem(where + ': element ' + i + ' is ' + String(b) + '; Apps Script byte arrays hold signed Java bytes (-128..127)');
        }
        buf[i] = b & 255;
      }
      return buf;
    };
    const bytesOut = (buf) => {
      const out = ex.newArray();
      for (let i = 0; i < buf.length; i++) out.push(buf[i] > 127 ? buf[i] - 256 : buf[i]);
      return out;
    };
    const B64 = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
    const B64WS = /^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2}==|[A-Za-z0-9_-]{3}=)?$/;
    function makeBlob(buf, contentType, name) {
      let type = contentType === undefined ? null : contentType;
      let blobName = name === undefined ? null : name;
      const api = {
        getBytes() { return bytesOut(buf); },
        getDataAsString(cs) { return buf.toString(charsetName('Blob.getDataAsString', cs)); },
        getContentType() { return type; },
        setContentType(t) { type = t; return proxy; },
        getName() { return blobName; },
        setName(n) { blobName = n; return proxy; },
        copyBlob() { return makeBlob(Buffer.from(buf), type, blobName); }
      };
      const proxy = strict(api, 'Blob');
      return proxy;
    }
    const Utilities = strict({
      DigestAlgorithm,
      Charset,
      getUuid() { argCount('Utilities.getUuid', arguments, 0, 0); state.uuidCalls++; return crypto.randomUUID(); },
      base64Encode(data, charset) {
        argCount('Utilities.base64Encode', arguments, 1, 2);
        return bytesIn('Utilities.base64Encode', data, charset).toString('base64');
      },
      base64EncodeWebSafe(data, charset) {
        argCount('Utilities.base64EncodeWebSafe', arguments, 1, 2);
        return bytesIn('Utilities.base64EncodeWebSafe', data, charset).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');
      },
      base64Decode(text, charset) {
        argCount('Utilities.base64Decode', arguments, 1, 2);
        needString('Utilities.base64Decode', text);
        if (charset !== undefined) charsetName('Utilities.base64Decode', charset);
        if (!B64.test(text)) throw nativeError('Could not decode string.');
        return bytesOut(Buffer.from(text, 'base64'));
      },
      base64DecodeWebSafe(text, charset) {
        argCount('Utilities.base64DecodeWebSafe', arguments, 1, 2);
        needString('Utilities.base64DecodeWebSafe', text);
        if (charset !== undefined) charsetName('Utilities.base64DecodeWebSafe', charset);
        if (!B64WS.test(text)) throw nativeError('Could not decode string.');
        return bytesOut(Buffer.from(text.replace(/-/g, '+').replace(/_/g, '/'), 'base64'));
      },
      computeDigest(algorithm, value, charset) {
        argCount('Utilities.computeDigest', arguments, 2, 3);
        const name = algorithm && algorithm.name;
        if (!name || DigestAlgorithm[name] !== algorithm) throw problem('Utilities.computeDigest: algorithm must be a Utilities.DigestAlgorithm value');
        if (!HASH_OF[name]) throw problem('Utilities.computeDigest: ' + name + ' is not simulated');
        return bytesOut(crypto.createHash(HASH_OF[name]).update(bytesIn('Utilities.computeDigest', value, charset)).digest());
      },
      newBlob(data, contentType, name) {
        argCount('Utilities.newBlob', arguments, 1, 3);
        return makeBlob(bytesIn('Utilities.newBlob', data), contentType, name);
      },
      sleep(ms) {
        argCount('Utilities.sleep', arguments, 1, 1);
        if (typeof ms !== 'number' || ms < 0 || ms > 300000) throw problem('Utilities.sleep: milliseconds must be 0..300000');
        if (state.clock !== null) state.clock += ms;
        else Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
      }
    }, 'Utilities');

    /* ---------- ContentService / HtmlService ---------- */
    const MIME = { ATOM: 'application/atom+xml', CSV: 'text/csv', ICAL: 'text/calendar', JAVASCRIPT: 'application/javascript', JSON: 'application/json', RSS: 'application/rss+xml', TEXT: 'text/plain', VCARD: 'text/vcard', XML: 'text/xml' };
    const MimeType = enumOf('ContentService.MimeType', Object.keys(MIME), Object.values(MIME));
    const ContentService = strict({
      MimeType,
      createTextOutput(content) {
        argCount('ContentService.createTextOutput', arguments, 0, 1);
        if (content !== undefined) needString('ContentService.createTextOutput', content);
        const o = { kind: 'text', content: content || '', mime: MimeType.TEXT, fileName: null };
        const api = {
          getContent() { return o.content; },
          setContent(c) { needString('TextOutput.setContent', c); o.content = c; return proxy; },
          append(c) { needString('TextOutput.append', c); o.content += c; return proxy; },
          clear() { o.content = ''; return proxy; },
          getMimeType() { return o.mime; },
          setMimeType(m) {
            argCount('TextOutput.setMimeType', arguments, 1, 1);
            if (!Object.keys(MIME).some((k) => MimeType[k] === m)) throw problem('TextOutput.setMimeType: expected a ContentService.MimeType value');
            o.mime = m;
            return proxy;
          },
          getFileName() { return o.fileName; },
          downloadAsFile(name) { needString('TextOutput.downloadAsFile', name); o.fileName = name; return proxy; }
        };
        const proxy = strict(api, 'TextOutput');
        ex.outputs.set(proxy, o);
        return proxy;
      }
    }, 'ContentService');

    const HtmlService = strict({
      SandboxMode: enumOf('HtmlService.SandboxMode', ['EMULATED', 'IFRAME', 'NATIVE']),
      XFrameOptionsMode: enumOf('HtmlService.XFrameOptionsMode', ['ALLOWALL', 'DEFAULT']),
      createHtmlOutput(html) {
        argCount('HtmlService.createHtmlOutput', arguments, 0, 1);
        if (html !== undefined) needString('HtmlService.createHtmlOutput', html);
        const o = { kind: 'html', content: html || '', width: null, height: null, title: '' };
        const api = {
          getContent() { return o.content; },
          setContent(c) { needString('HtmlOutput.setContent', c); o.content = c; return proxy; },
          append(c) { needString('HtmlOutput.append', c); o.content += c; return proxy; },
          appendUntrusted(c) { needString('HtmlOutput.appendUntrusted', c); o.content += c.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); return proxy; },
          setWidth(w) { needInt('HtmlOutput.setWidth', w, 1); o.width = w; return proxy; },
          getWidth() { return o.width; },
          setHeight(h) { needInt('HtmlOutput.setHeight', h, 1); o.height = h; return proxy; },
          getHeight() { return o.height; },
          setTitle(t) { needString('HtmlOutput.setTitle', t); o.title = t; return proxy; },
          getTitle() { return o.title; },
          setSandboxMode() { return proxy; },
          setXFrameOptionsMode() { return proxy; },
          addMetaTag(name, content) { needString('HtmlOutput.addMetaTag', name); needString('HtmlOutput.addMetaTag', content); return proxy; }
        };
        const proxy = strict(api, 'HtmlOutput');
        ex.outputs.set(proxy, o);
        return proxy;
      }
    }, 'HtmlService');

    /* ---------- Logger / console / Session ---------- */
    const fmtArgs = (args) => Array.prototype.map.call(args, (a) => (typeof a === 'string' ? a : (() => { try { return JSON.stringify(a); } catch (e) { return String(a); } })())).join(' ');
    const Logger = strict({
      log() {
        let line;
        if (arguments.length > 1 && typeof arguments[0] === 'string' && /%s/.test(arguments[0])) {
          let i = 1;
          const args = arguments;
          line = arguments[0].replace(/%s/g, () => String(args[i++]));
        } else {
          line = fmtArgs(arguments);
        }
        state.loggerLines.push(line);
        return Logger;
      },
      getLog() { return state.loggerLines.join('\n'); },
      clear() { state.loggerLines.length = 0; }
    }, 'Logger');
    const consoleShim = strict({
      log() { state.console.push({ level: 'log', text: fmtArgs(arguments) }); },
      info() { state.console.push({ level: 'info', text: fmtArgs(arguments) }); },
      warn() { state.console.push({ level: 'warn', text: fmtArgs(arguments) }); },
      error() { state.console.push({ level: 'error', text: fmtArgs(arguments) }); },
      time() {},
      timeEnd() {}
    }, 'console');
    const Session = strict({
      getScriptTimeZone() { return timeZone; }
    }, 'Session');

    return { SpreadsheetApp, PropertiesService, CacheService, LockService, Utilities, ContentService, HtmlService, Logger, console: consoleShim, Session };
  }

  /* -------------------------------- running entry points -------------------------------- */
  function run(kind, fnName, args, answers) {
    // An execution may start while another one is suspended inside a service call (sim.after hooks):
    // the outer one becomes current again when this one ends.
    const outer = state.current;
    let ex;
    try {
      ex = startExecution(kind, answers);
    } catch (err) {
      state.current = outer;
      throw err;
    }
    let result;
    let error = null;
    try {
      const fn = ex.ctx[fnName];
      if (typeof fn !== 'function') throw new SimError(fnName + ' is not a global function of Code.gs');
      result = fn.apply(undefined, args || []);
    } catch (err) {
      error = err;
    }
    try {
      endExecution(ex);
    } catch (err) {
      if (!error) error = err;
    }
    state.current = outer;
    api.lastContext = ex.ctx;
    return { ex, result, error };
  }

  function web(fnName, e) {
    const { ex, result, error } = run('web', fnName, [e]);
    if (error) {
      // Apps Script answers an uncaught exception with an HTML error page (HTTP 200).
      problems.push(fnName + ' threw: ' + (error && error.message));
      return { mimeType: 'text/html', content: '<!DOCTYPE html><html><body>Script function ' + fnName + ' failed: ' + String(error && error.message) + '</body></html>', error };
    }
    const o = ex.outputs.get(result);
    if (!o) {
      problems.push(fnName + ' did not return a ContentService / HtmlService output');
      return { mimeType: 'text/html', content: '<!DOCTYPE html><html><body>The script completed but did not return anything.</body></html>', error: new SimError('no output') };
    }
    return { mimeType: o.kind === 'html' ? 'text/html' : o.mime.value, content: o.content, kind: o.kind };
  }

  function parseJsonOutput(out, what) {
    if (out.error) throw out.error;
    if (out.mimeType !== 'application/json') throw new SimError(what + ' answered ' + out.mimeType + ', not JSON');
    try {
      return JSON.parse(out.content);
    } catch (err) {
      throw new SimError(what + ' returned invalid JSON: ' + out.content.slice(0, 200));
    }
  }

  function postEvent(body, contentType) {
    const contents = typeof body === 'string' ? body : JSON.stringify(body);
    const type = String(contentType || 'text/plain;charset=UTF-8').split(';')[0].trim();
    return {
      postData: { contents, length: Buffer.byteLength(contents, 'utf8'), type, name: 'postData' },
      parameter: {},
      parameters: {},
      queryString: '',
      contentLength: Buffer.byteLength(contents, 'utf8'),
      contextPath: ''
    };
  }

  const api = {
    problems,
    thrown,
    get menus() { return state.menus.map((m) => ({ caption: m.caption, items: m.items.map((it) => ({ ...it })) })); },
    get console() { return state.console.slice(); },
    get executions() { return state.executions.slice(); },
    get uuidCalls() { return state.uuidCalls; },
    /** The vm context of the most recent execution (for inspection by tests). */
    lastContext: null,

    now,
    setNow(t) { state.clock = toMs(t); return state.clock; },
    advance(ms) { state.clock = now() + ms; return state.clock; },
    useRealClock() { state.clock = null; },

    doGetRaw(parameter = {}) {
      const e = { parameter: { ...parameter }, parameters: {}, queryString: new URLSearchParams(parameter).toString(), contentLength: -1, contextPath: '' };
      for (const k of Object.keys(parameter)) e.parameters[k] = [String(parameter[k])];
      return web('doGet', e);
    },
    doGet(parameter) { return parseJsonOutput(api.doGetRaw(parameter), 'doGet'); },
    doPostRaw(body, contentType) { return web('doPost', postEvent(body, contentType)); },
    doPost(body, contentType) { return parseJsonOutput(api.doPostRaw(body, contentType), 'doPost'); },

    /** Runs onOpen like the simple trigger does when the owner opens the spreadsheet. */
    open() {
      const { error } = run('trigger', 'onOpen', [{ authMode: 'LIMITED', source: null, user: null }]);
      if (error) throw error;
      return api.menus;
    },

    /**
     * Runs a menu item (by function name or caption) with scripted UI answers: a string answers ui.prompt
     * with OK, null cancels it, { button, text } is explicit; ui.alert with YES_NO / OK_CANCEL buttons takes
     * 'YES' / 'NO' / 'OK' / 'CANCEL'. Returns { ui, alerts, prompts, dialogs, error }.
     */
    runMenu(nameOrCaption, answers = []) {
      let fn = nameOrCaption;
      const items = state.menus.flatMap((m) => m.items).filter((it) => it.fn);
      const byCaption = items.find((it) => it.caption === nameOrCaption);
      if (byCaption) fn = byCaption.fn;
      else if (!items.some((it) => it.fn === fn)) throw new SimError('no menu item ' + JSON.stringify(nameOrCaption) + ' (run onOpen first; menu: ' + items.map((it) => it.caption).join(', ') + ')');
      const { ex, error } = run('menu', fn, [], answers);
      if (error) throw error;
      return {
        ui: ex.ui,
        alerts: ex.ui.filter((u) => u.type === 'alert'),
        prompts: ex.ui.filter((u) => u.type === 'prompt'),
        dialogs: ex.ui.filter((u) => u.type === 'dialog')
      };
    },

    /** Calls any global function of Code.gs in a fresh execution ('editor' = run from the script editor). */
    call(fnName, ...args) {
      const { result, error } = run('editor', fnName, args);
      if (error) throw error;
      return result;
    },
    /** Like call(), but returns { result, context } so a test can inspect the execution's globals. */
    callWithContext(fnName, ...args) {
      const { ex, result, error } = run('editor', fnName, args);
      if (error) throw error;
      return { result, context: ex.ctx };
    },

    installKey(text, { replace = true } = {}) {
      const answers = [];
      if (state.props.has('PRIVATE_KEY_JWK')) answers.push(replace ? 'YES' : 'NO');
      if (replace || !state.props.has('PRIVATE_KEY_JWK')) answers.push(text);
      return api.runMenu('menuInstallPrivateKey', answers);
    },
    createCodes(count, days = 0, note = '') {
      const r = api.runMenu('menuCreateCodes', [String(count), String(days), String(note)]);
      const dialog = r.dialogs[0];
      if (!dialog) throw new SimError('createCodes: no dialog was shown: ' + JSON.stringify(r.alerts.map((a) => a.message)));
      const m = /<textarea[^>]*>([\s\S]*?)<\/textarea>/.exec(dialog.html);
      return (m ? m[1] : '').split('\n').map((s) => s.trim()).filter(Boolean);
    },

    /* ----- spreadsheet access for tests (the owner editing the sheet by hand) ----- */
    sheetNames() { return state.sheets.map((s) => s.name); },
    sheetInfo(name) {
      const sd = needSheet(name);
      return { maxRows: sd.maxRows, maxCols: sd.maxCols, frozenRows: sd.frozenRows, widths: { ...sd.widths }, formats: sd.formats.slice(), validations: sd.validations.slice() };
    },
    rows(name) {
      const sd = needSheet(name);
      const lr = sd.lastRow();
      const lc = sd.lastCol();
      const out = [];
      for (let r = 1; r <= lr; r++) {
        const line = [];
        for (let c = 1; c <= lc; c++) line.push(cellToMain(sd.get(r, c)));
        out.push(line);
      }
      return out;
    },
    records(name) {
      const rows = api.rows(name);
      const header = (rows[0] || []).map(String);
      return rows.slice(1).map((line, i) => {
        const o = { _row: i + 2 };
        header.forEach((h, j) => { o[h] = line[j] === undefined ? '' : line[j]; });
        return o;
      });
    },
    codeRow(code) {
      const sd = needSheet('Codes');
      for (let r = 2; r <= sd.lastRow(); r++) {
        if (String(sd.get(r, 1)).toUpperCase() === code.toUpperCase()) return r;
      }
      return 0;
    },
    codeRecord(code) {
      const row = api.codeRow(code);
      return row ? api.records('Codes').find((o) => o._row === row) : null;
    },
    /** The owner types a value into a cell (strings are interpreted like typed input: numbers, dates, 'text). */
    setCell(name, row, colOrHeader, value) {
      const sd = needSheet(name);
      let col = colOrHeader;
      if (typeof colOrHeader === 'string') {
        const header = [];
        for (let c = 1; c <= sd.lastCol(); c++) header.push(String(sd.get(1, c)));
        col = header.indexOf(colOrHeader) + 1;
        if (!col) throw new SimError('no column ' + colOrHeader + ' in ' + name);
      }
      if (row > sd.maxRows) throw new SimError('row ' + row + ' is outside the sheet');
      const before = problems.length;
      try {
        sd.set(row, col, inputToCell(value, name + '!R' + row + 'C' + col));
      } finally {
        problems.length = before; // the owner may type formulas etc.; that is not a Code.gs problem
      }
    },
    /** The owner pastes rows below the last row of a sheet (the sheet grows when needed). */
    appendRows(name, lines) {
      const sd = needSheet(name);
      let r = sd.lastRow();
      const before = problems.length;
      try {
        for (const line of lines) {
          r++;
          if (r > sd.maxRows) sd.maxRows = r;
          line.forEach((v, j) => sd.set(r, j + 1, inputToCell(v, name + '!R' + r + 'C' + (j + 1))));
        }
      } finally {
        problems.length = before;
      }
    },
    setCodeField(code, header, value) {
      const row = api.codeRow(code);
      if (!row) throw new SimError('no row for ' + code);
      api.setCell('Codes', row, header, value);
    },
    setSetting(settingName, value) {
      const sd = needSheet('Settings');
      for (let r = 2; r <= sd.lastRow(); r++) {
        if (String(sd.get(r, 1)) === settingName) { api.setCell('Settings', r, 2, value); return; }
      }
      throw new SimError('no setting ' + settingName);
    },
    deleteSheet(name) {
      const sd = needSheet(name);
      state.sheets.splice(state.sheets.indexOf(sd), 1);
      if (state.activeSheet === sd) state.activeSheet = state.sheets[0];
    },
    /** Selects rows on a sheet, as the owner does before "Thu hồi mã đang chọn" / "Gỡ thiết bị…". */
    select(name, row, numRows = 1, col = 1, numCols = 1) {
      const sd = needSheet(name);
      state.activeSheet = sd;
      state.activeRange = { sheet: sd, row, col, numRows, numCols };
    },

    /* ----- other services ----- */
    property(key) { return state.props.has(key) ? state.props.get(key) : null; },
    setProperty(key, value) { if (value === null) state.props.delete(key); else state.props.set(key, String(value)); },
    cacheKeys() { return [...state.cache.keys()].filter((k) => state.cache.get(k).expires > now()); },
    cacheValue(key) { const e = state.cache.get(key); return e && e.expires > now() ? e.value : null; },
    clearCache() { state.cache.clear(); },
    /** Another execution holds the script lock (true) or releases it (false). */
    holdLock(on = true) {
      if (on) {
        if (state.lock.holder !== null) throw new SimError('the lock is already held');
        state.lock.holder = 'external';
      } else if (state.lock.holder === 'external') {
        state.lock.holder = null;
      }
    },
    /** Makes a service method throw, e.g. fault('Cache.get', new Error('Service error')); fault(name, null) clears it. */
    fault(name, error) {
      if (error) state.faults.set(name, error);
      else state.faults.delete(name);
    },
    /**
     * Calls fn({ execution, executionId, lockHeld }) right after every call of a service method, e.g.
     * after('Lock.releaseLock', fn) or after('Range.getValues', fn), inside the execution that made the call:
     * fn can run another request "at the same time" (sim.doPost) or edit the sheet like the owner does.
     * The hook is removed when fn returns true. Returns a function that removes it.
     */
    after(name, fn) {
      if (!state.hooks.has(name)) state.hooks.set(name, []);
      const h = { fn };
      state.hooks.get(name).push(h);
      return () => {
        const list = state.hooks.get(name);
        if (list && list.includes(h)) list.splice(list.indexOf(h), 1);
      };
    },

    /** The owner filters the sheet (byFilter) or hides rows by hand; [] shows every row again. */
    hideRows(name, rows, { byFilter = true } = {}) {
      const sd = needSheet(name);
      const set = byFilter ? sd.hiddenByFilter : sd.hiddenByUser;
      set.clear();
      for (const r of rows) set.add(r);
    },
    /** The owner deletes rows / inserts empty columns in the sheet UI (this does not take the script lock). */
    deleteRows(name, start, count = 1) {
      const sd = needSheet(name);
      sd.deleteRows(start, count);
    },
    insertColumns(name, before, count = 1) {
      const sd = needSheet(name);
      for (const row of sd.rows) {
        if (!row) continue;
        while (row.length < before - 1) row.push(undefined);
        row.splice(before - 1, 0, ...Array(count).fill(undefined));
      }
      sd.maxCols += count;
    }
  };

  api.open();
  if (options.keyPath || options.keyText) {
    const text = options.keyText || fs.readFileSync(options.keyPath, 'utf8');
    const r = api.installKey(text);
    if (!api.property('PRIVATE_KEY_JWK')) {
      throw new SimError('the private key was refused: ' + r.alerts.map((a) => a.title + ': ' + a.message.split('\n')[0]).join(' / '));
    }
  }
  if (options.moveAfterDays !== undefined && options.moveAfterDays !== null) api.setSetting('Move after days', options.moveAfterDays);
  if (options.refreshHours !== undefined && options.refreshHours !== null) api.setSetting('Refresh hours', options.refreshHours);
  return api;
}

/* ------------------------------------------------------------------------------------------------
 * HTTP server
 * ---------------------------------------------------------------------------------------------- */
export function startServer(sim, { port = 8787, host = '127.0.0.1', redirect = true, quiet = false } = {}) {
  const pending = new Map();
  const CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '600'
  };
  const contentTypeOf = (mime) => (mime === 'text/html' ? 'text/html; charset=utf-8' : mime + '; charset=utf-8');
  const say = (line) => { if (!quiet) console.log(new Date().toISOString().slice(11, 19) + '  ' + line); };
  const send = (res, status, headers, body) => {
    res.writeHead(status, { ...CORS, ...headers });
    res.end(body);
  };

  const server = http.createServer((req, res) => {
    const url = new URL(req.url, 'http://' + (req.headers.host || host + ':' + port));
    try {
      if (req.method === 'OPTIONS') return send(res, 204, { 'Content-Length': '0' }, '');
      if (req.method === 'GET' && url.pathname === '/__sim/echo') {
        const out = pending.get(url.searchParams.get('user_content_key'));
        if (!out) return send(res, 404, { 'Content-Type': 'text/html; charset=utf-8' }, 'Not found');
        pending.delete(url.searchParams.get('user_content_key'));
        return send(res, 200, { 'Content-Type': contentTypeOf(out.mimeType) }, out.content);
      }
      if (req.method === 'GET' && /^\/__sim\/(codes|log|settings)$/.test(url.pathname)) {
        const name = { codes: 'Codes', log: 'Log', settings: 'Settings' }[url.pathname.slice(7)];
        return send(res, 200, { 'Content-Type': 'application/json; charset=utf-8' }, JSON.stringify(sim.records(name), null, 2));
      }
      if (req.method === 'GET') {
        const out = sim.doGetRaw(Object.fromEntries(url.searchParams));
        say('GET  ' + url.pathname + ' -> ' + out.content.slice(0, 80));
        return send(res, 200, { 'Content-Type': contentTypeOf(out.mimeType) }, out.content);
      }
      if (req.method !== 'POST') return send(res, 405, { 'Content-Type': 'text/plain; charset=utf-8' }, 'Method not allowed');
      const chunks = [];
      let size = 0;
      req.on('data', (c) => {
        size += c.length;
        if (size > 10 * 1024 * 1024) { req.destroy(); return; }
        chunks.push(c);
      });
      req.on('end', () => {
        try {
          const body = Buffer.concat(chunks).toString('utf8');
          const out = sim.doPostRaw(body, req.headers['content-type'] || '');
          let summary = out.content.slice(0, 100);
          try {
            const q = JSON.parse(body);
            const r = JSON.parse(out.content);
            summary = (q.action || '?') + ' ' + (q.code || '') + ' [' + String(q.device || '').slice(0, 8) + '] -> ' +
              (r.ok ? 'ok, ' + Object.keys(r.keys || {}).length + ' key(s)' + (r.moved ? ', moved' : '') + (r.bad ? ', bad ' + r.bad.length : '')
                : r.error + (r.retryAfter ? ' (retryAfter ' + r.retryAfter + ')' : ''));
          } catch (err) { /* not JSON */ }
          say('POST ' + summary);
          if (redirect) {
            const id = crypto.randomBytes(12).toString('hex');
            pending.set(id, out);
            setTimeout(() => pending.delete(id), 60000).unref();
            const loc = 'http://' + (req.headers.host || host + ':' + port) + '/__sim/echo?user_content_key=' + id;
            return send(res, 302, { Location: loc, 'Content-Type': 'text/html; charset=utf-8' }, '<a href="' + loc + '">Moved Temporarily</a>');
          }
          return send(res, 200, { 'Content-Type': contentTypeOf(out.mimeType) }, out.content);
        } catch (err) {
          say('POST failed: ' + err.message);
          return send(res, 500, { 'Content-Type': 'text/plain; charset=utf-8' }, 'Simulator error: ' + err.message);
        }
      });
    } catch (err) {
      say(req.method + ' failed: ' + err.message);
      send(res, 500, { 'Content-Type': 'text/plain; charset=utf-8' }, 'Simulator error: ' + err.message);
    }
  });
  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, host, () => resolve(server));
  });
}

/* ------------------------------------------------------------------------------------------------
 * Command line
 * ---------------------------------------------------------------------------------------------- */
async function main(argv) {
  const opts = { port: 8787, host: '127.0.0.1', codes: 3, days: 0, note: 'simulator', moveAfterDays: null, now: null, redirect: true, key: process.env.PREMIUM_PRIVATE_KEY_FILE || '' };
  const usage = 'Usage: node tools/premium/sim.mjs --key <private-key.json> [--port 8787] [--host 127.0.0.1] [--codes 3] [--days 0]\n' +
    '       [--note text] [--move-after-days 7] [--now <ISO time>] [--no-redirect]';
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const val = () => {
      if (a.includes('=')) return a.slice(a.indexOf('=') + 1);
      if (i + 1 >= argv.length) { console.error('Missing value for ' + a + '\n' + usage); process.exit(2); }
      return argv[++i];
    };
    const name = a.split('=')[0];
    if (name === '--port') opts.port = parseInt(val(), 10);
    else if (name === '--host') opts.host = val();
    else if (name === '--key') opts.key = val();
    else if (name === '--codes') opts.codes = parseInt(val(), 10);
    else if (name === '--days') opts.days = parseInt(val(), 10);
    else if (name === '--note') opts.note = val();
    else if (name === '--move-after-days') opts.moveAfterDays = Number(val());
    else if (name === '--now') opts.now = val();
    else if (name === '--no-redirect') opts.redirect = false;
    else if (name === '--help' || name === '-h') { console.log(usage); return; }
    else { console.error('Unknown option ' + a + '\n' + usage); process.exit(2); }
  }
  if (!(opts.port >= 0 && opts.port < 65536) || !(opts.codes >= 0 && opts.codes <= 500) || !(opts.days >= 0)) {
    console.error(usage);
    process.exit(2);
  }
  if (opts.key && path.resolve(opts.key).startsWith(path.resolve(HERE, '..', '..') + path.sep)) {
    console.warn('WARNING: the private key file is inside the repository. Move it outside and never commit it.');
  }
  const sim = createSim({
    keyPath: opts.key || null,
    moveAfterDays: opts.moveAfterDays,
    now: opts.now ? Date.parse(opts.now) : null
  });
  if (!opts.key) console.warn('No --key given: every request will be answered with error "setup" (server not configured).');
  const codes = opts.codes > 0 ? sim.createCodes(opts.codes, opts.days, opts.note) : [];
  const server = await startServer(sim, { port: opts.port, host: opts.host, redirect: opts.redirect });
  const addr = server.address();
  const base = 'http://' + (opts.host === '127.0.0.1' || opts.host === '0.0.0.0' ? 'localhost' : opts.host) + ':' + addr.port;
  console.log('tunn.sat Premium simulator (Code.gs in node:vm, fake Apps Script services)');
  console.log('  Web app URL : ' + base + '/exec   (GET -> doGet, POST -> doPost' + (opts.redirect ? ', answered through a 302 redirect like Apps Script' : '') + ')');
  console.log('  Private key : ' + (opts.key ? 'installed through the "Cài đặt khóa bí mật…" menu' : 'NOT installed'));
  console.log('  Settings    : Move after days = ' + sim.records('Settings').find((r) => r.Setting === 'Move after days').Value +
    (opts.now ? ', clock frozen at ' + new Date(sim.now()).toISOString() : ''));
  if (codes.length) {
    console.log('  New codes (' + (opts.days > 0 ? opts.days + ' days after activation' : 'lifetime') + '):');
    for (const c of codes) console.log('    ' + c);
  }
  console.log('  Sheets      : ' + base + '/__sim/codes  ' + base + '/__sim/log  ' + base + '/__sim/settings');
  console.log('To use it from the site (do NOT commit this): in assets/js/config.js set premium.api = \'' + base + '/exec\',');
  console.log('then serve the repository, e.g. python3 -m http.server 8080, and open http://localhost:8080/. Ctrl+C stops.');
  const stop = () => { server.close(); process.exit(0); };
  process.on('SIGINT', stop);
  process.on('SIGTERM', stop);
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main(process.argv.slice(2)).catch((err) => {
    console.error(err && err.message ? err.message : err);
    process.exit(1);
  });
}
