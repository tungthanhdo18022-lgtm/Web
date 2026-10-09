/* Test details page shown before starting a test. */
(function (global) {
  'use strict';

  var U = global.U;

  function IntroView(root, params) {
    var test = global.SATLibrary.get(params.id);
    if (!test || (!test.builtin && !(global.Admin && global.Admin.isAdmin()))) {
      root.innerHTML = '<div class="page narrow"><div class="empty-state">' + U.icon('warn') +
        '<h2>Test not found</h2><p>This test does not exist or is no longer available.</p><a class="btn btn--primary" href="#/">Back to practice tests</a></div></div>';
      return null;
    }
    var A = global.Attempts;
    var settings = global.Settings.get();
    var mode = settings.timed === false ? 'untimed' : 'timed';

    function render() {
      var prog = A.inProgress(test.id);
      var done = A.forTest(test.id).filter(function (a) { return a.status === 'completed' && a.result; });

      var progInfo = '';
      if (prog) {
        var mi = Math.min(prog.moduleIndex || 0, test.modules.length - 1);
        var m = test.modules[mi];
        var ms = prog.modules[mi] || { elapsed: 0, current: 0 };
        var left = prog.timed ? Math.max(0, (m.time * 60) - (ms.elapsed || 0)) : null;
        progInfo = 'Question ' + ((ms.current || 0) + 1) + ' of ' + m.questions.length +
          (test.modules.length > 1 ? ' (module ' + (mi + 1) + ')' : '') +
          ' · ' + Object.keys(prog.answers || {}).length + ' answered' +
          (left != null ? ' · ' + U.fmtClock(left) + ' left' : ' · untimed');
      }

      root.innerHTML =
        '<div class="page">' +
        '<a class="back-link" href="#/">' + U.icon('chevronLeft') + 'All practice tests</a>' +
        '<div class="detail">' +
        '<div class="card detail-main">' +
        '<div class="exam-card-pills"><span class="pill pill--blue">Total: ' + test.questionCount + '</span>' +
        '<span class="pill">MCQ: ' + test.mcqCount + '</span><span class="pill">SPR: ' + test.sprCount + '</span>' +
        (test.builtin ? '' : '<span class="badge badge--amber">Draft — only visible to you</span>') + '</div>' +
        '<h1>' + U.esc(test.title || 'Untitled test') + '</h1>' +
        (test.author ? '<p class="muted">By ' + U.esc(test.author) + '</p>' : '') +
        (test.description ? '<p class="detail-desc">' + U.esc(test.description) + '</p>' : '') +
        '<div class="facts">' +
        fact('Questions', test.questionCount) +
        fact('Time limit', Math.round(test.totalTime) + ' min') +
        fact('Multiple choice', test.mcqCount) +
        fact('Student response', test.sprCount) +
        (test.modules.length > 1 ? fact('Modules', test.modules.length) : '') +
        '</div>' +
        (test.modules.length > 1 ? '<ol class="module-list">' + test.modules.map(function (mm) {
          return '<li><b>' + U.esc(mm.title) + '</b><span>' + mm.questions.length + ' questions · ' + mm.time + ' min</span></li>';
        }).join('') + '</ol>' : '') +

        (prog ? '<div class="alert alert--info">' + U.icon('history') + '<div><b>You have a test in progress.</b><br>' + progInfo + '</div></div>' : '') +

        '<div class="form-grid">' +
        '<label class="field"><span class="field-label">Your name (shown during the test)</span>' +
        '<input id="intro-name" type="text" maxlength="40" autocomplete="name" placeholder="e.g. Alex Nguyen" value="' + U.esc(settings.name || '') + '"></label>' +
        '<div class="field"><span class="field-label">Mode</span><div class="mode-pick" role="radiogroup" aria-label="Mode">' +
        modeCard('timed', 'Timed', Math.round(test.totalTime) + ' minutes, submits automatically when time runs out — like test day.', U.icon('clock')) +
        modeCard('untimed', 'Untimed', 'The clock counts up. Take your time and focus on accuracy.', U.icon('book')) +
        '</div></div>' +
        '</div>' +

        '<div class="detail-actions">' +
        (prog
          ? '<a class="btn btn--primary btn--lg" href="#/exam/' + encodeURIComponent(prog.id) + '">' + U.icon('play') + 'Resume Exam</a>' +
          '<button class="btn btn--ghost btn--lg" data-act="restart">' + U.icon('refresh') + 'Start Over</button>'
          : '<button class="btn btn--primary btn--lg" data-act="start">' + U.icon('play') + 'Start Exam</button>') +
        '</div>' +
        '</div>' +

        '<aside class="card side-card">' +
        '<h3>Testing tools</h3>' +
        '<ul class="tool-list">' +
        '<li>' + U.icon('calculator') + '<span><b>Desmos calculator</b>Graphing and scientific</span></li>' +
        '<li>' + U.icon('reference') + '<span><b>Reference sheet</b>SAT Math formulas</span></li>' +
        '<li>' + U.icon('bookmark') + '<span><b>Mark for Review</b>Flag questions to revisit</span></li>' +
        '<li><span class="abc-mini">ABC</span><span><b>Answer eliminator</b>Cross out choices</span></li>' +
        '<li>' + U.icon('grid') + '<span><b>Question navigator</b>Jump to any question</span></li>' +
        '</ul>' +
        '<p class="muted" style="margin:16px 0 0;font-size:13px">Your answers are saved automatically. You can leave and resume later on this device.</p>' +
        '</aside>' +
        '</div>' +

        (done.length ? '<div class="section"><h2 class="h3">Previous attempts</h2><div class="attempt-list">' +
          done.map(function (a) {
            var p = a.result.percent;
            return '<a class="attempt-row" href="#/results/' + encodeURIComponent(a.id) + '">' +
              '<span class="score-pill ' + (p >= 80 ? 'is-good' : p >= 50 ? 'is-mid' : 'is-low') + '">' + a.result.correct + '/' + a.result.total + '</span>' +
              '<span class="attempt-row-main"><b>' + U.fmtDate(a.finishedAt) + '</b><span>' + (a.timed ? 'Timed' : 'Untimed') + ' · ' + U.fmtDuration(a.totalElapsed || 0) + ' · est. ' + a.result.estimated + '</span></span>' +
              U.icon('chevronRight') + '</a>';
          }).join('') + '</div></div>' : '') +
        '</div>';
    }

    function fact(label, value) {
      return '<div class="fact"><span>' + label + '</span><b>' + value + '</b></div>';
    }
    function modeCard(value, title, desc, icon) {
      var on = mode === value;
      return '<button type="button" class="mode-card' + (on ? ' is-on' : '') + '" role="radio" aria-checked="' + on + '" data-mode="' + value + '">' +
        '<span class="mode-icon">' + icon + '</span><span><b>' + title + '</b><small>' + desc + '</small></span></button>';
    }

    function start() {
      var nameEl = document.getElementById('intro-name');
      var name = nameEl ? nameEl.value.trim() : '';
      global.Settings.set({ name: name, timed: mode === 'timed' });
      var a = A.create(test, { name: name, timed: mode === 'timed' });
      location.hash = '#/exam/' + encodeURIComponent(a.id);
    }

    function onClick(e) {
      var m = e.target.closest('[data-mode]');
      if (m) {
        mode = m.getAttribute('data-mode');
        U.$$('.mode-card', root).forEach(function (c) {
          var on = c.getAttribute('data-mode') === mode;
          c.classList.toggle('is-on', on);
          c.setAttribute('aria-checked', String(on));
        });
        return;
      }
      var b = e.target.closest('[data-act]');
      if (!b) return;
      var act = b.getAttribute('data-act');
      if (act === 'start') start();
      if (act === 'restart') {
        U.confirm('Start over?', 'Your current progress on this test will be discarded and a new attempt will begin.', 'Start Over', { danger: true }).then(function (ok) {
          if (!ok) return;
          var p = A.inProgress(test.id);
          if (p) A.remove(p.id);
          start();
        });
      }
    }

    function onKey(e) {
      if (e.key === 'Enter' && e.target && e.target.id === 'intro-name') {
        e.preventDefault();
        var btn = root.querySelector('[data-act="start"]');
        if (btn) btn.click();
      }
    }

    root.addEventListener('click', onClick);
    root.addEventListener('keydown', onKey);
    render();
    return function () { root.removeEventListener('click', onClick); root.removeEventListener('keydown', onKey); };
  }

  global.Views = global.Views || {};
  global.Views.intro = IntroView;
})(window);
