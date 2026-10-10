/* Results, question-by-question review, redoing missed questions and the "My Results" history page. */
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

  /** Positions (in test order) of the questions answered incorrectly or left blank. */
  function mistakeIdx(res) {
    var out = [];
    (res.questions || []).forEach(function (q, i) { if (q.status !== 'correct') out.push(i); });
    return out;
  }

  /** Redo progress is kept on the attempt (attempt.redo) and never changes the score. */
  function redoItems(attempt) {
    if (!attempt.redo || typeof attempt.redo !== 'object' || !attempt.redo.items) attempt.redo = { items: {} };
    return attempt.redo.items;
  }
  function redoStatus(attempt, qid) {
    var it = attempt.redo && attempt.redo.items && attempt.redo.items[qid];
    return it ? it.status : '';
  }

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
      var mistakes = canReview ? mistakeIdx(res) : [];
      var fixed = 0, tried = 0;
      mistakes.forEach(function (i) {
        var st = redoStatus(attempt, res.questions[i].id);
        if (st === 'correct') fixed++;
        if (st) tried++;
      });
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
        (canReview && mistakes.length ? '<a class="btn btn--primary" href="#/redo/' + encodeURIComponent(attempt.id) + '">' + U.icon('refresh') +
          (fixed || tried ? 'Continue Redo' : 'Redo Mistakes') + ' (' + mistakes.length + ')</a>' +
          '<a class="btn btn--ghost" href="#/review/' + encodeURIComponent(attempt.id) + '/' + mistakes[0] + '/mistakes">' + U.icon('eye') + 'Review Mistakes</a>' : '') +
        (canReview ? '<a class="btn btn--' + (mistakes.length ? 'ghost' : 'primary') + '" href="#/review/' + encodeURIComponent(attempt.id) + '/0">' + U.icon('eye') + (mistakes.length ? 'Review All Questions' : 'Review Questions') + '</a>' : '') +
        (global.SATLibrary.get(attempt.testId) ? '<a class="btn btn--ghost" href="#/test/' + encodeURIComponent(attempt.testId) + '">' + U.icon('refresh') + 'Retake Test</a>' : '') +
        '<a class="btn btn--ghost" href="#/">' + U.icon('grid') + 'Practice Tests</a>' +
        '</div>' +
        (canReview && mistakes.length ? '<p class="redo-hint">' + (fixed || tried
          ? U.icon('check') + '<span>Redo progress: you fixed <b>' + fixed + ' of ' + mistakes.length + '</b> missed questions.</span>'
          : U.icon('info') + '<span>Redo your <b>' + mistakes.length + '</b> incorrect and omitted questions now: answer each one again and check it right away. Your score does not change.</span>') + '</p>' : '') +
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
    var mistakes = res ? mistakeIdx(res) : [];
    // "Mistakes only": Previous/Next move between incorrect and omitted questions
    var onlyMistakes = params.mode === 'mistakes' && mistakes.length > 0;
    var base = '#/review/' + encodeURIComponent(attempt.id) + '/';
    var suffix = onlyMistakes ? '/mistakes' : '';

    function statusOf(i) { return res && res.questions[i] ? res.questions[i].status : 'omitted'; }
    function stepTo(d) {
      if (!onlyMistakes) return U.clamp(idx + d, 0, flat.length - 1);
      var list = d > 0 ? mistakes.filter(function (i) { return i > idx; }) : mistakes.filter(function (i) { return i < idx; });
      return list.length ? (d > 0 ? list[0] : list[list.length - 1]) : idx;
    }

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
        (mistakes.length ? '<div class="rv-modes chips" role="group" aria-label="Questions to review">' +
          '<a class="chip' + (onlyMistakes ? '' : ' is-on') + '" href="' + base + idx + '"' + (onlyMistakes ? '' : ' aria-current="true"') + '>All questions <span>' + flat.length + '</span></a>' +
          '<a class="chip' + (onlyMistakes ? ' is-on' : '') + '" href="' + base + (statusOf(idx) === 'correct' ? mistakes[0] : idx) + '/mistakes"' + (onlyMistakes ? ' aria-current="true"' : '') + '>Mistakes only <span>' + mistakes.length + '</span></a>' +
          '<a class="btn btn--sm btn--primary rv-redo-all" href="#/redo/' + encodeURIComponent(attempt.id) + '">' + U.icon('refresh') + 'Redo Mistakes</a>' +
          '</div>' : '') +
        '<div class="answer-strip answer-strip--compact">' + flat.map(function (f, i) {
          var dim = onlyMistakes && statusOf(i) === 'correct';
          return '<a class="as-cell as-' + statusOf(i) + (i === idx ? ' is-current' : '') + (dim ? ' is-dim' : '') + '" href="' + base + i + (dim ? '' : suffix) + '"' + (i === idx ? ' aria-current="true"' : '') + '>' + (f.qi + 1) + '</a>';
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
        (status !== 'correct' ? '<div class="rv-redo-one"><a class="btn btn--outline" href="#/redo/' + encodeURIComponent(attempt.id) + '/' + mistakes.indexOf(idx) + '">' + U.icon('refresh') + 'Redo this question</a></div>' : '') +
        '</article>' +
        '<div class="rv-nav">' +
        '<button class="btn btn--ghost" data-go="-1"' + (stepTo(-1) === idx ? ' disabled' : '') + '>' + U.icon('chevronLeft') + 'Previous</button>' +
        '<span class="muted">' + (onlyMistakes && mistakes.indexOf(idx) !== -1 ? 'Mistake ' + (mistakes.indexOf(idx) + 1) + ' / ' + mistakes.length : (idx + 1) + ' / ' + flat.length) + '</span>' +
        '<button class="btn btn--primary" data-go="1"' + (stepTo(1) === idx ? ' disabled' : '') + '>Next' + U.icon('chevronRight') + '</button>' +
        '</div>' +
        '</div>';
      window.scrollTo(0, 0);
    }

    function go(d) {
      var n = stepTo(d);
      if (n !== idx) location.hash = base + n + suffix;
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

  /* ---------------- Redo missed questions ---------------- */
  /**
   * Practice the questions that were answered incorrectly or left blank, one at a time: answer,
   * check right away, then try again or show the answer and the explanation. Progress is kept on
   * the attempt (attempt.redo) so it survives a reload; it never changes the score.
   */
  function RedoView(root, params) {
    var data = load(root, params.id);
    if (!data) return null;
    var attempt = data.attempt, test = data.test, res = data.result;
    var back = '#/results/' + encodeURIComponent(attempt.id);
    if (!test || !res) { location.replace(back); return null; }
    var flat = [];
    test.modules.forEach(function (m, mi) { m.questions.forEach(function (q, qi) { flat.push({ q: q, mi: mi, qi: qi }); }); });
    var list = mistakeIdx(res).filter(function (i) { return flat[i] && res.questions[i].id === flat[i].q.id; });
    var renderOpts = test.assets && Object.keys(test.assets).length ? { assets: test.assets, assetsKey: test.id + ':' + (test.updatedAt || 0) } : {};
    var multi = test.modules.length > 1;
    var items = redoItems(attempt);
    var base = '#/redo/' + encodeURIComponent(attempt.id);
    var saveWarned = false;
    var ended = false;
    // Feedback is announced from a live region outside the re-rendered page
    var live = document.createElement('div');
    live.className = 'sr-only';
    live.setAttribute('aria-live', 'polite');
    document.body.appendChild(live);

    function itemOf(i) { return items[flat[i].q.id] || null; }
    function stOf(i) { var it = itemOf(i); return it ? it.status : ''; }
    function isOpen(i) { var st = stOf(i); return st !== 'correct' && st !== 'revealed'; }
    function firstOpen() {
      for (var k = 0; k < list.length; k++) if (isOpen(list[k])) return k;
      return list.length;
    }

    var pos = params.n === 'done' ? list.length
      : params.n != null ? U.clamp(parseInt(params.n, 10) || 0, 0, Math.max(0, list.length - 1))
        : firstOpen();
    var sel = '';        // the answer being entered for the current question
    var phase = 'answer'; // 'answer' | 'wrong' | 'done'

    function counts() {
      var c = { fixed: 0, revealed: 0, open: 0 };
      list.forEach(function (i) {
        var st = stOf(i);
        if (st === 'correct') c.fixed++; else if (st === 'revealed') c.revealed++; else c.open++;
      });
      return c;
    }

    /**
     * Saves only what this action changed (ids: questions to write from `items`, or to delete when
     * missing there) into the stored copy of the attempt, so another tab's redo progress is kept.
     */
    function save(ids) {
      var stored = global.Attempts.getStored(attempt.id);
      if (!stored) {
        // The result was deleted in another tab: do not bring it back
        ended = true;
        U.toast('This result was deleted in another tab.', 'error', 5000);
        location.replace('#/results');
        return;
      }
      var into = redoItems(stored);
      ids.forEach(function (id) { if (items[id]) into[id] = items[id]; else delete into[id]; });
      stored.redo.updatedAt = Date.now();
      var ok = global.Attempts.save(stored, { keepTime: true });
      attempt = stored;
      items = into;
      if (ok !== true && !saveWarned) { saveWarned = true; U.toast('Your redo progress could not be saved in this browser.', 'error', 5000); }
    }

    function enter(newPos) {
      pos = newPos;
      sel = '';
      phase = 'answer';
      if (pos < list.length) {
        var it = itemOf(list[pos]);
        if (it && (it.status === 'correct' || it.status === 'revealed')) { phase = 'done'; sel = it.response || ''; }
      }
    }

    function label(i) { return (multi ? 'M' + (flat[i].mi + 1) + '·' : '') + (flat[i].qi + 1); }

    function stripHtml() {
      return '<div class="answer-strip answer-strip--compact rd-strip">' + list.map(function (i, k) {
        var st = stOf(i) || 'pending';
        var name = 'Question ' + label(i) + ': ' + ({ correct: 'fixed', revealed: 'answer shown', incorrect: 'not fixed yet' }[st] || 'not done yet');
        return '<a class="as-cell as-' + st + (k === pos ? ' is-current' : '') + '" href="' + base + '/' + k + '" title="' + name + '" aria-label="' + name + '"' +
          (k === pos ? ' aria-current="true"' : '') + '>' + label(i) + '</a>';
      }).join('') +
        '<a class="as-cell as-summary' + (pos === list.length ? ' is-current' : '') + '" href="' + base + '/done" title="Summary" aria-label="Summary">' + U.icon('check') + '</a>' +
        '</div>';
    }

    function topHtml() {
      var c = counts();
      var pct = list.length ? Math.round(c.fixed / list.length * 100) : 100;
      return '<div class="rv-top">' +
        '<a class="back-link" href="' + back + '">' + U.icon('chevronLeft') + 'Score report</a>' +
        '<div class="rv-title"><b>Redo Mistakes</b><span>' + U.esc(test.title) + '</span></div>' +
        '</div>' +
        '<div class="rd-progress"><span>Fixed <b>' + c.fixed + '</b> of ' + list.length + ' missed questions</span>' +
        '<div class="rd-bar" role="progressbar" aria-label="Redo progress" aria-valuemin="0" aria-valuemax="' + list.length + '" aria-valuenow="' + c.fixed + '" aria-valuetext="' + c.fixed + ' of ' + list.length + ' fixed"><span style="width:' + pct + '%"></span></div></div>' +
        stripHtml();
    }

    function answerText(q, a) {
      if (q.type === 'mcq') return a ? '<b>' + U.esc(a) + '</b>' : '<span class="muted">(no answer)</span>';
      return a ? R.answerPreview(a) : '<span class="muted">(no answer)</span>';
    }

    function choicesHtml(q, it) {
      var wrong = (it && it.wrong) || [];
      return '<div class="bb-choices rd-choices"' + (phase === 'answer' ? ' role="radiogroup" aria-label="Answer choices"' : '') + '>' + q.choices.map(function (c, i) {
        var L = LETTERS[i];
        var text = '<span class="bb-letter">' + L + '</span><span class="bb-choice-text">' + R.render(c, Object.assign({ inline: true }, renderOpts)) + '</span>';
        if (phase === 'answer') {
          var tried = wrong.indexOf(L) !== -1;
          var on = sel === L;
          return '<div class="bb-choice-row"><button type="button" class="bb-choice' + (on ? ' is-selected' : '') + (tried ? ' rd-tried' : '') + '" data-pick="' + L + '" role="radio" aria-checked="' + on + '"' +
            (tried ? ' disabled title="Already tried"' : '') + '>' + text + '</button></div>';
        }
        var isKey = q.answer === L;
        var showKey = phase === 'done' && isKey;
        var isWrong = (phase === 'wrong' && sel === L) || (wrong.indexOf(L) !== -1 && !isKey);
        var tag = showKey ? '<span class="rv-tag rv-tag--ok">' + U.icon('check') + 'Correct answer</span>'
          : isWrong ? '<span class="rv-tag rv-tag--bad">' + U.icon('cross') + 'Incorrect</span>' : '';
        return '<div class="bb-choice-row"><div class="bb-choice rv-choice' + (showKey ? ' is-key' : '') + (isWrong ? ' is-wrong' : '') + '">' + text + tag + '</div></div>';
      }).join('') + '</div>';
    }

    function sprHtml(q, it) {
      if (phase === 'done') {
        var st = it ? it.status : '';
        return '<div class="rv-spr">' +
          (st === 'correct' ? '<div class="rv-spr-box is-ok"><span>Your answer</span><b>' + R.answerPreview(sel) + '</b></div>' : '') +
          '<div class="rv-spr-box is-key"><span>Correct answer</span><b>' + (q.answer || []).map(function (a) { return R.answerPreview(a); }).join('<i> or </i>') + '</b></div>' +
          '</div>';
      }
      return '<div class="bb-spr rd-spr">' +
        '<input class="bb-spr-input' + (phase === 'wrong' ? ' is-wrong' : '') + '" id="rd-input" type="text" inputmode="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" maxlength="6" aria-label="Your answer" value="' + U.esc(sel) + '"' + (phase === 'wrong' ? ' disabled' : '') + '>' +
        '<div class="bb-spr-preview" id="rd-preview">Answer Preview: <span class="bb-spr-preview-val">' + (sel ? R.answerPreview(sel) : '') + '</span></div>' +
        '</div>';
    }

    function feedbackHtml(i, q, it) {
      var orig = attempt.answers[q.id];
      var last = pos === list.length - 1;
      var nextBtn = '<button type="button" class="btn btn--primary" data-act="next">' + (last ? 'See Summary' : 'Next Question') + U.icon('chevronRight') + '</button>';
      if (phase === 'answer') {
        return '<div class="rd-actions">' +
          '<button type="button" class="btn btn--primary" data-act="check" id="rd-check"' + (sel ? '' : ' disabled') + '>' + U.icon('check') + 'Check Answer</button>' +
          '<button type="button" class="btn btn--ghost" data-act="reveal">' + U.icon('eye') + 'Show Answer</button>' +
          (it && it.tries ? '<span class="muted rd-tries">' + it.tries + (it.tries === 1 ? ' try' : ' tries') + ' so far</span>' : '') +
          '</div>';
      }
      if (phase === 'wrong') {
        return '<div class="rd-feedback rd-feedback--bad" role="status">' + U.icon('cross') + '<div><b>Not quite.</b> Try again, or show the answer and the explanation.</div></div>' +
          '<div class="rd-actions">' +
          '<button type="button" class="btn btn--primary" data-act="retry">' + U.icon('refresh') + 'Try Again</button>' +
          '<button type="button" class="btn btn--ghost" data-act="reveal">' + U.icon('eye') + 'Show Answer</button>' +
          '</div>';
      }
      var ok = it && it.status === 'correct';
      return (ok
        ? '<div class="rd-feedback rd-feedback--ok" role="status">' + U.icon('check') + '<div><b>Correct!</b> You fixed this question' + (it.tries > 1 ? ' on try ' + it.tries : '') + '.</div></div>'
        : '<div class="rd-feedback rd-feedback--info" role="status">' + U.icon('info') + '<div><b>Answer shown.</b> Read the explanation, then redo this question again later.</div></div>') +
        '<p class="rd-orig">On the test you answered: ' + answerText(q, orig) + '</p>' +
        (q.explanation ? '<div class="rv-expl"><h4>' + U.icon('book') + 'Explanation</h4><div class="content">' + R.render(q.explanation, renderOpts) + '</div></div>' : '') +
        '<div class="rd-actions">' + nextBtn +
        '<button type="button" class="btn btn--ghost" data-act="again">' + U.icon('refresh') + (ok ? 'Do It Again' : 'Try Again') + '</button></div>';
    }

    function questionHtml() {
      var i = list[pos];
      var item = flat[i], q = item.q;
      var it = itemOf(i);
      var was = res.questions[i].status;
      return '<article class="rv-card rd-card">' +
        '<div class="bb-qhead rv-qhead"><span class="bb-qnum">' + (item.qi + 1) + '</span>' +
        '<span class="rv-status rv-status--' + was + '">On the test: ' + (was === 'incorrect' ? 'Incorrect' : 'Omitted') + '</span>' +
        (multi ? '<span class="rv-marked rd-module">' + U.esc(test.modules[item.mi].title) + '</span>' : '') +
        (q.domain ? '<span class="rv-domain">' + U.esc(q.domain) + '</span>' : '') +
        '</div>' +
        '<div class="bb-prompt content">' + R.render(q.prompt, renderOpts) + '</div>' +
        (q.type === 'mcq' ? choicesHtml(q, it) : sprHtml(q, it)) +
        feedbackHtml(i, q, it) +
        '</article>' +
        '<div class="rv-nav">' +
        '<button class="btn btn--ghost" data-go="-1"' + (pos === 0 ? ' disabled' : '') + '>' + U.icon('chevronLeft') + 'Previous</button>' +
        '<span class="muted">' + (pos + 1) + ' / ' + list.length + '</span>' +
        '<button class="btn btn--ghost" data-go="1">' + (pos === list.length - 1 ? 'Summary' : 'Skip') + U.icon('chevronRight') + '</button>' +
        '</div>';
    }

    function summaryHtml() {
      var c = counts();
      var left = c.revealed + c.open;
      var all = c.fixed === list.length;
      return '<article class="rv-card rd-summary">' +
        '<div class="rd-summary-icon ' + (all ? 'is-good' : 'is-mid') + '">' + U.icon(all ? 'check' : 'refresh') + '</div>' +
        '<h2>' + (all ? 'All missed questions fixed!' : 'You fixed ' + c.fixed + ' of ' + list.length + ' missed questions') + '</h2>' +
        '<p class="muted">' + (all ? 'Great work. Retake the full test to check your score again.' : 'Redo the rest until every question is fixed. Your score report does not change.') + '</p>' +
        '<div class="result-stats rd-stats">' +
        '<div class="rs rs--ok"><b>' + c.fixed + '</b><span>Fixed</span></div>' +
        '<div class="rs rs--skip"><b>' + c.revealed + '</b><span>Answer shown</span></div>' +
        '<div class="rs rs--bad"><b>' + c.open + '</b><span>Not fixed yet</span></div>' +
        '</div>' +
        '<div class="rd-actions rd-actions--center">' +
        (left ? '<button type="button" class="btn btn--primary" data-act="redo-left">' + U.icon('refresh') + 'Redo the Remaining ' + left + '</button>' : '') +
        (c.fixed || c.revealed ? '<button type="button" class="btn btn--ghost" data-act="restart">' + U.icon('refresh') + 'Start Over</button>' : '') +
        '<a class="btn btn--ghost" href="' + back + '">' + U.icon('history') + 'Score Report</a>' +
        (global.SATLibrary.get(attempt.testId) ? '<a class="btn btn--ghost" href="#/test/' + encodeURIComponent(attempt.testId) + '">' + U.icon('refresh') + 'Retake Full Test</a>' : '') +
        '</div>' +
        '</article>';
    }

    function render() {
      if (!list.length) {
        root.innerHTML = '<div class="page review-page"><div class="rv-top"><a class="back-link" href="' + back + '">' + U.icon('chevronLeft') + 'Score report</a></div>' +
          '<div class="empty-state">' + U.icon('check') + '<h2>Nothing to redo</h2><p>You answered every question correctly.</p>' +
          '<a class="btn btn--primary" href="' + back + '">Back to score report</a></div></div>';
        return;
      }
      root.innerHTML = '<div class="page review-page redo-page">' + topHtml() + (pos >= list.length ? summaryHtml() : questionHtml()) + '</div>';
      // On phones the strip is one sideways-scrolling row: keep the current question in view
      var cur = root.querySelector('.rd-strip .is-current');
      if (cur) cur.parentNode.scrollLeft = Math.max(0, cur.offsetLeft - cur.parentNode.offsetLeft - 40);
    }

    /** Re-render the same question after Check / Try Again / Show Answer and bring the feedback into view. */
    function update() {
      render();
      var fb = root.querySelector('.rd-feedback');
      live.textContent = fb ? fb.textContent.trim() : '';
      var box = fb || root.querySelector('.rd-actions');
      if (box) {
        var r = box.getBoundingClientRect();
        if (r.bottom > window.innerHeight || r.top < 0) box.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
      // Keyboard users continue from the next useful control
      var next = phase === 'answer' ? (root.querySelector('#rd-input') || root.querySelector('[data-pick]:not([disabled])'))
        : root.querySelector('[data-act="retry"], [data-act="next"]');
      if (next) next.focus({ preventScroll: true });
    }

    function go(newPos) {
      newPos = U.clamp(newPos, 0, list.length);
      var hash = base + '/' + (newPos >= list.length ? 'done' : newPos);
      if (location.hash !== hash) location.hash = hash; else { enter(newPos); render(); window.scrollTo(0, 0); }
    }

    function check() {
      if (pos >= list.length || phase !== 'answer' || !sel) return;
      var q = flat[list[pos]].q;
      var it = items[q.id] || (items[q.id] = { status: '', tries: 0, wrong: [] });
      it.tries = (it.tries || 0) + 1;
      it.response = sel;
      if (G.isCorrect(q, sel)) { it.status = 'correct'; phase = 'done'; }
      else {
        it.status = 'incorrect';
        if (q.type === 'mcq') { it.wrong = it.wrong || []; if (it.wrong.indexOf(sel) === -1) it.wrong.push(sel); }
        phase = 'wrong';
      }
      save([q.id]);
      if (ended) return;
      update();
    }

    function reveal() {
      if (pos >= list.length) return;
      var q = flat[list[pos]].q;
      var it = items[q.id] || (items[q.id] = { status: '', tries: 0, wrong: [] });
      if (it.status !== 'correct') it.status = 'revealed';
      if (q.type === 'mcq' && phase === 'wrong' && sel && (it.wrong || []).indexOf(sel) === -1) (it.wrong = it.wrong || []).push(sel);
      phase = 'done';
      save([q.id]);
      if (ended) return;
      update();
    }

    function resetItems(onlyUnfixed) {
      var ids = [];
      list.forEach(function (i) {
        var id = flat[i].q.id;
        if (!onlyUnfixed || (items[id] && items[id].status !== 'correct')) { delete items[id]; ids.push(id); }
      });
      save(ids);
      if (ended) return;
      go(firstOpen());
    }

    function onClick(e) {
      var p = e.target.closest('[data-pick]');
      if (p && !p.disabled && phase === 'answer') {
        sel = p.getAttribute('data-pick');
        U.$$('[data-pick]', root).forEach(function (b) {
          var on = b.getAttribute('data-pick') === sel;
          b.classList.toggle('is-selected', on);
          b.setAttribute('aria-checked', String(on));
        });
        var cb = document.getElementById('rd-check');
        if (cb) cb.disabled = false;
        return;
      }
      var a = e.target.closest('[data-act]');
      if (a) {
        var act = a.getAttribute('data-act');
        if (act === 'check') check();
        else if (act === 'reveal') reveal();
        else if (act === 'retry') {
          phase = 'answer'; sel = '';
          update();
          var inp = document.getElementById('rd-input');
          if (inp) inp.focus();
        } else if (act === 'again') {
          var qid = flat[list[pos]].q.id;
          delete items[qid];
          save([qid]);
          if (ended) return;
          enter(pos);
          update();
        } else if (act === 'next') go(pos + 1);
        else if (act === 'redo-left') resetItems(true);
        else if (act === 'restart') {
          U.confirm('Start over?', 'Your redo progress for this attempt will be cleared. Your score does not change.', 'Start over').then(function (ok) { if (ok) resetItems(false); });
        }
        return;
      }
      var g = e.target.closest('[data-go]');
      if (g && !g.disabled) go(pos + +g.getAttribute('data-go'));
    }

    function onInput(e) {
      if (e.target.id !== 'rd-input') return;
      var input = e.target;
      var clean = G.sanitizeSpr(input.value);
      if (clean !== input.value) {
        var at = input.selectionStart - (input.value.length - clean.length);
        input.value = clean;
        try { input.setSelectionRange(Math.max(0, at), Math.max(0, at)); } catch (err) { /* ignore */ }
      }
      input.maxLength = G.maxLen(clean);
      sel = clean;
      var pv = document.getElementById('rd-preview');
      if (pv) pv.innerHTML = 'Answer Preview: <span class="bb-spr-preview-val">' + (clean ? R.answerPreview(clean) : '') + '</span>';
      var cb = document.getElementById('rd-check');
      if (cb) cb.disabled = !clean;
    }

    function onKey(e) {
      if (document.querySelector('.modal-overlay') || e.altKey || e.ctrlKey || e.metaKey) return;
      var t = e.target;
      var tag = (t.tagName || '').toLowerCase();
      if (e.key === 'Enter' && phase === 'answer' && sel) {
        // Enter checks from the answer box, the selected choice, or anywhere that is not a control;
        // on another choice it keeps its normal job of selecting that choice.
        var control = t.closest && t.closest('a, button, input, textarea, select');
        if (t.id === 'rd-input' || (control && control.getAttribute('data-pick') === sel) || !control) {
          e.preventDefault();
          check();
          return;
        }
      }
      if (tag === 'input' || tag === 'textarea') return;
      if (t.closest && t.closest('.rd-choices')) return;
      if (e.key === 'ArrowRight') go(pos + 1);
      if (e.key === 'ArrowLeft' && pos > 0) go(pos - 1);
    }

    // Give the history entry an explicit position so Back returns to this question
    if (params.n == null && list.length) {
      try { history.replaceState(history.state, '', base + '/' + (pos >= list.length ? 'done' : pos)); } catch (e) { /* ignore */ }
    }
    enter(pos);
    root.addEventListener('click', onClick);
    root.addEventListener('input', onInput);
    document.addEventListener('keydown', onKey);
    render();
    window.scrollTo(0, 0);
    return function () {
      root.removeEventListener('click', onClick);
      root.removeEventListener('input', onInput);
      document.removeEventListener('keydown', onKey);
      if (live.parentNode) live.parentNode.removeChild(live);
    };
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
  global.Views.redo = RedoView;
  global.Views.history = HistoryView;
})(window);
