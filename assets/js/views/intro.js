/* Test details page shown before starting a test. */
(function (global) {
  'use strict';

  var U = global.U;

  /** Test page of a Premium test this device has not unlocked: what it contains and how to unlock it. */
  function lockedView(root, stub) {
    function fact(label, value) { return '<div class="fact"><span>' + label + '</span><b>' + value + '</b></div>'; }
    var advanced = stub.section === 'advanced';
    var topic = stub.section === 'topic';
    root.innerHTML =
      '<div class="page">' +
      (advanced
        ? '<a class="back-link" href="#/advanced">' + U.icon('chevronLeft') + 'All advanced tests</a>'
        : topic
          ? '<a class="back-link" href="#/topic">' + U.icon('chevronLeft') + 'All topic tests</a>'
          : '<a class="back-link" href="#/practice">' + U.icon('chevronLeft') + 'All practice tests</a>') +
      '<div class="card detail-main locked-detail">' +
      '<div class="exam-card-pills"><span class="pill pill--total">Total: ' + stub.questionCount + '</span>' +
      '<span class="pill">MCQ: ' + stub.mcqCount + '</span><span class="pill">SPR: ' + stub.sprCount + '</span>' +
      '<span class="badge badge--premium">' + U.icon('lock') + 'Premium</span></div>' +
      '<h1>' + U.esc(stub.title || (advanced ? 'Advanced test' : 'Practice test')) + '</h1>' +
      (stub.description ? '<p class="detail-desc">' + U.esc(stub.description) + '</p>' : '') +
      '<div class="facts">' +
      fact('Questions', stub.questionCount) +
      fact('Time limit', Math.round(stub.totalTime) + ' min') +
      fact('Multiple choice', stub.mcqCount) +
      fact('Student response', stub.sprCount) +
      '</div>' +
      global.Premium.lockedHtml(stub) +
      '</div></div>';
    if (global.App && global.App.markNav) global.App.markNav(advanced ? 'advanced' : topic ? 'topic' : 'practice');
    return null;
  }

  function IntroView(root, params) {
    var Lib = global.SATLibrary;
    var test = Lib.get(params.id);
    if (!test && Lib.isLocked && Lib.isLocked(params.id) && global.Premium) return lockedView(root, Lib.premiumStub(params.id));
    if (!test || (!test.builtin && !(global.Admin && global.Admin.isAdmin()))) {
      root.innerHTML = '<div class="page narrow"><div class="empty-state">' + U.icon('warn') +
        '<h2>Test not found</h2><p>This test does not exist or is no longer available.</p><a class="btn btn--primary" href="#/">Back to practice tests</a></div></div>';
      return null;
    }
    var A = global.Attempts;
    var settings = global.Settings.get();
    var isAdvanced = test.section === 'advanced';
    var isTopic = test.section === 'topic';
    var isRW = /words in context|craft and structure|information and ideas|standard english|expression of ideas/i.test(test.category || test.mainDomain || '') ||
      (test.modules || []).some(function (m) { return /reading|writing/i.test(m.title || ''); });
    if (global.App && global.App.markNav) global.App.markNav(isAdvanced ? 'advanced' : isTopic ? 'topic' : 'practice');
    var mode = settings.timed === false ? 'untimed' : 'timed';

    function render() {
      var signedIn = !!(global.Auth && global.Auth.signedIn && global.Auth.signedIn());
      var ftFlag = null;
      try { ftFlag = JSON.parse(sessionStorage.getItem('tunn.fulltest.next') || localStorage.getItem('tunn.fulltest.next') || 'null'); } catch (e) {}
      var isFullTest = !!(ftFlag && ftFlag.from === test.id && ftFlag.next);
      /* Full Test: show the combined month (both sections) on this intro page. */
      var ftMath = isFullTest ? Lib.get(ftFlag.next) : null;
      if (isFullTest && !ftMath) isFullTest = false;
      var dTitle = test.title, dQ = test.questionCount, dTime = test.totalTime,
          dMcq = test.mcqCount, dSpr = test.sprCount, dDesc = test.description;
      if (isFullTest) {
        dTitle = String(test.title || '').replace(/ (?:Verbal|Reading and Writing)$/i, '');
        dQ = (test.questionCount || 0) + (ftMath.questionCount || 0);
        dTime = (test.totalTime || 0) + (ftMath.totalTime || 0);
        dMcq = (test.mcqCount || 0) + (ftMath.mcqCount || 0);
        dSpr = (test.sprCount || 0) + (ftMath.sprCount || 0);
        dDesc = '';
      }
      var prog = signedIn ? A.inProgress(test.id) : null;
      var done = A.forTest(test.id).filter(function (a) { return a.status === 'completed' && a.result; })
        .sort(function (a, b) { return (b.finishedAt || 0) - (a.finishedAt || 0); });

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
        (isAdvanced
          ? '<a class="back-link" href="#/advanced">' + U.icon('chevronLeft') + 'All advanced tests</a>'
          : isTopic
            ? '<a class="back-link" href="#/topic">' + U.icon('chevronLeft') + 'All topic tests</a>'
            : '<a class="back-link" href="#/practice">' + U.icon('chevronLeft') + 'All practice tests</a>') +
        '<div class="detail">' +
        '<div class="card detail-main">' +
        '<div class="exam-card-pills"><span class="pill pill--total">Total: ' + dQ + '</span>' +
        '<span class="pill">MCQ: ' + dMcq + '</span><span class="pill">SPR: ' + dSpr + '</span>' +
        (test.builtin ? '' : '<span class="badge badge--amber">Draft — only visible to you</span>') + '</div>' +
        '<h1>' + U.esc(dTitle || 'Untitled test') + '</h1>' +
        (dDesc ? '<p class="detail-desc">' + U.esc(dDesc) + '</p>' : '') +
        '<div class="facts">' +
        fact('Questions', dQ) +
        fact('Time limit', Math.round(dTime) + ' min') +
        fact('Multiple choice', dMcq) +
        fact('Student response', dSpr) +
        (test.modules.length > 1 ? fact('Modules', test.modules.length) : '') +
        '</div>' +
        (isFullTest
          ? '<ol class="module-list">' +
            '<li><b>Reading and Writing</b><span>' + test.questionCount + ' questions &middot; ' + Math.round(test.totalTime) + ' min</span></li>' +
            '<li><b>Math</b><span>' + ftMath.questionCount + ' questions &middot; ' + Math.round(ftMath.totalTime) + ' min</span></li></ol>'
          : (test.modules.length > 1 ? '<ol class="module-list">' + test.modules.map(function (mm) {
          return '<li><b>' + U.esc(mm.title) + '</b><span>' + mm.questions.length + ' questions · ' + mm.time + ' min</span></li>';
        }).join('') + '</ol>' : '')) +

        (prog ? '<div class="alert alert--info">' + U.icon('history') + '<div><b>You have a test in progress.</b><br>' + progInfo + '</div></div>' : '') +

        '<div class="form-grid">' +
        '<label class="field"><span class="field-label">Your name (shown during the test)</span>' +
        '<input id="intro-name" type="text" maxlength="40" autocomplete="name" placeholder="e.g. Alex Nguyen" value="' + U.esc(settings.name || '') + '"></label>' +
        '<div class="field"><span class="field-label">Mode</span><div class="mode-pick" role="radiogroup" aria-label="Mode">' +
        modeCard('timed', 'Timed', Math.round(dTime) + ' minutes total, submits automatically when time runs out — like test day.', U.icon('clock')) +
        modeCard('untimed', 'Untimed', 'The clock counts up. Take your time and focus on accuracy.', U.icon('book')) +
        '</div></div>' +
        '</div>' +

        '<div class="detail-actions">' +
        (signedIn
          ? (prog
            ? '<a class="btn btn--primary btn--lg" href="#/exam/' + encodeURIComponent(prog.id) + '">' + U.icon('play') + 'Resume Exam</a>' +
            '<button class="btn btn--ghost btn--lg" data-act="restart">' + U.icon('refresh') + 'Start Over</button>'
            : '<button class="btn btn--primary btn--lg" data-act="start">' + U.icon('play') + 'Start Exam</button>')
          : '<div class="login-wall">' + U.icon('lock') +
          '<div><b>Log in to take this test</b><span>You need an account to start exams — it keeps your results and streak saved.</span></div>' +
          '<button type="button" class="btn btn--primary btn--lg" data-auth-open>Log in / Sign up</button></div>') +
        '</div>' +
        '</div>' +

        '<aside class="card side-card">' +
        '<h3>Testing tools</h3>' +
        '<ul class="tool-list">' +
        (isRW ? '' :
          '<li>' + U.icon('calculator') + '<span><b>Desmos calculator</b>Graphing and scientific</span></li>' +
          '<li>' + U.icon('reference') + '<span><b>Reference sheet</b>SAT Math formulas</span></li>') +
        '<li>' + U.icon('bookmark') + '<span><b>Mark for Review</b>Flag questions to revisit</span></li>' +
        '<li><span class="abc-mini">ABC</span><span><b>Answer eliminator</b>Cross out choices</span></li>' +
        '<li>' + U.icon('grid') + '<span><b>Question navigator</b>Jump to any question</span></li>' +
        (isRW ?
          '<li>' + U.icon('clock') + '<span><b>Countdown timer</b>Hide or show at any time</span></li>' +
          '<li>' + U.icon('book') + '<span><b>Instant explanations</b>Detailed review &amp; Redo Mistakes</span></li>' : '') +
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
      // Clear attempts of this test that were opened but never worked on (e.g. the tab was closed)
      A.forTest(test.id).forEach(function (old) { if (A.isUntouched(old)) A.remove(old.id); });
      var a = A.create(test, { name: name, timed: mode === 'timed' });
      /* Full Test: carry name/mode so Part 2 (Math) auto-starts after Part 1. */
      try {
        var ff = JSON.parse(sessionStorage.getItem('tunn.fulltest.next') || localStorage.getItem('tunn.fulltest.next') || 'null');
        if (ff && ff.from === test.id && ff.next) {
          var fv = JSON.stringify({ from: test.id, next: ff.next, name: name, timed: mode === 'timed' });
          sessionStorage.setItem('tunn.fulltest.next', fv);
          localStorage.setItem('tunn.fulltest.next', fv);
        }
      } catch (e) { /* storage unavailable */ }
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
    var offAuth = (global.Auth && global.Auth.onChange) ? global.Auth.onChange(function () { render(); }) : null;
    render();
    return function () {
      if (offAuth) offAuth();
      root.removeEventListener('click', onClick); root.removeEventListener('keydown', onKey);
    };
  }

  global.Views = global.Views || {};
  global.Views.intro = IntroView;
})(window);
