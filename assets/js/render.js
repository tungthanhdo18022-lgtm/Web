/*
 * Renders question content: math (KaTeX) + simple Markdown + sanitized HTML.
 *
 * Supported syntax:
 *   $...$  or \(...\)       inline math
 *   $$...$$ or \[...\]      display math (centered, on its own line)
 *   \$                      a literal dollar sign (e.g. \$165)
 *   **bold**, *italic*, __underline__
 *   ![alt](image-url)   or ![alt|300](asset:img-id)  (300 = width in px)
 *   | Markdown | tables |
 *   Plain HTML/SVG (dangerous markup is removed)
 */
(function (global) {
  'use strict';

  var U = global.U;
  // Math placeholders (Unicode private-use characters)
  var M_OPEN = '\uE000', M_CLOSE = '\uE001';
  var M_RE = /\uE000(\d+)\uE001/g;
  // Placeholders protecting generated HTML tags from the emphasis rules
  var T_RE = /\uE002(\d+)\uE003/g;

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

  /** Pull math out of the text and replace it with placeholders. */
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
        // "$165 ... $95": a $ before a digit is currency when the closing $ follows whitespace
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

  /** Turn a loose "<" (e.g. x<y outside math) into &lt; while keeping allowed HTML tags. */
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
    // HTML tags (generated images and the author's own tags) are swapped for placeholders while the
    // emphasis rules run, so "**", "__" and "*" inside src/alt/href attributes are never rewritten.
    var tags = [];
    function keep(html) { tags.push(html); return '\uE002' + (tags.length - 1) + '\uE003'; }
    // Images: ![alt|width](src)
    s = s.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g, function (_, alt, src, title) {
      var width = '';
      var mw = /^(.*?)\|\s*(\d{2,4})\s*$/.exec(alt);
      if (mw) { alt = mw[1]; width = mw[2]; }
      var url = resolveSrc(src, opts.assets);
      if (!url) return keep('<span class="img-missing">[Missing image: ' + U.esc(src) + ']</span>');
      return keep('<img class="q-img" src="' + U.esc(url) + '" alt="' + U.esc(alt) + '"' +
        (title ? ' title="' + U.esc(title) + '"' : '') +
        (width ? ' style="width:' + width + 'px"' : '') + ' loading="lazy">');
    });
    s = s.replace(/<\/?[a-zA-Z](?:"[^"]*"|'[^']*'|[^'">])*>/g, keep);
    s = s.replace(/\*\*(?=\S)([\s\S]*?\S)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/__(?=\S)([\s\S]*?\S)__/g, '<u>$1</u>');
    s = s.replace(/(^|[^*\w])\*(?=\S)([^*\n]*?\S)\*(?!\*)/g, '$1<em>$2</em>');
    return s.replace(T_RE, function (m, i) { return tags[+i] != null ? tags[+i] : ''; });
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
      // A paragraph holding only display math or only an image is not wrapped in <p>
      if (/^\uE000\d+\uE001$/.test(joined)) { out.push('<div class="q-display">' + joined + '</div>'); return; }
      if (/^!\[[^\]]*\]\([^)]+\)$/.test(joined)) { out.push('<div class="q-figure">' + inlineMd(joined, opts) + '</div>'); return; }
      // Roman-numeral statements ("I. ...", "II. ...") are indented like on the SAT
      var stmt = /^(?:I{1,3}|IV|VI{0,3})\.\s/.test(joined);
      // "Note: Figure not drawn to scale." sits centered under the figure
      var note = /^[*_]?Note:\s+Figures?\s+(?:are\s+)?not\s+drawn\s+to\s+scale\.?[*_]?$/i.test(joined);
      out.push((note ? '<p class="q-note">' : stmt ? '<p class="q-stmt">' : '<p>') + inlineMd(joined, opts).replace(/ {2,}\n/g, '<br>').replace(/\\\n/g, '<br>')
        // Numbered steps ("1. ...", "2) ...") and bullets on their own lines keep their line breaks
        .replace(/\n(?=[ \t]*(?:\d{1,3}[.)]|[•‣◦])[ \t])/g, '<br>\n') + '</p>');
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

  /* ---------------- HTML sanitizer ---------------- */
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
    return s; // relative path or #fragment
  }

  var URL_ATTRS = { href: 1, src: 1, 'xlink:href': 1, action: 1, background: 1, poster: 1, formaction: 1 };
  var BAD_ATTRS = { srcdoc: 1, srcset: 1, ping: 1, name: 1, is: 1 };
  var BAD_STYLE_RE = /\\|url\s*\(|image-set\s*\(|expression\s*\(|javascript:|@import|behavior\s*:|-moz-binding/i;
  var FRAG_URL_RE = /url\(\s*(['"]?)#([^'")\s]+)\1\s*\)/gi;

  /**
   * Ids from user content are namespaced ("u-" prefix) so they cannot clobber DOM/global names
   * (e.g. id="katex" or id="App"); in-content references such as url(#arrow) are rewritten to match.
   */
  function nsId(id) {
    return 'u-' + String(id).trim().replace(/[^A-Za-z0-9_:.-]/g, '-');
  }

  function sanitizeAttrs(el, tag) {
    var attrs = Array.prototype.slice.call(el.attributes);
    for (var a = 0; a < attrs.length; a++) {
      var attrName = attrs[a].name;
      var name = attrName.toLowerCase();
      var val = attrs[a].value;
      // Event handlers, and "name" (DOM clobbering, e.g. <img name="getElementById">)
      if (name.indexOf('on') === 0 || BAD_ATTRS[name]) { el.removeAttribute(attrName); continue; }
      if (name === 'id') {
        if (val.trim()) el.setAttribute(attrName, nsId(val));
        else el.removeAttribute(attrName);
        continue;
      }
      if (URL_ATTRS[name]) {
        var ok = safeUrl(val, tag === 'img');
        if (ok === null || (tag !== 'a' && tag !== 'img') || name === 'action' || name === 'formaction') { el.removeAttribute(attrName); continue; }
        if (tag === 'a' && /^#[A-Za-z][\w:.-]*$/.test(val.trim())) el.setAttribute(attrName, '#' + nsId(val.trim().slice(1)));
        continue;
      }
      if (name === 'style') {
        if (BAD_STYLE_RE.test(val)) el.removeAttribute(attrName);
        continue;
      }
      if (/url\s*\(/i.test(val)) {
        // SVG paint/marker/clip references: only local fragments are allowed
        var local = val.replace(FRAG_URL_RE, function (m, q, id) { return 'url(#' + nsId(id) + ')'; });
        if (/url\s*\((?!#u-)/i.test(local)) el.removeAttribute(attrName);
        else el.setAttribute(attrName, local);
      }
    }
  }

  function sanitizeNode(root) {
    var walker = [root];
    // Elements already sanitized: a parent is walked again after an unknown tag is unwrapped, and the
    // attribute rules are not idempotent (ids would get a second "u-" prefix and break url(#id) references).
    var seen = new Set();
    while (walker.length) {
      var node = walker.pop();
      var kids = Array.prototype.slice.call(node.childNodes);
      for (var k = 0; k < kids.length; k++) {
        var child = kids[k];
        if (child.nodeType === 8) { child.remove(); continue; } // comment
        if (child.nodeType !== 1 || seen.has(child)) continue;
        var tag = (child.localName || '').toLowerCase();
        if (DROP[tag]) { child.remove(); continue; }
        if (!ALLOWED[tag]) {
          // Keep the content, drop the tag
          while (child.firstChild) node.insertBefore(child.firstChild, child);
          child.remove();
          // re-process the nodes that were just moved
          walker.push(node);
          break;
        }
        sanitizeAttrs(child, tag);
        if (tag === 'a') { child.setAttribute('target', '_blank'); child.setAttribute('rel', 'noopener noreferrer'); }
        seen.add(child);
        walker.push(child);
      }
    }
  }

  /**
   * Put the original TeX back into attribute values (e.g. alt="$x^2$").
   * This must run BEFORE sanitizeNode so the restored values are validated too
   * (otherwise href="$javascript:...$" would slip past the URL check).
   */
  function restoreAttrMath(root, store) {
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

  /** Replace math placeholders in text nodes with rendered KaTeX (runs after sanitizing; text nodes only). */
  /** Typewriter apostrophes in words ("buffalo's") become typographic ones (math is still a placeholder here). */
  function smartApostrophes(root) {
    var tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var n;
    while ((n = tw.nextNode())) {
      if (n.nodeValue.indexOf("'") === -1) continue;
      var p = n.parentNode;
      if (p && p.closest && p.closest('code, pre, svg, script, style')) continue;
      n.nodeValue = n.nodeValue.replace(/([A-Za-z])'(?=[A-Za-z])/g, '$1\u2019');
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
        last = offset + m.length;
        if (inSvg) {
          frag.appendChild(document.createTextNode(item ? item.tex : ''));
        } else {
          var tex = item ? item.tex : '';
          var inline = item && !item.display && /\S/.test(tex);
          // A short inline formula ("$x^2 - 17x + c = 0$") is one unbreakable group, so a line never
          // ends at its "=" or "+"; longer ones may still wrap at their operators
          if (inline && tex.replace(/\s+/g, '').length <= 30) tex = '{' + tex + '}';
          // Punctuation right after inline math ("$x = 0$,") is set inside the formula so a line can
          // never start with it (\mathclose adds no space, even after \right)
          var punct = inline ? /^[,.;?!]+/.exec(val.slice(last)) : null;
          if (punct) { tex += '\\mathclose{' + punct[0] + '}'; last += punct[0].length; }
          // A hyphenated compound ("$128$-gram") stays on one line with its number
          var compound = inline && !punct && tex.length <= 32 ? /^-[A-Za-z]+/.exec(val.slice(last)) : null;
          var tpl = document.createElement('template');
          tpl.innerHTML = item ? renderTex(tex, item.display) : '';
          if (compound) {
            var nb = document.createElement('span');
            nb.className = 'm-nb';
            nb.appendChild(tpl.content);
            nb.appendChild(document.createTextNode(compound[0]));
            frag.appendChild(nb);
            last += compound[0].length;
          } else {
            frag.appendChild(tpl.content);
          }
        }
        return m;
      });
      if (last < val.length) frag.appendChild(document.createTextNode(val.slice(last)));
      textNode.parentNode.replaceChild(frag, textNode);
    });
  }

  /**
   * Render content to HTML.
   * opts.inline = true: no paragraphs (used for answer choices).
   * opts.assets: { id: dataURL } for asset:id images
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
    tpl.innerHTML = html; // template content is inert: nothing loads or runs before sanitizing
    restoreAttrMath(tpl.content, store);
    sanitizeNode(tpl.content);
    smartApostrophes(tpl.content);
    injectMath(tpl.content, store);
    var result = tpl.innerHTML;
    if (cacheable) {
      if (cache.size > CACHE_MAX) cache.clear();
      cache.set(key, result);
    }
    return result;
  }

  /** Preview a student-produced response (e.g. 441/677 -> a fraction). */
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
