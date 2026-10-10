/*
 * Test parser.
 *
 * 1) Text format (easy to write by hand):
 *
 *    ---
 *    title: September 2026
 *    author: Author name
 *    date: September 12, 2026   (optional test date)
 *    time: 40                   (minutes; applies to every module that does not set its own)
 *    section: advanced          (optional: list the test under "Advanced Tests" on the home page)
 *    ---
 *
 *    ## Module 1 | 35    (optional; "| 35" = 35 minutes)
 *
 *    1. Question text, math such as $x^2$ ...
 *    A. choice A
 *    B. choice B
 *    C. choice C
 *    D. choice D
 *    Answer: B
 *    Explanation: worked solution (optional)
 *
 *    2. Student-produced response (no A/B/C/D)
 *    Answer: 441/677 | .6514
 *
 *    Answer Key          (optional: an answer key at the end)
 *    1. B
 *    2. 441/677
 *
 *    A line that would otherwise be read as structure ("2. ...", "A. ...", "## ...",
 *    "Answer: ...") can be kept as plain text by starting it with a backslash: "\2. ...".
 *    Vietnamese keywords (Câu, Đáp án, Giải thích, Lời giải, tiêu đề, ...) are still accepted.
 *
 * 2) JSON: { id, title, author, date, description, section, modules: [{ title, time, questions: [{ type, prompt, choices, answer, explanation, domain }] }] }
 */
(function (global) {
  'use strict';

  var LETTERS = 'ABCDEFGH';

  var RE = {
    question: /^\s*(?:(?:câu|cau|question|q)\s*)?(\d{1,3})\s*[.):](?:\s+|$)(.*)$/i,
    choice: /^\s*\(?([A-H])\s*[.)]\s+(.*)$/,
    choiceEmpty: /^\s*\(?([A-H])\s*[.)]\s*$/,
    answer: /^\s*(?:answer|ans|correct answer|đáp án|dap an|key)\s*[:：]\s*(.*)$/i,
    explanation: /^\s*(?:explanation|solution|rationale|giải thích|lời giải|giai thich|loi giai)\s*[:：]\s*(.*)$/i,
    domain: /^\s*(?:domain|topic|skill|dạng|chủ đề)\s*[:：]\s*(.*)$/i,
    type: /^\s*(?:type|loại)\s*[:：]\s*(.*)$/i,
    module: /^\s*##\s+(.*)$/,
    keyHeader: /^\s*(?:#+\s*)?(?:(?:answer key|answers|bảng đáp án)\s*:?|đáp án|dap an)\s*$/i,
    keyLine: /^\s*(?:(?:câu|question|q)\s*)?(\d{1,3})(?:\s*[.):–]\s*|\s*-\s+|\s+)(\S.*?)\s*$/i,
    keyPair: /(?:^|\s)(\d{1,3})\s*[.):\-–]\s*(\S+)/g,
    meta: /^\s*(title|tiêu đề|tieu de|tên đề|author|tác giả|tac gia|test date|date|ngày thi|ngay thi|time|thời gian|thoi gian|description|mô tả|mo ta|section|category|phần|id)\s*[:：]\s*(.*)$/i
  };

  var META_KEYS = {
    'title': 'title', 'tiêu đề': 'title', 'tieu de': 'title', 'tên đề': 'title',
    'author': 'author', 'tác giả': 'author', 'tac gia': 'author',
    'date': 'date', 'test date': 'date', 'ngày thi': 'date', 'ngay thi': 'date',
    'time': 'time', 'thời gian': 'time', 'thoi gian': 'time',
    'description': 'description', 'mô tả': 'description', 'mo ta': 'description',
    'section': 'section', 'category': 'section', 'phần': 'section',
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

  /** Home page section: 'advanced' (Advanced Tests) or '' (Practice Tests). */
  function normalizeSection(v) {
    return /^\s*(advanced|adv|nâng cao|nang cao)\b/i.test(String(v || '')) ? 'advanced' : '';
  }

  function parseMinutes(v) {
    var m = /(\d+(?:[.,]\d+)?)/.exec(String(v == null ? '' : v));
    if (!m) return null;
    var n = parseFloat(m[1].replace(',', '.'));
    return isFinite(n) && n >= 0 ? n : null;
  }

  /** Test ids are used in URLs and storage keys: keep them to [a-zA-Z0-9_-]. */
  function cleanId(v) {
    return String(v == null ? '' : v).trim().replace(/[^a-zA-Z0-9_-]/g, '-');
  }

  function oneLine(v) {
    return String(v == null ? '' : v).replace(/\s*\n\s*/g, ' ').trim();
  }

  /**
   * Remove Markdown/LaTeX decoration around an answer: **B**, __4__, $4$, \$4, \(4\), \boxed{4}, \textbf{B}.
   * Command names are removed but their braces are kept, so \boxed{\frac{1}{2}} still converts to 1/2.
   */
  function stripDecoration(x) {
    var s = String(x == null ? '' : x).trim();
    s = s.replace(/\\(?:boxed|textbf|mathbf|textrm|mathrm|textit|textnormal|text|emph|bm|fbox|underline)\s*(?=\{)/g, '');
    s = s.replace(/\\\$/g, '').replace(/\$/g, '').replace(/\\[()[\]]/g, '');
    s = s.replace(/\*+/g, '').replace(/_{2,}/g, '');
    return s.trim();
  }

  /** Normalize a multiple-choice key: "(b)", "B.", "b", "**B**", "\textbf{B}" -> "B" */
  function normalizeLetter(v) {
    var m = /^\s*\(?\s*([A-Ha-h])\s*(?:[.)]|$|\s)/.exec(stripDecoration(v).replace(/[{}]/g, ''));
    return m ? m[1].toUpperCase() : '';
  }

  /** Split a list of student-produced-response keys: "441/677 | .6514 ; 0.651" */
  function splitAnswers(v) {
    if (Array.isArray(v)) {
      return v.reduce(function (acc, x) { return acc.concat(splitAnswers(x)); }, []);
    }
    return String(v == null ? '' : v)
      .split(/\s*(?:\||;|,\s+|\bor\b|\bhoặc\b)\s*/i)
      .map(function (x) { return cleanSprAnswer(x); })
      .filter(Boolean);
  }

  /** Clean a student-produced-response key: strips $...$, **, \boxed{}, a trailing %, spaces...; \frac{a}{b} -> a/b */
  function cleanSprAnswer(x) {
    var s = stripDecoration(x);
    // \frac{a}{b}, and the short forms \frac12, \frac 12, \frac{1}2
    s = s.replace(/\\[dt]?frac\s*(?:\{\s*([^{}]+?)\s*\}|(\d))\s*(?:\{\s*([^{}]+?)\s*\}|(\d))/g, function (m, a1, a2, b1, b2) {
      return (a1 || a2) + '/' + (b1 || b2);
    });
    s = s.replace(/^-\s*\\[dt]?frac/, '-\\frac');
    s = s.replace(/\\(?:,|!|;|:|\s)/g, '').replace(/[{}]/g, '');
    s = s.replace(/_+/g, '').replace(/\s+/g, '');
    s = s.replace(/[−–]/g, '-');
    // Students type the number only: drop a trailing percent or degree sign.
    s = s.replace(/(?:\\?%|°|\^\\circ)+$/, '');
    return s;
  }

  /* ---------------- Structural lines and the backslash escape ---------------- */

  /** What a line would mean to the parser if it appeared inside a question ('' = plain text). */
  function lineKind(line) {
    line = String(line == null ? '' : line);
    if (RE.keyHeader.test(line.trim())) return 'key';
    if (RE.module.test(line)) return 'module';
    if (RE.question.test(line)) return 'question';
    if (RE.answer.test(line)) return 'answer';
    if (RE.explanation.test(line)) return 'explanation';
    if (RE.domain.test(line)) return 'domain';
    if (RE.type.test(line)) return 'type';
    if (RE.choice.test(line) || RE.choiceEmpty.test(line)) return 'choice';
    return '';
  }

  /**
   * True when the line is an escaped structural line ("\2. step"), or an escaped escaped line ("\\2. step"):
   * the parser drops one leading backslash from such lines.
   */
  function isEscaped(line) {
    var m = /^\s*\\(?=\S)([\s\S]*)$/.exec(String(line));
    return !!m && (!!lineKind(m[1]) || isEscaped(m[1]));
  }

  /** Mark a line as plain text: "2. step" -> "\2. step". */
  function escapeLine(line) {
    var m = /^(\s*)([\s\S]*)$/.exec(String(line));
    return m[1] + '\\' + m[2];
  }

  /** Undo escapeLine, and drop a leading zero-width space (used by older LaTeX imports). */
  function unescapeLine(line) {
    line = String(line).replace(/^(\s*)\u200B/, '$1');
    if (!isEscaped(line)) return line;
    return line.replace(/^(\s*)\\/, '$1');
  }

  /** Escape a content line for toText when the parser would otherwise read it differently. */
  function protect(line, structural) {
    return structural || isEscaped(line) ? escapeLine(line) : line;
  }

  function newQuestion(label, line) {
    return { label: label, promptLines: [line], choices: [], answerRaw: null, explanationLines: null, domain: '', typeHint: '', line: line, srcLine: 0, blankAfterChoices: false };
  }

  /**
   * Parse the text format.
   * Returns { test, errors: [{line, msg}], warnings: [{line, msg}] }
   */
  function parseText(src, base) {
    base = base || {};
    var errors = [], warnings = [];
    var text = String(src || '').replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');
    var lines = text.split('\n');
    var meta = {};
    var i = 0;

    // Front matter: --- ... ---
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
    var mode = 'prompt'; // prompt | choices | after | explanation | key
    var keyEntries = [];
    var keyModule = null;
    var strayLines = 0;
    // Numbered steps inside an explanation: the last step number seen and whether the previous line was blank.
    var stepNo = 0, prevBlank = false;

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

    // Same view of the line as toText's explanationText: only the backslash escape is removed
    // (a legacy zero-width-space prefix is not a step), so the two stay in step on round trips.
    function stepNumber(s) {
      var sm = RE.question.exec(isEscaped(s) ? String(s).replace(/^(\s*)\\/, '$1') : s);
      return sm ? +sm[1] : 0;
    }

    /** Inside an explanation, "n. ..." is a step (not a new question) when n <= the question number or it continues the steps. */
    function isStep(n) {
      return n <= q.label || (stepNo > 0 && n === stepNo + 1 && !prevBlank);
    }

    function addKey(label, value, lineNo) {
      keyEntries.push({ label: label, value: value, line: lineNo, module: keyModule });
    }

    for (; i < lines.length; i++) {
      var line = lines[i];
      var lineNo = i + 1;
      var t = line.trim();
      var m;

      // "Answer Key" (also "## Answer Key") starts the answer key; check it before module headings.
      if (RE.keyHeader.test(t)) {
        finishQuestion();
        mode = 'key';
        keyModule = curModule;
        continue;
      }

      if ((m = RE.module.exec(line))) {
        finishQuestion();
        var parts = m[1].split('|');
        var time = parts.length > 1 ? parseMinutes(parts.slice(1).join('|')) : null;
        curModule = { title: parts[0].trim(), time: time, questions: [], line: lineNo };
        modules.push(curModule);
        mode = 'prompt';
        continue;
      }

      if (mode === 'key') {
        if (!t) continue;
        if (/^\|?\s*:?-{2,}/.test(t)) continue;
        if (t[0] === '|') {
          var cells = t.replace(/^\||\|$/g, '').split('|').map(function (c) { return c.trim(); });
          // A table row may hold several pairs: | question | answer | question | answer |
          for (var c = 0; c + 1 < cells.length; c += 2) {
            if (/^\d{1,3}$/.test(cells[c]) && cells[c + 1]) addKey(+cells[c], cells[c + 1], lineNo);
          }
          continue;
        }
        // Several pairs on one line: "1. B   2. C   3. 14" or "1.B 2.C 3.12"
        var pairs = [], pm;
        RE.keyPair.lastIndex = 0;
        // A separator after a value ("1. B, 2. C") is not part of the answer
        while ((pm = RE.keyPair.exec(t))) pairs.push({ label: +pm[1], value: pm[2].replace(/[,;]+$/, '') });
        var covered = t.replace(RE.keyPair, '').trim() === '';
        var increasing = pairs.every(function (p, pi) { return p.label > 0 && (pi === 0 || p.label > pairs[pi - 1].label); });
        if (pairs.length > 1 && covered && increasing) {
          pairs.forEach(function (p) { addKey(p.label, p.value, lineNo); });
          continue;
        }
        var km = RE.keyLine.exec(t);
        if (km) { addKey(+km[1], km[2], lineNo); continue; }
        if (/^(question|câu)\s*[|\t ]+\s*(answer|đáp án)/i.test(t)) continue;
        warnings.push({ line: lineNo, msg: 'Could not read this answer key line: "' + t.slice(0, 60) + '"' });
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

      if ((m = RE.question.exec(line)) && !(mode === 'explanation' && q && isStep(+m[1]))) {
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
      if ((m = RE.explanation.exec(line)) && mode !== 'explanation') {
        q.explanationLines = [m[1]];
        mode = 'explanation';
        stepNo = stepNumber(m[1]);
        prevBlank = false;
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
        if (!t) prevBlank = true;
        else {
          var sn = stepNumber(line);
          if (sn) stepNo = sn;
          prevBlank = false;
        }
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
          warnings.push({ line: lineNo, msg: 'Question ' + q.label + ': choice "' + letter + '" is out of order (expected ' + expected + ').' });
          q.choices.push({ letter: expected, lines: [m[2] || ''], line: lineNo });
          mode = 'choices';
          continue;
        }
      }

      if (mode === 'choices') {
        if (!t) { q.blankAfterChoices = true; continue; }
        var lastChoice = q.choices[q.choices.length - 1];
        if (q.blankAfterChoices) {
          warnings.push({ line: lineNo, msg: 'Question ' + q.label + ': the line after the choices was added to choice ' + lastChoice.letter + '.' });
          q.blankAfterChoices = false;
        }
        lastChoice.lines.push(line);
        continue;
      }

      if (mode === 'after') {
        if (!t) continue;
        warnings.push({ line: lineNo, msg: 'Question ' + q.label + ': ignored a line after "Answer:": "' + t.slice(0, 50) + '". Use "Explanation:" to add an explanation.' });
        continue;
      }

      q.promptLines.push(line);
    }
    finishQuestion();

    if (strayLines) warnings.push({ line: 1, msg: strayLines + (strayLines === 1 ? ' line' : ' lines') + ' before the first question ' + (strayLines === 1 ? 'was' : 'were') + ' ignored.' });

    // Drop empty modules
    modules = modules.filter(function (mod) {
      if (!mod.questions.length) {
        if (mod.title) warnings.push({ line: mod.line, msg: 'Module "' + mod.title + '" has no questions and was skipped.' });
        return false;
      }
      return true;
    });

    // Apply the answer key
    keyEntries.forEach(function (e) {
      var target = null;
      var searchMods = e.module ? [e.module].concat(modules) : modules;
      for (var s = 0; s < searchMods.length && !target; s++) {
        var qs = searchMods[s].questions;
        for (var x = 0; x < qs.length; x++) if (qs[x].label === e.label) { target = qs[x]; break; }
      }
      if (!target) { warnings.push({ line: e.line, msg: 'Answer key: there is no question ' + e.label + '.' }); return; }
      if (target.answerRaw && target.answerRaw.replace(/_/g, '').trim()) {
        warnings.push({ line: e.line, msg: 'Question ' + e.label + ' already has an "Answer:" line; the answer key value is used instead.' });
      }
      target.answerRaw = e.value;
    });

    var defaultTime = parseMinutes(meta.time);
    var test = {
      id: cleanId(base.id || meta.id || ''),
      title: oneLine(meta.title || base.title || ''),
      author: oneLine(meta.author || base.author || ''),
      date: oneLine(meta.date || base.date || ''),
      description: String(meta.description || base.description || '').trim(),
      section: normalizeSection(meta.section || base.section),
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

    if (!test.modules.length) errors.push({ line: 1, msg: 'No questions found. Start each question with its number, for example "1. What is the value of x?"' });

    return finalize(test, errors, warnings);
  }

  function joinLines(lines) {
    var s = lines.map(unescapeLine).join('\n');
    return s.replace(/^\s*\n/, '').replace(/\s+$/, '');
  }

  function buildQuestion(qq, errors, warnings) {
    var prompt = joinLines(qq.promptLines).trim();
    var choices = qq.choices.map(function (c) { return joinLines(c.lines).replace(/\s*\n\s*/g, ' ').trim(); });
    var type = choices.length ? 'mcq' : 'spr';
    if (/^(spr|grid|fill|student|điền|dien|tl|tự luận)/.test(qq.typeHint)) type = 'spr';
    if (/^(mcq|multiple|choice|tn|trắc nghiệm)/.test(qq.typeHint)) type = 'mcq';
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

  /* ---------------- Validation (shared by JSON and text) ---------------- */

  function finalize(test, errors, warnings) {
    errors = errors || []; warnings = warnings || [];
    if (!test.title) warnings.push({ line: 1, msg: 'The test has no title (add a line "title: Your test name").' });
    test.modules.forEach(function (mod, mi) {
      mod.questions.forEach(function (q, qi) {
        q.id = 'm' + (mi + 1) + 'q' + (qi + 1);
        var where = (test.modules.length > 1 ? mod.title + ', ' : '') + 'Question ' + (qi + 1) + (q.label && q.label !== qi + 1 ? ' (numbered ' + q.label + ')' : '');
        var line = q._line || 0;
        if (!q.prompt) warnings.push({ line: line, msg: where + ': the question text is empty.' });
        if (q.type === 'mcq') {
          if (q.choices.length < 2) errors.push({ line: line, msg: where + ': a multiple-choice question needs at least 2 choices.' });
          else if (q.choices.length !== 4) warnings.push({ line: line, msg: where + ': has ' + q.choices.length + ' choices (SAT questions usually have 4).' });
          q.choices.forEach(function (c, ci) { if (!c) warnings.push({ line: line, msg: where + ': choice ' + LETTERS[ci] + ' is empty.' }); });
          if (!q.answer) errors.push({ line: line, msg: where + ': missing answer (add a line "Answer: B").' });
          else if (LETTERS.indexOf(q.answer) >= q.choices.length) errors.push({ line: line, msg: where + ': answer "' + q.answer + '" is not one of the choices.' });
        } else {
          if (!q.answer || !q.answer.length) errors.push({ line: line, msg: where + ': missing answer (add a line "Answer: 14").' });
          else q.answer.forEach(function (a) {
            // Students can only type digits, ".", "/" and "-", so a non-numeric key could never be matched.
            if (global.G && !global.G.parseNumber(a)) {
              errors.push({ line: line, msg: where + ': answer "' + a + '" is not a number. Student-produced responses accept only digits, ".", "/" and "-" (for example 14, 3.5, 7/2 or -1/3).' });
            }
          });
        }
      });
    });
    return { test: test, errors: errors, warnings: warnings };
  }

  /** Normalize an uploaded JSON object (several shapes are accepted). */
  function normalizeObject(obj) {
    var errors = [], warnings = [];
    if (!obj || typeof obj !== 'object') return { test: null, errors: [{ line: 0, msg: 'Invalid test data.' }], warnings: [] };

    // Text source without modules: parse the text
    if ((obj.source || obj.text) && !Array.isArray(obj.modules) && !Array.isArray(obj.questions)) {
      var res = parseText(obj.source || obj.text, obj);
      if (obj.title && !res.test.title) res.test.title = oneLine(obj.title);
      copyMeta(obj, res.test);
      return res;
    }

    var modulesIn = Array.isArray(obj.modules) ? obj.modules
      : Array.isArray(obj.questions) ? [{ title: obj.moduleTitle || 'Math', time: obj.time, questions: obj.questions }]
        : null;
    if (!modulesIn) return { test: null, errors: [{ line: 0, msg: 'The JSON file has no "modules" or "questions" list.' }], warnings: [] };

    var test = {
      id: cleanId(obj.id),
      title: oneLine(obj.title || obj.name || ''),
      author: oneLine(obj.author || ''),
      date: oneLine(obj.date || ''),
      description: String(obj.description || '').trim(),
      section: normalizeSection(obj.section),
      source: typeof obj.source === 'string' ? obj.source : '',
      assets: obj.assets && typeof obj.assets === 'object' ? obj.assets : {},
      modules: []
    };
    modulesIn.forEach(function (mod, mi) {
      var name = mod && (mod.title || mod.name) ? String(mod.title || mod.name) : 'Module ' + (mi + 1);
      if (!mod || !Array.isArray(mod.questions) || !mod.questions.length) {
        warnings.push({ line: 0, msg: 'Module "' + name + '" has no questions and was skipped.' });
        return;
      }
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
          var qtype = String(qi.type || '').toLowerCase();
          var type = qtype === 'spr' || qtype === 'grid' || qtype === 'fill' ? 'spr'
            : qtype === 'mcq' ? 'mcq' : (choices.length ? 'mcq' : 'spr');
          var q = { label: +(qi.label || qi.number) || idx + 1, type: type, prompt: String(qi.prompt || qi.question || qi.text || '') };
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
    if (!test.modules.length) errors.push({ line: 0, msg: 'The test has no questions.' });
    return finalize(test, errors, warnings);
  }

  function copyMeta(obj, test) {
    ['createdAt', 'updatedAt', 'builtin', 'origin'].forEach(function (k) { if (obj[k] != null) test[k] = obj[k]; });
    if (obj.id && !test.id) test.id = cleanId(obj.id);
    if (obj.date && !test.date) test.date = oneLine(obj.date);
  }

  /* ---------------- Back to text ---------------- */

  /** Explanation lines, escaping the ones the parser would otherwise read as structure. */
  function explanationText(ex, label, answerEmpty) {
    var lines = String(ex).split('\n');
    var out = ['Explanation: ' + protect(lines[0], false)];
    // Mirror the parser: a numbered line is a step when n <= label or it continues the steps without a blank line.
    var sm0 = RE.question.exec(lines[0]);
    var step = sm0 ? +sm0[1] : 0, blank = false;
    for (var k = 1; k < lines.length; k++) {
      var l = lines[k];
      if (!l.trim()) { blank = true; out.push(l); continue; }
      var kind = lineKind(l);
      var esc = kind === 'key' || kind === 'module' || (kind === 'answer' && answerEmpty);
      var qm = RE.question.exec(l);
      if (qm) {
        var n = +qm[1];
        if (!(n <= label || (step > 0 && n === step + 1 && !blank))) esc = true;
        step = n;
      }
      blank = false;
      out.push(protect(l, esc));
    }
    return out;
  }

  /** Convert a test object back to the text format (for editing). */
  function toText(test) {
    var out = ['---', 'title: ' + oneLine(test.title), 'author: ' + oneLine(test.author)];
    if (test.date) out.push('date: ' + oneLine(test.date));
    if (test.description) out.push('description: ' + oneLine(test.description));
    if (test.section) out.push('section: ' + test.section);
    // Times computed automatically by the library (m.autoTime) are not written back.
    var times = test.modules.map(function (m) { return m.autoTime ? null : m.time; });
    var sameTime = times.every(function (t) { return t === times[0]; });
    if (sameTime && times[0] != null) out.push('time: ' + times[0]);
    out.push('---', '');
    test.modules.forEach(function (mod, mi) {
      if (test.modules.length > 1 || (mod.title && mod.title !== 'Math')) {
        out.push('## ' + oneLine(mod.title || 'Module ' + (mi + 1)).replace(/\|/g, '/') + (!sameTime && times[mi] != null ? ' | ' + times[mi] : ''), '');
      }
      mod.questions.forEach(function (q, qi) {
        var label = qi + 1;
        var pl = String(q.prompt || '').split('\n');
        out.push(label + '. ' + protect(pl[0], false));
        for (var k = 1; k < pl.length; k++) out.push(protect(pl[k], !!lineKind(pl[k])));
        var ans;
        if (q.type === 'mcq') {
          (q.choices || []).forEach(function (c, ci) { out.push(LETTERS[ci] + '. ' + protect(oneLine(c), false)); });
          ans = q.answer || '';
        } else {
          ans = (Array.isArray(q.answer) ? q.answer : q.answer ? [q.answer] : []).join(' | ');
        }
        out.push('Answer: ' + ans);
        if (q.domain) out.push('Domain: ' + q.domain);
        if (q.explanation) Array.prototype.push.apply(out, explanationText(q.explanation, label, !String(ans).trim()));
        out.push('');
      });
    });
    return out.join('\n');
  }

  /* ---------------- Files ---------------- */

  /**
   * A hand-written tests/*.js file: SATLibrary.register({ id: '...', source: String.raw`...` }).
   * The JavaScript is never executed; only the template literal and the id are read.
   */
  function parseRegisterSource(body) {
    var tm = /\bsource\s*:\s*(String\.raw\s*)?`([^`]*)`/.exec(body) || /^\s*(String\.raw\s*)?`([^`]*)`\s*$/.exec(body);
    if (!tm) return null;
    var source = tm[1] ? tm[2] : tm[2].replace(/\\([`\\$])/g, '$1');
    var rest = body.slice(0, tm.index) + body.slice(tm.index + tm[0].length);
    var obj = { source: source };
    var idm = /(?:^|[{,\s])['"]?id['"]?\s*:\s*(['"])([^'"\n]*)\1/.exec(rest);
    if (idm) obj.id = idm[2];
    return normalizeObject(obj);
  }

  /** Read any supported file (JSON / text / LaTeX / tests/*.js). */
  function parseAny(content, filename) {
    var name = String(filename || '').toLowerCase();
    var trimmed = String(content || '').replace(/^\uFEFF/, '').trim();
    if (global.LatexImport && (/\.tex$/.test(name) || /\\begin\{(document|enumerate)\}/.test(trimmed))) {
      var conv = global.LatexImport.convert(trimmed);
      var r = parseText(conv.text);
      r.importNotes = conv.warnings;
      r.fromLatex = true;
      return r;
    }
    var isJs = false;
    if (/\.js$/.test(name) || /^(?:\/\*[\s\S]*?\*\/\s*|\/\/[^\n]*\n\s*)*SATLibrary\.register\s*\(/.test(trimmed)) {
      var jm = /SATLibrary\.register\s*\(\s*([\s\S]*)\)\s*;?\s*$/.exec(trimmed);
      if (jm) { trimmed = jm[1].trim(); isJs = true; }
    }
    if (isJs && trimmed[0] !== '{' && trimmed[0] !== '[') {
      var rs = parseRegisterSource(trimmed);
      if (rs) return rs;
    }
    if (trimmed[0] === '{' || trimmed[0] === '[') {
      var data;
      try { data = JSON.parse(trimmed); }
      catch (e) {
        if (isJs) {
          var rj = parseRegisterSource(trimmed);
          if (rj) return rj;
          return { test: null, errors: [{ line: 0, msg: 'Could not read this .js file. Use SATLibrary.register({ id: "...", source: String.raw`...` }) or JSON (' + e.message + ').' }], warnings: [] };
        }
        return { test: null, errors: [{ line: 0, msg: 'The JSON file has a syntax error: ' + e.message }], warnings: [] };
      }
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
    lineKind: lineKind,
    escapeLine: escapeLine,
    LETTERS: LETTERS,
    DOMAINS: DOMAINS.map(function (d) { return d.key; })
  };
})(window);
