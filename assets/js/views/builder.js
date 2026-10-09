/* Trang soạn đề: gõ / dán đề, xem trước trực tiếp, chèn ảnh, nhập LaTeX, lưu & xuất file. */
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

  function BuilderView(root, params) {
    var Lib = global.SATLibrary;
    var editingId = params.id || null;
    var editing = editingId ? Lib.get(editingId) : null;
    if (editingId && (!editing || editing.builtin)) {
      if (editing && editing.builtin) {
        // Đề có sẵn: mở bản sao
        global.App.pendingDraft = { source: editing.source || P.toText(editing), title: editing.title + ' (bản sao)', author: editing.author, description: editing.description, assets: editing.assets };
      } else {
        U.toast('Không tìm thấy đề cần sửa — mở trang soạn đề mới.', 'error');
      }
      editingId = null; editing = null;
    }

    var state = {
      title: '', author: '', description: '', time: '',
      body: '', assets: {},
      createdAt: null,
      lastResult: null,
      importNotes: [],
      dirty: false
    };

    function loadFromSource(src, base) {
      var fm = splitFrontMatter(src);
      state.body = fm.body;
      state.title = base.title != null && base.title !== '' ? base.title : metaValue(fm.meta, ['title', 'tiêu đề', 'tên đề']);
      state.author = base.author != null && base.author !== '' ? base.author : metaValue(fm.meta, ['author', 'tác giả']);
      state.description = base.description != null && base.description !== '' ? base.description : metaValue(fm.meta, ['description', 'mô tả']);
      var t = metaValue(fm.meta, ['time', 'thời gian']);
      state.time = base.time != null ? String(base.time) : (t ? String(parseFloat(t) || '') : '');
      state.assets = base.assets || {};
    }

    var draftNote = '';
    if (editing) {
      var times = editing.modules.map(function (m) { return m.time; });
      var src = editing.source || P.toText(editing);
      loadFromSource(src, { title: editing.title, author: editing.author, description: editing.description, assets: Object.assign({}, editing.assets || {}) });
      if (!state.time && times.every(function (x) { return x === times[0]; })) state.time = String(times[0]);
      state.createdAt = editing.createdAt;
    } else if (global.App.pendingDraft) {
      var pd = global.App.pendingDraft;
      global.App.pendingDraft = null;
      loadFromSource(pd.source || '', { title: pd.title, author: pd.author, description: pd.description, assets: Object.assign({}, pd.assets || {}) });
      state.dirty = true;
      state.importNotes = pd.importNotes || [];
      if (pd.note) draftNote = pd.note;
    } else {
      var draft = U.lsGet(DRAFT_KEY, null);
      if (draft && draft.body && draft.body.trim()) {
        state.title = draft.title || ''; state.author = draft.author || ''; state.description = draft.description || '';
        state.time = draft.time || ''; state.body = draft.body; state.assets = draft.assets || {};
        draftNote = 'Đã khôi phục bản nháp lưu lúc ' + U.fmtDate(draft.savedAt) + '.';
      } else {
        state.title = ''; state.body = STARTER; state.time = '';
        var name = global.Settings.get().name;
        state.author = name || '';
      }
    }

    function composeSource() {
      var fm = ['---', 'title: ' + state.title.replace(/\n/g, ' '), 'author: ' + state.author.replace(/\n/g, ' ')];
      if (state.description.trim()) fm.push('description: ' + state.description.replace(/\n/g, ' '));
      if (String(state.time).trim()) fm.push('time: ' + String(state.time).trim());
      fm.push('---', '');
      return { text: fm.join('\n') + state.body, offset: fm.length };
    }

    /* ---------------- Giao diện ---------------- */
    root.innerHTML =
      '<div class="builder">' +
      '<div class="builder-bar">' +
      '<div class="builder-title">' +
      '<a class="icon-btn" href="#/" aria-label="Về thư viện">' + U.icon('chevronLeft') + '</a>' +
      '<div><h1>' + (editing ? 'Chỉnh sửa đề' : 'Soạn đề mới') + '</h1><span class="save-state" id="bd-state"></span></div>' +
      '</div>' +
      '<div class="builder-actions">' +
      '<button class="btn btn--ghost" data-act="open">' + U.icon('upload') + '<span>Mở file</span></button>' +
      '<button class="btn btn--ghost" data-act="latex">' + U.icon('code') + '<span>Nhập LaTeX</span></button>' +
      '<div class="dropdown"><button class="btn btn--ghost" data-act="export-menu" aria-haspopup="menu">' + U.icon('download') + '<span>Xuất file</span>' + U.icon('chevronDown') + '</button>' +
      '<div class="dropdown-menu" id="bd-export" hidden role="menu">' +
      '<button data-act="export-json" role="menuitem">' + U.icon('file') + '<span><b>File JSON</b><small>Để chia sẻ / tải lên trình duyệt khác</small></span></button>' +
      '<button data-act="export-js" role="menuitem">' + U.icon('code') + '<span><b>File .js cho thư mục tests/</b><small>Để đưa đề lên website cho mọi người</small></span></button>' +
      '<button data-act="export-txt" role="menuitem">' + U.icon('file') + '<span><b>File văn bản .txt</b><small>Mã nguồn đề (không kèm ảnh)</small></span></button>' +
      '</div></div>' +
      '<button class="btn btn--primary" data-act="save">' + U.icon('check') + '<span>Lưu vào thư viện</span></button>' +
      '</div>' +
      '</div>' +

      (draftNote ? '<div class="alert alert--info builder-note">' + U.icon('info') + '<div>' + U.esc(draftNote) +
        ' <button class="link-btn" data-act="new">Bắt đầu đề mới</button></div></div>' : '') +

      '<div class="builder-meta">' +
      '<label class="field"><span class="field-label">Tên đề *</span><input id="bd-title" type="text" maxlength="120" placeholder="Ví dụ: SAT Math Practice Test 1"></label>' +
      '<label class="field"><span class="field-label">Tác giả</span><input id="bd-author" type="text" maxlength="80" placeholder="Tên người soạn"></label>' +
      '<label class="field field--sm"><span class="field-label">Thời gian (phút)</span><input id="bd-time" type="number" min="1" max="600" step="1" placeholder="Tự động"></label>' +
      '<label class="field field--wide"><span class="field-label">Mô tả</span><input id="bd-desc" type="text" maxlength="300" placeholder="Ghi chú ngắn về đề (không bắt buộc)"></label>' +
      '</div>' +

      '<div class="builder-main">' +
      '<section class="editor-pane">' +
      '<div class="editor-toolbar" role="toolbar" aria-label="Chèn nhanh">' +
      '<button data-ins="mcq" title="Chèn câu trắc nghiệm">' + U.icon('plus') + 'Trắc nghiệm</button>' +
      '<button data-ins="spr" title="Chèn câu điền đáp án">' + U.icon('plus') + 'Điền đáp án</button>' +
      '<button data-act="image" title="Chèn ảnh (hoặc dán ảnh bằng Ctrl+V)">' + U.icon('image') + 'Ảnh</button>' +
      '<button data-ins="table" title="Chèn bảng">' + U.icon('table') + 'Bảng</button>' +
      '<button data-ins="math" title="Chèn công thức">' + U.icon('sigma') + 'Công thức</button>' +
      '<button data-ins="module" title="Chia đề thành nhiều module">' + U.icon('grid') + 'Module</button>' +
      '<button data-act="syntax" title="Hướng dẫn cú pháp">' + U.icon('help') + 'Cú pháp</button>' +
      '</div>' +
      '<textarea id="bd-src" class="editor" spellcheck="false" autocomplete="off" autocapitalize="off" aria-label="Nội dung đề"></textarea>' +
      '<div class="editor-status" id="bd-status"></div>' +
      '</section>' +
      '<section class="preview-pane">' +
      '<div class="preview-head">' +
      '<div class="tabs" role="tablist">' +
      '<button class="tab is-on" data-tab="preview" role="tab">Xem trước</button>' +
      '<button class="tab" data-tab="issues" role="tab">Kiểm tra <span class="tab-count" id="bd-issue-count"></span></button>' +
      '</div>' +
      '<span class="preview-sum" id="bd-sum"></span>' +
      '</div>' +
      '<div class="preview-body" id="bd-preview"></div>' +
      '<div class="preview-body" id="bd-issues" hidden></div>' +
      '</section>' +
      '</div>' +
      '</div>';

    var el = {
      title: document.getElementById('bd-title'), author: document.getElementById('bd-author'),
      time: document.getElementById('bd-time'), desc: document.getElementById('bd-desc'),
      src: document.getElementById('bd-src'), status: document.getElementById('bd-status'),
      preview: document.getElementById('bd-preview'), issues: document.getElementById('bd-issues'),
      sum: document.getElementById('bd-sum'), issueCount: document.getElementById('bd-issue-count'),
      state: document.getElementById('bd-state'), exportMenu: document.getElementById('bd-export')
    };
    el.title.value = state.title; el.author.value = state.author; el.time.value = state.time; el.desc.value = state.description;
    el.src.value = state.body;

    /* ---------------- Phân tích & xem trước ---------------- */
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
        if (test.modules.length > 1) html += '<div class="pv-module">' + U.esc(mod.title) + '<span>' + mod.questions.length + ' câu · ' + (mod.time != null ? mod.time + ' phút' : 'thời gian tự động') + '</span></div>';
        mod.questions.forEach(function (q, qi) {
          total++; if (q.type === 'mcq') mcq++; else spr++;
          var hasErr = res.errors.some(function (e) { return e.line === q._line; });
          var ansHtml = q.type === 'mcq'
            ? (q.answer ? 'Đáp án: <b>' + q.answer + '</b>' : '<b class="txt-bad">Chưa có đáp án</b>')
            : (q.answer && q.answer.length ? 'Đáp án: <b>' + q.answer.map(U.esc).join(' | ') + '</b>' : '<b class="txt-bad">Chưa có đáp án</b>');
          var body;
          try {
            body = '<div class="content">' + R.render(q.prompt, opts) + '</div>';
            if (q.type === 'mcq') {
              body += '<div class="pv-choices">' + q.choices.map(function (c, ci) {
                var L = LETTERS[ci];
                return '<div class="pv-choice' + (q.answer === L ? ' is-key' : '') + '"><span class="pv-letter">' + L + '</span><span>' + R.render(c, Object.assign({ inline: true }, opts)) + '</span></div>';
              }).join('') + '</div>';
            } else {
              body += '<div class="pv-spr"><span class="pv-spr-box"></span><span class="muted">Học sinh nhập đáp án</span></div>';
            }
            if (q.explanation) body += '<details class="pv-expl"><summary>Lời giải</summary><div class="content">' + R.render(q.explanation, opts) + '</div></details>';
          } catch (e) {
            body = '<div class="alert alert--error">Không hiển thị được câu này: ' + U.esc(e.message) + '</div>';
          }
          html += '<article class="pv-q' + (hasErr ? ' has-error' : '') + '" data-line="' + q._line + '">' +
            '<div class="pv-q-head"><span class="pv-num">' + (qi + 1) + '</span>' +
            '<span class="badge ' + (q.type === 'mcq' ? 'badge--blue' : 'badge--violet') + '">' + (q.type === 'mcq' ? 'Trắc nghiệm' : 'Điền đáp án') + '</span>' +
            (q.domain ? '<span class="badge badge--gray">' + U.esc(q.domain) + '</span>' : '') +
            '<span class="spacer"></span><span class="pv-ans">' + ansHtml + '</span>' +
            '<button class="icon-btn" data-goto-line="' + q._line + '" title="Tới dòng trong trình soạn" aria-label="Tới dòng">' + U.icon('edit') + '</button>' +
            '</div>' + body + '</article>';
        });
      });
      if (!total) {
        html = '<div class="empty-mini">Chưa có câu hỏi nào. Mỗi câu bắt đầu bằng số thứ tự, ví dụ <code>1. Nội dung câu hỏi</code>.<br>Bấm <b>+ Trắc nghiệm</b> hoặc <b>+ Điền đáp án</b> để chèn mẫu.</div>';
      }
      el.preview.innerHTML = html;
      el.sum.textContent = total + ' câu · ' + mcq + ' TN · ' + spr + ' điền';
      renderIssues(res);
      updateStatus();
    }

    function renderIssues(res) {
      var notes = state.importNotes || [];
      var n = res.errors.length, w = res.warnings.length + notes.length;
      el.issueCount.textContent = n + w ? String(n + w) : '';
      el.issueCount.className = 'tab-count' + (n ? ' is-error' : w ? ' is-warn' : '');
      var item = function (x, kind) {
        var ln = x.line ? bodyLine(x.line) : 0;
        return '<li class="issue issue--' + kind + '"' + (x.line ? ' data-goto-line="' + x.line + '"' : '') + '>' +
          U.icon(kind === 'error' ? 'warn' : 'info') + '<span>' + U.esc(x.msg) + (x.line && x.line > res.offset ? ' <small>(dòng ' + ln + ')</small>' : '') + '</span></li>';
      };
      el.issues.innerHTML = (n + w === 0)
        ? '<div class="issues-ok">' + U.icon('check') + '<b>Không có lỗi.</b><span>Đề đã sẵn sàng để lưu.</span></div>'
        : '<ul class="issue-list">' + res.errors.map(function (x) { return item(x, 'error'); }).join('') +
        res.warnings.map(function (x) { return item(x, 'warn'); }).join('') +
        notes.map(function (msg) { return item({ line: 0, msg: 'Khi nhập: ' + msg }, 'warn'); }).join('') + '</ul>';
    }

    function updateStatus() {
      var v = el.src.value;
      var pos = el.src.selectionStart || 0;
      var line = v.slice(0, pos).split('\n').length;
      var res = state.lastResult;
      var errs = res ? res.errors.length : 0;
      el.status.innerHTML = 'Dòng ' + line + ' · ' + v.split('\n').length + ' dòng' +
        (errs ? ' · <span class="txt-bad">' + errs + ' lỗi cần sửa</span>' : ' · <span class="txt-ok">Không có lỗi</span>');
    }

    var schedulePreview = U.debounce(renderPreview, 280);

    /* ---------------- Bản nháp ---------------- */
    var draftWarned = false;
    var saveDraft = U.debounce(function () {
      if (editingId) { el.state.textContent = state.dirty ? 'Có thay đổi chưa lưu' : ''; return; }
      var ok = U.lsSet(DRAFT_KEY, {
        title: state.title, author: state.author, description: state.description, time: state.time,
        body: state.body, assets: state.assets, savedAt: Date.now()
      });
      if (!ok) {
        ok = U.lsSet(DRAFT_KEY, { title: state.title, author: state.author, description: state.description, time: state.time, body: state.body, assets: {}, savedAt: Date.now() });
        if (!draftWarned) { draftWarned = true; U.toast('Ảnh quá lớn để tự lưu bản nháp — hãy bấm "Lưu vào thư viện".', 'error', 5000); }
      }
      el.state.textContent = ok ? 'Đã tự lưu bản nháp' : '';
    }, 600);

    function markDirty() {
      state.dirty = true;
      el.state.textContent = 'Đang soạn…';
      saveDraft();
    }

    /* ---------------- Chèn nội dung ---------------- */
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
      if (!ok) {
        ta.value = ta.value.slice(0, start) + text + ta.value.slice(end);
      }
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
      mcq: function (n) { return n + '. Nội dung câu hỏi, ví dụ $2x + 3 = 11$.\nA. \nB. \nC. \nD. \nAnswer: A'; },
      spr: function (n) { return n + '. Nội dung câu hỏi điền đáp án.\nAnswer: '; },
      table: function () { return '| Cột 1 | Cột 2 |\n|:---:|:---:|\n| $x$ | $y$ |\n| 1 | 3 |'; },
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
        // chọn sẵn phần "Nội dung câu hỏi" để gõ đè
        var ta2 = el.src;
        var idx = ta2.value.lastIndexOf(snippet);
        if (idx !== -1) {
          var startSel = idx + String(n).length + 2;
          var firstLineEnd = snippet.indexOf('\n');
          ta2.setSelectionRange(startSel, idx + firstLineEnd);
        }
      }
    }

    /* ---------------- Ảnh ---------------- */
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
      if (!file || !/^image\//.test(file.type)) { U.toast('File không phải ảnh.', 'error'); return Promise.resolve(); }
      return U.readFile(file, 'dataurl').then(function (d) { return compressImage(d, file.type); }).then(function (data) {
        var id = 'img-' + Math.random().toString(36).slice(2, 8);
        state.assets[id] = data;
        insertBlock('![Hình|320](asset:' + id + ')');
        U.toast('Đã chèn ảnh. Số 320 là chiều rộng (px) — có thể sửa.', 'success');
      }).catch(function (e) { U.toast('Không đọc được ảnh: ' + e.message, 'error'); });
    }

    function usedAssets() {
      var used = {};
      var re = /asset:([A-Za-z0-9_-]+)/g, m;
      while ((m = re.exec(state.body))) used[m[1]] = true;
      var out = {};
      Object.keys(state.assets).forEach(function (k) { if (used[k]) out[k] = state.assets[k]; });
      return out;
    }

    /* ---------------- Lưu / xuất ---------------- */
    function currentTest(requireValid) {
      var res = analyze();
      renderIssues(res);
      if (requireValid && res.errors.length) {
        switchTab('issues');
        U.toast('Đề còn ' + res.errors.length + ' lỗi — xem tab "Kiểm tra".', 'error', 4500);
        return null;
      }
      if (requireValid && !state.title.trim()) {
        el.title.focus();
        U.toast('Hãy nhập tên đề.', 'error');
        return null;
      }
      var t = res.test;
      t.assets = usedAssets();
      t.source = composeSource().text;
      if (editingId) t.id = editingId;
      if (state.createdAt) t.createdAt = state.createdAt;
      return t;
    }

    function save() {
      var t = currentTest(true);
      if (!t) return;
      Lib.save(t).then(function (saved) {
        state.dirty = false;
        var wasNew = !editingId;
        editingId = saved.id; state.createdAt = saved.createdAt;
        if (wasNew) U.lsDel(DRAFT_KEY);
        el.state.textContent = 'Đã lưu lúc ' + U.fmtDate(Date.now());
        if (wasNew) history.replaceState(null, '', '#/builder/' + encodeURIComponent(saved.id));
        return U.modal({
          title: 'Đã lưu đề!',
          body: '<p>Đề <b>' + U.esc(saved.title) + '</b> (' + saved.questionCount + ' câu) đã được lưu vào thư viện trên trình duyệt này.</p>' +
            '<p class="muted">Muốn mọi người đều thấy đề này trên website? Dùng <b>Xuất file → File .js cho thư mục tests/</b> (xem trang Hướng dẫn).</p>',
          actions: [
            { label: 'Tiếp tục chỉnh sửa', value: 'stay', kind: 'ghost' },
            { label: 'Về thư viện', value: 'home', kind: 'ghost' },
            { label: 'Làm bài ngay', value: 'start', kind: 'primary' }
          ]
        }).then(function (v) {
          if (v === 'start') location.hash = '#/test/' + encodeURIComponent(saved.id);
          else if (v === 'home') location.hash = '#/';
        });
      }).catch(function (e) {
        U.alert('Không lưu được', U.esc(e && e.message || String(e)));
      });
    }

    function exportAs(kind) {
      var t = currentTest(kind !== 'txt');
      if (!t) return;
      var base = U.slug(t.title || 'de-thi');
      if (kind === 'txt') {
        U.download(base + '.txt', t.source, 'text/plain;charset=utf-8');
        if (Object.keys(t.assets).length) U.toast('Lưu ý: file .txt không chứa ảnh. Dùng JSON để giữ ảnh.', 'info', 5000);
        return;
      }
      t.id = editingId || base;
      var json = Lib.exportJson(t);
      if (kind === 'json') { U.download(base + '.json', json, 'application/json'); return; }
      var js = '/* Đề: ' + (t.title || '').replace(/\*\//g, '') + ' — tạo bằng trang Soạn đề.\n' +
        ' * Cách dùng: đặt file này vào thư mục tests/ và thêm "' + base + '.js" vào tests/manifest.js */\n' +
        'SATLibrary.register(' + JSON.stringify(JSON.parse(json), null, 2) + ');\n';
      js = js.replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
      U.download(base + '.js', js, 'text/javascript;charset=utf-8');
      U.modal({
        title: 'Đã tải file ' + base + '.js',
        body: '<ol class="steps"><li>Chép file <code>' + base + '.js</code> vào thư mục <code>tests/</code> của website.</li>' +
          '<li>Mở <code>tests/manifest.js</code> và thêm dòng <code>\'' + base + '.js\'</code> vào danh sách.</li>' +
          '<li>Đưa thay đổi lên GitHub (commit &amp; push). Sau khi trang được cập nhật, mọi người đều thấy đề mới.</li></ol>',
        actions: [{ label: 'Đã hiểu', value: true, kind: 'primary' }]
      });
    }

    /* ---------------- Mở file / LaTeX ---------------- */
    function applyParsed(res, filename) {
      if (res.many) {
        U.toast('File chứa nhiều đề — hãy dùng nút "Tải đề lên" ở thư viện.', 'error', 5000);
        return;
      }
      if (!res.test) {
        U.alert('Không đọc được file', U.esc((res.errors[0] && res.errors[0].msg) || 'Định dạng không hợp lệ.'));
        return;
      }
      var t = res.test;
      var src = t.source || P.toText(t);
      state.importNotes = res.importNotes || [];
      loadFromSource(src, { title: t.title, author: t.author, description: t.description, assets: Object.assign({}, t.assets || {}) });
      el.title.value = state.title; el.author.value = state.author; el.time.value = state.time; el.desc.value = state.description;
      el.src.value = state.body;
      markDirty();
      renderPreview();
      var nNotes = res.warnings.length + (res.importNotes || []).length;
      var warn = nNotes ? ' (' + nNotes + ' ghi chú — xem tab Kiểm tra)' : '';
      U.toast('Đã mở ' + (filename || 'nội dung') + warn, 'success', 4000);
      if (res.warnings.length || res.errors.length || state.importNotes.length) switchTab('issues');
    }

    function confirmReplace() {
      if (!el.src.value.trim() || el.src.value === STARTER) return Promise.resolve(true);
      return U.confirm('Thay nội dung hiện tại?', 'Nội dung đang soạn sẽ được thay bằng nội dung mới.', 'Thay thế');
    }

    function openFile() {
      U.pickFile('.json,.txt,.md,.tex,.js,application/json,text/plain').then(function (files) {
        if (!files.length) return;
        var f = files[0];
        return confirmReplace().then(function (ok) {
          if (!ok) return;
          return U.readFile(f).then(function (text) {
            applyParsed(P.parseAny(text, f.name), f.name);
          });
        });
      }).catch(function (e) { U.toast('Lỗi đọc file: ' + e.message, 'error'); });
    }

    function latexDialog() {
      var body = document.createElement('div');
      body.innerHTML = '<p class="muted">Dán toàn bộ file <code>.tex</code> (hoặc phần <code>\\begin{enumerate}…\\end{enumerate}</code>). ' +
        'Trang web sẽ tự nhận câu hỏi (<code>\\item</code>), lựa chọn A–D (danh sách lồng nhau), công thức, bảng và bảng đáp án.</p>' +
        '<textarea class="editor editor--modal" id="latex-src" spellcheck="false" placeholder="\\begin{enumerate}\n\\item The function $f$ ...\n  \\begin{enumerate}[label=\\Alph*.]\n    \\item $2$\n    ...\n  \\end{enumerate}\n\\end{enumerate}"></textarea>' +
        '<div class="latex-row"><button class="btn btn--ghost btn--sm" type="button" id="latex-file">' + U.icon('upload') + 'Chọn file .tex</button><span class="muted" id="latex-fname"></span></div>';
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
        title: 'Nhập đề từ LaTeX',
        wide: true,
        body: body,
        actions: [
          { label: 'Hủy', value: null, kind: 'ghost' },
          { label: 'Chuyển đổi', value: 'go', kind: 'primary', onClick: function (box) { box._tex = box.querySelector('#latex-src').value; } }
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
          applyParsed(res, 'LaTeX (' + conv.questionCount + ' câu)');
        });
      });
    }

    function syntaxHelp() {
      U.modal({
        title: 'Cú pháp soạn đề',
        wide: true,
        body: global.Views.guideSyntaxHtml(),
        actions: [{ label: 'Đóng', value: true, kind: 'primary' }]
      });
    }

    /* ---------------- Sự kiện ---------------- */
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
      state.time = el.time.value;
      state.description = el.desc.value;
      markDirty();
      schedulePreview();
    }

    function onClick(e) {
      var ins = e.target.closest('[data-ins]');
      if (ins) { doInsert(ins.getAttribute('data-ins')); return; }
      var tab = e.target.closest('[data-tab]');
      if (tab) { switchTab(tab.getAttribute('data-tab')); return; }
      var gl = e.target.closest('[data-goto-line]');
      if (gl) { gotoLine(+gl.getAttribute('data-goto-line')); return; }
      var card = e.target.closest('.pv-q');
      if (card && !e.target.closest('summary, a, button')) { gotoLine(+card.getAttribute('data-line')); return; }
      if (!e.target.closest('.dropdown')) el.exportMenu.hidden = true;
      var b = e.target.closest('[data-act]');
      if (!b) return;
      switch (b.getAttribute('data-act')) {
        case 'save': save(); break;
        case 'open': openFile(); break;
        case 'latex': latexDialog(); break;
        case 'syntax': syntaxHelp(); break;
        case 'image':
          U.pickFile('image/*', true).then(function (files) {
            files.reduce(function (p, f) { return p.then(function () { return addImageFile(f); }); }, Promise.resolve());
          });
          break;
        case 'export-menu': el.exportMenu.hidden = !el.exportMenu.hidden; break;
        case 'export-json': el.exportMenu.hidden = true; exportAs('json'); break;
        case 'export-js': el.exportMenu.hidden = true; exportAs('js'); break;
        case 'export-txt': el.exportMenu.hidden = true; exportAs('txt'); break;
        case 'new':
          U.confirm('Bắt đầu đề mới?', 'Bản nháp hiện tại sẽ bị xóa.', 'Bắt đầu mới', { danger: true }).then(function (ok) {
            if (!ok) return;
            U.lsDel(DRAFT_KEY);
            state.title = ''; state.description = ''; state.time = ''; state.body = STARTER; state.assets = {}; state.importNotes = [];
            el.title.value = ''; el.desc.value = ''; el.time.value = ''; el.src.value = STARTER;
            var note = root.querySelector('.builder-note'); if (note) note.remove();
            renderPreview();
          });
          break;
      }
    }

    function onPaste(e) {
      var items = (e.clipboardData && e.clipboardData.items) || [];
      for (var i = 0; i < items.length; i++) {
        if (items[i].kind === 'file' && /^image\//.test(items[i].type)) {
          var f = items[i].getAsFile();
          if (f) { e.preventDefault(); addImageFile(f); return; }
        }
      }
    }

    function onKeyDown(e) {
      // Tab trong trình soạn -> chèn 2 dấu cách
      if (e.key === 'Tab' && !e.shiftKey && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        insertText('  ');
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') { e.preventDefault(); save(); }
    }

    function onDocKey(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's' && e.target !== el.src) { e.preventDefault(); save(); }
    }

    function onBeforeUnload(e) {
      if (state.dirty && editingId) { e.preventDefault(); e.returnValue = ''; }
    }

    function onDrop(e) {
      var files = e.dataTransfer && e.dataTransfer.files;
      if (!files || !files.length) return;
      e.preventDefault();
      var f = files[0];
      if (/^image\//.test(f.type)) { addImageFile(f); return; }
      confirmReplace().then(function (ok) {
        if (!ok) return;
        U.readFile(f).then(function (text) {
          applyParsed(P.parseAny(text, f.name), f.name);
        });
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
    [el.title, el.author, el.time, el.desc].forEach(function (i) { i.addEventListener('input', onMetaInput); });
    document.addEventListener('keydown', onDocKey);
    window.addEventListener('beforeunload', onBeforeUnload);

    renderPreview();
    if (draftNote || state.dirty) saveDraft();

    return function cleanup() {
      root.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onDocKey);
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  }

  global.Views = global.Views || {};
  global.Views.builder = BuilderView;
})(window);
