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
    { re: /^\/?$/, view: 'home', nav: 'practice' },
    // Same page as "/", scrolled to one of its test libraries
    { re: /^\/practice\/?$/, view: 'home', nav: 'practice', section: 'practice-tests' },
    { re: /^\/topics?\/?$/, view: 'home', nav: 'topic', section: 'topic-tests' },
    { re: /^\/challenge\/?$/, view: 'home', nav: 'challenge', section: 'challenge-tests' },
    { re: /^\/advanced\/?$/, view: 'home', nav: 'advanced', section: 'advanced-tests' },
    { re: /^\/test\/([^/]+)$/, view: 'intro', keys: ['id'], nav: 'practice' },
    { re: /^\/exam\/([^/]+)$/, view: 'exam', keys: ['id'], exam: true },
    { re: /^\/results\/?$/, view: 'history', nav: 'results' },
    { re: /^\/results\/([^/]+)$/, view: 'results', keys: ['id'], nav: 'results' },
    { re: /^\/review\/([^/]+)\/(\d+)(?:\/(mistakes))?$/, view: 'review', keys: ['id', 'n', 'mode'], nav: 'results' },
    { re: /^\/redo\/([^/]+)(?:\/(\d+|done))?$/, view: 'redo', keys: ['id', 'n'], nav: 'results' },
    { re: /^\/help$/, view: 'help', nav: 'help' },
    { re: /^\/admin\/?$/, view: 'admin', nav: 'admin' },
    { re: /^\/admin\/builder(?:\/([^/]+))?$/, view: 'builder', keys: ['id'], nav: 'admin', wide: true, admin: true },
    // Old links
    { re: /^\/guide$/, redirect: '#/help' },
    { re: /^\/builder(?:\/([^/]+))?$/, redirect: '#/admin/builder' }
  ];

  /** A sidebar link with its icon. */
  function navLink(href, key, label, icon) {
    return '<a class="side-link" href="' + href + '" data-nav="' + key + '">' +
      U.icon(icon) + '<span>' + U.esc(label) + '</span></a>';
  }

  function isAdmin() { return !!(global.Admin && global.Admin.isAdmin()); }

  function navHtml() {
    return navLink('#/practice', 'practice', 'Practice Tests', 'file') +
      navLink('#/topic', 'topic', 'Topic Tests', 'layers') +
      navLink('#/challenge', 'challenge', 'Elite Tests', 'star') +
      navLink('#/advanced', 'advanced', 'Advanced Tests', 'bolt') +
      navLink('#/results', 'results', 'My Results', 'chart') +
      navLink('#/help', 'help', 'Help', 'help');
  }

  /** Streak mini card at the bottom of the sidebar (redrawn on every route). */
  function sideStreakHtml() {
    var S = global.Streak;
    if (!S || !S.info) return '';
    var info = S.info();
    var sub;
    if (info.todayDone) sub = 'Today is done. See you tomorrow!';
    else if (info.days > 0) {
      var left = Math.max(1, Math.ceil((S.STREAK_DAY_SECONDS - info.todaySeconds) / 60));
      sub = left + ' more min today to reach ' + (info.days + 1) + ' days.';
    } else sub = 'Practice 30 min today to start a streak.';
    return '<div class="side-streak' + (info.days > 0 ? ' is-on' : '') + '">' +
      '<span class="side-streak-icon">' + U.icon('flame') + '</span>' +
      '<div><b>' + info.days + ' day' + (info.days === 1 ? '' : 's') + '</b><span>current streak</span></div>' +
      '<p>' + U.esc(sub) + '</p></div>';
  }

  function refreshSideStreak() {
    var el = document.getElementById('side-streak');
    if (el) el.innerHTML = sideStreakHtml();
  }

  function shell() {
    var cfg = global.APP_CONFIG;
    var year = new Date().getFullYear();
    document.getElementById('app').innerHTML =
      '<div class="app-shell">' +
      '<aside class="sidebar" id="sidebar">' +
      '<a class="side-brand" href="#/">' + U.esc(cfg.siteName) + '</a>' +
      '<nav class="side-nav" id="side-nav" aria-label="Main">' + navHtml() + '</nav>' +
      '<div class="side-foot"><div id="side-streak"></div><div id="side-user"></div></div>' +
      '</aside>' +
      '<div class="main-col">' +
      '<main id="view" class="view" tabindex="-1"></main>' +
      '<footer class="site-footer" id="site-footer"><div class="site-footer-inner">' +
      '<span>&copy; ' + year + ' ' + U.esc(cfg.siteName) + '. Free Digital SAT practice.</span>' +
      '<span>Not affiliated with College Board. SAT&reg; is a registered trademark of College Board. &middot; <a href="#/help">Help</a></span>' +
      '</div></footer>' +
      '</div></div>';
  }

  App.refreshNav = function () {
    var nav = document.getElementById('side-nav');
    if (nav) nav.innerHTML = navHtml();
    if (navKey) markNav(navKey);
    if (global.Auth && global.Auth.refresh) global.Auth.refresh();
  };

  App.markNav = function (key) { markNav(key); };

  var navKey = null;
  function markNav(key) {
    navKey = key;
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
    if (!match.exam) refreshSideStreak();
    if (!match.exam) document.title = global.APP_CONFIG.siteName + ' — ' + global.APP_CONFIG.tagline;

    view.innerHTML = '';
    try {
      App.cleanup = global.Views[match.view](view, params, match) || null;
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
    if (global.Auth && global.Auth.refresh) global.Auth.refresh();
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
      // Open the Premium (Advanced) tests this device has keys for
      .then(function () { return global.Premium ? global.Premium.boot() : null; })
      .catch(function (e) { console.error('[Premium]', e); })
      .then(function () {
        window.removeEventListener('error', onErr);
        if (!global.katex) U.toast('Math rendering (KaTeX) failed to load — formulas will appear as code.', 'error', 6000);
        window.addEventListener('hashchange', route);
        // Premium unlocked or locked again: redraw the page (the home page redraws itself in place;
        // a running exam is never interrupted, but a locked one opens once Premium is unlocked)
        if (global.Premium) global.Premium.onChange(function () {
          if (!currentRoute || currentRoute.view === 'home') return;
          if (currentRoute.exam && !document.querySelector('#view [data-premium-locked]')) return;
          route();
        });
        route();
      });
  };

  global.App = App;
})(window);
