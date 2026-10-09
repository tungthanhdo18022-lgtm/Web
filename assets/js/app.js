/* Khởi động ứng dụng + điều hướng (hash router). */
(function (global) {
  'use strict';

  var U = global.U, P = global.P;
  var Lib = global.SATLibrary;

  var App = {
    pendingDraft: null,
    cleanup: null
  };

  var ROUTES = [
    { re: /^\/?$/, view: 'home', nav: 'home' },
    { re: /^\/test\/([^/]+)$/, view: 'intro', keys: ['id'], nav: 'home' },
    { re: /^\/exam\/([^/]+)$/, view: 'exam', keys: ['id'], exam: true },
    { re: /^\/results\/([^/]+)$/, view: 'results', keys: ['id'], nav: 'home' },
    { re: /^\/review\/([^/]+)\/(\d+)$/, view: 'review', keys: ['id', 'n'], nav: 'home' },
    { re: /^\/builder(?:\/([^/]+))?$/, view: 'builder', keys: ['id'], nav: 'builder', wide: true },
    { re: /^\/guide$/, view: 'guide', nav: 'guide' }
  ];

  function shell() {
    var name = global.APP_CONFIG.siteName;
    document.getElementById('app').innerHTML =
      '<header class="topnav" id="topnav">' +
      '<a class="brand" href="#/" aria-label="' + U.esc(name) + ' – trang chủ"><span class="brand-mark" aria-hidden="true">' + U.icon('sigma') + '</span><span class="brand-name">' + U.esc(name) + '</span></a>' +
      '<nav class="topnav-links" aria-label="Điều hướng chính">' +
      '<a href="#/" data-nav="home">' + U.icon('grid') + '<span>Thư viện</span></a>' +
      '<a href="#/builder" data-nav="builder">' + U.icon('edit') + '<span>Tạo đề</span></a>' +
      '<a href="#/guide" data-nav="guide">' + U.icon('help') + '<span>Hướng dẫn</span></a>' +
      '</nav>' +
      '<button class="btn btn--primary btn--sm topnav-upload" data-app-act="upload">' + U.icon('upload') + '<span>Tải đề lên</span></button>' +
      '</header>' +
      '<main id="view" class="view" tabindex="-1"></main>' +
      '<footer class="site-footer" id="site-footer">' +
      '<span>' + U.esc(name) + ' · Dữ liệu lưu ngay trên trình duyệt của bạn</span>' +
      '<span>Công thức: KaTeX · Máy tính: Desmos · Không liên kết với College Board. SAT® là thương hiệu của College Board.</span>' +
      '</footer>';
    document.getElementById('app').addEventListener('click', function (e) {
      var b = e.target.closest('[data-app-act="upload"]');
      if (b) {
        App.uploadTests().then(function (changed) { if (changed && currentRoute && currentRoute.view === 'home') route(); });
      }
    });
  }

  var currentRoute = null;

  function route() {
    var hash = location.hash.replace(/^#/, '').split('?')[0] || '/';
    var match = null, params = {};
    for (var i = 0; i < ROUTES.length; i++) {
      var m = ROUTES[i].re.exec(hash);
      if (m) {
        match = ROUTES[i];
        (match.keys || []).forEach(function (k, idx) {
          if (m[idx + 1] == null) return;
          try { params[k] = decodeURIComponent(m[idx + 1]); } catch (e) { params[k] = m[idx + 1]; }
        });
        break;
      }
    }
    if (!match) { location.replace('#/'); return; }

    if (typeof App.cleanup === 'function') {
      try { App.cleanup(); } catch (e) { console.error(e); }
    }
    App.cleanup = null;
    U.$$('.modal-overlay').forEach(function (m) { m.remove(); });

    currentRoute = match;
    var view = document.getElementById('view');
    document.body.classList.toggle('is-exam', !!match.exam);
    document.body.classList.toggle('is-wide', !!match.wide);
    U.$$('[data-nav]').forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('data-nav') === match.nav); });
    if (!match.exam) document.title = global.APP_CONFIG.siteName;

    view.innerHTML = '';
    try {
      App.cleanup = global.Views[match.view](view, params) || null;
    } catch (e) {
      console.error(e);
      view.innerHTML = '<div class="page narrow"><div class="empty-state">' + U.icon('warn') +
        '<h2>Đã xảy ra lỗi</h2><p>' + U.esc(e && e.message || String(e)) + '</p><a class="btn btn--primary" href="#/">Về trang chủ</a></div></div>';
    }
    if (!match.exam) window.scrollTo(0, 0);
  }

  /* ---------------- Tải đề lên ---------------- */
  function confirmOverwrite(test) {
    var existing = test.id ? Lib.get(test.id) : null;
    if (!existing || existing.builtin) return Promise.resolve('save');
    return U.modal({
      title: 'Đề đã tồn tại',
      body: '<p>Thư viện đã có đề <b>' + U.esc(existing.title) + '</b> cùng mã. Bạn muốn ghi đè hay lưu thành đề mới?</p>',
      actions: [
        { label: 'Hủy', value: 'cancel', kind: 'ghost' },
        { label: 'Lưu thành đề mới', value: 'new', kind: 'ghost' },
        { label: 'Ghi đè', value: 'save', kind: 'primary' }
      ]
    });
  }

  App.uploadTests = function () {
    return U.pickFile('.json,.txt,.md,.tex,.js,application/json,text/plain', true).then(function (files) {
      if (!files.length) return false;
      var saved = [], problems = [], toOpen = [];
      return files.reduce(function (p, f) {
        return p.then(function () {
          return U.readFile(f).then(function (text) {
            var res = P.parseAny(text, f.name);
            var list = res.many ? res.many : [res];
            return list.reduce(function (p2, r) {
              return p2.then(function () {
                if (!r.test) { problems.push(f.name + ': ' + ((r.errors[0] && r.errors[0].msg) || 'không đọc được')); return; }
                if (r.errors.length || r.fromLatex) { toOpen.push({ res: r, file: f.name }); return; }
                return confirmOverwrite(r.test).then(function (choice) {
                  if (choice === 'cancel' || choice == null) return;
                  if (choice === 'new') r.test.id = '';
                  return Lib.save(r.test).then(function (t) { saved.push(t); });
                });
              });
            }, Promise.resolve());
          }).catch(function (e) { problems.push(f.name + ': ' + e.message); });
        });
      }, Promise.resolve()).then(function () {
        if (saved.length) U.toast('Đã thêm ' + saved.length + ' đề: ' + saved.map(function (t) { return t.title; }).join(', '), 'success', 4500);
        if (problems.length) U.alert('Một số file không đọc được', '<ul>' + problems.map(function (x) { return '<li>' + U.esc(x) + '</li>'; }).join('') + '</ul>');
        if (toOpen.length) {
          var first = toOpen[0];
          var t = first.res.test;
          App.pendingDraft = {
            source: t.source || P.toText(t), title: t.title, author: t.author, description: t.description, assets: t.assets,
            importNotes: first.res.importNotes || [],
            note: first.res.fromLatex
              ? 'Đã chuyển "' + first.file + '" từ LaTeX. Hãy kiểm tra phần xem trước, chèn ảnh cho hình vẽ (nếu có), rồi bấm "Lưu vào thư viện".'
              : '"' + first.file + '" có ' + first.res.errors.length + ' lỗi cần sửa trước khi lưu (xem tab Kiểm tra).'
          };
          if (toOpen.length > 1) U.toast('Còn ' + (toOpen.length - 1) + ' file cần sửa — hãy tải lên lại sau khi lưu file này.', 'info', 6000);
          location.hash = '#/builder';
          if (currentRoute && currentRoute.view === 'builder') route();
        }
        return saved.length > 0;
      });
    });
  };

  /* ---------------- Khởi động ---------------- */
  App.start = function () {
    shell();
    var view = document.getElementById('view');
    view.innerHTML = '<div class="boot"><div class="spinner"></div><p>Đang tải đề thi…</p></div>';

    // Ghi nhận lỗi cú pháp trong các file đề (tests/*.js)
    function onErr(ev) {
      if (ev && ev.filename && /\/tests\//.test(ev.filename)) {
        Lib.reportError(ev.filename.split('/').pop().split('?')[0], 'Lỗi cú pháp JavaScript: ' + ev.message + ' (dòng ' + ev.lineno + ')');
      }
    }
    window.addEventListener('error', onErr);

    Promise.resolve()
      .then(function () { return Lib.loadBuiltins(); })
      .then(function () { return Lib.loadUser(); })
      .catch(function (e) { console.error(e); U.toast('Lỗi khi tải dữ liệu: ' + e.message, 'error'); })
      .then(function () {
        window.removeEventListener('error', onErr);
        if (!global.katex) U.toast('Không tải được KaTeX — công thức sẽ hiển thị dạng mã.', 'error', 6000);
        window.addEventListener('hashchange', route);
        route();
      });
  };

  global.App = App;
})(window);
