/* App bootstrap + hash router. */
(function (global) {
  'use strict';

  var U = global.U;
  var Lib = global.SATLibrary;

  var App = {
    pendingDraft: null,
    cleanup: null
  };

  var ROUTES = [
    { re: /^\/?$/, view: 'home', nav: 'home' },
    { re: /^\/test\/([^/]+)$/, view: 'intro', keys: ['id'], nav: 'home' },
    { re: /^\/exam\/([^/]+)$/, view: 'exam', keys: ['id'], exam: true },
    { re: /^\/results\/?$/, view: 'history', nav: 'results' },
    { re: /^\/results\/([^/]+)$/, view: 'results', keys: ['id'], nav: 'results' },
    { re: /^\/review\/([^/]+)\/(\d+)$/, view: 'review', keys: ['id', 'n'], nav: 'results' },
    { re: /^\/help$/, view: 'help', nav: 'help' },
    { re: /^\/admin\/?$/, view: 'admin', nav: 'admin' },
    { re: /^\/admin\/builder(?:\/([^/]+))?$/, view: 'builder', keys: ['id'], nav: 'admin', wide: true, admin: true },
    // Old links
    { re: /^\/guide$/, redirect: '#/help' },
    { re: /^\/builder(?:\/([^/]+))?$/, redirect: '#/admin/builder' }
  ];

  function navHtml() {
    var admin = global.Admin && global.Admin.isAdmin();
    return '<a class="nav-btn" href="#/" data-nav="home">' + U.icon('grid') + '<span>Practice Tests</span></a>' +
      '<a class="nav-btn" href="#/results" data-nav="results">' + U.icon('history') + '<span>My Results</span></a>' +
      '<a class="nav-btn" href="#/help" data-nav="help">' + U.icon('help') + '<span>Help</span></a>' +
      (admin ? '<span class="nav-sep" aria-hidden="true"></span><a class="nav-btn nav-btn--ghost" href="#/admin" data-nav="admin">' + U.icon('edit') + '<span>Admin</span></a>' : '');
  }

  function shell() {
    var cfg = global.APP_CONFIG;
    var year = new Date().getFullYear();
    document.getElementById('app').innerHTML =
      '<header class="site-header" id="site-header"><div class="site-header-inner">' +
      '<a class="brand" href="#/" aria-label="' + U.esc(cfg.siteName) + ' home"><span class="brand-mark" aria-hidden="true">' + U.icon('sigma') + '</span><span class="brand-name">' + U.esc(cfg.siteName) + '</span></a>' +
      '<nav class="site-nav" id="site-nav" aria-label="Main">' + navHtml() + '</nav>' +
      '</div></header>' +
      '<main id="view" class="view" tabindex="-1"></main>' +
      '<footer class="site-footer" id="site-footer"><div class="site-footer-inner">' +
      '<span>© ' + year + ' ' + U.esc(cfg.siteName) + '. Free Digital SAT Math practice.</span>' +
      '<span>Not affiliated with College Board. SAT® is a registered trademark of College Board. · <a href="#/help">Help</a></span>' +
      '</div></footer>';
  }

  App.refreshNav = function () {
    var nav = document.getElementById('site-nav');
    if (nav) nav.innerHTML = navHtml();
    if (currentRoute) markNav(currentRoute.nav);
  };

  function markNav(key) {
    U.$$('[data-nav]').forEach(function (a) {
      var on = a.getAttribute('data-nav') === key;
      a.classList.toggle('is-active', on);
      if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
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
    if (match.redirect) {
      var target = match.redirect + (match.redirect === '#/admin/builder' && params.id ? '/' + encodeURIComponent(params.id) : '');
      var m2 = /^\/builder\/([^/]+)$/.exec(hash);
      if (m2) target = '#/admin/builder/' + m2[1];
      location.replace(target);
      return;
    }
    if (match.admin && !(global.Admin && global.Admin.isAdmin())) { location.replace('#/admin'); return; }

    if (typeof App.cleanup === 'function') {
      try { App.cleanup(); } catch (e) { console.error(e); }
    }
    App.cleanup = null;
    U.$$('.modal-overlay').forEach(function (el) { el.remove(); });

    currentRoute = match;
    var view = document.getElementById('view');
    document.body.classList.toggle('is-exam', !!match.exam);
    document.body.classList.toggle('is-wide', !!match.wide);
    markNav(match.nav);
    if (!match.exam) document.title = global.APP_CONFIG.siteName + ' — ' + global.APP_CONFIG.tagline;

    view.innerHTML = '';
    try {
      App.cleanup = global.Views[match.view](view, params) || null;
    } catch (e) {
      console.error(e);
      view.innerHTML = '<div class="page narrow"><div class="empty-state">' + U.icon('warn') +
        '<h2>Something went wrong</h2><p>' + U.esc(e && e.message || String(e)) + '</p><a class="btn btn--primary" href="#/">Back to practice tests</a></div></div>';
    }
    if (!match.exam) window.scrollTo(0, 0);
  }

  App.route = route;

  /* ---------------- Boot ---------------- */
  App.start = function () {
    shell();
    var view = document.getElementById('view');
    view.innerHTML = '<div class="boot"><div class="spinner"></div><p>Loading practice tests…</p></div>';

    // Report syntax errors inside test files (tests/*.js)
    function onErr(ev) {
      if (ev && ev.filename && /\/tests\//.test(ev.filename)) {
        Lib.reportError(ev.filename.split('/').pop().split('?')[0], 'JavaScript syntax error: ' + ev.message + ' (line ' + ev.lineno + ')');
      }
    }
    window.addEventListener('error', onErr);

    var isAdmin = global.Admin && global.Admin.isAdmin();
    Promise.resolve()
      .then(function () { return Lib.loadBuiltins(); })
      .then(function () { return isAdmin ? Lib.loadUser() : null; })
      .catch(function (e) { console.error(e); U.toast('Could not load data: ' + e.message, 'error'); })
      .then(function () {
        window.removeEventListener('error', onErr);
        if (!global.katex) U.toast('Math rendering (KaTeX) failed to load — formulas will appear as code.', 'error', 6000);
        window.addEventListener('hashchange', route);
        route();
      });
  };

  global.App = App;
})(window);
