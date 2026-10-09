/* Trang chủ: thư viện đề + lịch sử làm bài. */
(function (global) {
  'use strict';

  var U = global.U;

  function testCard(t) {
    var A = global.Attempts;
    var prog = A.inProgress(t.id);
    var best = A.best(t.id);
    var count = A.forTest(t.id).filter(function (a) { return a.status === 'completed'; }).length;
    var mcq = 0, spr = 0;
    t.modules.forEach(function (m) { m.questions.forEach(function (q) { if (q.type === 'mcq') mcq++; else spr++; }); });
    var id = encodeURIComponent(t.id);
    var bestTxt = best ? best.result.correct + '/' + best.result.total : '—';
    var progressPct = prog ? Math.round(Object.keys(prog.answers || {}).length / Math.max(1, t.questionCount) * 100) : 0;

    return '<article class="test-card" data-id="' + U.esc(t.id) + '">' +
      '<div class="test-card-top">' +
      '<span class="badge ' + (t.builtin ? 'badge--blue' : 'badge--green') + '">' + (t.builtin ? 'Đề có sẵn' : 'Đề của bạn') + '</span>' +
      (t.hasErrors ? '<span class="badge badge--red">Cần sửa</span>' : '') +
      '<span class="spacer"></span>' +
      '<div class="card-menu">' +
      (t.builtin
        ? '<button class="icon-btn" data-act="duplicate" data-id="' + U.esc(t.id) + '" title="Sao chép để chỉnh sửa" aria-label="Sao chép để chỉnh sửa">' + U.icon('copy') + '</button>'
        : '<a class="icon-btn" href="#/builder/' + id + '" title="Chỉnh sửa" aria-label="Chỉnh sửa">' + U.icon('edit') + '</a>') +
      '<button class="icon-btn" data-act="export" data-id="' + U.esc(t.id) + '" title="Tải file JSON" aria-label="Tải file JSON">' + U.icon('download') + '</button>' +
      (!t.builtin ? '<button class="icon-btn icon-btn--danger" data-act="delete" data-id="' + U.esc(t.id) + '" title="Xóa đề" aria-label="Xóa đề">' + U.icon('trash') + '</button>' : '') +
      '</div></div>' +
      '<h3 class="test-card-title"><a href="#/test/' + id + '">' + U.esc(t.title || 'Đề không tên') + '</a></h3>' +
      '<p class="test-card-meta">' + (t.author ? U.esc(t.author) + ' · ' : '') + t.questionCount + ' câu · ' + Math.round(t.totalTime) + ' phút' +
      (t.modules.length > 1 ? ' · ' + t.modules.length + ' module' : '') + '</p>' +
      (t.description ? '<p class="test-card-desc">' + U.esc(t.description) + '</p>' : '') +
      '<div class="test-card-mix"><span>' + mcq + ' trắc nghiệm</span><span>' + spr + ' điền đáp án</span></div>' +
      '<div class="test-card-stats">' +
      '<div><span>Điểm cao nhất</span><b>' + bestTxt + '</b></div>' +
      '<div><span>Đã làm</span><b>' + count + ' lần</b></div>' +
      (best ? '<div><span>Ước tính</span><b>' + best.result.estimated + '</b></div>' : '') +
      '</div>' +
      (prog ? '<div class="progress" title="Đã trả lời ' + progressPct + '%"><span style="width:' + progressPct + '%"></span></div>' : '') +
      '<div class="test-card-actions">' +
      (prog
        ? '<a class="btn btn--primary" href="#/exam/' + encodeURIComponent(prog.id) + '">' + U.icon('play') + 'Tiếp tục làm</a>'
        : '<a class="btn btn--primary" href="#/test/' + id + '">' + U.icon('play') + 'Bắt đầu</a>') +
      (best ? '<a class="btn btn--ghost" href="#/results/' + encodeURIComponent(best.id) + '">Xem kết quả</a>' : '') +
      '</div>' +
      '</article>';
  }

  function historyRows() {
    var list = global.Attempts.all().filter(function (a) { return a.status === 'completed' && a.result; }).slice(0, 30);
    if (!list.length) return '<div class="empty-mini">Chưa có bài làm nào. Hãy chọn một đề ở trên để bắt đầu!</div>';
    return '<div class="table-wrap"><table class="data-table"><thead><tr><th>Đề</th><th>Ngày làm</th><th>Kết quả</th><th>Ước tính</th><th>Thời gian</th><th></th></tr></thead><tbody>' +
      list.map(function (a) {
        var r = a.result;
        return '<tr><td><b>' + U.esc(a.testTitle || a.testId) + '</b>' + (a.timed ? '' : ' <span class="badge badge--gray">Không tính giờ</span>') + '</td>' +
          '<td>' + U.fmtDate(a.finishedAt) + '</td>' +
          '<td><span class="score-pill ' + scoreClass(r.percent) + '">' + r.correct + '/' + r.total + '</span> <span class="muted">(' + r.percent + '%)</span></td>' +
          '<td>' + r.estimated + '</td>' +
          '<td>' + U.fmtDuration(a.totalElapsed || 0) + '</td>' +
          '<td class="row-actions"><a class="btn btn--sm btn--ghost" href="#/results/' + encodeURIComponent(a.id) + '">Xem</a>' +
          '<button class="icon-btn" data-act="del-attempt" data-id="' + U.esc(a.id) + '" title="Xóa" aria-label="Xóa bài làm">' + U.icon('trash') + '</button></td></tr>';
      }).join('') + '</tbody></table></div>';
  }

  function scoreClass(p) { return p >= 80 ? 'is-good' : p >= 50 ? 'is-mid' : 'is-low'; }

  function HomeView(root) {
    var Lib = global.SATLibrary;
    var query = '';

    function render() {
      var tests = Lib.all();
      var first = tests[0];
      var errs = Lib.errors();
      var inProg = global.Attempts.all().filter(function (a) { return a.status === 'in-progress' && Lib.get(a.testId); });

      root.innerHTML =
        '<div class="page">' +
        '<section class="hero">' +
        '<div class="hero-text">' +
        '<span class="eyebrow">' + U.icon('sparkles') + 'Digital SAT · Math</span>' +
        '<h1>Luyện SAT Math với giao diện <span class="hl">giống Bluebook</span></h1>' +
        '<p class="lead">Làm bài trên giao diện y như phòng thi: đồng hồ đếm ngược, máy tính Desmos, tờ công thức, đánh dấu câu, gạch đáp án. Nộp bài là có điểm và lời giải ngay.</p>' +
        '<div class="hero-actions">' +
        (first ? '<a class="btn btn--primary btn--lg" href="#/test/' + encodeURIComponent(first.id) + '">' + U.icon('play') + 'Làm đề ' + U.esc(first.title) + '</a>' : '') +
        '<button class="btn btn--ghost btn--lg" data-act="upload">' + U.icon('upload') + 'Tải đề lên</button>' +
        '</div>' +
        '</div>' +
        '<div class="hero-visual" aria-hidden="true">' + heroMock() + '</div>' +
        '</section>' +

        (errs.length ? '<div class="alert alert--error">' + U.icon('warn') + '<div><b>Một số đề không tải được:</b><ul>' +
          errs.map(function (e) { return '<li><b>' + U.esc(e.title) + '</b>: ' + U.esc((e.errors[0] && e.errors[0].msg) || 'lỗi') + (e.errors.length > 1 ? ' (+' + (e.errors.length - 1) + ' lỗi khác)' : '') + '</li>'; }).join('') +
          '</ul></div></div>' : '') +

        (inProg.length ? '<section class="resume-list">' + inProg.map(function (a) {
          var t = Lib.get(a.testId);
          var answered = Object.keys(a.answers || {}).length;
          return '<a class="resume-card" href="#/exam/' + encodeURIComponent(a.id) + '">' +
            '<span class="resume-icon">' + U.icon('play') + '</span>' +
            '<span class="resume-text"><b>Đang làm dở: ' + U.esc(t.title) + '</b><span>Đã trả lời ' + answered + '/' + t.questionCount + ' câu · cập nhật ' + U.fmtDate(a.updatedAt) + '</span></span>' +
            '<span class="resume-go">Tiếp tục ' + U.icon('chevronRight') + '</span></a>';
        }).join('') + '</section>' : '') +

        '<section class="section">' +
        '<div class="section-head">' +
        '<div><h2>Thư viện đề</h2><p class="muted">' + tests.length + ' đề · Đề bạn tải lên được lưu ngay trong trình duyệt này.</p></div>' +
        '<div class="section-tools">' +
        '<label class="search">' + U.icon('search') + '<input type="search" id="home-search" placeholder="Tìm đề…" value="' + U.esc(query) + '" aria-label="Tìm đề"></label>' +
        '<button class="btn btn--ghost" data-act="upload">' + U.icon('upload') + '<span>Tải đề lên</span></button>' +
        '<a class="btn btn--primary" href="#/builder">' + U.icon('plus') + '<span>Tạo đề mới</span></a>' +
        '</div></div>' +
        '<div class="test-grid" id="test-grid"></div>' +
        '</section>' +

        '<section class="section">' +
        '<div class="section-head"><div><h2>Lịch sử làm bài</h2><p class="muted">Các bài đã nộp trên trình duyệt này.</p></div></div>' +
        historyRows() +
        '</section>' +
        '</div>';
      renderGrid();
      var s = document.getElementById('home-search');
      s.addEventListener('input', function () { query = s.value; renderGrid(); });
    }

    function renderGrid() {
      var grid = document.getElementById('test-grid');
      if (!grid) return;
      var qn = query.trim().toLowerCase();
      var tests = Lib.all().filter(function (t) {
        return !qn || (t.title + ' ' + (t.author || '') + ' ' + (t.description || '')).toLowerCase().indexOf(qn) !== -1;
      });
      grid.innerHTML = tests.map(testCard).join('') +
        '<button class="test-card test-card--add" data-act="upload">' +
        '<span class="add-icon">' + U.icon('upload') + '</span><b>Tải đề mới lên</b>' +
        '<span>File .json, .txt hoặc .tex (LaTeX)</span></button>' +
        '<a class="test-card test-card--add" href="#/builder">' +
        '<span class="add-icon">' + U.icon('edit') + '</span><b>Soạn đề trực tiếp</b>' +
        '<span>Gõ hoặc dán đề, xem trước ngay</span></a>';
      if (!tests.length && qn) grid.insertAdjacentHTML('afterbegin', '<div class="empty-mini grid-span">Không tìm thấy đề nào khớp với "' + U.esc(query) + '".</div>');
    }

    function onClick(e) {
      var b = e.target.closest('[data-act]');
      if (!b) return;
      var act = b.getAttribute('data-act');
      var id = b.getAttribute('data-id');
      if (act === 'upload') { global.App.uploadTests().then(function (changed) { if (changed) render(); }); }
      else if (act === 'export') {
        var t = Lib.get(id);
        if (t) U.download(U.slug(t.title) + '.json', Lib.exportJson(t), 'application/json');
      }
      else if (act === 'duplicate') {
        var src = Lib.get(id);
        if (!src) return;
        global.App.pendingDraft = { source: src.source || global.P.toText(src), title: src.title + ' (bản sao)', author: src.author, description: src.description, assets: src.assets };
        location.hash = '#/builder';
      }
      else if (act === 'delete') {
        var td = Lib.get(id);
        U.confirm('Xóa đề này?', 'Đề <b>' + U.esc(td && td.title) + '</b> sẽ bị xóa khỏi trình duyệt. Lịch sử làm bài vẫn được giữ lại.', 'Xóa đề', { danger: true })
          .then(function (ok) {
            if (!ok) return;
            Lib.remove(id).then(function () { U.toast('Đã xóa đề.', 'success'); render(); })
              .catch(function (err) { U.toast('Không xóa được: ' + err.message, 'error'); });
          });
      }
      else if (act === 'del-attempt') {
        U.confirm('Xóa bài làm này?', 'Kết quả của lần làm bài này sẽ bị xóa vĩnh viễn.', 'Xóa', { danger: true }).then(function (ok) {
          if (ok) { global.Attempts.remove(id); render(); }
        });
      }
    }

    root.addEventListener('click', onClick);
    render();
    return function () { root.removeEventListener('click', onClick); };
  }

  function heroMock() {
    return '<div class="mock">' +
      '<div class="mock-head"><div class="mock-l"><i></i><i class="s"></i></div><div class="mock-c"><b>32:47</b><i class="pill"></i></div><div class="mock-r"><i class="ic"></i><i class="ic"></i><i class="ic"></i></div></div>' +
      '<div class="mock-dash"></div>' +
      '<div class="mock-body">' +
      '<div class="mock-q"><div class="mock-qbar"><span class="mock-num">7</span><i class="mock-mark"></i><span class="mock-abc">ABC</span></div>' +
      '<i class="ln"></i><i class="ln"></i><i class="ln short"></i>' +
      '<div class="mock-choice"><span>A</span><i></i></div>' +
      '<div class="mock-choice is-sel"><span>B</span><i></i></div>' +
      '<div class="mock-choice"><span>C</span><i></i></div>' +
      '<div class="mock-choice"><span>D</span><i></i></div>' +
      '</div></div>' +
      '<div class="mock-dash"></div>' +
      '<div class="mock-foot"><i class="nm"></i><span class="mock-nav">Question 7 of 25</span><span class="mock-btns"><i></i><i></i></span></div>' +
      '</div>';
  }

  global.Views = global.Views || {};
  global.Views.home = HomeView;
})(window);
