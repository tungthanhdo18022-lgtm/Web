/* Home: notice, SAT countdown, practice test grid with filters, advanced tests by category, recent results. */
(function (global) {
  'use strict';

  var U = global.U;
  var DISMISS_KEY = 'satmath.noticeDismissed';
  var CATEGORY_KEY = 'satmath.advancedCategory';
  var TOPIC_CATEGORY_KEY = 'satmath.topicCategory';
  var TOPIC_TAB_KEY = 'satmath.topicTab';
  // Advanced Tests filter: the four SAT Math domains, in this order
  var CATEGORIES = [
    { key: 'Algebra', label: 'Algebra' },
    { key: 'Advanced Math', label: 'Advanced Math' },
    { key: 'Problem-Solving and Data Analysis', label: 'Problem-Solving & Data Analysis' },
    { key: 'Geometry and Trigonometry', label: 'Geometry & Trigonometry' }
  ];

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

  function isAdvanced(t) { return t.section === 'advanced'; }
  function isTopic(t) { return t.section === 'topic'; }
  function isChallenge(t) { return t.section === 'challenge'; }

  /** "Algebra A1" -> { base: "Algebra A", round: 1 }; a title without a trailing number is round 0. */
  function roundOf(title) {
    var s = String(title || '').trim();
    var m = /^(.*?)\s*(\d+)$/.exec(s);
    return m && m[1] ? { base: m[1], round: +m[2] } : { base: s, round: 0 };
  }

  /**
   * Advanced Tests order: by category, then by round, then by name. So Algebra A, B, C … come
   * first, then Algebra A1, B1, C1 …, then A2, B2 …, however many tests are added later.
   */
  function advancedOrder(a, b) {
    var Lib = global.SATLibrary;
    var keys = CATEGORIES.map(function (c) { return c.key; });
    var ca = keys.indexOf(Lib.categoryOf(a)), cb = keys.indexOf(Lib.categoryOf(b));
    if (ca === -1) ca = keys.length;
    if (cb === -1) cb = keys.length;
    var ra = roundOf(a.title), rb = roundOf(b.title);
    return (ca - cb) || (ra.round - rb.round) ||
      ra.base.localeCompare(rb.base, undefined, { numeric: true, sensitivity: 'base' }) ||
      String(a.id).localeCompare(String(b.id));
  }

  function scoreClass(p) { return p >= 80 ? 'is-good' : p >= 50 ? 'is-mid' : 'is-low'; }

  /** Card for a Premium test (Advanced or Practice) that is still encrypted on this device. */
  function lockedCard(t) {
    var P = global.Premium;
    var title = t.title || 'Premium test';
    var prog = global.Attempts.inProgress(t.id);
    return '<article class="exam-card is-locked" data-id="' + U.esc(t.id) + '">' +
      '<div class="exam-card-pills">' +
      '<span class="pill pill--total">Total: ' + t.questionCount + '</span>' +
      '<span class="spacer"></span>' +
      '<span class="pill" title="Multiple-choice questions">MCQ: ' + t.mcqCount + '</span>' +
      '<span class="pill" title="Student-produced response questions">SPR: ' + t.sprCount + '</span>' +
      '</div>' +
      '<h3 class="exam-card-title"><a href="#/test/' + encodeURIComponent(t.id) + '">' + U.esc(title) + '</a></h3>' +
      '<p class="exam-card-status is-premium">' + U.icon('lock') + 'Premium' + (prog ? ' · in progress, saved' : '') + '</p>' +
      (P && P.available()
        ? '<button type="button" class="btn btn--primary btn--block" data-premium-unlock aria-label="Unlock ' + U.esc(title) + ' with a code">' + U.icon('lock') + 'Unlock with a code</button>'
        : '<p class="exam-card-soon">Coming soon</p>') +
      '</article>';
  }

  function examCard(t) {
    if (t.locked) return lockedCard(t);
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
      '<span class="pill pill--total">Total: ' + t.questionCount + '</span>' +
      '<span class="spacer"></span>' +
      '<span class="pill" title="Multiple-choice questions">MCQ: ' + t.mcqCount + '</span>' +
      '<span class="pill" title="Student-produced response questions">SPR: ' + t.sprCount + '</span>' +
      '</div>' +
      '<h3 class="exam-card-title"><a href="#/test/' + id + '">' + U.esc(t.title || 'Untitled test') + '</a></h3>' +
      status +
      (prog
        ? '<a class="btn btn--primary btn--block" href="#/exam/' + encodeURIComponent(prog.id) + '">Resume Exam</a>'
        : '<a class="btn btn--primary btn--block" href="#/test/' + id + '">Start Exam</a>') +
      (best ? '<div class="exam-card-links"><a href="#/results/' + encodeURIComponent(best.id) + '">View results</a></div>' : '') +
      '</article>';
  }

  /** One section entry inside a month card's "⋯" menu. */
  function monthMenuItem(label, t) {
    var A = global.Attempts;
    var main = '<span class="exam-card-menu-item-text"><span class="exam-card-menu-item-label">' + U.esc(label) + '</span>' +
      '<span class="exam-card-menu-item-meta">' + t.questionCount + ' questions</span></span>';
    if (t.locked) {
      var P = global.Premium;
      var badge = '<span class="exam-card-menu-badge is-premium">' + U.icon('lock') + 'Premium</span>';
      if (P && P.available()) {
        return '<button type="button" class="exam-card-menu-item" data-menu-item data-premium-unlock aria-label="Unlock ' + U.esc(t.title || label) + ' with a code">' + main + badge + '</button>';
      }
      return '<span class="exam-card-menu-item is-disabled" aria-disabled="true">' + main + badge + '</span>';
    }
    var prog = A.inProgress(t.id);
    var best = A.best(t.id);
    if (prog) {
      return '<a class="exam-card-menu-item" data-menu-item href="#/exam/' + encodeURIComponent(prog.id) + '">' + main +
        '<span class="exam-card-menu-badge is-progress">Resume</span></a>';
    }
    var badge2 = best ? '<span class="exam-card-menu-badge is-done">' + best.result.correct + '/' + best.result.total + '</span>' : '';
    return '<a class="exam-card-menu-item" data-menu-item href="#/test/' + encodeURIComponent(t.id) + '">' + main + badge2 + '</a>';
  }

  /** Group practice tests by month: "May 2026" + "May 2026 Reading and Writing" become one card. */
  function groupPractice(tests) {
    var map = {}, order = [];
    tests.forEach(function (t) {
      var title = String(t.title || '');
      var m = /^(.*?) (?:Verbal|Reading and Writing)$/i.exec(title);
      var base = m ? m[1] : title;
      var g = map[base];
      if (!g) { g = map[base] = { base: base, math: null, verbal: null, sortKey: 0, year: null }; order.push(g); }
      if (m) g.verbal = t; else g.math = t;
      if ((t.sortKey || 0) > g.sortKey) g.sortKey = t.sortKey;
      if (t.year && !g.year) g.year = t.year;
    });
    return order.map(function (g) {
      if (g.math && g.verbal) return { title: g.base, math: g.math, verbal: g.verbal, sortKey: g.sortKey, year: g.year, grouped: true };
      var single = g.math || g.verbal;
      return { title: g.base, math: g.math, verbal: g.verbal, single: single, sortKey: g.sortKey, year: g.year, grouped: false };
    }).sort(function (a, b) { return (b.sortKey - a.sortKey) || String(a.title).localeCompare(String(b.title)); });
  }

  var MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  /** Month number (1-12) parsed from a title like "October 2026". */
  function monthNumOf(title) {
    var m = /^(january|february|march|april|may|june|july|august|september|october|november|december)\b/i.exec(String(title || ''));
    if (!m) return null;
    var name = m[1].charAt(0).toUpperCase() + m[1].slice(1).toLowerCase();
    return MONTH_NAMES.indexOf(name) + 1;
  }

  /** Locked test id for a group (for the premium lock overlay), else the first open id. */
  function groupLockId(g) {
    if (g.math && g.math.locked) return g.math.id;
    if (g.verbal && g.verbal.locked) return g.verbal.id;
    return ((g.math || g.verbal) || {}).id || '';
  }

  /** Section menu items shared by practice rows and the featured card. */
  function groupMenuItems(g) {
    var items = '';
    if (g.verbal) items += monthMenuItem('Reading and Writing', g.verbal);
    if (g.math) items += monthMenuItem('Math', g.math);
    if (g.verbal && g.math && !g.verbal.locked && !g.math.locked) {
      items += '<a class="exam-card-menu-item exam-card-menu-item--full" data-menu-item data-fulltest-from="' + U.esc(g.verbal.id) + '" data-fulltest-next="' + U.esc(g.math.id) + '" href="#/test/' + encodeURIComponent(g.verbal.id) + '">' +
        '<span class="exam-card-menu-item-text"><span class="exam-card-menu-item-label">Full Test</span>' +
        '<span class="exam-card-menu-item-meta">Both sections &middot; ' + (g.verbal.questionCount + g.math.questionCount) + ' questions</span></span>' +
        '<span class="exam-card-menu-badge is-full">RW + Math</span></a>';
    }
    return items;
  }

  /** Primary action for a group: Full Test when both sections are open, else the open section, else the locked intro. */
  function groupStart(g) {
    if (g.verbal && g.math && !g.verbal.locked && !g.math.locked)
      return { href: '#/test/' + encodeURIComponent(g.verbal.id), ftFrom: g.verbal.id, ftNext: g.math.id };
    var t = null;
    if (g.verbal && !g.verbal.locked) t = g.verbal;
    else if (g.math && !g.math.locked) t = g.math;
    else t = g.verbal || g.math;
    return { href: '#/test/' + encodeURIComponent(t.id) };
  }

  function groupTotals(g) {
    var q = (g.verbal ? g.verbal.questionCount : 0) + (g.math ? g.math.questionCount : 0);
    var t = Math.round((g.verbal ? (g.verbal.totalTime || 0) : 0) + (g.math ? (g.math.totalTime || 0) : 0));
    return { q: q, t: t };
  }

  /** In-progress attempt for a group (either section) and how much of it is answered (0-100). */
  function groupProgress(g) {
    var A = global.Attempts;
    var prog = (g.verbal && A.inProgress(g.verbal.id)) || (g.math && A.inProgress(g.math.id));
    if (!prog) return null;
    var total = prog.totalQuestions || 0;
    var answered = Object.keys(prog.answers || {}).length;
    return { attempt: prog, pct: total ? Math.min(100, Math.round(answered / total * 100)) : 0 };
  }

  /** Right-side indicator for a practice row: best score badge, "Resume", lock or arrow. */
  function ppRowSide(g) {
    var A = global.Attempts;
    if (groupProgress(g)) return '<span class="pp-resume-tag">Resume</span>';
    var best = null;
    [g.verbal, g.math].forEach(function (t) {
      if (!t || t.locked) return;
      var b = A.best(t.id);
      if (b && b.result && (!best || (b.result.estimated || 0) > (best.result.estimated || 0))) best = b;
    });
    if (best) return '<span class="pp-score-badge"><b>' + (best.result.estimated || 0) + '</b><span>SCORE</span></span>';
    var allLocked = (!g.verbal || g.verbal.locked) && (!g.math || g.math.locked);
    if (allLocked) return '<span class="pp-arrow-circle is-lock" aria-hidden="true">' + U.icon('lock') + '</span>';
    return '<span class="pp-arrow-circle" aria-hidden="true">' + U.icon('chevronRight') + '</span>';
  }

  /** One row in the All tests list. Clicking opens the section menu. */
  /** Geometric test-type marks (P3 grid / bullseye / bars / diamond), replacing book & date badges. */
  function testMark(type) {
    var open = '<svg viewBox="0 0 48 48" aria-hidden="true">';
    if (type === 'practice') {
      var lt = '#cfe6d8', dk = '#1e8e5a', c = '';
      var cells = [[10,10,0],[20,10,1],[30,10,0],[10,20,0],[20,20,0],[30,20,1],[10,30,1],[20,30,0],[30,30,0]];
      for (var i = 0; i < cells.length; i++) {
        c += '<rect x="' + cells[i][0] + '" y="' + cells[i][1] + '" width="8" height="8" rx="2" fill="' + (cells[i][2] ? dk : lt) + '"/>';
      }
      return open + '<rect width="48" height="48" rx="13" fill="#e6f4ec"/>' + c + '</svg>';
    }
    if (type === 'topic') {
      return open + '<rect width="48" height="48" rx="13" fill="#e6f4ec"/>' +
        '<circle cx="24" cy="24" r="11" fill="none" stroke="#1e8e5a" stroke-width="4.5"/>' +
        '<circle cx="24" cy="24" r="4.5" fill="#1e8e5a"/></svg>';
    }
    if (type === 'advanced') {
      return open + '<rect width="48" height="48" rx="13" fill="#e6f4ec"/>' +
        '<rect x="12" y="29" width="7" height="9" rx="2" fill="#b7ddc6"/>' +
        '<rect x="20.5" y="23" width="7" height="15" rx="2" fill="#63b789"/>' +
        '<rect x="29" y="16" width="7" height="22" rx="2" fill="#1e8e5a"/></svg>';
    }
    if (type === 'elite') {
      return open + '<rect width="48" height="48" rx="13" fill="#e6f4ec"/>' +
        '<path d="M24 10 L38 24 L24 38 L10 24 Z" fill="#1e8e5a"/>' +
        '<path d="M24 18.5 L29.5 24 L24 29.5 L18.5 24 Z" fill="#e6f4ec"/></svg>';
    }
    return '';
  }

  function ppRowHtml(g, isNew) {
    var tot = groupTotals(g);
    var pr = groupProgress(g);
    return '<article class="pp-row" data-pp-row data-id="' + U.esc(groupLockId(g)) + '" tabindex="0" role="button" aria-haspopup="menu" aria-label="' + U.esc(g.title) + ': choose a section">' +
      '<div class="pp-mark">' + testMark('practice') + '</div>' +
      '<div class="pp-row-main"><h3>' + U.esc(g.title) + (isNew ? ' <span class="pp-chip-new">NEW</span>' : '') + '</h3>' +
      '<p>' + tot.q + ' questions &middot; ' + tot.t + ' min</p>' +
      (pr ? '<div class="pp-row-prog" title="' + pr.pct + '% answered"><span class="pp-row-bar"><span style="width:' + pr.pct + '%"></span></span><b>' + pr.pct + '%</b></div>' : '') +
      '</div>' +
      '<div class="pp-row-side">' + ppRowSide(g) + '</div>' +
      '<div class="pp-menu" role="menu" hidden><p class="exam-card-menu-caption">Choose a section</p>' + groupMenuItems(g) + '</div>' +
      '</article>';
  }

  /** The All tests list: grouped under year headings when showing every year. */
  function ppListHtml(shown, all, year) {
    if (!shown.length) return '<div class="empty-mini">No tests match this filter.</div>';
    var newest = all[0] ? all[0].title : null;
    function rows(list) {
      return '<div class="pp-list">' + list.map(function (g) { return ppRowHtml(g, g.title === newest); }).join('') + '</div>';
    }
    if (year !== 'all') return rows(shown);
    var byYear = [], map = {};
    shown.forEach(function (g) {
      var y = g.year ? String(g.year) : 'Other';
      if (!map[y]) { map[y] = []; byYear.push(y); }
      map[y].push(g);
    });
    return byYear.map(function (y) {
      var n = map[y].length;
      return '<div class="pp-year-group"><div class="pp-year-head"><span>' + U.esc(y) + '</span><i></i><em>' + n + ' test' + (n === 1 ? '' : 's') + '</em></div>' + rows(map[y]) + '</div>';
    }).join('');
  }

  /** Four stat tiles: streak, tests done, best score, average. */
  function ppTilesHtml(s, groups, info) {
    var total = groups.length;
    var donePct = total ? Math.min(100, Math.round(s.count / total * 100)) : 0;
    function tile(cls, icon, label, value, sub, extra) {
      return '<div class="pp-tile' + (cls ? ' ' + cls : '') + '">' +
        '<span class="pp-tile-icon">' + U.icon(icon) + '</span>' +
        '<div class="pp-stat-label">' + label + '</div>' +
        '<div class="pp-tile-num">' + value + '</div>' +
        (sub ? '<div class="pp-tile-sub">' + sub + '</div>' : '') + (extra || '') + '</div>';
    }
    return '<section class="pp-tiles" aria-label="Your stats">' +
      tile('is-amber', 'flame', 'STREAK', info.days + ' <small>day' + (info.days === 1 ? '' : 's') + '</small>',
        info.longest > info.days ? 'Longest: ' + info.longest + ' days' : (info.todayDone ? 'Today is done' : '30 min a day')) +
      tile('is-green', 'checkCircle', 'TESTS DONE', s.count + ' <small>/ ' + total + '</small>', '',
        '<span class="pp-tile-bar"><span style="width:' + donePct + '%"></span></span>') +
      (s.best
        ? tile('is-blue', 'trophy', 'BEST SCORE', String(s.best.estimated), U.esc(s.best.testTitle))
        : tile('is-empty', 'trophy', 'BEST SCORE', '&mdash;', 'Finish a test to see it')) +
      (s.count
        ? tile('is-plain', 'target', 'AVERAGE', String(s.avgEstimated), s.avgPercent + '% correct')
        : tile('is-empty', 'target', 'AVERAGE', '&mdash;', 'Unlocks after your first test')) +
      '</section>';
  }

  /** GitHub-style practice heatmap for the last 12 weeks (Monday-first columns). */
  function ppHeatmapHtml() {
    var S = global.Streak;
    var per = (S.secondsByDay ? S.secondsByDay() : {}) || {};
    var goal = S.STREAK_DAY_SECONDS;
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var dow = (today.getDay() + 6) % 7;
    var start = new Date(today.getFullYear(), today.getMonth(), today.getDate() - dow - 11 * 7);
    var cols = '', active = 0, minutes = 0;
    for (var w = 0; w < 12; w++) {
      var cells = '';
      for (var d = 0; d < 7; d++) {
        var day = new Date(start.getFullYear(), start.getMonth(), start.getDate() + w * 7 + d);
        var sec = per[S.dayKey(day.getTime())] || 0;
        var future = day > today;
        var lvl = future ? -1 : sec <= 0 ? 0 : sec < goal ? 1 : sec < goal * 2 ? 2 : 3;
        if (sec > 0 && !future) { active++; minutes += sec / 60; }
        var label = day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + (future ? '' : ': ' + Math.round(sec / 60) + ' min');
        cells += '<span class="pp-heat-cell lvl' + lvl + (day.getTime() === today.getTime() ? ' is-today' : '') + '" title="' + label + '"></span>';
      }
      cols += '<span class="pp-heat-col">' + cells + '</span>';
    }
    var hrs = minutes >= 60 ? (Math.round(minutes / 6) / 10) + ' h' : Math.round(minutes) + ' min';
    return '<section class="pp-heat" aria-label="Practice in the last 12 weeks">' +
      '<div class="pp-heat-grid" aria-hidden="true"><span class="pp-heat-days"><span>M</span><span></span><span>W</span><span></span><span>F</span><span></span><span>S</span></span>' + cols + '</div>' +
      '<div class="pp-heat-info"><div class="pp-stat-label">LAST 12 WEEKS</div>' +
      '<b>' + active + ' active day' + (active === 1 ? '' : 's') + (active ? ' &middot; ' + hrs : '') + '</b>' +
      '<p>Every square is a day you practised. A full square means 30+ minutes.</p>' +
      '<div class="pp-heat-legend">Less <span class="pp-heat-cell lvl0"></span><span class="pp-heat-cell lvl1"></span><span class="pp-heat-cell lvl2"></span><span class="pp-heat-cell lvl3"></span> More</div>' +
      '</div></section>';
  }

  /* ---------- Right panel: SAT countdown, question of the day, tip ---------- */

  function ppCountdownHtml() {
    var next = nextTestDate();
    if (!next) return '';
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var days = Math.round((next.date - today) / 86400000);
    var regOpen = next.deadline && next.deadline >= today;
    return '<section class="pp-side-card pp-countdown" aria-label="Next SAT">' +
      '<div class="pp-side-label">' + U.icon('calendar') + 'NEXT SAT</div>' +
      '<div class="pp-countdown-num"><b>' + days + '</b><span>' + (days === 1 ? 'day' : 'days') + ' to go</span></div>' +
      '<p>' + U.esc(fmtLong(next.date)) + '</p>' +
      (next.deadline ? '<p class="pp-countdown-sub">' + (regOpen ? 'Register by ' : 'Registration closed ') + U.esc(fmtShort(next.deadline)) + '</p>' : '') +
      '</section>';
  }

  var TIPS = [
    { t: 'Desmos tip', b: 'Type each side of an equation as its own line. The x-value where the graphs cross is the solution.' },
    { t: 'Desmos tip', b: 'For a system of equations, graph both and click the intersection point to read its coordinates.' },
    { t: 'Desmos tip', b: 'Use a slider: type an equation with a letter like k and Desmos lets you drag k to test answer choices.' },
    { t: 'Timing tip', b: 'Mark hard questions for review and move on. Every question is worth the same, so collect the easy points first.' },
    { t: 'Reading tip', b: 'For Words in Context, cover the choices and predict your own word before you read A to D.' },
    { t: 'Math tip', b: 'Read the last line of the question again before you answer. Many traps ask for 2x or x + 1, not x.' },
    { t: 'Grammar tip', b: 'Two complete sentences cannot be joined by a comma alone. Look for a period, a semicolon or a conjunction.' }
  ];
  function ppTipHtml() {
    var now = new Date();
    var idx = Math.floor(new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() / 86400000) % TIPS.length;
    var tip = TIPS[idx];
    return '<section class="pp-side-card pp-tip" aria-label="Tip of the day">' +
      '<span class="pp-tip-icon">' + U.icon('bulb') + '</span>' +
      '<div><div class="pp-side-label">' + U.esc(tip.t.toUpperCase()) + '</div><p>' + U.esc(tip.b) + '</p></div></section>';
  }

  function greeting() {
    var h = new Date().getHours();
    return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
  }
  function greetingSub(info) {
    if (info.todayDone) return 'You have practised today. Nice work!';
    if (info.days > 0) return 'One test today keeps your ' + info.days + '-day streak alive.';
    return 'Pick a test below and start your streak today.';
  }

  /** Weak areas card with red bars + Practice link. */
  function ppWeakHtml(s) {
    var weak = s.domains.filter(function (d) { return d.total >= 3; }).slice(0, 3);
    if (!weak.length) return '';
    return '<section class="pp-weak" aria-label="Weak areas">' +
      '<div class="pp-stat-label">WEAK AREAS</div>' +
      weak.map(function (d) {
        var p = Math.max(0, Math.min(100, Math.round(d.percent)));
        return '<div class="pp-weak-row"><span class="pp-weak-name">' + U.esc(d.domain) + '</span>' +
          '<span class="pp-weak-bar"><span style="width:' + p + '%"></span></span>' +
          '<span class="pp-weak-pct">' + p + '%</span></div>';
      }).join('') +
      '<a class="pp-practice-link" href="#/topic">Practice &rarr;</a></section>';
  }

  /** Dark featured card for the latest administration. */
  function ppFeaturedHtml(g, total) {
    var tot = groupTotals(g);
    var sections = (g.verbal && g.math) ? 'Reading &amp; Math' : (g.verbal ? 'Reading &amp; Writing' : 'Math');
    var st = groupStart(g);
    var attrs = ' href="' + st.href + '"' + (st.ftNext ? ' data-fulltest-from="' + U.esc(st.ftFrom) + '" data-fulltest-next="' + U.esc(st.ftNext) + '"' : '');
    return '<section class="pp-featured" aria-label="Latest test">' +
      '<div class="pp-featured-top"><span class="pp-new">NEW &middot; Latest administration</span>' +
      '<span class="pp-count">#' + total + '</span>' +
      '<button type="button" class="pp-featured-menu-btn" data-menu-btn aria-haspopup="menu" aria-expanded="false" aria-label="Choose a section for ' + U.esc(g.title) + '">⋯</button>' +
      '<div class="pp-menu pp-menu--featured" role="menu" hidden><p class="exam-card-menu-caption">Choose a section</p>' + groupMenuItems(g) + '</div></div>' +
      '<h2>' + U.esc(g.title) + '</h2>' +
      '<div class="pp-featured-bottom"><p>' + tot.q + ' questions &middot; ' + tot.t + ' min &middot; ' + sections + '</p>' +
      '<a class="pp-start" data-start' + attrs + '>Start test &rarr;</a></div>' +
      '</section>';
  }

  /** Most recent in-progress attempt, if any. */
  function continueAttempt() {
    var all = global.Attempts.all();
    for (var i = 0; i < all.length; i++) {
      if (all[i].status === 'in-progress' && !global.Attempts.isUntouched(all[i])) return all[i];
    }
    return null;
  }

  function ppContinueHtml() {
    var a = continueAttempt();
    if (!a) return '';
    var test = global.SATLibrary.get(a.testId);
    var totalQ = a.totalQuestions || 0;
    var qNum = totalQ, pct = 0;
    if (test && test.modules) {
      var qBefore = 0, mi = a.moduleIndex || 0;
      for (var i = 0; i < mi && i < test.modules.length; i++) qBefore += ((test.modules[i].questions || []).length);
      var cur = ((a.modules || [])[mi] || {}).current || 0;
      qNum = Math.min(totalQ, qBefore + cur + 1);
    }
    var answered = Object.keys(a.answers || {}).length;
    if (totalQ) pct = Math.min(100, Math.round(answered / totalQ * 100));
    var timeHtml = '';
    if (a.timed && test && test.modules) {
      var tm = test.modules[a.moduleIndex || 0], am = (a.modules || [])[a.moduleIndex || 0] || {};
      if (tm && tm.time) timeHtml = ' &middot; ' + Math.max(0, Math.ceil((tm.time * 60 - (am.elapsed || 0)) / 60)) + ' min left';
    }
    return '<section class="pp-continue" aria-label="Continue your test">' +
      '<span class="pp-continue-deco" aria-hidden="true">&radic;x &pi; &Sigma;</span>' +
      '<div class="pp-continue-main"><div class="pp-continue-label">CONTINUE WHERE YOU LEFT OFF</div>' +
      '<h3>' + U.esc(a.testTitle || 'Test') + '</h3>' +
      '<p class="pp-continue-sub">Question ' + qNum + ' of ' + totalQ + timeHtml + '</p>' +
      '<div class="pp-progress"><span style="width:' + pct + '%"></span></div></div>' +
      '<a class="pp-resume" href="#/exam/' + encodeURIComponent(a.id) + '">' + U.icon('play') + 'Resume</a></section>';
  }

  /** Compact horizontal row for a single test (Topic / Challenge / Advanced pages). */
  function libRowHtml(t, mark) {
    var A = global.Attempts;
    var side;
    if (t.locked) {
      side = '<span class="pp-lock" aria-hidden="true">' + U.icon('lock') + '</span>';
    } else if (A.inProgress(t.id)) {
      side = '<span class="pp-dot" title="In progress"></span>';
    } else {
      var b = A.best(t.id);
      side = (b && b.result) ? '<span class="pp-score">' + (b.result.estimated || 0) + '</span>'
        : '<span class="pp-arrow" aria-hidden="true">&rarr;</span>';
    }
    return '<article class="pp-row" data-href="#/test/' + encodeURIComponent(t.id) + '" tabindex="0" role="link" aria-label="' + U.esc(t.title) + '">' +
      '<div class="pp-mark">' + (t.locked ? U.icon('lock') : testMark(mark || 'topic')) + '</div>' +
      '<div class="pp-row-main"><h3>' + U.esc(t.title) + '</h3>' +
      '<p>' + t.questionCount + ' questions &middot; ' + Math.round(t.totalTime || 0) + ' min</p></div>' +
      '<div class="pp-row-side">' + side + '</div></article>';
  }

  function ppYearTab(value, label, current) {
    var on = current === value;
    return '<button type="button" class="' + (on ? 'is-on' : '') + '" data-filter="year" data-value="' + U.esc(value) + '" aria-pressed="' + on + '">' + U.esc(label) + '</button>';
  }

  /** Practice streak card + stats dashboard row ('' when neither is available). */
  function HomeView(root, params, match) {
    var Lib = global.SATLibrary;
    var navKey = (match && match.nav) || 'practice';
    var filter = { year: 'all' };
    var savedCategory = U.lsGet(CATEGORY_KEY, 'all');
    var category = CATEGORIES.some(function (c) { return c.key === savedCategory; }) ? savedCategory : 'all';
    var restored = category !== 'all';
    var topicCategory = U.lsGet(TOPIC_CATEGORY_KEY, 'all') || 'all';
    var topicTab = U.lsGet(TOPIC_TAB_KEY, 'verbal') || 'verbal';
    var timer = null;

    /** Premium tests this device cannot open yet (encrypted; listed from their public card data). */
    function lockedStubs() { return Lib.premiumStubs ? Lib.premiumStubs().filter(function (s) { return Lib.isLocked(s.id); }) : []; }
    /** Practice tests (newest first): the free and unlocked ones plus the locked Premium practice tests. */
    function practiceTests() {
      return Lib.published().filter(function (t) { return !isAdvanced(t) && !isTopic(t) && !isChallenge(t); })
        .concat(lockedStubs().filter(function (t) { return !isAdvanced(t) && !isTopic(t) && !isChallenge(t); }))
        .sort(function (a, b) { return (b.sortKey - a.sortKey) || String(a.title).localeCompare(String(b.title)); });
    }
    function topicCategoryOf(t) {
      return (t && (t.category || roundOf(t.title).base || Lib.categoryOf(t))) || 'General';
    }
    function isMathSkill(cat) {
      return CATEGORIES.some(function (c) { return c.key === cat; });
    }
    /** Topic tests split into two selectable groups: Math vs Reading and Writing (by skill category). */
    function topicSubjectOf(t) { return isMathSkill(topicCategoryOf(t)) ? 'math' : 'verbal'; }
    function tabTopics(tab) {
      return topicTests().filter(function (t) { return topicSubjectOf(t) === tab; });
    }
    function tabTopicCategories(tab) { return topicCategories(tabTopics(tab)); }
    function topicOrder(a, b) {
      var ra = roundOf(a.title), rb = roundOf(b.title);
      return ra.base.localeCompare(rb.base, undefined, { numeric: true, sensitivity: 'base' }) ||
        (ra.round - rb.round) ||
        String(a.id).localeCompare(String(b.id));
    }
    /** Topic tests: focused skill sets (e.g. Words in Context 1). */
    function topicTests() {
      return Lib.published().filter(isTopic).concat(lockedStubs().filter(isTopic)).sort(topicOrder);
    }
    function topicCategories(list) {
      var seen = {}, out = [];
      list.forEach(function (t) {
        var c = topicCategoryOf(t);
        if (c && !seen[c]) { seen[c] = true; out.push({ key: c, label: c }); }
      });
      return out;
    }
    /** Advanced tests: the unlocked ones plus the encrypted ones this device cannot open yet. */
    function advancedTests() {
      return Lib.published().filter(isAdvanced).concat(lockedStubs().filter(isAdvanced)).sort(advancedOrder);
    }
    /** Challenge tests: hard Math sets (e.g. Math 1). */
    function challengeTests() {
      return Lib.published().filter(isChallenge).concat(lockedStubs().filter(isChallenge)).sort(topicOrder);
    }

    function renderPracticePage() {
      var groups = groupPractice(practiceTests());
      var s = global.Stats.summary();
      var info = global.Streak.info();
      var years = [];
      groups.forEach(function (g) { if (g.year && years.indexOf(g.year) === -1) years.push(g.year); });
      years.sort(function (a, b) { return b - a; });
      var shown = groups.filter(function (g) { return filter.year === 'all' || String(g.year) === filter.year; });
      var today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
      root.innerHTML =
        '<div class="page pp pp--dash">' +
        '<div class="pp-main">' +
        '<div class="pp-head"><div><div class="pp-eyebrow">' + U.esc(today) + '</div><h1>' + greeting() + '</h1>' +
        '<p class="pp-greet-sub">' + U.esc(greetingSub(info)) + '</p></div>' +
        (info.days > 0 ? '<span class="pp-streak">' + U.icon('flame') + info.days + '-day streak</span>' : '') + '</div>' +
        (global.Premium ? global.Premium.barHtml(lockedStubs().filter(function (t) { return !isAdvanced(t) && !isTopic(t) && !isChallenge(t); }).length) : '') +
        ppContinueHtml() +
        ppTilesHtml(s, groups, info) +
        ppHeatmapHtml() +
        ppWeakHtml(s) +
        '<div class="pp-list-head"><h2>All tests</h2>' +
        (years.length ? '<div class="pp-years" role="group" aria-label="Filter by year">' +
          ppYearTab('all', 'All', filter.year) + years.map(function (y) { return ppYearTab(String(y), String(y), filter.year); }).join('') + '</div>' : '') +
        '</div>' +
        '<div class="pp-lists" id="pp-lists">' + ppListHtml(shown, groups, filter.year) + '</div>' +
        '</div>' +
        '<aside class="pp-aside" aria-label="Today">' + ppCountdownHtml() + (global.Payment ? global.Payment.cardHtml() : '') + ppTipHtml() + '</aside>' +
        '</div>';
    }

    function renderTopicPage() {
      if (topicTab !== 'math' && topicTab !== 'verbal') topicTab = 'verbal';
      if (!tabTopics(topicTab).length) topicTab = tabTopics('verbal').length ? 'verbal' : 'math';
      if (topicCategory !== 'all' && !tabTopicCategories(topicTab).some(function (c) { return c.key === topicCategory; })) topicCategory = 'all';
      root.innerHTML =
        '<div class="page pp">' +
        '<div class="pp-head"><h1>Topic Tests</h1></div>' +
        '<p class="pp-sub">Focused question sets organized by skill and topic.</p>' +
        '<div class="seg topic-seg" role="tablist" aria-label="Choose Math or Reading and Writing topic tests">' +
        topicTabBtn('verbal', 'Reading and Writing') + topicTabBtn('math', 'Math') + '</div>' +
        '<div class="cat-bar" id="topic-cat-bar" role="group" aria-label="Filter topic tests by skill"></div>' +
        '<div class="pp-list" id="topic-grid"></div></div>';
      renderTopicBar();
      renderTopic();
      showActiveChip();
    }

    function renderChallengePage() {
      root.innerHTML =
        '<div class="page pp">' +
        '<div class="pp-head"><h1>Elite Tests</h1></div>' +
        '<p class="pp-sub">Extra-hard sets to push your score higher.</p>' +
        '<div class="pp-list" id="challenge-grid"></div></div>';
      renderChallenge();
    }

    function renderAdvancedPage() {
      if (restored && !advancedTests().some(function (t) { return Lib.categoryOf(t) === category; })) category = 'all';
      restored = false;
      var advanced = advancedTests();
      root.innerHTML =
        '<div class="page pp">' +
        '<div class="pp-head"><h1>Advanced Tests</h1></div>' +
        '<p class="pp-sub">Harder question sets that focus on one topic.</p>' +
        '<div class="cat-bar" role="group" aria-label="Filter advanced tests by category">' +
        catChip('all', 'All', advanced.length) +
        CATEGORIES.map(function (c) {
          return catChip(c.key, c.label, advanced.filter(function (t) { return Lib.categoryOf(t) === c.key; }).length);
        }).join('') + '</div>' +
        '<div class="pp-list" id="adv-grid"></div></div>';
      renderAdvanced();
      showActiveChip();
    }

    function render() {
      if (navKey === 'topic') return renderTopicPage();
      if (navKey === 'challenge') return renderChallengePage();
      if (navKey === 'advanced') return renderAdvancedPage();
      return renderPracticePage();
    }

    /** Scroll the chip bar (not the page) so the selected chip is visible on narrow screens. */
    function showActiveChip() {
      var on = root.querySelector('.cat-bar .chip.is-on');
      if (on) on.parentNode.scrollLeft = Math.max(0, on.offsetLeft - on.parentNode.offsetLeft - 8);
    }

    function catChip(key, label, n) {
      var on = category === key;
      return '<button type="button" class="chip' + (on ? ' is-on' : '') + '" data-cat="' + U.esc(key) + '" aria-pressed="' + on + '">' +
        U.esc(label) + ' <span>' + n + '</span></button>';
    }

    function topicCatChip(key, label, n) {
      var on = topicCategory === key;
      return '<button type="button" class="chip' + (on ? ' is-on' : '') + '" data-topic-cat="' + U.esc(key) + '" aria-pressed="' + on + '">' +
        U.esc(label) + ' <span>' + n + '</span></button>';
    }

    function topicTabBtn(tab, label) {
      var n = tabTopics(tab).length;
      var on = topicTab === tab;
      return '<button type="button" role="tab" class="' + (on ? 'is-on' : '') + '" data-topic-tab="' + tab + '" aria-selected="' + on + '">' +
        U.esc(label) + ' <span>' + n + '</span></button>';
    }
    function renderTopicBar() {
      var bar = document.getElementById('topic-cat-bar');
      if (!bar) return;
      var list = tabTopics(topicTab);
      bar.innerHTML = topicCatChip('all', 'All', list.length) +
        tabTopicCategories(topicTab).map(function (c) {
          return topicCatChip(c.key, c.label, list.filter(function (t) { return topicCategoryOf(t) === c.key; }).length);
        }).join('');
    }
    function renderTopic() {
      var grid = document.getElementById('topic-grid');
      if (!grid) return;
      var tests = tabTopics(topicTab).filter(function (t) { return topicCategory === 'all' || topicCategoryOf(t) === topicCategory; });
      grid.innerHTML = tests.length ? tests.map(function (t) { return libRowHtml(t, 'topic'); }).join('')
        : '<div class="empty-mini">' + (topicTab === 'math'
          ? (challengeTests().length ? 'No Math topic tests yet. Try the <b>Elite Tests</b> section below for hard Math practice!' : 'No Math topic tests yet. Check back soon!')
          : 'No topic tests match this filter yet.') + '</div>';
    }

    function renderAdvanced() {
      var grid = document.getElementById('adv-grid');
      if (!grid) return;
      var tests = advancedTests().filter(function (t) { return category === 'all' || Lib.categoryOf(t) === category; });
      var cat = CATEGORIES.filter(function (c) { return c.key === category; })[0];
      grid.innerHTML = tests.length ? tests.map(function (t) { return libRowHtml(t, 'advanced'); }).join('')
        : '<div class="empty-mini">No ' + U.esc(cat ? cat.label : 'advanced') + ' tests yet. Check back soon!</div>';
    }

    function renderChallenge() {
      var grid = document.getElementById('challenge-grid');
      if (!grid) return;
      var tests = challengeTests();
      grid.innerHTML = tests.length ? tests.map(function (t) { return libRowHtml(t, 'elite'); }).join('')
        : '<div class="empty-mini">No challenge tests yet. Check back soon!</div>';
    }

    function seg(kind, value, label) {
      return '<button type="button" class="' + (filter[kind] === value ? 'is-on' : '') + '" data-filter="' + kind + '" data-value="' + U.esc(value) + '" aria-pressed="' + (filter[kind] === value) + '">' + U.esc(label) + '</button>';
    }

    function renderGrid() {
      var list = root.querySelector('#pp-lists');
      if (!list) return;
      var groups = groupPractice(practiceTests());
      var shown = groups.filter(function (g) { return filter.year === 'all' || String(g.year) === filter.year; });
      list.innerHTML = ppListHtml(shown, groups, filter.year);
    }

    /** Full Test chaining flag: stored in both storages so the handoff survives. */
    function ftSet(from, next) {
      try {
        var v = JSON.stringify({ from: from, next: next });
        sessionStorage.setItem('tunn.fulltest.next', v);
        localStorage.setItem('tunn.fulltest.next', v);
      } catch (e) { /* storage unavailable: continue without chaining */ }
    }

    function closeMenus() {
      U.$$('.exam-card-menu-list, .pp-menu', root).forEach(function (l) { l.hidden = true; });
      U.$$('[data-menu-btn]', root).forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
      U.$$('.pp-row.is-open, .pp-featured.is-open', root).forEach(function (r) { r.classList.remove('is-open'); });
    }

    /** Toggle the section menu for a practice row or the featured card. */
    function toggleRowMenu(row, btn) {
      var menu = row ? row.querySelector('.pp-menu') : null;
      var willOpen = menu && menu.hidden;
      closeMenus();
      if (menu && willOpen) {
        menu.hidden = false;
        if (row) row.classList.add('is-open');
        if (btn) btn.setAttribute('aria-expanded', 'true');
      }
    }

    function onClick(e) {
      var mb = e.target.closest('[data-menu-btn]');
      if (mb) {
        toggleRowMenu(mb.closest('.pp-featured, .pp-row'), mb);
        return;
      }
      var prow = e.target.closest('[data-pp-row]');
      if (prow && !e.target.closest('a, button')) {
        toggleRowMenu(prow, null);
        return;
      }
      if (e.target.closest('[data-menu-item]') || !e.target.closest('.pp-menu')) closeMenus();
      var ft = e.target.closest('[data-fulltest-next]');
      if (ft) ftSet(ft.getAttribute('data-fulltest-from'), ft.getAttribute('data-fulltest-next'));
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
      var tt = e.target.closest('[data-topic-tab]');
      if (tt) {
        var tab = tt.getAttribute('data-topic-tab');
        if (tab !== topicTab && (tab === 'math' || tab === 'verbal')) {
          topicTab = tab;
          topicCategory = 'all';
          U.lsSet(TOPIC_TAB_KEY, topicTab);
          U.lsSet(TOPIC_CATEGORY_KEY, topicCategory);
          U.$$('[data-topic-tab]', root).forEach(function (b) {
            var on = b.getAttribute('data-topic-tab') === topicTab;
            b.classList.toggle('is-on', on);
            b.setAttribute('aria-selected', String(on));
          });
          renderTopicBar();
          renderTopic();
          showActiveChip();
        }
        return;
      }
      var tc = e.target.closest('[data-topic-cat]');
      if (tc) {
        topicCategory = tc.getAttribute('data-topic-cat');
        U.lsSet(TOPIC_CATEGORY_KEY, topicCategory);
        U.$$('[data-topic-cat]', root).forEach(function (b) {
          var on = b.getAttribute('data-topic-cat') === topicCategory;
          b.classList.toggle('is-on', on);
          b.setAttribute('aria-pressed', String(on));
        });
        renderTopic();
        return;
      }
      var c = e.target.closest('[data-cat]');
      if (c) {
        category = c.getAttribute('data-cat');
        U.lsSet(CATEGORY_KEY, category);
        U.$$('[data-cat]', root).forEach(function (b) {
          var on = b.getAttribute('data-cat') === category;
          b.classList.toggle('is-on', on);
          b.setAttribute('aria-pressed', String(on));
        });
        renderAdvanced();
        return;
      }
      if (e.target.closest('[data-premium-unlock], [data-premium-manage], [data-premium-retry]')) return; // handled by Premium
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
    function onKey(e) {
      if (e.key === 'Escape') { closeMenus(); return; }
      if ((e.key === 'Enter' || e.key === ' ') && e.target && e.target.closest) {
        var prow = e.target.closest('[data-pp-row]');
        if (prow && !e.target.closest('a, button')) {
          e.preventDefault();
          toggleRowMenu(prow, null);
          return;
        }
        var hrow = e.target.closest('[data-href]');
        if (hrow && !e.target.closest('a, button')) {
          e.preventDefault();
          location.hash = hrow.getAttribute('data-href');
        }
      }
    }
    document.addEventListener('keydown', onKey);
    // Premium unlocked or locked again: redraw in place (keeps the scroll position)
    var alive = true;
    var offPremium = global.Premium ? global.Premium.onChange(function () { if (alive) render(); }) : null;
    render();
    return function () {
      alive = false;
      if (offPremium) offPremium();
      root.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
      if (timer) clearInterval(timer);
    };
  }

  global.Views = global.Views || {};
  global.Views.home = HomeView;
})(window);
