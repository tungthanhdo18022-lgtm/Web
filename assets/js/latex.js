/*
 * Converts a test written in LaTeX (.tex) to the site's text format.
 * Supported structures:
 *   \begin{enumerate} \item ... (questions) + a nested list (choices A/B/C/D)
 *   hand-typed choices at the end of an item ("A. 2\\ B. 3\\ C. 4\\ D. 5")
 *   \begin{questions} \question ... \begin{choices} \choice / \CorrectChoice  (exam class)
 *   \begin{tasks} \task ...
 *   $...$, \[...\], \(...\), equation/align/gather
 *   \textbf, \textit, \emph, \underline, tabular (-> table), an answer key ("Answer Key" table or list)
 * TikZ drawings and \includegraphics cannot be converted: a note is left where an image should go.
 */
(function (global) {
  'use strict';

  var LIST_ENVS = { enumerate: 1, itemize: 1, questions: 1, choices: 1, oneparchoices: 1, checkboxes: 1, oneparcheckboxes: 1, tasks: 1, parts: 1, description: 1 };
  var ITEM_CMDS = { item: 1, question: 1, choice: 1, CorrectChoice: 1, correctchoice: 1, task: 1, part: 1 };
  var MATH_ENVS = { equation: 'plain', 'equation*': 'plain', align: 'aligned', 'align*': 'aligned', alignat: 'aligned', 'alignat*': 'aligned',
    gather: 'gathered', 'gather*': 'gathered', multline: 'gathered', 'multline*': 'gathered', eqnarray: 'aligned', 'eqnarray*': 'aligned',
    displaymath: 'plain', math: 'inline', flalign: 'aligned', 'flalign*': 'aligned' };

  var LETTERS = 'ABCDEFGH';
  var PH_MATH_O = '\u0002', PH_MATH_C = '\u0003';
  var PH_BLK_O = '\u0005', PH_BLK_C = '\u0006';

  function stripComments(s) {
    return s.split('\n').map(function (line) {
      var out = '';
      for (var i = 0; i < line.length; i++) {
        if (line[i] === '\\') { out += line[i] + (line[i + 1] || ''); i++; continue; }
        if (line[i] === '%') break;
        out += line[i];
      }
      return out;
    }).join('\n');
  }

  function skipWs(s, i, allowNewline) {
    while (i < s.length && (s[i] === ' ' || s[i] === '\t' || (allowNewline !== false && s[i] === '\n'))) i++;
    return i;
  }

  function readGroup(s, i) {
    var j = skipWs(s, i);
    if (s[j] !== '{') return null;
    var depth = 0;
    for (var k = j; k < s.length; k++) {
      var c = s[k];
      if (c === '\\') { k++; continue; }
      if (c === '{') depth++;
      else if (c === '}') { depth--; if (depth === 0) return { content: s.slice(j + 1, k), end: k + 1 }; }
    }
    return { content: s.slice(j + 1), end: s.length };
  }

  function readOpt(s, i, open, close) {
    open = open || '['; close = close || ']';
    var j = skipWs(s, i, false);
    if (s[j] !== open) return null;
    var depth = 0;
    for (var k = j; k < s.length; k++) {
      var c = s[k];
      if (c === '\\') { k++; continue; }
      if (c === '{') depth++;
      else if (c === '}') depth--;
      else if (c === close && depth === 0) return { content: s.slice(j + 1, k), end: k + 1 };
    }
    return null;
  }

  function cmdArg(s, name) {
    var re = new RegExp('\\\\' + name + '\\s*(?:\\[[^\\]]*\\])?\\s*\\{');
    var m = re.exec(s);
    if (!m) return '';
    var g = readGroup(s, m.index + m[0].length - 1);
    return g ? g.content : '';
  }

  /** Find the matching \end{name} (nesting aware), starting at position from */
  function findEnvEnd(s, name, from) {
    var esc = name.replace(/[*]/g, '\\*');
    var re = new RegExp('\\\\(begin|end)\\s*\\{' + esc + '\\}', 'g');
    re.lastIndex = from;
    var depth = 1, m;
    while ((m = re.exec(s))) {
      if (m[1] === 'begin') depth++;
      else { depth--; if (depth === 0) return { start: m.index, end: m.index + m[0].length }; }
    }
    return null;
  }

  /* ---------------- Simple macros (\newcommand without arguments) ---------------- */
  var DEF_RE = /\\(?:re)?newcommand\*?\s*(?:\{\s*\\([a-zA-Z]+)\s*\}|\\([a-zA-Z]+))\s*(?:\[(\d)\])?|\\def\s*\\([a-zA-Z]+)\s*(?=\{)/g;

  /** Collect macro definitions; returns the string with the definitions removed. */
  function collectDefs(s, defs, warnings) {
    var out = '', last = 0, m;
    DEF_RE.lastIndex = 0;
    while ((m = DEF_RE.exec(s))) {
      var name = m[1] || m[2] || m[4];
      var g = readGroup(s, m.index + m[0].length);
      if (!g) continue;
      if (m[3] && +m[3] > 0) {
        warnings.push('Custom command \\' + name + ' takes arguments, which is not supported. Check every place it is used.');
      } else {
        defs.push({ name: name, body: g.content });
      }
      out += s.slice(last, m.index);
      last = g.end;
      DEF_RE.lastIndex = g.end;
    }
    return out + s.slice(last);
  }

  function applyDefs(s, defs) {
    for (var pass = 0; pass < 3; pass++) {
      defs.forEach(function (d) {
        s = s.replace(new RegExp('\\\\' + d.name + '(?![a-zA-Z])', 'g'), function () { return d.body; });
      });
    }
    return s;
  }

  /* ---------------- Protect math ---------------- */
  function cleanMath(tex) {
    return tex.replace(/\\label\s*\{[^}]*\}/g, '').replace(/\\(?:nonumber|notag)\b/g, '')
      .replace(/\\textdegree\b/g, '^\\circ').replace(/\\degree\b/g, '^\\circ')
      .replace(/\\(?:displaystyle)\s*$/, '').trim();
  }

  function protectMath(s, store) {
    var out = '';
    var i = 0;
    function push(tex, mode) {
      store.push({ tex: cleanMath(tex), mode: mode });
      out += PH_MATH_O + (store.length - 1) + PH_MATH_C;
    }
    while (i < s.length) {
      var c = s[i];
      if (c === '\\') {
        var nx = s[i + 1];
        if (nx === '$') { out += '\\$'; i += 2; continue; }
        if (nx === '[') { var e1 = s.indexOf('\\]', i + 2); if (e1 !== -1) { push(s.slice(i + 2, e1), 'display'); i = e1 + 2; continue; } }
        if (nx === '(') { var e2 = s.indexOf('\\)', i + 2); if (e2 !== -1) { push(s.slice(i + 2, e2), 'inline'); i = e2 + 2; continue; } }
        var bm = /^\\begin\s*\{([a-zA-Z]+\*?)\}/.exec(s.slice(i, i + 40));
        if (bm && MATH_ENVS[bm[1]]) {
          var env = bm[1];
          var start = i + bm[0].length;
          if (/^alignat/.test(env)) { var ga = readGroup(s, start); if (ga) start = ga.end; }
          var end = findEnvEnd(s, env, start);
          if (end) {
            var inner = s.slice(start, end.start);
            var kind = MATH_ENVS[env];
            if (kind === 'aligned') inner = '\\begin{aligned}' + inner.replace(/&\s*=\s*&/g, '&=') + '\\end{aligned}';
            else if (kind === 'gathered') inner = '\\begin{gathered}' + inner + '\\end{gathered}';
            push(inner, kind === 'inline' ? 'inline' : 'display');
            i = end.end;
            continue;
          }
        }
        out += c + (nx || ''); i += 2; continue;
      }
      if (c === '$') {
        if (s[i + 1] === '$') {
          var e3 = s.indexOf('$$', i + 2);
          if (e3 !== -1) { push(s.slice(i + 2, e3), 'display'); i = e3 + 2; continue; }
        }
        var j = i + 1;
        while (j < s.length) {
          if (s[j] === '\\') { j += 2; continue; }
          if (s[j] === '$') break;
          j++;
        }
        if (j < s.length) { push(s.slice(i + 1, j), 'inline'); i = j + 1; continue; }
      }
      out += c; i++;
    }
    return out;
  }

  /* ---------------- LaTeX text -> Markdown ---------------- */
  var DROP0 = 'noindent indent centering raggedright raggedleft medskip bigskip smallskip vfill hfill hfil vfil maketitle tableofcontents ' +
    'large Large LARGE huge Huge small footnotesize normalsize scriptsize tiny bfseries itshape normalfont rmfamily sffamily ttfamily upshape mdseries ' +
    'bf it rm sf tt sc em sl newpage clearpage pagebreak nopagebreak linebreak nolinebreak columnbreak relax protect displaystyle selectfont ' +
    'onehalfspacing doublespacing singlespacing break allowbreak';
  var DROP1 = 'hspace hspace* vspace vspace* label thispagestyle pagestyle phantom hphantom vphantom color pagenumbering bibliographystyle ' +
    'usepackage documentclass geometry hypersetup setstretch linespread title author date';
  var DROP2 = 'setlength addtolength setcounter addtocounter renewcommand';
  var DROP0_SET = {}, DROP1_SET = {}, DROP2_SET = {};
  DROP0.split(' ').forEach(function (w) { DROP0_SET[w] = 1; });
  DROP1.split(' ').forEach(function (w) { DROP1_SET[w] = 1; });
  DROP2.split(' ').forEach(function (w) { DROP2_SET[w] = 1; });

  var WRAP_ENVS = { center: 1, flushleft: 1, flushright: 1, figure: 1, 'figure*': 1, table: 1, quote: 1, quotation: 1, minipage: 1, adjustwidth: 1, multicols: 1, samepage: 1, small: 1, document: 1, wrapfigure: 1, varwidth: 1, mdframed: 1, tcolorbox: 1, framed: 1, spacing: 1 };

  function makeConverter(warnings) {
    var unknown = {};

    function conv(s) {
      var out = '';
      var i = 0;
      while (i < s.length) {
        var c = s[i];
        if (c === '\\') {
          var nx = s[i + 1];
          if (nx === undefined) { i++; continue; }
          if (!/[a-zA-Z]/.test(nx)) {
            i += 2;
            switch (nx) {
              case '\\': {
                var o = readOpt(s, i); if (o) i = o.end;
                if (s[i] === '*') i++;
                out += '\n'; break;
              }
              case '$': out += '\\$'; break;
              case '%': case '&': case '#': case '_': case '{': case '}': out += nx; break;
              case ',': case ' ': case ';': case ':': out += ' '; break;
              case '!': case '-': case '/': case '@': case '>': case '<': break;
              case '\n': out += ' '; break;
              default: out += nx;
            }
            continue;
          }
          var m = /^[a-zA-Z]+\*?/.exec(s.slice(i + 1, i + 40));
          var name = m[0];
          var base = name.replace(/\*$/, '');
          i += 1 + name.length;
          var g, o2;
          if (DROP0_SET[base]) {
            if (base === 'par') out += '\n\n';
            // Drop the command (and the space right after it)
            continue;
          }
          if (DROP1_SET[base] || DROP1_SET[name]) {
            o2 = readOpt(s, i); if (o2) i = o2.end;
            g = readGroup(s, i); if (g) i = g.end;
            continue;
          }
          if (DROP2_SET[base]) {
            g = readGroup(s, i); if (g) i = g.end;
            g = readGroup(s, i); if (g) i = g.end;
            continue;
          }
          switch (base) {
            case 'par': out += '\n\n'; continue;
            case 'newline': out += '\n'; continue;
            case 'quad': case 'qquad': case 'enspace': case 'enskip': case 'thinspace': out += ' '; continue;
            case 'ldots': case 'dots': case 'cdots': case 'textellipsis': out += '…'; eatBraces(); continue;
            case 'textdegree': case 'degree': out += '°'; eatBraces(); continue;
            case 'textendash': out += '–'; eatBraces(); continue;
            case 'textemdash': out += '—'; eatBraces(); continue;
            case 'textpercent': out += '%'; eatBraces(); continue;
            case 'LaTeX': out += 'LaTeX'; eatBraces(); continue;
            case 'TeX': out += 'TeX'; eatBraces(); continue;
            case 'textbackslash': out += '\\'; eatBraces(); continue;
            case 'item': out += '\n'; continue;
            case 'begin': case 'end': {
              g = readGroup(s, i);
              if (g) {
                i = g.end;
                var env = g.content.trim();
                if (base === 'begin') {
                  if (env === 'minipage' || env === 'varwidth') { o2 = readOpt(s, i); if (o2) i = o2.end; g = readGroup(s, i); if (g) i = g.end; }
                  else if (env === 'multicols' || env === 'wrapfigure') { g = readGroup(s, i); if (g) i = g.end; g = readGroup(s, i); if (env === 'wrapfigure' && g) i = g.end; }
                  else if (env === 'adjustwidth') { g = readGroup(s, i); if (g) i = g.end; g = readGroup(s, i); if (g) i = g.end; }
                  else { o2 = readOpt(s, i); if (o2) i = o2.end; }
                  if (!WRAP_ENVS[env] && !unknown['env:' + env]) { unknown['env:' + env] = 1; warnings.push('Environment \\begin{' + env + '} is not supported; only its content was kept.'); }
                }
                out += '\n';
              }
              continue;
            }
            case 'textbf': case 'mathbf': case 'textbf*':
              g = readGroup(s, i); if (g) { i = g.end; var b = conv(g.content).trim(); out += b ? '**' + b + '**' : ''; }
              continue;
            case 'textit': case 'emph': case 'textsl': case 'mathit':
              g = readGroup(s, i); if (g) { i = g.end; var it = conv(g.content).trim(); out += it ? '*' + it + '*' : ''; }
              continue;
            case 'underline': case 'uline': case 'ul':
              g = readGroup(s, i);
              if (g) {
                i = g.end;
                var u = conv(g.content).trim();
                out += u && !/^[_\s]*$/.test(u) ? '__' + u + '__' : '';
              }
              continue;
            case 'text': case 'textrm': case 'textup': case 'textnormal': case 'mbox': case 'textsf': case 'texttt': case 'textsc': case 'makebox': case 'fbox': case 'framebox': case 'hbox': case 'centerline': case 'makecell': case 'shortstack': case 'mathrm': case 'textmd':
              o2 = readOpt(s, i); if (o2) i = o2.end;
              g = readGroup(s, i); if (g) { i = g.end; out += conv(g.content).replace(/\n+/g, ' '); }
              continue;
            case 'caption':
              g = readGroup(s, i); if (g) { i = g.end; out += '\n\n*' + conv(g.content).trim() + '*\n\n'; }
              continue;
            case 'footnote':
              g = readGroup(s, i); if (g) { i = g.end; out += ' (' + conv(g.content).trim() + ')'; }
              continue;
            case 'href':
              g = readGroup(s, i); if (g) i = g.end;
              g = readGroup(s, i); if (g) { i = g.end; out += conv(g.content); }
              continue;
            case 'url':
              g = readGroup(s, i); if (g) { i = g.end; out += g.content; }
              continue;
            case 'textcolor': case 'colorbox':
              g = readGroup(s, i); if (g) i = g.end;
              g = readGroup(s, i); if (g) { i = g.end; out += conv(g.content); }
              continue;
            case 'section': case 'subsection': case 'subsubsection': case 'chapter': case 'paragraph':
              o2 = readOpt(s, i); if (o2) i = o2.end;
              g = readGroup(s, i); if (g) { i = g.end; out += '\n\n\u0004SECTION:' + conv(g.content).replace(/\n+/g, ' ').trim() + '\n\n'; }
              continue;
            case 'multicolumn':
              g = readGroup(s, i); if (g) i = g.end;
              g = readGroup(s, i); if (g) i = g.end;
              g = readGroup(s, i); if (g) { i = g.end; out += conv(g.content); }
              continue;
            case 'multirow':
              g = readGroup(s, i); if (g) i = g.end;
              o2 = readOpt(s, i); if (o2) i = o2.end;
              g = readGroup(s, i); if (g) i = g.end;
              g = readGroup(s, i); if (g) { i = g.end; out += conv(g.content); }
              continue;
            case 'hline': case 'toprule': case 'midrule': case 'bottomrule': case 'cline': case 'cmidrule':
              g = readGroup(s, i); if (base === 'cline' || base === 'cmidrule') { if (g) i = g.end; }
              continue;
            default:
              if (!unknown[base]) { unknown[base] = 1; warnings.push('Command \\' + base + ' is not supported; it was removed and its text kept.'); }
              o2 = readOpt(s, i); if (o2) i = o2.end;
              g = readGroup(s, i);
              if (g) { i = g.end; out += conv(g.content); }
              continue;
          }
        }
        if (c === '{' || c === '}') { i++; continue; }
        if (c === '~') { out += ' '; i++; continue; }
        if (c === '-' && s[i + 1] === '-') {
          if (s[i + 2] === '-') { out += '—'; i += 3; } else { out += '–'; i += 2; }
          continue;
        }
        if (c === '`' && s[i + 1] === '`') { out += '“'; i += 2; continue; }
        if (c === "'" && s[i + 1] === "'") { out += '”'; i += 2; continue; }
        if (c === '`') { out += '‘'; i++; continue; }
        out += c; i++;
      }
      return out;

      function eatBraces() { if (s[i] === '{' && s[i + 1] === '}') i += 2; }
    }
    return conv;
  }

  /* ---------------- tabular -> Markdown table ---------------- */
  function splitTop(s, sepRe) {
    // split on separators at depth 0 (not inside {...})
    var parts = [], depth = 0, last = 0;
    for (var i = 0; i < s.length; i++) {
      var c = s[i];
      if (c === '\\') {
        if (sepRe === 'row' && s[i + 1] === '\\' && depth === 0) {
          parts.push(s.slice(last, i));
          i += 2;
          var o = readOpt(s, i); if (o) i = o.end;
          last = i; i--;
          continue;
        }
        i++; continue;
      }
      if (c === '{') depth++;
      else if (c === '}') depth--;
      else if (sepRe === 'cell' && c === '&' && depth === 0) { parts.push(s.slice(last, i)); last = i + 1; }
    }
    parts.push(s.slice(last));
    return parts;
  }

  function convertTabulars(s, conv, blocks) {
    var re = /\\begin\s*\{(tabular\*?|tabularx|array|longtable|tabulary)\}/g;
    var m, out = '', last = 0;
    while ((m = re.exec(s))) {
      var env = m[1];
      var start = m.index + m[0].length;
      if (env === 'tabular*' || env === 'tabularx' || env === 'tabulary') { var w = readGroup(s, start); if (w) start = w.end; }
      var op = readOpt(s, start); if (op) start = op.end;
      var spec = readGroup(s, start); if (spec) start = spec.end;
      var end = findEnvEnd(s, env, start);
      if (!end) continue;
      var body = s.slice(start, end.start).replace(/\\(hline|toprule|midrule|bottomrule)\b/g, '').replace(/\\c(?:mid)?(?:line|rule)\s*(\([^)]*\))?\s*\{[^}]*\}/g, '');
      var rows = splitTop(body, 'row').map(function (r) { return r.trim(); }).filter(function (r) { return r.length; });
      var table = rows.map(function (r) {
        var cells = splitTop(r, 'cell').map(function (cell) {
          var mc = /^\s*\\multicolumn\s*\{(\d+)\}/.exec(cell);
          var txt = conv(cell).replace(/\s*\n\s*/g, ' ').trim().replace(/\|/g, '\\|');
          if (mc && +mc[1] > 1) {
            var arr = [txt];
            for (var k = 1; k < +mc[1]; k++) arr.push('');
            return arr.join(' | ');
          }
          return txt;
        });
        return '| ' + cells.join(' | ') + ' |';
      });
      if (table.length) {
        var ncol = splitTop(rows[0], 'cell').length;
        var sep = '|' + new Array(ncol + 1).join(':---:|');
        table.splice(1, 0, sep);
      }
      blocks.push(table.join('\n'));
      out += s.slice(last, m.index) + '\n' + PH_BLK_O + (blocks.length - 1) + PH_BLK_C + '\n';
      last = end.end;
      re.lastIndex = end.end;
    }
    return out + s.slice(last);
  }

  /* ---------------- Lists (enumerate...) ---------------- */
  function parseNodes(s) {
    var nodes = [];
    var re = /\\begin\s*\{([a-zA-Z]+\*?)\}/g;
    var last = 0, m;
    while ((m = re.exec(s))) {
      var env = m[1];
      if (!LIST_ENVS[env]) continue;
      var start = m.index + m[0].length;
      var label = '';
      var o = readOpt(s, start); if (o) { label = o.content; start = o.end; }
      var o2 = readOpt(s, start, '(', ')'); if (o2) start = o2.end;
      var end = findEnvEnd(s, env, start);
      if (!end) continue;
      if (m.index > last) nodes.push({ type: 'text', text: s.slice(last, m.index) });
      nodes.push({ type: 'list', env: env, label: label, items: parseItems(s.slice(start, end.start)) });
      last = end.end;
      re.lastIndex = end.end;
    }
    if (last < s.length) nodes.push({ type: 'text', text: s.slice(last) });
    return nodes;
  }

  function parseItems(body) {
    var items = [];
    var depth = 0;
    var cur = null;
    var i = 0, segStart = 0;
    function flush(endIdx) {
      if (cur) { cur.body = body.slice(segStart, endIdx); items.push(cur); }
    }
    while (i < body.length) {
      if (body[i] === '\\') {
        var m = /^\\(begin|end)\s*\{([a-zA-Z]+\*?)\}/.exec(body.slice(i, i + 50));
        if (m) {
          if (LIST_ENVS[m[2]]) depth += m[1] === 'begin' ? 1 : -1;
          i += m[0].length; continue;
        }
        var im = /^\\([a-zA-Z]+)\*?/.exec(body.slice(i, i + 30));
        if (im && depth === 0 && ITEM_CMDS[im[1]] && !/[a-zA-Z]/.test(body[i + im[0].length] || '')) {
          flush(i);
          var j = i + im[0].length;
          var opt = readOpt(body, j);
          var lbl = '';
          if (opt) { lbl = opt.content; j = opt.end; }
          cur = { cmd: im[1], label: lbl, correct: im[1] === 'CorrectChoice' || im[1] === 'correctchoice' };
          segStart = j;
          i = j;
          continue;
        }
        i += 2; continue;
      }
      i++;
    }
    flush(body.length);
    return items.map(function (it) { it.nodes = parseNodes(it.body); return it; });
  }

  function isChoiceList(node) {
    if (node.type !== 'list') return false;
    if (node.env === 'itemize' || node.env === 'description' || node.env === 'parts') return false;
    if (/\\(roman|Roman)|label\s*=\s*\(?\s*[iI]\b/.test(node.label)) return false;
    return node.items.length >= 2 && node.items.length <= 8;
  }

  /* ---------------- Whole document ---------------- */
  function convert(src) {
    var warnings = [];
    var s = String(src || '').replace(/\r\n?/g, '\n');
    s = stripComments(s);
    var title = '', author = '', date = '';
    var conv = makeConverter(warnings);
    var mathStore = [];

    var tm = cmdArg(s, 'title'); if (tm) title = tm;
    var am = cmdArg(s, 'author'); if (am) author = am;
    var dm = cmdArg(s, 'date'); if (dm && !/^\s*\\today\s*$/.test(dm)) date = dm;

    var defs = [];
    var bd = /\\begin\s*\{document\}/.exec(s);
    if (bd) {
      var ed = s.indexOf('\\end{document}', bd.index);
      collectDefs(s.slice(0, bd.index), defs, warnings);
      s = s.slice(bd.index + bd[0].length, ed === -1 ? s.length : ed);
    }
    s = collectDefs(s, defs, warnings);
    s = applyDefs(s, defs);
    s = protectMath(s, mathStore);

    var blocks = [];
    var figCount = 0, imgCount = 0;
    // TikZ / pgfplots
    var envRe = /\\begin\s*\{(tikzpicture|pgfpicture|picture|asy)\}/;
    var guard = 0;
    while (envRe.test(s) && guard++ < 500) {
      var mm = envRe.exec(s);
      var endT = findEnvEnd(s, mm[1], mm.index + mm[0].length);
      var stop = endT ? endT.end : s.length;
      figCount++;
      blocks.push('**[Figure ' + figCount + ': insert an image of this drawing here]**');
      s = s.slice(0, mm.index) + '\n' + PH_BLK_O + (blocks.length - 1) + PH_BLK_C + '\n' + s.slice(stop);
    }
    s = s.replace(/\\includegraphics\s*(\[[^\]]*\])?\s*\{([^}]*)\}/g, function (m, opt, file) {
      imgCount++;
      blocks.push('**[Image "' + file.trim() + '": insert this image here]**');
      return '\n' + PH_BLK_O + (blocks.length - 1) + PH_BLK_C + '\n';
    });
    if (figCount) warnings.push(figCount + (figCount === 1 ? ' TikZ drawing' : ' TikZ drawings') + ' could not be converted. Take a screenshot of each one and insert it where the [Figure] note appears.');
    if (imgCount) warnings.push(imgCount + (imgCount === 1 ? ' image' : ' images') + ' (\\includegraphics) must be uploaded again where the [Image] note appears.');

    s = convertTabulars(s, conv, blocks);

    var nodes = parseNodes(s);

    function restore(text, ctx) {
      text = text.replace(new RegExp(PH_BLK_O + '(\\d+)' + PH_BLK_C, 'g'), function (m, idx) {
        return ctx === 'choice' ? ' ' + blocks[+idx].replace(/\n/g, ' ') + ' ' : '\n\n' + blocks[+idx] + '\n\n';
      });
      text = text.replace(new RegExp(PH_MATH_O + '(\\d+)' + PH_MATH_C, 'g'), function (m, idx) {
        var it = mathStore[+idx];
        if (!it) return '';
        var tex = it.tex.replace(/\s*\n\s*/g, ' ');
        if (it.mode === 'display') return ctx === 'choice' || ctx === 'cell' ? '$\\displaystyle ' + tex + '$' : '\n\n$$' + tex + '$$\n\n';
        return '$' + tex + '$';
      });
      return text;
    }

    function tidy(text) {
      return text.split('\n').map(function (l) { return l.replace(/[ \t]+/g, ' ').trim(); }).join('\n')
        .replace(/\n{3,}/g, '\n\n').trim();
    }

    function convNodes(list, ctx) {
      return list.map(function (n) {
        if (n.type === 'text') return conv(n.text);
        var roman = /\\(roman|Roman)/.test(n.label);
        return '\n\n' + n.items.map(function (it, k) {
          var lab = roman ? toRoman(k + 1) + '. ' : n.env === 'itemize' ? '• ' : (k + 1) + ') ';
          return lab + tidy(restore(convNodes(it.nodes, ctx), ctx)).replace(/\n+/g, ' ');
        }).join('\n\n') + '\n\n';
      }).join('');
    }

    var ANSWER_LINE = /^\s*\**\s*(?:correct answer|answer|ans|đáp án)\s*\**\s*[:：]\s*\**\s*(.*?)\s*$/i;
    var EXPLANATION_LINE = /^\s*\**\s*(?:explanation|solution|rationale|giải thích|lời giải)\s*\**\s*[:：]\s*\**\s*(.*?)\s*$/i;

    /** Answer text without Markdown emphasis: "**B**" (from \textbf{B}) -> "B" */
    function cleanAnswer(a) {
      return String(a || '').replace(/[*_]+/g, '').trim();
    }

    /** Lines the parser would read as structure ("2. ...", "A. ...", "## ...", "Answer Key") are escaped with "\". */
    function protectLine(l) {
      var P = global.P;
      var kind = P && P.lineKind ? P.lineKind(l)
        : /^(\(?[A-H]\s*[.)]\s|\d{1,3}\s*[.):](\s|$)|##\s)/.test(l) ? 'question' : '';
      return kind === 'question' || kind === 'choice' || kind === 'module' || kind === 'key' ? '\\' + l : l;
    }

    /** Choice marks typed by hand on one line: "C. 4 \quad D. 5" -> [{letter:'C', text:'4'}, {letter:'D', text:'5'}] */
    function lineChoices(line) {
      var first = /^\(?([A-H])[.)]\s+/.exec(line);
      if (!first) return null;
      var start = LETTERS.indexOf(first[1]);
      var marks = [{ letter: first[1], at: 0, textAt: first[0].length }];
      var re = /\s\(?([A-H])[.)]\s+/g, m;
      re.lastIndex = first[0].length;
      while ((m = re.exec(line))) {
        if (m[1] === LETTERS[start + marks.length]) marks.push({ letter: m[1], at: m.index, textAt: m.index + m[0].length });
      }
      return marks.map(function (mk, i) {
        return { letter: mk.letter, text: line.slice(mk.textAt, i + 1 < marks.length ? marks[i + 1].at : line.length).trim() };
      });
    }

    /**
     * Hand-typed choices at the end of an item ("A. 2\\ B. 3\\ C. 4\\ D. 5"): the last line must be a choice
     * and the run must read A, B, C, ... Returns { prompt: lines, choices: [text] } or null.
     */
    function trailingChoices(lines) {
      var k = lines.length - 1;
      while (k >= 0 && !lines[k].trim()) k--;
      if (k < 0 || !lineChoices(lines[k])) return null;
      var groups = [], cont = [];
      for (; k >= 0; k--) {
        var l = lines[k];
        if (!l.trim()) continue;
        var lc = lineChoices(l);
        if (!lc) {
          if (cont.length >= 3) return null;
          cont.unshift(l); // a wrapped line belongs to the choice above it
          continue;
        }
        if (cont.length) { lc[lc.length - 1].text += ' ' + cont.join(' '); cont = []; }
        groups.unshift(lc);
        if (lc[0].letter === 'A') break;
      }
      if (k < 0 || cont.length) return null;
      var flat = [].concat.apply([], groups);
      if (flat.length < 2) return null;
      for (var i = 0; i < flat.length; i++) if (flat[i].letter !== LETTERS[i]) return null;
      return { prompt: lines.slice(0, k), choices: flat.map(function (c) { return c.text; }) };
    }

    var out = [];
    out.push('---');
    out.push('title: ' + tidy(restore(conv(title), 'cell')).replace(/\n+/g, ' '));
    out.push('author: ' + tidy(restore(conv(author), 'cell')).replace(/\n+/g, ' '));
    var dateText = date ? tidy(restore(conv(date), 'cell')).replace(/\n+/g, ' ') : '';
    if (dateText) out.push('date: ' + dateText);
    out.push('---', '');

    var qn = 0;
    var started = false;
    var keyHeaderOut = false;

    function topText(text) {
      var t = tidy(restore(conv(text), 'top'));
      if (!t) return;
      var lines = t.split('\n');
      var pendingKeyTable = false;
      lines.forEach(function (line) {
        var plain = line.replace(/[*#_]/g, '').trim();
        var sec = /^\u0004SECTION:(.*)$/.exec(line);
        if (sec) plain = sec[1].replace(/[*#_]/g, '').trim();
        if (/^(answer key|answers|đáp án|bảng đáp án|answer sheet)\s*:?$/i.test(plain)) {
          out.push('', 'Answer Key'); keyHeaderOut = true; return;
        }
        if (sec) {
          if (/\b(module|section|phần|part)\b/i.test(plain)) { out.push('', '## ' + plain, ''); keyHeaderOut = false; }
          return;
        }
        if (/^\|/.test(line)) {
          if (!keyHeaderOut && started) {
            if (/question|câu/i.test(line)) pendingKeyTable = true;
            if (pendingKeyTable) { out.push('', 'Answer Key'); keyHeaderOut = true; }
          }
          if (keyHeaderOut) out.push(line);
          return;
        }
      });
    }

    /** A list after an "Answer Key" heading: one "n. value" key line per item. */
    function keyList(node) {
      node.items.forEach(function (it, k) {
        var val = cleanAnswer(tidy(restore(convNodes(it.nodes, 'cell'), 'cell')).replace(/\s*\n+\s*/g, ' '));
        var lm = /^\s*\(?(\d{1,3})/.exec(it.label || '');
        var n = lm ? +lm[1] : k + 1;
        var inner = /^(\d{1,3})\s*[.):]\s+(.+)$/.exec(val); // "\item 3. B"
        if (inner) { n = +inner[1]; val = inner[2]; }
        if (val) out.push(n + '. ' + val);
      });
    }

    nodes.forEach(function (node) {
      if (node.type === 'text') { topText(node.text); return; }
      if (keyHeaderOut) { keyList(node); return; }
      if (node.env === 'itemize' && !started) { return; }
      started = true;
      node.items.forEach(function (item) {
        qn++;
        var idx = -1;
        for (var k = 0; k < item.nodes.length; k++) if (isChoiceList(item.nodes[k])) { idx = k; break; }
        var before = idx === -1 ? item.nodes : item.nodes.slice(0, idx);
        var after = idx === -1 ? [] : item.nodes.slice(idx + 1);
        var promptText = tidy(restore(convNodes(before, 'prompt'), 'prompt'));
        var afterText = tidy(restore(convNodes(after, 'prompt'), 'prompt'));
        var answer = null;
        var explanation = [];
        var inExplanation = false;
        var promptLines = promptText.split('\n').filter(function (l) {
          var am2 = ANSWER_LINE.exec(l);
          if (am2) { answer = cleanAnswer(am2[1]); return false; }
          // A solution written inside the item is moved after the answer
          var em = EXPLANATION_LINE.exec(l);
          if (em) { inExplanation = true; if (em[1]) explanation.push(em[1]); return false; }
          if (inExplanation) { if (l.trim()) explanation.push(l); return false; }
          return true;
        });
        var extra = afterText.split('\n').filter(function (l) {
          var am3 = ANSWER_LINE.exec(l);
          if (am3) { answer = cleanAnswer(am3[1]); return false; }
          var em3 = EXPLANATION_LINE.exec(l);
          if (em3) { if (em3[1]) explanation.push(em3[1]); return false; }
          return l.trim() !== '';
        });
        var choices = null;
        if (idx !== -1) {
          choices = item.nodes[idx].items.map(function (ch, ci) {
            if (ch.correct) answer = LETTERS[ci];
            return tidy(restore(convNodes(ch.nodes, 'choice'), 'choice')).replace(/\s*\n+\s*/g, ' ');
          });
        } else {
          var tc = trailingChoices(promptLines);
          if (tc) { promptLines = tc.prompt; choices = tc.choices; }
        }
        var promptFinal = promptLines.join('\n').replace(/\n{3,}/g, '\n\n').trim()
          .split('\n').map(function (l, li) { return li > 0 ? protectLine(l) : l; }).join('\n');
        out.push(qn + '. ' + promptFinal);
        if (choices) choices.forEach(function (txt, ci) { out.push(LETTERS[ci] + '. ' + txt); });
        if (extra.length) {
          warnings.push('Question ' + qn + ': text after the choices was moved to the explanation.');
        }
        out.push('Answer: ' + (answer || ''));
        var expl = explanation.concat(extra).join(' ').replace(/\s+/g, ' ').trim();
        if (expl) out.push('Explanation: ' + expl);
        out.push('');
      });
    });

    if (!qn) warnings.push('No question list found (\\begin{enumerate} ... \\item ...). Check the LaTeX file.');

    var text = out.join('\n').replace(/\n{3,}/g, '\n\n');
    return { text: text, warnings: warnings, questionCount: qn };
  }

  function toRoman(n) {
    var map = [[10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']], r = '';
    map.forEach(function (p) { while (n >= p[0]) { r += p[1]; n -= p[0]; } });
    return r;
  }

  global.LatexImport = { convert: convert };
})(window);
