/* Home: notice, SAT countdown, practice test grid with filters, recent results. */
(function (global) {
  'use strict';

  var U = global.U;
  var SEASONS = ['spring', 'summer', 'fall', 'winter'];
  var DISMISS_KEY = 'satmath.noticeDismissed';

  function parseDay(s) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s || ''));
    return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null;
  }
  function fmtLong(d) {
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  }
  function fmtShort(d) {
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function nextTestDate() {
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var list = (global.APP_CONFIG.satTestDates || []).map(function (e) {
      return { date: parseDay(e.date), deadline: parseDay(e.deadline) };
    }).filter(function (e) { return e.date && e.date >= today; })
      .sort(function (a, b) { return a.date - b.date; });
    return list[0] || null;
  }

  function scoreClass(p) { return p >= 80 ? 'is-good' : p >= 50 ? 'is-mid' : 'is-low'; }

  function examCard(t) {
    var A = global.Attempts;
    var prog = A.inProgress(t.id);
    var best = A.best(t.id);
    var id = encodeURIComponent(t.id);
    var status = '';
    if (prog) {
      var answered = Object.keys(prog.answers || {}).length;
      status = '<p class="exam-card-status is-progress">In progress · ' + answered + ' of ' + t.questionCount + ' answered</p>';
    } else if (best) {
      status = '<p class="exam-card-status is-done">Best score: ' + best.result.correct + '/' + best.result.total + ' · est. ' + best.result.estimated + '</p>';
    }
    return '<article class="exam-card" data-id="' + U.esc(t.id) + '">' +
      '<div class="exam-card-pills">' +
      '<span class="pill pill--blue">Total: ' + t.questionCount + '</span>' +
      '<span class="spacer"></span>' +
      '<span class="pill" title="Multiple-choice questions">MCQ: ' + t.mcqCount + '</span>' +
      '<span class="pill" title="Student-produced response questions">SPR: ' + t.sprCount + '</span>' +
      '</div>' +
      '<h3 class="exam-card-title"><a href="#/test/' + id + '">' + U.esc(t.title || 'Untitled test') + '</a></h3>' +
      '<p class="exam-card-meta">' + Math.round(t.totalTime) + ' minutes' + (t.modules.length > 1 ? ' · ' + t.modules.length + ' modules' : '') + (t.author ? ' · by ' + U.esc(t.author) : '') + '</p>' +
      status +
      (prog
        ? '<a class="btn btn--primary btn--block" href="#/exam/' + encodeURIComponent(prog.id) + '">Resume Exam</a>'
        : '<a class="btn btn--primary btn--block" href="#/test/' + id + '">Start Exam</a>') +
      (best ? '<div class="exam-card-links"><a href="#/results/' + encodeURIComponent(best.id) + '">View results</a></div>' : '') +
      '</article>';
  }

  function recentResults() {
    var list = global.Attempts.completed().slice(0, 6);
    if (!list.length) return '';
    return '<section class="section">' +
      '<div class="section-head"><div><h2>Recent Results</h2><p class="muted">Saved in this browser.</p></div>' +
      '<a class="btn btn--ghost" href="#/results">View all</a></div>' +
      '<div class="table-wrap"><table class="data-table"><thead><tr><th>Test</th><th>Date</th><th>Score</th><th>Est. SAT Math</th><th>Time</th><th></th></tr></thead><tbody>' +
      list.map(function (a) {
        var r = a.result;
        return '<tr class="click-row" data-href="#/results/' + encodeURIComponent(a.id) + '"><td><b>' + U.esc(a.testTitle || a.testId) + '</b>' + (a.timed ? '' : ' <span class="badge badge--gray">Untimed</span>') + '</td>' +
          '<td>' + U.fmtDate(a.finishedAt) + '</td>' +
          '<td><span class="score-pill ' + scoreClass(r.percent) + '">' + r.correct + '/' + r.total + '</span> <span class="muted">(' + r.percent + '%)</span></td>' +
          '<td>' + r.estimated + '</td>' +
          '<td>' + U.fmtDuration(a.totalElapsed || 0) + '</td>' +
          '<td class="row-actions"><a class="btn btn--sm btn--ghost" href="#/results/' + encodeURIComponent(a.id) + '">Details</a></td></tr>';
      }).join('') + '</tbody></table></div></section>';
  }

  function HomeView(root) {
    var Lib = global.SATLibrary;
    var filter = { year: 'all', season: 'all' };
    var timer = null;

    function render() {
      var cfg = global.APP_CONFIG;
      var tests = Lib.published();
      var errs = Lib.errors();
      var note = String(cfg.announcement || '').trim();
      var dismissed = U.lsGet(DISMISS_KEY, '') === note;
      var next = nextTestDate();
      var years = [];
      tests.forEach(function (t) { if (t.year && years.indexOf(t.year) === -1) years.push(t.year); });
      years.sort(function (a, b) { return b - a; });
      var seasonsPresent = SEASONS.filter(function (s) { return tests.some(function (t) { return t.season === s; }); });

      root.innerHTML =
        '<div class="page">' +
        (note && !dismissed ? '<div class="notice" role="status">' + U.icon('info') + '<span>' + U.esc(note) + '</span>' +
          '<button class="icon-btn" data-act="dismiss" aria-label="Dismiss notice">' + U.icon('close') + '</button></div>' : '') +

        (errs.length && global.Admin && global.Admin.isAdmin() ? '<div class="alert alert--error">' + U.icon('warn') + '<div><b>Some tests could not be loaded:</b><ul>' +
          errs.map(function (e) { return '<li><b>' + U.esc(e.title) + '</b>: ' + U.esc((e.errors[0] && e.errors[0].msg) || 'error') + (e.errors.length > 1 ? ' (+' + (e.errors.length - 1) + ' more)' : '') + '</li>'; }).join('') +
          '</ul></div></div>' : '') +

        (next ? '<section class="countdown" aria-label="Next SAT test date">' +
          '<div><div class="countdown-label">Next SAT</div>' +
          '<div class="countdown-date">' + fmtLong(next.date) + '</div>' +
          (next.deadline ? '<div class="countdown-sub">' + (next.deadline >= new Date(new Date().toDateString()) ? 'Registration deadline: ' + fmtShort(next.deadline) : 'Regular registration has closed') + '</div>' : '') +
          '</div>' +
          '<div class="countdown-boxes" id="cd-boxes">' +
          ['days', 'hours', 'minutes', 'seconds'].map(function (u) {
            return '<div class="cd-box"><div class="cd-num" data-unit="' + u + '">00</div><div class="cd-unit">' + u + '</div></div>';
          }).join('') +
          '</div></section>' : '') +

        '<section class="section">' +
        '<div class="section-head"><h2>Practice Tests</h2>' +
        (tests.length ? '<div class="filters">' +
          (years.length ? '<div class="seg" role="group" aria-label="Filter by year">' + seg('year', 'all', 'All') + years.map(function (y) { return seg('year', String(y), String(y)); }).join('') + '</div>' : '') +
          (seasonsPresent.length ? '<div class="seg" role="group" aria-label="Filter by season">' + seg('season', 'all', 'All') + SEASONS.map(function (s) { return seg('season', s, s); }).join('') + '</div>' : '') +
          '</div>' : '') +
        '</div>' +
        '<div class="exam-grid" id="exam-grid"></div>' +
        '</section>' +
        recentResults() +
        '</div>';
      renderGrid();
      startCountdown(next);
    }

    function seg(kind, value, label) {
      return '<button type="button" class="' + (filter[kind] === value ? 'is-on' : '') + '" data-filter="' + kind + '" data-value="' + U.esc(value) + '" aria-pressed="' + (filter[kind] === value) + '">' + U.esc(label) + '</button>';
    }

    function renderGrid() {
      var grid = document.getElementById('exam-grid');
      if (!grid) return;
      var tests = Lib.published().filter(function (t) {
        return (filter.year === 'all' || String(t.year) === filter.year) &&
          (filter.season === 'all' || t.season === filter.season);
      });
      grid.innerHTML = tests.length ? tests.map(examCard).join('')
        : '<div class="empty-mini grid-span">' + (Lib.published().length ? 'No tests match this filter.' : 'No practice tests have been published yet. Check back soon!') + '</div>';
    }

    function startCountdown(next) {
      if (timer) clearInterval(timer);
      if (!next) return;
      var target = next.date.getTime();
      function tick() {
        var box = document.getElementById('cd-boxes');
        if (!box) { clearInterval(timer); return; }
        var diff = Math.max(0, Math.floor((target - Date.now()) / 1000));
        var parts = { days: Math.floor(diff / 86400), hours: Math.floor(diff % 86400 / 3600), minutes: Math.floor(diff % 3600 / 60), seconds: diff % 60 };
        Object.keys(parts).forEach(function (k) {
          var el = box.querySelector('[data-unit="' + k + '"]');
          if (el) el.textContent = String(parts[k]).padStart(2, '0');
        });
      }
      tick();
      timer = setInterval(tick, 1000);
    }

    function onClick(e) {
      var f = e.target.closest('[data-filter]');
      if (f) {
        var kind = f.getAttribute('data-filter');
        filter[kind] = f.getAttribute('data-value');
        U.$$('[data-filter="' + kind + '"]', root).forEach(function (b) {
          var on = b.getAttribute('data-value') === filter[kind];
          b.classList.toggle('is-on', on);
          b.setAttribute('aria-pressed', String(on));
        });
        renderGrid();
        return;
      }
      var d = e.target.closest('[data-act="dismiss"]');
      if (d) {
        U.lsSet(DISMISS_KEY, String(global.APP_CONFIG.announcement || '').trim());
        var n = root.querySelector('.notice');
        if (n) n.remove();
        return;
      }
      var row = e.target.closest('[data-href]');
      if (row && !e.target.closest('a, button')) location.hash = row.getAttribute('data-href');
    }

    root.addEventListener('click', onClick);
    render();
    return function () {
      root.removeEventListener('click', onClick);
      if (timer) clearInterval(timer);
    };
  }

  global.Views = global.Views || {};
  global.Views.home = HomeView;
})(window);
