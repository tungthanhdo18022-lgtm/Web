/** @OnlyCurrentDoc */
/**
 * tunn.sat Premium server - Google Apps Script (V8 runtime), bound to a Google Sheet.
 *
 * WHAT IT DOES
 *   Premium tests on the tunn.sat website are published encrypted. Every test file has its own
 *   AES key, wrapped with the site's RSA public key (assets/premium-key.json). This script:
 *     - checks premium codes (TUNN-XXXX-XXXX-XXXX) kept in the "Codes" sheet,
 *     - binds every code to ONE device. A device is an RSA key pair made by the student's browser
 *       with WebCrypto as NON-EXTRACTABLE (its private key cannot be read, copied or exported);
 *       the device id is "k_" + base64url(SHA-256(public key)),
 *     - after the checks pass, unwraps the AES keys with the site's RSA private key (RSA-OAEP,
 *       SHA-256) and returns them wrapped again for the device's public key, so only that browser
 *       can use them: copying a browser's saved data to another browser does not open the tests.
 *
 * SETUP (step-by-step guide in Vietnamese: tools/premium/HUONG-DAN.md)
 *   1. Create a Google Sheet -> Extensions -> Apps Script -> replace the code with this file -> Save.
 *   2. Reload the sheet. The "tunn.sat Premium" menu appears and the sheets Codes / Settings / Log
 *      are created.
 *   3. Menu -> "Cài đặt khóa bí mật…" -> paste the content of private-key.json (never in the repo).
 *   4. Menu -> "Kiểm tra cài đặt".
 *   5. Deploy -> New deployment -> Web app; Execute as: Me; Who has access: Anyone. Put the URL
 *      ending in /exec into assets/js/config.js (APP_CONFIG.premium.api).
 *   After changing this file: Deploy -> Manage deployments -> Edit -> Version: New version
 *   (the /exec URL stays the same).
 *
 * PAYMENTS (optional)
 *   The website can sell a plan by bank transfer (VietQR). action "order" adds a row to the "Orders"
 *   sheet with a random payment reference (TUNNXXXXXXXX) bound to the device key that asked for it; the
 *   student transfers the amount with that reference. SePay (sepay.vn) calls this web app with
 *   ?hook=<token> when money arrives: a matching, fully paid order becomes "paid" and gets a new code.
 *   The owner can also set Status to "paid" by hand. action "orderStatus" answers the code ONLY to the
 *   device that made the order; the website then activates it as usual. Menu "Cài đặt thanh toán…"
 *   makes the token and shows the webhook URL.
 *
 * NOTES FOR DEVELOPERS
 *   - Follows the tunn.sat Premium spec v1 (code format, web API, sheet layout) plus device keys (v2):
 *     every request carries "deviceKey" (base64 SPKI of the device's RSA-OAEP public key); requests
 *     without it get "update". A code still bound to a v1 random device id moves to the device key
 *     the first time that same device id asks with a key ("upgrade").
 *   - Apps Script has no TextEncoder, atob/btoa, WebCrypto, fetch, require or Buffer. Utilities.*
 *     works on Java-style SIGNED bytes (-128..127). Inside this file every byte array is a plain
 *     array of UNSIGNED bytes (0..255); conversion happens only at the Utilities boundary.
 *   - RSA-OAEP decryption uses BigInt with CRT. Unwrapped keys are cached in CacheService (6 h).
 *   - Every sheet write runs inside LockService.getScriptLock() (see withLock_).
 *   - Local testing: tools/premium/sim.mjs runs this file unchanged in Node with fake Apps Script
 *     services; tools/premium/test-server.mjs holds the tests.
 */

// =============================================================================================
// Configuration
// =============================================================================================

var PREMIUM = {
  SERVICE: 'tunn.sat premium',
  VERSION: 2,

  // Copy of "kid" and "spki" from assets/premium-key.json (public, safe to share).
  // "Cài đặt khóa bí mật" refuses a private key that does not match this public key, so the
  // owner cannot install the wrong file by mistake. If the key pair is ever replaced, update
  // both places. Set SITE_PUBLIC_KEY_SPKI to '' to skip the check.
  SITE_KEY_KID: 'k1',
  SITE_PUBLIC_KEY_SPKI: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAs1XFyiAO34Kp/lBe7DIzwZRgim1iRO7lZBNuyJfsypUqphf9ZW/d/hxIwLWd42TPctzRU8b22vZU8AFaPIRiyF3Yul+2J2I5eifiMFnazZz6Vs5L3Fa5MwvbmniqDbVhnWNChwgKZwhNQxs4OVv+/sQazoEqHmsvaLxl/kD17iYee8poF47MecfsINN6j+6C7yOAXgessD4IH77LQtgb7NL8BK2WJgfk+NWDKB9jFuhWPQVbNqUmhiOMGqDc+wARDfPlAjO4xy0CXRZPIRCYXicmNRltXbeai84Lmf3gLrLioUo9gatOQLECO+swfefMLa4wtF7LIYGMSbyuoI5f2QIDAQAB',

  PROP_PRIVATE_KEY: 'PRIVATE_KEY_JWK',

  CODE_ALPHABET: '0123456789ABCDEFGHJKMNPQRSTVWXYZ', // Crockford base32: no I, L, O, U
  CODE_PREFIX: 'TUNN',

  SHEET_CODES: 'Codes',
  SHEET_SETTINGS: 'Settings',
  SHEET_LOG: 'Log',
  SHEET_ORDERS: 'Orders',
  STATUSES: ['new', 'active', 'expired', 'revoked'],
  ORDER_STATUSES: ['pending', 'paid', 'expired', 'cancelled'],

  // Plans sold on the website (VND, days counted from activation). The website shows the prices in
  // assets/js/config.js (APP_CONFIG.premium.payment.plans): keep the ids and prices the same in both.
  PLANS: {
    '1m': { days: 30, amount: 69000 },
    '3m': { days: 90, amount: 189000 }
  },
  ORDER_PREFIX: 'TUNN',      // payment reference: TUNN + 8 Crockford base32 symbols (40 random bits)
  ORDER_HOURS: 24,           // an unpaid order expires after this
  ORDER_MAX_PER_HOUR: 5,     // new orders per device per hour
  PROP_WEBHOOK_TOKEN: 'PAYMENT_WEBHOOK_TOKEN',
  MAX_ORDER_BODY_CHARS: 4096,
  MAX_WEBHOOK_BODY_CHARS: 16384,

  SETTING_MOVE_AFTER_DAYS: 'Move after days',
  SETTING_REFRESH_HOURS: 'Refresh hours',
  DEFAULT_MOVE_AFTER_DAYS: 7,
  DEFAULT_REFRESH_HOURS: 24,

  // Request limits (spec section 5).
  MAX_BODY_CHARS: 524288,
  MAX_CODE_CHARS: 100,
  MAX_FILES: 300,
  MAX_FILE_KEY_CHARS: 1024,
  MAX_INFO_CHARS: 80,
  MAX_DEVICE_KEY_CHARS: 1024,  // base64 SPKI of an RSA public key (2048-bit: 392 characters)
  DEVICE_KEY_MIN_BITS: 2048,
  DEVICE_KEY_MAX_BITS: 4096,

  MAX_CREATE: 500,           // codes per "Tạo mã mới" run
  MAX_NOTE_CHARS: 200,

  RATE_MAX_FAILURES: 10,     // failed attempts (invalid / notfound) per device ...
  RATE_WINDOW_MS: 15 * 60 * 1000,  // ... within 15 minutes ...
  RATE_BLOCK_MS: 15 * 60 * 1000,   // ... block that device for 15 minutes.

  KEY_CACHE_SECONDS: 21600,  // 6 hours (CacheService maximum)
  LOCK_WAIT_MS: 10000,
  LOG_MAX_ROWS: 5000,        // the Log sheet keeps the newest 5000 entries ...
  LOG_TRIM_SLACK: 100        // ... and is trimmed once it is this many rows over the limit.
};

// Column numbers (1-based) of the Codes sheet.
var COL = {
  CODE: 1, STATUS: 2, DAYS: 3, NOTE: 4, CREATED: 5, ACTIVATED: 6, EXPIRES: 7,
  DEVICE: 8, DEVICE_INFO: 9, LAST_CHECK: 10, MOVED: 11, MOVES: 12
};
var CODES_HEADERS = ['Code', 'Status', 'Days', 'Note', 'Created', 'Activated', 'Expires',
  'Device', 'Device info', 'Last check', 'Moved', 'Moves'];
var CODES_WIDTHS = [175, 80, 60, 220, 135, 135, 135, 210, 170, 135, 135, 60];
var LOG_HEADERS = ['Time', 'Action', 'Code', 'Device', 'Result'];
// Columns of the Orders sheet.
var ORD = { ORDER: 1, STATUS: 2, PLAN: 3, AMOUNT: 4, DAYS: 5, CREATED: 6, PAID: 7, CODE: 8, DEVICE: 9, PAYMENT: 10, NOTE: 11 };
var ORDERS_HEADERS = ['Order', 'Status', 'Plan', 'Amount', 'Days', 'Created', 'Paid', 'Code', 'Device', 'Payment', 'Note'];
var ORDERS_WIDTHS = [130, 80, 50, 80, 50, 135, 135, 175, 210, 220, 220];
var LOG_WIDTHS = [150, 100, 175, 210, 360];
var SETTINGS_HEADERS = ['Setting', 'Value', 'Giải thích'];

var DAY_MS = 86400000;
var DEVICE_ID_RE = /^[A-Za-z0-9_-]{16,64}$/;
var KEY_DEVICE_RE = /^k_[A-Za-z0-9_-]{43}$/;   // device id derived from a device key (v2)
var FILE_ID_RE = /^[A-Za-z0-9_-]{1,80}$/;
var BASE64_TEXT_RE = /^[A-Za-z0-9+\/_-]+={0,2}$/;
var DATE_FORMAT = 'yyyy-mm-dd hh:mm';

// Messages for students (English, shown by the website).
var MESSAGES = {
  invalid: 'This code is not valid. Please check it and try again.',
  badRequest: 'Invalid request. Please reload the page and try again.',
  notfound: 'This code does not exist. Please check it and try again.',
  revoked: 'This code has been disabled. Please contact the site owner.',
  expired: 'This code has expired. Please contact the site owner to renew it.',
  deviceWait: 'This code is already in use on another device. You can move it to this device after {date}, or ask the site owner to reset it.',
  deviceMoveNow: 'This code is now in use on another device. Enter the code again to move it back to this device.',
  deviceOwner: 'This code is already in use on another device. If you changed devices, ask the site owner to reset it.',
  notActivated: 'This code has not been activated on this device yet. Enter the code to activate it.',
  rate: 'Too many failed attempts. Please wait 15 minutes and try again.',
  setup: 'Premium is not available right now because the server is not set up yet. Please contact the site owner.',
  server: 'Something went wrong on the server. Please try again later.',
  busy: 'The server is busy right now. Please try again in a moment.',
  update: 'tunn.sat was updated. Please reload the page, then try again.',
  sheet: 'This code cannot be checked right now because of a problem in the list of codes. Please contact the site owner.',
  orderNotFound: 'This payment was not found. Please start the payment again.',
  orderRate: 'Too many payment requests from this device. Please wait an hour and try again.',
  orderSheet: 'Payments are not available right now because of a problem in the list of orders. Please contact the site owner.'
};

// =============================================================================================
// Web app entry points
// =============================================================================================

/** GET .../exec -> service banner (used as a health check). */
function doGet(e) {
  try {
    return jsonOutput_({ ok: true, service: PREMIUM.SERVICE, version: PREMIUM.VERSION });
  } catch (err) {
    reportError_('doGet', err);
    return jsonOutput_(apiError_('server'));
  }
}

/** POST .../exec with a JSON body (sent as text/plain to avoid a CORS preflight). */
function doPost(e) {
  var result;
  try {
    if (e && e.parameter && hasOwn_(e.parameter, 'hook')) {
      result = handlePaymentWebhook_(e);
    } else {
      var action = peekAction_(e);
      result = action === 'order' || action === 'orderStatus' ? handleOrderRequest_(e) : handleApiRequest_(e);
    }
  } catch (err) {
    reportError_('doPost', err);
    result = apiError_('server', err && err.busy ? 'busy' : null);
  }
  return jsonOutput_(result);
}

function jsonOutput_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// =============================================================================================
// Request handling
// =============================================================================================

function handleApiRequest_(e) {
  var body = (e && e.postData && typeof e.postData.contents === 'string') ? e.postData.contents : '';
  var req = parseApiRequest_(body);

  // Rate limit: a device with too many recent failures is blocked, whatever it sends. Only a device id
  // that comes from a valid device key counts: anyone could send someone else's id without its key.
  if (req.deviceKey) {
    var blockedUntil = rateLimitedUntil_(req.device);
    if (blockedUntil) return apiError_('rate', null, blockedUntil);
  }

  if (req.problem) {
    if (req.deviceKey) recordFailure_(req.device);
    logEvent_(req.action || 'request', req.code || req.rawCode, req.device || req.rawDevice,
      'invalid (' + req.problem + ')');
    return apiError_('invalid', req.problem === 'code' ? 'invalid' : 'badRequest');
  }

  // Since v2 every request carries the device's public key: an older page (still open from before
  // the update) is asked to reload. Never answered with plain keys.
  if (!req.deviceKey) {
    logEvent_(req.action, req.code, req.device, 'update (no device key)');
    return apiError_('update');
  }

  var key = loadPrivateKey_();
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss ? ss.getSheetByName(PREMIUM.SHEET_CODES) : null;
  if (!key || !sheet) {
    logEvent_(req.action, req.code, req.device, 'setup (' + (key ? 'no Codes sheet' : 'no private key') + ')');
    return apiError_('setup');
  }

  var settings = readSettings_(ss);
  var now = Date.now();
  var verdict;
  try {
    verdict = withLock_(function () {
      // Columns are read by position: refuse to guess if the owner inserted or renamed a column.
      if (!codesHeaderOk_(sheet)) return { error: 'setup', log: 'setup (Codes header changed)' };
      // The owner can insert or delete rows at any moment (typing in the sheet does not take the
      // script lock), so the row that was read must still hold this code; otherwise look again.
      for (var attempt = 0; attempt < 3; attempt++) {
        var row = findCodeRow_(sheet, req.code);
        if (!row) return { error: 'notfound' };
        var values = sheet.getRange(row, 1, 1, CODES_HEADERS.length).getValues()[0];
        if (cellCode_(values[COL.CODE - 1]) !== req.code) continue;
        var v = evaluateLicense_(values, req, settings, now);
        if (v.problem) v.log = 'sheet (dòng ' + row + ': ' + v.problem + ')';
        writeRowChanges_(sheet, row, v.changes);
        return v;
      }
      return { error: 'server', messageKey: 'busy', log: 'busy (rows moved while reading)' };
    });
  } catch (err) {
    if (!err || !err.busy) throw err;
    logEvent_(req.action, req.code, req.device, 'busy');
    return apiError_('server', 'busy');
  }

  if (verdict.error) {
    if (verdict.error === 'notfound') recordFailure_(req.device);
    logEvent_(req.action, req.code, req.device, verdict.log || verdict.error);
    return apiError_(verdict.error, verdict.messageKey, verdict.retryAfter);
  }

  // The license checks passed: only now are keys unwrapped (no decryption oracle for strangers),
  // then wrapped again for this device's public key: only the browser that holds the matching
  // (non-extractable) private key can use them.
  var unwrapped = unwrapFileKeys_(req.files, key);
  var res = {
    ok: true,
    status: 'active',
    code: req.code,
    device: req.device,
    expires: verdict.expires !== null ? new Date(verdict.expires).toISOString() : null,
    keys: wrapForDevice_(unwrapped.keys, req.deviceKey),
    wrapped: true,
    moved: verdict.moved,
    checkAfter: Math.round(settings.refreshHours * 3600)
  };
  if (unwrapped.bad.length) res.bad = unwrapped.bad;
  logEvent_(req.action, req.code, req.device, (verdict.moved ? 'ok (moved)' : verdict.upgraded ? 'ok (upgraded)' : 'ok') +
    ' · keys ' + unwrapped.count + (unwrapped.bad.length ? ' · bad ' + unwrapped.bad.length : ''));
  return res;
}

/**
 * Validates the JSON body. Returns { problem, action, device, code, info, files, ... };
 * problem is null for a valid request, otherwise a short reason (used in the Log).
 */
function parseApiRequest_(body) {
  var out = {
    problem: null, action: '', device: '', claimedDevice: '', rawDevice: '', deviceKey: null,
    code: '', rawCode: '', info: '', files: []
  };
  if (typeof body !== 'string' || !body || body.length > PREMIUM.MAX_BODY_CHARS) {
    out.problem = 'body';
    return out;
  }
  var data;
  try {
    data = JSON.parse(body);
  } catch (err) {
    out.problem = 'json';
    return out;
  }
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    out.problem = 'json';
    return out;
  }

  if (typeof data.device === 'string' && DEVICE_ID_RE.test(data.device)) out.device = data.device;
  else {
    out.problem = 'device';
    if (typeof data.device === 'string') out.rawDevice = clip_(data.device, 64);
  }

  // Device key (v2). The device IS its key: req.device becomes the id derived from the key, and
  // the id the page sent is kept as claimedDevice (it lets a code bound to a v1 id move to the key).
  if (data.deviceKey !== undefined && data.deviceKey !== null) {
    var dk = typeof data.deviceKey === 'string' && data.deviceKey.length <= PREMIUM.MAX_DEVICE_KEY_CHARS
      ? readDeviceKey_(data.deviceKey) : null;
    if (!dk) {
      out.problem = out.problem || 'deviceKey';
    } else {
      out.deviceKey = dk;
      out.claimedDevice = out.device;
      out.device = dk.id;
    }
  }

  if (data.action === 'activate' || data.action === 'refresh') out.action = data.action;
  else out.problem = out.problem || 'action';

  if (typeof data.code === 'string' && data.code.length <= PREMIUM.MAX_CODE_CHARS) {
    out.rawCode = clip_(data.code, 40);
    out.code = normalizeCode_(data.code) || '';
  }
  if (!out.code) out.problem = out.problem || 'code';

  if (typeof data.info === 'string') out.info = cleanText_(data.info, PREMIUM.MAX_INFO_CHARS);

  var files = data.files;
  if (files !== undefined && files !== null) {
    if (!Array.isArray(files) || files.length > PREMIUM.MAX_FILES) {
      out.problem = out.problem || 'files';
    } else {
      var seen = {};
      for (var i = 0; i < files.length; i++) {
        var f = files[i];
        // "__proto__" would be dropped by the plain objects used as maps below: refuse it.
        if (!f || typeof f !== 'object' || typeof f.id !== 'string' || !FILE_ID_RE.test(f.id) ||
            f.id === '__proto__' ||
            typeof f.key !== 'string' || !f.key || f.key.length > PREMIUM.MAX_FILE_KEY_CHARS) {
          out.problem = out.problem || 'files';
          break;
        }
        // hasOwn_ (not seen.hasOwnProperty): an id such as "hasOwnProperty" must not break the loop.
        if (hasOwn_(seen, f.id)) continue; // keep the first entry of a duplicated id
        seen[f.id] = true;
        out.files.push({ id: f.id, key: f.key });
      }
    }
  }
  return out;
}

/**
 * Applies the license rules (spec section 5) to one row of the Codes sheet.
 * Pure function: returns { error?, messageKey?, retryAfter?, expires, moved, changes } where
 * changes maps column number -> new value for writeRowChanges_.
 */
function evaluateLicense_(row, req, settings, now) {
  var changes = {};
  // A cell the license depends on that the server cannot read (an owner typo) refuses the request
  // ("server", with the cell named in the Log) instead of guessing: a wrong guess could hand out a
  // lifetime code, or overwrite the owner's renewal date.
  function unreadable(problem) {
    return { error: 'server', messageKey: 'sheet', problem: problem, changes: {} };
  }
  var status = readStatus_(row[COL.STATUS - 1]);
  if (status === 'revoked') return { error: 'revoked', changes: changes };
  if (status === null) return unreadable(cellProblem_(COL.STATUS, row[COL.STATUS - 1]));

  var activated = readTime_(row[COL.ACTIVATED - 1]);
  var expiresCell = readTime_(row[COL.EXPIRES - 1]);
  var movedAt = readTime_(row[COL.MOVED - 1]);
  var cols = [COL.ACTIVATED, COL.EXPIRES, COL.MOVED];
  var times = [activated, expiresCell, movedAt];
  for (var c = 0; c < cols.length; c++) {
    if (isBadNumber_(times[c])) return unreadable(cellProblem_(cols[c], row[cols[c] - 1]));
  }
  var days = 0; // 0 or blank = lifetime; only needed while Expires is empty
  if (expiresCell === null) {
    days = readDays_(row[COL.DAYS - 1]);
    if (isBadNumber_(days)) return unreadable(cellProblem_(COL.DAYS, row[COL.DAYS - 1]));
  }
  var lastCheck = readTime_(row[COL.LAST_CHECK - 1]);
  if (isBadNumber_(lastCheck)) lastCheck = null; // informational only
  var bound = readText_(row[COL.DEVICE - 1]);
  var moves = Math.floor(readNumber_(row[COL.MOVES - 1]));
  if (!(moves >= 0)) moves = 0;

  // Expiry. An Expires date in the sheet wins; otherwise Days count from Activated.
  // Status "expired" typed by the owner is respected unless Expires was moved into the future.
  var expires = expiresCell;
  if (expires === null && days > 0 && activated !== null) expires = activated + days * DAY_MS;
  var isExpired = status === 'expired'
    ? !(expiresCell !== null && expiresCell >= now)
    : (expires !== null && expires < now);
  if (isExpired) {
    if (status !== 'expired') changes[COL.STATUS] = 'expired';
    if (expiresCell === null && expires !== null) changes[COL.EXPIRES] = new Date(expires);
    return { error: 'expired', changes: changes };
  }

  var nowDate = new Date(now);
  function markGood() {
    if (activated === null) { // first activation (or the owner typed the device by hand)
      activated = now;
      changes[COL.ACTIVATED] = nowDate;
      if (expiresCell === null && days > 0) expires = now + days * DAY_MS;
    }
    if (expiresCell === null && expires !== null) changes[COL.EXPIRES] = new Date(expires);
    if (status !== 'active') changes[COL.STATUS] = 'active';
    changes[COL.LAST_CHECK] = nowDate;
  }

  // Not bound yet (new code, or the owner reset the device): only "activate" binds.
  if (!bound) {
    if (req.action !== 'activate') return { error: 'device', messageKey: 'notActivated', changes: changes };
    // Binding again after the owner reset the device counts as a device change: Moved = now, so
    // the "Move after days" wait starts again and another device cannot take the code over at once.
    if (activated !== null) changes[COL.MOVED] = nowDate;
    changes[COL.DEVICE] = req.device;
    changes[COL.DEVICE_INFO] = req.info;
    markGood();
    return { expires: expires, moved: false, changes: changes };
  }

  // Same device: refresh Last check (and the device label). A code still bound to a v1 random
  // device id moves to the device key when that same id asks with a key ("upgrade"); a code bound
  // to a device key only matches that key.
  var upgrade = bound !== req.device && !KEY_DEVICE_RE.test(bound) && !!req.claimedDevice &&
    bound === req.claimedDevice && !!req.deviceKey;
  if (bound === req.device || upgrade) {
    if (upgrade) changes[COL.DEVICE] = req.device;
    if (req.info && req.info !== readText_(row[COL.DEVICE_INFO - 1])) changes[COL.DEVICE_INFO] = req.info;
    markGood();
    return { expires: expires, moved: false, upgraded: upgrade, changes: changes };
  }

  // Another device. Self-service move once every N days ("Move after days"; 0 = owner only).
  var moveDays = settings.moveAfterDays;
  if (moveDays > 0) {
    var since = movedAt !== null ? movedAt : (activated !== null ? activated : lastCheck);
    var allowedAt = since !== null ? since + moveDays * DAY_MS : now;
    if (req.action === 'activate' && now >= allowedAt) {
      changes[COL.DEVICE] = req.device;
      changes[COL.DEVICE_INFO] = req.info;
      changes[COL.MOVED] = nowDate;
      changes[COL.MOVES] = moves + 1;
      markGood();
      return { expires: expires, moved: true, changes: changes };
    }
    return {
      error: 'device',
      messageKey: allowedAt > now ? 'deviceWait' : 'deviceMoveNow',
      retryAfter: allowedAt,
      changes: changes
    };
  }
  return { error: 'device', messageKey: 'deviceOwner', changes: changes };
}

/** Builds { ok:false, error, message, retryAfter? }. */
function apiError_(code, messageKey, retryAfterMs) {
  var res = { ok: false, error: code, message: MESSAGES[messageKey || code] || MESSAGES.server };
  if (retryAfterMs) {
    var iso = new Date(retryAfterMs).toISOString();
    res.retryAfter = iso;
    res.message = res.message.replace('{date}', iso.slice(0, 16).replace('T', ' ') + ' UTC');
  }
  if (code === 'device' && !messageKey) res.message = MESSAGES.deviceOwner;
  return res;
}

// =============================================================================================
// Payments: orders (website) and the bank-transfer webhook (SePay)
// =============================================================================================

/** The "action" of a JSON body, or '' (the full checks happen in the handler). */
function peekAction_(e) {
  var body = (e && e.postData && typeof e.postData.contents === 'string') ? e.postData.contents : '';
  if (!body || body.length > PREMIUM.MAX_BODY_CHARS) return '';
  try {
    var data = JSON.parse(body);
    return data && typeof data === 'object' && typeof data.action === 'string' ? data.action : '';
  } catch (err) {
    return '';
  }
}

/**
 * { action: 'order', plan, deviceKey } -> a new pending order for that device;
 * { action: 'orderStatus', order, deviceKey } -> its status, with the code once it is paid.
 * The device is its key (as for codes): another browser cannot read the code of someone else's order.
 */
function handleOrderRequest_(e) {
  var body = (e && e.postData && typeof e.postData.contents === 'string') ? e.postData.contents : '';
  var data = null;
  if (body && body.length <= PREMIUM.MAX_ORDER_BODY_CHARS) {
    try { data = JSON.parse(body); } catch (err) { data = null; }
  }
  if (!data || typeof data !== 'object' || Array.isArray(data)) return apiError_('invalid', 'badRequest');
  if (data.deviceKey === undefined || data.deviceKey === null) {
    logEvent_(data.action, '', '', 'update (no device key)');
    return apiError_('update');
  }
  var dk = typeof data.deviceKey === 'string' && data.deviceKey.length <= PREMIUM.MAX_DEVICE_KEY_CHARS
    ? readDeviceKey_(data.deviceKey) : null;
  if (!dk) {
    logEvent_(data.action, '', '', 'invalid (deviceKey)');
    return apiError_('invalid', 'badRequest');
  }
  var device = dk.id;
  var blockedUntil = rateLimitedUntil_(device);
  if (blockedUntil) return apiError_('rate', null, blockedUntil);
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) return apiError_('setup');
  try {
    return data.action === 'order' ? createOrder_(ss, device, data.plan) : orderStatus_(ss, device, data.order);
  } catch (err) {
    if (!err || !err.busy) throw err;
    logEvent_(data.action, '', device, 'busy');
    return apiError_('server', 'busy');
  }
}

function createOrder_(ss, device, planId) {
  var plan = typeof planId === 'string' && hasOwn_(PREMIUM.PLANS, planId) ? PREMIUM.PLANS[planId] : null;
  if (!plan) {
    logEvent_('order', '', device, 'invalid (plan)');
    return apiError_('invalid', 'badRequest');
  }
  if (!takeOrderSlot_(device)) {
    logEvent_('order', '', device, 'rate (more than ' + PREMIUM.ORDER_MAX_PER_HOUR + ' orders in an hour)');
    return apiError_('rate', 'orderRate');
  }
  var created = new Date();
  var order = withLock_(function () {
    ensureSheets_(ss);
    var sheet = ss.getSheetByName(PREMIUM.SHEET_ORDERS);
    if (!ordersHeaderOk_(sheet)) return '';
    var existing = {};
    var last = sheet.getLastRow();
    if (last >= 2) {
      var col = sheet.getRange(2, ORD.ORDER, last - 1, 1).getValues();
      for (var i = 0; i < col.length; i++) existing[readText_(col[i][0]).toUpperCase()] = true;
    }
    var id = '';
    for (var attempt = 0; attempt < 20 && (!id || existing[id]); attempt++) id = generateOrderId_();
    if (existing[id]) throw new Error('Could not generate a unique order id');
    var row = Math.max(last, 1) + 1;
    ensureRows_(sheet, row);
    formatOrderRows_(sheet, row, 1);
    sheet.getRange(row, 1, 1, ORDERS_HEADERS.length).setValues([[
      id, 'pending', planId, plan.amount, plan.days, created, '', '', device, '', ''
    ].map(toCell_)]);
    return id;
  });
  if (!order) {
    logEvent_('order', '', device, 'setup (Orders header changed)');
    return apiError_('setup', 'orderSheet');
  }
  logEvent_('order', order, device, 'created · plan ' + planId + ' · ' + plan.amount);
  return {
    ok: true, order: order, status: 'pending', plan: planId, amount: plan.amount, days: plan.days,
    expiresAt: new Date(created.getTime() + PREMIUM.ORDER_HOURS * 3600000).toISOString()
  };
}

function orderStatus_(ss, device, input) {
  var id = normalizeOrderId_(input);
  if (!id) return apiError_('invalid', 'badRequest');
  var now = Date.now();
  var v = withLock_(function () {
    var sheet = ss.getSheetByName(PREMIUM.SHEET_ORDERS);
    if (!sheet || !ordersHeaderOk_(sheet)) return { error: 'setup' };
    var row = findOrderRow_(sheet, id);
    if (!row) return { error: 'notfound' };
    var values = sheet.getRange(row, 1, 1, ORDERS_HEADERS.length).getValues()[0];
    // Someone else's order looks the same as a missing one
    if (readText_(values[ORD.DEVICE - 1]) !== device) return { error: 'notfound' };
    var status = readOrderStatus_(values[ORD.STATUS - 1]);
    if (status === 'paid') {
      var code = cellCode_(values[ORD.CODE - 1]) || issueOrderCode_(ss, sheet, row, id, values);
      return code ? { status: 'paid', code: code, days: readNumber_(values[ORD.DAYS - 1]) } : { error: 'setup' };
    }
    var createdAt = readTime_(values[ORD.CREATED - 1]);
    if (status === 'pending' && createdAt !== null && now - createdAt > PREMIUM.ORDER_HOURS * 3600000) {
      writeRowChanges_(sheet, row, (function () { var c = {}; c[ORD.STATUS] = 'expired'; return c; })());
      status = 'expired';
    }
    return { status: status || 'pending' };
  });
  if (v.error === 'notfound') {
    logEvent_('orderStatus', id, device, 'notfound');
    return apiError_('notfound', 'orderNotFound');
  }
  if (v.error) {
    logEvent_('orderStatus', id, device, 'setup (Orders sheet)');
    return apiError_('setup', 'orderSheet');
  }
  if (v.status === 'paid') logEvent_('orderStatus', id, device, 'paid · code sent to the device');
  var res = { ok: true, order: id, status: v.status };
  if (v.status === 'paid') { res.code = v.code; res.days = v.days; }
  return res;
}

/**
 * Creates the code of a paid order (Status "new", the order's Days) and writes it into the order row.
 * Call inside withLock_. Returns the code, or '' when the Codes sheet cannot be used.
 */
function issueOrderCode_(ss, sheet, row, id, values) {
  var codes = ss.getSheetByName(PREMIUM.SHEET_CODES);
  if (!codes || !codesHeaderOk_(codes)) return '';
  var days = readNumber_(values[ORD.DAYS - 1]);
  if (!(days >= 0 && days <= 36500)) {
    var plan = hasOwn_(PREMIUM.PLANS, readText_(values[ORD.PLAN - 1])) ? PREMIUM.PLANS[readText_(values[ORD.PLAN - 1])] : null;
    days = plan ? plan.days : 30;
  }
  var code = createCodes_(ss, 1, Math.round(days), 'Order ' + id)[0];
  var changes = {};
  changes[ORD.CODE] = code;
  if (!readText_(values[ORD.PAID - 1])) changes[ORD.PAID] = new Date();
  writeRowChanges_(sheet, row, changes);
  return code;
}

/**
 * POST ?hook=<token> from the bank-transfer service (SePay webhook JSON: id, transferType, transferAmount,
 * content, code, referenceCode, ...). Answers { success } (always success once the token is right, so the
 * service does not keep retrying a transfer that is not for an order).
 */
function handlePaymentWebhook_(e) {
  var expected = PropertiesService.getScriptProperties().getProperty(PREMIUM.PROP_WEBHOOK_TOKEN);
  var token = readText_(e.parameter.hook);
  if (!expected || !token || !sameText_(token, expected)) {
    logEvent_('webhook', '', '', 'refused (wrong or missing token)');
    return { success: false, message: 'unauthorized' };
  }
  var body = (e.postData && typeof e.postData.contents === 'string') ? e.postData.contents : '';
  var data = null;
  if (body && body.length <= PREMIUM.MAX_WEBHOOK_BODY_CHARS) {
    try { data = JSON.parse(body); } catch (err) { data = null; }
  }
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    logEvent_('webhook', '', '', 'invalid body');
    return { success: false, message: 'invalid body' };
  }
  var amount = typeof data.transferAmount === 'number' ? data.transferAmount : readNumber_(data.transferAmount);
  var txn = cleanText_(data.id !== undefined && data.id !== null ? data.id : data.referenceCode, 40);
  var text = [data.code, data.content, data.description].map(function (x) { return typeof x === 'string' ? x : ''; }).join(' ');
  if (readText_(data.transferType).toLowerCase() !== 'in') {
    logEvent_('webhook', '', '', 'ignored (not incoming) · txn ' + txn);
    return { success: true, message: 'ignored' };
  }
  var candidates = orderIdsInText_(text);
  if (!candidates.length) {
    logEvent_('webhook', '', '', 'no order reference · ' + amount + ' · txn ' + txn + ' · ' + cleanText_(text, 80));
    return { success: true, message: 'no order' };
  }
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var out = withLock_(function () {
    ensureSheets_(ss);
    var sheet = ss.getSheetByName(PREMIUM.SHEET_ORDERS);
    if (!ordersHeaderOk_(sheet)) return { message: 'setup' };
    for (var i = 0; i < candidates.length; i++) {
      var id = candidates[i];
      var row = findOrderRow_(sheet, id);
      if (!row) continue;
      var values = sheet.getRange(row, 1, 1, ORDERS_HEADERS.length).getValues()[0];
      var status = readOrderStatus_(values[ORD.STATUS - 1]);
      if (status === 'paid') return { id: id, message: 'already paid' };
      var due = readNumber_(values[ORD.AMOUNT - 1]);
      var changes = {};
      if (!(amount >= due)) {
        changes[ORD.NOTE] = clip_('Underpaid: received ' + amount + ' of ' + due + (txn ? ' (txn ' + txn + ')' : ''), 200);
        writeRowChanges_(sheet, row, changes);
        return { id: id, message: 'underpaid' };
      }
      changes[ORD.STATUS] = 'paid';
      changes[ORD.PAID] = new Date();
      changes[ORD.PAYMENT] = clip_((txn ? 'txn ' + txn + ' · ' : '') + amount, 200);
      writeRowChanges_(sheet, row, changes);
      values[ORD.STATUS - 1] = 'paid';
      values[ORD.PAID - 1] = changes[ORD.PAID];
      var code = issueOrderCode_(ss, sheet, row, id, values);
      return { id: id, message: code ? 'paid · code created' : 'paid · Codes sheet problem, no code yet' };
    }
    return { id: candidates[0], message: 'order not found' };
  });
  logEvent_('webhook', out.id || '', '', out.message + ' · ' + amount + (txn ? ' · txn ' + txn : ''));
  return { success: true, message: out.message };
}

/** Order references found in a transfer description (banks may add, drop or move spaces and dots). */
function orderIdsInText_(text) {
  var flat = String(text || '').toUpperCase().replace(/[^0-9A-Z]/g, '');
  var re = new RegExp(PREMIUM.ORDER_PREFIX + '([0-9A-HJKMNP-TV-Z]{8})', 'g');
  var out = [];
  var m;
  while ((m = re.exec(flat)) && out.length < 5) {
    var id = PREMIUM.ORDER_PREFIX + m[1];
    if (out.indexOf(id) === -1) out.push(id);
    re.lastIndex = m.index + 1;
  }
  return out;
}

/** "tunn k7q2 m9xd" -> "TUNNK7Q2M9XD", or '' when it is not an order reference. */
function normalizeOrderId_(input) {
  if (typeof input !== 'string' || input.length > 40) return '';
  var s = input.toUpperCase().replace(/[\s-]/g, '');
  var re = new RegExp('^' + PREMIUM.ORDER_PREFIX + '[0-9A-HJKMNP-TV-Z]{8}$');
  return re.test(s) ? s : '';
}

function generateOrderId_() {
  var nibbles = uuidRandomNibbles_();
  var bits = '';
  for (var i = 0; i < 10; i++) bits += ('000' + nibbles[i].toString(2)).slice(-4);
  var out = PREMIUM.ORDER_PREFIX;
  for (var j = 0; j < 8; j++) out += PREMIUM.CODE_ALPHABET.charAt(parseInt(bits.substr(j * 5, 5), 2));
  return out;
}

/** Counts a new order for the device; false when it already made ORDER_MAX_PER_HOUR in the last hour. */
function takeOrderSlot_(device) {
  var cache = CacheService.getScriptCache();
  var key = 'ro:' + device;
  var now = Date.now();
  var times = [];
  try {
    var saved = JSON.parse(cache.get(key) || '[]');
    if (Array.isArray(saved)) times = saved;
  } catch (err) {
    times = [];
  }
  times = times.filter(function (t) { return typeof t === 'number' && t > now - 3600000 && t <= now; });
  if (times.length >= PREMIUM.ORDER_MAX_PER_HOUR) return false;
  times.push(now);
  cache.put(key, JSON.stringify(times), 3600);
  return true;
}

function findOrderRow_(sheet, id) {
  var last = sheet.getLastRow();
  if (last < 2) return 0;
  var col = sheet.getRange(2, ORD.ORDER, last - 1, 1).getValues();
  for (var i = 0; i < col.length; i++) {
    if (normalizeOrderId_(readText_(col[i][0])) === id) return i + 2;
  }
  return 0;
}

function readOrderStatus_(v) {
  var s = foldWord_(v); // lowercase, no accents, letters and digits only
  if (s === 'paid' || s === 'dathanhtoan' || s === 'datra' || s === 'danhan') return 'paid';
  if (s === 'expired' || s === 'hethan') return 'expired';
  if (s === 'cancelled' || s === 'canceled' || s === 'huy' || s === 'dahuy') return 'cancelled';
  return 'pending';
}

function ordersHeaderOk_(sheet) {
  if (!sheet || sheet.getMaxColumns() < ORDERS_HEADERS.length) return false;
  var header = sheet.getRange(1, 1, 1, ORDERS_HEADERS.length).getValues()[0];
  for (var i = 0; i < ORDERS_HEADERS.length; i++) {
    if (readText_(header[i]).toLowerCase() !== ORDERS_HEADERS[i].toLowerCase()) return false;
  }
  return true;
}

function formatOrdersSheet_(sheet) {
  sheet.getRange(1, 1, 1, ORDERS_HEADERS.length).setValues([ORDERS_HEADERS]).setFontWeight('bold').setBackground('#f1f3f4');
  sheet.setFrozenRows(1);
  for (var i = 0; i < ORDERS_WIDTHS.length; i++) sheet.setColumnWidth(i + 1, ORDERS_WIDTHS[i]);
  ensureRows_(sheet, 2);
  formatOrderRows_(sheet, 2, sheet.getMaxRows() - 1);
}

function formatOrderRows_(sheet, first, count) {
  if (count < 1) return;
  var rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(PREMIUM.ORDER_STATUSES, true)
    .setAllowInvalid(false)
    .setHelpText('pending = chờ thanh toán, paid = đã nhận tiền (chọn tay nếu học sinh chuyển khoản mà chưa tự kích hoạt), expired, cancelled')
    .build();
  sheet.getRange(first, ORD.STATUS, count, 1).setDataValidation(rule);
  sheet.getRange(first, ORD.CREATED, count, 1).setNumberFormat(DATE_FORMAT);
  sheet.getRange(first, ORD.PAID, count, 1).setNumberFormat(DATE_FORMAT);
  sheet.getRange(first, ORD.AMOUNT, count, 1).setNumberFormat('#,##0');
  sheet.getRange(first, ORD.DAYS, count, 1).setNumberFormat('0');
  sheet.getRange(first, ORD.ORDER, count, 1).setFontFamily('Roboto Mono');
  sheet.getRange(first, ORD.CODE, count, 1).setFontFamily('Roboto Mono');
}

/** Same text, compared without stopping at the first difference. */
function sameText_(a, b) {
  a = String(a);
  b = String(b);
  var diff = a.length ^ b.length;
  for (var i = 0; i < Math.max(a.length, b.length); i++) diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  return diff === 0;
}

// =============================================================================================
// Rate limiting (CacheService, per device)
// =============================================================================================

function rateLimitedUntil_(device) {
  var until = Number(CacheService.getScriptCache().get('rb:' + device));
  return until > Date.now() ? until : 0;
}

/**
 * Counts one failed attempt (invalid / notfound). The times of the recent failures are kept in a
 * sliding window: the 10th failure within any 15 minutes blocks the device for 15 minutes.
 */
function recordFailure_(device) {
  var cache = CacheService.getScriptCache();
  var key = 'rf:' + device;
  var now = Date.now();
  var times = [];
  try {
    var saved = JSON.parse(cache.get(key) || '[]');
    if (Array.isArray(saved)) times = saved;
  } catch (err) {
    times = [];
  }
  times = times.filter(function (t) {
    return typeof t === 'number' && t > now - PREMIUM.RATE_WINDOW_MS && t <= now;
  });
  times.push(now);
  if (times.length >= PREMIUM.RATE_MAX_FAILURES) {
    cache.put('rb:' + device, String(now + PREMIUM.RATE_BLOCK_MS), Math.ceil(PREMIUM.RATE_BLOCK_MS / 1000));
    cache.remove(key);
    logEvent_('rate', '', device, 'blocked for ' + Math.round(PREMIUM.RATE_BLOCK_MS / 60000) + ' min after ' +
      times.length + ' failed attempts');
    return;
  }
  cache.put(key, JSON.stringify(times.slice(-PREMIUM.RATE_MAX_FAILURES)), Math.ceil(PREMIUM.RATE_WINDOW_MS / 1000));
}

// =============================================================================================
// Key unwrapping
// =============================================================================================

/**
 * Unwraps every file key. Returns { keys: {id: base64 AES key}, bad: [id], count }.
 * Results are cached for 6 h under SHA-256(wrapped key) to avoid repeated RSA work.
 */
function unwrapFileKeys_(files, key) {
  var keys = {};
  var bad = [];
  var count = 0;
  if (!files || !files.length) return { keys: keys, bad: bad, count: 0 };

  var items = [];
  for (var i = 0; i < files.length; i++) {
    var wrapped = base64ToBytes_(files[i].key);
    if (!wrapped || wrapped.length !== key.k) {
      bad.push(files[i].id);
      continue;
    }
    items.push({ id: files[i].id, wrapped: wrapped, ck: 'uk:' + key.fp + ':' + bytesToHex_(sha256_(wrapped)) });
  }

  var cache = CacheService.getScriptCache();
  var cached = {};
  if (items.length) {
    try {
      cached = cache.getAll(items.map(function (it) { return it.ck; })) || {};
    } catch (err) {
      cached = {};
    }
  }

  var toCache = {};
  var toCacheCount = 0;
  for (var j = 0; j < items.length; j++) {
    var it = items[j];
    var hit = cached[it.ck];
    if (typeof hit === 'string' && /^[A-Za-z0-9+\/]{43}=$/.test(hit)) {
      keys[it.id] = hit;
      count++;
      continue;
    }
    var plain = rsaOaepDecrypt_(it.wrapped, key);
    if (plain && plain.length === 32) {
      var b64 = bytesToBase64_(plain);
      keys[it.id] = b64;
      toCache[it.ck] = b64;
      toCacheCount++;
      count++;
    } else {
      bad.push(it.id);
    }
  }
  if (toCacheCount) {
    try {
      cache.putAll(toCache, PREMIUM.KEY_CACHE_SECONDS);
    } catch (err) {
      // Caching is an optimisation only.
    }
  }
  return { keys: keys, bad: bad, count: count };
}

/**
 * Reads a device public key: base64 DER SubjectPublicKeyInfo of an RSA key with 2048..4096 bits and
 * exponent 65537. Returns { n, e, k, id } (id = "k_" + base64url(SHA-256(DER))) or null.
 */
function readDeviceKey_(b64) {
  var der = base64ToBytes_(b64);
  if (!der || der.length < 200) return null;
  var pub = parseSpkiRsa_(b64);
  if (!pub || pub.e !== BigInt(65537)) return null;
  var bits = bitLength_(pub.n);
  if (bits < PREMIUM.DEVICE_KEY_MIN_BITS || bits > PREMIUM.DEVICE_KEY_MAX_BITS || bits % 8) return null;
  var id = 'k_' + bytesToBase64_(sha256_(der)).replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
  return { n: pub.n, e: pub.e, k: bits / 8, id: id };
}

/** { id: base64 AES key } -> { id: base64 RSA-OAEP(SHA-256) encryption for the device key }. */
function wrapForDevice_(keys, deviceKey) {
  var out = {};
  for (var id in keys) {
    if (!hasOwn_(keys, id)) continue;
    var plain = base64ToBytes_(keys[id]);
    var wrapped = plain ? rsaOaepEncrypt_(plain, deviceKey) : null;
    if (wrapped) out[id] = bytesToBase64_(wrapped);
  }
  return out;
}

var KEY_MEMO_ = null; // parsed private key for the current execution

/** Returns the installed private key (parsed), or null when it is missing or broken. */
function loadPrivateKey_() {
  var raw = PropertiesService.getScriptProperties().getProperty(PREMIUM.PROP_PRIVATE_KEY);
  if (!raw) return null;
  if (KEY_MEMO_ && KEY_MEMO_.raw === raw) return KEY_MEMO_.key;
  var parsed = parseJwk_(raw);
  if (!parsed.ok) return null;
  KEY_MEMO_ = { raw: raw, key: parsed.key };
  return parsed.key;
}

/**
 * Parses and checks a private JWK. Returns { ok: true, key } or { ok: false, reason } where
 * reason is a Vietnamese sentence for the owner. Never puts key material into the reason.
 */
function parseJwk_(text) {
  function fail(reason) {
    return { ok: false, reason: reason };
  }
  if (typeof text !== 'string' || !text.trim()) return fail('Bạn chưa dán gì vào ô.');
  var s = text.trim();
  var a = s.indexOf('{');
  var b = s.lastIndexOf('}');
  if (a < 0 || b <= a) {
    return fail('Không tìm thấy nội dung khóa. Hãy dán TOÀN BỘ nội dung file private-key.json (bắt đầu bằng { và kết thúc bằng }).');
  }
  var jwk;
  try {
    jwk = JSON.parse(s.slice(a, b + 1));
  } catch (err) {
    return fail('Nội dung dán vào bị lỗi hoặc bị thiếu. Hãy mở lại file private-key.json, chọn tất cả rồi sao chép lại.');
  }
  if (jwk && typeof jwk === 'object' && typeof jwk.spki === 'string') {
    return fail('Đây là khóa CÔNG KHAI của trang web (premium-key.json), không phải khóa bí mật. Hãy dùng file private-key.json.');
  }
  if (!jwk || typeof jwk !== 'object' || Array.isArray(jwk) || jwk.kty !== 'RSA') {
    return fail('Đây không phải khóa RSA. Hãy dùng đúng file private-key.json.');
  }
  if (typeof jwk.d !== 'string' && typeof jwk.n === 'string') {
    return fail('Đây là khóa CÔNG KHAI, không phải khóa bí mật. Hãy dùng file private-key.json.');
  }
  var names = ['n', 'e', 'd', 'p', 'q', 'dp', 'dq', 'qi'];
  for (var i = 0; i < names.length; i++) {
    var v = jwk[names[i]];
    if (typeof v !== 'string' || !BASE64_TEXT_RE.test(v)) {
      return fail('Khóa bị thiếu phần "' + names[i] + '". Hãy sao chép lại toàn bộ file private-key.json.');
    }
  }
  var key;
  try {
    key = {
      n: base64ToBigInt_(jwk.n), e: base64ToBigInt_(jwk.e), d: base64ToBigInt_(jwk.d),
      p: base64ToBigInt_(jwk.p), q: base64ToBigInt_(jwk.q),
      dp: base64ToBigInt_(jwk.dp), dq: base64ToBigInt_(jwk.dq), qi: base64ToBigInt_(jwk.qi)
    };
  } catch (err) {
    return fail('Khóa bị hỏng (không đọc được). Hãy sao chép lại toàn bộ file private-key.json.');
  }
  var bits = bitLength_(key.n);
  if (bits < 2048 || bits > 4096) return fail('Khóa phải dài từ 2048 đến 4096 bit.');
  var one = BigInt(1);
  var two = BigInt(2);
  var consistent = key.p > one && key.q > one && key.p * key.q === key.n &&
    key.e > one && key.e % two === one && key.e < key.n &&
    key.dp === key.d % (key.p - one) && key.dq === key.d % (key.q - one) &&
    (key.qi * key.q) % key.p === one;
  if (!consistent) return fail('Khóa bị hỏng: các thành phần không khớp nhau. Hãy sao chép lại toàn bộ file private-key.json.');

  key.k = Math.ceil(bits / 8);
  key.kid = typeof jwk.kid === 'string' ? clip_(jwk.kid, 40) : '';
  key.fp = bytesToHex_(sha256_(bigIntToBytes_(key.n, key.k))).slice(0, 16);
  key.jwkText = JSON.stringify({
    kty: 'RSA', kid: key.kid || undefined, alg: 'RSA-OAEP-256',
    n: jwk.n, e: jwk.e, d: jwk.d, p: jwk.p, q: jwk.q, dp: jwk.dp, dq: jwk.dq, qi: jwk.qi
  });
  return { ok: true, key: key };
}

/** true / false when the site public key (PREMIUM.SITE_PUBLIC_KEY_SPKI) is set; null otherwise. */
function siteKeyMatches_(key) {
  if (!PREMIUM.SITE_PUBLIC_KEY_SPKI) return null;
  var pub = parseSpkiRsa_(PREMIUM.SITE_PUBLIC_KEY_SPKI);
  if (!pub) return null;
  return pub.n === key.n && pub.e === key.e;
}

/**
 * Round trip: wraps a random 32-byte value with the public part (n, e) using RSA-OAEP encryption
 * implemented here, unwraps it with the private key, and checks that a damaged copy is rejected.
 */
function selfTestKey_(key) {
  try {
    var secret = randomBytes_(32);
    var wrapped = rsaOaepEncrypt_(secret, key);
    if (!wrapped) return false;
    var back = rsaOaepDecrypt_(wrapped, key);
    if (!back || !bytesEqual_(back, secret)) return false;
    var damaged = wrapped.slice();
    damaged[damaged.length >> 1] ^= 0x5a;
    return rsaOaepDecrypt_(damaged, key) === null;
  } catch (err) {
    return false;
  }
}

/** Stores a private key after all checks pass. Returns { ok, reason?, kid?, fingerprint? }. */
function installPrivateKey_(text) {
  var parsed = parseJwk_(text);
  if (!parsed.ok) return parsed;
  var key = parsed.key;
  if (siteKeyMatches_(key) === false) {
    return {
      ok: false,
      reason: 'Khóa này KHÔNG khớp với khóa công khai của trang web (assets/premium-key.json, kid "' +
        PREMIUM.SITE_KEY_KID + '"). Có thể bạn đã dán nhầm file. Hãy dùng đúng file private-key.json đi cùng trang web.'
    };
  }
  if (!selfTestKey_(key)) {
    return { ok: false, reason: 'Tự kiểm tra mã hóa/giải mã thất bại. File khóa có thể bị hỏng.' };
  }
  PropertiesService.getScriptProperties().setProperty(PREMIUM.PROP_PRIVATE_KEY, key.jwkText);
  KEY_MEMO_ = null;
  return { ok: true, kid: key.kid || '(không có)', fingerprint: key.fp };
}

// =============================================================================================
// Codes: format, normalisation, generation (spec section 3)
// =============================================================================================

/** Check symbol for 11 data symbols: ALPHABET[ sum((i+1) * value(data[i])) mod 31 ]. */
function checkSymbol_(data) {
  var sum = 0;
  for (var i = 0; i < 11; i++) sum += (i + 1) * PREMIUM.CODE_ALPHABET.indexOf(data.charAt(i));
  return PREMIUM.CODE_ALPHABET.charAt(sum % 31);
}

/**
 * Normalises user input to the canonical form "TUNN-XXXX-XXXX-XXXX", or returns null.
 * Must stay identical to the client (assets/js/premium.js).
 */
function normalizeCode_(input) {
  if (typeof input !== 'string') return null;
  // Same rules as symbols() in assets/js/premium.js: a code inside a pasted message
  // ("Your code: TUNN-XXXX-XXXX-XXXX, thanks") is taken out of it; otherwise only letters and digits count.
  var raw = input.toUpperCase();
  var m = /TUNN[^A-Z0-9]*([0-9A-Z]{4})[^A-Z0-9]*([0-9A-Z]{4})[^A-Z0-9]*([0-9A-Z]{4})(?![0-9A-Z])/.exec(raw);
  var s = m ? m[1] + m[2] + m[3] : raw.replace(/[^A-Z0-9]/g, '');
  if (!m && s.indexOf(PREMIUM.CODE_PREFIX) === 0) s = s.slice(PREMIUM.CODE_PREFIX.length); // U is never a code symbol
  s = s.replace(/O/g, '0').replace(/[IL]/g, '1');
  if (s.length !== 12) return null;
  for (var i = 0; i < 12; i++) {
    if (PREMIUM.CODE_ALPHABET.indexOf(s.charAt(i)) < 0) return null;
  }
  if (checkSymbol_(s.slice(0, 11)) !== s.charAt(11)) return null;
  return formatCode_(s);
}

function formatCode_(symbols12) {
  return PREMIUM.CODE_PREFIX + '-' + symbols12.slice(0, 4) + '-' + symbols12.slice(4, 8) + '-' + symbols12.slice(8, 12);
}

/** One random code: 11 data symbols (55 random bits from a v4 UUID) + check symbol. */
function generateCode_() {
  var nibbles = uuidRandomNibbles_(); // 30 random nibbles; 14 of them give the 55 bits needed
  var bits = '';
  for (var i = 0; i < 14; i++) bits += ('000' + nibbles[i].toString(2)).slice(-4);
  var data = '';
  for (var j = 0; j < 11; j++) data += PREMIUM.CODE_ALPHABET.charAt(parseInt(bits.substr(j * 5, 5), 2));
  return formatCode_(data + checkSymbol_(data));
}

/** count new codes, unique among themselves and against existing (an object used as a set). */
function generateUniqueCodes_(count, existing) {
  var out = [];
  var seen = {};
  var attempts = 0;
  while (out.length < count) {
    if (++attempts > count * 20 + 100) throw new Error('Could not generate unique codes');
    var code = generateCode_();
    if (existing[code] || seen[code]) continue; // duplicates are rejected
    seen[code] = true;
    out.push(code);
  }
  return out;
}

// =============================================================================================
// Sheets
// =============================================================================================

/**
 * Runs fn while holding the script lock (waits up to 10 s). Nested calls reuse the lock that is
 * already held (Apps Script locks are not re-entrant: an inner releaseLock would free it early).
 * The sheet writes are flushed BEFORE the lock is released: Apps Script batches spreadsheet writes,
 * and the next execution that gets the lock must see them (see the Lock.releaseLock documentation).
 * Without the flush, two devices activating the same new code at the same moment could both read
 * an empty Device cell and both win.
 */
var LOCK_DEPTH_ = 0;
function withLock_(fn) {
  if (LOCK_DEPTH_ > 0) return fn();
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(PREMIUM.LOCK_WAIT_MS)) {
    var err = new Error('Could not obtain the script lock');
    err.busy = true;
    throw err;
  }
  LOCK_DEPTH_++;
  try {
    return fn();
  } finally {
    LOCK_DEPTH_--;
    try {
      SpreadsheetApp.flush();
    } finally {
      lock.releaseLock();
    }
  }
}

/** Creates the Codes, Settings, Orders and Log sheets when missing (call inside withLock_). */
function ensureSheets_(ss) {
  var created = [];
  var codes = ss.getSheetByName(PREMIUM.SHEET_CODES);
  if (!codes) {
    var sheets = ss.getSheets();
    // A brand-new spreadsheet has one empty sheet ("Sheet1" / "Trang tính1"): reuse it.
    if (sheets.length === 1 && sheets[0].getLastRow() === 0 && sheets[0].getLastColumn() === 0 &&
        !ss.getSheetByName(PREMIUM.SHEET_SETTINGS) && !ss.getSheetByName(PREMIUM.SHEET_LOG)) {
      codes = sheets[0];
      codes.setName(PREMIUM.SHEET_CODES);
    } else {
      codes = ss.insertSheet(PREMIUM.SHEET_CODES, 0);
    }
    created.push(PREMIUM.SHEET_CODES);
  }
  if (codes.getLastRow() === 0) formatCodesSheet_(codes);

  var settings = ss.getSheetByName(PREMIUM.SHEET_SETTINGS);
  if (!settings) {
    settings = ss.insertSheet(PREMIUM.SHEET_SETTINGS);
    created.push(PREMIUM.SHEET_SETTINGS);
  }
  if (settings.getLastRow() === 0) {
    settings.getRange(1, 1, 1, SETTINGS_HEADERS.length).setValues([SETTINGS_HEADERS])
      .setFontWeight('bold').setBackground('#f1f3f4');
    settings.setFrozenRows(1);
    settings.setColumnWidth(1, 160);
    settings.setColumnWidth(2, 80);
    settings.setColumnWidth(3, 560);
  }
  ensureSettingRows_(settings);

  var orders = ss.getSheetByName(PREMIUM.SHEET_ORDERS);
  if (!orders) {
    orders = ss.insertSheet(PREMIUM.SHEET_ORDERS);
    created.push(PREMIUM.SHEET_ORDERS);
  }
  if (orders.getLastRow() === 0) formatOrdersSheet_(orders);

  var log = ss.getSheetByName(PREMIUM.SHEET_LOG);
  if (!log) {
    log = ss.insertSheet(PREMIUM.SHEET_LOG);
    created.push(PREMIUM.SHEET_LOG);
  }
  if (log.getLastRow() === 0) {
    log.getRange(1, 1, 1, LOG_HEADERS.length).setValues([LOG_HEADERS]).setFontWeight('bold').setBackground('#f1f3f4');
    log.setFrozenRows(1);
    for (var i = 0; i < LOG_WIDTHS.length; i++) log.setColumnWidth(i + 1, LOG_WIDTHS[i]);
    ensureRows_(log, 2);
    log.getRange(2, 1, log.getMaxRows() - 1, 1).setNumberFormat('yyyy-mm-dd hh:mm:ss');
  }
  return created;
}

function formatCodesSheet_(sheet) {
  sheet.getRange(1, 1, 1, CODES_HEADERS.length).setValues([CODES_HEADERS]).setFontWeight('bold').setBackground('#f1f3f4');
  sheet.setFrozenRows(1);
  for (var i = 0; i < CODES_WIDTHS.length; i++) sheet.setColumnWidth(i + 1, CODES_WIDTHS[i]);
  ensureRows_(sheet, 2);
  formatCodeRows_(sheet, 2, sheet.getMaxRows() - 1);
}

/** Status dropdown and number formats for rows first .. first+count-1 of the Codes sheet. */
function formatCodeRows_(sheet, first, count) {
  if (count < 1) return;
  var rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(PREMIUM.STATUSES, true)
    .setAllowInvalid(false)
    .setHelpText('Chọn một trong: new, active, expired, revoked')
    .build();
  sheet.getRange(first, COL.STATUS, count, 1).setDataValidation(rule);
  var dateCols = [COL.CREATED, COL.ACTIVATED, COL.EXPIRES, COL.LAST_CHECK, COL.MOVED];
  for (var j = 0; j < dateCols.length; j++) sheet.getRange(first, dateCols[j], count, 1).setNumberFormat(DATE_FORMAT);
  sheet.getRange(first, COL.DAYS, count, 1).setNumberFormat('0');
  sheet.getRange(first, COL.MOVES, count, 1).setNumberFormat('0');
  sheet.getRange(first, COL.CODE, count, 1).setFontFamily('Roboto Mono');
}

function ensureRows_(sheet, minRows) {
  var max = sheet.getMaxRows();
  if (max < minRows) sheet.insertRowsAfter(max, minRows - max);
}

function ensureSettingRows_(sheet) {
  var defaults = [
    [PREMIUM.SETTING_MOVE_AFTER_DAYS, PREMIUM.DEFAULT_MOVE_AFTER_DAYS,
      'Sau bao nhiêu ngày (kể từ lần kích hoạt hoặc lần chuyển gần nhất) học sinh được TỰ chuyển mã sang thiết bị mới. 0 = chỉ chủ trang chuyển được (menu Gỡ thiết bị).'],
    [PREMIUM.SETTING_REFRESH_HOURS, PREMIUM.DEFAULT_REFRESH_HOURS,
      'Cứ bao nhiêu giờ trang web kiểm tra lại mã một lần (mã bị thu hồi sẽ bị khóa sau tối đa chừng này giờ).']
  ];
  var last = sheet.getLastRow();
  var names = {};
  if (last >= 2) {
    var vals = sheet.getRange(2, 1, last - 1, 1).getValues();
    for (var i = 0; i < vals.length; i++) names[readText_(vals[i][0]).toLowerCase()] = true;
  }
  for (var j = 0; j < defaults.length; j++) {
    if (!names[defaults[j][0].toLowerCase()]) sheet.appendRow(defaults[j]);
  }
}

/** Reads Settings; missing or invalid values fall back to the defaults. */
function readSettings_(ss) {
  var out = { moveAfterDays: PREMIUM.DEFAULT_MOVE_AFTER_DAYS, refreshHours: PREMIUM.DEFAULT_REFRESH_HOURS };
  var sheet = ss.getSheetByName(PREMIUM.SHEET_SETTINGS);
  if (!sheet) return out;
  var last = sheet.getLastRow();
  if (last < 2) return out;
  var rows = sheet.getRange(2, 1, last - 1, 2).getValues();
  for (var i = 0; i < rows.length; i++) {
    var name = readText_(rows[i][0]).toLowerCase();
    var value = readNumber_(rows[i][1]);
    if (name === PREMIUM.SETTING_MOVE_AFTER_DAYS.toLowerCase() && value >= 0 && value < 100000) {
      out.moveAfterDays = value;
    } else if (name === PREMIUM.SETTING_REFRESH_HOURS.toLowerCase() && value > 0 && value <= 24 * 30) {
      out.refreshHours = value;
    }
  }
  return out;
}

/** Row number of a canonical code in the Codes sheet, or 0. */
function findCodeRow_(sheet, code) {
  var last = sheet.getLastRow();
  if (last < 2) return 0;
  var col = sheet.getRange(2, COL.CODE, last - 1, 1).getValues();
  for (var i = 0; i < col.length; i++) {
    if (cellCode_(col[i][0]) === code) return i + 2;
  }
  return 0;
}

/**
 * The canonical code held by a Code cell, or ''. Codes typed or pasted by hand in another form
 * (lowercase, spaces, no dashes, O for 0, a trailing space...) still match.
 */
function cellCode_(v) {
  var s = readText_(v);
  if (!s || s.length > 60) return '';
  return normalizeCode_(s) || '';
}

/** true when the first 12 headers of the Codes sheet are the expected ones (case and spaces ignored). */
function codesHeaderOk_(sheet) {
  if (sheet.getMaxColumns() < CODES_HEADERS.length) return false;
  var header = sheet.getRange(1, 1, 1, CODES_HEADERS.length).getValues()[0];
  for (var i = 0; i < CODES_HEADERS.length; i++) {
    if (readText_(header[i]).toLowerCase() !== CODES_HEADERS[i].toLowerCase()) return false;
  }
  return true;
}

/** Writes { column: value } into one row, one setValues call per run of adjacent columns. */
function writeRowChanges_(sheet, row, changes) {
  var cols = Object.keys(changes || {}).map(Number).sort(function (a, b) { return a - b; });
  var i = 0;
  while (i < cols.length) {
    var start = cols[i];
    var values = [toCell_(changes[start])];
    while (i + 1 < cols.length && cols[i + 1] === cols[i] + 1) {
      i++;
      values.push(toCell_(changes[cols[i]]));
    }
    sheet.getRange(row, start, 1, values.length).setValues([values]);
    i++;
  }
}

/**
 * Value for a cell. Text gets a leading apostrophe so Sheets stores it as plain text and never
 * as a formula or number (device labels come from the internet: "=IMPORTXML(...)" must stay text).
 */
function toCell_(v) {
  if (v === null || v === undefined) return '';
  if (typeof v === 'string') return v ? "'" + v : '';
  return v;
}

/** Appends one line to the Log sheet (newest 5000 lines are kept). Never throws. */
function logEvent_(action, code, device, result) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss ? ss.getSheetByName(PREMIUM.SHEET_LOG) : null;
    if (!sheet) return;
    withLock_(function () {
      sheet.appendRow([
        new Date(),
        toCell_(clip_(action, 40)),
        toCell_(clip_(code, 40)),
        toCell_(clip_(device, 64)),
        toCell_(redact_(clip_(result, 300)))
      ]);
      var extra = sheet.getLastRow() - 1 - PREMIUM.LOG_MAX_ROWS;
      if (extra >= PREMIUM.LOG_TRIM_SLACK) sheet.deleteRows(2, extra);
    });
  } catch (err) {
    try {
      console.error('logEvent_ failed: ' + errorText_(err));
    } catch (ignored) {
      // nothing else to do
    }
  }
}

/** Logs an unexpected error (message only, redacted) to the Log sheet and the execution log. */
function reportError_(where, err) {
  try {
    console.error(where + ': ' + redact_(String(err && err.stack ? err.stack : err)));
  } catch (ignored) {
    // console may be unavailable
  }
  logEvent_('error', '', '', where + ': ' + errorText_(err));
}

// =============================================================================================
// Menu (owner)
// =============================================================================================

function onOpen(e) {
  SpreadsheetApp.getUi().createMenu('tunn.sat Premium')
    .addItem('Tạo mã mới…', 'menuCreateCodes')
    .addItem('Thu hồi mã đang chọn', 'menuRevokeSelected')
    .addItem('Gỡ thiết bị của mã đang chọn', 'menuResetDevice')
    .addSeparator()
    .addItem('Cài đặt thanh toán (webhook)…', 'menuPaymentSetup')
    .addItem('Cài đặt khóa bí mật…', 'menuInstallPrivateKey')
    .addItem('Kiểm tra cài đặt', 'menuCheckSetup')
    .addToUi();
  try {
    withLock_(function () { ensureSheets_(SpreadsheetApp.getActiveSpreadsheet()); });
  } catch (err) {
    // The menu items create the sheets as well.
  }
}

function menuCreateCodes() { runMenuAction_('menuCreateCodes', createCodesFlow_); }
function menuRevokeSelected() { runMenuAction_('menuRevokeSelected', revokeFlow_); }
function menuResetDevice() { runMenuAction_('menuResetDevice', resetDeviceFlow_); }
function menuInstallPrivateKey() { runMenuAction_('menuInstallPrivateKey', installKeyFlow_); }
function menuCheckSetup() { runMenuAction_('menuCheckSetup', checkSetupFlow_); }
function menuPaymentSetup() { runMenuAction_('menuPaymentSetup', paymentSetupFlow_); }

/** Makes the webhook token (once) and shows how to set the webhook URL in SePay. */
function paymentSetupFlow_(ui, ss) {
  withLock_(function () { ensureSheets_(ss); });
  var props = PropertiesService.getScriptProperties();
  var token = props.getProperty(PREMIUM.PROP_WEBHOOK_TOKEN);
  if (token) {
    var again = ui.alert('Cài đặt thanh toán', 'Đã có mã bí mật cho webhook. Bấm YES để xem lại đường link, NO để tạo mã MỚI ' +
      '(đường link cũ trong SePay sẽ ngừng hoạt động, phải dán link mới vào SePay).', ui.ButtonSet.YES_NO_CANCEL);
    if (again === ui.Button.CANCEL || again === ui.Button.CLOSE) return;
    if (again === ui.Button.NO) token = '';
  }
  if (!token) {
    token = bytesToBase64_(randomBytes_(24)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    props.setProperty(PREMIUM.PROP_WEBHOOK_TOKEN, token);
    logEvent_('payment setup', '', '', 'new webhook token');
  }
  var html = '<!DOCTYPE html><html><head><base target="_top"><style>' +
    'body{font-family:Arial,sans-serif;font-size:13px;margin:0;color:#202124}p{margin:0 0 8px}' +
    'textarea{width:100%;box-sizing:border-box;height:70px;font-family:"Roboto Mono",Consolas,monospace;font-size:13px;padding:8px}' +
    '</style></head><body>' +
    '<p>Trong SePay → <b>Tích hợp WebHooks</b> → Thêm webhook:</p>' +
    '<p>• <b>Gọi đến URL</b>: đường link Web app của bạn (kết thúc bằng <b>/exec</b>, giống ô premium.api trong config.js) rồi thêm ngay phía sau:</p>' +
    '<textarea readonly onclick="this.select()">?hook=' + escapeHtml_(token) + '</textarea>' +
    '<p>Ví dụ: https://script.google.com/macros/s/…/exec?hook=' + escapeHtml_(token.slice(0, 6)) + '…</p>' +
    '<p>• Sự kiện: <b>Có tiền vào</b>. Chứng thực: <b>Không cần chứng thực</b> (mã bí mật nằm trong link). Kiểu nội dung: <b>application/json</b>.</p>' +
    '<p>Giữ link này bí mật: ai có link đều có thể báo "đã thanh toán". Nếu lộ, chạy lại menu này và chọn tạo mã mới.</p>' +
    '</body></html>';
  ui.showModalDialog(HtmlService.createHtmlOutput(html).setWidth(560).setHeight(330), 'Cài đặt thanh toán');
}

function runMenuAction_(name, flow) {
  var ui = SpreadsheetApp.getUi();
  try {
    flow(ui, SpreadsheetApp.getActiveSpreadsheet());
  } catch (err) {
    reportError_(name, err);
    ui.alert('tunn.sat Premium', err && err.busy
      ? 'Bảng tính đang bận (một yêu cầu khác đang ghi dữ liệu). Hãy thử lại sau vài giây.'
      : 'Có lỗi xảy ra: ' + errorText_(err), ui.ButtonSet.OK);
  }
}

function createCodesFlow_(ui, ss) {
  var countText = askText_(ui, 'Tạo mã mới (1/3)', 'Bạn muốn tạo bao nhiêu mã? Nhập một số từ 1 đến ' + PREMIUM.MAX_CREATE + '.');
  if (countText === null) return;
  var count = /^\d+$/.test(countText.trim()) ? parseInt(countText.trim(), 10) : NaN;
  if (!(count >= 1 && count <= PREMIUM.MAX_CREATE)) {
    ui.alert('Số lượng không hợp lệ', 'Hãy nhập một số nguyên từ 1 đến ' + PREMIUM.MAX_CREATE + ' rồi thử lại.', ui.ButtonSet.OK);
    return;
  }
  var daysText = askText_(ui, 'Tạo mã mới (2/3)', 'Mỗi mã dùng được bao nhiêu ngày (tính từ lúc học sinh kích hoạt)?\nNhập 0 hoặc để trống = dùng vĩnh viễn.');
  if (daysText === null) return;
  daysText = daysText.trim();
  var days = daysText === '' ? 0 : (/^\d+$/.test(daysText) ? parseInt(daysText, 10) : NaN);
  if (!(days >= 0 && days <= 36500)) {
    ui.alert('Số ngày không hợp lệ', 'Hãy nhập một số nguyên (ví dụ 30, 90, 365) hoặc 0 = vĩnh viễn, rồi thử lại.', ui.ButtonSet.OK);
    return;
  }
  var noteText = askText_(ui, 'Tạo mã mới (3/3)', 'Ghi chú cho các mã này (không bắt buộc), ví dụ: tên học sinh, lớp, đợt bán.');
  if (noteText === null) return;
  var note = cleanText_(noteText, PREMIUM.MAX_NOTE_CHARS);

  var codes = createCodes_(ss, count, days, note);
  showCodesDialog_(ui, codes, days, note);
}

/** Appends count new codes (Status "new") to the Codes sheet and returns them. */
function createCodes_(ss, count, days, note) {
  return withLock_(function () {
    ensureSheets_(ss);
    var sheet = ss.getSheetByName(PREMIUM.SHEET_CODES);
    var last = sheet.getLastRow();
    var existing = {};
    if (last >= 2) {
      var col = sheet.getRange(2, COL.CODE, last - 1, 1).getValues();
      for (var i = 0; i < col.length; i++) {
        var v = readText_(col[i][0]).toUpperCase();
        if (v) existing[normalizeCode_(v) || v] = true;
      }
    }
    var codes = generateUniqueCodes_(count, existing);
    var created = new Date();
    var rows = codes.map(function (code) {
      return [code, 'new', days, note, created, '', '', '', '', '', '', 0].map(toCell_);
    });
    var first = Math.max(last, 1) + 1;
    ensureRows_(sheet, first + rows.length - 1);
    formatCodeRows_(sheet, first, rows.length); // rows added to the sheet do not always get the dropdown
    sheet.getRange(first, 1, rows.length, CODES_HEADERS.length).setValues(rows);
    logEvent_('create', codes.length === 1 ? codes[0] : '', '', 'created ' + codes.length + ' code(s) · days ' +
      days + (note ? ' · ' + note : ''));
    return codes;
  });
}

function showCodesDialog_(ui, codes, days, note) {
  var daysText = days > 0 ? days + ' ngày kể từ khi kích hoạt' : 'vĩnh viễn';
  var html = '<!DOCTYPE html><html><head><base target="_top"><style>' +
    'body{font-family:Arial,sans-serif;font-size:13px;margin:0;color:#202124}' +
    'p{margin:0 0 8px}textarea{width:100%;box-sizing:border-box;height:' + Math.min(320, 40 + codes.length * 18) + 'px;' +
    'font-family:"Roboto Mono",Consolas,monospace;font-size:14px;padding:8px}' +
    '.row{display:flex;gap:8px;align-items:center;margin-top:10px}' +
    'button{padding:7px 14px;font-size:13px;cursor:pointer}#msg{color:#188038;flex:1}.hint{color:#5f6368;margin-top:10px}' +
    '</style></head><body>' +
    '<p>Đã tạo <b>' + codes.length + '</b> mã. Thời hạn: <b>' + escapeHtml_(daysText) + '</b>' +
    (note ? ' · Ghi chú: ' + escapeHtml_(note) : '') + '</p>' +
    '<textarea id="codes" readonly spellcheck="false">' + escapeHtml_(codes.join('\n')) + '</textarea>' +
    '<div class="row"><button onclick="copyAll()">Sao chép tất cả</button><span id="msg"></span>' +
    '<button onclick="google.script.host.close()">Đóng</button></div>' +
    '<p class="hint">Các mã cũng đã được lưu trong trang tính Codes (trạng thái "new"). ' +
    'Mỗi mã chỉ dùng được trên một thiết bị tại một thời điểm.</p>' +
    '<script>function copyAll(){var t=document.getElementById("codes");t.focus();t.select();var ok=false;' +
    'try{ok=document.execCommand("copy");}catch(e){}' +
    'if(ok){done();}else if(navigator.clipboard){navigator.clipboard.writeText(t.value).then(done,function(){});}}' +
    'function done(){document.getElementById("msg").textContent="Đã sao chép!";}</script>' +
    '</body></html>';
  var output = HtmlService.createHtmlOutput(html).setWidth(460).setHeight(Math.min(520, 200 + codes.length * 18));
  ui.showModalDialog(output, 'Đã tạo ' + codes.length + ' mã mới');
}

function revokeFlow_(ui, ss) {
  var picked = selectedCodeRows_(ui, ss);
  if (!picked) return;
  var answer = ui.alert('Thu hồi mã',
    'Thu hồi ' + picked.length + ' mã sau?\n' + listCodes_(picked) +
    '\n\nHọc sinh đang dùng sẽ bị khóa Premium ở lần kiểm tra tiếp theo. Muốn mở lại: đổi Status về "active".',
    ui.ButtonSet.YES_NO);
  if (answer !== ui.Button.YES) return;
  var done = withLock_(function () {
    var n = 0;
    picked.forEach(function (p) {
      if (!sameCodeAtRow_(picked.sheet, p)) return;
      writeRowChanges_(picked.sheet, p.row, (function () { var c = {}; c[COL.STATUS] = 'revoked'; return c; })());
      logEvent_('revoke', p.code, '', 'revoked by owner');
      n++;
    });
    return n;
  });
  ui.alert('Thu hồi mã', 'Đã thu hồi ' + done + ' mã.', ui.ButtonSet.OK);
}

function resetDeviceFlow_(ui, ss) {
  var picked = selectedCodeRows_(ui, ss);
  if (!picked) return;
  var answer = ui.alert('Gỡ thiết bị',
    'Gỡ thiết bị khỏi ' + picked.length + ' mã sau?\n' + listCodes_(picked) +
    '\n\nMã sẽ kích hoạt lại được trên một thiết bị mới. Thiết bị cũ sẽ bị khóa ở lần kiểm tra tiếp theo. ' +
    'Thời hạn sử dụng không thay đổi.',
    ui.ButtonSet.YES_NO);
  if (answer !== ui.Button.YES) return;
  var done = withLock_(function () {
    var n = 0;
    picked.forEach(function (p) {
      if (!sameCodeAtRow_(picked.sheet, p)) return;
      var c = {};
      c[COL.DEVICE] = '';
      c[COL.DEVICE_INFO] = '';
      c[COL.MOVED] = '';
      writeRowChanges_(picked.sheet, p.row, c);
      logEvent_('reset', p.code, readText_(p.values[COL.DEVICE - 1]), 'device removed by owner');
      n++;
    });
    return n;
  });
  ui.alert('Gỡ thiết bị', 'Đã gỡ thiết bị khỏi ' + done + ' mã. Học sinh nhập lại mã trên thiết bị mới để kích hoạt.', ui.ButtonSet.OK);
}

/** Rows of the Codes sheet selected by the owner: [{row, code, values}] (with .sheet), or null. */
function selectedCodeRows_(ui, ss) {
  var sheet = ss.getActiveSheet();
  var range = SpreadsheetApp.getActiveRange();
  if (!sheet || sheet.getName() !== PREMIUM.SHEET_CODES || !range || range.getSheet().getName() !== PREMIUM.SHEET_CODES) {
    ui.alert('Chọn mã', 'Hãy mở trang tính "Codes", bấm vào ô của mã cần xử lý (có thể chọn nhiều dòng liền nhau), rồi chạy lại.', ui.ButtonSet.OK);
    return null;
  }
  var first = Math.max(2, range.getRow());
  var last = Math.min(range.getLastRow(), sheet.getLastRow());
  var picked = [];
  if (last >= first) {
    var values = sheet.getRange(first, 1, last - first + 1, CODES_HEADERS.length).getValues();
    for (var i = 0; i < values.length; i++) {
      var code = readText_(values[i][COL.CODE - 1]);
      if (!code) continue;
      // A selection across a filtered (or hidden) block also covers the rows the owner cannot see: skip them.
      if (last > first && (sheet.isRowHiddenByFilter(first + i) || sheet.isRowHiddenByUser(first + i))) continue;
      picked.push({ row: first + i, code: code, values: values[i] });
    }
  }
  if (!picked.length) {
    ui.alert('Chọn mã', 'Bạn chưa chọn dòng nào có mã. Hãy bấm vào ô của mã cần xử lý (không phải hàng tiêu đề), rồi chạy lại.', ui.ButtonSet.OK);
    return null;
  }
  picked.sheet = sheet;
  return picked;
}

function sameCodeAtRow_(sheet, p) {
  return readText_(sheet.getRange(p.row, COL.CODE).getValue()) === p.code;
}

function listCodes_(picked) {
  var shown = picked.slice(0, 10).map(function (p) { return '  ' + p.code; }).join('\n');
  return picked.length > 10 ? shown + '\n  … và ' + (picked.length - 10) + ' mã khác' : shown;
}

function installKeyFlow_(ui, ss) {
  if (PropertiesService.getScriptProperties().getProperty(PREMIUM.PROP_PRIVATE_KEY)) {
    var again = ui.alert('Cài đặt khóa bí mật', 'Máy chủ đã có khóa bí mật. Bạn có muốn thay bằng khóa khác không?', ui.ButtonSet.YES_NO);
    if (again !== ui.Button.YES) return;
  }
  var text = askText_(ui, 'Cài đặt khóa bí mật',
    'Mở file private-key.json bằng Notepad (Windows) hoặc TextEdit (Mac), chọn tất cả (Ctrl+A), ' +
    'sao chép (Ctrl+C) rồi dán vào ô bên dưới (Ctrl+V).\nKhông gửi file này cho bất kỳ ai.');
  if (text === null) return;
  var result = installPrivateKey_(text);
  if (!result.ok) {
    logEvent_('install-key', '', '', 'failed');
    ui.alert('Chưa cài được khóa', result.reason + '\n\nKhóa chưa được lưu. Hãy thử lại.', ui.ButtonSet.OK);
    return;
  }
  withLock_(function () {
    ensureSheets_(ss);
    logEvent_('install-key', '', '', 'ok · kid ' + result.kid + ' · fingerprint ' + result.fingerprint);
  });
  ui.alert('Đã cài khóa bí mật',
    'Khóa đã được lưu trong Script Properties của dự án Apps Script (chỉ chủ dự án xem được).\n' +
    'Tự kiểm tra mã hóa/giải mã: OK.\nMã nhận dạng khóa: ' + result.kid + ' · ' + result.fingerprint +
    '\n\nBước tiếp theo: chạy "Kiểm tra cài đặt", rồi Triển khai (Deploy) web app theo hướng dẫn.',
    ui.ButtonSet.OK);
}

function checkSetupFlow_(ui, ss) {
  var report = checkSetup_(ss);
  ui.alert(report.ok ? 'Kiểm tra cài đặt: OK' : 'Kiểm tra cài đặt: cần sửa ' + report.problems + ' mục', report.text, ui.ButtonSet.OK);
}

/** Checks sheets, settings and the private key. Returns { ok, problems, text } (Vietnamese). */
function checkSetup_(ss) {
  var lines = [];
  var problems = 0;
  function good(t) { lines.push('[OK] ' + t); }
  function bad(t) { lines.push('[CẦN SỬA] ' + t); problems++; }
  function note(t) { lines.push('[LƯU Ý] ' + t); }

  var created = withLock_(function () { return ensureSheets_(ss); });
  if (created.length) note('Vừa tạo trang tính: ' + created.join(', ') + '.');

  var codes = ss.getSheetByName(PREMIUM.SHEET_CODES);
  if (codesHeaderOk_(codes)) {
    var counts = { 'new': 0, active: 0, expired: 0, revoked: 0, other: 0 };
    var total = 0;
    var issues = [];
    var seen = {};
    var last = codes.getLastRow();
    if (last >= 2) {
      var vals = codes.getRange(2, 1, last - 1, CODES_HEADERS.length).getValues();
      for (var i = 0; i < vals.length; i++) {
        var raw = readText_(vals[i][COL.CODE - 1]);
        if (!raw) continue;
        total++;
        var rowNo = i + 2;
        var canonical = cellCode_(raw);
        if (!canonical) {
          issues.push('dòng ' + rowNo + ': cột Code "' + clip_(raw, 30) + '" không phải mã hợp lệ (gõ nhầm một ký tự?)');
        } else if (hasOwn_(seen, canonical)) {
          issues.push('dòng ' + rowNo + ': mã ' + canonical + ' trùng với dòng ' + seen[canonical] + ' (máy chủ chỉ dùng dòng ' + seen[canonical] + ')');
        } else {
          seen[canonical] = rowNo;
        }
        var st = readStatus_(vals[i][COL.STATUS - 1]);
        counts[st === null ? 'other' : st]++;
        var rowIssues = codeRowProblems_(vals[i]);
        for (var k = 0; k < rowIssues.length; k++) issues.push('dòng ' + rowNo + ': ' + rowIssues[k]);
      }
    }
    good('Trang tính Codes: ' + total + ' mã (new ' + counts['new'] + ', active ' + counts.active +
      ', expired ' + counts.expired + ', revoked ' + counts.revoked + ').');
    if (issues.length) {
      bad('Trang Codes có ' + issues.length + ' chỗ cần sửa. Máy chủ từ chối mã ở dòng có ô không đọc được cho tới khi bạn sửa:\n  ' +
        issues.slice(0, 10).join('\n  ') + (issues.length > 10 ? '\n  … và ' + (issues.length - 10) + ' chỗ khác' : ''));
    }
  } else {
    bad('Hàng tiêu đề của trang Codes khác mẫu, nên máy chủ đang từ chối mọi mã. 12 cột đầu phải đúng thứ tự: ' +
      CODES_HEADERS.join(' | ') + '. Muốn thêm cột riêng, hãy thêm ở bên phải cột Moves.');
  }

  var settings = readSettings_(ss);
  good('Settings: Move after days = ' + settings.moveAfterDays + (settings.moveAfterDays > 0 ? '' : ' (chỉ chủ trang chuyển mã)') +
    ', Refresh hours = ' + settings.refreshHours + '.');
  var log = ss.getSheetByName(PREMIUM.SHEET_LOG);
  good('Trang tính Log: ' + Math.max(0, log.getLastRow() - 1) + ' dòng.');
  var orders = ss.getSheetByName(PREMIUM.SHEET_ORDERS);
  if (ordersHeaderOk_(orders)) good('Trang tính Orders: ' + Math.max(0, orders.getLastRow() - 1) + ' đơn.');
  else bad('Hàng tiêu đề của trang Orders khác mẫu, nên thanh toán đang bị tắt. 11 cột đầu phải đúng thứ tự: ' + ORDERS_HEADERS.join(' | ') + '.');
  if (PropertiesService.getScriptProperties().getProperty(PREMIUM.PROP_WEBHOOK_TOKEN)) good('Thanh toán: đã có mã bí mật cho webhook.');
  else note('Thanh toán tự động: chưa cài webhook (menu tunn.sat Premium → Cài đặt thanh toán…). Bạn vẫn có thể duyệt tay: đặt Status của đơn thành paid.');

  var raw = PropertiesService.getScriptProperties().getProperty(PREMIUM.PROP_PRIVATE_KEY);
  if (!raw) {
    bad('Chưa cài khóa bí mật: menu tunn.sat Premium → Cài đặt khóa bí mật…');
  } else {
    var parsed = parseJwk_(raw);
    if (!parsed.ok) {
      bad('Khóa bí mật đã lưu bị hỏng. Hãy cài lại: menu tunn.sat Premium → Cài đặt khóa bí mật…');
    } else {
      good('Khóa bí mật: đã cài (kid ' + (parsed.key.kid || '?') + ', mã nhận dạng ' + parsed.key.fp + ').');
      var match = siteKeyMatches_(parsed.key);
      if (match === true) good('Khóa khớp với khóa công khai của trang web (kid ' + PREMIUM.SITE_KEY_KID + ').');
      else if (match === false) bad('Khóa KHÔNG khớp với khóa công khai của trang web. Hãy cài lại đúng file private-key.json.');
      else note('Không có khóa công khai trong Code.gs để so sánh (PREMIUM.SITE_PUBLIC_KEY_SPKI).');
      if (selfTestKey_(parsed.key)) good('Tự kiểm tra mã hóa/giải mã: OK.');
      else bad('Tự kiểm tra mã hóa/giải mã thất bại. Hãy cài lại khóa bí mật.');
    }
  }
  lines.push('');
  lines.push(problems
    ? 'Hãy sửa các mục [CẦN SỬA] rồi chạy lại "Kiểm tra cài đặt".'
    : 'Mọi thứ đã sẵn sàng. Nếu chưa triển khai: Deploy → New deployment → Web app (Execute as: Me, Who has access: Anyone). ' +
      'Sau mỗi lần sửa Code.gs: Deploy → Manage deployments → Edit → Version: New version.');
  return { ok: problems === 0, problems: problems, text: lines.join('\n') };
}

/** ui.prompt with OK / Cancel; returns the text, or null when cancelled. */
function askText_(ui, title, message) {
  var resp = ui.prompt(title, message, ui.ButtonSet.OK_CANCEL);
  if (resp.getSelectedButton() !== ui.Button.OK) return null;
  return String(resp.getResponseText() || '');
}

// =============================================================================================
// RSA-OAEP with SHA-256 / MGF1-SHA-256 and an empty label (RFC 8017), BigInt arithmetic
// =============================================================================================

// SHA-256 of the empty label.
var EMPTY_LABEL_HASH_ = hexToBytes_('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');

/** Decrypts a k-byte RSA-OAEP ciphertext (unsigned bytes). Returns the message bytes or null. */
function rsaOaepDecrypt_(cipher, key) {
  try {
    var k = key.k;
    if (!cipher || cipher.length !== k || k < 66) return null;
    var c = bytesToBigInt_(cipher);
    if (c >= key.n) return null;
    var m = rsaPrivate_(c, key);
    if (m === null) return null;
    var em = bigIntToBytes_(m, k);
    return em ? oaepDecode_(em) : null;
  } catch (err) {
    return null;
  }
}

/** m = c^d mod n using the CRT parameters, verified with m^e mod n == c. */
function rsaPrivate_(c, key) {
  var m1 = modPow_(c % key.p, key.dp, key.p);
  var m2 = modPow_(c % key.q, key.dq, key.q);
  var diff = (m1 - m2) % key.p;
  if (diff < BigInt(0)) diff += key.p;
  var h = (key.qi * diff) % key.p;
  var m = m2 + h * key.q;
  if (modPow_(m, key.e, key.n) !== c) return null; // fault check; also catches a wrong key
  return m;
}

/** EME-OAEP decoding. em has the length of the modulus. Returns the message or null. */
function oaepDecode_(em) {
  var hLen = 32;
  if (em.length < 2 * hLen + 2) return null;
  var maskedSeed = em.slice(1, 1 + hLen);
  var maskedDb = em.slice(1 + hLen);
  var seed = xorBytes_(maskedSeed, mgf1Sha256_(maskedDb, hLen));
  var db = xorBytes_(maskedDb, mgf1Sha256_(seed, maskedDb.length));
  var bad = em[0] !== 0;                       // leading byte must be 0x00
  for (var i = 0; i < hLen; i++) {             // lHash' must equal SHA-256("")
    if (db[i] !== EMPTY_LABEL_HASH_[i]) bad = true;
  }
  var sep = -1;                                // PS = 0x00..., then the 0x01 separator
  for (var j = hLen; j < db.length; j++) {
    if (db[j] === 1) {
      sep = j;
      break;
    }
    if (db[j] !== 0) {
      bad = true;
      break;
    }
  }
  if (sep < 0 || bad) return null;
  return db.slice(sep + 1);
}

/** RSA-OAEP encryption with the public part of key ({n, e, k}): device keys, and the setup self-test. */
function rsaOaepEncrypt_(message, key, seedForTest) {
  var hLen = 32;
  var k = key.k;
  if (message.length > k - 2 * hLen - 2) return null;
  var ps = [];
  for (var i = 0; i < k - message.length - 2 * hLen - 2; i++) ps.push(0);
  var db = EMPTY_LABEL_HASH_.concat(ps, [1], message);
  var seed = seedForTest || randomBytes_(hLen);
  var maskedDb = xorBytes_(db, mgf1Sha256_(seed, k - hLen - 1));
  var maskedSeed = xorBytes_(seed, mgf1Sha256_(maskedDb, hLen));
  var em = [0].concat(maskedSeed, maskedDb);
  return bigIntToBytes_(modPow_(bytesToBigInt_(em), key.e, key.n), k);
}

function mgf1Sha256_(seed, length) {
  var out = [];
  for (var counter = 0; out.length < length; counter++) {
    var block = seed.concat([(counter >>> 24) & 255, (counter >>> 16) & 255, (counter >>> 8) & 255, counter & 255]);
    var h = sha256_(block);
    for (var i = 0; i < h.length && out.length < length; i++) out.push(h[i]);
  }
  return out;
}

/** base^exp mod m with a fixed 4-bit window. */
function modPow_(base, exp, m) {
  var one = BigInt(1);
  if (m === one) return BigInt(0);
  base = base % m;
  var table = [one, base];
  for (var i = 2; i < 16; i++) table.push((table[i - 1] * base) % m);
  var hex = exp.toString(16);
  var r = one;
  for (var j = 0; j < hex.length; j++) {
    if (j > 0) {
      r = (r * r) % m;
      r = (r * r) % m;
      r = (r * r) % m;
      r = (r * r) % m;
    }
    var d = parseInt(hex.charAt(j), 16);
    if (d) r = (r * table[d]) % m;
  }
  return r;
}

/** Reads n and e from a base64 DER SubjectPublicKeyInfo (RSA). Returns {n, e} or null. */
function parseSpkiRsa_(b64) {
  try {
    var der = base64ToBytes_(b64);
    if (!der) return null;
    var pos = 0;
    var readHeader = function (tag) {
      if (der[pos++] !== tag) throw new Error('DER: unexpected tag');
      var len = der[pos++];
      if (len & 0x80) {
        var nb = len & 0x7f;
        if (nb < 1 || nb > 3) throw new Error('DER: bad length');
        len = 0;
        while (nb--) len = len * 256 + der[pos++];
      }
      if (pos + len > der.length) throw new Error('DER: truncated');
      return len;
    };
    readHeader(0x30);              // SubjectPublicKeyInfo
    // AlgorithmIdentifier (skipped). Not "pos += readHeader(...)": that would add the length to the
    // value pos had BEFORE readHeader moved it past the tag and length bytes.
    var algLen = readHeader(0x30);
    pos += algLen;
    readHeader(0x03);              // BIT STRING
    if (der[pos++] !== 0) return null;
    readHeader(0x30);              // RSAPublicKey
    var nLen = readHeader(0x02);
    var n = bytesToBigInt_(der.slice(pos, pos + nLen));
    pos += nLen;
    var eLen = readHeader(0x02);
    var e = bytesToBigInt_(der.slice(pos, pos + eLen));
    return { n: n, e: e };
  } catch (err) {
    return null;
  }
}

// =============================================================================================
// Bytes (unsigned arrays inside this file; signed Java bytes at the Utilities boundary)
// =============================================================================================

function toJavaBytes_(bytes) {
  var out = new Array(bytes.length);
  for (var i = 0; i < bytes.length; i++) {
    var b = bytes[i] & 255;
    out[i] = b > 127 ? b - 256 : b;
  }
  return out;
}

function fromJavaBytes_(bytes) {
  var out = new Array(bytes.length);
  for (var i = 0; i < bytes.length; i++) out[i] = bytes[i] & 255;
  return out;
}

function sha256_(bytes) {
  return fromJavaBytes_(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, toJavaBytes_(bytes)));
}

/** Standard base64 (padding optional) or base64url -> unsigned bytes; null when malformed. */
function base64ToBytes_(text) {
  if (typeof text !== 'string') return null;
  var s = text.replace(/\s+/g, '');
  if (!s || !BASE64_TEXT_RE.test(s)) return null;
  s = s.replace(/=+$/, '').replace(/-/g, '+').replace(/_/g, '/');
  if (s.length % 4 === 1) return null;
  while (s.length % 4) s += '=';
  try {
    return fromJavaBytes_(Utilities.base64Decode(s));
  } catch (err) {
    return null;
  }
}

function bytesToBase64_(bytes) {
  return Utilities.base64Encode(toJavaBytes_(bytes));
}

function base64ToBigInt_(text) {
  var bytes = base64ToBytes_(text);
  if (!bytes || !bytes.length) throw new Error('bad base64 value');
  return bytesToBigInt_(bytes);
}

function bytesToHex_(bytes) {
  var hex = '';
  for (var i = 0; i < bytes.length; i++) hex += (bytes[i] < 16 ? '0' : '') + bytes[i].toString(16);
  return hex;
}

function hexToBytes_(hex) {
  var out = [];
  for (var i = 0; i + 1 < hex.length; i += 2) out.push(parseInt(hex.substr(i, 2), 16));
  return out;
}

function bytesToBigInt_(bytes) {
  return bytes.length ? BigInt('0x' + bytesToHex_(bytes)) : BigInt(0);
}

/** Big-endian bytes of x, left-padded to length; null if x does not fit. */
function bigIntToBytes_(x, length) {
  var hex = x.toString(16);
  if (hex.length % 2) hex = '0' + hex;
  if (hex.length > length * 2) return null;
  while (hex.length < length * 2) hex = '00' + hex;
  return hexToBytes_(hex);
}

function bitLength_(x) {
  return x > BigInt(0) ? x.toString(2).length : 0;
}

function xorBytes_(a, b) {
  var out = new Array(a.length);
  for (var i = 0; i < a.length; i++) out[i] = a[i] ^ b[i];
  return out;
}

function bytesEqual_(a, b) {
  if (!a || !b || a.length !== b.length) return false;
  var diff = 0;
  for (var i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

/**
 * The random nibbles of a version 4 UUID (Utilities.getUuid is backed by Java SecureRandom).
 * Of its 32 hex digits, digit 12 is the version and digit 16 carries the variant bits; the other
 * 30 digits (120 bits) are random.
 */
function uuidRandomNibbles_() {
  var hex = String(Utilities.getUuid()).toLowerCase().replace(/-/g, '');
  if (!/^[0-9a-f]{12}4[0-9a-f]{3}[89ab][0-9a-f]{15}$/.test(hex)) {
    throw new Error('Utilities.getUuid() did not return a version 4 UUID');
  }
  var out = [];
  for (var i = 0; i < 32; i++) {
    if (i === 12 || i === 16) continue;
    out.push(parseInt(hex.charAt(i), 16));
  }
  return out;
}

function randomBytes_(count) {
  var out = [];
  while (out.length < count) {
    var nibbles = uuidRandomNibbles_();
    for (var i = 0; i + 1 < nibbles.length && out.length < count; i += 2) out.push(nibbles[i] * 16 + nibbles[i + 1]);
  }
  return out;
}

// =============================================================================================
// Small helpers
// =============================================================================================

function isDate_(v) {
  return Object.prototype.toString.call(v) === '[object Date]';
}

function hasOwn_(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

/** Cell -> trimmed text ('' for empty). A leading apostrophe (text marker) is dropped. */
function readText_(v) {
  if (v === null || v === undefined || v === '') return '';
  var s = String(v).trim();
  return s.charAt(0) === "'" ? s.slice(1).trim() : s;
}

/** Cell -> number (NaN when not a number). */
function readNumber_(v) {
  if (typeof v === 'number') return v;
  if (typeof v !== 'string') return NaN;
  var s = readText_(v).replace(',', '.');
  return /^[+-]?\d+(\.\d+)?$/.test(s) ? parseFloat(s) : NaN;
}

function isBadNumber_(x) {
  return typeof x === 'number' && x !== x; // NaN
}

// Dates outside this range in a date column are typos (a time-only cell, a number of days...).
var TIME_MIN_ = Date.UTC(2000, 0, 1);
var TIME_MAX_ = Date.UTC(2200, 0, 1);

/**
 * Date cell -> epoch milliseconds; null when empty; NaN when it holds something that is not a usable
 * date. Sheets normally gives Date objects; a number is a date shown as a number (serial day); text
 * is a date Sheets did not recognise, read as "2027-12-31 23:59" or day-first "31/12/2027 23:59".
 */
function readTime_(v) {
  if (v === null || v === undefined || v === '') return null;
  var t = NaN;
  if (isDate_(v)) t = v.getTime();
  else if (typeof v === 'number') t = Math.round((v - 25569) * DAY_MS);
  else if (typeof v === 'string') {
    var s = readText_(v);
    if (!s) return null;
    t = parseDateText_(s);
  }
  return isFinite(t) && t >= TIME_MIN_ && t < TIME_MAX_ ? t : NaN;
}

/** Text date -> epoch ms (local time of the script) or NaN. */
function parseDateText_(s) {
  var y, mo, d;
  var m = /^(\d{4})[-\/.](\d{1,2})[-\/.](\d{1,2})(?:[ T,]+(\d{1,2}):(\d{2})(?::(\d{2})(?:\.\d+)?)?)?$/.exec(s);
  if (m) {
    y = +m[1]; mo = +m[2]; d = +m[3];
  } else {
    m = /^(\d{1,2})[-\/.](\d{1,2})[-\/.](\d{4})(?:[ T,]+(\d{1,2}):(\d{2})(?::(\d{2}))?)?$/.exec(s);
    if (!m) {
      // Full ISO 8601 with a time zone, e.g. copied from the Log or from an API answer.
      return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:?\d{2})$/.test(s) ? Date.parse(s) : NaN;
    }
    d = +m[1]; mo = +m[2]; y = +m[3];      // day first (Vietnamese order) ...
    if (mo > 12 && d <= 12) { var x = d; d = mo; mo = x; } // ... unless only month first makes sense
  }
  var h = +(m[4] || 0);
  var mi = +(m[5] || 0);
  var sec = +(m[6] || 0);
  if (mo < 1 || mo > 12 || d < 1 || d > 31 || h > 23 || mi > 59 || sec > 59) return NaN;
  var date = new Date(y, mo - 1, d, h, mi, sec);
  return date.getFullYear() === y && date.getMonth() === mo - 1 && date.getDate() === d ? date.getTime() : NaN;
}

/** Days cell -> number of days (0 = lifetime), or NaN when it is not a number of days. */
function readDays_(v) {
  if (v === null || v === undefined || v === '') return 0;
  if (typeof v === 'number') return isFinite(v) && v >= 0 ? v : NaN;
  if (typeof v !== 'string') return NaN;
  var s = readText_(v);
  if (!s) return 0;
  var word = foldWord_(s);
  if (word === 'vinhvien' || word === 'lifetime') return 0;
  var m = /^(\d+(?:[.,]\d+)?)\s*(\D*)$/.exec(s);
  if (!m) return NaN;
  var unit = foldWord_(m[2]);
  if (unit !== '' && unit !== 'ngay' && unit !== 'day' && unit !== 'days' && unit !== 'd') return NaN;
  return parseFloat(m[1].replace(',', '.'));
}

// Status words the server understands, compared without accents, spaces or case. The dropdown only
// offers the first word of each list; the others cover values typed or pasted by the owner.
var STATUS_WORDS_ = {
  'new': ['new', 'moi', 'chuadung', 'chuakichhoat'],
  active: ['active', 'dangdung', 'kichhoat', 'dakichhoat', 'hoatdong', 'danghoatdong'],
  expired: ['expired', 'hethan', 'dahethan'],
  revoked: ['revoked', 'revoke', 'thuhoi', 'dathuhoi', 'huy', 'dahuy', 'khoa', 'dakhoa', 'disabled', 'blocked']
};

/** Status cell -> 'new' (also for an empty cell), 'active', 'expired', 'revoked', or null when unknown. */
function readStatus_(v) {
  var word = foldWord_(readText_(v));
  if (!word) return 'new';
  for (var status in STATUS_WORDS_) {
    if (hasOwn_(STATUS_WORDS_, status) && STATUS_WORDS_[status].indexOf(word) >= 0) return status;
  }
  return null;
}

// Vietnamese letters with their base letter (precomposed form); combining marks are removed separately.
var VI_LETTERS_ = 'àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ';
var VI_BASES_ = 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyd';

/** Lowercase, no Vietnamese accents, only a-z and 0-9: "Đã thu hồi " -> "dathuhoi". */
function foldWord_(v) {
  var s = String(v === null || v === undefined ? '' : v).toLowerCase().replace(/[̀-ͯ]/g, '');
  var out = '';
  for (var i = 0; i < s.length; i++) {
    var k = VI_LETTERS_.indexOf(s.charAt(i));
    out += k >= 0 ? VI_BASES_.charAt(k) : s.charAt(i);
  }
  return out.replace(/[^a-z0-9]/g, '');
}

/** Every unreadable cell of one Codes row (Vietnamese descriptions, for "Kiểm tra cài đặt"). */
function codeRowProblems_(row) {
  var out = [];
  if (readStatus_(row[COL.STATUS - 1]) === null) out.push(cellProblem_(COL.STATUS, row[COL.STATUS - 1]));
  if (isBadNumber_(readDays_(row[COL.DAYS - 1]))) out.push(cellProblem_(COL.DAYS, row[COL.DAYS - 1]));
  var cols = [COL.ACTIVATED, COL.EXPIRES, COL.MOVED];
  for (var i = 0; i < cols.length; i++) {
    if (isBadNumber_(readTime_(row[cols[i] - 1]))) out.push(cellProblem_(cols[i], row[cols[i] - 1]));
  }
  return out;
}

/** Vietnamese description of an unreadable cell of the Codes sheet, for the Log and "Kiểm tra cài đặt". */
function cellProblem_(col, value) {
  var name = CODES_HEADERS[col - 1];
  var shown = isDate_(value) ? (isFinite(value.getTime()) ? value.toISOString().slice(0, 16).replace('T', ' ') + ' UTC' : 'ngày lỗi')
    : clip_(readText_(value), 40);
  var what = col === COL.STATUS ? 'không phải new / active / expired / revoked'
    : col === COL.DAYS ? 'không phải số ngày (ví dụ 30; 0 hoặc để trống = vĩnh viễn)'
    : 'không phải ngày giờ hợp lệ (ví dụ 2027-12-31 23:59)';
  return 'cột ' + name + ' "' + shown + '" ' + what;
}

function clip_(v, max) {
  var s = v === null || v === undefined ? '' : String(v);
  if (s.length <= max) return s;
  s = s.slice(0, max);
  return /[\uD800-\uDBFF]$/.test(s) ? s.slice(0, -1) : s; // do not cut a surrogate pair
}

/** Removes control characters, collapses spaces, trims and clips. */
function cleanText_(v, max) {
  var s = String(v === null || v === undefined ? '' : v)
    .replace(/[\u0000-\u001f\u007f-\u009f\u2028\u2029]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return clip_(s, max).trim();
}

/** Hides long base64/hex-looking runs so key material can never end up in a log line. */
function redact_(s) {
  return String(s).replace(/[A-Za-z0-9+\/_=-]{40,}/g, '[…]');
}

function errorText_(err) {
  var msg = err && err.message ? err.message : String(err);
  return clip_(redact_(msg), 200);
}

function escapeHtml_(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
