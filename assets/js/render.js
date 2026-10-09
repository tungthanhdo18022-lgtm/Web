/*
 * Hiển thị nội dung câu hỏi: công thức toán (KaTeX) + Markdown đơn giản + HTML an toàn.
 *
 * Cú pháp hỗ trợ:
 *   $...$  hoặc \(...\)     công thức trong dòng
 *   $$...$$ hoặc \[...\]    công thức riêng một dòng (căn giữa)
 *   \$                      ký hiệu đô-la thường (ví dụ: \$165)
 *   **đậm**, *nghiêng*, __gạch chân__
 *   ![mô tả](đường-dẫn-ảnh)   hoặc ![mô tả|300](asset:img-id)  (300 = chiều rộng px)
 *   | bảng | dạng | Markdown |
 *   HTML/SVG thông thường (được lọc bỏ mã nguy hiểm)
 */
(function (global) {
  'use strict';

  var U = global.U;
  var M_OPEN = '', M_CLOSE = '';
  var M_RE = /(\d+)/g;

  var cache = new Map();
  var CACHE_MAX = 600;

  function renderTex(tex, display) {
    if (!global.katex) {
      return '<span class="math-fallback">' + U.esc(display ? '$$' + tex + '$$' : '$' + tex + '$') + '</span>';
    }
    try {
      return global.katex.renderToString(tex, {
        displayMode: !!display,
        throwOnError: false,
        strict: 'ignore',
        trust: false,
        maxExpand: 500
      });
    } catch (e) {
      return '<span class="math-error" title="' + U.esc(e && e.message) + '">' + U.esc(tex) + '</span>';
    }
  }

  /** Tách công thức ra khỏi văn bản, thay bằng ký hiệu giữ chỗ. */
  function extractMath(src, store) {
    var out = '';
    var i = 0, n = src.length;
    function push(tex, display) {
      store.push({ tex: tex.trim(), display: display });
      out += M_OPEN + (store.length - 1) + M_CLOSE;
    }
    while (i < n) {
      var ch = src[i];
      if (ch === '\\' && src[i + 1] === '$') { out += '$'; i += 2; continue; }
      if (ch === '\\' && (src[i + 1] === '[' || src[i + 1] === '(')) {
        var closeTok = src[i + 1] === '[' ? '\\]' : '\\)';
        var endB = src.indexOf(closeTok, i + 2);
        if (endB !== -1) { push(src.slice(i + 2, endB), src[i + 1] === '['); i = endB + 2; continue; }
      }
      if (ch === '$' && src[i + 1] === '$') {
        var endD = src.indexOf('$$', i + 2);
        if (endD !== -1) { push(src.slice(i + 2, endD), true); i = endD + 2; continue; }
      }
      if (ch === '$') {
        var j = i + 1, found = -1;
        while (j < n) {
          var c = src[j];
          if (c === '\\') { j += 2; continue; }
          if (c === '$') { found = j; break; }
          if (c === '\n' && src[j + 1] === '\n') break;
          j++;
        }
        // "$165 ... $95": dấu $ đứng trước chữ số là tiền tệ nếu dấu $ đóng có khoảng trắng phía trước
        var currency = found > i + 1 && /[0-9]/.test(src[i + 1]) &&
          (/\s/.test(src[found - 1]) || /[0-9]/.test(src[found + 1] || ''));
        if (found > i + 1 && !currency) { push(src.slice(i + 1, found), false); i = found + 1; continue; }
      }
      out += ch; i++;
    }
    return out;
  }

  var INLINE_TAGS = 'b|i|u|em|strong|sub|sup|br|span|small|mark|s|del|ins|code|img|a|font|big|tt';
  var BLOCK_TAGS = 'svg|table|div|figure|center|p|ul|ol|blockquote|pre|h[1-6]|hr';
  var ALLOWED_TAG_RE = new RegExp('<(?!\\/?(?:' + INLINE_TAGS + '|' + BLOCK_TAGS + '|thead|tbody|tfoot|tr|td|th|caption|col|colgroup|li|figcaption)(?=[\\s/>]))', 'gi');

  /** Chuyển "<" thường (vd: x<y viết ngoài công thức) thành &lt; nhưng giữ lại thẻ HTML hợp lệ. */
  function escapeLooseLt(s) {
    return s.replace(ALLOWED_TAG_RE, '&lt;');
  }

  function resolveSrc(src, assets) {
    src = (src || '').trim();
    var m = /^asset:(.+)$/.exec(src);
    if (m) {
      var data = assets && assets[m[1]];
      return data || '';
    }
    return src;
  }

  function inlineMd(s, opts) {
    s = escapeLooseLt(s);
    // Ảnh: ![alt|width](src)
    s = s.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g, function (_, alt, src, title) {
      var width = '';
      var mw = /^(.*?)\|\s*(\d{2,4})\s*$/.exec(alt);
      if (mw) { alt = mw[1]; width = mw[2]; }
      var url = resolveSrc(src, opts.assets);
      if (!url) return '<span class="img-missing">[Thiếu ảnh: ' + U.esc(src) + ']</span>';
      return '<img class="q-img" src="' + U.esc(url) + '" alt="' + U.esc(alt) + '"' +
        (title ? ' title="' + U.esc(title) + '"' : '') +
        (width ? ' style="width:' + width + 'px"' : '') + ' loading="lazy">';
    });
    s = s.replace(/\*\*(?=\S)([\s\S]*?\S)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/__(?=\S)([\s\S]*?\S)__/g, '<u>$1</u>');
    s = s.replace(/(^|[^*\w])\*(?=\S)([^*\n]*?\S)\*(?!\*)/g, '$1<em>$2</em>');
    return s;
  }

  function splitRow(line) {
    var t = line.trim();
    if (t[0] === '|') t = t.slice(1);
    if (t[t.length - 1] === '|' && t[t.length - 2] !== '\\') t = t.slice(0, -1);
    var cells = [], cur = '';
    for (var i = 0; i < t.length; i++) {
      if (t[i] === '\\' && t[i + 1] === '|') { cur += '|'; i++; continue; }
      if (t[i] === '|') { cells.push(cur.trim()); cur = ''; continue; }
      cur += t[i];
    }
    cells.push(cur.trim());
    return cells;
  }

  function isSepRow(line) {
    return /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/.test(line);
  }

  function tableHtml(lines, opts) {
    var rows = lines.slice();
    var header = null, aligns = [];
    if (rows.length >= 2 && isSepRow(rows[1])) {
      header = splitRow(rows[0]);
      aligns = splitRow(rows[1]).map(function (c) {
        var l = c[0] === ':', r = c[c.length - 1] === ':';
        return l && r ? 'center' : r ? 'right' : l ? 'left' : '';
      });
      rows = rows.slice(2);
    }
    function cell(tag, content, idx) {
      var a = aligns[idx];
      return '<' + tag + (a ? ' style="text-align:' + a + '"' : '') + '>' + inlineMd(content, opts) + '</' + tag + '>';
    }
    var html = '<div class="q-table-wrap"><table class="q-table">';
    if (header) {
      html += '<thead><tr>' + header.map(function (c, i) { return cell('th', c, i); }).join('') + '</tr></thead>';
    }
    html += '<tbody>' + rows.map(function (r) {
      return '<tr>' + splitRow(r).map(function (c, i) { return cell('td', c, i); }).join('') + '</tr>';
    }).join('') + '</tbody></table></div>';
    return html;
  }

  var BLOCK_START_RE = new RegExp('^\\s*<(' + BLOCK_TAGS + ')(?=[\\s>])', 'i');

  function blockMd(text, opts) {
    var lines = text.split('\n');
    var out = [];
    var para = [];
    function flushPara() {
      if (!para.length) return;
      var joined = para.join('\n').trim();
      para = [];
      if (!joined) return;
      // Đoạn chỉ chứa một công thức display hoặc một ảnh -> không bọc <p>
      if (/^\d+$/.test(joined)) { out.push('<div class="q-display">' + joined + '</div>'); return; }
      if (/^!\[[^\]]*\]\([^)]+\)$/.test(joined)) { out.push('<div class="q-figure">' + inlineMd(joined, opts) + '</div>'); return; }
      out.push('<p>' + inlineMd(joined, opts).replace(/ {2,}\n/g, '<br>').replace(/\\\n/g, '<br>') + '</p>');
    }
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      if (!line.trim()) { flushPara(); continue; }
      if (/^\s*\|/.test(line)) {
        flushPara();
        var tbl = [];
        while (i < lines.length && /^\s*\|/.test(lines[i])) { tbl.push(lines[i]); i++; }
        i--;
        out.push(tableHtml(tbl, opts));
        continue;
      }
      var bm = BLOCK_START_RE.exec(line);
      if (bm) {
        flushPara();
        var tag = bm[1].toLowerCase();
        var block = [];
        var depth = 0;
        var openRe = new RegExp('<' + tag + '(?=[\\s>/])', 'gi');
        var closeRe = new RegExp('</' + tag + '\\s*>', 'gi');
        var selfClose = tag === 'hr';
        while (i < lines.length) {
          var l = lines[i];
          block.push(l);
          depth += (l.match(openRe) || []).length;
          depth -= (l.match(closeRe) || []).length;
          if (selfClose || depth <= 0) break;
          i++;
        }
        out.push(block.join('\n'));
        continue;
      }
      para.push(line);
    }
    flushPara();
    return out.join('\n');
  }

  /* ---------------- Lọc HTML (sanitize) ---------------- */
  var ALLOWED = {};
  ('p br b i u em strong sub sup span div small mark s del ins code pre img figure figcaption table thead tbody tfoot tr td th caption colgroup col ul ol li center hr blockquote font big tt h1 h2 h3 h4 h5 h6 a ' +
    'svg g line polyline polygon path rect circle ellipse text tspan defs marker title desc lineargradient radialgradient stop pattern clippath mask textpath').split(' ').forEach(function (t) { ALLOWED[t] = true; });
  var DROP = {};
  'script style iframe object embed link meta form input textarea button select option noscript template foreignobject audio video source track base frame frameset applet canvas math'.split(' ').forEach(function (t) { DROP[t] = true; });

  function safeUrl(v, isImg) {
    var s = String(v || '').trim();
    var compact = s.replace(/[\s\u0000-\u001f]/g, '').toLowerCase();
    if (/^data:/.test(compact)) return isImg && /^data:image\/(png|jpe?g|gif|webp|svg\+xml|bmp)/.test(compact) ? s : null;
    if (/^[a-z][a-z0-9+.-]*:/.test(compact)) return /^(https?|mailto):/.test(compact) ? s : null;
    return s; // đường dẫn tương đối, #id
  }

  function sanitizeNode(root) {
    var walker = [root];
    while (walker.length) {
      var node = walker.pop();
      var kids = Array.prototype.slice.call(node.childNodes);
      for (var k = 0; k < kids.length; k++) {
        var child = kids[k];
        if (child.nodeType === 8) { child.remove(); continue; } // comment
        if (child.nodeType !== 1) continue;
        var tag = (child.localName || '').toLowerCase();
        if (DROP[tag]) { child.remove(); continue; }
        if (!ALLOWED[tag]) {
          // Giữ nội dung, bỏ thẻ
          while (child.firstChild) node.insertBefore(child.firstChild, child);
          child.remove();
          // xử lý lại các node vừa chèn
          walker.push(node);
          break;
        }
        var attrs = Array.prototype.slice.call(child.attributes);
        for (var a = 0; a < attrs.length; a++) {
          var name = attrs[a].name.toLowerCase();
          var val = attrs[a].value;
          if (name.indexOf('on') === 0 || name === 'srcdoc' || name === 'formaction' || name === 'srcset') { child.removeAttribute(attrs[a].name); continue; }
          if (name === 'href' || name === 'src' || name === 'xlink:href' || name === 'action' || name === 'background' || name === 'poster') {
            var ok = safeUrl(val, tag === 'img');
            if (ok === null || (tag !== 'a' && tag !== 'img')) { child.removeAttribute(attrs[a].name); continue; }
          }
          if (name === 'style' && /url\s*\(|expression\s*\(|javascript:|@import|behavior\s*:/i.test(val)) { child.removeAttribute(attrs[a].name); continue; }
        }
        if (tag === 'a') { child.setAttribute('target', '_blank'); child.setAttribute('rel', 'noopener noreferrer'); }
        walker.push(child);
      }
    }
  }

  function injectMath(root, store) {
    var texts = [];
    var tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var n;
    while ((n = tw.nextNode())) { if (n.nodeValue.indexOf(M_OPEN) !== -1) texts.push(n); }
    texts.forEach(function (textNode) {
      var val = textNode.nodeValue;
      var parentEl = textNode.parentNode;
      var inSvg = !!(parentEl && parentEl.closest && parentEl.closest('svg'));
      var frag = document.createDocumentFragment();
      var last = 0;
      val.replace(M_RE, function (m, idx, offset) {
        if (offset > last) frag.appendChild(document.createTextNode(val.slice(last, offset)));
        var item = store[+idx];
        if (inSvg) {
          frag.appendChild(document.createTextNode(item ? item.tex : ''));
        } else {
          var tpl = document.createElement('template');
          tpl.innerHTML = item ? renderTex(item.tex, item.display) : '';
          frag.appendChild(tpl.content);
        }
        last = offset + m.length;
        return m;
      });
      if (last < val.length) frag.appendChild(document.createTextNode(val.slice(last)));
      textNode.parentNode.replaceChild(frag, textNode);
    });
    // Placeholder bên trong thuộc tính (vd alt="..."): thay bằng TeX gốc
    var all = root.querySelectorAll ? root.querySelectorAll('*') : [];
    for (var i = 0; i < all.length; i++) {
      var at = all[i].attributes;
      for (var j = 0; j < at.length; j++) {
        if (at[j].value.indexOf(M_OPEN) !== -1) {
          at[j].value = at[j].value.replace(M_RE, function (m, idx) { return store[+idx] ? store[+idx].tex : ''; });
        }
      }
    }
  }

  /**
   * Hiển thị nội dung thành HTML.
   * opts.inline = true: không tạo đoạn văn (dùng cho đáp án lựa chọn).
   * opts.assets: { id: dataURL } cho ảnh asset:id
   */
  function render(text, opts) {
    opts = opts || {};
    text = String(text == null ? '' : text).replace(/\r\n?/g, '\n');
    var cacheable = !opts.assets || !!opts.assetsKey;
    var key = (opts.inline ? 'i:' : 'b:') + (opts.assetsKey || '') + '\u0001' + text;
    if (cacheable && cache.has(key)) return cache.get(key);
    var store = [];
    var withPh = extractMath(text, store);
    var html = opts.inline ? inlineMd(withPh.trim(), opts).replace(/\n/g, ' ') : blockMd(withPh, opts);
    var tpl = document.createElement('template');
    tpl.innerHTML = html;
    sanitizeNode(tpl.content);
    injectMath(tpl.content, store);
    var result = tpl.innerHTML;
    if (cacheable) {
      if (cache.size > CACHE_MAX) cache.clear();
      cache.set(key, result);
    }
    return result;
  }

  /** Hiển thị đáp án số của câu điền (vd 441/677 -> phân số). */
  function renderAnswerPreview(value) {
    var v = String(value || '').trim();
    if (!v) return '';
    var m = /^(-?)([0-9.]*)\/([0-9.]*)$/.exec(v);
    var tex;
    if (m) tex = m[1] + '\\dfrac{' + (m[2] || '\\phantom{0}') + '}{' + (m[3] || '\\phantom{0}') + '}';
    else tex = v;
    return renderTex(tex, false);
  }

  global.R = {
    render: render,
    tex: renderTex,
    answerPreview: renderAnswerPreview,
    sanitizeHtml: function (html) {
      var tpl = document.createElement('template');
      tpl.innerHTML = html;
      sanitizeNode(tpl.content);
      return tpl.innerHTML;
    },
    clearCache: function () { cache.clear(); }
  };
})(window);
