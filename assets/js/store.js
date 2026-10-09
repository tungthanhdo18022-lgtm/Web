/*
 * Lưu trữ:
 *  - Đề có sẵn (thư mục tests/) được nạp qua SATLibrary.register(...)
 *  - Đề do người dùng tải lên / tự tạo: lưu trong IndexedDB của trình duyệt
 *  - Lượt làm bài: lưu trong localStorage
 */
(function (global) {
  'use strict';

  var U = global.U, P = global.P;

  /* ---------------- IndexedDB (dự phòng: localStorage) ---------------- */
  var DB_NAME = 'sat-math-practice';
  var DB_STORE = 'tests';
  var LS_TESTS = 'satmath.userTests.v1';
  var dbPromise = null;

  function openDb() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise(function (resolve) {
      if (!global.indexedDB) { resolve(null); return; }
      var req;
      try { req = global.indexedDB.open(DB_NAME, 1); }
      catch (e) { resolve(null); return; }
      var settled = false;
      var timer = setTimeout(function () { if (!settled) { settled = true; resolve(null); } }, 4000);
      req.onupgradeneeded = function () {
        var db = req.result;
        if (!db.objectStoreNames.contains(DB_STORE)) db.createObjectStore(DB_STORE, { keyPath: 'id' });
      };
      req.onsuccess = function () { if (settled) return; settled = true; clearTimeout(timer); resolve(req.result); };
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
      tx.onabort = function () { reject(tx.error || new Error('Lưu thất bại')); };
    });
  }
  function idbDelete(db, id) {
    return new Promise(function (resolve, reject) {
      var tx = db.transaction(DB_STORE, 'readwrite');
      tx.objectStore(DB_STORE).delete(id);
      tx.oncomplete = function () { resolve(); };
      tx.onerror = function () { reject(tx.error); };
    });
  }

  /* ---------------- Thư viện đề ---------------- */
  var builtin = new Map();
  var user = new Map();
  var loadErrors = [];
  var manifest = [];

  function prepare(test, opts) {
    // Đảm bảo id duy nhất & hợp lệ
    if (!test.id) test.id = U.slug(test.title) + '-' + Math.random().toString(36).slice(2, 6);
    test.id = String(test.id).replace(/[^a-zA-Z0-9_-]/g, '-');
    test.builtin = !!opts.builtin;
    test.questionCount = test.modules.reduce(function (n, m) { return n + m.questions.length; }, 0);
    test.modules.forEach(function (m) {
      if (m.time == null || !isFinite(m.time)) {
        m.time = Math.max(5, Math.round(m.questions.length * (global.APP_CONFIG.defaultMinutesPerQuestion || 1.6)));
      }
    });
    test.totalTime = test.modules.reduce(function (n, m) { return n + (m.time || 0); }, 0);
    return test;
  }

  var Library = {
    /** Gọi từ các file trong thư mục tests/ */
    register: function (def) {
      try {
        var res = typeof def === 'string' ? P.parseText(def) : P.normalizeObject(def);
        if (!res.test || res.errors.length) {
          var title = (res.test && res.test.title) || (def && def.title) || (def && def.id) || 'không tên';
          loadErrors.push({ title: title, errors: res.errors });
          console.error('[SATLibrary] Đề "' + title + '" có lỗi:', res.errors);
          return;
        }
        if (res.warnings.length) console.info('[SATLibrary] Ghi chú cho đề "' + res.test.title + '":', res.warnings);
        var t = prepare(res.test, { builtin: true });
        builtin.set(t.id, t);
      } catch (e) {
        loadErrors.push({ title: (def && def.title) || '?', errors: [{ msg: String(e && e.message || e) }] });
        console.error(e);
      }
    },

    /** tests/manifest.js gọi hàm này với danh sách file đề */
    manifest: function (files) {
      manifest = (files || []).slice();
    },

    loadBuiltins: function () {
      var base = 'tests/';
      var chain = Promise.resolve();
      manifest.forEach(function (file) {
        chain = chain.then(function () {
          return U.loadScript(base + file + '?v=' + (global.APP_VERSION || '1'), 15000).catch(function (e) {
            loadErrors.push({ title: file, errors: [{ msg: 'Không tải được file tests/' + file + ' (' + e.message + ')' }] });
          });
        });
      });
      return chain;
    },

    loadUser: function () {
      return openDb().then(function (db) {
        if (db) return idbAll(db).catch(function () { return []; });
        return U.lsGet(LS_TESTS, []);
      }).then(function (list) {
        user.clear();
        (list || []).forEach(function (raw) {
          try {
            var res = P.normalizeObject(raw);
            if (res.test) {
              var t = prepare(res.test, { builtin: false });
              t.createdAt = raw.createdAt; t.updatedAt = raw.updatedAt;
              t.hasErrors = res.errors.length > 0;
              user.set(t.id, t);
            }
          } catch (e) { console.error(e); }
        });
      });
    },

    errors: function () { return loadErrors.slice(); },

    reportError: function (title, msg) { loadErrors.push({ title: title, errors: [{ msg: msg }] }); },

    all: function () {
      var a = Array.from(builtin.values());
      var b = Array.from(user.values()).sort(function (x, y) { return (y.updatedAt || 0) - (x.updatedAt || 0); });
      return a.concat(b);
    },

    get: function (id) { return user.get(id) || builtin.get(id) || null; },

    isBuiltin: function (id) { return builtin.has(id) && !user.has(id); },

    /** Lưu đề của người dùng (tạo mới hoặc cập nhật). */
    save: function (test) {
      var now = Date.now();
      var record = {
        id: test.id,
        title: test.title, author: test.author, description: test.description,
        source: test.source || '',
        assets: test.assets || {},
        modules: test.modules.map(function (m) {
          return {
            title: m.title, time: m.time,
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
      if (!record.id || builtin.has(record.id) && !user.has(record.id)) {
        record.id = U.slug(record.title) + '-' + Math.random().toString(36).slice(2, 6);
      }
      return openDb().then(function (db) {
        if (db) return idbPut(db, record);
        var list = U.lsGet(LS_TESTS, []).filter(function (x) { return x.id !== record.id; });
        list.push(record);
        if (!U.lsSet(LS_TESTS, list)) throw new Error('Bộ nhớ trình duyệt đã đầy. Hãy xóa bớt đề hoặc dùng ảnh nhỏ hơn.');
      }).then(function () {
        var res = P.normalizeObject(record);
        var t = prepare(res.test, { builtin: false });
        t.createdAt = record.createdAt; t.updatedAt = record.updatedAt;
        user.set(t.id, t);
        return t;
      });
    },

    remove: function (id) {
      return openDb().then(function (db) {
        if (db) return idbDelete(db, id);
        U.lsSet(LS_TESTS, U.lsGet(LS_TESTS, []).filter(function (x) { return x.id !== id; }));
      }).then(function () { user.delete(id); });
    },

    /** Xuất đề thành JSON (để chia sẻ / sao lưu) */
    exportJson: function (test) {
      var o = {
        id: test.id, title: test.title, author: test.author, description: test.description || undefined,
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
    }
  };

  /* ---------------- Lượt làm bài ---------------- */
  var LS_ATTEMPTS = 'satmath.attempts.v1';
  var LS_SETTINGS = 'satmath.settings.v1';
  var attemptsCache = null;
  // Đồng bộ khi mở nhiều tab cùng lúc
  window.addEventListener('storage', function (e) { if (e.key === LS_ATTEMPTS || e.key === null) attemptsCache = null; });

  function loadAttempts() {
    if (!attemptsCache) {
      var raw = U.lsGet(LS_ATTEMPTS, {});
      attemptsCache = raw && typeof raw === 'object' && !Array.isArray(raw) ? raw : {};
    }
    return attemptsCache;
  }
  function persistAttempts() {
    var ok = U.lsSet(LS_ATTEMPTS, attemptsCache || {});
    if (!ok) {
      // Thử dọn bớt các bài cũ đã hoàn thành
      var list = Object.values(attemptsCache || {}).filter(function (a) { return a.status === 'completed'; })
        .sort(function (a, b) { return (a.finishedAt || 0) - (b.finishedAt || 0); });
      while (!ok && list.length > 5) {
        delete attemptsCache[list.shift().id];
        ok = U.lsSet(LS_ATTEMPTS, attemptsCache);
      }
    }
    return ok;
  }

  var Attempts = {
    all: function () {
      return Object.values(loadAttempts()).sort(function (a, b) { return (b.updatedAt || 0) - (a.updatedAt || 0); });
    },
    get: function (id) { return loadAttempts()[id] || null; },
    save: function (a) {
      a.updatedAt = Date.now();
      loadAttempts()[a.id] = a;
      return persistAttempts();
    },
    remove: function (id) {
      delete loadAttempts()[id];
      persistAttempts();
    },
    forTest: function (testId) {
      return Attempts.all().filter(function (a) { return a.testId === testId; });
    },
    inProgress: function (testId) {
      return Attempts.forTest(testId).filter(function (a) { return a.status === 'in-progress'; })[0] || null;
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
