/* Results, question-by-question review and the "My Results" history page. */
(function (global) {
  'use strict';

  var U = global.U, R = global.R, G = global.G;
  var LETTERS = 'ABCDEFGH';

  function notFound(root, title, msg) {
    root.innerHTML = '<div class="page narrow"><div class="empty-state">' + U.icon('warn') +
      '<h2>' + U.esc(title) + '</h2><p>' + U.esc(msg) + '</p><a class="btn btn--primary" href="#/">Back to practice tests</a></div></div>';
    return null;
  }

  /**
   * Loads an attempt and its test. The test is only used for regrading and review when its
   * content still matches the version the student took (fingerprint), otherwise the stored
   * result is shown and the question review is unavailable.
   */
  function load(root, id) {
    var attempt = global.Attempts.get(id);
    if (!attempt) return notFound(root, 'Result not found', 'This attempt does not exist in this browser.');
    if (attempt.status !== 'completed') { location.replace('#/exam/' + encodeURIComponent(attempt.id)); return null; }
    var test = global.SATLibrary.get(attempt.testId);
    var result = attempt.result;
    var changed = false;
    if (test) {
      var sameContent = attempt.fingerprint ? attempt.fingerprint === test.fingerprint
        : (!result || test.questionCount === result.total);
      if (sameContent) {
        try {
          var fresh = G.scoreAttempt(test, attempt);
          if (!result || fresh.correct !== result.correct || fresh.total !== result.total) {
            attempt.result = fresh;
            global.Attempts.save(attempt);
          }
          result = fresh;
        } catch (e) { console.error(e); }
      } else {
        changed = true;
        test = null;
      }
    }
    return { attempt: attempt, test: test, result: result, changed: changed };
  }

  function scoreClass(p) { return p >= 80 ? 'is-good' : p >= 50 ? 'is-mid' : 'is-low'; }

  function donut(pct) {
    var r = 52, c = 2 * Math.PI * r;
    var off = c * (1 - pct / 100);
    return '<svg class="donut" viewBox="0 0 120 120" aria-hidden="true">' +
      '<circle cx="60" cy="60" r="' + r + '" class="donut-track"/>' +
      '<circle cx="60" cy="60" r="' + r + '" class="donut-val ' + scoreClass(pct) + '" stroke-dasharray="' + c.toFixed(2) + '" stroke-dashoffset="' + off.toFixed(2) + '"/>' +
      '</svg>';
  }

  function ResultsView(root, params) {
    var data = load(root, params.id);
    if (!data) return null;
    var attempt = data.attempt, test = data.test, res = data.result;
    if (!res) return notFound(root, 'No score available', 'This attempt has no saved score.');
    var filter = 'all';
    var canReview = !!test;

    function domainBars() {
      var keys = Object.keys(res.byDomain || {});
      if (!keys.length) return '';
      return '<div class="card"><h3 class="card-title">By content domain</h3><div class="bars">' + keys.map(function (k) {
        var d = res.byDomain[k];
        var p = d.total ? Math.round(d.correct / d.total * 100) : 0;
        return '<div class="bar-row"><div class="bar-label"><span>' + U.esc(k) + '</span><b>' + d.correct + '/' + d.total + '</b></div>' +
          '<div class="bar"><span class="' + scoreClass(p) + '" style="width:' + p + '%"></span></div></div>';
      }).join('') + '</div></div>';
    }

    function typeBars() {
      var t = res.byType || { mcq: { correct: 0, total: 0 }, spr: { correct: 0, total: 0 } };
      var rows = [['Multiple choice', t.mcq], ['Student-produced response', t.spr]].filter(function (r) { return r[1] && r[1].total; });
      var mods = res.byModule && res.byModule.length > 1 ? res.byModule.map(function (m) { return [m.title, m]; }) : [];
      return '<div class="card"><h3 class="card-title">By question type' + (mods.length ? ' &amp; module' : '') + '</h3><div class="bars">' +
        rows.concat(mods).map(function (r) {
          var p = r[1].total ? Math.round(r[1].correct / r[1].total * 100) : 0;
          return '<div class="bar-row"><div class="bar-label"><span>' + U.esc(r[0]) + '</span><b>' + r[1].correct + '/' + r[1].total + '</b></div>' +
            '<div class="bar"><span class="' + scoreClass(p) + '" style="width:' + p + '%"></span></div></div>';
        }).join('') + '</div></div>';
    }

    function rows() {
      var list = res.questions.filter(function (q) {
        if (filter === 'all') return true;
        if (filter === 'marked') return q.marked;
        return q.status === filter;
      });
      if (!list.length) return '<div class="empty-mini">No questions in this category.</div>';
      var multi = res.byModule && res.byModule.length > 1;
      return '<div class="table-wrap"><table class="data-table"><thead><tr><th>Question</th>' + (multi ? '<th>Module</th>' : '') +
        '<th>Type</th><th>Your answer</th><th>Correct answer</th><th>Result</th><th></th></tr></thead><tbody>' +
        list.map(function (q) {
          var flat = res.questions.indexOf(q);
          var st = q.status === 'correct' ? '<span class="st st--ok">' + U.icon('check') + 'Correct</span>'
            : q.status === 'incorrect' ? '<span class="st st--bad">' + U.icon('cross') + 'Incorrect</span>'
              : '<span class="st st--skip">Omitted</span>';
          var href = '#/review/' + encodeURIComponent(attempt.id) + '/' + flat;
          return '<tr' + (canReview ? ' class="click-row" data-href="' + href + '"' : '') + '><td><b>' + (q.index + 1) + '</b>' + (q.marked ? ' <span class="flag-mini" title="Marked for review">' + U.icon('bookmarkFill') + '</span>' : '') + '</td>' +
            (multi ? '<td>' + (q.module + 1) + '</td>' : '') +
            '<td><span class="muted">' + (q.type === 'mcq' ? 'Multiple choice' : 'Student response') + '</span>' + (q.domain ? '<br><small class="muted">' + U.esc(q.domain) + '</small>' : '') + '</td>' +
            '<td class="mono">' + (q.response ? U.esc(q.response) : '<span class="muted">—</span>') + '</td>' +
            '<td class="mono">' + U.esc(q.correctAnswer) + '</td>' +
            '<td>' + st + '</td>' +
            '<td>' + (canReview ? '<a class="btn btn--sm btn--ghost" href="' + href + '">Review</a>' : '') + '</td></tr>';
        }).join('') + '</tbody></table></div>';
    }

    function render() {
      var counts = {
        all: res.questions.length,
        correct: res.correct, incorrect: res.incorrect, omitted: res.omitted,
        marked: res.questions.filter(function (q) { return q.marked; }).length
      };
      var chip = function (key, label) {
        return '<button class="chip' + (filter === key ? ' is-on' : '') + '" data-filter="' + key + '">' + label + ' <span>' + counts[key] + '</span></button>';
      };
      var notice = data.changed
        ? '<div class="alert alert--warn">' + U.icon('warn') + '<div>This test has been updated since you took it, so the question review is not available. Your saved score is shown below.</div></div>'
        : (!test ? '<div class="alert alert--warn">' + U.icon('warn') + '<div>This test is no longer available, so the question review is not available.</div></div>' : '');

      root.innerHTML =
        '<div class="page">' +
        '<a class="back-link" href="#/results">' + U.icon('chevronLeft') + 'My results</a>' +
        '<div class="result-hero">' +
        '<div class="result-score">' +
        '<div class="donut-wrap">' + donut(res.percent) + '<div class="donut-center"><b>' + res.correct + '<small>/' + res.total + '</small></b><span>' + res.percent + '%</span></div></div>' +
        '<div class="result-main">' +
        '<span class="eyebrow">Score report</span>' +
        '<h1>' + U.esc(attempt.testTitle || (test && test.title) || 'Practice test') + '</h1>' +
        '<p class="muted">' + (attempt.name ? U.esc(attempt.name) + ' · ' : '') + 'Submitted ' + U.fmtDate(attempt.finishedAt) + ' · ' + (attempt.timed ? 'Timed' : 'Untimed') + '</p>' +
        '<div class="result-stats">' +
        '<div class="rs rs--ok"><b>' + res.correct + '</b><span>Correct</span></div>' +
        '<div class="rs rs--bad"><b>' + res.incorrect + '</b><span>Incorrect</span></div>' +
        '<div class="rs rs--skip"><b>' + res.omitted + '</b><span>Omitted</span></div>' +
        '<div class="rs"><b>' + U.fmtClock(attempt.totalElapsed || 0) + '</b><span>Time used</span></div>' +
        '</div>' +
        '</div></div>' +
        '<div class="result-est">' +
        '<span>Estimated SAT Math</span><b>' + res.estimated + '</b>' +
        '<small>200–800 scale, estimated from your percentage correct. Not an official score.</small>' +
        '</div>' +
        '</div>' +
        '<div class="result-actions">' +
        (canReview ? '<a class="btn btn--primary" href="#/review/' + encodeURIComponent(attempt.id) + '/0">' + U.icon('eye') + 'Review Questions</a>' : '') +
        (global.SATLibrary.get(attempt.testId) ? '<a class="btn btn--ghost" href="#/test/' + encodeURIComponent(attempt.testId) + '">' + U.icon('refresh') + 'Retake Test</a>' : '') +
        '<a class="btn btn--ghost" href="#/">' + U.icon('grid') + 'Practice Tests</a>' +
        '</div>' +
        notice +
        '<div class="result-cards">' + domainBars() + typeBars() + '</div>' +
        '<div class="section">' +
        '<div class="section-head"><h2>Question Details</h2>' +
        '<div class="chips">' + chip('all', 'All') + chip('correct', 'Correct') + chip('incorrect', 'Incorrect') + chip('omitted', 'Omitted') + chip('marked', 'Marked') + '</div></div>' +
        '<div class="answer-strip">' + res.questions.map(function (q, i) {
          var label = (q.index + 1);
          return canReview
            ? '<a class="as-cell as-' + q.status + '" href="#/review/' + encodeURIComponent(attempt.id) + '/' + i + '" title="Question ' + label + ': ' + q.status + '">' + label + '</a>'
            : '<span class="as-cell as-' + q.status + '" title="Question ' + label + ': ' + q.status + '">' + label + '</span>';
        }).join('') + '</div>' +
        '<div id="rows">' + rows() + '</div>' +
        '</div>' +
        '</div>';
    }

    function onClick(e) {
      var f = e.target.closest('[data-filter]');
      if (f) {
        filter = f.getAttribute('data-filter');
        U.$$('[data-filter]', root).forEach(function (c) { c.classList.toggle('is-on', c.getAttribute('data-filter') === filter); });
        document.getElementById('rows').innerHTML = rows();
        return;
      }
      var r = e.target.closest('[data-href]');
      if (r && !e.target.closest('a, button')) location.hash = r.getAttribute('data-href');
    }
    root.addEventListener('click', onClick);
    render();
    return function () { root.removeEventListener('click', onClick); };
  }

  /* ---------------- Question review ---------------- */
  function ReviewView(root, params) {
    var data = load(root, params.id);
    if (!data) return null;
    var attempt = data.attempt, test = data.test, res = data.result;
    if (!test) { location.replace('#/results/' + encodeURIComponent(attempt.id)); return null; }
    var flat = [];
    test.modules.forEach(function (m, mi) { m.questions.forEach(function (q, qi) { flat.push({ q: q, mi: mi, qi: qi }); }); });
    var idx = U.clamp(parseInt(params.n, 10) || 0, 0, flat.length - 1);
    var renderOpts = test.assets && Object.keys(test.assets).length ? { assets: test.assets, assetsKey: test.id + ':' + (test.updatedAt || 0) } : {};

    function statusOf(i) { return res && res.questions[i] ? res.questions[i].status : 'omitted'; }

    function render() {
      var item = flat[idx];
      var q = item.q;
      var resp = attempt.answers[q.id];
      var answered = resp != null && String(resp).trim() !== '';
      var ok = answered && G.isCorrect(q, resp);
      var status = !answered ? 'omitted' : ok ? 'correct' : 'incorrect';
      var multi = test.modules.length > 1;

      var body;
      if (q.type === 'mcq') {
        body = '<div class="bb-choices rv-choices">' + q.choices.map(function (c, i) {
          var L = LETTERS[i];
          var isKey = q.answer === L, isMine = resp === L;
          var cls = 'bb-choice rv-choice' + (isKey ? ' is-key' : '') + (isMine && !isKey ? ' is-wrong' : '') + (isMine ? ' is-mine' : '');
          var tag = isKey ? '<span class="rv-tag rv-tag--ok">' + U.icon('check') + (isMine ? 'Your answer · Correct' : 'Correct answer') + '</span>'
            : isMine ? '<span class="rv-tag rv-tag--bad">' + U.icon('cross') + 'Your answer</span>' : '';
          return '<div class="bb-choice-row"><div class="' + cls + '"><span class="bb-letter">' + L + '</span><span class="bb-choice-text">' +
            R.render(c, Object.assign({ inline: true }, renderOpts)) + '</span>' + tag + '</div></div>';
        }).join('') + '</div>';
      } else {
        body = '<div class="rv-spr">' +
          '<div class="rv-spr-box ' + (status === 'correct' ? 'is-ok' : status === 'incorrect' ? 'is-bad' : 'is-skip') + '"><span>Your answer</span><b>' + (answered ? R.answerPreview(resp) : '—') + '</b></div>' +
          '<div class="rv-spr-box is-key"><span>Correct answer</span><b>' + (q.answer || []).map(function (a) { return R.answerPreview(a); }).join('<i> or </i>') + '</b></div>' +
          '</div>';
      }

      root.innerHTML =
        '<div class="page review-page">' +
        '<div class="rv-top">' +
        '<a class="back-link" href="#/results/' + encodeURIComponent(attempt.id) + '">' + U.icon('chevronLeft') + 'Score report</a>' +
        '<div class="rv-title"><b>' + U.esc(test.title) + '</b>' + (multi ? '<span>' + U.esc(test.modules[item.mi].title) + '</span>' : '') + '</div>' +
        '</div>' +
        '<div class="answer-strip answer-strip--compact">' + flat.map(function (f, i) {
          return '<a class="as-cell as-' + statusOf(i) + (i === idx ? ' is-current' : '') + '" href="#/review/' + encodeURIComponent(attempt.id) + '/' + i + '"' + (i === idx ? ' aria-current="true"' : '') + '>' + (f.qi + 1) + '</a>';
        }).join('') + '</div>' +
        '<article class="rv-card">' +
        '<div class="bb-qhead rv-qhead"><span class="bb-qnum">' + (item.qi + 1) + '</span>' +
        '<span class="rv-status rv-status--' + status + '">' + (status === 'correct' ? U.icon('check') + 'Correct' : status === 'incorrect' ? U.icon('cross') + 'Incorrect' : 'Omitted') + '</span>' +
        (attempt.marked[q.id] ? '<span class="rv-marked">' + U.icon('bookmarkFill') + 'Marked for review</span>' : '') +
        (q.domain ? '<span class="rv-domain">' + U.esc(q.domain) + '</span>' : '') +
        '</div>' +
        '<div class="bb-prompt content">' + R.render(q.prompt, renderOpts) + '</div>' +
        body +
        (q.explanation ? '<div class="rv-expl"><h4>' + U.icon('book') + 'Explanation</h4><div class="content">' + R.render(q.explanation, renderOpts) + '</div></div>' : '') +
        '</article>' +
        '<div class="rv-nav">' +
        '<button class="btn btn--ghost" data-go="-1"' + (idx === 0 ? ' disabled' : '') + '>' + U.icon('chevronLeft') + 'Previous</button>' +
        '<span class="muted">' + (idx + 1) + ' / ' + flat.length + '</span>' +
        '<button class="btn btn--primary" data-go="1"' + (idx === flat.length - 1 ? ' disabled' : '') + '>Next' + U.icon('chevronRight') + '</button>' +
        '</div>' +
        '</div>';
      window.scrollTo(0, 0);
    }

    function go(d) {
      var n = U.clamp(idx + d, 0, flat.length - 1);
      if (n !== idx) location.hash = '#/review/' + encodeURIComponent(attempt.id) + '/' + n;
    }
    function onClick(e) {
      var b = e.target.closest('[data-go]');
      if (b && !b.disabled) go(+b.getAttribute('data-go'));
    }
    function onKey(e) {
      if (document.querySelector('.modal-overlay')) return;
      var tag = (e.target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea' || e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    }
    root.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    render();
    return function () { root.removeEventListener('click', onClick); document.removeEventListener('keydown', onKey); };
  }

  /* ---------------- My Results ---------------- */
  function HistoryView(root) {
    function render() {
      var A = global.Attempts;
      var done = A.completed();
      var inProg = A.all().filter(function (a) { return a.status === 'in-progress' && global.SATLibrary.get(a.testId); });
      root.innerHTML =
        '<div class="page">' +
        '<div class="section-head"><div><h1>My Results</h1><p class="muted">Your attempts are stored in this browser only.</p></div></div>' +
        (inProg.length ? '<div class="section" style="margin-top:0"><h2 class="h3">In progress</h2><div class="attempt-list">' + inProg.map(function (a) {
          var t = global.SATLibrary.get(a.testId);
          return '<a class="attempt-row" href="#/exam/' + encodeURIComponent(a.id) + '">' +
            '<span class="badge badge--amber">In progress</span>' +
            '<span class="attempt-row-main"><b>' + U.esc(t.title) + '</b><span>' + Object.keys(a.answers || {}).length + ' of ' + t.questionCount + ' answered · last saved ' + U.fmtDate(a.updatedAt) + '</span></span>' +
            '<span class="btn btn--sm btn--primary">Resume</span></a>';
        }).join('') + '</div></div>' : '') +
        '<div class="section"' + (inProg.length ? '' : ' style="margin-top:0"') + '>' +
        (done.length
          ? '<div class="table-wrap"><table class="data-table"><thead><tr><th>Test</th><th>Submitted</th><th>Score</th><th>Est. SAT Math</th><th>Time used</th><th></th></tr></thead><tbody>' +
          done.map(function (a) {
            var r = a.result;
            return '<tr class="click-row" data-href="#/results/' + encodeURIComponent(a.id) + '"><td><b>' + U.esc(a.testTitle || a.testId) + '</b>' + (a.timed ? '' : ' <span class="badge badge--gray">Untimed</span>') + '</td>' +
              '<td>' + U.fmtDate(a.finishedAt) + '</td>' +
              '<td><span class="score-pill ' + scoreClass(r.percent) + '">' + r.correct + '/' + r.total + '</span> <span class="muted">(' + r.percent + '%)</span></td>' +
              '<td>' + r.estimated + '</td>' +
              '<td>' + U.fmtDuration(a.totalElapsed || 0) + '</td>' +
              '<td class="row-actions"><a class="btn btn--sm btn--ghost" href="#/results/' + encodeURIComponent(a.id) + '">Details</a>' +
              '<button class="icon-btn icon-btn--danger" data-del="' + U.esc(a.id) + '" title="Delete" aria-label="Delete this result">' + U.icon('trash') + '</button></td></tr>';
          }).join('') + '</tbody></table></div>'
          : '<div class="empty-mini">No results yet. <a href="#/">Pick a practice test</a> to get started.</div>') +
        '</div></div>';
    }
    function onClick(e) {
      var d = e.target.closest('[data-del]');
      if (d) {
        var id = d.getAttribute('data-del');
        U.confirm('Delete this result?', 'This attempt and its score will be permanently removed from this browser.', 'Delete', { danger: true }).then(function (ok) {
          if (ok) { global.Attempts.remove(id); render(); }
        });
        return;
      }
      var r = e.target.closest('[data-href]');
      if (r && !e.target.closest('a, button')) location.hash = r.getAttribute('data-href');
    }
    root.addEventListener('click', onClick);
    render();
    return function () { root.removeEventListener('click', onClick); };
  }

  global.Views = global.Views || {};
  global.Views.results = ResultsView;
  global.Views.review = ReviewView;
  global.Views.history = HistoryView;
})(window);
