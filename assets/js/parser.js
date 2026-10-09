/*
 * Bộ đọc đề thi.
 *
 * 1) Định dạng văn bản (dễ soạn tay):
 *
 *    ---
 *    title: September 2026
 *    author: Tên tác giả
 *    time: 40            (phút, áp dụng cho mỗi module nếu module không ghi riêng)
 *    ---
 *
 *    ## Module 1 | 35    (không bắt buộc; "| 35" = 35 phút)
 *
 *    1. Nội dung câu hỏi, công thức $x^2$ ...
 *    A. lựa chọn A
 *    B. lựa chọn B
 *    C. lựa chọn C
 *    D. lựa chọn D
 *    Answer: B
 *    Explanation: lời giải (không bắt buộc)
 *
 *    2. Câu điền đáp án (không có A/B/C/D)
 *    Answer: 441/677 | .6514
 *
 *    Answer Key          (không bắt buộc: bảng đáp án ở cuối)
 *    1. B
 *    2. 441/677
 *
 * 2) JSON: { title, author, modules: [{ title, time, questions: [{ type, prompt, choices, answer, explanation }] }] }
 */
(function (global) {
  'use strict';

  var LETTERS = 'ABCDEFGH';

  var RE = {
    question: /^\s*(?:(?:câu|cau|question|q)\s*)?(\d{1,3})\s*[.):](?:\s+|$)(.*)$/i,
    choice: /^\s*\(?([A-H])\s*[.)]\s+(.*)$/,
    choiceEmpty: /^\s*\(?([A-H])\s*[.)]\s*$/,
    answer: /^\s*(?:answer|ans|correct answer|đáp án|dap an|key)\s*[:：]\s*(.*)$/i,
    explanation: /^\s*(?:explanation|solution|giải thích|lời giải|giai thich|loi giai|rationale)\s*[:：]\s*(.*)$/i,
    domain: /^\s*(?:domain|topic|skill|dạng|chủ đề)\s*[:：]\s*(.*)$/i,
    type: /^\s*(?:type|loại)\s*[:：]\s*(.*)$/i,
    module: /^\s*##\s+(.*)$/,
    keyHeader: /^\s*(?:#+\s*)?(?:(?:answer key|bảng đáp án)\s*:?|answers|đáp án|dap an)\s*$/i,
    keyLine: /^\s*(?:(?:câu|question|q)\s*)?(\d{1,3})\s*[.):\-–]?\s+(.+?)\s*$/i,
    meta: /^\s*(title|tiêu đề|tieu de|tên đề|author|tác giả|tac gia|time|thời gian|thoi gian|description|mô tả|mo ta|id)\s*[:：]\s*(.*)$/i
  };

  var META_KEYS = {
    'title': 'title', 'tiêu đề': 'title', 'tieu de': 'title', 'tên đề': 'title',
    'author': 'author', 'tác giả': 'author', 'tac gia': 'author',
    'time': 'time', 'thời gian': 'time', 'thoi gian': 'time',
    'description': 'description', 'mô tả': 'description', 'mo ta': 'description',
    'id': 'id'
  };

  var DOMAINS = [
    { key: 'Algebra', re: /^(algebra|đại số|dai so)/i },
    { key: 'Advanced Math', re: /^(advanced|nâng cao|nang cao|adv)/i },
    { key: 'Problem-Solving and Data Analysis', re: /^(problem|psda|data|dữ liệu|thống kê|xác suất)/i },
    { key: 'Geometry and Trigonometry', re: /^(geo|trig|hình|hinh|lượng giác)/i }
  ];

  function normalizeDomain(d) {
    d = String(d || '').trim();
    if (!d) return '';
    for (var i = 0; i < DOMAINS.length; i++) if (DOMAINS[i].re.test(d)) return DOMAINS[i].key;
    return d;
  }

  function parseMinutes(v) {
    var m = /(\d+(?:[.,]\d+)?)/.exec(String(v || ''));
    if (!m) return null;
    var n = parseFloat(m[1].replace(',', '.'));
    return isFinite(n) && n >= 0 ? n : null;
  }

  /** Chuẩn hóa đáp án trắc nghiệm: "(b)", "B.", "b" -> "B" */
  function normalizeLetter(v) {
    var m = /^\s*\(?\s*([A-Ha-h])\s*(?:[.)]|$|\s)/.exec(String(v || ''));
    return m ? m[1].toUpperCase() : '';
  }

  /** Tách danh sách đáp án câu điền: "441/677 | .6514 ; 0.651" */
  function splitAnswers(v) {
    if (Array.isArray(v)) return v.map(function (x) { return String(x).trim(); }).filter(Boolean);
    return String(v == null ? '' : v)
      .split(/\s*(?:\||;|\bor\b|\bhoặc\b)\s*/i)
      .map(function (x) { return cleanSprAnswer(x); })
      .filter(Boolean);
  }

  /** Bỏ $...$, \frac{a}{b} -> a/b, khoảng trắng, gạch dưới... */
  function cleanSprAnswer(x) {
    var s = String(x || '').trim();
    s = s.replace(/^\$+|\$+$/g, '').replace(/\\\(|\\\)/g, '');
    s = s.replace(/\\[dt]?frac\s*\{\s*([^{}]+?)\s*\}\s*\{\s*([^{}]+?)\s*\}/g, '$1/$2');
    s = s.replace(/^-\s*\\[dt]?frac/, '-\\frac');
    s = s.replace(/\\(?:,|!|;|:|\s)/g, '').replace(/[{}]/g, '');
    s = s.replace(/_+/g, '').replace(/\s+/g, '');
    s = s.replace(/[−–]/g, '-');
    return s;
  }

  function newQuestion(label, line) {
    return { label: label, promptLines: [line], choices: [], answerRaw: null, explanationLines: null, domain: '', typeHint: '', line: line, srcLine: 0, blankAfterChoices: false };
  }

  /**
   * Đọc đề ở định dạng văn bản.
   * Trả về { test, errors: [{line, msg}], warnings: [{line, msg}] }
   */
  function parseText(src, base) {
    base = base || {};
    var errors = [], warnings = [];
    var text = String(src || '').replace(/^﻿/, '').replace(/\r\n?/g, '\n');
    var lines = text.split('\n');
    var meta = {};
    var i = 0;

    // Front matter --- ... ---
    var firstIdx = 0;
    while (firstIdx < lines.length && !lines[firstIdx].trim()) firstIdx++;
    if (firstIdx < lines.length && /^---\s*$/.test(lines[firstIdx])) {
      var end = -1;
      for (var k = firstIdx + 1; k < lines.length; k++) { if (/^---\s*$/.test(lines[k])) { end = k; break; } }
      if (end !== -1) {
        for (var f = firstIdx + 1; f < end; f++) {
          var mm = /^\s*([^:：]+?)\s*[:：]\s*(.*)$/.exec(lines[f]);
          if (mm) {
            var kk = META_KEYS[mm[1].toLowerCase()] || mm[1].toLowerCase();
            meta[kk] = mm[2].trim();
          }
        }
        i = end + 1;
      }
    }

    var modules = [];
    var curModule = null;
    var q = null;
    var mode = 'prompt'; // prompt | choices | explanation | key
    var keyEntries = [];
    var keyModule = null;
    var strayLines = 0;

    function ensureModule() {
      if (!curModule) {
        curModule = { title: '', time: null, questions: [], line: 0 };
        modules.push(curModule);
      }
      return curModule;
    }

    function finishQuestion() {
      if (q) { ensureModule().questions.push(q); q = null; }
    }

    for (; i < lines.length; i++) {
      var line = lines[i];
      var lineNo = i + 1;
      var t = line.trim();
      var m;

      if ((m = RE.module.exec(line))) {
        finishQuestion();
        var parts = m[1].split('|');
        var time = parts.length > 1 ? parseMinutes(parts.slice(1).join('|')) : null;
        curModule = { title: parts[0].trim(), time: time, questions: [], line: lineNo };
        modules.push(curModule);
        mode = 'prompt';
        continue;
      }

      if (RE.keyHeader.test(t)) {
        finishQuestion();
        mode = 'key';
        keyModule = curModule;
        continue;
      }

      if (mode === 'key') {
        if (!t) continue;
        if (/^\|?\s*:?-{2,}/.test(t)) continue;
        var row = t;
        if (row[0] === '|') {
          var cells = row.replace(/^\||\|$/g, '').split('|').map(function (c) { return c.trim(); });
          // một bảng có thể có nhiều cặp (câu | đáp án | câu | đáp án)
          for (var c = 0; c + 1 < cells.length; c += 2) {
            if (/^\d{1,3}$/.test(cells[c]) && cells[c + 1]) keyEntries.push({ label: +cells[c], value: cells[c + 1], line: lineNo, module: keyModule });
          }
          continue;
        }
        var km = RE.keyLine.exec(row);
        if (km) {
          // Hỗ trợ nhiều cặp trên một dòng: "1. B   2. C   3. 14"
          var multi = row.match(/(\d{1,3})\s*[.):\-–]\s*(\S+)/g);
          if (multi && multi.length > 1) {
            multi.forEach(function (pair) {
              var pm = /(\d{1,3})\s*[.):\-–]\s*(\S+)/.exec(pair);
              keyEntries.push({ label: +pm[1], value: pm[2], line: lineNo, module: keyModule });
            });
          } else {
            keyEntries.push({ label: +km[1], value: km[2], line: lineNo, module: keyModule });
          }
          continue;
        }
        if (/^(question|câu)\s*[|\t ]+\s*(answer|đáp án)/i.test(t)) continue;
        warnings.push({ line: lineNo, msg: 'Dòng trong bảng đáp án không hiểu được: "' + t.slice(0, 60) + '"' });
        continue;
      }

      if (!q) {
        if ((m = RE.meta.exec(line)) && !RE.question.test(line)) {
          var mk = META_KEYS[m[1].toLowerCase()] || m[1].toLowerCase();
          if (mk === 'time' && curModule && curModule.questions.length === 0) curModule.time = parseMinutes(m[2]);
          else meta[mk] = m[2].trim();
          continue;
        }
      }

      if ((m = RE.question.exec(line)) && !(mode === 'explanation' && q && +m[1] <= q.label)) {
        // Trong lời giải, dòng "1. ..." (số nhỏ hơn số câu hiện tại) được coi là một bước giải.
        finishQuestion();
        q = newQuestion(+m[1], m[2]);
        q.srcLine = lineNo;
        mode = 'prompt';
        continue;
      }

      if (!q) {
        if (t) strayLines++;
        continue;
      }

      if ((m = RE.answer.exec(line)) && !(mode === 'explanation' && q.answerRaw)) {
        q.answerRaw = m[1].trim();
        q.answerLine = lineNo;
        mode = 'after';
        continue;
      }
      if ((m = RE.explanation.exec(line))) {
        q.explanationLines = [m[1]];
        mode = 'explanation';
        continue;
      }
      if ((m = RE.domain.exec(line)) && mode !== 'explanation') {
        q.domain = normalizeDomain(m[1]);
        continue;
      }
      if ((m = RE.type.exec(line)) && mode !== 'explanation') {
        q.typeHint = m[1].trim().toLowerCase();
        continue;
      }

      if (mode === 'explanation') {
        q.explanationLines.push(line);
        continue;
      }

      if (mode !== 'after' && ((m = RE.choice.exec(line)) || (m = RE.choiceEmpty.exec(line)))) {
        var letter = m[1];
        var expected = LETTERS[q.choices.length];
        if (letter === expected) {
          q.choices.push({ letter: letter, lines: [m[2] || ''], line: lineNo });
          mode = 'choices';
          q.blankAfterChoices = false;
          continue;
        }
        if (mode === 'choices' || q.choices.length) {
          warnings.push({ line: lineNo, msg: 'Câu ' + q.label + ': lựa chọn "' + letter + '" không đúng thứ tự (mong đợi ' + expected + ').' });
          q.choices.push({ letter: expected, lines: [m[2] || ''], line: lineNo });
          mode = 'choices';
          continue;
        }
      }

      if (mode === 'choices') {
        if (!t) { q.blankAfterChoices = true; continue; }
        var lastChoice = q.choices[q.choices.length - 1];
        if (q.blankAfterChoices) {
          warnings.push({ line: lineNo, msg: 'Câu ' + q.label + ': dòng sau các lựa chọn được nối vào lựa chọn ' + lastChoice.letter + '.' });
          q.blankAfterChoices = false;
        }
        lastChoice.lines.push(line);
        continue;
      }

      if (mode === 'after') {
        if (!t) continue;
        warnings.push({ line: lineNo, msg: 'Câu ' + q.label + ': bỏ qua dòng sau "Answer:" — "' + t.slice(0, 50) + '". Dùng "Explanation:" để thêm lời giải.' });
        continue;
      }

      q.promptLines.push(line);
    }
    finishQuestion();

    if (strayLines) warnings.push({ line: 1, msg: 'Có ' + strayLines + ' dòng nằm trước câu hỏi đầu tiên và đã bị bỏ qua.' });

    // Bỏ module rỗng
    modules = modules.filter(function (mod) {
      if (!mod.questions.length) {
        if (mod.title) warnings.push({ line: mod.line, msg: 'Module "' + mod.title + '" không có câu hỏi nào và đã bị bỏ qua.' });
        return false;
      }
      return true;
    });

    // Áp dụng bảng đáp án
    keyEntries.forEach(function (e) {
      var target = null;
      var searchMods = e.module ? [e.module].concat(modules) : modules;
      for (var s = 0; s < searchMods.length && !target; s++) {
        var qs = searchMods[s].questions;
        for (var x = 0; x < qs.length; x++) if (qs[x].label === e.label) { target = qs[x]; break; }
      }
      if (!target) { warnings.push({ line: e.line, msg: 'Bảng đáp án: không có câu số ' + e.label + '.' }); return; }
      if (target.answerRaw && target.answerRaw.replace(/_/g, '').trim()) {
        warnings.push({ line: e.line, msg: 'Câu ' + e.label + ' đã có "Answer:" — dùng đáp án trong bảng đáp án.' });
      }
      target.answerRaw = e.value;
    });

    var defaultTime = parseMinutes(meta.time);
    var test = {
      id: base.id || meta.id || '',
      title: (meta.title || base.title || '').trim(),
      author: (meta.author || base.author || '').trim(),
      description: (meta.description || base.description || '').trim(),
      source: text,
      assets: base.assets || {},
      modules: modules.map(function (mod, mi) {
        return {
          title: mod.title || (modules.length > 1 ? 'Module ' + (mi + 1) : 'Math'),
          time: mod.time != null ? mod.time : defaultTime,
          questions: mod.questions.map(function (qq) { return buildQuestion(qq, errors, warnings); })
        };
      })
    };

    if (!test.modules.length) errors.push({ line: 1, msg: 'Chưa có câu hỏi nào. Mỗi câu bắt đầu bằng số thứ tự, ví dụ "1. Nội dung câu hỏi".' });

    return finalize(test, errors, warnings);
  }

  function joinLines(lines) {
    var s = lines.join('\n');
    return s.replace(/^\s*\n/, '').replace(/\s+$/, '');
  }

  function buildQuestion(qq, errors, warnings) {
    var prompt = joinLines(qq.promptLines).trim();
    var choices = qq.choices.map(function (c) { return joinLines(c.lines).replace(/\s*\n\s*/g, ' ').trim(); });
    var type = choices.length ? 'mcq' : 'spr';
    if (/^(spr|grid|điền|dien|tl|tự luận|fill)/.test(qq.typeHint)) type = 'spr';
    if (/^(mcq|tn|trắc nghiệm|multiple)/.test(qq.typeHint)) type = 'mcq';
    var raw = qq.answerRaw == null ? '' : qq.answerRaw.replace(/_{2,}/g, '').trim();
    var q = {
      label: qq.label,
      type: type,
      prompt: prompt,
      _line: qq.srcLine
    };
    if (type === 'mcq') {
      q.choices = choices;
      q.answer = normalizeLetter(raw);
    } else {
      q.answer = splitAnswers(raw);
    }
    if (qq.explanationLines) {
      var ex = joinLines(qq.explanationLines).trim();
      if (ex) q.explanation = ex;
    }
    if (qq.domain) q.domain = qq.domain;
    return q;
  }

  /* ---------------- Chuẩn hóa / kiểm tra đề (dùng cho JSON & text) ---------------- */

  function finalize(test, errors, warnings) {
    errors = errors || []; warnings = warnings || [];
    if (!test.title) warnings.push({ line: 1, msg: 'Đề chưa có tên (thêm dòng "title: Tên đề").' });
    test.modules.forEach(function (mod, mi) {
      mod.questions.forEach(function (q, qi) {
        q.id = 'm' + (mi + 1) + 'q' + (qi + 1);
        var where = (test.modules.length > 1 ? mod.title + ' – ' : '') + 'Câu ' + (qi + 1) + (q.label && q.label !== qi + 1 ? ' (đánh số ' + q.label + ')' : '');
        var line = q._line || 0;
        if (!q.prompt) warnings.push({ line: line, msg: where + ': nội dung câu hỏi trống.' });
        if (q.type === 'mcq') {
          if (q.choices.length < 2) errors.push({ line: line, msg: where + ': câu trắc nghiệm cần ít nhất 2 lựa chọn.' });
          else if (q.choices.length !== 4) warnings.push({ line: line, msg: where + ': có ' + q.choices.length + ' lựa chọn (SAT thường có 4).' });
          q.choices.forEach(function (c, ci) { if (!c) warnings.push({ line: line, msg: where + ': lựa chọn ' + LETTERS[ci] + ' trống.' }); });
          if (!q.answer) errors.push({ line: line, msg: where + ': chưa có đáp án (thêm dòng "Answer: A/B/C/D").' });
          else if (LETTERS.indexOf(q.answer) >= q.choices.length) errors.push({ line: line, msg: where + ': đáp án "' + q.answer + '" không nằm trong các lựa chọn.' });
        } else {
          if (!q.answer || !q.answer.length) errors.push({ line: line, msg: where + ': câu điền chưa có đáp án (thêm dòng "Answer: 14").' });
          else q.answer.forEach(function (a) {
            if (global.G && !global.G.parseNumber(a)) warnings.push({ line: line, msg: where + ': đáp án "' + a + '" không phải là số — sẽ so sánh theo chữ.' });
          });
        }
      });
    });
    return { test: test, errors: errors, warnings: warnings };
  }

  /** Chuẩn hóa đối tượng JSON tải lên (nhiều dạng chấp nhận được). */
  function normalizeObject(obj) {
    var errors = [], warnings = [];
    if (!obj || typeof obj !== 'object') return { test: null, errors: [{ line: 0, msg: 'Dữ liệu đề không hợp lệ.' }], warnings: [] };

    // Nếu có mã nguồn dạng văn bản mà không có modules -> đọc văn bản
    if ((obj.source || obj.text) && !Array.isArray(obj.modules) && !Array.isArray(obj.questions)) {
      var res = parseText(obj.source || obj.text, obj);
      if (obj.title && !res.test.title) res.test.title = obj.title;
      copyMeta(obj, res.test);
      return res;
    }

    var modulesIn = Array.isArray(obj.modules) ? obj.modules
      : Array.isArray(obj.questions) ? [{ title: obj.moduleTitle || 'Math', time: obj.time, questions: obj.questions }]
        : null;
    if (!modulesIn) return { test: null, errors: [{ line: 0, msg: 'Không tìm thấy "modules" hoặc "questions" trong file JSON.' }], warnings: [] };

    var test = {
      id: obj.id ? String(obj.id) : '',
      title: String(obj.title || obj.name || '').trim(),
      author: String(obj.author || '').trim(),
      description: String(obj.description || '').trim(),
      source: typeof obj.source === 'string' ? obj.source : '',
      assets: obj.assets && typeof obj.assets === 'object' ? obj.assets : {},
      modules: []
    };
    modulesIn.forEach(function (mod, mi) {
      if (!mod || !Array.isArray(mod.questions)) { errors.push({ line: 0, msg: 'Module ' + (mi + 1) + ' không có danh sách câu hỏi.' }); return; }
      var time = mod.time != null ? parseMinutes(mod.time) : mod.timeLimit != null ? parseMinutes(mod.timeLimit) : parseMinutes(obj.time);
      test.modules.push({
        title: String(mod.title || mod.name || (modulesIn.length > 1 ? 'Module ' + (mi + 1) : 'Math')),
        time: time,
        questions: mod.questions.map(function (qi, idx) {
          qi = qi || {};
          var choices = Array.isArray(qi.choices) ? qi.choices.map(function (c) {
            if (c && typeof c === 'object') return String(c.text || c.content || '');
            return String(c == null ? '' : c);
          }) : [];
          var type = qi.type === 'spr' || qi.type === 'grid' || qi.type === 'fill' ? 'spr'
            : qi.type === 'mcq' ? 'mcq' : (choices.length ? 'mcq' : 'spr');
          var q = { label: qi.label || qi.number || idx + 1, type: type, prompt: String(qi.prompt || qi.question || qi.text || '') };
          if (type === 'mcq') {
            q.choices = choices;
            var ans = qi.answer != null ? qi.answer : qi.correct;
            if (typeof ans === 'number' && ans >= 0 && ans < choices.length) ans = LETTERS[ans];
            q.answer = normalizeLetter(ans);
          } else {
            q.answer = splitAnswers(qi.answer != null ? qi.answer : qi.answers);
          }
          if (qi.explanation) q.explanation = String(qi.explanation);
          if (qi.domain) q.domain = normalizeDomain(qi.domain);
          return q;
        })
      });
    });
    copyMeta(obj, test);
    if (!test.modules.length) errors.push({ line: 0, msg: 'Đề không có câu hỏi nào.' });
    return finalize(test, errors, warnings);
  }

  function copyMeta(obj, test) {
    ['createdAt', 'updatedAt', 'builtin', 'origin'].forEach(function (k) { if (obj[k] != null) test[k] = obj[k]; });
    if (obj.id && !test.id) test.id = String(obj.id);
  }

  /** Chuyển đề (object) ngược lại thành văn bản để chỉnh sửa. */
  function toText(test) {
    var out = ['---', 'title: ' + (test.title || ''), 'author: ' + (test.author || '')];
    if (test.description) out.push('description: ' + test.description.replace(/\n/g, ' '));
    var times = test.modules.map(function (m) { return m.time; });
    var sameTime = times.every(function (t) { return t === times[0]; });
    if (sameTime && times[0] != null) out.push('time: ' + times[0]);
    out.push('---', '');
    test.modules.forEach(function (mod) {
      if (test.modules.length > 1 || (mod.title && mod.title !== 'Math')) {
        out.push('## ' + mod.title + (!sameTime && mod.time != null ? ' | ' + mod.time : ''), '');
      }
      mod.questions.forEach(function (q, qi) {
        out.push((qi + 1) + '. ' + (q.prompt || ''));
        if (q.type === 'mcq') {
          q.choices.forEach(function (c, ci) { out.push(LETTERS[ci] + '. ' + String(c).replace(/\n+/g, ' ')); });
          out.push('Answer: ' + (q.answer || ''));
        } else {
          out.push('Answer: ' + (q.answer || []).join(' | '));
        }
        if (q.domain) out.push('Domain: ' + q.domain);
        if (q.explanation) out.push('Explanation: ' + q.explanation);
        out.push('');
      });
    });
    return out.join('\n');
  }

  /** Đọc nội dung file bất kỳ (JSON / văn bản / LaTeX). */
  function parseAny(content, filename) {
    var name = String(filename || '').toLowerCase();
    var trimmed = String(content || '').replace(/^﻿/, '').trim();
    if (/\.tex$/.test(name) || (/\\begin\{(document|enumerate)\}/.test(trimmed) && global.LatexImport)) {
      var conv = global.LatexImport.convert(trimmed);
      var r = parseText(conv.text);
      r.importNotes = conv.warnings;
      r.fromLatex = true;
      return r;
    }
    if (/\.js$/.test(name) || /^SATLibrary\.register\s*\(/.test(trimmed)) {
      var jm = /SATLibrary\.register\s*\(\s*([\s\S]*)\)\s*;?\s*$/.exec(trimmed);
      if (jm) trimmed = jm[1];
    }
    if (trimmed[0] === '{' || trimmed[0] === '[') {
      var data;
      try { data = JSON.parse(trimmed); }
      catch (e) { return { test: null, errors: [{ line: 0, msg: 'File JSON bị lỗi cú pháp: ' + e.message }], warnings: [] }; }
      if (Array.isArray(data)) {
        return { many: data.map(function (d) { return normalizeObject(d); }) };
      }
      return normalizeObject(data);
    }
    return parseText(trimmed);
  }

  global.P = {
    parseText: parseText,
    normalizeObject: normalizeObject,
    toText: toText,
    parseAny: parseAny,
    normalizeDomain: normalizeDomain,
    cleanSprAnswer: cleanSprAnswer,
    LETTERS: LETTERS,
    DOMAINS: DOMAINS.map(function (d) { return d.key; })
  };
})(window);
