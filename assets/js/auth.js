/*
 * Auth for tunn.sat.
 *
 * Header shows "Log in" -> opens a modal with Log in / Sign up tabs.
 *
 * Two providers:
 *  1. Google. Via Google Identity Services (GIS) One Tap, needs
 *     APP_CONFIG.auth.googleClientId. First sign-in creates the account.
 *  2. Email + password. Via Firebase Authentication, needs
 *     APP_CONFIG.auth.firebase (see config.js). Firebase also sends the
 *     "forgot password" reset email to the user's Gmail.
 *
 * Until Firebase is configured, the email forms stay hidden and only the
 * Google button shows. Nothing here throws when a provider is missing.
 */
(function (global) {
  'use strict';

  var U = global.U;
  var LS_KEY = 'tunn.auth.v1';
  var GIS_SRC = 'https://accounts.google.com/gsi/client';
  var FB_APP_SRC = 'https://www.gstatic.com/firebasejs/10.12.5/firebase-app-compat.js';
  var FB_AUTH_SRC = 'https://www.gstatic.com/firebasejs/10.12.5/firebase-auth-compat.js';

  var user = null; // { name, email, picture, sub, iat, provider: 'gis'|'firebase' }
  var listeners = [];
  var gisReady = false, gisLoading = null, gisInitDone = false, gisBtnDone = false;
  var fbAuth = null, fbReady = null;
  var modalOpen = false, activeTab = 'login', resetMode = false;

  function cfg() { return (global.APP_CONFIG && global.APP_CONFIG.auth) || {}; }
  function googleId() { return String(cfg().googleClientId || '').trim(); }
  function fbConfig() { var f = cfg().firebase; return (f && f.apiKey) ? f : null; }
  function emailEnabled() { return !!fbConfig(); }

  function load() {
    try {
      var s = U.lsGet(LS_KEY, null);
      if (s && typeof s === 'object' && typeof s.email === 'string' && typeof s.sub === 'string') { user = s; return s; }
    } catch (e) { /* corrupted: stay logged out */ }
    return null;
  }
  function save(u) { U.lsSet(LS_KEY, u); }
  function clear() { U.lsDel(LS_KEY); }
  function notify() { listeners.slice().forEach(function (fn) { try { fn(user); } catch (e) { console.error(e); } }); }

  function loadScript(src) {
    return new Promise(function (resolve) {
      if (document.querySelector('script[src="' + src + '"]')) return resolve(true);
      var s = document.createElement('script');
      s.src = src; s.async = true;
      s.onload = function () { resolve(true); };
      s.onerror = function () { resolve(false); };
      document.head.appendChild(s);
    });
  }

  /* ---------- Google Identity Services (no Firebase needed) ---------- */

  function decodeJwt(token) {
    var parts = String(token || '').split('.');
    if (parts.length !== 3) return null;
    try {
      var json = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));
      var utf8 = decodeURIComponent(Array.prototype.map.call(json, function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(utf8);
    } catch (e) { return null; }
  }

  function loadGis() {
    if (gisReady) return Promise.resolve(true);
    if (gisLoading) return gisLoading;
    gisLoading = new Promise(function (resolve) {
      var s = document.createElement('script');
      s.src = GIS_SRC; s.async = true; s.defer = true;
      s.onload = function () { gisReady = !!(global.google && global.google.accounts && global.google.accounts.id); resolve(gisReady); };
      s.onerror = function () { resolve(false); };
      document.head.appendChild(s);
      setTimeout(function () { resolve(gisReady); }, 8000);
    });
    return gisLoading;
  }

  function gisInit() {
    if (gisInitDone || !googleId()) return gisReady;
    try {
      global.google.accounts.id.initialize({ client_id: googleId(), callback: handleCredential, auto_select: false, cancel_on_tap_outside: true });
      gisInitDone = true;
    } catch (e) { /* retry next time */ }
    return gisReady;
  }

  function handleCredential(resp) {
    var p = decodeJwt(resp && resp.credential);
    if (!p || !p.sub || !p.email) { U.toast('Google sign-in did not return a profile. Please try again.', 'error'); return; }
    user = { name: p.name || p.email, email: p.email, picture: p.picture || '', sub: 'gis:' + p.sub, iat: Date.now(), provider: 'gis' };
    save(user);
    notify();
    closeModal();
    U.toast('Signed in as ' + user.name + '.', 'success');
    refresh();
    if (global.App && global.App.refreshNav) global.App.refreshNav();
  }

  function renderGisButton() {
    if (gisBtnDone) return;
    var host = document.getElementById('g_id_signin');
    if (!host || !gisInit()) return;
    try {
      global.google.accounts.id.renderButton(host, { theme: 'outline', size: 'large', text: 'continue_with', shape: 'rectangular', width: 300 });
      gisBtnDone = true;
    } catch (e) { /* leave hidden */ }
  }

  /** Pretty custom Google button -> One Tap; falls back to the official button. */
  function startGoogle() {
    if (fbConfig()) { signInGoogleFirebase(); return; }
    loadGis().then(function (ok) {
      var fb = document.getElementById('g_id_fallback');
      function fallback() { if (fb) { fb.hidden = false; renderGisButton(); } }
      if (!ok || !gisInit()) { fallback(); return; }
      try {
        global.google.accounts.id.prompt(function (n) {
          try { if (n.isNotDisplayed() || n.isSkippedMoment()) fallback(); }
          catch (e) { fallback(); }
        });
      } catch (e) { fallback(); }
    });
  }

  /* ---------- Firebase (email/password + Google popup + reset email) ---------- */

  function ensureFirebase() {
    if (fbAuth) return Promise.resolve(fbAuth);
    if (fbReady) return fbReady;
    var fc = fbConfig();
    if (!fc) return Promise.resolve(null);
    fbReady = loadScript(FB_APP_SRC).then(function (ok) {
      return (ok && global.firebase) ? loadScript(FB_AUTH_SRC) : false;
    }).then(function (ok) {
      if (!ok || !global.firebase || !global.firebase.auth) return null;
      try {
        if (!global.firebase.apps || !global.firebase.apps.length) global.firebase.initializeApp(fc);
        fbAuth = global.firebase.auth();
        fbAuth.onAuthStateChanged(onFbUser);
        return fbAuth;
      } catch (e) { console.error(e); return null; }
    });
    return fbReady;
  }

  function onFbUser(u) {
    if (u) {
      user = {
        name: u.displayName || (u.email || '').split('@')[0] || 'Student',
        email: u.email || '', picture: u.photoURL || '',
        sub: 'fb:' + u.uid, iat: Date.now(), provider: 'firebase'
      };
      save(user);
      notify();
      closeModal();
      refresh();
      if (global.App && global.App.refreshNav) global.App.refreshNav();
    } else if (user && user.provider === 'firebase') {
      user = null; clear(); notify(); refresh();
      if (global.App && global.App.refreshNav) global.App.refreshNav();
    }
  }

  function fbError(e) {
    var c = (e && e.code) || '';
    var map = {
      'auth/invalid-email': 'That email address looks invalid.',
      'auth/user-not-found': 'No account found with this email. Try signing up instead.',
      'auth/wrong-password': 'Wrong password. Try again or reset it.',
      'auth/invalid-credential': 'Wrong email or password. Try again or reset it.',
      'auth/email-already-in-use': 'This email is already registered. Try logging in.',
      'auth/weak-password': 'Password must be at least 6 characters.',
      'auth/too-many-requests': 'Too many attempts. Please wait a bit and try again.',
      'auth/network-request-failed': 'Network error. Check your connection and try again.',
      'auth/popup-closed-by-user': null
    };
    if (c in map) return map[c];
    return (e && e.message) || 'Something went wrong. Please try again.';
  }

  function signInGoogleFirebase() {
    ensureFirebase().then(function (a) {
      if (!a) { // SDK failed: fall back to GIS One Tap
        fbBypassGoogle();
        return;
      }
      var provider = new global.firebase.auth.GoogleAuthProvider();
      a.signInWithPopup(provider).catch(function (e) {
        var m = fbError(e);
        if (m) U.toast(m, 'error');
      });
    });
  }

  function fbBypassGoogle() { // Firebase wanted but SDK unavailable -> GIS
    loadGis().then(function (ok) {
      var fb = document.getElementById('g_id_fallback');
      if (!ok || !gisInit()) { if (fb) { fb.hidden = false; renderGisButton(); } return; }
      try {
        global.google.accounts.id.prompt(function (n) {
          try { if ((n.isNotDisplayed() || n.isSkippedMoment()) && fb) { fb.hidden = false; renderGisButton(); } }
          catch (e) { if (fb) { fb.hidden = false; renderGisButton(); } }
        });
      } catch (e) { if (fb) { fb.hidden = false; renderGisButton(); } }
    });
  }

  function emailLogin(form) {
    var email = form.email.value.trim(), pass = form.password.value;
    if (!email || !pass) return;
    setBusy(form, true);
    ensureFirebase().then(function (a) {
      if (!a) { setBusy(form, false); U.toast('Email login is not set up yet.', 'error'); return null; }
      return a.signInWithEmailAndPassword(email, pass);
    }).then(function () { setBusy(form, false); })
      .catch(function (e) { setBusy(form, false); var m = fbError(e); if (m) U.toast(m, 'error'); });
  }

  function emailSignup(form) {
    var name = form.username.value.trim(), email = form.email.value.trim(), pass = form.password.value;
    if (!email || !pass) return;
    setBusy(form, true);
    ensureFirebase().then(function (a) {
      if (!a) { setBusy(form, false); U.toast('Email sign-up is not set up yet.', 'error'); return null; }
      return a.createUserWithEmailAndPassword(email, pass).then(function (cred) {
        if (name && cred && cred.user) return cred.user.updateProfile({ displayName: name });
        return null;
      });
    }).then(function () { setBusy(form, false); U.toast('Account created. Welcome!', 'success'); })
      .catch(function (e) { setBusy(form, false); var m = fbError(e); if (m) U.toast(m, 'error'); });
  }

  function sendReset(form) {
    var email = form.email.value.trim();
    if (!email) return;
    setBusy(form, true);
    ensureFirebase().then(function (a) {
      if (!a) { setBusy(form, false); U.toast('Password reset is not set up yet.', 'error'); return null; }
      return a.sendPasswordResetEmail(email);
    }).then(function (r) {
      setBusy(form, false);
      if (r !== null) {
        U.toast('Reset link sent to ' + email + '. Check your inbox (and spam).', 'success', 6000);
        resetMode = false; renderModal();
      }
    }).catch(function (e) { setBusy(form, false); var m = fbError(e); if (m) U.toast(m, 'error'); });
  }

  function setBusy(form, busy) {
    var btn = form.querySelector('button[type="submit"]');
    if (btn) btn.disabled = busy;
    form.classList.toggle('is-busy', busy);
  }

  /* ---------- Modal UI ---------- */

  var G_LOGO = '<svg class="g-logo" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">' +
    '<path fill="#4285F4" d="M23.5 12.3c0-.9-.1-1.5-.3-2.3H12v4.5h6.5c-.1 1.1-.8 2.7-2.4 3.8l-.1.1 3.5 2.7.2.1c2.2-2 3.8-5 3.8-8.9z"/>' +
    '<path fill="#34A853" d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.8-2.9c-1 .7-2.4 1.2-4.1 1.2-3.1 0-5.8-2.1-6.8-5l-.1.1-3.6 2.8-.1.1C3.5 21.3 7.5 24 12 24z"/>' +
    '<path fill="#FBBC05" d="M5.2 14.4c-.2-.7-.4-1.5-.4-2.4s.1-1.7.4-2.4l-.1-.1-3.6-2.8-.1.1C.5 8.5 0 10.2 0 12s.5 3.5 1.4 5.1l3.8-2.7z"/>' +
    '<path fill="#EA4335" d="M12 4.7c1.8 0 3 .8 3.7 1.4l3.3-3.2C17.9 1.1 15.2 0 12 0 7.5 0 3.5 2.7 1.4 6.9l3.8 2.9c1-2.9 3.6-5.1 6.8-5.1z"/>' +
    '</svg>';

  function googleBtn(label) {
    return '<button type="button" class="g-btn" data-auth-google>' + G_LOGO + '<span>' + U.esc(label) + '</span></button>' +
      '<div id="g_id_fallback" class="g-fallback" hidden><div id="g_id_signin"></div></div>';
  }

  function emailForms() {
    if (!emailEnabled()) {
      return '<p class="auth-note muted">Prefer email? Email sign-in is coming soon.</p>';
    }
    if (activeTab === 'login' && !resetMode) {
      return '<div class="auth-divider"><span>or</span></div>' +
        '<form id="auth-login-form" class="auth-form" autocomplete="on">' +
        '<input type="email" name="email" placeholder="Email address" required autocomplete="email">' +
        '<input type="password" name="password" placeholder="Password" required autocomplete="current-password">' +
        '<button type="submit" class="btn btn--primary btn--block">Log in</button>' +
        '</form>' +
        '<p class="auth-links"><button type="button" class="link" data-auth-forgot>Forgot password?</button></p>';
    }
    if (activeTab === 'login' && resetMode) {
      return '<div class="auth-divider"><span>reset password</span></div>' +
        '<form id="auth-reset-form" class="auth-form">' +
        '<p class="auth-note">Enter your account email and we will send you a reset link.</p>' +
        '<input type="email" name="email" placeholder="Email address" required autocomplete="email">' +
        '<button type="submit" class="btn btn--primary btn--block">Send reset link</button>' +
        '</form>' +
        '<p class="auth-links"><button type="button" class="link" data-auth-back>&larr; Back to log in</button></p>';
    }
    return '<div class="auth-divider"><span>or</span></div>' +
      '<form id="auth-signup-form" class="auth-form" autocomplete="on">' +
      '<input type="text" name="username" placeholder="Your name" required autocomplete="name">' +
      '<input type="email" name="email" placeholder="Email address" required autocomplete="email">' +
      '<input type="password" name="password" placeholder="Password (min. 6 characters)" required minlength="6" autocomplete="new-password">' +
      '<button type="submit" class="btn btn--primary btn--block">Create account</button>' +
      '</form>';
  }

  function modalHtml() {
    var isLogin = activeTab === 'login';
    return '<div class="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-title">' +
      '<button type="button" class="auth-modal-close" data-auth-close aria-label="Close">&times;</button>' +
      '<div class="auth-tabs" role="tablist">' +
      '<button type="button" role="tab" data-auth-tab="login" class="' + (isLogin ? 'active' : '') + '">Log in</button>' +
      '<button type="button" role="tab" data-auth-tab="signup" class="' + (!isLogin ? 'active' : '') + '">Sign up</button>' +
      '</div>' +
      '<h2 id="auth-title">' + (isLogin ? 'Welcome back' : 'Create your account') + '</h2>' +
      '<p class="auth-sub">' + (isLogin ? 'Log in to keep your streak and results.' : 'Free forever. One account for all your practice.') + '</p>' +
      googleBtn(isLogin ? 'Continue with Google' : 'Sign up with Google') +
      emailForms() +
      '<p class="auth-switch">' + (isLogin
        ? 'New to tunn.sat? <button type="button" class="link" data-auth-tab="signup">Create an account</button>'
        : 'Already have an account? <button type="button" class="link" data-auth-tab="login">Log in</button>') + '</p>' +
      '</div>';
  }

  function ensureModal() {
    var back = document.getElementById('auth-backdrop');
    if (!back) {
      back = document.createElement('div');
      back.className = 'auth-backdrop';
      back.id = 'auth-backdrop';
      back.hidden = true;
      document.body.appendChild(back);
    }
    return back;
  }

  function renderModal() {
    var back = ensureModal();
    back.innerHTML = modalHtml();
  }

  function openModal(tab) {
    activeTab = tab || 'login';
    resetMode = false;
    renderModal();
    var back = ensureModal();
    back.hidden = false;
    document.body.classList.add('no-scroll');
    modalOpen = true;
    var first = back.querySelector('.g-btn');
    if (first) first.focus();
  }

  function closeModal() {
    var back = document.getElementById('auth-backdrop');
    if (back) back.hidden = true;
    document.body.classList.remove('no-scroll');
    modalOpen = false;
  }

  /* ---------- Header ---------- */

  function headerHtml() {
    return '<span class="nav-auth" id="nav-auth"></span>';
  }

  /** Sidebar user row: avatar + name with a sign-out menu, or a Log in button. */
  function sideUserHtml() {
    if (user) {
      var pic = user.picture
        ? '<img class="side-avatar" src="' + U.esc(user.picture) + '" alt="" width="32" height="32" referrerpolicy="no-referrer">'
        : '<span class="side-avatar side-avatar--initial">' + U.esc((user.name || 'U').charAt(0).toUpperCase()) + '</span>';
      return '<div class="side-user-wrap">' +
        '<button type="button" class="side-user" data-auth-menu aria-haspopup="true" aria-expanded="false">' + pic +
        '<span class="side-user-name">' + U.esc(user.name) + '</span></button>' +
        '<div class="auth-menu side-auth-menu" hidden>' +
        '<div class="auth-menu-head"><b>' + U.esc(user.name) + '</b><span class="muted">' + U.esc(user.email) + '</span></div>' +
        '<button type="button" data-auth-signout>Sign out</button>' +
        '</div></div>';
    }
    return '<button type="button" class="side-login" data-auth-open>Log in</button>';
  }

  function refresh() {
    var su = document.getElementById('side-user');
    if (su) su.innerHTML = sideUserHtml();
    var el = document.getElementById('nav-auth');
    if (!el) return;
    if (user) {
      var pic = user.picture
        ? '<img class="auth-avatar" src="' + U.esc(user.picture) + '" alt="" width="28" height="28" referrerpolicy="no-referrer">'
        : '<span class="auth-avatar auth-avatar--initial">' + U.esc((user.name || 'U').charAt(0).toUpperCase()) + '</span>';
      el.innerHTML =
        '<div class="auth-user">' +
        '<button type="button" class="auth-user-btn" data-auth-menu aria-haspopup="true" aria-expanded="false">' + pic +
        '<span class="auth-name">' + U.esc(user.name) + '</span></button>' +
        '<div class="auth-menu" hidden>' +
        '<div class="auth-menu-head"><b>' + U.esc(user.name) + '</b><span class="muted">' + U.esc(user.email) + '</span></div>' +
        '<button type="button" data-auth-signout>Sign out</button>' +
        '</div></div>';
    } else {
      el.innerHTML = '<button type="button" class="btn btn--sm" data-auth-open>Log in</button>';
    }
  }

  function signOut() {
    var done = function () {
      user = null; clear(); notify(); refresh();
      U.toast('Signed out.', 'info');
      if (global.App && global.App.refreshNav) global.App.refreshNav();
    };
    try {
      if (user && user.provider === 'firebase' && fbAuth) { fbAuth.signOut().then(done, done); return; }
    } catch (e) { /* fall through */ }
    try {
      if (gisReady && global.google && global.google.accounts && global.google.accounts.id) {
        global.google.accounts.id.disableAutoSelect();
      }
    } catch (e) { /* best effort */ }
    done();
  }

  /* ---------- Events ---------- */

  document.addEventListener('click', function (e) {
    if (!e.target || !e.target.closest) return;
    var t = e.target;

    var opener = t.closest('[data-auth-open]');
    if (opener) { openModal('login'); return; }

    var closer = t.closest('[data-auth-close]');
    if (closer) { closeModal(); return; }

    var back = t.closest('#auth-backdrop');
    if (back && t === back) { closeModal(); return; }

    var tab = t.closest('[data-auth-tab]');
    if (tab) { openModal(tab.getAttribute('data-auth-tab')); return; }

    if (t.closest('[data-auth-google]')) { startGoogle(); return; }

    if (t.closest('[data-auth-forgot]')) { resetMode = true; renderModal(); return; }
    if (t.closest('[data-auth-back]')) { resetMode = false; renderModal(); return; }

    var menuBtn = t.closest('[data-auth-menu]');
    if (menuBtn) {
      var menu = menuBtn.parentNode.querySelector('.auth-menu');
      var open = menu.hidden;
      U.$$('.auth-menu').forEach(function (m) { m.hidden = true; });
      U.$$('[data-auth-menu]').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
      menu.hidden = !open;
      menuBtn.setAttribute('aria-expanded', String(open));
      return;
    }
    if (t.closest('[data-auth-signout]')) { signOut(); return; }

    if (!t.closest('.auth-user')) {
      U.$$('.auth-menu').forEach(function (m) { m.hidden = true; });
      U.$$('[data-auth-menu]').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
    }
  });

  document.addEventListener('submit', function (e) {
    var f = e.target;
    if (!f || !f.id) return;
    if (f.id === 'auth-login-form') { e.preventDefault(); emailLogin(f); }
    else if (f.id === 'auth-signup-form') { e.preventDefault(); emailSignup(f); }
    else if (f.id === 'auth-reset-form') { e.preventDefault(); sendReset(f); }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (modalOpen) closeModal();
      U.$$('.auth-menu').forEach(function (m) { m.hidden = true; });
      U.$$('[data-auth-menu]').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
    }
  });

  // Warm up Firebase in the background when configured (so the popup is instant)
  try {
    if (fbConfig()) {
      if (document.readyState === 'complete') ensureFirebase();
      else window.addEventListener('load', function () { ensureFirebase(); });
    }
  } catch (e) { /* non-fatal */ }

  load();

  global.Auth = {
    user: function () { return user; },
    signedIn: function () { return !!user; },
    enabled: function () { return !!(googleId() || fbConfig()); },
    headerHtml: headerHtml,
    refresh: refresh,
    signOut: signOut,
    openModal: openModal,
    onChange: function (fn) {
      listeners.push(fn);
      return function () { listeners = listeners.filter(function (f) { return f !== fn; }); };
    }
  };
})(window);
