/*
 * Scoring.
 * Student-produced responses (SPR) are graded with the Digital SAT rules:
 *  - Equivalent fractions, decimals and integers are accepted (7/2 = 3.5 = 3.50).
 *  - Long decimals are accepted when they fill the entry box (5 characters, or 6 for a
 *    negative answer) and are correctly rounded OR truncated (2/3 -> .6666, .6667, 0.666, 0.667).
 */
(function (global) {
  'use strict';

  var G = {};
  var EPS = 1e-9;

  /** Parse a number: "-3", "3.5", ".25", "7/2", "-1/3" -> { value, kind } or null */
  G.parseNumber = function (str) {
    var s = String(str == null ? '' : str).trim().replace(/[−–]/g, '-').replace(/\s+/g, '');
    if (!s) return null;
    s = s.replace(/,(?=\d{3}(\D|$))/g, ''); // 1,353 -> 1353 (only used for answer keys)
    var m;
    if ((m = /^([+-]?)(\d+(?:\.\d*)?|\.\d+)\/(\d+(?:\.\d*)?|\.\d+)$/.exec(s))) {
      var den = parseFloat(m[3]);
      if (!den) return null;
      var v = parseFloat(m[2]) / den;
      return { value: m[1] === '-' ? -v : v, kind: 'frac', text: s };
    }
    if ((m = /^([+-]?)(\d+(?:\.\d*)?|\.\d+)$/.exec(s))) {
      var val = parseFloat(m[2]);
      return { value: m[1] === '-' ? -val : val, kind: s.indexOf('.') !== -1 ? 'dec' : 'int', text: s };
    }
    return null;
  };

  function near(a, b) {
    return Math.abs(a - b) <= EPS * Math.max(1, Math.abs(a), Math.abs(b));
  }

  function roundTo(x, d) {
    var p = Math.pow(10, d);
    var sign = x < 0 ? -1 : 1;
    return sign * Math.round(Math.abs(x) * p + 1e-9) / p;
  }
  function truncTo(x, d) {
    var p = Math.pow(10, d);
    var sign = x < 0 ? -1 : 1;
    return sign * Math.floor(Math.abs(x) * p + 1e-9) / p;
  }

  /** Character limit of the SAT answer box */
  G.maxLen = function (value) { return String(value || '').charAt(0) === '-' ? 6 : 5; };

  /** Filter what the student types into the answer box (like Bluebook). */
  G.sanitizeSpr = function (raw) {
    var s = String(raw || '').replace(/[−–]/g, '-').replace(/[^0-9./-]/g, '');
    // '-' only at the start
    s = s.charAt(0) + s.slice(1).replace(/-/g, '');
    if (s === '-') return s;
    // a single '/' only
    var firstSlash = s.indexOf('/');
    if (firstSlash !== -1) s = s.slice(0, firstSlash + 1) + s.slice(firstSlash + 1).replace(/\//g, '');
    return s.slice(0, G.maxLen(s));
  };

  /** Compare a student-produced response with one answer key. */
  function sprMatches(userRaw, keyRaw) {
    var user = String(userRaw || '').trim();
    var key = String(keyRaw || '').trim();
    if (!user || !key) return false;
    var u = G.parseNumber(user);
    var k = G.parseNumber(key);
    if (!u || !k) {
      return user.replace(/\s+/g, '').toLowerCase() === key.replace(/\s+/g, '').toLowerCase();
    }
    if (near(u.value, k.value)) return true;
    // A decimal that fills the box: accept rounding or truncation
    if (u.kind === 'dec') {
      var full = user.replace(/^\+/, '').length >= G.maxLen(user);
      var dot = user.indexOf('.');
      var digits = dot === -1 ? 0 : user.length - dot - 1;
      if (full && digits > 0) {
        if (near(u.value, roundTo(k.value, digits)) || near(u.value, truncTo(k.value, digits))) return true;
      }
    }
    return false;
  }

  G.isCorrect = function (q, response) {
    if (response == null || response === '') return false;
    if (q.type === 'mcq') return String(response).toUpperCase() === q.answer;
    var keys = q.answer || [];
    for (var i = 0; i < keys.length; i++) if (sprMatches(response, keys[i])) return true;
    return false;
  };

  /** Display text for the correct answer */
  G.answerText = function (q) {
    if (q.type === 'mcq') return q.answer || '—';
    return (q.answer || []).join(' or ') || '—';
  };

  /* ---------------- Estimated SAT Math score (200-800) ---------------- */
  // Reference curve (fraction correct -> scaled score). An estimate only.
  var CURVE = [
    [0, 200], [0.05, 230], [0.1, 280], [0.2, 360], [0.3, 420], [0.4, 470], [0.5, 520],
    [0.6, 570], [0.7, 620], [0.8, 680], [0.9, 740], [0.95, 770], [1, 800]
  ];
  G.estimateScore = function (fraction) {
    var f = Math.min(1, Math.max(0, fraction || 0));
    for (var i = 1; i < CURVE.length; i++) {
      if (f <= CURVE[i][0]) {
        var a = CURVE[i - 1], b = CURVE[i];
        var v = a[1] + (b[1] - a[1]) * (f - a[0]) / (b[0] - a[0]);
        return Math.round(v / 10) * 10;
      }
    }
    return 800;
  };

  /** Score a whole attempt and return a detailed result */
  G.scoreAttempt = function (test, attempt) {
    var per = [];
    var correct = 0, incorrect = 0, omitted = 0;
    var byDomain = {}, byType = { mcq: { correct: 0, total: 0 }, spr: { correct: 0, total: 0 } };
    var byModule = [];
    test.modules.forEach(function (mod, mi) {
      var mc = 0;
      mod.questions.forEach(function (q, qi) {
        var resp = attempt.answers ? attempt.answers[q.id] : undefined;
        var answered = resp != null && String(resp).trim() !== '';
        var ok = answered && G.isCorrect(q, resp);
        if (!answered) omitted++; else if (ok) { correct++; mc++; } else incorrect++;
        byType[q.type].total++;
        if (ok) byType[q.type].correct++;
        if (q.domain) {
          var d = byDomain[q.domain] || (byDomain[q.domain] = { correct: 0, total: 0 });
          d.total++; if (ok) d.correct++;
        }
        per.push({
          id: q.id, module: mi, index: qi, type: q.type, domain: q.domain || '',
          response: answered ? String(resp) : '',
          correctAnswer: G.answerText(q),
          status: !answered ? 'omitted' : ok ? 'correct' : 'incorrect',
          marked: !!(attempt.marked && attempt.marked[q.id])
        });
      });
      byModule.push({ title: mod.title, correct: mc, total: mod.questions.length });
    });
    var total = per.length;
    return {
      total: total, correct: correct, incorrect: incorrect, omitted: omitted,
      percent: total ? Math.round(correct / total * 1000) / 10 : 0,
      estimated: G.estimateScore(total ? correct / total : 0),
      byDomain: byDomain, byType: byType, byModule: byModule,
      questions: per
    };
  };

  global.G = G;
})(window);
