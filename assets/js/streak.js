/* Practice streak: consecutive calendar days with at least 30 minutes of practice.
 * Practice time comes from the student's saved attempts in localStorage
 * (satmath.attempts.v1): a completed attempt's totalElapsed, or the accumulated
 * module time of an attempt still in progress. No extra storage is needed and it
 * stays consistent across tabs automatically. An attempt's time is attributed to
 * the local calendar day it was last touched (finishedAt, else updatedAt). */
(function (global) {
  'use strict';

  /** A day counts toward the streak when practice reaches this (30 minutes). */
  var STREAK_DAY_SECONDS = 30 * 60;

  function pad(n) { return (n < 10 ? '0' : '') + n; }

  /** Local calendar day key 'YYYY-MM-DD' for a timestamp. */
  function dayKey(ts) {
    var d = new Date(ts);
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }

  /** Day key shifted by delta days (handles month/year rollover). */
  function shiftDay(key, delta) {
    var p = key.split('-');
    var d = new Date(+p[0], +p[1] - 1, +p[2] + delta);
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }

  function diffDays(a, b) {
    var pa = a.split('-'), pb = b.split('-');
    var da = new Date(+pa[0], +pa[1] - 1, +pa[2]);
    var db = new Date(+pb[0], +pb[1] - 1, +pb[2]);
    return Math.round((db - da) / 86400000);
  }

  /** Practiced seconds for one attempt (completed or in progress). */
  function attemptSeconds(a) {
    if (a.totalElapsed) return a.totalElapsed;
    var n = 0;
    (a.modules || []).forEach(function (m) { n += (m && m.elapsed) || 0; });
    return n;
  }

  /** Map of day key -> practiced seconds, from all saved attempts. */
  function practiceSeconds() {
    var per = {};
    if (!global.Attempts || typeof global.Attempts.all !== 'function') return per;
    global.Attempts.all().forEach(function (a) {
      if (!a) return;
      var sec = attemptSeconds(a);
      if (sec <= 0) return;
      var k = dayKey(a.finishedAt || a.updatedAt || a.createdAt || Date.now());
      per[k] = (per[k] || 0) + sec;
    });
    return per;
  }

  /**
   * Streak stats for the given per-day practice seconds and "today" key.
   * A day counts when it reaches STREAK_DAY_SECONDS. The streak stays alive
   * through today: when today is not done yet, the count runs up to yesterday,
   * so the student still has today to keep it.
   */
  function compute(perDay, today) {
    var info = { days: 0, longest: 0, todayDone: false, totalDays: 0, todaySeconds: 0 };
    var uniq = [], seen = {}, set = {}, run = 0, prev = null, cursor;
    Object.keys(perDay || {}).forEach(function (k) {
      if (k && perDay[k] >= STREAK_DAY_SECONDS && !seen[k]) { seen[k] = true; uniq.push(k); }
    });
    uniq.sort();
    info.totalDays = uniq.length;
    info.todaySeconds = (perDay && perDay[today]) || 0;
    info.todayDone = info.todaySeconds >= STREAK_DAY_SECONDS;
    if (!uniq.length) return info;
    uniq.forEach(function (k) {
      run = (prev && diffDays(prev, k) === 1) ? run + 1 : 1;
      if (run > info.longest) info.longest = run;
      prev = k;
    });
    uniq.forEach(function (k) { set[k] = true; });
    cursor = info.todayDone ? today : shiftDay(today, -1);
    while (set[cursor]) { info.days++; cursor = shiftDay(cursor, -1); }
    return info;
  }

  /** "1-day streak", "7-day streak". */
  function streakLabel(n) { return n + '-day streak'; }

  function keepAliveText(todaySeconds) {
    if (todaySeconds <= 0) return 'Practice 30+ minutes today to keep your streak alive!';
    var left = Math.ceil((STREAK_DAY_SECONDS - todaySeconds) / 60);
    return left + ' more minute' + (left === 1 ? '' : 's') + ' of practice today keeps your streak alive!';
  }

  global.Streak = {
    dayKey: dayKey,
    STREAK_DAY_SECONDS: STREAK_DAY_SECONDS,
    /** Pure computation, exposed for tests: compute({dayKey: seconds}, todayKey). */
    compute: compute,
    /** Map of day key -> practiced seconds (for the This Week widget). */
    secondsByDay: practiceSeconds,
    /** Current streak stats from the student's saved attempts. */
    info: function () { return compute(practiceSeconds(), dayKey(Date.now())); },

    /** Always-visible streak card for the home page: counter + daily 30-minute ring. */
    bannerHtml: function () {
      var info = this.info();
      var icon = global.U ? global.U.icon('flame') : '';
      var check = global.U ? global.U.icon('check') : '';
      var active = info.days > 0;
      var goal = STREAK_DAY_SECONDS;
      var frac = Math.min(info.todaySeconds / goal, 1);
      var R = 52, CIRC = 2 * Math.PI * R;
      var off = (CIRC * (1 - frac)).toFixed(1);
      var done = info.todayDone;
      var leftMin = done ? 0 : Math.ceil((goal - info.todaySeconds) / 60);
      var center = done
        ? '<span class="streak-ring-done">' + check + '</span><span>Done</span>'
        : '<b>' + leftMin + '</b><span>min left</span>';
      var sub;
      if (info.days > 0 && done) sub = 'Come back tomorrow to keep your streak going!';
      else if (info.days > 0) sub = 'Finish today\u2019s 30 minutes to keep your streak alive!';
      else sub = 'Practice 30+ minutes a day to start your streak.';
      return '<section class="streak-card' + (active ? ' is-active' : '') + '" aria-label="Day streak">' +
        '<div class="streak-card-top">' +
        '<span class="streak-flame" aria-hidden="true">' + icon + '</span>' +
        '<span class="streak-num">' + info.days + '</span>' +
        '</div>' +
        '<div class="streak-caption">Day streak</div>' +
        '<div class="streak-ring-wrap">' +
        '<svg class="streak-ring" viewBox="0 0 120 120" role="img" aria-label="' + Math.floor(info.todaySeconds / 60) + ' of 30 minutes practiced today">' +
        '<defs><linearGradient id="streakRingGrad" x1="0" y1="0" x2="1" y2="1">' +
        '<stop offset="0" stop-color="#f59e0b"/><stop offset="1" stop-color="#ea580c"/>' +
        '</linearGradient></defs>' +
        '<circle class="streak-ring-bg" cx="60" cy="60" r="' + R + '"/>' +
        '<circle class="streak-ring-fg" cx="60" cy="60" r="' + R + '" stroke-dasharray="' + CIRC.toFixed(1) + '" stroke-dashoffset="' + off + '" transform="rotate(-90 60 60)"/>' +
        '</svg>' +
        '<div class="streak-ring-center">' + center + '</div>' +
        '</div>' +
        '<div class="streak-sub">' + sub + '</div>' +
        '</section>';
    },

    /** One-line streak nudge for the results page hero; '' with no history. */
    resultsLineHtml: function () {
      var info = this.info();
      if (!info.totalDays) return '';
      var icon = global.U ? global.U.icon('flame') : '';
      var text;
      if (info.days > 0 && info.todayDone) {
        text = 'You are on a <b>' + streakLabel(info.days) + '</b>! Practice 30+ minutes again tomorrow to keep it going.';
      } else if (info.days > 0) {
        text = 'You are on a <b>' + streakLabel(info.days) + '</b> — ' + keepAliveText(info.todaySeconds);
      } else {
        text = 'Your streak ended. Practice 30+ minutes today to start a new one!';
      }
      return '<div class="streak-line" role="status">' + icon + '<span>' + text + '</span></div>';
    }
  };
})(window);
