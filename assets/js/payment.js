/*
 * Premium by bank transfer (VietQR): the Premium card of the Practice Tests page, the plan picker, the QR
 * code, waiting for the payment and turning Premium on by itself on this device.
 *
 * The server (tools/premium/server/Code.gs) makes an order bound to this device's key; the payment reference
 * (TUNNXXXXXXXX) goes in the transfer content. When the money arrives (SePay webhook, or the owner marks
 * the order paid), "orderStatus" answers this device with a new code, which is activated the usual way.
 * The order in progress is kept in localStorage, so closing the dialog or the tab does not lose it.
 */
(function (global) {
  'use strict';

  var U = global.U;
  var LS_ORDER = 'tunn.order.v1';
  var POLL_OPEN = 4000;            // while the QR dialog is open
  var POLL_BACKGROUND = 20000;     // dialog closed, page visible
  var POLL_HIDDEN = 60000;         // tab in the background
  var KEEP_MS = 48 * 3600000;      // stop waiting for an order after this (a late payment still counts on the server)

  var timer = null;
  var busy = false;
  var dialog = null;               // { body } while the dialog is open

  function cfg() { var p = (global.APP_CONFIG && global.APP_CONFIG.premium) || {}; return p.payment || {}; }
  function plans() {
    return (cfg().plans || []).filter(function (p) { return p && p.id && +p.price > 0; });
  }
  function P() { return global.Premium; }
  function enabled() {
    return !!(P() && P().available() && String(cfg().account || '').trim() && plans().length);
  }
  function money(n) {
    return String(Math.round(+n || 0)).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ';
  }
  function planOf(id) { return plans().filter(function (p) { return p.id === id; })[0] || null; }

  function pending() {
    var o = U.lsGet(LS_ORDER, null);
    if (!o || typeof o !== 'object' || typeof o.order !== 'string') return null;
    if (Date.now() - (+o.createdAt || 0) > KEEP_MS) { U.lsDel(LS_ORDER); return null; }
    return o;
  }

  function lockedStubs() {
    var Lib = global.SATLibrary;
    return Lib && Lib.premiumStubs ? Lib.premiumStubs().filter(function (s) { return Lib.isLocked(s.id); }) : [];
  }

  /** "12 Practice Tests", "5 Elite Tests"… for the locked Premium tests. */
  function includedLines() {
    var names = { '': 'Practice Test', challenge: 'Elite Test', topic: 'Topic Test', advanced: 'Advanced Test' };
    var order = ['', 'challenge', 'topic', 'advanced'];
    var n = {};
    lockedStubs().forEach(function (s) { var k = names[s.section] ? s.section : ''; n[k] = (n[k] || 0) + 1; });
    return order.filter(function (k) { return n[k]; }).map(function (k) {
      return n[k] + ' ' + names[k] + (n[k] === 1 ? '' : 's') + (k === '' ? ' (2026)' : '');
    });
  }

  function qrUrl(o) {
    var c = cfg();
    return 'https://img.vietqr.io/image/' + encodeURIComponent(c.bank || 'MB') + '-' + encodeURIComponent(String(c.account).trim()) +
      '-compact2.png?amount=' + encodeURIComponent(Math.round(o.amount)) + '&addInfo=' + encodeURIComponent(o.order) +
      '&accountName=' + encodeURIComponent(c.accountName || '');
  }

  function fmtDay(iso) {
    var d = iso ? new Date(iso) : null;
    return d && !isNaN(d) ? d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';
  }

  /* ---------------- The card in the right column ---------------- */

  function cardHtml() {
    if (!P()) return '';
    var st = P().state();
    if (st.active) {
      return '<section class="pp-side-card pp-prem is-active" id="pp-premium" aria-label="Premium">' +
        '<div class="pp-prem-label">' + U.icon('sparkles') + 'PREMIUM</div>' +
        '<div class="pp-prem-title">Premium is active</div>' +
        '<p class="pp-prem-sub">' + (st.expires ? 'Valid until ' + U.esc(fmtDay(st.expires)) : 'No end date') + '</p>' +
        '<button type="button" class="pp-prem-link" data-premium-manage>Details</button></section>';
    }
    var lines = includedLines();
    if (!lines.length) return '';
    var o = pending();
    var cheapest = plans().reduce(function (m, p) { return m === null || +p.price < m ? +p.price : m; }, null);
    var action;
    if (o && enabled()) {
      action = '<button type="button" class="pp-prem-btn is-wait" data-pay-resume><span class="pp-prem-dot"></span>Waiting for payment · Show QR</button>';
    } else if (enabled()) {
      action = '<button type="button" class="pp-prem-btn" data-pay>' + U.esc(cfg().buttonLabel || 'Pay now') + '</button>';
    } else if (P().available()) {
      action = '<button type="button" class="pp-prem-btn" data-premium-unlock>Enter code</button>';
    } else {
      action = '<p class="pp-prem-sub">Premium codes are coming soon.</p>';
    }
    var total = lockedStubs().length;
    return '<section class="pp-side-card pp-prem" id="pp-premium" aria-label="Premium">' +
      '<span class="pp-prem-deco" aria-hidden="true"></span>' +
      '<div class="pp-prem-label">' + U.icon('sparkles') + 'PREMIUM</div>' +
      '<div class="pp-prem-title">Unlock ' + total + ' more test' + (total === 1 ? '' : 's') + '</div>' +
      '<ul class="pp-prem-list">' + lines.map(function (l) { return '<li>' + U.icon('check') + U.esc(l) + '</li>'; }).join('') + '</ul>' +
      (enabled() && cheapest ? '<p class="pp-prem-price">From <b>' + money(cheapest) + '</b></p>' : '') +
      action +
      (enabled() ? '<button type="button" class="pp-prem-link" data-premium-unlock>Have a code? Enter it</button>' : '') +
      '</section>';
  }

  function refreshCard() {
    var el = document.getElementById('pp-premium');
    if (!el) return;
    var html = cardHtml();
    if (html) el.outerHTML = html; else el.remove();
  }

  /* ---------------- Dialog ---------------- */

  function open() {
    if (!enabled()) return;
    if (dialog) return;
    var body = document.createElement('div');
    body.className = 'pay';
    dialog = { body: body };
    U.modal({ title: 'Get Premium', body: body, className: 'pay-modal' }).then(function () {
      dialog = null;
      refreshCard();
      schedule();
    });
    body.addEventListener('click', onDialogClick);
    var o = pending();
    if (o) { renderQr(o); checkSoon(); } else renderPlans(plans()[0].id);
  }

  function closeDialog() {
    if (!dialog) return;
    var x = dialog.body.closest('.modal');
    var btn = x && x.querySelector('[data-modal-close]');
    if (btn) btn.click();
  }

  function renderPlans(selected) {
    if (!dialog) return;
    var lines = includedLines();
    dialog.body.innerHTML =
      '<p class="pay-lead">Pay by bank transfer. Premium turns on by itself on this device a few seconds after the money arrives.</p>' +
      '<div class="pay-plans" role="radiogroup" aria-label="Plan">' + plans().map(function (p) {
        var on = p.id === selected;
        var per = p.days >= 60 ? '<em>' + money(Math.round(p.price / (p.days / 30) / 1000) * 1000) + ' / month</em>' : '<em>' + (p.days || 30) + ' days</em>';
        return '<button type="button" role="radio" aria-checked="' + on + '" class="pay-plan' + (on ? ' is-on' : '') + '" data-plan="' + U.esc(p.id) + '">' +
          '<span class="pay-plan-name">' + U.esc(p.label || p.id) + '</span><b>' + money(p.price) + '</b>' + per + '</button>';
      }).join('') + '</div>' +
      (lines.length ? '<ul class="pay-inc">' + lines.map(function (l) { return '<li>' + U.icon('check') + U.esc(l) + '</li>'; }).join('') + '</ul>' : '') +
      '<button type="button" class="btn btn--primary btn--block" data-pay-create="' + U.esc(selected) + '">Continue to payment</button>' +
      '<p class="pay-err" role="alert" hidden></p>' +
      '<p class="pay-fine">The days count from the moment Premium turns on. Premium works on this device.</p>';
  }

  function renderQr(o) {
    if (!dialog) return;
    var c = cfg();
    var plan = planOf(o.plan);
    dialog.body.innerHTML =
      '<div class="pay-qr-wrap"><img class="pay-qr" src="' + U.esc(qrUrl(o)) + '" alt="VietQR code: pay ' + U.esc(money(o.amount)) + ' with the content ' + U.esc(o.order) + '" width="260" height="290"></div>' +
      '<p class="pay-scan">Scan with your banking app, or transfer by hand:</p>' +
      '<dl class="pay-info">' +
      row('Bank', U.esc(c.bankName || c.bank || '')) +
      row('Account', '<b>' + U.esc(String(c.account).trim()) + '</b>', String(c.account).trim()) +
      (c.accountName ? row('Name', U.esc(c.accountName)) : '') +
      row('Amount', '<b>' + money(o.amount) + '</b>' + (plan ? ' <span class="pay-plan-tag">' + U.esc(plan.label) + '</span>' : ''), String(Math.round(o.amount))) +
      row('Content', '<b class="pay-ref">' + U.esc(o.order) + '</b>', o.order, true) +
      '</dl>' +
      '<p class="pay-note">' + U.icon('info') + '<span>Type the <b>content</b> exactly as shown, and pay the full amount. Without it the payment cannot be matched.</span></p>' +
      '<div class="pay-wait" role="status"><span class="pay-spin" aria-hidden="true"></span><span>Waiting for your payment…</span></div>' +
      '<p class="pay-err" role="alert" hidden></p>' +
      '<div class="pay-foot"><button type="button" class="btn btn--ghost btn--sm" data-pay-other>Choose another plan</button>' +
      '<button type="button" class="btn btn--ghost btn--sm" data-pay-check>I have paid</button></div>';

    function row(label, valueHtml, copy, key) {
      return '<div class="pay-row' + (key ? ' is-key' : '') + '"><dt>' + label + '</dt><dd>' + valueHtml +
        (copy ? ' <button type="button" class="pay-copy" data-copy="' + U.esc(copy) + '" aria-label="Copy ' + label.toLowerCase() + '">' + U.icon('copy') + '</button>' : '') + '</dd></div>';
    }
  }

  function renderDone(code, expires) {
    if (!dialog) return;
    dialog.body.innerHTML =
      '<div class="pay-done"><span class="pay-done-icon">' + U.icon('check') + '</span>' +
      '<h3>Premium is active!</h3>' +
      '<p>All Premium tests are open on this device' + (expires ? ' until ' + U.esc(fmtDay(expires)) : '') + '.</p>' +
      '<div class="pay-code"><span>Your code</span><b>' + U.esc(code) + '</b><button type="button" class="pay-copy" data-copy="' + U.esc(code) + '" aria-label="Copy code">' + U.icon('copy') + '</button></div>' +
      '<p class="pay-fine">Keep this code. If this browser’s data is cleared, enter it again to get Premium back.</p>' +
      '<button type="button" class="btn btn--primary btn--block" data-pay-close>Start practising</button></div>';
  }

  function renderCodeOnly(code, message) {
    if (!dialog) return;
    dialog.body.innerHTML =
      '<div class="pay-done"><span class="pay-done-icon is-warn">' + U.icon('warn') + '</span>' +
      '<h3>Payment received</h3>' +
      '<p>' + U.esc(message || 'Premium could not be turned on by itself.') + ' Enter this code to turn it on:</p>' +
      '<div class="pay-code"><span>Your code</span><b>' + U.esc(code) + '</b><button type="button" class="pay-copy" data-copy="' + U.esc(code) + '" aria-label="Copy code">' + U.icon('copy') + '</button></div>' +
      '<button type="button" class="btn btn--primary btn--block" data-pay-enter>Enter the code</button></div>';
  }

  function showError(text) {
    var el = dialog && dialog.body.querySelector('.pay-err');
    if (!el) return;
    el.textContent = text;
    el.hidden = !text;
  }

  function errorMessage(r) {
    if (r && r.message) return r.message;
    if (r && r.error === 'network') return 'Could not reach the server. Check your internet connection and try again.';
    if (r && (r.error === 'storage' || r.error === 'nocrypto')) return 'This browser cannot keep Premium (private mode or blocked site data). Open tunn.sat in a normal browser window.';
    return 'Something went wrong. Please try again.';
  }

  function onDialogClick(e) {
    var t = e.target;
    var plan = t.closest('[data-plan]');
    if (plan) { renderPlans(plan.getAttribute('data-plan')); return; }
    var create = t.closest('[data-pay-create]');
    if (create) { createOrder(create.getAttribute('data-pay-create'), create); return; }
    var copy = t.closest('[data-copy]');
    if (copy) { copyText(copy.getAttribute('data-copy')); return; }
    if (t.closest('[data-pay-other]')) { U.lsDel(LS_ORDER); stop(); renderPlans(plans()[0].id); return; }
    if (t.closest('[data-pay-check]')) { checkSoon(true); return; }
    if (t.closest('[data-pay-close]')) { closeDialog(); return; }
    if (t.closest('[data-pay-enter]')) { closeDialog(); setTimeout(function () { if (P().openUnlock) P().openUnlock(); }, 220); }
  }

  function createOrder(planId, btn) {
    if (busy) return;
    var plan = planOf(planId);
    if (!plan) return;
    busy = true;
    btn.disabled = true;
    btn.textContent = 'Creating your order…';
    showError('');
    P().order(plan.id).then(function (r) {
      busy = false;
      if (!r.ok || !r.order) {
        btn.disabled = false;
        btn.textContent = 'Continue to payment';
        showError(errorMessage(r));
        return;
      }
      var o = { order: r.order, plan: r.plan || plan.id, amount: +r.amount || plan.price, days: +r.days || plan.days, createdAt: Date.now(), expiresAt: r.expiresAt || null };
      U.lsSet(LS_ORDER, o);
      renderQr(o);
      refreshCard();
      schedule();
    });
  }

  function copyText(text) {
    var done = function () { U.toast('Copied: ' + text, 'success', 2000); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { U.toast(text, 'info', 6000); });
    } else {
      U.toast(text, 'info', 6000);
    }
  }

  /* ---------------- Waiting for the payment ---------------- */

  function stop() { if (timer) { clearTimeout(timer); timer = null; } }

  function schedule() {
    stop();
    if (!pending() || !enabled()) return;
    var delay = dialog ? POLL_OPEN : (document.hidden ? POLL_HIDDEN : POLL_BACKGROUND);
    timer = setTimeout(check, delay);
  }

  function checkSoon(manual) {
    stop();
    timer = setTimeout(function () { check(manual); }, manual ? 0 : 600);
  }

  function check(manual) {
    timer = null;
    var o = pending();
    if (!o) return;
    if (busy) { schedule(); return; }
    busy = true;
    P().orderStatus(o.order).then(function (r) {
      busy = false;
      if (r.ok && r.status === 'paid' && r.code) return onPaid(o, r.code);
      if ((r.ok && r.status === 'cancelled') || (!r.ok && r.error === 'notfound')) {
        U.lsDel(LS_ORDER);
        refreshCard();
        if (dialog) { renderPlans(plans()[0].id); showError(r.ok ? 'This order was cancelled. Please start again.' : errorMessage(r)); }
        return;
      }
      if (manual && dialog) showError(r.ok ? 'Not received yet. Bank transfers usually arrive within a minute: this page keeps checking.' : errorMessage(r));
      schedule();
    });
  }

  function onPaid(o, code) {
    stop();
    return P().activate(code).then(function (res) {
      U.lsDel(LS_ORDER);
      if (res.ok) {
        if (dialog) renderDone(code, res.expires);
        else U.toast('Payment received: Premium is active! Your code: ' + code, 'success', 10000);
      } else {
        var msg = P().errorText ? stripTags(P().errorText(res, true)) : '';
        if (!dialog) open();
        renderCodeOnly(code, msg);
      }
      refreshCard();
    });
  }

  function stripTags(s) { var d = document.createElement('div'); d.innerHTML = String(s || ''); return d.textContent || ''; }

  /** After start-up: keep waiting for an order made earlier (the tab may have been closed). */
  function resume() {
    if (pending()) checkSoon();
  }

  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-pay], [data-pay-resume]')) open();
  });
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden && pending()) checkSoon();
  });

  global.Payment = {
    cardHtml: cardHtml,
    refreshCard: refreshCard,
    open: open,
    resume: resume,
    enabled: enabled
  };
})(window);
