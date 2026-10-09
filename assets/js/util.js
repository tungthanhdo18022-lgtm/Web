/* Shared helpers: DOM, formatting, modal, toast, icons. */
(function (global) {
  'use strict';

  var U = {};

  U.$ = function (sel, root) { return (root || document).querySelector(sel); };
  U.$$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  var ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  U.esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return ESC[c]; });
  };

  U.uid = function (prefix) {
    return (prefix || '') + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  };

  U.slug = function (s) {
    var base = String(s || '')
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/đ/g, 'd').replace(/Đ/g, 'D')
      .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
      .slice(0, 48);
    return base || 'de-thi';
  };

  U.clamp = function (v, min, max) { return Math.min(max, Math.max(min, v)); };

  /** Formats seconds as m:ss or h:mm:ss */
  U.fmtClock = function (sec) {
    sec = Math.max(0, Math.round(sec));
    var h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
    var mm = (h ? String(m).padStart(2, '0') : String(m)), ss = String(s).padStart(2, '0');
    return (h ? h + ':' : '') + mm + ':' + ss;
  };

  /** "1 hr 5 min", "12 min 3 sec" */
  U.fmtDuration = function (sec) {
    sec = Math.max(0, Math.round(sec));
    var h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
    var parts = [];
    if (h) parts.push(h + ' hr');
    if (m) parts.push(m + ' min');
    if (!h && (s || !m)) parts.push(s + ' sec');
    return parts.join(' ');
  };

  U.fmtDate = function (ts) {
    if (!ts) return '';
    try {
      return new Date(ts).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
    } catch (e) { return new Date(ts).toISOString(); }
  };

  U.debounce = function (fn, ms) {
    var t;
    return function () {
      var args = arguments, self = this;
      clearTimeout(t);
      t = setTimeout(function () { fn.apply(self, args); }, ms);
    };
  };

  U.download = function (filename, content, mime) {
    var blob = content instanceof Blob ? content : new Blob([content], { type: mime || 'text/plain;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = filename; a.rel = 'noopener';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
  };

  U.readFile = function (file, as) {
    return new Promise(function (resolve, reject) {
      var r = new FileReader();
      r.onload = function () { resolve(r.result); };
      r.onerror = function () { reject(r.error || new Error('Could not read the file')); };
      if (as === 'dataurl') r.readAsDataURL(file); else r.readAsText(file, 'utf-8');
    });
  };

  U.pickFile = function (accept, multiple) {
    return new Promise(function (resolve) {
      var input = document.createElement('input');
      input.type = 'file';
      if (accept) input.accept = accept;
      input.multiple = !!multiple;
      input.style.display = 'none';
      input.addEventListener('change', function () {
        var files = Array.prototype.slice.call(input.files || []);
        input.remove();
        resolve(files);
      });
      document.body.appendChild(input);
      input.click();
    });
  };

  U.loadScript = function (src, timeoutMs) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      var done = false;
      var timer = setTimeout(function () {
        if (done) return; done = true; reject(new Error('Timed out loading ' + src));
      }, timeoutMs || 20000);
      s.src = src; s.async = true;
      s.onload = function () { if (done) return; done = true; clearTimeout(timer); resolve(); };
      s.onerror = function () { if (done) return; done = true; clearTimeout(timer); s.remove(); reject(new Error('Could not load ' + src)); };
      document.head.appendChild(s);
    });
  };

  /* ---------------- Icons (inline SVG) ---------------- */
  var ICONS = {
    calculator: '<rect x="5" y="2.5" width="14" height="19" rx="2.2"/><rect x="8" y="5.5" width="8" height="3.5" rx=".6"/><circle cx="8.6" cy="12.6" r=".9" fill="currentColor" stroke="none"/><circle cx="12" cy="12.6" r=".9" fill="currentColor" stroke="none"/><circle cx="15.4" cy="12.6" r=".9" fill="currentColor" stroke="none"/><circle cx="8.6" cy="15.9" r=".9" fill="currentColor" stroke="none"/><circle cx="12" cy="15.9" r=".9" fill="currentColor" stroke="none"/><circle cx="15.4" cy="15.9" r=".9" fill="currentColor" stroke="none"/><circle cx="8.6" cy="19" r=".9" fill="currentColor" stroke="none"/><circle cx="12" cy="19" r=".9" fill="currentColor" stroke="none"/><circle cx="15.4" cy="19" r=".9" fill="currentColor" stroke="none"/>',
    reference: '<path d="M6 2.5h8.5L19 7v14.5H6z"/><path d="M14.5 2.5V7H19"/><text x="12.4" y="17.6" text-anchor="middle" font-size="8.5" font-family="Georgia,serif" font-style="italic" stroke="none" fill="currentColor">x²</text>',
    more: '<circle cx="12" cy="5" r="1.6" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="12" cy="19" r="1.6" fill="currentColor" stroke="none"/>',
    bookmark: '<path d="M6.5 3h11v18l-5.5-4-5.5 4z"/>',
    bookmarkFill: '<path d="M6.5 3h11v18l-5.5-4-5.5 4z" fill="currentColor"/>',
    chevronDown: '<path d="M6 9l6 6 6-6"/>',
    chevronUp: '<path d="M6 15l6-6 6 6"/>',
    chevronLeft: '<path d="M15 6l-6 6 6 6"/>',
    chevronRight: '<path d="M9 6l6 6-6 6"/>',
    pin: '<path d="M12 21s-6.5-6.1-6.5-11A6.5 6.5 0 0 1 18.5 10c0 4.9-6.5 11-6.5 11z" fill="currentColor"/><circle cx="12" cy="10" r="2.4" fill="#fff" stroke="none"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 2"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    check: '<path d="M4.5 12.5l5 5 10-11"/>',
    cross: '<path d="M7 7l10 10M17 7L7 17"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    upload: '<path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 15v4.5h16V15"/>',
    download: '<path d="M12 4v12M7 11l5 5 5-5"/><path d="M4 15v4.5h16V15"/>',
    edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>',
    trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
    play: '<path d="M7 4.5v15l12-7.5z" fill="currentColor"/>',
    book: '<path d="M4 4.5h6a2 2 0 0 1 2 2V20a2 2 0 0 0-2-2H4z"/><path d="M20 4.5h-6a2 2 0 0 0-2 2V20a2 2 0 0 1 2-2h6z"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8"/>',
    image: '<rect x="3.5" y="4.5" width="17" height="15" rx="2"/><circle cx="9" cy="10" r="1.8"/><path d="M20.5 16l-5-5-8.5 8.5"/>',
    table: '<rect x="3.5" y="4.5" width="17" height="15" rx="1.5"/><path d="M3.5 9.5h17M3.5 14.5h17M9.5 4.5v15M15 4.5v15"/>',
    sigma: '<path d="M17.5 5H6.5l6 7-6 7h11"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
    eyeOff: '<path d="M3 3l18 18"/><path d="M10.6 6.1A9.6 9.6 0 0 1 12 6c6 0 9.5 6 9.5 6a16 16 0 0 1-3 3.6M6.3 7.6A16 16 0 0 0 2.5 12S6 18 12 18a9.4 9.4 0 0 0 4.3-1"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',
    expand: '<path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7"/>',
    collapse: '<path d="M20 10h-6V4M4 14h6v6M14 10l7-7M10 14l-7 7"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.3a2.6 2.6 0 1 1 3.6 2.4c-.7.3-1.1.9-1.1 1.6v.7"/><circle cx="12" cy="17" r=".6" fill="currentColor"/>',
    file: '<path d="M6 2.5h8.5L19 7v14.5H6z"/><path d="M14.5 2.5V7H19"/>',
    logout: '<path d="M14 4h5v16h-5"/><path d="M10 8l-4 4 4 4M6 12h10"/>',
    send: '<path d="M4 12l16-8-6 16-2.5-6.5z"/>',
    refresh: '<path d="M20 11a8 8 0 0 0-14.3-4.6L4 8"/><path d="M4 3.5V8h4.5"/><path d="M4 13a8 8 0 0 0 14.3 4.6L20 16"/><path d="M20 20.5V16h-4.5"/>',
    grid: '<rect x="4" y="4" width="6.5" height="6.5" rx="1"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1"/>',
    history: '<path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1L3.5 8.5"/><path d="M3.5 4v4.5H8"/><path d="M12 7.5V12l3 2"/>',
    sparkles: '<path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/><path d="M18.5 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/>',
    flag: '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
    drag: '<circle cx="9" cy="6" r="1.2" fill="currentColor" stroke="none"/><circle cx="15" cy="6" r="1.2" fill="currentColor" stroke="none"/><circle cx="9" cy="12" r="1.2" fill="currentColor" stroke="none"/><circle cx="15" cy="12" r="1.2" fill="currentColor" stroke="none"/><circle cx="9" cy="18" r="1.2" fill="currentColor" stroke="none"/><circle cx="15" cy="18" r="1.2" fill="currentColor" stroke="none"/>',
    code: '<path d="M8.5 7L3.5 12l5 5M15.5 7l5 5-5 5"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6"/><circle cx="12" cy="7.6" r=".7" fill="currentColor"/>',
    warn: '<path d="M12 3.5l9.5 16.5h-19z"/><path d="M12 10v4.5"/><circle cx="12" cy="17.2" r=".7" fill="currentColor"/>'
  };

  U.icon = function (name, cls) {
    var body = ICONS[name] || '';
    return '<svg class="ico' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + body + '</svg>';
  };

  /* ---------------- Toast ---------------- */
  U.toast = function (message, type, ms) {
    var host = document.getElementById('toast-host');
    if (!host) {
      host = document.createElement('div');
      host.id = 'toast-host';
      host.setAttribute('role', 'status');
      host.setAttribute('aria-live', 'polite');
      document.body.appendChild(host);
    }
    var t = document.createElement('div');
    t.className = 'toast toast--' + (type || 'info');
    t.innerHTML = U.icon(type === 'error' ? 'warn' : type === 'success' ? 'check' : 'info') + '<span>' + U.esc(message) + '</span>';
    host.appendChild(t);
    requestAnimationFrame(function () { t.classList.add('is-in'); });
    setTimeout(function () {
      t.classList.remove('is-in');
      setTimeout(function () { t.remove(); }, 300);
    }, ms || 3200);
  };

  /* ---------------- Modal ---------------- */
  /**
   * U.modal({ title, body (HTML string | Node), actions: [{label, value, kind}], dismissible, wide, className })
   * Resolves with the clicked action's `value` (or null when dismissed).
   */
  U.modal = function (opts) {
    opts = opts || {};
    return new Promise(function (resolve) {
      var prevFocus = document.activeElement;
      var overlay = document.createElement('div');
      overlay.className = 'modal-overlay' + (opts.className ? ' ' + opts.className : '');
      var box = document.createElement('div');
      box.className = 'modal' + (opts.wide ? ' modal--wide' : '');
      box.setAttribute('role', 'dialog');
      box.setAttribute('aria-modal', 'true');
      var titleId = U.uid('mt-');
      if (opts.title) box.setAttribute('aria-labelledby', titleId);

      var html = '';
      if (opts.title) {
        html += '<div class="modal-head"><h2 id="' + titleId + '">' + U.esc(opts.title) + '</h2>';
        if (opts.dismissible !== false) html += '<button class="icon-btn modal-x" data-modal-close aria-label="Close">' + U.icon('close') + '</button>';
        html += '</div>';
      }
      html += '<div class="modal-body"></div>';
      if (opts.actions && opts.actions.length) {
        html += '<div class="modal-actions">' + opts.actions.map(function (a, i) {
          return '<button class="btn ' + (a.kind ? 'btn--' + a.kind : 'btn--ghost') + '" data-modal-action="' + i + '">' + U.esc(a.label) + '</button>';
        }).join('') + '</div>';
      }
      box.innerHTML = html;
      var bodyEl = box.querySelector('.modal-body');
      if (typeof opts.body === 'string') bodyEl.innerHTML = opts.body;
      else if (opts.body) bodyEl.appendChild(opts.body);
      overlay.appendChild(box);
      document.body.appendChild(overlay);
      requestAnimationFrame(function () { overlay.classList.add('is-in'); });

      function close(value) {
        document.removeEventListener('keydown', onKey, true);
        overlay.classList.remove('is-in');
        setTimeout(function () { overlay.remove(); }, 180);
        if (prevFocus && prevFocus.focus) { try { prevFocus.focus(); } catch (e) { /* ignore */ } }
        resolve(value === undefined ? null : value);
      }
      function onKey(e) {
        if (e.key === 'Escape' && opts.dismissible !== false) { e.stopPropagation(); close(null); }
      }
      document.addEventListener('keydown', onKey, true);
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay && opts.dismissible !== false) close(null);
        var x = e.target.closest('[data-modal-close]');
        if (x) close(null);
        var b = e.target.closest('[data-modal-action]');
        if (b) {
          var a = opts.actions[+b.getAttribute('data-modal-action')];
          if (a && typeof a.onClick === 'function') {
            var r = a.onClick(box);
            if (r === false) return;
          }
          close(a ? a.value : null);
        }
      });
      if (typeof opts.onOpen === 'function') opts.onOpen(box, close);
      var focusTarget = box.querySelector('[autofocus]') || box.querySelector('.btn--primary') || box.querySelector('button');
      if (focusTarget) setTimeout(function () { focusTarget.focus(); }, 30);
    });
  };

  U.confirm = function (title, message, okLabel, opts) {
    opts = opts || {};
    return U.modal({
      title: title,
      body: '<p>' + message + '</p>',
      actions: [
        { label: opts.cancelLabel || 'Cancel', value: false, kind: 'ghost' },
        { label: okLabel || 'OK', value: true, kind: opts.danger ? 'danger' : 'primary' }
      ]
    }).then(function (v) { return v === true; });
  };

  U.alert = function (title, message) {
    return U.modal({ title: title, body: '<p>' + message + '</p>', actions: [{ label: 'OK', value: true, kind: 'primary' }] });
  };

  /* ---------------- Dragging for floating panels ---------------- */
  U.makeDraggable = function (panel, handle, opts) {
    opts = opts || {};
    var startX, startY, origX, origY, dragging = false;
    function onDown(e) {
      if (e.button !== undefined && e.button !== 0) return;
      if (e.target.closest('button, input, select, a, [data-nodrag]')) return;
      dragging = true;
      var rect = panel.getBoundingClientRect();
      startX = e.clientX; startY = e.clientY; origX = rect.left; origY = rect.top;
      handle.setPointerCapture && handle.setPointerCapture(e.pointerId);
      panel.classList.add('is-dragging');
      e.preventDefault();
    }
    function onMove(e) {
      if (!dragging) return;
      var w = panel.offsetWidth, hgt = panel.offsetHeight;
      var x = U.clamp(origX + e.clientX - startX, -w + 80, window.innerWidth - 80);
      var y = U.clamp(origY + e.clientY - startY, 0, window.innerHeight - 48);
      panel.style.left = x + 'px'; panel.style.top = y + 'px';
      panel.style.right = 'auto'; panel.style.bottom = 'auto';
      void hgt;
    }
    function onUp() {
      if (!dragging) return;
      dragging = false;
      panel.classList.remove('is-dragging');
      if (opts.onEnd) opts.onEnd();
    }
    handle.addEventListener('pointerdown', onDown);
    handle.addEventListener('pointermove', onMove);
    handle.addEventListener('pointerup', onUp);
    handle.addEventListener('pointercancel', onUp);
  };

  U.makeResizable = function (panel, grip, opts) {
    opts = opts || {};
    var sx, sy, sw, sh, active = false;
    grip.addEventListener('pointerdown', function (e) {
      active = true; sx = e.clientX; sy = e.clientY; sw = panel.offsetWidth; sh = panel.offsetHeight;
      grip.setPointerCapture && grip.setPointerCapture(e.pointerId);
      panel.classList.add('is-dragging');
      e.preventDefault(); e.stopPropagation();
    });
    grip.addEventListener('pointermove', function (e) {
      if (!active) return;
      panel.style.width = U.clamp(sw + e.clientX - sx, opts.minW || 280, window.innerWidth - 16) + 'px';
      panel.style.height = U.clamp(sh + e.clientY - sy, opts.minH || 240, window.innerHeight - 16) + 'px';
    });
    function end() {
      if (!active) return;
      active = false;
      panel.classList.remove('is-dragging');
      if (opts.onEnd) opts.onEnd();
    }
    grip.addEventListener('pointerup', end);
    grip.addEventListener('pointercancel', end);
  };

  /* ---------------- Safe localStorage ---------------- */
  U.lsGet = function (key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw == null ? fallback : JSON.parse(raw);
    } catch (e) { return fallback; }
  };
  U.lsSet = function (key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch (e) { console.warn('localStorage error', e); return false; }
  };
  U.lsDel = function (key) { try { localStorage.removeItem(key); } catch (e) { /* ignore */ } };

  global.U = U;
})(window);
