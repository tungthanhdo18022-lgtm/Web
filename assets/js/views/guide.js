/* Trang hướng dẫn + bảng cú pháp soạn đề. */
(function (global) {
  'use strict';

  var U = global.U;

  function code(s) { return '<pre class="code"><code>' + U.esc(s) + '</code></pre>'; }

  function syntaxHtml() {
    return '<div class="syntax">' +
      '<h3>1. Câu trắc nghiệm</h3>' +
      '<p>Mỗi câu bắt đầu bằng <b>số thứ tự</b> và dấu chấm. Các lựa chọn bắt đầu bằng <code>A.</code> <code>B.</code> <code>C.</code> <code>D.</code>, sau đó là dòng <code>Answer:</code>.</p>' +
      code('1. If $3x + 5 = 20$, what is the value of $x$?\nA. $3$\nB. $5$\nC. $15$\nD. $25$\nAnswer: B') +
      '<h3>2. Câu điền đáp án (Student-produced response)</h3>' +
      '<p>Không ghi lựa chọn A–D. Đáp án có thể là số nguyên, thập phân hoặc phân số. Nhiều đáp án đúng thì ngăn cách bằng <code>|</code>.</p>' +
      code('2. What is the value of $\\dfrac{3}{4} + \\dfrac{1}{8}$?\nAnswer: 7/8 | .875') +
      '<p class="muted">Trang web tự chấm theo luật SAT: <code>7/8</code>, <code>.875</code>, <code>0.875</code> đều đúng; số thập phân dài được chấp nhận nếu điền đủ ô và làm tròn/cắt bớt đúng (vd. 2/3 → .6666, .6667, 0.667).</p>' +
      '<h3>3. Công thức toán (LaTeX)</h3>' +
      '<ul><li><code>$x^2 + 1$</code> — công thức trong dòng</li>' +
      '<li><code>$$f(x) = \\dfrac{1}{x}$$</code> — công thức riêng một dòng, căn giữa (cũng dùng được <code>\\[ ... \\]</code>)</li>' +
      '<li><code>\\$165</code> — ký hiệu đô-la thường (tiền)</li>' +
      '<li>Dùng được hầu hết lệnh LaTeX: <code>\\frac</code>, <code>\\sqrt</code>, <code>\\le</code>, <code>\\pi</code>, <code>\\overline{AB}</code>, <code>\\begin{cases}</code>…</li></ul>' +
      '<h3>4. Chữ đậm, nghiêng, xuống dòng</h3>' +
      '<p><code>**đậm**</code>, <code>*nghiêng*</code>, <code>__gạch chân__</code>. Để xuống đoạn mới, để trống một dòng.</p>' +
      '<h3>5. Bảng</h3>' +
      code('| Daily high temperature, $t$ (°F) | Frequency (days) |\n|:---:|:---:|\n| $10 < t \\le 15$ | 1 |\n| $15 < t \\le 20$ | 2 |') +
      '<h3>6. Hình ảnh</h3>' +
      '<p>Bấm nút <b>Ảnh</b> hoặc <b>dán ảnh (Ctrl+V)</b> trực tiếp vào ô soạn — trang web tự chèn <code>![Hình|320](asset:img-…)</code>. Số <code>320</code> là chiều rộng (px). Cũng có thể dùng đường dẫn: <code>![Hình](tests/images/hinh1.png)</code>. Hình vẽ SVG có thể dán thẳng vào nội dung câu.</p>' +
      '<h3>7. Lời giải &amp; dạng bài (không bắt buộc)</h3>' +
      code('Answer: C\nDomain: Advanced Math\nExplanation: Lời giải hiển thị khi xem lại bài sau khi nộp.') +
      '<p class="muted">Dạng bài: <i>Algebra</i>, <i>Advanced Math</i>, <i>Problem-Solving and Data Analysis</i>, <i>Geometry and Trigonometry</i> — dùng để thống kê kết quả theo dạng.</p>' +
      '<h3>8. Bảng đáp án ở cuối đề (thay cho từng dòng Answer)</h3>' +
      code('Answer Key\n1. 14\n2. B\n3. C\n21. 441/677') +
      '<h3>9. Chia nhiều module (giống SAT thật: 2 module × 22 câu × 35 phút)</h3>' +
      code('## Module 1 | 35\n1. ...\n\n## Module 2 | 35\n1. ...') +
      '</div>';
  }

  function GuideView(root) {
    root.innerHTML =
      '<div class="page narrow guide">' +
      '<a class="back-link" href="#/">' + U.icon('chevronLeft') + 'Thư viện đề</a>' +
      '<h1>Hướng dẫn</h1>' +
      '<nav class="toc"><a href="#g-lam-bai" data-scroll>Làm bài</a><a href="#g-them-de" data-scroll>Thêm đề mới</a><a href="#g-web" data-scroll>Đưa đề lên website</a><a href="#g-cu-phap" data-scroll>Cú pháp soạn đề</a><a href="#g-latex" data-scroll>Nhập từ LaTeX</a><a href="#g-luu" data-scroll>Lưu trữ</a></nav>' +

      '<section class="card guide-sec" id="g-lam-bai"><h2>' + U.icon('play') + 'Làm bài như trên Bluebook</h2>' +
      '<ul class="feature-list">' +
      '<li><b>Đồng hồ</b> ở giữa thanh trên cùng; bấm <b>Hide</b> để ẩn. Hết giờ sẽ tự nộp bài.</li>' +
      '<li><b>Calculator</b>: máy tính Desmos (Graphing &amp; Scientific) — cần Internet.</li>' +
      '<li><b>Reference</b>: tờ công thức SAT Math.</li>' +
      '<li><b>Mark for Review</b> để đánh dấu câu, <b>ABC</b> để gạch bỏ lựa chọn.</li>' +
      '<li>Nút <b>Question X of Y</b> ở dưới cùng mở bảng điều hướng; câu cuối cùng dẫn tới trang <b>Check Your Work</b>.</li>' +
      '<li>Bài làm <b>tự động lưu</b>: thoát ra (More → Save and Exit) rồi quay lại làm tiếp bất cứ lúc nào.</li>' +
      '<li>Nộp bài xong sẽ có điểm, thống kê theo dạng, và xem lại từng câu kèm lời giải.</li>' +
      '</ul></section>' +

      '<section class="card guide-sec" id="g-them-de"><h2>' + U.icon('upload') + 'Thêm đề mới</h2>' +
      '<ol class="steps">' +
      '<li><b>Soạn trực tiếp:</b> vào <a href="#/builder">Tạo đề mới</a>, gõ hoặc dán đề theo cú pháp bên dưới, xem trước ngay bên phải, rồi bấm <b>Lưu vào thư viện</b>.</li>' +
      '<li><b>Tải file lên:</b> ở trang chủ bấm <b>Tải đề lên</b> và chọn file <code>.json</code> (xuất từ trang này), <code>.txt</code> (định dạng văn bản) hoặc <code>.tex</code> (LaTeX).</li>' +
      '<li><b>Từ file PDF:</b> mở trang Tạo đề, chép chữ từ PDF vào, thêm <code>$...$</code> cho công thức và <code>Answer:</code> cho đáp án. Hình vẽ: chụp màn hình rồi dán (Ctrl+V).</li>' +
      '</ol></section>' +

      '<section class="card guide-sec" id="g-web"><h2>' + U.icon('book') + 'Đưa đề lên website cho mọi người</h2>' +
      '<p>Đề tải lên bằng trình duyệt chỉ nằm trên máy của bạn. Để <b>mọi người</b> truy cập website đều thấy đề:</p>' +
      '<ol class="steps">' +
      '<li>Mở đề trong trang <b>Tạo đề</b> → <b>Xuất file</b> → <b>File .js cho thư mục tests/</b>.</li>' +
      '<li>Chép file vừa tải vào thư mục <code>tests/</code> của mã nguồn website.</li>' +
      '<li>Mở <code>tests/manifest.js</code>, thêm tên file vào danh sách:' + code("SATLibrary.manifest([\n  'september-2026.js',\n  'ten-de-moi.js'\n]);") + '</li>' +
      '<li>Commit &amp; push lên GitHub. Nếu dùng GitHub Pages, trang sẽ tự cập nhật sau ít phút.</li>' +
      '</ol></section>' +

      '<section class="card guide-sec" id="g-cu-phap"><h2>' + U.icon('edit') + 'Cú pháp soạn đề</h2>' + syntaxHtml() + '</section>' +

      '<section class="card guide-sec" id="g-latex"><h2>' + U.icon('code') + 'Nhập đề từ LaTeX</h2>' +
      '<p>Nếu bạn soạn đề bằng LaTeX, dùng <b>Tạo đề → Nhập LaTeX</b> (hoặc tải thẳng file <code>.tex</code>). Trang web nhận diện:</p>' +
      '<ul class="feature-list"><li><code>\\begin{enumerate} \\item …</code> — mỗi <code>\\item</code> là một câu hỏi.</li>' +
      '<li>Danh sách lồng bên trong (<code>enumerate</code>, <code>choices</code>, <code>tasks</code>) — các lựa chọn A, B, C, D. Lớp <code>exam</code>: <code>\\CorrectChoice</code> được hiểu là đáp án đúng.</li>' +
      '<li><code>$…$</code>, <code>\\[…\\]</code>, <code>align</code>, <code>gather</code>, <code>tabular</code>, <code>\\textbf</code>, <code>\\textit</code>…</li>' +
      '<li>Bảng đáp án có tiêu đề <i>Answer Key</i> (bảng <code>tabular</code> 2 cột: câu &amp; đáp án).</li>' +
      '<li>Hình <b>TikZ</b> không chuyển được: trang sẽ đánh dấu chỗ cần chèn ảnh.</li></ul></section>' +

      '<section class="card guide-sec" id="g-luu"><h2>' + U.icon('history') + 'Lưu trữ dữ liệu</h2>' +
      '<p>Đề tự tạo, bài đang làm và lịch sử điểm được lưu trong trình duyệt (IndexedDB/localStorage) — không gửi đi đâu cả. Xóa dữ liệu trình duyệt sẽ mất các đề này, vì vậy hãy <b>Xuất file JSON</b> để sao lưu.</p></section>' +
      '</div>';

    function onClick(e) {
      var a = e.target.closest('[data-scroll]');
      if (!a) return;
      e.preventDefault();
      var t = document.querySelector(a.getAttribute('href'));
      if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    root.addEventListener('click', onClick);
    return function () { root.removeEventListener('click', onClick); };
  }

  global.Views = global.Views || {};
  global.Views.guide = GuideView;
  global.Views.guideSyntaxHtml = syntaxHtml;
})(window);
