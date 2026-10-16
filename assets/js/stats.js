/* Practice stats dashboard: average score, best score, tests done, weak areas.
 * Derived from the student's completed attempts in localStorage
 * (satmath.attempts.v1); no extra storage is needed. */
(function (global) {
  'use strict';

  /** Minimum questions in a domain before it can appear under "Weak areas". */
  var WEAK_MIN_QUESTIONS = 3;
  /** How many weak areas to list. */
  var WEAK_COUNT = 3;

  function summary() {
    var s = { count: 0, avgPercent: 0, avgEstimated: 0, best: null, domains: [] };
    if (!global.Attempts || typeof global.Attempts.completed !== 'function') return s;
    // A test only counts as done when every question in it was answered.
    var done = global.Attempts.completed().filter(fullyAnswered);
    if (!done.length) return s;
    var pSum = 0, eSum = 0, byD = {};
    done.forEach(function (a) {
      var r = a.result || {};
      var pct = r.percent || 0;
      pSum += pct;
      eSum += r.estimated || 0;
      if (!s.best || pct > s.best.percent ||
          (pct === s.best.percent && (a.finishedAt || 0) > s.best.finishedAt)) {
        s.best = {
          percent: pct, estimated: r.estimated || 0,
          testTitle: a.testTitle || a.testId || '', id: a.id,
          finishedAt: a.finishedAt || 0
        };
      }
      var bd = r.byDomain || {};
      Object.keys(bd).forEach(function (k) {
        if (!k) return;
        var d = byD[k] || (byD[k] = { correct: 0, total: 0 });
        d.correct += bd[k].correct || 0;
        d.total += bd[k].total || 0;
      });
    });
    s.count = done.length;
    s.avgPercent = Math.round(pSum / done.length * 10) / 10;
    s.avgEstimated = Math.round(eSum / done.length);
    s.domains = Object.keys(byD).map(function (k) {
      var d = byD[k];
      return {
        domain: k, correct: d.correct, total: d.total,
        percent: d.total ? Math.round(d.correct / d.total * 1000) / 10 : 0
      };
    }).sort(function (a, b) { return a.percent - b.percent; });
    return s;
  }

  function barClass(p) { return p >= 80 ? 'is-good' : p >= 50 ? 'is-mid' : 'is-low'; }

  /** A completed attempt counts as "done" only if no question was left unanswered. */
  function fullyAnswered(a) {
    var r = a.result || {};
    // `omitted` is recorded at submit time; a fully finished test has none.
    if (typeof r.omitted === 'number') return r.omitted === 0 && (r.total || 0) > 0;
    // Fallback for results scored before `omitted` was recorded.
    var total = a.totalQuestions || 0;
    return total > 0 && Object.keys(a.answers || {}).length >= total;
  }

  global.Stats = {
    /** Pure stats, exposed for tests. */
    summary: summary,

    /** Dashboard HTML for the home page (empty state when no tests done yet). */
    dashboardHtml: function () {
      var s = summary();
      var esc = global.U ? global.U.esc : function (x) { return String(x); };
      if (!s.count) {
        return '<div class="dash">' +
          '<div class="dash-head"><h2>Your stats</h2></div>' +
          '<p class="dash-empty">Complete your first test and your average score, best score and weak areas will show up here.</p>' +
          '</div>';
      }
      var weak = s.domains.filter(function (d) { return d.total >= WEAK_MIN_QUESTIONS; }).slice(0, WEAK_COUNT);
      var weakHtml = weak.length ? weak.map(function (d) {
        return '<div class="weak-row">' +
          '<span class="weak-name">' + esc(d.domain) + '</span>' +
          '<span class="weak-bar"><span class="' + barClass(d.percent) + '" style="width:' + Math.min(100, d.percent) + '%"></span></span>' +
          '<span class="weak-pct">' + d.percent + '%</span>' +
          '</div>';
      }).join('') : '<p class="dash-empty">Not enough per-topic data yet.</p>';
      return '<div class="dash">' +
        '<div class="dash-head"><h2>Your stats</h2></div>' +
        '<div class="dash-tiles">' +
        '<div class="dash-tile"><span class="dash-label">Tests done</span><b>' + s.count + '</b><span class="dash-sub">completed</span></div>' +
        '<div class="dash-tile"><span class="dash-label">Average score</span><b>' + s.avgEstimated + '</b><span class="dash-sub">' + s.avgPercent + '% correct</span></div>' +
        '<div class="dash-tile"><span class="dash-label">Best score</span><b>' + s.best.estimated + '</b><span class="dash-sub">' + esc(s.best.testTitle) + ' · ' + s.best.percent + '%</span></div>' +
        '</div>' +
        '<div class="dash-weak"><h3>Weak areas</h3>' + weakHtml + '</div>' +
        '</div>';
    }
  };
})(window);
