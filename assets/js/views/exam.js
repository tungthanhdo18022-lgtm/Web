/* Exam screen: a Bluebook-style (Digital SAT) testing interface. */
(function (global) {
  'use strict';

  var U = global.U, R = global.R, G = global.G;
  var LETTERS = 'ABCDEFGH';
  var desmosPromise = null;

  var SPR_RULES =
    '<ul class="bb-dir-list">' +
    '<li>If you find <b>more than one correct answer</b>, enter only one answer.</li>' +
    '<li>You can enter up to 5 characters for a <b>positive</b> answer and up to 6 characters (including the negative sign) for a <b>negative</b> answer.</li>' +
    '<li>If your answer is a <b>fraction</b> that doesn’t fit in the provided space, enter the decimal equivalent.</li>' +
    '<li>If your answer is a <b>decimal</b> that doesn’t fit in the provided space, enter it by truncating or rounding at the fourth digit.</li>' +
    '<li>If your answer is a <b>mixed number</b> (such as 3½), enter it as an improper fraction (7/2) or its decimal equivalent (3.5).</li>' +
    '<li>Don’t enter <b>symbols</b> such as a percent sign, comma, or dollar sign.</li>' +
    '</ul>';

  function sprExamples() {
    function t(s) { return R.tex(s, false); }
    return '<table class="bb-examples"><thead><tr><th>Answer</th><th>Acceptable ways to enter answer</th><th>Unacceptable: will NOT receive credit</th></tr></thead><tbody>' +
      '<tr><td>' + t('3.5') + '</td><td>3.5<br>3.50<br>7/2</td><td>31/2<br>3 1/2</td></tr>' +
      '<tr><td>' + t('\\dfrac{2}{3}') + '</td><td>2/3<br>.6666<br>.6667<br>0.666<br>0.667</td><td>0.66<br>.66<br>0.67<br>.67</td></tr>' +
      '<tr><td>' + t('-\\dfrac{1}{3}') + '</td><td>-1/3<br>-.3333<br>-0.333</td><td>-.33<br>-0.33</td></tr>' +
      '</tbody></table>';
  }

  function directionsHtml() {
    return '<p>The questions in this section address a number of important math skills.</p>' +
      '<p>Use of a calculator is permitted for all questions. A reference sheet, calculator, and these directions can be accessed throughout the test.</p>' +
      '<p><b>Unless otherwise indicated:</b></p>' +
      '<ul class="bb-dir-list"><li>All variables and expressions represent real numbers.</li>' +
      '<li>Figures provided are drawn to scale.</li><li>All figures lie in a plane.</li>' +
      '<li>The domain of a given function ' + R.tex('f', false) + ' is the set of all real numbers ' + R.tex('x', false) + ' for which ' + R.tex('f(x)', false) + ' is a real number.</li></ul>' +
      '<p>For <b>multiple-choice questions</b>, solve each problem and choose the correct answer from the choices provided. Each multiple-choice question has a single correct answer.</p>' +
      '<p>For <b>student-produced response questions</b>, solve each problem and enter your answer as described below.</p>' +
      SPR_RULES + sprExamples();
  }

  function ExamView(root, params) {
    var attempt = global.Attempts.get(params.id);
    if (!attempt) return notFound(root, 'This test attempt could not be found.');
    if (attempt.status === 'completed') { location.replace('#/results/' + attempt.id); return null; }
    var test = global.SATLibrary.get(attempt.testId);
    if (!test) return notFound(root, 'The test for this attempt is no longer available. It may have been deleted.');
    if (!test.modules || !test.modules.length) return notFound(root, 'This test has no questions.');

    // Keep the attempt in sync if the test's structure changed after it was started
    while (attempt.modules.length < test.modules.length) attempt.modules.push({ elapsed: 0, current: 0, review: false, done: false });
    attempt.moduleIndex = U.clamp(attempt.moduleIndex || 0, 0, test.modules.length - 1);

    var renderOpts = test.assets && Object.keys(test.assets).length ? { assets: test.assets, assetsKey: test.id + ':' + (test.updatedAt || 0) } : {};
    var settings = global.Settings.get();
    var ui = {
      elimMode: false,
      timerHidden: false,
      navOpen: false,
      dirOpen: false,
      moreOpen: false,
      splitPct: U.clamp(+settings.splitPct || 50, 25, 75),
      warned: false,
      ended: false,
      leaving: false
    };
    var mi, mod, ms;
    var timerId = null, lastTick = 0, lastSave = 0;
    var calc = { el: null, open: false, mode: 'graphing', graphing: null, scientific: null, ro: null };
    var ref = { el: null, open: false };

    function setModule(i) {
      mi = i; mod = test.modules[mi]; ms = attempt.modules[mi];
      ms.current = U.clamp(ms.current || 0, 0, Math.max(0, mod.questions.length - 1));
      ui.warned = remaining() <= (global.APP_CONFIG.timeWarningSeconds || 300);
    }

    // Defensive: skip modules that have no questions. Returns false when no module with
    // questions is left (the caller should submit instead).
    function skipEmptyModules() {
      while (!mod.questions.length) {
        ms.done = true;
        if (mi >= test.modules.length - 1) return false;
        attempt.moduleIndex = mi + 1;
        setModule(mi + 1);
      }
      return true;
    }

    function limitSec() { return Math.round((mod.time || 0) * 60); }
    function timed() { return attempt.timed && limitSec() > 0; }
    function remaining() { return limitSec() - (ms.elapsed || 0); }
    function q() { return mod.questions[ms.current]; }

    function getStored() {
      return global.Attempts.getStored ? global.Attempts.getStored(attempt.id) : global.Attempts.get(attempt.id);
    }
    // Only treat a missing stored copy as "deleted elsewhere" once this attempt has actually been
    // written to storage (when storage is full it may only exist in this tab's memory).
    var everStored = !!getStored();

    function save(force) {
      var now = Date.now();
      if (!force && now - lastSave < 1500) return;
      lastSave = now;
      var res = global.Attempts.save(attempt);
      if (res === 'stale') endedElsewhere(false);
      else if (!res) U.toast('Couldn’t save your progress: browser storage is full.', 'error');
      else everStored = true;
    }

    // Another tab submitted (or deleted) this attempt: stop here so this tab can't overwrite it.
    function endedElsewhere(deleted) {
      if (ui.ended) return;
      ui.ended = true;
      stopTimer();
      U.toast(deleted ? 'This test was deleted in another tab.' : 'This test was submitted in another tab.', 'info', 5000);
      if (!ui.leaving) location.hash = deleted ? '#/' : '#/results/' + encodeURIComponent(attempt.id);
    }

    function onStorage(e) {
      if (ui.ended || (e.storageArea && e.storageArea !== global.localStorage)) return;
      var stored = getStored();
      if (!stored) { if (everStored) endedElsewhere(true); }
      else if (stored.status === 'completed') endedElsewhere(false);
    }

    /* ---------------- Layout ---------------- */
    root.innerHTML =
      '<div class="bb" id="bb">' +
      '<header class="bb-header">' +
      '  <div class="bb-h-left">' +
      '    <div class="bb-section-title" id="bb-title"></div>' +
      '    <button class="bb-link-btn" data-act="directions" aria-expanded="false" id="bb-dir-btn">Directions ' + U.icon('chevronDown') + '</button>' +
      '  </div>' +
      '  <div class="bb-h-center">' +
      '    <div class="bb-timer" id="bb-timer" aria-live="off"></div>' +
      '    <button class="bb-pill-sm" data-act="timer" id="bb-timer-btn">Hide</button>' +
      '  </div>' +
      '  <div class="bb-h-right">' +
      '    <button class="bb-tool" data-act="calc" id="bb-calc-btn" aria-label="Calculator">' + U.icon('calculator') + '<span>Calculator</span></button>' +
      '    <button class="bb-tool" data-act="ref" id="bb-ref-btn" aria-label="Reference">' + U.icon('reference') + '<span>Reference</span></button>' +
      '    <div class="bb-more-wrap"><button class="bb-tool" data-act="more" id="bb-more-btn" aria-label="More" aria-haspopup="menu" aria-expanded="false">' + U.icon('more') + '<span>More</span></button>' +
      '      <div class="bb-menu" id="bb-more-menu" role="menu" hidden>' +
      '        <button role="menuitem" data-act="help">' + U.icon('help') + 'Help</button>' +
      '        <button role="menuitem" data-act="exit">' + U.icon('logout') + 'Save and Exit</button>' +
      '        <button role="menuitem" data-act="submit-now">' + U.icon('send') + 'Submit Test</button>' +
      '      </div></div>' +
      '  </div>' +
      '</header>' +
      '<div class="bb-dashline" aria-hidden="true"></div>' +
      '<div class="bb-directions" id="bb-directions" hidden><div class="bb-directions-inner">' +
      '  <div class="bb-directions-body">' + directionsHtml() + '</div>' +
      '  <div class="bb-directions-foot"><button class="bb-btn bb-btn--primary" data-act="directions">Close</button></div>' +
      '</div></div>' +
      '<main class="bb-main" id="bb-main"></main>' +
      '<div class="bb-dashline" aria-hidden="true"></div>' +
      '<footer class="bb-footer">' +
      '  <div class="bb-f-left"><span class="bb-student" id="bb-student"></span></div>' +
      '  <div class="bb-f-center">' +
      '    <button class="bb-navbtn" data-act="nav" id="bb-navbtn" aria-expanded="false"></button>' +
      '    <div class="bb-navpop" id="bb-navpop" hidden role="dialog" aria-label="Question navigation"></div>' +
      '  </div>' +
      '  <div class="bb-f-right">' +
      '    <button class="bb-btn bb-btn--primary" data-act="back" id="bb-back">Back</button>' +
      '    <button class="bb-btn bb-btn--primary" data-act="next" id="bb-next">Next</button>' +
      '  </div>' +
      '</footer>' +
      '</div>';

    var $ = function (id) { return document.getElementById(id); };
    var els = {
      bb: $('bb'), title: $('bb-title'), timer: $('bb-timer'), timerBtn: $('bb-timer-btn'),
      main: $('bb-main'), navbtn: $('bb-navbtn'), navpop: $('bb-navpop'), back: $('bb-back'), next: $('bb-next'),
      student: $('bb-student'), dir: $('bb-directions'), dirBtn: $('bb-dir-btn'),
      moreBtn: $('bb-more-btn'), moreMenu: $('bb-more-menu'), calcBtn: $('bb-calc-btn'), refBtn: $('bb-ref-btn')
    };
    document.body.classList.add('in-exam');

    /* ---------------- Render ---------------- */
    function renderHeader() {
      var multi = test.modules.length > 1;
      var title = test.title || 'Practice Test';
      // A title that already names the module ("Math Review") is not repeated
      var named = new RegExp('\\b' + String(mod.title).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i').test(title);
      els.title.textContent = multi ? moduleName() : named ? title : title + ': ' + mod.title;
      document.title = (test.title || 'SAT Math') + ' – ' + global.APP_CONFIG.siteName;
      els.student.textContent = attempt.name || 'Student';
      renderTimer();
    }

    function renderTimer() {
      if (timed()) {
        var r = remaining();
        els.timer.textContent = U.fmtClock(Math.ceil(Math.max(0, r)));
        els.timer.classList.toggle('is-warning', r <= (global.APP_CONFIG.timeWarningSeconds || 300));
      } else {
        els.timer.textContent = U.fmtClock(ms.elapsed || 0);
        els.timer.classList.remove('is-warning');
      }
      els.timer.classList.toggle('is-hidden', ui.timerHidden);
      els.timerBtn.innerHTML = ui.timerHidden ? U.icon('clock') + '<span>Show</span>' : 'Hide';
      els.timerBtn.setAttribute('aria-label', ui.timerHidden ? 'Show timer' : 'Hide timer');
    }

    function isAnswered(qq) {
      var v = attempt.answers[qq.id];
      return v != null && String(v).trim() !== '';
    }

    function qHeadHtml(qq, idx, withElim) {
      var marked = !!attempt.marked[qq.id];
      return '<div class="bb-qhead">' +
        '<span class="bb-qnum">' + (idx + 1) + '</span>' +
        '<button class="bb-mark' + (marked ? ' is-marked' : '') + '" data-act="mark" aria-pressed="' + marked + '">' +
        U.icon(marked ? 'bookmarkFill' : 'bookmark') + '<span>Mark for Review</span></button>' +
        (withElim ? '<button class="bb-abc' + (ui.elimMode ? ' is-on' : '') + '" data-act="elim-mode" aria-pressed="' + ui.elimMode + '" title="Cross out answer choices"><span>ABC</span></button>' : '') +
        '</div>';
    }

    function choicesHtml(qq) {
      var sel = attempt.answers[qq.id] || '';
      var elim = attempt.eliminated[qq.id] || [];
      return '<div class="bb-choices' + (ui.elimMode ? ' is-elim-mode' : '') + '" role="radiogroup" aria-label="Answer choices">' +
        qq.choices.map(function (c, i) {
          var L = LETTERS[i];
          var isSel = sel === L, isEl = elim.indexOf(L) !== -1;
          return '<div class="bb-choice-row' + (isEl ? ' is-eliminated' : '') + '">' +
            '<button class="bb-choice' + (isSel ? ' is-selected' : '') + '" data-act="choose" data-letter="' + L + '" role="radio" aria-checked="' + isSel + '">' +
            '<span class="bb-letter">' + L + '</span><span class="bb-choice-text">' + R.render(c, Object.assign({ inline: true }, renderOpts)) + '</span></button>' +
            (ui.elimMode ? (isEl
              ? '<button class="bb-undo" data-act="elim" data-letter="' + L + '">Undo</button>'
              : '<button class="bb-elim" data-act="elim" data-letter="' + L + '" aria-label="Cross out choice ' + L + '"><span>' + L + '</span></button>') : '') +
            '</div>';
        }).join('') + '</div>';
    }

    function renderQuestion() {
      var qq = q();
      var idx = ms.current;
      var prompt = R.render(qq.prompt, renderOpts);
      if (qq.type === 'mcq') {
        els.main.innerHTML =
          '<div class="bb-stage bb-stage--single"><div class="bb-qcol">' +
          qHeadHtml(qq, idx, true) +
          '<div class="bb-prompt content">' + prompt + '</div>' +
          choicesHtml(qq) +
          '</div></div>';
      } else {
        var val = attempt.answers[qq.id] || '';
        els.main.innerHTML =
          '<div class="bb-stage bb-stage--split" style="--split:' + ui.splitPct + '%">' +
          '<section class="bb-pane bb-pane--left" aria-label="Directions"><div class="bb-pane-inner">' +
          '<details class="bb-spr-dir"' + (window.innerWidth > 720 ? ' open' : '') + '><summary>Student-produced response directions</summary>' + SPR_RULES +
          '<div class="bb-examples-wrap"><p class="bb-examples-title"><b>Examples</b></p>' + sprExamples() + '</div></details>' +
          '</div></section>' +
          '<div class="bb-divider" id="bb-divider" role="separator" aria-orientation="vertical" tabindex="0" aria-label="Resize panes"><span class="bb-divider-grip">' + U.icon('drag') + '</span></div>' +
          '<section class="bb-pane bb-pane--right"><div class="bb-pane-inner">' +
          qHeadHtml(qq, idx, false) +
          '<div class="bb-prompt content">' + prompt + '</div>' +
          '<div class="bb-spr">' +
          '<input class="bb-spr-input" id="bb-spr-input" type="text" inputmode="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" maxlength="6" aria-label="Your answer" value="' + U.esc(val) + '">' +
          '<div class="bb-spr-preview" id="bb-spr-preview">' + previewHtml(val) + '</div>' +
          '</div>' +
          '</div></section>' +
          '</div>';
        bindDivider();
      }
      els.main.scrollTop = 0;
      U.$$('.bb-pane', els.main).forEach(function (p) { p.scrollTop = 0; });
    }

    function previewHtml(val) {
      return 'Answer Preview: <span class="bb-spr-preview-val">' + (val ? R.answerPreview(val) : '') + '</span>';
    }

    function gridHtml(big) {
      return '<div class="bb-grid' + (big ? ' bb-grid--lg' : '') + '">' + mod.questions.map(function (qq, i) {
        var cls = 'bb-gcell';
        if (isAnswered(qq)) cls += ' is-answered';
        if (attempt.marked[qq.id]) cls += ' is-marked';
        var cur = !ms.review && i === ms.current;
        if (cur) cls += ' is-current';
        return '<button class="' + cls + '" data-act="goto" data-index="' + i + '" aria-label="Question ' + (i + 1) +
          (isAnswered(qq) ? ', answered' : ', unanswered') + (attempt.marked[qq.id] ? ', marked for review' : '') + '">' +
          (cur ? '<span class="bb-gpin">' + U.icon('pin') + '</span>' : '') +
          '<span class="bb-gnum">' + (i + 1) + '</span>' +
          (attempt.marked[qq.id] ? '<span class="bb-gflag">' + U.icon('bookmarkFill') + '</span>' : '') +
          '</button>';
      }).join('') + '</div>';
    }

    function legendHtml() {
      return '<div class="bb-legend">' +
        '<span class="bb-legend-item"><span class="bb-legend-pin">' + U.icon('pin') + '</span>Current</span>' +
        '<span class="bb-legend-item"><span class="bb-legend-box"></span>Unanswered</span>' +
        '<span class="bb-legend-item"><span class="bb-legend-flag">' + U.icon('bookmarkFill') + '</span>For Review</span>' +
        '</div>';
    }

    function moduleName() {
      // Titles that already name the module are shown as-is ("Phần" covers older Vietnamese tests)
      return /^(module|section|phần|part)\b/i.test(mod.title) ? mod.title : 'Module ' + (mi + 1) + ': ' + mod.title;
    }

    function sectionLabel() {
      return (test.modules.length > 1 ? moduleName() : mod.title) + ' Questions';
    }

    function renderNavPop() {
      els.navpop.innerHTML =
        '<div class="bb-navpop-head"><h3>' + U.esc(sectionLabel()) + '</h3>' +
        '<button class="bb-icon-btn" data-act="nav" aria-label="Close">' + U.icon('close') + '</button></div>' +
        legendHtml() + gridHtml(false) +
        '<div class="bb-navpop-foot"><button class="bb-btn bb-btn--outline" data-act="goto-review">Go to Review Page</button></div>' +
        '<span class="bb-navpop-arrow"></span>';
    }

    function renderReview() {
      var answered = mod.questions.filter(isAnswered).length;
      els.main.innerHTML =
        '<div class="bb-review">' +
        '<h1>Check Your Work</h1>' +
        '<p>On test day, you won’t be able to move on to the next module until time expires.</p>' +
        '<p>For these practice questions, you can click <b>' + (mi < test.modules.length - 1 ? 'Next' : 'Submit') + '</b> when you’re ready to move on.</p>' +
        '<div class="bb-review-card">' +
        '<div class="bb-review-card-head"><h2>' + U.esc(sectionLabel()) + '</h2>' + legendHtml() + '</div>' +
        gridHtml(true) +
        '<p class="bb-review-stat">' + answered + ' of ' + mod.questions.length + ' answered' +
        (mod.questions.length - answered ? ' · <span class="bb-review-warn">' + (mod.questions.length - answered) + ' unanswered</span>' : '') + '</p>' +
        '</div></div>';
    }

    function renderFooter() {
      var total = mod.questions.length;
      if (ms.review) {
        els.navbtn.hidden = true;
        els.back.hidden = false;
        els.next.textContent = mi < test.modules.length - 1 ? 'Next' : 'Submit';
      } else {
        els.navbtn.hidden = false;
        els.navbtn.innerHTML = '<span>Question ' + (ms.current + 1) + ' of ' + total + '</span>' + U.icon(ui.navOpen ? 'chevronDown' : 'chevronUp');
        els.back.hidden = ms.current === 0;
        els.next.textContent = 'Next';
      }
      els.navbtn.setAttribute('aria-expanded', String(ui.navOpen));
      if (ui.navOpen) renderNavPop();
      els.navpop.hidden = !ui.navOpen;
    }

    function renderAll() {
      renderHeader();
      if (ms.review) renderReview(); else renderQuestion();
      renderFooter();
    }

    /* ---------------- Navigation ---------------- */
    function goTo(i) {
      ms.review = false;
      ms.current = U.clamp(i, 0, mod.questions.length - 1);
      ui.navOpen = false;
      save(true);
      renderQuestion();
      renderFooter();
    }

    function goReview() {
      ms.review = true;
      ui.navOpen = false;
      save(true);
      renderReview();
      renderFooter();
    }

    function next() {
      if (ms.review) return finishModule(false);
      if (ms.current < mod.questions.length - 1) goTo(ms.current + 1);
      else goReview();
    }
    function back() {
      if (ms.review) { goTo(mod.questions.length - 1); return; }
      if (ms.current > 0) goTo(ms.current - 1);
    }

    function finishModule(timeUp) {
      var last = mi >= test.modules.length - 1;
      var unanswered = mod.questions.filter(function (qq) { return !isAnswered(qq); }).length;
      var p;
      if (timeUp) {
        p = Promise.resolve(true);
      } else if (last) {
        p = U.confirm('Submit your answers?',
          (unanswered ? 'You have <b>' + unanswered + ' unanswered</b> question' + (unanswered > 1 ? 's' : '') + '. ' : 'All questions are answered. ') +
          'After submitting, you’ll see your score and can review every question.', 'Submit', { cancelLabel: 'Keep Working' });
      } else {
        p = U.confirm('Move on to the next module?',
          (unanswered ? 'You have <b>' + unanswered + ' unanswered</b> question' + (unanswered > 1 ? 's' : '') + '. ' : '') +
          'You won’t be able to return to this module.', 'Continue', { cancelLabel: 'Keep Working' });
      }
      var from = mi;
      return p.then(function (ok) {
        // A dialog answered late (after time ran out, the module changed, or the test ended) must not act.
        if (!ok || ui.ended || mi !== from || (ms.done && !timeUp)) return;
        ms.done = true;
        if (last) return submit();
        attempt.moduleIndex = mi + 1;
        setModule(mi + 1);
        if (!skipEmptyModules()) return submit();
        ms.review = false;
        ui.navOpen = false; ui.elimMode = false;
        save(true);
        if (ui.ended) return;
        renderAll();
        startTimer();
        openDirections(true);
      });
    }

    function submit() {
      if (ui.ended) return;
      // Never overwrite a result that another tab already submitted
      var stored = getStored();
      if (stored && stored.status === 'completed') return endedElsewhere(false);
      ui.ended = true;
      stopTimer();
      attempt.modules.forEach(function (m) { m.done = true; });
      attempt.status = 'completed';
      attempt.finishedAt = Date.now();
      try {
        attempt.result = G.scoreAttempt(test, attempt);
      } catch (e) {
        console.error(e);
      }
      attempt.totalElapsed = attempt.modules.reduce(function (n, m) { return n + (m.elapsed || 0); }, 0);
      save(true);
      location.hash = '#/results/' + attempt.id;
    }

    /* ---------------- Timer ---------------- */
    function startTimer() {
      stopTimer();
      if (ui.ended) return;
      lastTick = performance.now();
      timerId = setInterval(tick, 250);
    }
    function stopTimer() { if (timerId) { clearInterval(timerId); timerId = null; } }
    function tick() {
      var now = performance.now();
      var dt = (now - lastTick) / 1000;
      lastTick = now;
      if (dt < 0 || dt > 3600) dt = 0;
      ms.elapsed = (ms.elapsed || 0) + dt;
      if (timed()) {
        var r = remaining();
        var warnAt = global.APP_CONFIG.timeWarningSeconds || 300;
        if (!ui.warned && r <= warnAt && r > 0 && limitSec() > warnAt) {
          ui.warned = true;
          if (ui.timerHidden) ui.timerHidden = false;
          var warnMin = Math.round(warnAt / 60);
          U.toast(warnMin + (warnMin === 1 ? ' minute' : ' minutes') + ' remaining in this module.', 'info', 4500);
        }
        if (r <= 0) {
          ms.elapsed = limitSec();
          renderTimer();
          timeUp();
          return;
        }
      }
      renderTimer();
      save(false);
    }

    function timeUp() {
      stopTimer();
      if (ui.ended || ui.leaving) return;
      closeAllPops();
      // Dismiss any dialog still open (e.g. "Move on to the next module?") so its buttons can't act later
      U.$$('.modal-overlay').forEach(function (m) {
        var x = m.querySelector('[data-modal-close]');
        if (x) x.click();
        m.remove();
      });
      var last = mi >= test.modules.length - 1;
      save(true);
      if (ui.ended) return;
      U.modal({
        title: 'Time’s up!',
        body: '<p>Time for this module has run out. Your answers have been saved.</p>' +
          (last ? '<p>Click <b>See Results</b> to view your score.</p>' : '<p>Click <b>Continue</b> to start the next module.</p>'),
        actions: [{ label: last ? 'See Results' : 'Continue', value: true, kind: 'primary' }],
        dismissible: false
      }).then(function () { finishModule(true); });
    }

    /* ---------------- Popovers ---------------- */
    function closeAllPops(except) {
      if (except !== 'nav' && ui.navOpen) { ui.navOpen = false; renderFooter(); }
      if (except !== 'dir' && ui.dirOpen) toggleDirections(false);
      if (except !== 'more' && ui.moreOpen) toggleMore(false);
    }
    function toggleDirections(force) {
      ui.dirOpen = force != null ? force : !ui.dirOpen;
      els.dir.hidden = !ui.dirOpen;
      els.dirBtn.setAttribute('aria-expanded', String(ui.dirOpen));
      els.dirBtn.classList.toggle('is-open', ui.dirOpen);
    }
    function openDirections(onlyAtStart) {
      if (onlyAtStart && (ms.elapsed > 1 || ms.current > 0)) return;
      toggleDirections(true);
    }
    function toggleMore(force) {
      ui.moreOpen = force != null ? force : !ui.moreOpen;
      els.moreMenu.hidden = !ui.moreOpen;
      els.moreBtn.setAttribute('aria-expanded', String(ui.moreOpen));
      els.moreBtn.classList.toggle('is-active', ui.moreOpen);
    }

    /* ---------------- Floating panels: Desmos calculator / Reference ---------------- */
    function buildFloat(kind, title, extraHead) {
      var el = document.createElement('div');
      el.className = 'bb-float bb-float--' + kind;
      el.setAttribute('role', 'dialog');
      el.setAttribute('aria-label', title);
      el.innerHTML =
        '<div class="bb-float-head">' +
        '<span class="bb-float-grip">' + U.icon('drag') + '</span>' +
        '<span class="bb-float-title">' + title + '</span>' + (extraHead || '') +
        '<button class="bb-icon-btn" data-float="expand" aria-label="Expand">' + U.icon('expand') + '</button>' +
        '<button class="bb-icon-btn" data-float="close" aria-label="Close">' + U.icon('close') + '</button>' +
        '</div><div class="bb-float-body"></div><span class="bb-float-resize" aria-hidden="true"></span>';
      els.bb.appendChild(el);
      U.makeDraggable(el, el.querySelector('.bb-float-head'));
      U.makeResizable(el, el.querySelector('.bb-float-resize'), { minW: 300, minH: 260, onEnd: resizeCalcs });
      return el;
    }

    // Keep a floating panel reachable after the window shrinks (expanded/hidden panels are skipped).
    function keepInView(el) {
      if (!el || el.hidden || el.classList.contains('is-expanded')) return;
      var vw = window.innerWidth, vh = window.innerHeight;
      var cur = parseFloat(el.style.width) || el.offsetWidth;
      // Remember the width the student chose (anything we didn't set ourselves) so the panel
      // grows back to it when the window widens again.
      var autoW = parseFloat(el.getAttribute('data-auto-w'));
      if (isNaN(autoW) || Math.abs(cur - autoW) > 1) el.setAttribute('data-pref-w', cur);
      var w = Math.min(parseFloat(el.getAttribute('data-pref-w')) || cur, Math.max(0, vw - 16));
      if (Math.abs(w - cur) > 0.5) el.style.width = w + 'px';
      el.setAttribute('data-auto-w', w);
      var rect = el.getBoundingClientRect();
      var left = parseFloat(el.style.left), top = parseFloat(el.style.top);
      if (isNaN(left)) left = rect.left;
      if (isNaN(top)) top = rect.top;
      el.style.left = U.clamp(left, 8, Math.max(8, vw - w - 8)) + 'px';
      el.style.top = U.clamp(top, 8, Math.max(8, vh - 60)) + 'px';
    }

    function onResize() {
      keepInView(calc.el);
      keepInView(ref.el);
    }

    function setExpandButton(btn, big) {
      btn.innerHTML = U.icon(big ? 'collapse' : 'expand');
      btn.setAttribute('aria-label', big ? 'Collapse' : 'Expand');
    }

    function resizeCalcs() {
      try { if (calc.graphing) calc.graphing.resize(); } catch (e) { /* ignore */ }
      try { if (calc.scientific) calc.scientific.resize(); } catch (e) { /* ignore */ }
    }

    function toggleCalc(force) {
      if (!calc.el) {
        calc.el = buildFloat('calc', 'Calculator',
          '<div class="bb-seg" role="tablist" aria-label="Calculator type"><button class="is-on" data-calc="graphing" role="tab" aria-selected="true">Graphing</button><button data-calc="scientific" role="tab" aria-selected="false">Scientific</button></div>');
        var body = calc.el.querySelector('.bb-float-body');
        body.innerHTML = '<div class="calc-host" id="calc-graphing"></div><div class="calc-host" id="calc-scientific" hidden></div>' +
          '<div class="calc-msg" id="calc-msg"><div class="spinner"></div><p>Loading the Desmos calculator…</p></div>';
        var vw = window.innerWidth, vh = window.innerHeight;
        calc.el.style.left = '16px';
        calc.el.style.top = '84px';
        calc.el.style.width = Math.min(460, vw - 32) + 'px';
        calc.el.style.height = Math.max(300, Math.min(600, vh - 170)) + 'px';
        calc.el.addEventListener('click', function (e) {
          var b = e.target.closest('[data-calc]');
          if (b) setCalcMode(b.getAttribute('data-calc'));
          var f = e.target.closest('[data-float]');
          if (f && f.getAttribute('data-float') === 'close') toggleCalc(false);
          if (f && f.getAttribute('data-float') === 'expand') {
            var big = calc.el.classList.toggle('is-expanded');
            setExpandButton(f, big);
            if (!big) keepInView(calc.el);
            setTimeout(resizeCalcs, 60);
          }
        });
        if (global.ResizeObserver) {
          calc.ro = new global.ResizeObserver(U.debounce(resizeCalcs, 80));
          calc.ro.observe(body);
        }
      }
      calc.open = force != null ? force : !calc.open;
      calc.el.hidden = !calc.open;
      els.calcBtn.classList.toggle('is-active', calc.open);
      if (calc.open) { keepInView(calc.el); ensureDesmos(); }
    }

    function setCalcMode(mode) {
      calc.mode = mode;
      U.$$('[data-calc]', calc.el).forEach(function (b) {
        var on = b.getAttribute('data-calc') === mode;
        b.classList.toggle('is-on', on);
        b.setAttribute('aria-selected', String(on));
      });
      document.getElementById('calc-graphing').hidden = mode !== 'graphing';
      document.getElementById('calc-scientific').hidden = mode !== 'scientific';
      ensureDesmos();
    }

    function ensureDesmos() {
      var cfg = global.APP_CONFIG;
      if (!desmosPromise) {
        desmosPromise = global.Desmos ? Promise.resolve() :
          U.loadScript(cfg.desmosApiUrl + '?apiKey=' + encodeURIComponent(cfg.desmosApiKey), 25000);
        desmosPromise.catch(function () { desmosPromise = null; });
      }
      desmosPromise.then(function () {
        if (!calc.el || !global.Desmos) throw new Error('Desmos unavailable');
        var msg = document.getElementById('calc-msg');
        if (msg) msg.hidden = true;
        if (calc.mode === 'graphing' && !calc.graphing) {
          calc.graphing = global.Desmos.GraphingCalculator(document.getElementById('calc-graphing'), {
            keypad: true, expressions: true, settingsMenu: true, zoomButtons: true,
            expressionsTopbar: true, border: false, images: false, folders: false, notes: false, links: false
          });
        }
        if (calc.mode === 'scientific' && !calc.scientific) {
          calc.scientific = global.Desmos.ScientificCalculator(document.getElementById('calc-scientific'), {});
        }
      }).catch(function () {
        var msg = document.getElementById('calc-msg');
        if (msg) {
          msg.hidden = false;
          msg.innerHTML = '<p><b>The Desmos calculator couldn’t load.</b></p><p>Check your internet connection and try again, or open Desmos in a new tab.</p>' +
            '<div class="calc-msg-actions"><button class="bb-btn bb-btn--primary" data-calc-retry>Try Again</button>' +
            '<a class="bb-btn bb-btn--outline" href="https://www.desmos.com/calculator" target="_blank" rel="noopener">Open Desmos</a></div>';
          var retry = msg.querySelector('[data-calc-retry]');
          if (retry) retry.addEventListener('click', function () {
            msg.innerHTML = '<div class="spinner"></div><p>Loading the Desmos calculator…</p>';
            ensureDesmos();
          });
        }
      });
    }

    function toggleRef(force) {
      if (!ref.el) {
        ref.el = buildFloat('ref', 'Reference', '');
        ref.el.querySelector('.bb-float-body').innerHTML = '<div class="ref-sheet">' + global.ReferenceSheet.html() + '</div>';
        var vw = window.innerWidth, vh = window.innerHeight;
        var w = Math.min(560, vw - 32);
        ref.el.style.width = w + 'px';
        ref.el.style.height = Math.max(300, Math.min(640, vh - 170)) + 'px';
        ref.el.style.left = Math.max(16, vw - w - 16) + 'px';
        ref.el.style.top = '84px';
        ref.el.addEventListener('click', function (e) {
          var f = e.target.closest('[data-float]');
          if (f && f.getAttribute('data-float') === 'close') toggleRef(false);
          if (f && f.getAttribute('data-float') === 'expand') {
            var big = ref.el.classList.toggle('is-expanded');
            setExpandButton(f, big);
            if (!big) keepInView(ref.el);
          }
        });
      }
      ref.open = force != null ? force : !ref.open;
      ref.el.hidden = !ref.open;
      els.refBtn.classList.toggle('is-active', ref.open);
      if (ref.open) keepInView(ref.el);
    }

    /* ---------------- Split-pane divider (student-produced response questions) ---------------- */
    function bindDivider() {
      var div = document.getElementById('bb-divider');
      var stage = els.main.querySelector('.bb-stage--split');
      if (!div || !stage) return;
      var active = false;
      div.addEventListener('pointerdown', function (e) {
        active = true; div.setPointerCapture && div.setPointerCapture(e.pointerId);
        stage.classList.add('is-resizing'); e.preventDefault();
      });
      div.addEventListener('pointermove', function (e) {
        if (!active) return;
        var rect = stage.getBoundingClientRect();
        ui.splitPct = U.clamp((e.clientX - rect.left) / rect.width * 100, 22, 78);
        stage.style.setProperty('--split', ui.splitPct + '%');
      });
      function end() {
        if (!active) return;
        active = false; stage.classList.remove('is-resizing');
        global.Settings.set({ splitPct: Math.round(ui.splitPct) });
      }
      div.addEventListener('pointerup', end);
      div.addEventListener('pointercancel', end);
      div.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
          ui.splitPct = U.clamp(ui.splitPct + (e.key === 'ArrowLeft' ? -4 : 4), 22, 78);
          stage.style.setProperty('--split', ui.splitPct + '%');
          global.Settings.set({ splitPct: Math.round(ui.splitPct) });
          e.preventDefault();
          e.stopPropagation(); // arrow keys resize the panes here; they must not change the question
        }
      });
    }

    /* ---------------- Event handling ---------------- */
    function onClick(e) {
      if (ui.ended) return;
      var t = e.target.closest('[data-act]');
      // Close popovers when clicking outside them
      if (ui.navOpen && !e.target.closest('#bb-navpop') && !e.target.closest('#bb-navbtn')) { ui.navOpen = false; renderFooter(); }
      if (ui.moreOpen && !e.target.closest('.bb-more-wrap')) toggleMore(false);
      if (!t || !els.bb.contains(t)) return;
      var act = t.getAttribute('data-act');
      var qq = ms.review ? null : q();
      switch (act) {
        case 'choose': {
          if (!qq) return;
          var L = t.getAttribute('data-letter');
          attempt.answers[qq.id] = L;
          var el = attempt.eliminated[qq.id];
          if (el && el.indexOf(L) !== -1) attempt.eliminated[qq.id] = el.filter(function (x) { return x !== L; });
          save(true);
          refreshChoices();
          break;
        }
        case 'elim': {
          if (!qq) return;
          var L2 = t.getAttribute('data-letter');
          var list = (attempt.eliminated[qq.id] || []).slice();
          var pos = list.indexOf(L2);
          if (pos === -1) {
            list.push(L2);
            if (attempt.answers[qq.id] === L2) delete attempt.answers[qq.id];
          } else list.splice(pos, 1);
          attempt.eliminated[qq.id] = list;
          save(true);
          refreshChoices();
          break;
        }
        case 'elim-mode':
          ui.elimMode = !ui.elimMode;
          t.classList.toggle('is-on', ui.elimMode);
          t.setAttribute('aria-pressed', String(ui.elimMode));
          refreshChoices();
          break;
        case 'mark':
          if (!qq) return;
          if (attempt.marked[qq.id]) delete attempt.marked[qq.id]; else attempt.marked[qq.id] = true;
          save(true);
          var on = !!attempt.marked[qq.id];
          t.classList.toggle('is-marked', on);
          t.setAttribute('aria-pressed', String(on));
          t.innerHTML = U.icon(on ? 'bookmarkFill' : 'bookmark') + '<span>Mark for Review</span>';
          if (ui.navOpen) renderNavPop();
          break;
        case 'next': next(); break;
        case 'back': back(); break;
        case 'nav':
          ui.navOpen = !ui.navOpen;
          if (ui.navOpen) closeAllPops('nav');
          renderFooter();
          break;
        case 'goto': goTo(+t.getAttribute('data-index')); break;
        case 'goto-review': goReview(); break;
        case 'directions':
          closeAllPops('dir');
          toggleDirections();
          break;
        case 'timer':
          ui.timerHidden = !ui.timerHidden;
          renderTimer();
          break;
        case 'calc': toggleCalc(); break;
        case 'ref': toggleRef(); break;
        case 'more':
          closeAllPops('more');
          toggleMore();
          break;
        case 'help': toggleMore(false); showHelp(); break;
        case 'exit':
          toggleMore(false);
          save(true);
          if (ui.ended) break; // submitted in another tab: endedElsewhere() already navigated
          location.hash = '#/test/' + encodeURIComponent(test.id);
          break;
        case 'submit-now':
          toggleMore(false);
          U.confirm('Submit the whole test now?', 'Your remaining time will be discarded and your answers will be scored immediately.', 'Submit Test', { cancelLabel: 'Keep Working' })
            .then(function (ok) { if (ok) submit(); });
          break;
      }
    }

    function refreshChoices() {
      var qq = q();
      var wrap = els.main.querySelector('.bb-choices');
      if (!wrap || qq.type !== 'mcq') return;
      var tmp = document.createElement('div');
      tmp.innerHTML = choicesHtml(qq);
      wrap.replaceWith(tmp.firstChild);
      if (ui.navOpen) renderNavPop();
    }

    function onInput(e) {
      if (e.target.id !== 'bb-spr-input') return;
      var qq = q();
      var input = e.target;
      var clean = G.sanitizeSpr(input.value);
      if (clean !== input.value) {
        var pos = input.selectionStart - (input.value.length - clean.length);
        input.value = clean;
        try { input.setSelectionRange(Math.max(0, pos), Math.max(0, pos)); } catch (err) { /* ignore */ }
      }
      input.maxLength = G.maxLen(clean);
      if (clean) attempt.answers[qq.id] = clean; else delete attempt.answers[qq.id];
      var pv = document.getElementById('bb-spr-preview');
      if (pv) pv.innerHTML = previewHtml(clean);
      save(false);
      if (ui.navOpen) renderNavPop();
    }

    function onKey(e) {
      if (e.defaultPrevented || ui.ended || document.querySelector('.modal-overlay')) return;
      if (e.key === 'Escape') {
        if (ui.navOpen || ui.dirOpen || ui.moreOpen) { closeAllPops(); e.preventDefault(); }
        return;
      }
      var tag = (e.target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) return;
      if (e.target.closest && e.target.closest('.bb-float')) return;
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.key === 'ArrowRight') { next(); e.preventDefault(); }
      else if (e.key === 'ArrowLeft') { if (ms.review || ms.current > 0) back(); e.preventDefault(); }
    }

    function onVisibility() { if (!ui.ended) save(true); }

    function showHelp() {
      var warnMin = Math.round((global.APP_CONFIG.timeWarningSeconds || 300) / 60);
      U.modal({
        title: 'Help',
        wide: true,
        body:
          '<div class="help-grid">' +
          '<div><h4>' + U.icon('bookmark') + ' Mark for Review</h4><p>Flag a question to come back to it later. Flagged questions show a red bookmark in the question navigator.</p></div>' +
          '<div><h4><span class="abc-mini">ABC</span> Cross Out</h4><p>Turn on Cross Out, then select the letter to the right of an answer choice to eliminate it.</p></div>' +
          '<div><h4>' + U.icon('calculator') + ' Calculator</h4><p>Desmos graphing and scientific calculator. Drag the title bar to move it and the bottom-right corner to resize it.</p></div>' +
          '<div><h4>' + U.icon('reference') + ' Reference</h4><p>The SAT Math reference sheet of formulas.</p></div>' +
          '<div><h4>' + U.icon('clock') + ' Timer</h4><p>Select <b>Hide</b> to hide the timer. It reappears with a reminder when ' + warnMin + ' minute' + (warnMin === 1 ? '' : 's') + ' remain' + (warnMin === 1 ? 's' : '') + '.</p></div>' +
          '<div><h4>' + U.icon('grid') + ' Question X of Y</h4><p>Open the question navigator to jump to any question and see which ones are unanswered.</p></div>' +
          '</div><p class="muted">Shortcuts: ← / → to move between questions (when you aren’t typing an answer), Esc to close panels. Your work is saved automatically, so you can exit and continue later.</p>',
        actions: [{ label: 'Close', value: true, kind: 'primary' }]
      });
    }

    function onBeforeUnload() { if (!ui.ended) save(true); }

    var onWindowResize = U.debounce(onResize, 100);

    function cleanup() {
      ui.leaving = true;
      stopTimer();
      if (!ui.ended) save(true);
      els.bb.removeEventListener('click', onClick);
      els.bb.removeEventListener('input', onInput);
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('beforeunload', onBeforeUnload);
      window.removeEventListener('pagehide', onBeforeUnload);
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('resize', onWindowResize);
      try { if (calc.graphing) calc.graphing.destroy(); } catch (e) { /* ignore */ }
      try { if (calc.scientific) calc.scientific.destroy(); } catch (e) { /* ignore */ }
      if (calc.ro) calc.ro.disconnect();
      document.body.classList.remove('in-exam');
    }

    els.bb.addEventListener('click', onClick);
    els.bb.addEventListener('input', onInput);
    document.addEventListener('keydown', onKey);
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('beforeunload', onBeforeUnload);
    window.addEventListener('pagehide', onBeforeUnload);
    window.addEventListener('storage', onStorage);
    window.addEventListener('resize', onWindowResize);

    // Start
    setModule(attempt.moduleIndex);
    if (ms.done) {
      // The current module was already finished (e.g. the page reloaded mid-transition): move on.
      if (mi < test.modules.length - 1) { attempt.moduleIndex = mi + 1; setModule(mi + 1); }
      else ms.done = false; // the last module was never submitted, so let the student submit it
    }
    if (!skipEmptyModules()) {
      submit();
      return cleanup;
    }
    renderAll();
    if (timed() && remaining() <= 0) {
      setTimeout(timeUp, 50);
    } else {
      startTimer();
      openDirections(true);
    }

    return cleanup;
  }

  function notFound(root, msg) {
    root.innerHTML = '<div class="page narrow"><div class="empty-state">' + U.icon('warn') +
      '<h2>Can’t open this test</h2><p>' + U.esc(msg) + '</p><a class="btn btn--primary" href="#/">Back to Home</a></div></div>';
    return null;
  }

  global.Views = global.Views || {};
  global.Views.exam = ExamView;
})(window);
