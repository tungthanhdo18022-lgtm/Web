/*
 * Storage layer.
 *  - Published tests (tests/ folder) are loaded through tests/manifest.js and SATLibrary.register(...)
 *  - Local drafts (owner only) live in IndexedDB, with localStorage as a fallback
 *  - Attempts and settings live in localStorage
 */
(function (global) {
  'use strict';

  var U = global.U, P = global.P;

  /* ---------------- IndexedDB (fallback: localStorage) ---------------- */
  var DB_NAME = 'sat-math-practice';
  var DB_STORE = 'tests';
  var LS_TESTS = 'satmath.userTests.v1';
  var LS_DRAFT = 'satmath.builderDraft.v1';
  var dbPromise = null;

  function openDb() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise(function (resolve) {
      if (!global.indexedDB) { resolve(null); return; }
      var req;
      try { req = global.indexedDB.open(DB_NAME, 1); }
      catch (e) { resolve(null); return; }
      var settled = false;
      var timer = setTimeout(function () { if (!settled) { settled = true; resolve(null); } }, 8000);
      req.onupgradeneeded = function () {
        var db = req.result;
        if (!db.objectStoreNames.contains(DB_STORE)) db.createObjectStore(DB_STORE, { keyPath: 'id' });
      };
      req.onsuccess = function () {
        if (settled) { try { req.result.close(); } catch (e) { /* ignore */ } return; }
        settled = true; clearTimeout(timer); resolve(req.result);
      };
      req.onerror = function () { if (settled) return; settled = true; clearTimeout(timer); resolve(null); };
      req.onblocked = function () { if (settled) return; settled = true; clearTimeout(timer); resolve(null); };
    });
    return dbPromise;
  }

  function idbAll(db) {
    return new Promise(function (resolve, reject) {
      var tx = db.transaction(DB_STORE, 'readonly');
      var req = tx.objectStore(DB_STORE).getAll();
      req.onsuccess = function () { resolve(req.result || []); };
      req.onerror = function () { reject(req.error); };
    });
  }
  function idbPut(db, value) {
    return new Promise(function (resolve, reject) {
      var tx = db.transaction(DB_STORE, 'readwrite');
      tx.objectStore(DB_STORE).put(value);
      tx.oncomplete = function () { resolve(); };
      tx.onerror = function () { reject(tx.error); };
      tx.onabort = function () { reject(tx.error || new Error('Save failed')); };
    });
  }
  function idbDelete(db, key) {
    return new Promise(function (resolve, reject) {
      var tx = db.transaction(DB_STORE, 'readwrite');
      tx.objectStore(DB_STORE).delete(key);
      tx.oncomplete = function () { resolve(); };
      tx.onerror = function () { reject(tx.error); };
    });
  }

  /* ---------------- Test library ---------------- */
  var builtin = new Map();
  var user = new Map();
  var loadErrors = [];
  var manifest = [];
  var currentEntry = null;

  var MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
  var MONTHS_SHORT = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

  function safeId(id) {
    return String(id || '').replace(/[^a-zA-Z0-9_-]/g, '-').replace(/-{2,}/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);
  }

  /** Reads "2026-09", "2026-09-12", "September 2026", "Sep 12, 2026"… → { year, month } */
  function parseDate(text) {
    var s = String(text || '').toLowerCase();
    var m = /(\d{4})[-/.](\d{1,2})(?:[-/.](\d{1,2}))?/.exec(s);
    if (m && +m[2] >= 1 && +m[2] <= 12) return { year: +m[1], month: +m[2], day: m[3] ? +m[3] : 0 };
    var re = /\b(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sept?|oct|nov|dec)\.?\s+(?:(\d{1,2}),?\s+)?(\d{4})\b/;
    m = re.exec(s);
    if (m) {
      var name = m[1].slice(0, 3);
      var month = MONTHS_SHORT.indexOf(name) + 1;
      return { year: +m[3], month: month, day: m[2] ? +m[2] : 0 };
    }
    m = /\b(20\d{2})\b/.exec(s);
    if (m) return { year: +m[1], month: 0, day: 0 };
    return null;
  }

  function seasonOf(month) {
    if (!month) return '';
    if (month >= 3 && month <= 5) return 'spring';
    if (month >= 6 && month <= 8) return 'summer';
    if (month >= 9 && month <= 11) return 'fall';
    return 'winter';
  }

  /** Short, stable fingerprint of the question content (used to detect edited tests). */
  function fingerprint(test) {
    var s = test.modules.map(function (m) {
      return m.questions.map(function (q) {
        return q.type + '|' + q.prompt + '|' + (q.choices || []).join('||') + '|' + JSON.stringify(q.answer);
      }).join('\n#\n');
    }).join('\n##\n');
    var h1 = 0x811c9dc5, h2 = 0x1b873593;
    for (var i = 0; i < s.length; i++) {
      var c = s.charCodeAt(i);
      h1 = Math.imul(h1 ^ c, 16777619);
      h2 = Math.imul(h2 ^ c, 2246822519);
    }
    return (h1 >>> 0).toString(36) + (h2 >>> 0).toString(36);
  }

  function prepare(test, opts) {
    if (!test.id) test.id = U.slug(test.title) + '-' + Math.random().toString(36).slice(2, 6);
    test.id = safeId(test.id) || ('test-' + Math.random().toString(36).slice(2, 8));
    test.builtin = !!opts.builtin;
    // Drop empty modules defensively (an empty module would break the exam)
    test.modules = test.modules.filter(function (m) { return m.questions && m.questions.length; });
    test.questionCount = test.modules.reduce(function (n, m) { return n + m.questions.length; }, 0);
    test.mcqCount = 0; test.sprCount = 0;
    test.modules.forEach(function (m) {
      m.questions.forEach(function (q) { if (q.type === 'mcq') test.mcqCount++; else test.sprCount++; });
      if (m.time == null || !isFinite(m.time) || m.time <= 0) {
        m.autoTime = true;
        m.time = Math.max(5, Math.round(m.questions.length * (global.APP_CONFIG.defaultMinutesPerQuestion || 1.6)));
      }
    });
    test.totalTime = test.modules.reduce(function (n, m) { return n + (m.time || 0); }, 0);
    var d = parseDate(test.date) || parseDate(test.title);
    test.year = d ? d.year : 0;
    test.month = d ? d.month : 0;
    test.season = d ? seasonOf(d.month) : '';
    test.sortKey = d ? d.year * 10000 + d.month * 100 + (d.day || 0) : 0;
    test.fingerprint = fingerprint(test);
    return test;
  }

  function normalizeEntry(e) {
    if (!e) return null;
    if (typeof e === 'string') return { file: e, v: '' };
    if (typeof e === 'object' && e.file) return { file: String(e.file), v: e.v != null ? String(e.v) : '' };
    return null;
  }

  var Library = {
    /** Called by the files in tests/ */
    register: function (def) {
      try {
        var res = typeof def === 'string' ? P.parseText(def) : P.normalizeObject(def);
        if (!res.test || res.errors.length) {
          var title = (res.test && res.test.title) || (def && def.title) || (def && def.id) || (currentEntry && currentEntry.file) || 'untitled';
          loadErrors.push({ title: title, errors: res.errors });
          console.error('[SATLibrary] Test "' + title + '" has errors:', res.errors);
          return;
        }
        if (res.warnings.length) console.info('[SATLibrary] Notes for "' + res.test.title + '":', res.warnings);
        var t = prepare(res.test, { builtin: true });
        if (currentEntry) { t.file = currentEntry.file; t.fileVersion = currentEntry.v; }
        builtin.set(t.id, t);
      } catch (e) {
        loadErrors.push({ title: (def && def.title) || (currentEntry && currentEntry.file) || '?', errors: [{ msg: String(e && e.message || e) }] });
        console.error(e);
      }
    },

    /** tests/manifest.js calls this with the list of published files */
    manifest: function (entries) {
      manifest = (entries || []).map(normalizeEntry).filter(Boolean);
    },

    manifestEntries: function () { return manifest.map(function (e) { return { file: e.file, v: e.v }; }); },

    /** Registers a just-published test in memory (the live site updates after GitHub Pages redeploys). */
    registerLocal: function (def, entry) {
      var prev = currentEntry;
      var e = normalizeEntry(entry);
      currentEntry = e;
      try { Library.register(def); } finally { currentEntry = prev; }
      if (e) manifest = manifest.filter(function (x) { return x.file !== e.file; }).concat([e]);
    },

    /** Removes an unpublished test from memory. */
    unregisterLocal: function (file) {
      builtin.forEach(function (t, id) { if (t.file === file) builtin.delete(id); });
      manifest = manifest.filter(function (x) { return x.file !== file; });
    },

    loadBuiltins: function () {
      var base = 'tests/';
      var bust = Date.now().toString(36);
      return U.loadScript(base + 'manifest.js?t=' + bust, 15000).catch(function (e) {
        loadErrors.push({ title: 'tests/manifest.js', errors: [{ msg: 'Could not load the test list (' + e.message + ')' }] });
      }).then(function () {
        var chain = Promise.resolve();
        manifest.forEach(function (entry) {
          chain = chain.then(function () {
            currentEntry = entry;
            var v = entry.v || global.APP_VERSION || '1';
            return U.loadScript(base + entry.file + '?v=' + encodeURIComponent(v), 15000).catch(function (e) {
              loadErrors.push({ title: entry.file, errors: [{ msg: 'Could not load tests/' + entry.file + ' (' + e.message + ')' }] });
            }).then(function () { currentEntry = null; });
          });
        });
        return chain;
      });
    },

    loadUser: function () {
      return openDb().then(function (db) {
        var fromLs = U.lsGet(LS_TESTS, []) || [];
        if (!db) return { list: fromLs, db: null };
        return idbAll(db).catch(function () { return []; }).then(function (fromDb) {
          // Merge: IndexedDB wins; move fallback records into IndexedDB
          var have = {};
          fromDb.forEach(function (r) { have[r.id] = true; });
          var moved = fromLs.filter(function (r) { return r && r.id && !have[r.id]; });
          var chain = Promise.resolve();
          moved.forEach(function (r) { chain = chain.then(function () { return idbPut(db, r).catch(function () { /* keep in LS */ }); }); });
          return chain.then(function () {
            if (fromLs.length) U.lsDel(LS_TESTS);
            return { list: fromDb.concat(moved), db: db };
          });
        });
      }).then(function (res) {
        user.clear();
        (res.list || []).forEach(function (raw) {
          try {
            var r = P.normalizeObject(raw);
            if (r.test) {
              var t = prepare(r.test, { builtin: false });
              t._key = raw.id;
              t.createdAt = raw.createdAt; t.updatedAt = raw.updatedAt;
              t.publishedFile = raw.publishedFile || '';
              t.hasErrors = r.errors.length > 0;
              user.set(t.id, t);
            }
          } catch (e) { console.error(e); }
        });
      });
    },

    errors: function () { return loadErrors.slice(); },

    reportError: function (title, msg) { loadErrors.push({ title: title, errors: [{ msg: msg }] }); },

    /** Published tests, newest first */
    published: function () {
      return Array.from(builtin.values()).sort(function (a, b) {
        return (b.sortKey - a.sortKey) || String(a.title).localeCompare(String(b.title));
      });
    },

    /** Local drafts (owner only) */
    drafts: function () {
      return Array.from(user.values()).sort(function (x, y) { return (y.updatedAt || 0) - (x.updatedAt || 0); });
    },

    all: function () { return Library.published().concat(Library.drafts()); },

    get: function (id) { return user.get(id) || builtin.get(id) || null; },

    getPublished: function (id) { return builtin.get(id) || null; },

    isBuiltin: function (id) { return builtin.has(id) && !user.has(id); },

    /** Save (create or update) a local draft. */
    save: function (test) {
      var now = Date.now();
      var record = {
        id: safeId(test.id),
        title: test.title, author: test.author, description: test.description, date: test.date || '',
        source: test.source || '',
        assets: test.assets || {},
        publishedFile: test.publishedFile || '',
        modules: test.modules.map(function (m) {
          return {
            title: m.title, time: m.autoTime ? null : m.time,
            questions: m.questions.map(function (q) {
              var o = { type: q.type, prompt: q.prompt, answer: q.answer };
              if (q.type === 'mcq') o.choices = q.choices;
              if (q.explanation) o.explanation = q.explanation;
              if (q.domain) o.domain = q.domain;
              if (q.label) o.label = q.label;
              return o;
            })
          };
        }),
        createdAt: test.createdAt || now,
        updatedAt: now
      };
      if (!record.id) record.id = U.slug(record.title) + '-' + Math.random().toString(36).slice(2, 6);
      var oldKey = test._key && test._key !== record.id ? test._key : null;
      return openDb().then(function (db) {
        if (db) {
          return idbPut(db, record).then(function () { if (oldKey) return idbDelete(db, oldKey).catch(function () { /* ignore */ }); });
        }
        var list = (U.lsGet(LS_TESTS, []) || []).filter(function (x) { return x.id !== record.id && x.id !== oldKey; });
        list.push(record);
        if (!U.lsSet(LS_TESTS, list)) throw new Error('Browser storage is full. Delete some drafts or use smaller images.');
      }).then(function () {
        var res = P.normalizeObject(record);
        var t = prepare(res.test, { builtin: false });
        t._key = record.id;
        t.createdAt = record.createdAt; t.updatedAt = record.updatedAt;
        t.publishedFile = record.publishedFile;
        if (oldKey) user.delete(oldKey);
        user.set(t.id, t);
        return t;
      });
    },

    remove: function (id) {
      var t = user.get(id);
      var key = (t && t._key) || id;
      return openDb().then(function (db) {
        if (db) return idbDelete(db, key);
        U.lsSet(LS_TESTS, (U.lsGet(LS_TESTS, []) || []).filter(function (x) { return x.id !== key && x.id !== id; }));
      }).then(function () { user.delete(id); });
    },

    /** Export a test as JSON (backup / sharing) */
    exportJson: function (test) {
      var o = {
        id: test.id, title: test.title, author: test.author,
        date: test.date || undefined,
        description: test.description || undefined,
        modules: test.modules.map(function (m) {
          return {
            title: m.title, time: m.time,
            questions: m.questions.map(function (q) {
              var x = { type: q.type, prompt: q.prompt };
              if (q.type === 'mcq') x.choices = q.choices;
              x.answer = q.answer;
              if (q.domain) x.domain = q.domain;
              if (q.explanation) x.explanation = q.explanation;
              return x;
            })
          };
        })
      };
      if (test.assets && Object.keys(test.assets).length) o.assets = test.assets;
      if (test.source) o.source = test.source;
      return JSON.stringify(o, null, 2);
    },

    safeId: safeId,
    parseDate: parseDate,
    seasonOf: seasonOf,
    fingerprint: fingerprint
  };

  /* ---------------- Attempts ---------------- */
  var LS_ATTEMPTS = 'satmath.attempts.v1';
  var LS_SETTINGS = 'satmath.settings.v1';
  var attemptsCache = null;
  // Keep tabs in sync
  window.addEventListener('storage', function (e) { if (e.key === LS_ATTEMPTS || e.key === null) attemptsCache = null; });

  function readStored() {
    var raw = U.lsGet(LS_ATTEMPTS, {});
    return raw && typeof raw === 'object' && !Array.isArray(raw) ? raw : {};
  }
  function loadAttempts() {
    if (!attemptsCache) attemptsCache = readStored();
    return attemptsCache;
  }
  function persistAttempts() {
    var ok = U.lsSet(LS_ATTEMPTS, attemptsCache || {});
    if (!ok) {
      // Free space without touching results: drop images from the builder draft first
      var draft = U.lsGet(LS_DRAFT, null);
      if (draft && draft.assets && Object.keys(draft.assets).length) {
        draft.assets = {};
        U.lsSet(LS_DRAFT, draft);
        ok = U.lsSet(LS_ATTEMPTS, attemptsCache || {});
      }
    }
    return ok;
  }

  var Attempts = {
    all: function () {
      return Object.values(loadAttempts()).sort(function (a, b) { return (b.updatedAt || 0) - (a.updatedAt || 0); });
    },
    get: function (id) { return loadAttempts()[id] || null; },
    /** Fresh copy straight from storage (ignores this tab's cache). */
    getStored: function (id) { return readStored()[id] || null; },
    /**
     * Saves an attempt. Returns false when storage is full.
     * Refuses (returns 'stale') to overwrite an attempt that another tab already submitted.
     */
    save: function (a) {
      var stored = readStored()[a.id];
      if (stored && stored.status === 'completed' && a.status !== 'completed') {
        attemptsCache = null;
        return 'stale';
      }
      a.updatedAt = Date.now();
      attemptsCache = readStored();
      attemptsCache[a.id] = a;
      return persistAttempts();
    },
    remove: function (id) {
      attemptsCache = readStored();
      delete attemptsCache[id];
      persistAttempts();
    },
    forTest: function (testId) {
      return Attempts.all().filter(function (a) { return a.testId === testId; });
    },
    inProgress: function (testId) {
      return Attempts.forTest(testId).filter(function (a) { return a.status === 'in-progress'; })[0] || null;
    },
    completed: function () {
      return Attempts.all().filter(function (a) { return a.status === 'completed' && a.result; })
        .sort(function (a, b) { return (b.finishedAt || 0) - (a.finishedAt || 0); });
    },
    best: function (testId) {
      var done = Attempts.forTest(testId).filter(function (a) { return a.status === 'completed' && a.result; });
      if (!done.length) return null;
      return done.reduce(function (b, a) { return a.result.correct > b.result.correct ? a : b; });
    },
    create: function (test, opts) {
      var a = {
        id: U.uid('a'),
        testId: test.id,
        testTitle: test.title,
        fingerprint: test.fingerprint,
        name: opts.name || '',
        timed: opts.timed !== false,
        status: 'in-progress',
        createdAt: Date.now(),
        moduleIndex: 0,
        modules: test.modules.map(function () { return { elapsed: 0, current: 0, review: false, done: false }; }),
        answers: {},
        marked: {},
        eliminated: {},
        totalQuestions: test.questionCount
      };
      Attempts.save(a);
      return a;
    }
  };

  var Settings = {
    get: function () { return U.lsGet(LS_SETTINGS, {}) || {}; },
    set: function (patch) {
      var s = Settings.get();
      Object.keys(patch).forEach(function (k) { s[k] = patch[k]; });
      U.lsSet(LS_SETTINGS, s);
      return s;
    }
  };

  global.SATLibrary = Library;
  global.Attempts = Attempts;
  global.Settings = Settings;
})(window);
