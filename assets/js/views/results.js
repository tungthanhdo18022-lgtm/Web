/* Trang kết quả + xem lại từng câu. */
(function (global) {
  'use strict';

  var U = global.U, R = global.R, G = global.G;
  var LETTERS = 'ABCDEFGH';

  function load(root, id) {
    var attempt = global.Attempts.get(id);
    if (!attempt) {
      root.innerHTML = '<div class="page narrow"><div class="empty-state">' + U.icon('warn') +
        '<h2>Không tìm thấy kết quả</h2><p>Bài làm này không tồn tại trên trình duyệt này.</p><a class="btn btn--primary" href="#/">Về trang chủ</a></div></div>';
      return null;
    }
    if (attempt.status !== 'completed') { location.replace('#/exam/' + encodeURIComponent(attempt.id)); return null; }
    var test = global.SATLibrary.get(attempt.testId);
    var result = attempt.result;
    // Chấm lại theo đề hiện tại (nếu đề còn tồn tại và cùng cấu trúc)
    if (test) {
      try {
        var fresh = G.scoreAttempt(test, attempt);
        if (!result || fresh.total === result.total) result = fresh;
      } catch (e) { console.error(e); }
    }
    return { attempt: attempt, test: test, result: result };
  }

  function scoreClass(p) { return p >= 80 ? 'is-good' : p >= 50 ? 'is-mid' : 'is-low'; }

  function donut(pct) {
    var r = 52, c = 2 * Math.PI * r;
    var off = c * (1 - pct / 100);
    return '<svg class="donut" viewBox="0 0 120 120" aria-hidden="true">' +
      '<circle cx="60" cy="60" r="' + r + '" class="donut-track"/>' +
      '<circle cx="60" cy="60" r="' + r + '" class="donut-val ' + scoreClass(pct) + '" stroke-dasharray="' + c.toFixed(2) + '" stroke-dashoffset="' + off.toFixed(2) + '"/>' +
      '</svg>';
  }

  function ResultsView(root, params) {
    var data = load(root, params.id);
    if (!data) return null;
    var attempt = data.attempt, test = data.test, res = data.result;
    if (!res) {
      root.innerHTML = '<div class="page narrow"><div class="empty-state"><h2>Không có dữ liệu chấm điểm</h2><a class="btn btn--primary" href="#/">Về trang chủ</a></div></div>';
      return null;
    }
    var filter = 'all';

    function domainBars() {
      var keys = Object.keys(res.byDomain || {});
      if (!keys.length) return '';
      return '<div class="card"><h3 class="card-title">Theo dạng bài</h3><div class="bars">' + keys.map(function (k) {
        var d = res.byDomain[k];
        var p = d.total ? Math.round(d.correct / d.total * 100) : 0;
        return '<div class="bar-row"><div class="bar-label"><span>' + U.esc(k) + '</span><b>' + d.correct + '/' + d.total + '</b></div>' +
          '<div class="bar"><span class="' + scoreClass(p) + '" style="width:' + p + '%"></span></div></div>';
      }).join('') + '</div></div>';
    }

    function typeBars() {
      var t = res.byType;
      var rows = [['Trắc nghiệm', t.mcq], ['Điền đáp án', t.spr]].filter(function (r) { return r[1].total; });
      var mods = res.byModule && res.byModule.length > 1 ? res.byModule.map(function (m) { return [m.title, m]; }) : [];
      return '<div class="card"><h3 class="card-title">Theo loại câu' + (mods.length ? ' &amp; module' : '') + '</h3><div class="bars">' +
        rows.concat(mods).map(function (r) {
          var p = r[1].total ? Math.round(r[1].correct / r[1].total * 100) : 0;
          return '<div class="bar-row"><div class="bar-label"><span>' + U.esc(r[0]) + '</span><b>' + r[1].correct + '/' + r[1].total + '</b></div>' +
            '<div class="bar"><span class="' + scoreClass(p) + '" style="width:' + p + '%"></span></div></div>';
        }).join('') + '</div></div>';
    }

    function rows() {
      var list = res.questions.filter(function (q) {
        if (filter === 'all') return true;
        if (filter === 'marked') return q.marked;
        return q.status === filter;
      });
      if (!list.length) return '<div class="empty-mini">Không có câu nào trong mục này.</div>';
      var multi = test && test.modules.length > 1;
      return '<div class="table-wrap"><table class="data-table q-table-results"><thead><tr><th>Câu</th>' + (multi ? '<th>Module</th>' : '') +
        '<th>Loại</th><th>Bạn chọn</th><th>Đáp án đúng</th><th>Kết quả</th><th></th></tr></thead><tbody>' +
        list.map(function (q) {
          var flat = res.questions.indexOf(q);
          var st = q.status === 'correct' ? '<span class="st st--ok">' + U.icon('check') + 'Đúng</span>'
            : q.status === 'incorrect' ? '<span class="st st--bad">' + U.icon('cross') + 'Sai</span>'
              : '<span class="st st--skip">Bỏ trống</span>';
          return '<tr class="click-row" data-review="' + flat + '"><td><b>' + (q.index + 1) + '</b>' + (q.marked ? ' <span class="flag-mini" title="Đã đánh dấu">' + U.icon('bookmarkFill') + '</span>' : '') + '</td>' +
            (multi ? '<td>' + (q.module + 1) + '</td>' : '') +
            '<td><span class="muted">' + (q.type === 'mcq' ? 'Trắc nghiệm' : 'Điền') + '</span>' + (q.domain ? '<br><small class="muted">' + U.esc(q.domain) + '</small>' : '') + '</td>' +
            '<td class="mono">' + (q.response ? U.esc(q.response) : '<span class="muted">—</span>') + '</td>' +
            '<td class="mono">' + U.esc(q.correctAnswer) + '</td>' +
            '<td>' + st + '</td>' +
            '<td><a class="btn btn--sm btn--ghost" href="#/review/' + encodeURIComponent(attempt.id) + '/' + flat + '">Xem lại</a></td></tr>';
        }).join('') + '</tbody></table></div>';
    }

    function render() {
      var counts = {
        all: res.questions.length,
        correct: res.correct, incorrect: res.incorrect, omitted: res.omitted,
        marked: res.questions.filter(function (q) { return q.marked; }).length
      };
      var chip = function (key, label) {
        return '<button class="chip' + (filter === key ? ' is-on' : '') + '" data-filter="' + key + '">' + label + ' <span>' + counts[key] + '</span></button>';
      };
      var testGone = !test ? '<div class="alert alert--warn">' + U.icon('warn') + '<div>Đề gốc đã bị xóa nên không thể xem lại nội dung câu hỏi.</div></div>' : '';

      root.innerHTML =
        '<div class="page">' +
        '<a class="back-link" href="#/">' + U.icon('chevronLeft') + 'Thư viện đề</a>' +
        '<div class="result-hero">' +
        '<div class="result-score">' +
        '<div class="donut-wrap">' + donut(res.percent) + '<div class="donut-center"><b>' + res.correct + '<small>/' + res.total + '</small></b><span>' + res.percent + '%</span></div></div>' +
        '<div class="result-main">' +
        '<span class="eyebrow">Kết quả</span>' +
        '<h1>' + U.esc(attempt.testTitle || (test && test.title) || 'Bài làm') + '</h1>' +
        '<p class="muted">' + (attempt.name ? U.esc(attempt.name) + ' · ' : '') + 'Nộp lúc ' + U.fmtDate(attempt.finishedAt) + ' · ' + (attempt.timed ? 'Tính giờ' : 'Không tính giờ') + '</p>' +
        '<div class="result-stats">' +
        '<div class="rs rs--ok"><b>' + res.correct + '</b><span>Đúng</span></div>' +
        '<div class="rs rs--bad"><b>' + res.incorrect + '</b><span>Sai</span></div>' +
        '<div class="rs rs--skip"><b>' + res.omitted + '</b><span>Bỏ trống</span></div>' +
        '<div class="rs"><b>' + U.fmtClock(attempt.totalElapsed || 0) + '</b><span>Thời gian</span></div>' +
        '</div>' +
        '</div></div>' +
        '<div class="result-est">' +
        '<span>Điểm SAT Math ước tính</span><b>' + res.estimated + '</b>' +
        '<small>Thang 200–800, quy đổi tham khảo theo tỉ lệ câu đúng — không phải điểm chính thức.</small>' +
        '</div>' +
        '</div>' +
        '<div class="result-actions">' +
        (test ? '<a class="btn btn--primary" href="#/review/' + encodeURIComponent(attempt.id) + '/0">' + U.icon('eye') + 'Xem lại từng câu</a>' : '') +
        (test ? '<a class="btn btn--ghost" href="#/test/' + encodeURIComponent(test.id) + '">' + U.icon('refresh') + 'Làm lại đề này</a>' : '') +
        '<a class="btn btn--ghost" href="#/">' + U.icon('grid') + 'Thư viện đề</a>' +
        '</div>' +
        testGone +
        '<div class="result-cards">' + domainBars() + typeBars() + '</div>' +
        '<div class="section">' +
        '<div class="section-head"><div><h2>Chi tiết từng câu</h2></div>' +
        '<div class="chips">' + chip('all', 'Tất cả') + chip('correct', 'Đúng') + chip('incorrect', 'Sai') + chip('omitted', 'Bỏ trống') + chip('marked', 'Đã đánh dấu') + '</div></div>' +
        '<div class="answer-strip">' + res.questions.map(function (q, i) {
          return '<a class="as-cell as-' + q.status + '" href="#/review/' + encodeURIComponent(attempt.id) + '/' + i + '" title="Câu ' + (q.index + 1) + '">' + (q.index + 1) + '</a>';
        }).join('') + '</div>' +
        '<div id="rows">' + rows() + '</div>' +
        '</div>' +
        '</div>';
    }

    function onClick(e) {
      var f = e.target.closest('[data-filter]');
      if (f) {
        filter = f.getAttribute('data-filter');
        U.$$('[data-filter]', root).forEach(function (c) { c.classList.toggle('is-on', c.getAttribute('data-filter') === filter); });
        document.getElementById('rows').innerHTML = rows();
        return;
      }
      var r = e.target.closest('[data-review]');
      if (r && !e.target.closest('a') && test) location.hash = '#/review/' + encodeURIComponent(attempt.id) + '/' + r.getAttribute('data-review');
    }
    root.addEventListener('click', onClick);
    render();
    return function () { root.removeEventListener('click', onClick); };
  }

  /* ---------------- Xem lại từng câu ---------------- */
  function ReviewView(root, params) {
    var data = load(root, params.id);
    if (!data) return null;
    var attempt = data.attempt, test = data.test, res = data.result;
    if (!test) { location.replace('#/results/' + encodeURIComponent(attempt.id)); return null; }
    var flat = [];
    test.modules.forEach(function (m, mi) { m.questions.forEach(function (q, qi) { flat.push({ q: q, mi: mi, qi: qi }); }); });
    var idx = U.clamp(parseInt(params.n, 10) || 0, 0, flat.length - 1);
    var renderOpts = test.assets && Object.keys(test.assets).length ? { assets: test.assets, assetsKey: test.id + ':' + (test.updatedAt || 0) } : {};

    function statusOf(i) { return res.questions[i] ? res.questions[i].status : 'omitted'; }

    function render() {
      var item = flat[idx];
      var q = item.q;
      var resp = attempt.answers[q.id];
      var answered = resp != null && String(resp).trim() !== '';
      var ok = answered && G.isCorrect(q, resp);
      var status = !answered ? 'omitted' : ok ? 'correct' : 'incorrect';
      var multi = test.modules.length > 1;

      var body = '';
      if (q.type === 'mcq') {
        body = '<div class="bb-choices rv-choices">' + q.choices.map(function (c, i) {
          var L = LETTERS[i];
          var isKey = q.answer === L, isMine = resp === L;
          var cls = 'bb-choice rv-choice' + (isKey ? ' is-key' : '') + (isMine && !isKey ? ' is-wrong' : '') + (isMine ? ' is-mine' : '');
          var tag = isKey ? '<span class="rv-tag rv-tag--ok">' + U.icon('check') + (isMine ? 'Bạn chọn · Đúng' : 'Đáp án đúng') + '</span>'
            : isMine ? '<span class="rv-tag rv-tag--bad">' + U.icon('cross') + 'Bạn chọn</span>' : '';
          return '<div class="bb-choice-row"><div class="' + cls + '"><span class="bb-letter">' + L + '</span><span class="bb-choice-text">' +
            R.render(c, Object.assign({ inline: true }, renderOpts)) + '</span>' + tag + '</div></div>';
        }).join('') + '</div>';
      } else {
        body = '<div class="rv-spr">' +
          '<div class="rv-spr-box ' + (status === 'correct' ? 'is-ok' : status === 'incorrect' ? 'is-bad' : 'is-skip') + '"><span>Bạn trả lời</span><b>' + (answered ? R.answerPreview(resp) : '—') + '</b></div>' +
          '<div class="rv-spr-box is-key"><span>Đáp án đúng</span><b>' + (q.answer || []).map(function (a) { return R.answerPreview(a); }).join('<i> hoặc </i>') + '</b></div>' +
          '</div>';
      }

      root.innerHTML =
        '<div class="page review-page">' +
        '<div class="rv-top">' +
        '<a class="back-link" href="#/results/' + encodeURIComponent(attempt.id) + '">' + U.icon('chevronLeft') + 'Kết quả</a>' +
        '<div class="rv-title"><b>' + U.esc(test.title) + '</b>' + (multi ? '<span>' + U.esc(test.modules[item.mi].title) + '</span>' : '') + '</div>' +
        '</div>' +
        '<div class="answer-strip answer-strip--compact">' + flat.map(function (f, i) {
          return '<a class="as-cell as-' + statusOf(i) + (i === idx ? ' is-current' : '') + '" href="#/review/' + encodeURIComponent(attempt.id) + '/' + i + '">' + (f.qi + 1) + '</a>';
        }).join('') + '</div>' +
        '<article class="rv-card">' +
        '<div class="bb-qhead rv-qhead"><span class="bb-qnum">' + (item.qi + 1) + '</span>' +
        '<span class="rv-status rv-status--' + status + '">' + (status === 'correct' ? U.icon('check') + 'Đúng' : status === 'incorrect' ? U.icon('cross') + 'Sai' : 'Bỏ trống') + '</span>' +
        (attempt.marked[q.id] ? '<span class="rv-marked">' + U.icon('bookmarkFill') + 'Đã đánh dấu</span>' : '') +
        (q.domain ? '<span class="rv-domain">' + U.esc(q.domain) + '</span>' : '') +
        '</div>' +
        '<div class="bb-prompt content">' + R.render(q.prompt, renderOpts) + '</div>' +
        body +
        (q.explanation ? '<div class="rv-expl"><h4>' + U.icon('book') + 'Lời giải</h4><div class="content">' + R.render(q.explanation, renderOpts) + '</div></div>' : '') +
        '</article>' +
        '<div class="rv-nav">' +
        '<button class="btn btn--ghost" data-go="-1"' + (idx === 0 ? ' disabled' : '') + '>' + U.icon('chevronLeft') + 'Câu trước</button>' +
        '<span class="muted">' + (idx + 1) + ' / ' + flat.length + '</span>' +
        '<button class="btn btn--primary" data-go="1"' + (idx === flat.length - 1 ? ' disabled' : '') + '>Câu sau' + U.icon('chevronRight') + '</button>' +
        '</div>' +
        '</div>';
      window.scrollTo(0, 0);
    }

    function go(d) {
      var n = U.clamp(idx + d, 0, flat.length - 1);
      if (n !== idx) location.hash = '#/review/' + encodeURIComponent(attempt.id) + '/' + n;
    }
    function onClick(e) {
      var b = e.target.closest('[data-go]');
      if (b && !b.disabled) go(+b.getAttribute('data-go'));
    }
    function onKey(e) {
      if (document.querySelector('.modal-overlay')) return;
      var tag = (e.target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    }
    root.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    render();
    return function () { root.removeEventListener('click', onClick); document.removeEventListener('keydown', onKey); };
  }

  global.Views = global.Views || {};
  global.Views.results = ResultsView;
  global.Views.review = ReviewView;
})(window);
