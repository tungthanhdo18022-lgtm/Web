/* Trang giới thiệu đề trước khi làm bài. */
(function (global) {
  'use strict';

  var U = global.U;

  function IntroView(root, params) {
    var test = global.SATLibrary.get(params.id);
    if (!test) {
      root.innerHTML = '<div class="page narrow"><div class="empty-state">' + U.icon('warn') +
        '<h2>Không tìm thấy đề</h2><p>Đề này không tồn tại hoặc đã bị xóa.</p><a class="btn btn--primary" href="#/">Về thư viện</a></div></div>';
      return null;
    }
    var A = global.Attempts;
    var settings = global.Settings.get();
    var mode = settings.timed === false ? 'untimed' : 'timed';

    function render() {
      var prog = A.inProgress(test.id);
      var done = A.forTest(test.id).filter(function (a) { return a.status === 'completed' && a.result; });
      var mcq = 0, spr = 0;
      test.modules.forEach(function (m) { m.questions.forEach(function (q) { if (q.type === 'mcq') mcq++; else spr++; }); });

      var progInfo = '';
      if (prog) {
        var m = test.modules[prog.moduleIndex] || test.modules[0];
        var ms = prog.modules[prog.moduleIndex] || { elapsed: 0, current: 0 };
        var left = prog.timed ? Math.max(0, (m.time * 60) - (ms.elapsed || 0)) : null;
        progInfo = 'Đang ở câu ' + ((ms.current || 0) + 1) + '/' + m.questions.length +
          (test.modules.length > 1 ? ' (module ' + (prog.moduleIndex + 1) + ')' : '') +
          ' · đã trả lời ' + Object.keys(prog.answers || {}).length + ' câu' +
          (left != null ? ' · còn ' + U.fmtClock(left) : ' · không tính giờ');
      }

      root.innerHTML =
        '<div class="page narrow">' +
        '<a class="back-link" href="#/">' + U.icon('chevronLeft') + 'Thư viện đề</a>' +
        '<div class="intro-card">' +
        '<div class="intro-head">' +
        '<div class="intro-icon">' + U.icon('sigma') + '</div>' +
        '<div><h1>' + U.esc(test.title || 'Đề không tên') + '</h1>' +
        '<p class="muted">' + (test.author ? 'Tác giả: ' + U.esc(test.author) : 'SAT Math') + '</p></div>' +
        '</div>' +
        (test.description ? '<p class="intro-desc">' + U.esc(test.description) + '</p>' : '') +
        '<div class="facts">' +
        fact('Số câu', test.questionCount) +
        fact('Thời gian', Math.round(test.totalTime) + ' phút') +
        fact('Trắc nghiệm', mcq) +
        fact('Điền đáp án', spr) +
        (test.modules.length > 1 ? fact('Module', test.modules.length) : '') +
        '</div>' +
        (test.modules.length > 1 ? '<ol class="module-list">' + test.modules.map(function (m) {
          return '<li><b>' + U.esc(m.title) + '</b><span>' + m.questions.length + ' câu · ' + m.time + ' phút</span></li>';
        }).join('') + '</ol>' : '') +

        (prog ? '<div class="alert alert--info">' + U.icon('history') + '<div><b>Bạn có một bài đang làm dở.</b><br>' + progInfo + '</div></div>' : '') +

        '<div class="form-grid">' +
        '<label class="field"><span class="field-label">Tên hiển thị khi làm bài</span>' +
        '<input id="intro-name" type="text" maxlength="40" placeholder="Ví dụ: Nguyễn Văn A" value="' + U.esc(settings.name || '') + '"></label>' +
        '<div class="field"><span class="field-label">Chế độ</span><div class="mode-pick" role="radiogroup">' +
        modeCard('timed', 'Tính giờ', Math.round(test.totalTime) + ' phút, tự nộp khi hết giờ — giống thi thật', U.icon('clock')) +
        modeCard('untimed', 'Không tính giờ', 'Đồng hồ đếm lên, làm thoải mái để luyện', U.icon('book')) +
        '</div></div>' +
        '</div>' +

        '<ul class="tool-list">' +
        '<li>' + U.icon('calculator') + '<span><b>Máy tính Desmos</b> Graphing &amp; Scientific</span></li>' +
        '<li>' + U.icon('reference') + '<span><b>Reference</b> tờ công thức SAT</span></li>' +
        '<li>' + U.icon('bookmark') + '<span><b>Mark for Review</b> đánh dấu câu</span></li>' +
        '<li><span class="abc-mini">ABC</span><span><b>Cross out</b> gạch bỏ đáp án</span></li>' +
        '</ul>' +

        '<div class="intro-actions">' +
        (prog
          ? '<a class="btn btn--primary btn--lg" href="#/exam/' + encodeURIComponent(prog.id) + '">' + U.icon('play') + 'Tiếp tục làm bài</a>' +
          '<button class="btn btn--ghost btn--lg" data-act="restart">' + U.icon('refresh') + 'Làm lại từ đầu</button>'
          : '<button class="btn btn--primary btn--lg" data-act="start">' + U.icon('play') + 'Bắt đầu làm bài</button>') +
        '</div>' +
        '</div>' +

        (done.length ? '<div class="section"><h2 class="h3">Các lần làm trước</h2><div class="attempt-list">' +
          done.map(function (a) {
            return '<a class="attempt-row" href="#/results/' + encodeURIComponent(a.id) + '">' +
              '<span class="score-pill ' + (a.result.percent >= 80 ? 'is-good' : a.result.percent >= 50 ? 'is-mid' : 'is-low') + '">' + a.result.correct + '/' + a.result.total + '</span>' +
              '<span class="attempt-row-main"><b>' + U.fmtDate(a.finishedAt) + '</b><span>' + (a.timed ? 'Tính giờ' : 'Không tính giờ') + ' · ' + U.fmtDuration(a.totalElapsed || 0) + ' · ước tính ' + a.result.estimated + '</span></span>' +
              U.icon('chevronRight') + '</a>';
          }).join('') + '</div></div>' : '') +
        '</div>';
    }

    function fact(label, value) {
      return '<div class="fact"><span>' + label + '</span><b>' + value + '</b></div>';
    }
    function modeCard(value, title, desc, icon) {
      var on = mode === value;
      return '<button type="button" class="mode-card' + (on ? ' is-on' : '') + '" role="radio" aria-checked="' + on + '" data-mode="' + value + '">' +
        '<span class="mode-icon">' + icon + '</span><span><b>' + title + '</b><small>' + desc + '</small></span></button>';
    }

    function start() {
      var nameEl = document.getElementById('intro-name');
      var name = nameEl ? nameEl.value.trim() : '';
      global.Settings.set({ name: name, timed: mode === 'timed' });
      var a = A.create(test, { name: name, timed: mode === 'timed' });
      location.hash = '#/exam/' + encodeURIComponent(a.id);
    }

    function onClick(e) {
      var m = e.target.closest('[data-mode]');
      if (m) {
        mode = m.getAttribute('data-mode');
        U.$$('.mode-card', root).forEach(function (c) {
          var on = c.getAttribute('data-mode') === mode;
          c.classList.toggle('is-on', on);
          c.setAttribute('aria-checked', String(on));
        });
        return;
      }
      var b = e.target.closest('[data-act]');
      if (!b) return;
      var act = b.getAttribute('data-act');
      if (act === 'start') start();
      if (act === 'restart') {
        U.confirm('Làm lại từ đầu?', 'Bài đang làm dở sẽ bị xóa và bạn bắt đầu một bài mới.', 'Làm lại', { danger: true }).then(function (ok) {
          if (!ok) return;
          var p = A.inProgress(test.id);
          if (p) A.remove(p.id);
          start();
        });
      }
    }

    root.addEventListener('click', onClick);
    render();
    return function () { root.removeEventListener('click', onClick); };
  }

  global.Views = global.Views || {};
  global.Views.intro = IntroView;
})(window);
