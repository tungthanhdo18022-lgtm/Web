/*
 * Owner-only admin: signs in with a GitHub token that can write to this site's repository,
 * then publishes tests by committing files to tests/ through the GitHub REST API.
 *
 * Security model: this is a static site, so the admin pages are only hidden from visitors.
 * The real protection is GitHub itself — publishing requires a token with write access to
 * the repository, and only the owner (or collaborators) can create one.
 */
(function (global) {
  'use strict';

  var U = global.U;
  var KEY = 'satmath.admin.v1';
  var API = 'https://api.github.com';

  function cfg() {
    var g = (global.APP_CONFIG && global.APP_CONFIG.github) || {};
    return { owner: g.owner, repo: g.repo, branch: g.branch || 'main' };
  }

  function session() {
    var s = U.lsGet(KEY, null);
    return s && s.token && s.login ? s : null;
  }

  /* ---------------- Base64 helpers (UTF-8 safe) ---------------- */
  function utf8ToB64(str) {
    var bytes = new TextEncoder().encode(String(str));
    var bin = '';
    for (var i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    return btoa(bin);
  }
  function b64ToUtf8(b64) {
    var bin = atob(String(b64 || '').replace(/\s+/g, ''));
    var bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  }

  /* ---------------- GitHub REST ---------------- */
  function request(method, path, body, token) {
    var tk = token || (session() && session().token);
    if (!tk) return Promise.reject(new Error('Not signed in.'));
    var opts = {
      method: method,
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': 'Bearer ' + tk,
        'X-GitHub-Api-Version': '2022-11-28'
      },
      cache: 'no-store'
    };
    if (body !== undefined) {
      opts.headers['Content-Type'] = 'application/json';
      opts.body = JSON.stringify(body);
    }
    return fetch(API + path, opts).then(function (res) {
      return res.text().then(function (text) {
        var data = null;
        try { data = text ? JSON.parse(text) : null; } catch (e) { data = null; }
        if (!res.ok) {
          var msg = (data && data.message) || ('HTTP ' + res.status);
          if (res.status === 401) msg = 'GitHub rejected the token (it may be expired or revoked). Sign in again.';
          else if (res.status === 403 && /permission|not accessible/i.test(msg)) msg = 'The token does not have permission for this action. It needs "Contents: Read and write" on ' + cfg().owner + '/' + cfg().repo + '.';
          else if (res.status === 404 && !token) msg = 'Not found on GitHub (' + path + '). Check the repository settings in config.js and the token\'s repository access.';
          var err = new Error(msg);
          err.status = res.status;
          throw err;
        }
        return data;
      });
    }, function () {
      throw new Error('Could not reach GitHub. Check your internet connection.');
    });
  }

  function repoPath(p) {
    var c = cfg();
    return '/repos/' + encodeURIComponent(c.owner) + '/' + encodeURIComponent(c.repo) + p;
  }

  function contentsPath(filePath) {
    return repoPath('/contents/' + filePath.split('/').map(encodeURIComponent).join('/'));
  }

  /** Returns { sha, text } or null when the file does not exist. */
  function getFile(filePath) {
    return request('GET', contentsPath(filePath) + '?ref=' + encodeURIComponent(cfg().branch) + '&t=' + Date.now())
      .then(function (d) {
        if (!d || Array.isArray(d)) return null;
        var text = '';
        try { text = d.content ? b64ToUtf8(d.content) : ''; } catch (e) { text = ''; }
        return { sha: d.sha, text: text, size: d.size };
      }, function (e) { if (e.status === 404) return null; throw e; });
  }

  function putFile(filePath, b64, message, sha) {
    var body = { message: message, content: b64, branch: cfg().branch };
    if (sha) body.sha = sha;
    return request('PUT', contentsPath(filePath), body);
  }

  /** PUT with one automatic retry when the file changed in between (409/422 sha mismatch). */
  function putFileSafe(filePath, b64, message) {
    return getFile(filePath).then(function (cur) {
      return putFile(filePath, b64, message, cur && cur.sha).catch(function (e) {
        if (e.status !== 409 && e.status !== 422) throw e;
        return getFile(filePath).then(function (cur2) { return putFile(filePath, b64, message, cur2 && cur2.sha); });
      });
    });
  }

  /** DELETE with one automatic retry when the file changed in between (409/422 sha mismatch). */
  function deleteFile(filePath, message) {
    function once() {
      return getFile(filePath).then(function (cur) {
        if (!cur) return null;
        return request('DELETE', contentsPath(filePath), { message: message, sha: cur.sha, branch: cfg().branch });
      });
    }
    return once().catch(function (e) {
      if (e.status !== 409 && e.status !== 422) throw e;
      return once();
    });
  }

  /* ---------------- Manifest ---------------- */
  var MANIFEST = 'tests/manifest.js';

  function parseManifest(text) {
    var entries = [];
    var m = /SATLibrary\.manifest\s*\(\s*\[([\s\S]*?)\]\s*\)/.exec(text || '');
    if (!m) return entries;
    var re = /\{\s*file\s*:\s*(['"])([^'"]+)\1\s*(?:,\s*v\s*:\s*(['"])([^'"]*)\3\s*)?,?\s*\}|(['"])([^'"]+\.js)\5/g;
    var x;
    while ((x = re.exec(m[1]))) {
      if (x[2]) entries.push({ file: x[2], v: x[4] || '' });
      else if (x[6]) entries.push({ file: x[6], v: '' });
    }
    return entries;
  }

  function manifestText(entries) {
    return '/*\n' +
      ' * Published practice tests. The site sorts them by test date, so order does not matter.\n' +
      ' * This file is updated by the admin page (#/admin) and can also be edited by hand.\n' +
      ' * Each entry: { file: \'name.js\', v: \'version\' } — "v" changes on every publish so browsers fetch the new file.\n' +
      ' */\n' +
      'SATLibrary.manifest([\n' +
      entries.map(function (e) { return '  { file: ' + JSON.stringify(e.file).replace(/"/g, '\'') + ', v: ' + JSON.stringify(e.v || '1').replace(/"/g, '\'') + ' }'; }).join(',\n') +
      '\n]);\n';
  }

  function updateManifest(mutator, message) {
    return getFile(MANIFEST).then(function (cur) {
      var entries = parseManifest(cur && cur.text);
      var next = mutator(entries.slice()) || entries;
      return putFile(MANIFEST, utf8ToB64(manifestText(next)), message, cur && cur.sha).catch(function (e) {
        if (e.status !== 409 && e.status !== 422) throw e;
        return getFile(MANIFEST).then(function (cur2) {
          var again = mutator(parseManifest(cur2 && cur2.text)) || [];
          return putFile(MANIFEST, utf8ToB64(manifestText(again)), message, cur2 && cur2.sha);
        });
      }).then(function () { return next; });
    });
  }

  /* ---------------- Publishing ---------------- */
  function fileBase(name) {
    return String(name || '').replace(/\.js$/i, '');
  }

  function testFileText(test) {
    var payload = { id: test.id, source: test.source };
    var json = JSON.stringify(payload, null, 2).replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
    return '/* Practice test: ' + String(test.title || '').replace(/\*\//g, '*\\/') + '\n' +
      ' * Published from the admin page. Edit it there (#/admin) to keep the format consistent. */\n' +
      'SATLibrary.register(' + json + ');\n';
  }

  /* ---------------- Premium (Advanced tests and "premium: yes" tests are published encrypted) ---------------- */
  var PREMIUM_HEADER = '/* tunn.sat Premium test (encrypted). Generated by tools/premium/encrypt.mjs; do not edit by hand. */';

  function bytesToB64(bytes) {
    bytes = new Uint8Array(bytes);
    var s = '';
    for (var i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    return btoa(s);
  }
  function b64ToBytes(b64) {
    var bin = atob(b64), out = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }

  /** The public key every premium file is encrypted for (only the owner's server has the private key). */
  function premiumPublicKey() {
    return fetch('assets/premium-key.json?t=' + Date.now(), { cache: 'no-store' }).then(function (r) {
      if (!r.ok) throw new Error('Could not load assets/premium-key.json');
      return r.json();
    }).then(function (k) {
      return global.crypto.subtle.importKey('spki', b64ToBytes(k.spki), { name: 'RSA-OAEP', hash: 'SHA-256' }, false, ['encrypt'])
        .then(function (key) { return { kid: k.kid, key: key }; });
    });
  }

  /** Encrypts a test definition ({ id, source }) into the text of a tests/premium/*.js file (same format as the tool). */
  function premiumFileText(def) {
    var subtle = global.crypto && global.crypto.subtle;
    if (!subtle) return Promise.reject(new Error('This browser cannot encrypt Premium tests. Use a recent Chrome, Edge, Safari or Firefox.'));
    var t = global.SATLibrary.preview(def);
    if (!t) return Promise.reject(new Error('The test has errors, so it cannot be published.'));
    var aes = global.crypto.getRandomValues(new Uint8Array(32));
    var iv = global.crypto.getRandomValues(new Uint8Array(12));
    var plain = new TextEncoder().encode(JSON.stringify(def));
    return premiumPublicKey().then(function (pk) {
      return Promise.all([
        subtle.importKey('raw', aes, { name: 'AES-GCM' }, false, ['encrypt']).then(function (k) { return subtle.encrypt({ name: 'AES-GCM', iv: iv }, k, plain); }),
        subtle.encrypt({ name: 'RSA-OAEP' }, pk.key, aes)
      ]).then(function (out) {
        var stub = {
          v: 1, id: t.id, title: t.title || '', category: t.category || '', description: t.description || '',
          section: ['advanced', 'topic', 'challenge'].indexOf(t.section) !== -1 ? t.section : '', date: t.date || '',
          questionCount: t.questionCount, mcqCount: t.mcqCount, sprCount: t.sprCount, totalTime: t.totalTime, moduleCount: t.modules.length,
          kid: pk.kid, key: bytesToB64(out[1]), iv: bytesToB64(iv), data: bytesToB64(out[0])
        };
        return { stub: stub, text: PREMIUM_HEADER + '\n' + 'SATLibrary.registerPremium(' + JSON.stringify(stub).replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029') + ');\n' };
      });
    });
  }

  /** Advanced Tests, and any test marked "premium: yes" (Practice, Topic or Elite), are published encrypted. */
  function isPremiumSource(source) {
    var res = global.P.parseText(String(source || ''));
    return global.P.isPremium(res.test);
  }

  function extOf(dataUrl) {
    var m = /^data:image\/([a-z0-9.+-]+);/i.exec(dataUrl || '');
    if (!m) return 'png';
    var t = m[1].toLowerCase();
    return t === 'jpeg' ? 'jpg' : t === 'svg+xml' ? 'svg' : t;
  }

  /**
   * Publishes a test.
   * test: { id, title, source, assets } — source is the full text format (with front matter).
   * opts.file: existing file name to overwrite (when editing a published test).
   * opts.onStep(text, state): progress callback.
   * Resolves with { file, id, source }.
   */
  function publish(test, opts) {
    opts = opts || {};
    var step = opts.onStep || function () {};
    var premium = isPremiumSource(test.source);
    var file, plainName, target, base2;
    var source = String(test.source || '');
    var stubOut = null;
    var warning = '';
    var assets = test.assets || {};
    var used = {};
    source.replace(/asset:([A-Za-z0-9_-]+)/g, function (m, id) { used[id] = true; return m; });
    var ids = Object.keys(used).filter(function (id) { return assets[id]; });
    var stamp = Date.now().toString(36);

    // Premium tests (Advanced, or "premium: yes") are committed encrypted as tests/premium/<name>.js
    var chain = (opts.file ? Promise.resolve(opts.file) : freeFileName(U.slug(test.title || test.id || 'practice-test'))).then(function (f) {
      file = f;
      plainName = String(file).replace(/^premium\//, '');
      target = premium ? 'premium/' + plainName : plainName;
      base2 = fileBase(plainName);
    });
    ids.forEach(function (id, i) {
      chain = chain.then(function () {
        var dataUrl = assets[id];
        var path = 'tests/images/' + base2 + '-' + id + '.' + extOf(dataUrl);
        step('Uploading image ' + (i + 1) + ' of ' + ids.length + '…', 'active');
        var b64 = String(dataUrl).split(',')[1] || '';
        return putFileSafe(path, b64, 'Add image for ' + (test.title || file)).then(function () {
          source = source.split('asset:' + id).join(path);
        });
      });
    });

    return chain.then(function () {
      var published = { id: test.id, title: test.title, source: source };
      if (!premium) {
        step('Uploading tests/' + target + '…', 'active');
        return putFileSafe('tests/' + target, utf8ToB64(testFileText(published)), (opts.file ? 'Update' : 'Publish') + ' practice test: ' + (test.title || target));
      }
      step('Encrypting (Premium)…', 'active');
      return premiumFileText({ id: test.id, source: source }).then(function (out) {
        stubOut = out.stub;
        step('Uploading tests/' + target + '…', 'active');
        return putFileSafe('tests/' + target, utf8ToB64(out.text), (opts.file ? 'Update' : 'Publish') + ' Premium test: ' + (test.title || target));
      });
    }).then(function () {
      step('Updating the test list…', 'active');
      return updateManifest(function (entries) {
        var found = false;
        entries.forEach(function (e) {
          if (e.file === target || e.file === file) { e.file = target; e.v = stamp; found = true; }
        });
        if (!found) entries.push({ file: target, v: stamp });
        // Keep one entry per file
        var seen = {};
        return entries.filter(function (e) { if (seen[e.file]) return false; seen[e.file] = true; return true; });
      }, 'List ' + (premium ? 'Premium' : 'practice') + ' test: ' + (test.title || target));
    }).then(function (entries) {
      // The test moved between tests/ and tests/premium/: remove the old copy (never leave a plaintext Premium test public)
      if (!opts.file || opts.file === target) return entries;
      step('Removing the old copy…', 'active');
      return deleteFile('tests/' + opts.file, 'Remove old copy of ' + (test.title || opts.file)).catch(function (e) {
        console.warn(e);
        warning = 'The old copy tests/' + opts.file + ' could not be removed (' + (e && e.message || e) + '). Delete it on GitHub by hand.';
        step(warning, 'error');
      }).then(function () { return entries; });
    }).then(function (entries) {
      if (stubOut) global.SATLibrary.registerPremium(stubOut, { file: target, v: stamp });
      step('Published', 'done');
      return { file: target, id: test.id, source: source, entries: entries, v: stamp, premium: premium, warning: warning };
    });
  }

  /**
   * A new test file name: <base>.js, else <base>-2.js, … that no listed test uses, as a free test
   * (tests/<name>) or as a Premium one (tests/premium/<name>), and that is not already in the repository.
   */
  function freeFileName(base) {
    base = base || 'practice-test';
    var taken = global.SATLibrary.manifestEntries().map(function (e) { return String(e.file).replace(/^premium\//, ''); });
    var n = 1;
    function next() {
      var name = n === 1 ? base + '.js' : base + '-' + n + '.js';
      n++;
      if (n > 100) return Promise.reject(new Error('Could not find a free file name for ' + base + '.js'));
      if (taken.indexOf(name) !== -1) return next();
      return Promise.all([getFile('tests/' + name), getFile('tests/premium/' + name)]).then(function (r) {
        return r[0] || r[1] ? next() : name;
      });
    }
    return next();
  }

  function unpublish(file, title) {
    return updateManifest(function (entries) {
      return entries.filter(function (e) { return e.file !== file; });
    }, 'Unlist practice test: ' + (title || file)).then(function () {
      return deleteFile('tests/' + file, 'Remove practice test: ' + (title || file)).catch(function (e) { console.warn(e); });
    }).then(function () {
      // Remove this test's images (best effort)
      var prefix = fileBase(String(file).replace(/^premium\//, '')) + '-';
      return request('GET', contentsPath('tests/images') + '?ref=' + encodeURIComponent(cfg().branch)).then(function (list) {
        var mine = (Array.isArray(list) ? list : []).filter(function (f) { return f.name.indexOf(prefix) === 0; });
        var chain = Promise.resolve();
        mine.forEach(function (f) {
          chain = chain.then(function () {
            return request('DELETE', contentsPath(f.path), { message: 'Remove image ' + f.name, sha: f.sha, branch: cfg().branch }).catch(function () { /* ignore */ });
          });
        });
        return chain;
      }, function () { /* no images folder */ });
    });
  }

  var Admin = {
    isAdmin: function () { return !!session(); },
    user: function () { var s = session(); return s ? { login: s.login, avatar: s.avatar, repo: cfg().owner + '/' + cfg().repo } : null; },

    /** Verifies the token can push to the configured repository, then stores it in this browser. */
    login: function (token) {
      token = String(token || '').trim();
      if (!token) return Promise.reject(new Error('Paste your GitHub token.'));
      var c = cfg();
      if (!c.owner || !c.repo) return Promise.reject(new Error('Set APP_CONFIG.github.owner and repo in assets/js/config.js first.'));
      return request('GET', repoPath(''), undefined, token).then(function (repo) {
        var p = (repo && repo.permissions) || {};
        if (!(p.push || p.admin || p.maintain)) throw new Error('This GitHub account cannot publish to ' + c.owner + '/' + c.repo + '.');
        return request('GET', '/user', undefined, token).catch(function () { return {}; });
      }, function (e) {
        if (e.status === 401) throw new Error('GitHub did not accept this token. Check that you copied all of it and that it has not expired.');
        if (e.status === 404 || e.status === 403) throw new Error('This token cannot access ' + c.owner + '/' + c.repo + '. Give it access to that repository.');
        throw e;
      }).then(function (u) {
        var s = { token: token, login: (u && u.login) || c.owner, avatar: (u && u.avatar_url) || '', verifiedAt: Date.now() };
        if (!U.lsSet(KEY, s)) throw new Error('Could not save the session in this browser.');
        return s;
      });
    },

    logout: function () { U.lsDel(KEY); },

    publish: publish,
    unpublish: unpublish,
    getFile: getFile,
    parseManifest: parseManifest,
    manifestText: manifestText,
    testFileText: testFileText,
    premiumFileText: premiumFileText,
    repoUrl: function () { var c = cfg(); return 'https://github.com/' + c.owner + '/' + c.repo; },
    actionsUrl: function () { var c = cfg(); return 'https://github.com/' + c.owner + '/' + c.repo + '/actions'; }
  };

  global.Admin = Admin;
})(window);
