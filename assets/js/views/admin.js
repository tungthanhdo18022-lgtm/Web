/* Admin (owner only): sign-in with a GitHub token, manage published tests and local drafts. */
(function (global) {
  'use strict';

  var U = global.U, P = global.P;

  function loginHtml() {
    var g = global.APP_CONFIG.github || {};
    return '<div class="page narrow"><div class="card login-card">' +
      '<span class="eyebrow">' + U.icon('edit') + 'Owner access</span>' +
      '<h1>Admin sign-in</h1>' +
      '<p class="muted">Only the site owner can add or edit tests. Sign in with a GitHub token that can write to <b>' + U.esc(g.owner + '/' + g.repo) + '</b>.</p>' +
      '<ol class="login-steps">' +
      '<li>Open <a href="https://github.com/settings/personal-access-tokens/new" target="_blank" rel="noopener">GitHub → Fine-grained tokens → Generate new token</a>.</li>' +
      '<li>Repository access: <b>Only select repositories</b> → <b>' + U.esc(g.repo) + '</b>.</li>' +
      '<li>Repository permissions: <b>Contents → Read and write</b>. Then click <b>Generate token</b> and copy it.</li>' +
      '</ol>' +
      '<form id="admin-login" class="form-grid" autocomplete="off">' +
      '<label class="field"><span class="field-label">GitHub token</span>' +
      '<input id="admin-token" type="password" placeholder="github_pat_…" autocomplete="off" spellcheck="false" required></label>' +
      '<p class="field-hint" style="margin:-8px 0 0">The token is stored only in this browser. Do not sign in on a shared computer.</p>' +
      '<div><button class="btn btn--primary btn--lg" type="submit" id="admin-login-btn">' + U.icon('check') + 'Sign in</button></div>' +
      '<p class="txt-bad" id="admin-err" role="alert" hidden></p>' +
      '</form></div></div>';
  }

  function AdminView(root) {
    var Admin = global.Admin, Lib = global.SATLibrary;

    if (!Admin.isAdmin()) {
      root.innerHTML = loginHtml();
      var form = document.getElementById('admin-login');
      var onSubmit = function (e) {
        e.preventDefault();
        var btn = document.getElementById('admin-login-btn');
        var err = document.getElementById('admin-err');
        err.hidden = true;
        btn.disabled = true;
        btn.innerHTML = '<span class="spinner" style="width:18px;height:18px;border-width:2px"></span>Checking…';
        Admin.login(document.getElementById('admin-token').value).then(function () {
          return Lib.loadUser();
        }).then(function () {
          global.App.refreshNav();
          U.toast('Signed in. You can now publish tests.', 'success');
          global.App.route();
        }).catch(function (ex) {
          err.textContent = ex.message;
          err.hidden = false;
          btn.disabled = false;
          btn.innerHTML = U.icon('check') + 'Sign in';
        });
      };
      form.addEventListener('submit', onSubmit);
      return function () { form.removeEventListener('submit', onSubmit); };
    }

    var user = Admin.user();

    function publishedRows() {
      var list = Lib.published();
      if (!list.length) return '<div class="empty-mini">No published tests yet. Click <b>New test</b> to create one.</div>';
      return '<div class="table-wrap"><table class="data-table"><thead><tr><th>Test</th><th>File</th><th>Questions</th><th>Filed under</th><th></th></tr></thead><tbody>' +
        list.map(function (t) {
          var id = encodeURIComponent(t.id);
          return '<tr><td><b>' + U.esc(t.title) + '</b>' + (t.author ? '<br><small class="muted">by ' + U.esc(t.author) + '</small>' : '') + '</td>' +
            '<td class="mono"><small>' + U.esc(t.file ? 'tests/' + t.file : '—') + '</small></td>' +
            '<td>' + t.questionCount + ' <small class="muted">(' + t.mcqCount + ' MCQ · ' + t.sprCount + ' SPR)</small></td>' +
            '<td>' + (t.year ? t.year + (t.season ? ' · ' + t.season.charAt(0).toUpperCase() + t.season.slice(1) : '') : '<span class="muted">No date</span>') + '</td>' +
            '<td class="row-actions">' +
            '<a class="btn btn--sm btn--ghost" href="#/test/' + id + '">View</a>' +
            '<a class="btn btn--sm btn--ghost" href="#/admin/builder/' + id + '">' + U.icon('edit') + 'Edit</a>' +
            (t.file ? '<button class="icon-btn icon-btn--danger" data-unpublish="' + U.esc(t.id) + '" title="Unpublish" aria-label="Unpublish ' + U.esc(t.title) + '">' + U.icon('trash') + '</button>' : '') +
            '</td></tr>';
        }).join('') + '</tbody></table></div>';
    }

    function draftRows() {
      var list = Lib.drafts();
      if (!list.length) return '<div class="empty-mini">No drafts. Drafts are saved in this browser until you publish them.</div>';
      return '<div class="table-wrap"><table class="data-table"><thead><tr><th>Draft</th><th>Questions</th><th>Last saved</th><th></th></tr></thead><tbody>' +
        list.map(function (t) {
          var id = encodeURIComponent(t.id);
          return '<tr><td><b>' + U.esc(t.title || 'Untitled') + '</b>' + (t.hasErrors ? ' <span class="badge badge--red">Has errors</span>' : '') + '</td>' +
            '<td>' + t.questionCount + '</td>' +
            '<td>' + U.fmtDate(t.updatedAt) + '</td>' +
            '<td class="row-actions">' +
            '<a class="btn btn--sm btn--ghost" href="#/test/' + id + '">Try it</a>' +
            '<a class="btn btn--sm btn--ghost" href="#/admin/builder/' + id + '">' + U.icon('edit') + 'Edit</a>' +
            '<button class="icon-btn icon-btn--danger" data-del-draft="' + U.esc(t.id) + '" title="Delete draft" aria-label="Delete draft">' + U.icon('trash') + '</button>' +
            '</td></tr>';
        }).join('') + '</tbody></table></div>';
    }

    function render() {
      root.innerHTML =
        '<div class="page">' +
        '<div class="admin-bar"><div><h1>Admin</h1>' +
        '<span class="admin-user">' + (user.avatar ? '<img src="' + U.esc(user.avatar) + '" alt="">' : '') + '<span class="status-dot"></span>Signed in as <b>' + U.esc(user.login) + '</b> · ' + U.esc(user.repo) + '</span></div>' +
        '<div class="section-tools">' +
        '<button class="btn btn--ghost" data-act="import">' + U.icon('upload') + 'Import file</button>' +
        '<a class="btn btn--primary" href="#/admin/builder">' + U.icon('plus') + 'New test</a>' +
        '<button class="btn btn--ghost" data-act="logout">' + U.icon('logout') + 'Sign out</button>' +
        '</div></div>' +
        '<div class="alert alert--info">' + U.icon('info') + '<div>Publishing commits the test to GitHub. The public site updates about <b>1–2 minutes</b> later — you can follow the deployment on <a href="' + Admin.actionsUrl() + '" target="_blank" rel="noopener">GitHub Actions</a>.</div></div>' +
        '<section class="section"><div class="section-head"><div><h2>Published tests</h2><p class="muted">Visible to everyone on the site.</p></div></div>' + publishedRows() + '</section>' +
        '<section class="section"><div class="section-head"><div><h2>Drafts</h2><p class="muted">Only in this browser — publish them to make them public.</p></div></div>' + draftRows() + '</section>' +
        '</div>';
    }

    function importFiles() {
      U.pickFile('.json,.txt,.md,.tex,.js,application/json,text/plain', true).then(function (files) {
        if (!files.length) return;
        var opened = false, saved = 0, problems = [];
        return files.reduce(function (p, f) {
          return p.then(function () {
            return U.readFile(f).then(function (text) {
              var res = P.parseAny(text, f.name);
              var list = res.many ? res.many : [res];
              return list.reduce(function (p2, r) {
                return p2.then(function () {
                  if (!r.test) { problems.push(f.name + ': ' + ((r.errors[0] && r.errors[0].msg) || 'unreadable')); return; }
                  if (!opened && (files.length === 1 && list.length === 1 || r.errors.length || r.fromLatex)) {
                    opened = true;
                    var t = r.test;
                    global.App.pendingDraft = {
                      source: t.source || P.toText(t), title: t.title, author: t.author, description: t.description, date: t.date, section: t.section, assets: t.assets,
                      importNotes: r.importNotes || [],
                      note: r.fromLatex ? 'Converted "' + f.name + '" from LaTeX. Check the preview, add images for any figures, then save or publish.'
                        : r.errors.length ? '"' + f.name + '" has ' + r.errors.length + ' error(s) to fix (see the Check tab).'
                          : 'Imported "' + f.name + '". Review it, then save or publish.'
                    };
                    return;
                  }
                  if (r.errors.length) { problems.push(f.name + ': ' + r.errors.length + ' error(s) — import it on its own to fix them'); return; }
                  r.test.id = '';
                  return Lib.save(r.test).then(function () { saved++; });
                });
              }, Promise.resolve());
            }).catch(function (e) { problems.push(f.name + ': ' + e.message); });
          });
        }, Promise.resolve()).then(function () {
          if (saved) U.toast('Saved ' + saved + ' test(s) as drafts.', 'success');
          if (problems.length) U.alert('Some files could not be imported', '<ul>' + problems.map(function (x) { return '<li>' + U.esc(x) + '</li>'; }).join('') + '</ul>');
          if (opened) location.hash = '#/admin/builder';
          else render();
        });
      });
    }

    function onClick(e) {
      var b = e.target.closest('[data-act]');
      if (b) {
        var act = b.getAttribute('data-act');
        if (act === 'logout') {
          U.confirm('Sign out?', 'The GitHub token will be removed from this browser. Drafts stay saved here.', 'Sign out').then(function (ok) {
            if (!ok) return;
            Admin.logout();
            global.App.refreshNav();
            location.hash = '#/';
          });
        }
        if (act === 'import') importFiles();
        return;
      }
      var un = e.target.closest('[data-unpublish]');
      if (un) {
        var t = Lib.get(un.getAttribute('data-unpublish'));
        if (!t || !t.file) return;
        U.confirm('Unpublish this test?', '<b>' + U.esc(t.title) + '</b> will be removed from the public site (tests/' + U.esc(t.file) + ' is deleted from the repository). Students\' saved results stay on their devices.', 'Unpublish', { danger: true }).then(function (ok) {
          if (!ok) return;
          un.disabled = true;
          U.toast('Unpublishing…', 'info');
          Admin.unpublish(t.file, t.title).then(function () {
            Lib.unregisterLocal(t.file);
            U.toast('Unpublished. The site updates in about 1–2 minutes.', 'success', 5000);
            render();
          }).catch(function (err) {
            un.disabled = false;
            U.alert('Could not unpublish', U.esc(err.message));
          });
        });
        return;
      }
      var dd = e.target.closest('[data-del-draft]');
      if (dd) {
        var d = Lib.get(dd.getAttribute('data-del-draft'));
        U.confirm('Delete this draft?', '<b>' + U.esc(d && d.title || 'Untitled') + '</b> will be deleted from this browser.', 'Delete', { danger: true }).then(function (ok) {
          if (!ok) return;
          Lib.remove(dd.getAttribute('data-del-draft')).then(function () { U.toast('Draft deleted.', 'success'); render(); });
        });
      }
    }

    root.addEventListener('click', onClick);
    var ready = Lib.drafts().length || !global.indexedDB ? Promise.resolve() : Lib.loadUser();
    render();
    ready.then(function () { if (root.isConnected && root.querySelector('.admin-bar')) render(); });
    return function () { root.removeEventListener('click', onClick); };
  }

  global.Views = global.Views || {};
  global.Views.admin = AdminView;
})(window);
