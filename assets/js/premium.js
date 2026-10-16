/*
 * Premium: unlock codes for the Premium tests (every Advanced Test, and the Practice Tests marked "premium: yes").
 *
 * Premium tests are published encrypted (tests/premium/*.js, see tools/premium/). A code such as
 * TUNN-XXXX-XXXX-XXXX is checked by the owner's Google Apps Script server, which binds it to one
 * device and returns the keys that decrypt the tests. The keys are kept in this browser, so the tests
 * open instantly and offline; the license is re-checked about once a day.
 *
 * The device is a WebCrypto RSA-OAEP key pair made NON-EXTRACTABLE and kept in IndexedDB: its private
 * key cannot be read or copied out of the browser. The server binds the code to the key and sends the
 * test keys wrapped for it, so copying this browser's saved data to another browser opens nothing there.
 */
(function (global) {
  'use strict';

  var U = global.U;
  var LS_KEY = 'tunn.premium.v1';
  var LS_LOST = 'tunn.premium.lost.v1';
  var LS_DEVICE = 'tunn.device.v1';
  var ALPHABET = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'; // Crockford base32: no I, L, O, U
  var DAY = 86400000;
  var OFFLINE_GRACE = 7 * DAY;  // keep working this long without reaching the server
  var CLOCK_SKEW = 5 * 60000;   // a "last checked" time further in the future than this is not trusted
  var MISSING_RETRY = 3600000;  // ask again at most hourly for keys the server did not give
  var REQUEST_TIMEOUT = 20000;
  var IDB_TIMEOUT = 3000;       // some browsers never answer IndexedDB (known WebKit hang): give up after this
  var HARD_ERRORS = ['revoked', 'expired', 'device', 'notfound'];

  var IDB_NAME = 'tunn';
  var IDB_STORE = 'keys';
  var IDB_DEVICE = 'device';

  var listeners = [];
  var refreshing = null;
  var deviceKey = null; // { privateKey (non-extractable CryptoKey), spki (base64), id ('k_' + SHA-256 of spki) }
  var keyReadFailed = false; // IndexedDB could not be read (not the same as "no key stored")

  function cfg() { return (global.APP_CONFIG && global.APP_CONFIG.premium) || {}; }
  function apiUrl() { return String(cfg().api || '').trim(); }
  function Lib() { return global.SATLibrary; }
  function hasCrypto() { return !!(global.crypto && global.crypto.subtle && global.isSecureContext !== false); }

  /* ---------------- Codes ---------------- */

  function checkSymbol(data) {
    var sum = 0;
    for (var i = 0; i < data.length; i++) sum += (i + 1) * ALPHABET.indexOf(data.charAt(i));
    return ALPHABET.charAt(sum % 31);
  }

  /**
   * The code symbols in what the user typed or pasted: spaces, dashes and the TUNN prefix removed,
   * O→0 and I/L→1. A pasted message ("Your code: TUNN-XXXX-XXXX-XXXX, thanks") gives just the code.
   */
  function symbols(input) {
    var raw = String(input || '').toUpperCase();
    var m = /TUNN[^A-Z0-9]*([0-9A-Z]{4})[^A-Z0-9]*([0-9A-Z]{4})[^A-Z0-9]*([0-9A-Z]{4})(?![0-9A-Z])/.exec(raw);
    var s = m ? m[1] + m[2] + m[3] : raw.replace(/[^A-Z0-9]/g, '');
    if (!m && s.indexOf('TUNN') === 0) s = s.slice(4); // U is never a code symbol, so this is the prefix
    return s.replace(/O/g, '0').replace(/[IL]/g, '1');
  }

  /** { ok, code, error }: code is the canonical TUNN-XXXX-XXXX-XXXX form. */
  function normalize(input) {
    var s = symbols(input);
    if (!s) return { ok: false, error: 'empty' };
    if (s.length !== 12) return { ok: false, error: 'length' };
    for (var i = 0; i < 12; i++) if (ALPHABET.indexOf(s.charAt(i)) === -1) return { ok: false, error: 'chars' };
    if (checkSymbol(s.slice(0, 11)) !== s.charAt(11)) return { ok: false, error: 'checksum' };
    return { ok: true, code: 'TUNN-' + s.slice(0, 4) + '-' + s.slice(4, 8) + '-' + s.slice(8) };
  }

  function masked(code) { return String(code || '').replace(/^(TUNN-\w{4})-\w{4}-\w{2}(\w{2})$/, '$1-••••-••$2'); }

  /* ---------------- Device ---------------- */

  function b64url(bytes) {
    return bytesToB64(bytes).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function bytesToB64(bytes) {
    var s = '';
    for (var i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
    return btoa(s);
  }

  /** The random device id of earlier versions (codes activated before device keys), or ''. */
  function legacyId() {
    var id = U.lsGet(LS_DEVICE, '');
    return typeof id === 'string' && /^[A-Za-z0-9_-]{16,64}$/.test(id) && !/^k_[A-Za-z0-9_-]{43}$/.test(id) ? id : '';
  }

  /** Runs fn(objectStore) in an IndexedDB transaction; resolves with the result of the request fn returns. */
  function idb(mode, fn) {
    return new Promise(function (resolveNow, rejectNow) {
      var settled = false;
      var timer = setTimeout(function () { reject(new Error('IndexedDB did not answer')); }, IDB_TIMEOUT);
      function resolve(v) { if (!settled) { settled = true; clearTimeout(timer); resolveNow(v); } }
      function reject(e) { if (!settled) { settled = true; clearTimeout(timer); rejectNow(e); } }
      var factory = global.indexedDB;
      if (!factory) { reject(new Error('IndexedDB is not available')); return; }
      var open;
      try { open = factory.open(IDB_NAME, 1); } catch (e) { reject(e); return; }
      open.onupgradeneeded = function () { open.result.createObjectStore(IDB_STORE); };
      open.onerror = function () { reject(open.error || new Error('IndexedDB open failed')); };
      open.onblocked = function () { reject(new Error('IndexedDB is blocked')); };
      open.onsuccess = function () {
        var db = open.result;
        var req = null;
        try {
          var tx = db.transaction(IDB_STORE, mode);
          tx.oncomplete = function () { db.close(); resolve(req ? req.result : undefined); };
          tx.onabort = tx.onerror = function () { db.close(); reject(tx.error || (req && req.error) || new Error('IndexedDB failed')); };
          req = fn(tx.objectStore(IDB_STORE));
        } catch (e) {
          db.close();
          reject(e);
        }
      };
    });
  }

  function useStoredKey(saved) {
    if (!saved || !saved.privateKey || !saved.publicKey) return null;
    var subtle = global.crypto.subtle;
    return subtle.exportKey('spki', saved.publicKey).then(function (spki) {
      return subtle.digest('SHA-256', spki).then(function (hash) {
        deviceKey = { privateKey: saved.privateKey, spki: bytesToB64(new Uint8Array(spki)), id: 'k_' + b64url(new Uint8Array(hash)) };
        return deviceKey;
      });
    });
  }

  /** This browser's device key if it has one (resolves with it, or null; never rejects). */
  function readDeviceKey() {
    if (deviceKey) return Promise.resolve(deviceKey);
    if (!hasCrypto()) return Promise.resolve(null);
    keyReadFailed = false;
    return idb('readonly', function (st) { return st.get(IDB_DEVICE); }).then(useStoredKey).catch(function (e) {
      console.warn('[Premium] device key', e);
      keyReadFailed = true;
      return null;
    });
  }

  /** This browser's device key, made on first use (resolves with it, or null when the browser cannot keep one). */
  function createDeviceKey() {
    return readDeviceKey().then(function (k) {
      if (k || !hasCrypto() || keyReadFailed) return k; // (IndexedDB does not work now: do not make a key it cannot keep)
      var subtle = global.crypto.subtle;
      return subtle.generateKey(
        { name: 'RSA-OAEP', modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256' },
        false, // the private key can never be exported, read or copied
        ['wrapKey', 'unwrapKey']
      ).then(function (pair) {
        // add, not put: if two tabs make a key at the same moment, the first one stored wins and both use it
        return idb('readwrite', function (st) { return st.add({ privateKey: pair.privateKey, publicKey: pair.publicKey }, IDB_DEVICE); })
          .catch(function () { /* a key is already stored */ });
      }).then(function () {
        // Use what was really stored (and so will still be there after a reload)
        return idb('readonly', function (st) { return st.get(IDB_DEVICE); });
      }).then(useStoredKey);
    }).catch(function (e) {
      console.warn('[Premium] device key', e);
      return null;
    });
  }

  /** The ids this browser answers to: its device key, and the random id of earlier versions. */
  function isMine(id) { return !!id && ((deviceKey && id === deviceKey.id) || id === legacyId()); }

  /** True when this browser keeps what the site saves (false in some private windows or with storage blocked). */
  function storageWorks() {
    var probe = 'tunn.probe.v1';
    var ok = !!U.lsSet(probe, 1) && U.lsGet(probe, 0) === 1;
    U.lsDel(probe);
    return ok;
  }

  /** A short label for the owner's sheet, e.g. "iPhone · Safari". */
  function deviceInfo() {
    var ua = navigator.userAgent || '';
    var os = /iPhone/.test(ua) ? 'iPhone' : /iPad/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1) ? 'iPad'
      : /Android/.test(ua) ? 'Android' : /CrOS/.test(ua) ? 'Chromebook' : /Mac OS X/.test(ua) ? 'Mac'
      : /Windows/.test(ua) ? 'Windows' : /Linux/.test(ua) ? 'Linux' : 'Device';
    var br = /Zalo/i.test(ua) ? 'Zalo' : /FBAN|FBAV|FB_IAB/.test(ua) ? 'Facebook' : /Instagram/.test(ua) ? 'Instagram'
      : /Edg\//.test(ua) ? 'Edge' : /OPR\/|Opera/.test(ua) ? 'Opera' : /SamsungBrowser/.test(ua) ? 'Samsung Internet'
      : /CriOS|Chrome\//.test(ua) ? 'Chrome' : /FxiOS|Firefox\//.test(ua) ? 'Firefox' : /Safari\//.test(ua) ? 'Safari' : 'Browser';
    return os + ' · ' + br;
  }

  /* ---------------- Saved license ---------------- */

  function load() {
    var s = U.lsGet(LS_KEY, null);
    if (!s || typeof s !== 'object' || typeof s.code !== 'string' || !s.keys || typeof s.keys !== 'object') return null;
    return s;
  }
  function save(s) { return U.lsSet(LS_KEY, s); }

  /** Why Premium stopped on this device (shown until a code is entered again). */
  function lost() {
    var l = U.lsGet(LS_LOST, null);
    return l && typeof l === 'object' && typeof l.reason === 'string' ? l : null;
  }

  function expired(s) { return !!(s && s.expires && Date.now() > Date.parse(s.expires)); }
  function trusted(s) {
    var t = +s.checkedAt || 0;
    // Wrapped keys only open with this browser's device key
    var mine = s.wrapped ? !!deviceKey && s.device === deviceKey.id : isMine(s.device);
    return t <= Date.now() + CLOCK_SKEW && mine;
  }
  /** The saved keys may be used: not expired, confirmed by the server for this device within the last week. */
  function usable(s) { return !!s && !expired(s) && trusted(s) && Date.now() - s.checkedAt < OFFLINE_GRACE; }

  /* ---------------- Decryption ---------------- */

  function b64ToBytes(b64) {
    var bin = atob(String(b64 || ''));
    var out = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }

  /** keyB64: the test's AES key, wrapped for the device key (wrapped) or plain (servers before device keys). */
  function decryptStub(stub, keyB64, wrapped) {
    var subtle = global.crypto.subtle;
    return Promise.resolve().then(function () {
      if (!wrapped) return subtle.importKey('raw', b64ToBytes(keyB64), { name: 'AES-GCM' }, false, ['decrypt']);
      if (!deviceKey) throw new Error('no device key');
      // The AES key goes straight into a non-extractable CryptoKey: its bytes never reach JavaScript
      return subtle.unwrapKey('raw', b64ToBytes(keyB64), deviceKey.privateKey, { name: 'RSA-OAEP' }, { name: 'AES-GCM' }, false, ['decrypt']);
    }).then(function (key) {
      return subtle.decrypt({ name: 'AES-GCM', iv: b64ToBytes(stub.iv) }, key, b64ToBytes(stub.data));
    }).then(function (plain) {
      return JSON.parse(new TextDecoder().decode(plain));
    });
  }

  /** Decrypts every locked premium test that has a key. Resolves with the number of tests unlocked (never rejects). */
  function applyKeys(keys, wrapped) {
    if (!hasCrypto()) return Promise.resolve(0);
    var L = Lib();
    var jobs = L.premiumStubs().filter(function (st) { return L.isLocked(st.id) && keys && keys[st.id]; }).map(function (st) {
      return decryptStub(st, keys[st.id], wrapped).then(function (def) {
        return L.unlockPremium(st.id, def) ? 1 : 0;
      }).catch(function (e) {
        console.warn('[Premium] Could not open ' + st.id, e);
        return 0;
      });
    });
    return Promise.all(jobs).then(function (n) { return n.reduce(function (a, b) { return a + b; }, 0); });
  }

  function lockedCount() { return Lib().premiumStubs().filter(function (st) { return Lib().isLocked(st.id); }).length; }

  /* ---------------- Server ---------------- */

  /** Never rejects: network trouble resolves with { ok: false, error: 'network' }. */
  function call(action, code) {
    var url = apiUrl();
    if (!url) return Promise.resolve({ ok: false, error: 'unavailable' });
    return createDeviceKey().then(function (k) {
      return k ? send(url, action, code) : { ok: false, error: 'storage' };
    });
  }

  function send(url, action, code) {
    var files = Lib().premiumStubs().map(function (st) { return { id: st.id, key: st.key }; });
    // The device the saved license of this code is bound to; otherwise the random id of earlier versions if
    // this browser has one: a code still bound to it moves to the device key (for a code bound to a key the
    // server goes by the key only)
    var saved = load();
    var claimed = saved && saved.code === code && isMine(saved.device) ? saved.device : (legacyId() || deviceKey.id);
    var body = JSON.stringify({ action: action, code: code, device: claimed, deviceKey: deviceKey.spki, info: deviceInfo(), files: files });
    var ctrl = typeof AbortController === 'function' ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, REQUEST_TIMEOUT);
    // text/plain keeps this a "simple" request (no CORS preflight), which Apps Script requires
    return Promise.resolve().then(function () {
      return fetch(url, { method: 'POST', body: body, headers: { 'Content-Type': 'text/plain;charset=utf-8' }, redirect: 'follow', signal: ctrl ? ctrl.signal : undefined });
    }).then(function (res) {
      return res.text().then(function (text) {
        try { return JSON.parse(text); } catch (e) { return { ok: false, error: 'server' }; }
      });
    }).catch(function () {
      return { ok: false, error: 'network' };
    }).then(function (r) {
      clearTimeout(timer);
      if (!r || typeof r !== 'object') return { ok: false, error: 'server' };
      r.sentDevice = claimed;
      return r;
    });
  }

  /** Stores a successful server answer and unlocks the tests it has keys for. */
  function accept(code, r) {
    var keys = {};
    Object.keys(r.keys || {}).forEach(function (id) {
      if (typeof r.keys[id] === 'string' && Lib().isPremium(id)) keys[id] = r.keys[id];
    });
    var prev = load();
    var missing = Lib().premiumStubs().some(function (st) { return !keys[st.id]; });
    // wrapped: the server wrapped the keys for this device key (servers before device keys send them plain)
    var wrapped = r.wrapped === true;
    save({
      code: code, device: wrapped ? deviceKey.id : r.sentDevice, wrapped: wrapped,
      expires: r.expires || null, keys: keys, checkedAt: Date.now(),
      checkAfter: Math.max(3600, Math.min(7 * 86400, +r.checkAfter || 86400)),
      missingCheckedAt: missing ? Date.now() : 0,
      activatedAt: prev && prev.code === code && prev.activatedAt ? prev.activatedAt : Date.now()
    });
    U.lsDel(LS_LOST);
    return applyKeys(keys, wrapped).then(function (n) {
      // A key that does not open its test (it was encrypted again meanwhile): ask again at most hourly
      var cur = load();
      if (cur && cur.code === code && !cur.missingCheckedAt && Lib().premiumStubs().some(function (st) { return Lib().isLocked(st.id); })) {
        cur.missingCheckedAt = Date.now();
        save(cur);
      }
      return n;
    });
  }

  /** Locks Premium again and remembers why, so the page can explain it. */
  function lockAll(reason, extra) {
    var s = load();
    U.lsDel(LS_KEY);
    if (reason) {
      U.lsSet(LS_LOST, {
        reason: reason, at: Date.now(), code: s ? masked(s.code) : '',
        expires: s && s.expires || null, retryAfter: extra && extra.retryAfter || null
      });
    }
    Lib().lockPremium();
  }

  function notify() { listeners.slice().forEach(function (fn) { try { fn(); } catch (e) { console.error(e); } }); }

  /** Re-checks the saved license. Resolves with { changed, error, retryAfter } (never rejects). */
  function refresh() {
    var s = load();
    if (!s) return Promise.resolve({ changed: false });
    if (refreshing) return refreshing;
    refreshing = call('refresh', s.code).then(function (r) {
      var cur = load();
      if (!cur || cur.code !== s.code) return { changed: false }; // a new code was entered meanwhile
      if (r.ok) {
        var before = lockedCount();
        return accept(s.code, r).then(function () { return { changed: lockedCount() !== before }; });
      }
      if (HARD_ERRORS.indexOf(r.error) !== -1) {
        lockAll(r.error, r);
        return { changed: true, error: r.error, retryAfter: r.retryAfter };
      }
      return { changed: false, error: r.error }; // offline or server trouble: keep the saved keys for now
    }).catch(function (e) {
      console.error(e);
      return { changed: false, error: 'server' };
    }).then(function (res) { refreshing = null; return res; });
    return refreshing;
  }

  /* ---------------- Messages ---------------- */

  function fmtDate(iso) {
    var d = new Date(iso);
    return isNaN(d) ? '' : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function contactHtml(plain) {
    var c = cfg().contact;
    if (!c) return '';
    var text = typeof c === 'string' ? c : c.text;
    var url = typeof c === 'object' ? c.url : '';
    if (!text) return '';
    if (plain) return U.esc(text);
    var safeUrl = url && /^(https?:|mailto:|tel:)/i.test(url) ? url : '';
    return safeUrl ? '<a href="' + U.esc(safeUrl) + '" target="_blank" rel="noopener">' + U.esc(text) + '</a>' : U.esc(text);
  }

  /** Message (HTML) for an error code; plain = no links (for toasts, which show text only). */
  function errorText(r, plain) {
    var contact = contactHtml(plain);
    var ask = contact ? ' Contact ' + contact + ' for help.' : '';
    switch (r.error) {
      case 'empty': return 'Enter your Premium code.';
      case 'length': return 'A code has 12 letters and numbers after TUNN-, in the form TUNN-XXXX-XXXX-XXXX.';
      case 'chars':
      case 'checksum': return 'This code doesn’t look right. Check each character and try again.';
      case 'notfound': return 'We couldn’t find this code. Check it and try again.';
      case 'revoked': return 'This code has been turned off.' + ask;
      case 'expired': return 'This code has expired.' + ask;
      case 'device':
        return 'This code is already active on 2 devices.' +
          (r.retryAfter ? ' After ' + U.esc(fmtDate(r.retryAfter)) + ', you can enter it here again to move it to this device; it will then stop working on the other one.' : ' Ask the site owner to reset it if you changed devices.') +
          ' If you opened tunn.sat inside another app (Zalo, Facebook, Messenger), open it in the browser you used before.' + ask;
      case 'rate': return 'Too many attempts. Wait 15 minutes, then try again.';
      case 'network': return 'Can’t reach the code service. Check your internet connection and try again.';
      case 'storage': return 'This browser is blocking what tunn.sat saves (for example in a private or incognito window), so it can’t keep your code. Open tunn.sat in a normal browser window, then enter your code.';
      case 'unavailable': return 'Premium codes aren’t available yet.' + ask;
      case 'nocrypto': return 'This browser can’t open Premium tests. Update it, or use Chrome, Safari, Edge or Firefox.';
      case 'update': return 'tunn.sat was updated. Reload the page, then try again.';
      default: return 'The code service has a problem right now. Please try again later.' + ask;
    }
  }

  /** Why Premium stopped here (HTML), from the saved "lost" record. */
  function lostText(l, plain) {
    var contact = contactHtml(plain);
    var ask = contact ? ' Contact ' + contact + ' for help.' : '';
    switch (l.reason) {
      case 'expired': return 'Your Premium code expired' + (l.expires ? ' on ' + U.esc(fmtDate(l.expires)) : '') + '. Enter a new code to continue.' + ask;
      case 'revoked': return 'Premium was turned off for your code.' + ask;
      case 'reset': return 'Premium has to be set up again in this browser: its saved site data was cleared, or copied from another browser. Enter your code again to continue.' + ask;
      case 'device':
        return 'Your code is now active on 2 devices, so Premium stopped here.' +
          (l.retryAfter ? ' After ' + U.esc(fmtDate(l.retryAfter)) + ', you can enter it here again to move it back.' : '') + ask;
      default: return 'Your Premium code is no longer valid.' + ask;
    }
  }

  /** Turns the (escaped) message HTML back into plain text for toasts. */
  function plainText(html) {
    var d = document.createElement('div');
    d.innerHTML = html;
    return d.textContent;
  }

  function unlockedToast(r) {
    var n = r.unlocked || 0;
    if (r.moved) return 'Premium moved to this device. It no longer works on your other device or browser.';
    if (!n) return 'Premium is active on this device.';
    return 'Premium unlocked: ' + n + ' test' + (n === 1 ? ' is' : 's are') + ' now open.';
  }

  /* ---------------- Unlock dialog ---------------- */

  function groups(s) { return s.replace(/(.{4})(?=.)/g, '$1-'); }

  /** The formatted text for the code field (symbols grouped by four). */
  function formatTyping(value) { return groups(symbols(value).slice(0, 24)); }

  /** Reformats the code field and keeps the caret next to the same code symbol. */
  function reformat(input, pasted) {
    var v = input.value;
    var syms = symbols(v).slice(0, 24);
    var next = groups(syms);
    if (next === v) return;
    var pos = input.selectionStart == null ? v.length : input.selectionStart;
    var atEnd = pos >= v.length;
    var alnumAll = (v.toUpperCase().match(/[A-Z0-9]/g) || []).length;
    var before = (v.slice(0, pos).toUpperCase().match(/[A-Z0-9]/g) || []).length;
    var lead = Math.max(0, alnumAll - syms.length); // characters dropped in front (a typed TUNN prefix)
    var k = Math.max(0, Math.min(syms.length, before - lead));
    input.value = next;
    var caret = pasted || atEnd ? next.length : k + (k > 0 ? Math.floor((k - 1) / 4) : 0);
    try { input.setSelectionRange(caret, caret); } catch (e) { /* not focused */ }
  }

  /** origin: the id of the test whose card or page opened the dialog (focus goes back there after unlocking). */
  function openUnlock(origin) {
    var saved = load();
    if (usable(saved) && apiUrl()) {
      // Premium is active here but some test is still locked (e.g. just published): ask the server again
      U.toast('Checking your Premium…', 'info', 2500);
      return refresh().then(function (r) {
        if (r.error) U.toast(plainText(HARD_ERRORS.indexOf(r.error) !== -1 ? lostText({ reason: r.error, retryAfter: r.retryAfter }, true) : errorText(r, true)), 'error', 7000);
        else U.toast(lockedCount() ? 'This test isn’t available yet. Please try again later.' : 'All Premium tests are open.', lockedCount() ? 'info' : 'success', 4500);
        notify();
      });
    }
    var body =
      '<p class="pm-lead">Premium opens ' + U.esc(premiumSummary()) + ' on this device.</p>' +
      '<label class="pm-field"><span class="field-label">Premium code</span>' +
      '<span class="pm-code"><span class="pm-prefix" aria-hidden="true">TUNN-</span>' +
      '<input id="pm-input" type="text" inputmode="text" autocomplete="off" autocorrect="off" autocapitalize="characters" spellcheck="false" maxlength="300" placeholder="XXXX-XXXX-XXXX" aria-describedby="pm-msg pm-note" autofocus></span></label>' +
      '<p class="pm-msg" id="pm-msg" role="status" aria-live="polite"></p>' +
      '<p class="pm-note" id="pm-note">One code works on one device. Enter it in the browser you will study in (not a private window).' +
      (contactHtml() ? ' Need a code? ' + contactHtml() + '.' : '') + '</p>';
    var busy = false;
    return U.modal({
      title: 'Unlock Premium',
      body: body,
      actions: [
        { label: 'Cancel', value: false, kind: 'ghost' },
        { label: 'Unlock', value: true, kind: 'primary', onClick: function (box) { submit(box); return false; } }
      ],
      onOpen: function (box, close) {
        box.__close = close;
        var input = box.querySelector('#pm-input');
        var pasted = false;
        input.addEventListener('paste', function () { pasted = true; });
        input.addEventListener('input', function () {
          reformat(input, pasted);
          pasted = false;
          setMsg(box, '', '');
        });
        input.addEventListener('keydown', function (e) {
          if (e.key === 'Enter') { e.preventDefault(); submit(box); return; }
          // Deleting next to a dash deletes the code symbol beyond it
          var p = input.selectionStart;
          if (p !== input.selectionEnd || busy) return;
          if (e.key === 'Backspace' && p > 0 && input.value.charAt(p - 1) === '-') input.setSelectionRange(p - 1, p - 1);
          else if (e.key === 'Delete' && input.value.charAt(p) === '-') input.setSelectionRange(p + 1, p + 1);
        });
      }
    });

    function setMsg(box, text, kind) {
      var m = box.querySelector('#pm-msg');
      m.innerHTML = text;
      m.className = 'pm-msg' + (kind ? ' is-' + kind : '');
    }

    function setBusy(box, on) {
      busy = on;
      var input = box.querySelector('#pm-input');
      box.querySelector('.modal-actions .btn--primary').disabled = on;
      input.readOnly = on; // readonly (not disabled) keeps the keyboard focus in the dialog
      input.setAttribute('aria-busy', on ? 'true' : 'false');
    }

    function submit(box) {
      if (busy) return;
      var input = box.querySelector('#pm-input');
      var n = normalize(input.value);
      if (!n.ok) { setMsg(box, errorText(n), 'error'); input.focus(); return; }
      input.value = n.code.slice(5);
      setBusy(box, true);
      setMsg(box, '<span class="pm-spin" aria-hidden="true"></span>Checking your code…', 'info');
      activate(n.code).then(function (r) {
        setBusy(box, false);
        if (!r.ok) { setMsg(box, errorText(r), 'error'); input.focus(); return; }
        box.__close(true);
        U.toast(unlockedToast(r), 'success', r.moved ? 8000 : 4500);
        // The page was redrawn: put the keyboard focus back where the student was (the card or page they
        // unlocked from), without scrolling the page somewhere else
        setTimeout(function () {
          var card = origin ? document.querySelector('#view .exam-card[data-id="' + String(origin).replace(/["\\]/g, '') + '"]') : null;
          var t = (card && card.querySelector('a.btn, button.btn')) || document.querySelector('#view [data-act="start"]') ||
            document.querySelector('#view [data-premium-focus]');
          if (!t) return;
          try { t.focus({ preventScroll: true }); } catch (e) { t.focus(); }
          var r = t.getBoundingClientRect();
          if (r.bottom < 0 || r.top > global.innerHeight) t.scrollIntoView({ block: 'center' });
        }, 80);
      }, function (e) {
        console.error(e);
        setBusy(box, false);
        setMsg(box, errorText({ error: 'server' }), 'error');
      });
    }
  }

  function openManage() {
    var s = load();
    if (!s) return openUnlock();
    var body =
      '<dl class="pm-facts">' +
      '<div><dt>Code</dt><dd class="mono">' + U.esc(masked(s.code)) + '</dd></div>' +
      '<div><dt>Valid until</dt><dd>' + (s.expires ? U.esc(fmtDate(s.expires)) : 'No end date') + '</dd></div>' +
      '<div><dt>This device</dt><dd>' + U.esc(deviceInfo()) + '</dd></div>' +
      '<div><dt>Last checked</dt><dd>' + U.esc(U.fmtDate ? U.fmtDate(s.checkedAt) : fmtDate(s.checkedAt)) + '</dd></div>' +
      '</dl>' +
      '<p class="pm-note">Your code works on this device only. To use it on a new phone or computer, enter it there: it then stops working here. A code can move to a new device about once a week.' +
      (contactHtml() ? ' Questions? ' + contactHtml() + '.' : '') + '</p>';
    return U.modal({
      title: 'Premium is active',
      body: body,
      actions: [
        { label: 'Check now', value: 'check', kind: 'ghost' },
        { label: 'Done', value: true, kind: 'primary' }
      ]
    }).then(function (v) {
      if (v !== 'check') return;
      return refresh().then(function (r) {
        if (r.error && HARD_ERRORS.indexOf(r.error) !== -1) U.toast(plainText(lostText({ reason: r.error, retryAfter: r.retryAfter }, true)), 'error', 8000);
        else if (r.error) U.toast(plainText(errorText(r, true)), 'error', 5000);
        else U.toast('Premium is active.', 'success');
        notify();
      });
    });
  }

  /* ---------------- Page parts ---------------- */

  /**
   * State of Premium on this device for the page:
   * active | stale (saved but not confirmed for a week) | lost (stopped, with a reason) | none.
   */
  function status() {
    var s = load();
    if (s && usable(s) && Lib().premiumStubs().some(function (st) { return !Lib().isLocked(st.id); })) return { kind: 'active', license: s };
    if (s && !expired(s)) return { kind: 'stale', license: s };
    var l = lost();
    if (l) return { kind: 'lost', lost: l };
    return { kind: 'none' };
  }

  /** What Premium opens, e.g. "16 Advanced Tests and 6 Practice Tests" (from the encrypted tests listed). */
  function premiumSummary() {
    var stubs = Lib().premiumStubs();
    var adv = stubs.filter(function (s) { return s.section === 'advanced'; }).length;
    var top = stubs.filter(function (s) { return s.section === 'topic'; }).length;
    var eli = stubs.filter(function (s) { return s.section === 'challenge'; }).length;
    var prac = stubs.length - adv - top - eli;
    var part = function (n, name) { return n + ' ' + name + (n === 1 ? '' : 's'); };
    var parts = [];
    if (adv) parts.push(part(adv, 'Advanced Test'));
    if (top) parts.push(part(top, 'Topic Test'));
    if (eli) parts.push(part(eli, 'Elite Test'));
    if (prac) parts.push(part(prac, 'Practice Test'));
    if (!parts.length) return 'the Premium tests';
    if (parts.length === 1) return parts[0];
    if (parts.length === 2) return parts[0] + ' and ' + parts[1];
    return parts.slice(0, -1).join(', ') + ' and ' + parts[parts.length - 1];
  }

  /** The Premium bar above the Advanced Tests (home page). */
  function barHtml(locked) {
    var st = status();
    if (st.kind === 'active') {
      return '<div class="premium-bar is-active" tabindex="-1" data-premium-focus>' + U.icon('check') +
        '<div><b>Premium is active</b><span>' + (st.license.expires ? 'Valid until ' + U.esc(fmtDate(st.license.expires)) : 'No end date') + '</span></div>' +
        '<button type="button" class="btn btn--sm btn--ghost" data-premium-manage>Details</button></div>';
    }
    if (!locked) return '';
    if (st.kind === 'stale' && apiUrl()) {
      return '<div class="premium-bar is-warn">' + U.icon('warn') +
        '<div><b>We need to check your Premium</b><span>Your code couldn’t be confirmed on this device for a while. Connect to the internet, then try again.</span></div>' +
        '<button type="button" class="btn btn--sm btn--primary" data-premium-retry>Try again</button></div>';
    }
    if (st.kind === 'lost') {
      return '<div class="premium-bar is-warn">' + U.icon('warn') +
        '<div><b>Premium stopped on this device</b><span>' + lostText(st.lost) + '</span></div>' +
        (apiUrl() ? '<button type="button" class="btn btn--sm btn--primary" data-premium-unlock>Enter code</button>' : '') + '</div>';
    }
    return '<div class="premium-bar">' + U.icon('lock') +
      '<div><b>Premium: ' + U.esc(premiumSummary()) + '</b><span>' + (apiUrl() ? 'Have a code? Enter it to open all of them on this device.' : 'Premium codes are coming soon.') + '</span></div>' +
      (apiUrl() ? '<button type="button" class="btn btn--sm btn--primary" data-premium-unlock>Enter code</button>' : '') + '</div>';
  }

  /** Message shown in place of a Premium test this device cannot open (test page, exam, results). */
  function lockedHtml(stub, opts) {
    opts = opts || {};
    var st = status();
    var text = U.esc(opts.text || ('Enter your Premium code to open ' + (stub && stub.title ? stub.title + ' and the other Premium tests (' : 'the Premium tests (') + premiumSummary() + ') on this device.'));
    if (st.kind === 'lost') text = lostText(st.lost) + ' ' + text;
    var action = !apiUrl() ? '<p class="muted">Premium codes are coming soon.</p>'
      : st.kind === 'stale' ? '<button type="button" class="btn btn--primary" data-premium-retry>' + U.icon('refresh') + 'Check my Premium</button>'
      : '<button type="button" class="btn btn--primary" data-premium-unlock>' + U.icon('lock') + 'Unlock with a code</button>';
    if (st.kind === 'stale') text = 'Your Premium code couldn’t be confirmed on this device for a while. Connect to the internet, then check it again.';
    return '<div class="paywall">' +
      '<div class="paywall-icon">' + U.icon('lock') + '</div>' +
      '<div class="paywall-text"><b>' + U.esc(opts.title || 'This test is part of Premium') + '</b><p>' + text + '</p></div>' +
      action + '</div>';
  }

  function retry() {
    U.toast('Checking your Premium…', 'info', 2500);
    return refresh().then(function (r) {
      if (r.error && HARD_ERRORS.indexOf(r.error) !== -1) U.toast(plainText(lostText({ reason: r.error, retryAfter: r.retryAfter }, true)), 'error', 8000);
      else if (r.error) U.toast(plainText(errorText(r, true)), 'error', 5000);
      else U.toast('Premium is active.', 'success');
      notify();
    });
  }

  // Any [data-premium-unlock] / [data-premium-manage] / [data-premium-retry] button opens the matching dialog
  document.addEventListener('click', function (e) {
    if (!e.target.closest) return;
    var u = e.target.closest('[data-premium-unlock]');
    if (u) {
      e.preventDefault();
      var card = u.closest('.exam-card');
      openUnlock(card ? card.getAttribute('data-id') : null);
      return;
    }
    var m = e.target.closest('[data-premium-manage]');
    if (m) { e.preventDefault(); openManage(); return; }
    var r = e.target.closest('[data-premium-retry]');
    if (r) { e.preventDefault(); retry(); }
  });

  // Another tab unlocked or locked Premium: follow it
  global.addEventListener('storage', function (e) {
    if (e.key !== LS_KEY && e.key !== null) return;
    var s = load();
    readDeviceKey().then(function () {
      if (s && usable(s)) applyKeys(s.keys, s.wrapped).then(function (n) { if (n) notify(); });
      else if (!s && Lib().premiumStubs().some(function (st) { return !Lib().isLocked(st.id); })) { Lib().lockPremium(); notify(); }
    });
  });

  /* ---------------- Public API ---------------- */

  /** Checks a code with the server and unlocks the tests. Resolves with { ok, error, retryAfter, unlocked, moved } (never rejects). */
  function activate(code) {
    var n = normalize(code);
    if (!n.ok) return Promise.resolve(n);
    if (!hasCrypto()) return Promise.resolve({ ok: false, error: 'nocrypto' });
    if (!apiUrl()) return Promise.resolve({ ok: false, error: 'unavailable' });
    // A browser that cannot keep its device key would bind the code to a device that no longer exists
    if (!storageWorks()) return Promise.resolve({ ok: false, error: 'storage' });
    return createDeviceKey().then(function (k) {
      if (!k) return { ok: false, error: 'storage' };
      return call('activate', n.code).then(function (r) {
        if (!r.ok) return { ok: false, error: r.error || 'server', message: r.message, retryAfter: r.retryAfter };
        return accept(n.code, r).then(function (unlocked) {
          if (!load()) return { ok: false, error: 'storage' };
          notify();
          return { ok: true, unlocked: unlocked, expires: r.expires || null, moved: !!r.moved };
        });
      });
    }).catch(function (e) {
      console.error(e);
      return { ok: false, error: 'server' };
    });
  }

  /**
   * Called once at start-up, after the test list has loaded: decrypts the tests with the saved keys and
   * re-checks the license in the background when it is due. It only waits for the server (briefly) when
   * the saved keys may not be used yet.
   */
  function boot() {
    var s = load();
    if (!s) return Promise.resolve();
    if (expired(s)) {
      lockAll('expired');
      return Promise.resolve();
    }
    // (the device key is made, if needed, by the next server check)
    return readDeviceKey().then(function () { return bootWith(s); });
  }

  function bootWith(s) {
    if (s.wrapped && !deviceKey && keyReadFailed) return Promise.resolve(); // try again on the next visit
    if (s.wrapped && (!deviceKey || s.device !== deviceKey.id)) {
      // The keys were wrapped for a device key this browser does not have (site data partly cleared, or
      // the saved data was copied here from another browser): they can never open anything here
      lockAll('reset');
      return Promise.resolve();
    }
    var ok = usable(s);
    var first = ok ? applyKeys(s.keys, s.wrapped) : Promise.resolve(0);
    return first.then(function () { return checkAfterBoot(s, ok); });
  }

  function checkAfterBoot(s, ok) {
    var due = !trusted(s) || Date.now() - s.checkedAt > (s.checkAfter || 86400) * 1000 ||
      (!s.wrapped && Date.now() - s.checkedAt > MISSING_RETRY); // plain keys: ask hourly to move to wrapped keys
    // A test still locked after applying the keys has no key, or a key that no longer opens it (the test was
    // encrypted again): ask the server (at most hourly)
    var missing = Lib().premiumStubs().some(function (st) { return Lib().isLocked(st.id); }) &&
      Date.now() - (+s.missingCheckedAt || 0) > MISSING_RETRY;
    if (ok && !due && !missing) return Promise.resolve();
    var check = refresh().then(function (r) {
      if (r.error && HARD_ERRORS.indexOf(r.error) !== -1) {
        // (the "device" text already says that Premium stopped here)
        U.toast((r.error === 'device' ? '' : 'Premium stopped on this device. ') + plainText(lostText({ reason: r.error, retryAfter: r.retryAfter }, true)), 'error', 9000);
      }
      if (r.changed) notify();
      return r;
    });
    if (ok) return Promise.resolve(); // the page shows now; it redraws if the check changes anything
    var wait = new Promise(function (resolve) { setTimeout(resolve, 4000); });
    return Promise.race([check, wait]).then(function () {});
  }

  global.Premium = {
    normalize: normalize,
    format: formatTyping,
    checkSymbol: checkSymbol,
    activate: activate,
    refresh: refresh,
    boot: boot,
    openUnlock: openUnlock,
    openManage: openManage,
    errorText: errorText,
    lockedHtml: lockedHtml,
    barHtml: barHtml,
    available: function () { return !!apiUrl(); },
    /** The owner's contact as HTML (a link when configured with a URL), or '' */
    contact: function () { return contactHtml(); },
    /** { active, saved, code, expires } for the UI */
    state: function () {
      var st = status();
      var s = load();
      return { active: st.kind === 'active', kind: st.kind, saved: !!s, code: s ? masked(s.code) : '', expires: s ? s.expires : null };
    },
    onChange: function (fn) {
      listeners.push(fn);
      return function () { listeners = listeners.filter(function (f) { return f !== fn; }); };
    },
    _deviceId: function () { return deviceKey ? deviceKey.id : legacyId(); }
  };
})(window);
