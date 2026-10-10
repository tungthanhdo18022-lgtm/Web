/* Admin test builder: write or paste a test, live preview, images, LaTeX import, save drafts, publish. */
(function (global) {
  'use strict';

  var U = global.U, R = global.R, P = global.P;
  var LETTERS = 'ABCDEFGH';
  var DRAFT_KEY = 'satmath.builderDraft.v1';

  var STARTER = [
    '1. If $3x + 5 = 20$, what is the value of $x$?',
    'A. $3$',
    'B. $5$',
    'C. $15$',
    'D. $25$',
    'Answer: B',
    'Explanation: Subtract $5$ from both sides: $3x = 15$, so $x = 5$.',
    '',
    '2. The function $f$ is defined by $f(x) = \\dfrac{x^2 - 9}{x - 3}$ for $x \\ne 3$. What is the value of $f(7)$?',
    'Answer: 10',
    ''
  ].join('\n');

  function splitFrontMatter(src) {
    var meta = {};
    var text = String(src || '').replace(/\r\n?/g, '\n');
    var m = /^\s*---\s*\n([\s\S]*?)\n---\s*(?:\n|$)/.exec(text);
    if (m) {
      m[1].split('\n').forEach(function (line) {
        var kv = /^\s*([^:：]+?)\s*[:：]\s*(.*)$/.exec(line);
        if (kv) meta[kv[1].trim().toLowerCase()] = kv[2].trim();
      });
      text = text.slice(m[0].length);
    }
    return { meta: meta, body: text.replace(/^\n+/, '') };
  }

  function metaValue(meta, keys) {
    for (var i = 0; i < keys.length; i++) if (meta[keys[i]] != null) return meta[keys[i]];
    return '';
  }

  /** 'advanced' or '' (same rule as the parser). */
  function sectionValue(v) {
    return /^\s*(advanced|adv|nâng cao|nang cao)\b/i.test(String(v || '')) ? 'advanced' : '';
  }

  function isBlankBody(body) { return !String(body || '').trim() || body === STARTER; }

  function BuilderView(root, params) {
    var Lib = global.SATLibrary, Admin = global.Admin;
    var editingId = params.id || null;
    var editing = editingId ? Lib.get(editingId) : null;
    if (editingId && !editing) {
      U.toast('That test was not found — starting a new one.', 'error');
      editingId = null;
    }
    // 'new' (never saved), 'draft' (local draft), 'published' (editing the live version)
    var mode = !editing ? 'new' : editing.builtin ? 'published' : 'draft';
    var publishedFile = editing ? (editing.builtin ? editing.file : (editing.publishedFile || (Lib.getPublished(editing.id) || {}).file || '')) : '';

    var state = {
      title: '', author: '', description: '', date: '', time: '', section: '',
      body: '', assets: {},
      createdAt: null,
      lastResult: null,
      importNotes: [],
      dirty: false
    };

    function autosaveKey() { return editingId ? DRAFT_KEY + ':' + editingId : DRAFT_KEY; }

    function loadFromSource(src, base) {
      var fm = splitFrontMatter(src);
      state.body = fm.body;
      state.title = base.title ? base.title : metaValue(fm.meta, ['title', 'tiêu đề', 'tên đề']);
      state.author = base.author ? base.author : metaValue(fm.meta, ['author', 'tác giả']);
      state.description = base.description ? base.description : metaValue(fm.meta, ['description', 'mô tả']);
      state.date = base.date ? base.date : metaValue(fm.meta, ['date', 'test date', 'ngày thi']);
      state.section = sectionValue(base.section || metaValue(fm.meta, ['section', 'category', 'phần']));
      var t = metaValue(fm.meta, ['time', 'thời gian']);
      state.time = base.time != null ? String(base.time) : (t ? String(parseFloat(t) || '') : '');
      state.assets = base.assets || {};
    }

    function applySnapshot(d) {
      state.title = d.title || ''; state.author = d.author || ''; state.description = d.description || '';
      state.date = d.date || ''; state.time = d.time || ''; state.section = sectionValue(d.section);
      state.body = d.body || ''; state.assets = d.assets || {};
    }

    var notes = [];
    if (editing) {
      loadFromSource(editing.source || P.toText(editing), {
        title: editing.title, author: editing.author, description: editing.description, date: editing.date,
        section: editing.section, assets: Object.assign({}, editing.assets || {})
      });
      var times = editing.modules.map(function (m) { return m.time; });
      var anyAuto = editing.modules.some(function (m) { return m.autoTime; });
      if (!state.time && !anyAuto && times.every(function (x) { return x === times[0]; })) state.time = String(times[0]);
      state.createdAt = editing.createdAt;
      // Unsaved changes from an earlier session?
      var auto = U.lsGet(autosaveKey(), null);
      if (auto && auto.body && auto.savedAt > (editing.updatedAt || 0) && auto.body !== state.body) {
        applySnapshot(auto);
        state.dirty = true;
        notes.push({ text: 'Restored unsaved changes from ' + U.fmtDate(auto.savedAt) + '.', action: 'discard', label: 'Discard them' });
      }
    } else if (global.App.pendingDraft) {
      var pd = global.App.pendingDraft;
      global.App.pendingDraft = null;
      var prev = U.lsGet(DRAFT_KEY, null);
      if (prev && !isBlankBody(prev.body)) U.lsSet(DRAFT_KEY + '.prev', prev);
      loadFromSource(pd.source || '', { title: pd.title, author: pd.author, description: pd.description, date: pd.date, section: pd.section, assets: Object.assign({}, pd.assets || {}) });
      state.dirty = true;
      state.importNotes = pd.importNotes || [];
      if (pd.note) notes.push({ text: pd.note });
      if (prev && !isBlankBody(prev.body)) notes.push({ text: 'Your previous unsaved draft "' + (prev.title || 'Untitled') + '" was kept.', action: 'restore-prev', label: 'Open it instead' });
    } else {
      var draft = U.lsGet(DRAFT_KEY, null);
      if (draft && !isBlankBody(draft.body)) {
        applySnapshot(draft);
        notes.push({ text: 'Restored your unsaved draft from ' + U.fmtDate(draft.savedAt) + '.', action: 'new', label: 'Start a new test' });
      } else {
        state.body = STARTER;
        state.author = global.Settings.get().name || '';
      }
    }

    function composeSource() {
      var fm = ['---', 'title: ' + state.title.replace(/\n/g, ' '), 'author: ' + state.author.replace(/\n/g, ' ')];
      if (String(state.date).trim()) fm.push('date: ' + String(state.date).trim());
      if (state.description.trim()) fm.push('description: ' + state.description.replace(/\n/g, ' '));
      if (String(state.time).trim()) fm.push('time: ' + String(state.time).trim());
      if (state.section) fm.push('section: ' + state.section);
      fm.push('---', '');
      // The body starts on line fm.length (1-based), so body line n = file line n + offset
      return { text: fm.join('\n') + state.body, offset: fm.length - 1 };
    }

    function headingText() {
      return mode === 'published' ? 'Edit published test' : mode === 'draft' ? 'Edit draft' : 'New test';
    }

    /* ---------------- Layout ---------------- */
    root.innerHTML =
      '<div class="builder">' +
      '<div class="builder-bar">' +
      '<div class="builder-title">' +
      '<a class="icon-btn" href="#/admin" aria-label="Back to admin">' + U.icon('chevronLeft') + '</a>' +
      '<div><h1 id="bd-heading">' + headingText() + '</h1><span class="save-state" id="bd-state"></span></div>' +
      '</div>' +
      '<div class="builder-actions">' +
      '<div class="dropdown"><button class="btn btn--ghost" data-act="import-menu" aria-haspopup="menu">' + U.icon('upload') + '<span>Import</span>' + U.icon('chevronDown') + '</button>' +
      '<div class="dropdown-menu" id="bd-import" hidden role="menu">' +
      '<button data-act="open" role="menuitem">' + U.icon('file') + '<span><b>Open a file</b><small>.json, .txt, .tex or a tests/*.js file</small></span></button>' +
      '<button data-act="latex" role="menuitem">' + U.icon('code') + '<span><b>Paste LaTeX</b><small>Convert \\begin{enumerate}… automatically</small></span></button>' +
      '</div></div>' +
      '<div class="dropdown"><button class="btn btn--ghost" data-act="export-menu" aria-haspopup="menu">' + U.icon('download') + '<span>Export</span>' + U.icon('chevronDown') + '</button>' +
      '<div class="dropdown-menu" id="bd-export" hidden role="menu">' +
      '<button data-act="export-json" role="menuitem">' + U.icon('file') + '<span><b>JSON file</b><small>Backup or share (includes images)</small></span></button>' +
      '<button data-act="export-js" role="menuitem">' + U.icon('code') + '<span><b>.js file for tests/</b><small>Manual publishing</small></span></button>' +
      '<button data-act="export-txt" role="menuitem">' + U.icon('file') + '<span><b>Plain text (.txt)</b><small>Source only, without images</small></span></button>' +
      '</div></div>' +
      '<button class="btn btn--ghost" data-act="save">' + U.icon('check') + '<span>Save draft</span></button>' +
      '<button class="btn btn--primary" data-act="publish" id="bd-publish">' + U.icon('send') + '<span>' + (publishedFile ? 'Publish update' : 'Publish') + '</span></button>' +
      '</div>' +
      '</div>' +
      '<div id="bd-notes"></div>' +
      '<div class="builder-meta">' +
      '<label class="field"><span class="field-label">Title *</span><input id="bd-title" type="text" maxlength="120" placeholder="e.g. SAT September 12, 2026 Administration"></label>' +
      '<label class="field"><span class="field-label">Author</span><input id="bd-author" type="text" maxlength="80" placeholder="Your name"></label>' +
      '<label class="field"><span class="field-label">Test date</span><input id="bd-date" type="text" maxlength="40" placeholder="2026-09-12"></label>' +
      '<label class="field field--sm"><span class="field-label">Time (min)</span><input id="bd-time" type="number" min="1" max="600" step="1" placeholder="Auto"></label>' +
      '<label class="field field--sm"><span class="field-label">Section</span><select id="bd-section"><option value="">Practice</option><option value="advanced">Advanced</option></select></label>' +
      '<label class="field field--wide"><span class="field-label">Description</span><input id="bd-desc" type="text" maxlength="300" placeholder="Optional short description"></label>' +
      '</div>' +
      '<div class="builder-main">' +
      '<section class="editor-pane">' +
      '<div class="editor-toolbar" role="toolbar" aria-label="Insert">' +
      '<button data-ins="mcq" title="Insert a multiple-choice question">' + U.icon('plus') + 'Multiple choice</button>' +
      '<button data-ins="spr" title="Insert a student-produced response question">' + U.icon('plus') + 'Student response</button>' +
      '<button data-act="image" title="Insert an image (or paste one with Ctrl+V)">' + U.icon('image') + 'Image</button>' +
      '<button data-ins="table" title="Insert a table">' + U.icon('table') + 'Table</button>' +
      '<button data-ins="math" title="Insert math">' + U.icon('sigma') + 'Math</button>' +
      '<button data-ins="module" title="Split the test into modules">' + U.icon('grid') + 'Module</button>' +
      '<button data-act="syntax" title="Formatting guide">' + U.icon('help') + 'Syntax</button>' +
      '</div>' +
      '<textarea id="bd-src" class="editor" spellcheck="false" autocomplete="off" autocapitalize="off" aria-label="Test content"></textarea>' +
      '<div class="editor-status" id="bd-status"></div>' +
      '</section>' +
      '<section class="preview-pane">' +
      '<div class="preview-head">' +
      '<div class="tabs" role="tablist">' +
      '<button class="tab is-on" data-tab="preview" role="tab">Preview</button>' +
      '<button class="tab" data-tab="issues" role="tab">Check <span class="tab-count" id="bd-issue-count"></span></button>' +
      '</div>' +
      '<span class="preview-sum" id="bd-sum"></span>' +
      '</div>' +
      '<div class="preview-body" id="bd-preview"></div>' +
      '<div class="preview-body" id="bd-issues" hidden></div>' +
      '</section>' +
      '</div>' +
      '</div>';

    var $ = function (id) { return document.getElementById(id); };
    var el = {
      title: $('bd-title'), author: $('bd-author'), date: $('bd-date'), time: $('bd-time'), desc: $('bd-desc'), section: $('bd-section'),
      src: $('bd-src'), status: $('bd-status'), preview: $('bd-preview'), issues: $('bd-issues'),
      sum: $('bd-sum'), issueCount: $('bd-issue-count'), state: $('bd-state'), heading: $('bd-heading'),
      exportMenu: $('bd-export'), importMenu: $('bd-import'), notes: $('bd-notes'), publish: $('bd-publish')
    };

    function fillInputs() {
      el.title.value = state.title; el.author.value = state.author; el.date.value = state.date;
      el.time.value = state.time; el.desc.value = state.description; el.section.value = state.section; el.src.value = state.body;
    }
    fillInputs();

    function renderNotes() {
      el.notes.innerHTML = notes.map(function (n, i) {
        return '<div class="alert alert--info builder-note">' + U.icon('info') + '<div>' + U.esc(n.text) +
          (n.action ? ' <button class="link-btn" data-note-act="' + n.action + '" data-note="' + i + '">' + U.esc(n.label) + '</button>' : '') + '</div></div>';
      }).join('');
    }
    renderNotes();

    /* ---------------- Parse & preview ---------------- */
    function analyze() {
      var comp = composeSource();
      var res = P.parseText(comp.text, { assets: state.assets, id: editingId || '' });
      res.offset = comp.offset;
      state.lastResult = res;
      return res;
    }

    function bodyLine(line) { return Math.max(1, line - (state.lastResult ? state.lastResult.offset : 0)); }

    function renderPreview() {
      var res = analyze();
      var test = res.test;
      var opts = Object.keys(state.assets).length ? { assets: state.assets } : {};
      var total = 0, mcq = 0, spr = 0;
      var html = '';
      test.modules.forEach(function (mod) {
        if (test.modules.length > 1) html += '<div class="pv-module">' + U.esc(mod.title) + '<span>' + mod.questions.length + ' questions · ' + (mod.time != null ? mod.time + ' min' : 'auto time') + '</span></div>';
        mod.questions.forEach(function (q, qi) {
          total++; if (q.type === 'mcq') mcq++; else spr++;
          var hasErr = res.errors.some(function (e) { return e.line === q._line; });
          var ansHtml = q.type === 'mcq'
            ? (q.answer ? 'Answer: <b>' + q.answer + '</b>' : '<b class="txt-bad">No answer</b>')
            : (q.answer && q.answer.length ? 'Answer: <b>' + q.answer.map(U.esc).join(' | ') + '</b>' : '<b class="txt-bad">No answer</b>');
          var body;
          try {
            body = '<div class="content">' + R.render(q.prompt, opts) + '</div>';
            if (q.type === 'mcq') {
              body += '<div class="pv-choices">' + q.choices.map(function (c, ci) {
                var L = LETTERS[ci];
                return '<div class="pv-choice' + (q.answer === L ? ' is-key' : '') + '"><span class="pv-letter">' + L + '</span><span>' + R.render(c, Object.assign({ inline: true }, opts)) + '</span></div>';
              }).join('') + '</div>';
            } else {
              body += '<div class="pv-spr"><span class="pv-spr-box"></span><span class="muted">Students type their answer</span></div>';
            }
            if (q.explanation) body += '<details class="pv-expl"><summary>Explanation</summary><div class="content">' + R.render(q.explanation, opts) + '</div></details>';
          } catch (e) {
            body = '<div class="alert alert--error">This question could not be displayed: ' + U.esc(e.message) + '</div>';
          }
          html += '<article class="pv-q' + (hasErr ? ' has-error' : '') + '" data-line="' + q._line + '">' +
            '<div class="pv-q-head"><span class="pv-num">' + (qi + 1) + '</span>' +
            '<span class="badge ' + (q.type === 'mcq' ? 'badge--blue' : 'badge--violet') + '">' + (q.type === 'mcq' ? 'Multiple choice' : 'Student response') + '</span>' +
            (q.domain ? '<span class="badge badge--gray">' + U.esc(q.domain) + '</span>' : '') +
            '<span class="spacer"></span><span class="pv-ans">' + ansHtml + '</span>' +
            '<button class="icon-btn" data-goto-line="' + q._line + '" title="Go to this line in the editor" aria-label="Go to line">' + U.icon('edit') + '</button>' +
            '</div>' + body + '</article>';
        });
      });
      if (!total) {
        html = '<div class="empty-mini">No questions yet. Start each question with its number, e.g. <code>1. Question text</code>.<br>Use <b>+ Multiple choice</b> or <b>+ Student response</b> to insert a template.</div>';
      }
      el.preview.innerHTML = html;
      el.sum.textContent = total + ' questions · ' + mcq + ' MCQ · ' + spr + ' SPR';
      renderIssues(res);
      updateStatus();
    }

    function renderIssues(res) {
      var imp = state.importNotes || [];
      var n = res.errors.length, w = res.warnings.length + imp.length;
      el.issueCount.textContent = n + w ? String(n + w) : '';
      el.issueCount.className = 'tab-count' + (n ? ' is-error' : w ? ' is-warn' : '');
      var item = function (x, kind) {
        var ln = x.line ? bodyLine(x.line) : 0;
        return '<li class="issue issue--' + kind + '"' + (x.line && x.line > res.offset ? ' data-goto-line="' + x.line + '"' : '') + '>' +
          U.icon(kind === 'error' ? 'warn' : 'info') + '<span>' + U.esc(x.msg) + (x.line && x.line > res.offset ? ' <small>(line ' + ln + ')</small>' : '') + '</span></li>';
      };
      el.issues.innerHTML = (n + w === 0)
        ? '<div class="issues-ok">' + U.icon('check') + '<b>No problems found.</b><span>The test is ready to save or publish.</span></div>'
        : '<ul class="issue-list">' + res.errors.map(function (x) { return item(x, 'error'); }).join('') +
        res.warnings.map(function (x) { return item(x, 'warn'); }).join('') +
        imp.map(function (msg) { return item({ line: 0, msg: 'Import: ' + msg }, 'warn'); }).join('') + '</ul>';
    }

    function updateStatus() {
      var v = el.src.value;
      var pos = el.src.selectionStart || 0;
      var line = v.slice(0, pos).split('\n').length;
      var res = state.lastResult;
      var errs = res ? res.errors.length : 0;
      el.status.innerHTML = 'Line ' + line + ' of ' + v.split('\n').length +
        (errs ? ' · <span class="txt-bad">' + errs + ' error' + (errs > 1 ? 's' : '') + ' to fix</span>' : ' · <span class="txt-ok">No errors</span>');
    }

    var schedulePreview = U.debounce(renderPreview, 280);

    /* ---------------- Autosave ---------------- */
    var autosaveWarned = false;
    function snapshot(withAssets) {
      return {
        title: state.title, author: state.author, description: state.description, date: state.date, time: state.time,
        section: state.section, body: state.body, assets: withAssets ? state.assets : {}, savedAt: Date.now()
      };
    }
    var autosave = U.debounce(function () {
      var ok = U.lsSet(autosaveKey(), snapshot(true));
      if (!ok) {
        ok = U.lsSet(autosaveKey(), snapshot(false));
        if (!autosaveWarned) { autosaveWarned = true; U.toast('Images are too large to autosave — click "Save draft" to keep them.', 'error', 5000); }
      }
      el.state.textContent = ok ? 'Unsaved changes (autosaved)' : 'Unsaved changes';
    }, 600);

    function markDirty() {
      state.dirty = true;
      el.state.textContent = 'Editing…';
      autosave();
    }

    function clearAutosave() {
      U.lsDel(autosaveKey());
    }

    /* ---------------- Inserting ---------------- */
    function nextNumber() {
      var lines = el.src.value.slice(0, el.src.selectionStart).split('\n');
      for (var i = lines.length - 1; i >= 0; i--) {
        var m = /^\s*(\d{1,3})\s*[.)]\s/.exec(lines[i]);
        if (m) return +m[1] + 1;
      }
      return 1;
    }

    function insertText(text, selectFrom, selectLen) {
      var ta = el.src;
      var start = ta.selectionStart, end = ta.selectionEnd;
      ta.focus();
      var ok = false;
      try { ok = document.execCommand && document.execCommand('insertText', false, text); } catch (e) { ok = false; }
      if (!ok) ta.value = ta.value.slice(0, start) + text + ta.value.slice(end);
      var s = start + (selectFrom != null ? selectFrom : text.length);
      ta.setSelectionRange(s, s + (selectLen || 0));
      onSrcInput();
    }

    function insertBlock(text) {
      var ta = el.src;
      var before = ta.value.slice(0, ta.selectionStart);
      var pre = !before || /\n\n$/.test(before) ? '' : /\n$/.test(before) ? '\n' : '\n\n';
      insertText(pre + text + '\n');
    }

    var SNIPPETS = {
      mcq: function (n) { return n + '. Question text, for example $2x + 3 = 11$.\nA. \nB. \nC. \nD. \nAnswer: A'; },
      spr: function (n) { return n + '. Question text for a student-produced response.\nAnswer: '; },
      table: function () { return '| Column 1 | Column 2 |\n|:---:|:---:|\n| $x$ | $y$ |\n| 1 | 3 |'; },
      module: function () { return '## Module 2 | 35'; }
    };

    function doInsert(kind) {
      if (kind === 'math') {
        var ta = el.src;
        var sel = ta.value.slice(ta.selectionStart, ta.selectionEnd);
        insertText('$' + sel + '$', sel ? sel.length + 2 : 1, 0);
        return;
      }
      var n = nextNumber();
      var snippet = SNIPPETS[kind](n);
      insertBlock(snippet);
      if (kind === 'mcq' || kind === 'spr') {
        // Select the placeholder question text so it can be typed over
        var ta2 = el.src;
        var idx = ta2.value.lastIndexOf(snippet);
        if (idx !== -1) ta2.setSelectionRange(idx + String(n).length + 2, idx + snippet.indexOf('\n'));
      }
    }

    /* ---------------- Images ---------------- */
    function compressImage(dataUrl, type) {
      return new Promise(function (resolve) {
        if (/svg/.test(type)) { resolve(dataUrl); return; }
        var img = new Image();
        img.onload = function () {
          var maxW = 1400;
          if (img.naturalWidth <= maxW && dataUrl.length < 700000) { resolve(dataUrl); return; }
          var scale = Math.min(1, maxW / img.naturalWidth);
          var c = document.createElement('canvas');
          c.width = Math.round(img.naturalWidth * scale); c.height = Math.round(img.naturalHeight * scale);
          var ctx = c.getContext('2d');
          ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, c.width, c.height);
          ctx.drawImage(img, 0, 0, c.width, c.height);
          var png = c.toDataURL('image/png');
          var out = png.length > 900000 ? c.toDataURL('image/jpeg', 0.88) : png;
          resolve(out.length < dataUrl.length ? out : dataUrl);
        };
        img.onerror = function () { resolve(dataUrl); };
        img.src = dataUrl;
      });
    }

    function addImageFile(file) {
      if (!file || !/^image\//.test(file.type)) { U.toast('That file is not an image.', 'error'); return Promise.resolve(); }
      return U.readFile(file, 'dataurl').then(function (d) { return compressImage(d, file.type); }).then(function (data) {
        var id = 'img-' + Math.random().toString(36).slice(2, 8);
        state.assets[id] = data;
        insertBlock('![Figure|320](asset:' + id + ')');
        U.toast('Image inserted. 320 is the width in pixels — change it if needed.', 'success');
      }).catch(function (e) { U.toast('Could not read the image: ' + e.message, 'error'); });
    }

    function usedAssets() {
      var used = {};
      var re = /asset:([A-Za-z0-9_-]+)/g, m;
      while ((m = re.exec(state.body))) used[m[1]] = true;
      var out = {};
      Object.keys(state.assets).forEach(function (k) { if (used[k]) out[k] = state.assets[k]; });
      return out;
    }

    /* ---------------- Save / publish / export ---------------- */
    function currentTest(requireValid) {
      var res = analyze();
      renderIssues(res);
      if (requireValid && res.errors.length) {
        switchTab('issues');
        U.toast('Fix ' + res.errors.length + ' error' + (res.errors.length > 1 ? 's' : '') + ' first — see the Check tab.', 'error', 4500);
        return null;
      }
      if (requireValid && !state.title.trim()) {
        el.title.focus();
        U.toast('Enter a title for the test.', 'error');
        return null;
      }
      var missing = [];
      state.body.replace(/asset:([A-Za-z0-9_-]+)/g, function (m, id) { if (!state.assets[id]) missing.push(id); return m; });
      if (requireValid && missing.length) {
        U.toast('Some images are missing (' + missing.join(', ') + '). Insert them again.', 'error', 5000);
        return null;
      }
      var t = res.test;
      t.assets = usedAssets();
      t.source = composeSource().text;
      t.date = String(state.date || '').trim();
      if (editingId) t.id = editingId;
      if (state.createdAt) t.createdAt = state.createdAt;
      t.publishedFile = publishedFile || '';
      return t;
    }

    function becomeEditing(id, newMode) {
      U.lsDel(autosaveKey());
      editingId = id;
      mode = newMode;
      history.replaceState(null, '', '#/admin/builder/' + encodeURIComponent(id));
      el.heading.textContent = headingText();
    }

    function saveDraft() {
      var t = currentTest(true);
      if (!t) return Promise.resolve(null);
      if (!editingId) t.id = uniqueId(U.slug(t.title));
      return Lib.save(t).then(function (saved) {
        state.dirty = false;
        state.createdAt = saved.createdAt;
        becomeEditing(saved.id, 'draft');
        clearAutosave();
        el.state.textContent = 'Draft saved ' + U.fmtDate(Date.now());
        U.toast('Draft saved in this browser.', 'success');
        return saved;
      }).catch(function (e) {
        U.alert('Could not save', U.esc(e && e.message || String(e)));
        return null;
      });
    }

    /** An id that does not clash with a different published test. */
    function uniqueId(base) {
      base = Lib.safeId(base) || 'practice-test';
      var id = base, n = 2;
      while ((Lib.getPublished(id) && Lib.getPublished(id).file !== publishedFile) || (!editingId && Lib.get(id))) { id = base + '-' + n; n++; }
      return id;
    }

    function publish() {
      if (!Admin || !Admin.isAdmin()) { U.alert('Sign in required', 'Sign in on the Admin page to publish.'); return; }
      var t = currentTest(true);
      if (!t) return;
      var id = editingId && (mode === 'published' || !Lib.getPublished(editingId) || Lib.getPublished(editingId).file === publishedFile)
        ? editingId : uniqueId(U.slug(t.title));
      var isUpdate = !!publishedFile;

      var box = document.createElement('div');
      box.innerHTML = '<p>' + (isUpdate
        ? 'This replaces the live version of <b>' + U.esc(t.title) + '</b> (tests/' + U.esc(publishedFile) + ').'
        : '<b>' + U.esc(t.title) + '</b> (' + t.modules.reduce(function (n, m) { return n + m.questions.length; }, 0) + ' questions) will be added to the public site.') + '</p>' +
        '<ul class="publish-log" id="pub-log"></ul>';
      var log = function (text, st) {
        var ul = box.querySelector('#pub-log');
        var last = ul.lastElementChild;
        if (last && last.classList.contains('is-active')) { last.classList.remove('is-active'); last.classList.add('is-done'); last.querySelector('.ico-slot').innerHTML = U.icon('check'); }
        if (st === 'done') return;
        var li = document.createElement('li');
        li.className = st === 'error' ? 'is-error' : 'is-active';
        li.innerHTML = '<span class="ico-slot">' + (st === 'error' ? U.icon('warn') : '<span class="spinner" style="width:16px;height:16px;border-width:2px"></span>') + '</span><span>' + U.esc(text) + '</span>';
        ul.appendChild(li);
      };

      var running = false, closeModal = null;
      U.modal({
        title: isUpdate ? 'Publish update' : 'Publish test',
        body: box,
        dismissible: true,
        onOpen: function (b, close) { closeModal = close; },
        actions: [
          { label: 'Cancel', value: null, kind: 'ghost' },
          {
            label: isUpdate ? 'Publish update' : 'Publish', value: 'go', kind: 'primary',
            onClick: function (modalBox) {
              if (running) return false;
              running = true;
              var btns = modalBox.querySelectorAll('.modal-actions .btn');
              Array.prototype.forEach.call(btns, function (b) { b.disabled = true; });
              Admin.publish({ id: id, title: t.title, source: t.source, assets: t.assets }, { file: publishedFile || undefined, onStep: log })
                .then(function (res) {
                  Lib.registerLocal({ id: id, source: res.source }, { file: res.file, v: res.v });
                  publishedFile = res.file;
                  var hadDraft = editingId && !Lib.isBuiltin(editingId) && Lib.drafts().some(function (d) { return d.id === editingId; });
                  var cleanup = hadDraft ? Lib.remove(editingId) : Promise.resolve();
                  return cleanup.then(function () {
                    clearAutosave();
                    becomeEditing(id, 'published');
                    // The published source now points to tests/images/… instead of embedded images
                    var fm = splitFrontMatter(res.source);
                    state.body = fm.body; state.assets = {};
                    el.src.value = state.body;
                    state.dirty = false;
                    el.state.textContent = 'Published ' + U.fmtDate(Date.now());
                    el.publish.querySelector('span').textContent = 'Publish update';
                    renderPreview();
                    if (closeModal) closeModal('done');
                    return U.modal({
                      title: 'Published!',
                      body: '<p><b>' + U.esc(t.title) + '</b> was committed to GitHub as <code>tests/' + U.esc(res.file) + '</code>.</p>' +
                        '<p>The public site updates in about <b>1–2 minutes</b> (GitHub Pages redeploys automatically). If students already have the page open, they will see it after a refresh.</p>',
                      actions: [
                        { label: 'Keep editing', value: 'stay', kind: 'ghost' },
                        { label: 'Back to admin', value: 'admin', kind: 'ghost' },
                        { label: 'View test', value: 'view', kind: 'primary' }
                      ]
                    }).then(function (v) {
                      if (v === 'view') location.hash = '#/test/' + encodeURIComponent(id);
                      else if (v === 'admin') location.hash = '#/admin';
                    });
                  });
                })
                .catch(function (err) {
                  log(err.message, 'error');
                  running = false;
                  Array.prototype.forEach.call(btns, function (b) { b.disabled = false; });
                });
              return false; // keep the dialog open while publishing
            }
          }
        ]
      });
    }

    function exportAs(kind) {
      var t = currentTest(kind !== 'txt');
      if (!t) return;
      var base = U.slug(t.title || 'practice-test');
      if (kind === 'txt') {
        U.download(base + '.txt', t.source, 'text/plain;charset=utf-8');
        if (Object.keys(t.assets).length) U.toast('Note: the .txt file does not include images. Use JSON to keep them.', 'info', 5000);
        return;
      }
      t.id = editingId || base;
      if (kind === 'json') { U.download(base + '.json', Lib.exportJson(t), 'application/json'); return; }
      var payload = { id: t.id, source: t.source };
      if (Object.keys(t.assets).length) payload.assets = t.assets;
      var js = '/* Practice test: ' + String(t.title || '').replace(/\*\//g, '') + '\n' +
        ' * To publish manually: put this file in tests/ and add { file: \'' + base + '.js\', v: \'1\' } to tests/manifest.js */\n' +
        'SATLibrary.register(' + JSON.stringify(payload, null, 2).replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029') + ');\n';
      U.download(base + '.js', js, 'text/javascript;charset=utf-8');
    }

    /* ---------------- Import ---------------- */
    function applyParsed(res, filename) {
      if (res.many) {
        U.toast('This file contains several tests — use "Import file" on the Admin page.', 'error', 5000);
        return;
      }
      if (!res.test) {
        U.alert('Could not read the file', U.esc((res.errors[0] && res.errors[0].msg) || 'Unsupported format.'));
        return;
      }
      var t = res.test;
      state.importNotes = res.importNotes || [];
      loadFromSource(t.source || P.toText(t), { title: t.title, author: t.author, description: t.description, date: t.date, section: t.section, assets: Object.assign({}, t.assets || {}) });
      fillInputs();
      markDirty();
      renderPreview();
      var nNotes = res.warnings.length + state.importNotes.length;
      U.toast('Opened ' + (filename || 'content') + (nNotes ? ' (' + nNotes + ' note' + (nNotes > 1 ? 's' : '') + ' — see the Check tab)' : ''), 'success', 4000);
      if (res.warnings.length || res.errors.length || state.importNotes.length) switchTab('issues');
    }

    function confirmReplace() {
      if (isBlankBody(el.src.value)) return Promise.resolve(true);
      return U.confirm('Replace the current content?', 'What you are editing now will be replaced by the imported test.', 'Replace');
    }

    function openFile() {
      U.pickFile('.json,.txt,.md,.tex,.js,application/json,text/plain').then(function (files) {
        if (!files.length) return;
        var f = files[0];
        return confirmReplace().then(function (ok) {
          if (!ok) return;
          return U.readFile(f).then(function (text) { applyParsed(P.parseAny(text, f.name), f.name); });
        });
      }).catch(function (e) { U.toast('Could not read the file: ' + e.message, 'error'); });
    }

    function latexDialog() {
      var body = document.createElement('div');
      body.innerHTML = '<p class="muted">Paste a whole <code>.tex</code> file (or just the <code>\\begin{enumerate}…\\end{enumerate}</code> part). ' +
        'Questions (<code>\\item</code>), A–D choices (nested lists), math, tables and an answer-key table are detected automatically.</p>' +
        '<textarea class="editor editor--modal" id="latex-src" spellcheck="false" placeholder="\\begin{enumerate}\n\\item The function $f$ ...\n  \\begin{enumerate}[label=\\Alph*.]\n    \\item $2$\n    ...\n  \\end{enumerate}\n\\end{enumerate}"></textarea>' +
        '<div class="latex-row"><button class="btn btn--ghost btn--sm" type="button" id="latex-file">' + U.icon('upload') + 'Choose a .tex file</button><span class="muted" id="latex-fname"></span></div>';
      body.querySelector('#latex-file').addEventListener('click', function () {
        U.pickFile('.tex,text/plain').then(function (files) {
          if (!files.length) return;
          U.readFile(files[0]).then(function (t) {
            body.querySelector('#latex-src').value = t;
            body.querySelector('#latex-fname').textContent = files[0].name;
          });
        });
      });
      U.modal({
        title: 'Import from LaTeX',
        wide: true,
        body: body,
        actions: [
          { label: 'Cancel', value: null, kind: 'ghost' },
          { label: 'Convert', value: 'go', kind: 'primary' }
        ],
        onOpen: function (box) { setTimeout(function () { var ta = box.querySelector('#latex-src'); if (ta) ta.focus(); }, 50); }
      }).then(function (v) {
        if (v !== 'go') return;
        var tex = body.querySelector('#latex-src').value;
        if (!tex.trim()) return;
        var conv = global.LatexImport.convert(tex);
        confirmReplace().then(function (ok) {
          if (!ok) return;
          var res = P.parseText(conv.text);
          res.importNotes = conv.warnings;
          res.test.source = conv.text;
          applyParsed(res, 'LaTeX (' + conv.questionCount + ' questions)');
        });
      });
    }

    function syntaxHelp() {
      U.modal({ title: 'Formatting guide', wide: true, body: global.Views.guideSyntaxHtml(), actions: [{ label: 'Close', value: true, kind: 'primary' }] });
    }

    /* ---------------- Events ---------------- */
    function gotoLine(line) {
      var bl = bodyLine(line);
      var lines = el.src.value.split('\n');
      var pos = 0;
      for (var i = 0; i < bl - 1 && i < lines.length; i++) pos += lines[i].length + 1;
      var endPos = pos + (lines[bl - 1] || '').length;
      el.src.focus();
      el.src.setSelectionRange(pos, endPos);
      var lh = parseFloat(getComputedStyle(el.src).lineHeight) || 20;
      el.src.scrollTop = Math.max(0, (bl - 4) * lh);
      updateStatus();
      if (window.innerWidth < 900) el.src.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function switchTab(tab) {
      U.$$('[data-tab]', root).forEach(function (b) { b.classList.toggle('is-on', b.getAttribute('data-tab') === tab); });
      el.preview.hidden = tab !== 'preview';
      el.issues.hidden = tab !== 'issues';
    }

    function onSrcInput() {
      state.body = el.src.value;
      markDirty();
      schedulePreview();
    }

    function onMetaInput() {
      state.title = el.title.value;
      state.author = el.author.value;
      state.date = el.date.value;
      state.time = el.time.value;
      state.description = el.desc.value;
      state.section = el.section.value;
      markDirty();
      schedulePreview();
    }

    function closeMenus(except) {
      if (except !== el.exportMenu) el.exportMenu.hidden = true;
      if (except !== el.importMenu) el.importMenu.hidden = true;
    }

    function onNoteAction(act, idx) {
      if (act === 'discard') {
        U.lsDel(autosaveKey());
        state.dirty = false;
        global.App.route();
      } else if (act === 'restore-prev') {
        var prev = U.lsGet(DRAFT_KEY + '.prev', null);
        if (!prev) return;
        applySnapshot(prev);
        state.importNotes = [];
        fillInputs();
        U.lsDel(DRAFT_KEY + '.prev');
        notes.splice(0, notes.length);
        renderNotes();
        markDirty();
        renderPreview();
      } else if (act === 'new') {
        U.confirm('Start a new test?', 'Your unsaved draft will be discarded.', 'Start new', { danger: true }).then(function (ok) {
          if (!ok) return;
          U.lsDel(DRAFT_KEY);
          state.title = ''; state.description = ''; state.date = ''; state.time = ''; state.section = ''; state.body = STARTER; state.assets = {}; state.importNotes = [];
          fillInputs();
          notes.splice(0, notes.length);
          renderNotes();
          state.dirty = false;
          el.state.textContent = '';
          renderPreview();
        });
      }
      void idx;
    }

    function onClick(e) {
      var ins = e.target.closest('[data-ins]');
      if (ins) { doInsert(ins.getAttribute('data-ins')); return; }
      var tab = e.target.closest('[data-tab]');
      if (tab) { switchTab(tab.getAttribute('data-tab')); return; }
      var na = e.target.closest('[data-note-act]');
      if (na) { onNoteAction(na.getAttribute('data-note-act'), +na.getAttribute('data-note')); return; }
      var gl = e.target.closest('[data-goto-line]');
      if (gl) { gotoLine(+gl.getAttribute('data-goto-line')); return; }
      var card = e.target.closest('.pv-q');
      if (card && !e.target.closest('summary, a, button')) { gotoLine(+card.getAttribute('data-line')); return; }
      if (!e.target.closest('.dropdown')) closeMenus();
      var b = e.target.closest('[data-act]');
      if (!b) return;
      switch (b.getAttribute('data-act')) {
        case 'save': saveDraft(); break;
        case 'publish': publish(); break;
        case 'open': closeMenus(); openFile(); break;
        case 'latex': closeMenus(); latexDialog(); break;
        case 'syntax': syntaxHelp(); break;
        case 'image':
          U.pickFile('image/*', true).then(function (files) {
            files.reduce(function (p, f) { return p.then(function () { return addImageFile(f); }); }, Promise.resolve());
          });
          break;
        case 'import-menu': closeMenus(el.importMenu); el.importMenu.hidden = !el.importMenu.hidden; break;
        case 'export-menu': closeMenus(el.exportMenu); el.exportMenu.hidden = !el.exportMenu.hidden; break;
        case 'export-json': closeMenus(); exportAs('json'); break;
        case 'export-js': closeMenus(); exportAs('js'); break;
        case 'export-txt': closeMenus(); exportAs('txt'); break;
      }
    }

    function onPaste(e) {
      var items = (e.clipboardData && e.clipboardData.items) || [];
      // Text copied from Word/Excel also carries a picture of the selection — prefer the text
      var hasText = Array.prototype.some.call(items, function (it) { return it.kind === 'string' && it.type === 'text/plain'; });
      if (hasText) return;
      for (var i = 0; i < items.length; i++) {
        if (items[i].kind === 'file' && /^image\//.test(items[i].type)) {
          var f = items[i].getAsFile();
          if (f) { e.preventDefault(); addImageFile(f); return; }
        }
      }
    }

    function onKeyDown(e) {
      if (e.key === 'Tab' && !e.shiftKey && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        insertText('  ');
      }
    }

    function onDocKey(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') { e.preventDefault(); saveDraft(); }
      if (e.key === 'Escape') closeMenus();
    }

    function onBeforeUnload(e) {
      if (state.dirty) { e.preventDefault(); e.returnValue = ''; }
    }

    function onDrop(e) {
      var files = e.dataTransfer && e.dataTransfer.files;
      if (!files || !files.length) return;
      e.preventDefault();
      var f = files[0];
      if (/^image\//.test(f.type)) { addImageFile(f); return; }
      confirmReplace().then(function (ok) {
        if (!ok) return;
        U.readFile(f).then(function (text) { applyParsed(P.parseAny(text, f.name), f.name); });
      });
    }

    root.addEventListener('click', onClick);
    el.src.addEventListener('input', onSrcInput);
    el.src.addEventListener('keyup', updateStatus);
    el.src.addEventListener('click', updateStatus);
    el.src.addEventListener('paste', onPaste);
    el.src.addEventListener('keydown', onKeyDown);
    el.src.addEventListener('dragover', function (e) { e.preventDefault(); });
    el.src.addEventListener('drop', onDrop);
    [el.title, el.author, el.date, el.time, el.desc].forEach(function (i) { i.addEventListener('input', onMetaInput); });
    el.section.addEventListener('change', onMetaInput);
    document.addEventListener('keydown', onDocKey);
    window.addEventListener('beforeunload', onBeforeUnload);

    renderPreview();
    if (state.dirty) autosave();
    if (publishedFile && mode !== 'new') el.state.textContent = 'Live as tests/' + publishedFile;

    return function cleanup() {
      root.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onDocKey);
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  }

  global.Views = global.Views || {};
  global.Views.builder = BuilderView;
})(window);
