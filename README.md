# SAT Math Practice

Trang web luyện đề **SAT Math** với giao diện mô phỏng **Bluebook** (Digital SAT):
đồng hồ đếm ngược, máy tính Desmos, tờ công thức (Reference), *Mark for Review*,
gạch đáp án (ABC), bảng điều hướng *Question X of Y*, trang *Check Your Work*,
chấm điểm tức thì và xem lại từng câu kèm lời giải.

Đề mẫu có sẵn: **September 2026** (25 câu, 16 trắc nghiệm + 9 điền đáp án).

## Chạy trang web

Trang web là HTML/CSS/JS thuần, **không cần cài đặt hay build**.

- Mở trực tiếp file `index.html` bằng trình duyệt, **hoặc**
- Chạy một máy chủ tĩnh bất kỳ trong thư mục này, ví dụ `npx serve .` rồi mở địa chỉ được in ra.

### Đưa lên mạng bằng GitHub Pages

1. Vào repo trên GitHub → **Settings** → **Pages**.
2. *Source*: **Deploy from a branch** → chọn nhánh `main`, thư mục `/ (root)` → **Save**.
3. Sau 1–2 phút trang sẽ có ở `https://<tên-tài-khoản>.github.io/<tên-repo>/`.

## Thêm đề mới

| Cách | Ai thấy đề? |
|---|---|
| Trang **Tạo đề** → gõ/dán đề → **Lưu vào thư viện** | Chỉ trình duyệt của bạn |
| Nút **Tải đề lên** → chọn file `.json`, `.txt` hoặc `.tex` | Chỉ trình duyệt của bạn |
| Thêm file vào thư mục `tests/` (xem bên dưới) | **Mọi người** truy cập website |

Để đưa đề lên website cho mọi người:

1. Mở đề trong trang **Tạo đề** → **Xuất file** → **File .js cho thư mục tests/**.
2. Chép file đó vào thư mục `tests/`.
3. Thêm tên file vào `tests/manifest.js`:

   ```js
   SATLibrary.manifest([
     'september-2026.js',
     'ten-de-moi.js'
   ]);
   ```

4. Commit & push.

### Định dạng đề (văn bản)

```text
---
title: Tên đề
author: Tác giả
time: 40
---

1. If $3x + 5 = 20$, what is the value of $x$?
A. $3$
B. $5$
C. $15$
D. $25$
Answer: B
Domain: Algebra
Explanation: $3x = 15$, so $x = 5$.

2. Câu điền đáp án (không có A–D). Nhiều đáp án đúng ngăn cách bằng |
Answer: 441/677 | .6514
```

- Công thức: `$...$` (trong dòng), `$$...$$` hoặc `\[...\]` (riêng dòng). Ký hiệu tiền: `\$165`.
- Bảng: cú pháp Markdown `| a | b |`. Ảnh: nút **Ảnh** hoặc dán ảnh (Ctrl+V) trong trang Tạo đề.
- Nhiều module: dòng `## Module 1 | 35` (35 = số phút).
- Bảng đáp án ở cuối đề: dòng `Answer Key` rồi `1. B`, `2. 14`, …
- **LaTeX**: trang Tạo đề → **Nhập LaTeX** (hoặc tải file `.tex`) tự chuyển `\begin{enumerate}\item …`,
  danh sách lựa chọn lồng nhau, công thức, `tabular` và bảng *Answer Key*. Hình TikZ cần chèn lại bằng ảnh.

Xem chi tiết trong trang **Hướng dẫn** của website.

### Chấm câu điền đáp án

Theo luật Digital SAT: phân số / số thập phân tương đương đều đúng (`7/2` = `3.5` = `3.50`);
số thập phân dài được chấp nhận khi điền đủ ô (5 ký tự, 6 nếu là số âm) và được làm tròn
hoặc cắt bớt đúng (`2/3` → `.6666`, `.6667`, `0.666`, `0.667`).

## Cấu trúc thư mục

```text
index.html              Trang chính (ứng dụng một trang, điều hướng bằng #)
assets/css/app.css      Giao diện chung
assets/css/exam.css     Giao diện làm bài kiểu Bluebook
assets/js/config.js     Cấu hình (tên trang, khóa API Desmos, thời gian mặc định)
assets/js/render.js     Hiển thị nội dung: KaTeX + Markdown + lọc HTML an toàn
assets/js/parser.js     Đọc đề dạng văn bản / JSON
assets/js/latex.js      Chuyển đề LaTeX sang định dạng văn bản
assets/js/grading.js    Chấm điểm
assets/js/store.js      Thư viện đề (IndexedDB) + lượt làm bài (localStorage)
assets/js/views/        Các trang: home, intro, exam, results, builder, guide
tests/manifest.js       Danh sách đề có sẵn
tests/*.js              Các đề có sẵn
vendor/katex/           KaTeX 0.16.22 (hiển thị công thức, chạy được không cần mạng)
```

## Ghi chú

- Máy tính dùng **Desmos API** với khóa demo công khai (`assets/js/config.js`). Nếu đưa lên mạng cho
  nhiều người dùng, nên đăng ký khóa riêng tại <https://www.desmos.com/my-api>. Máy tính cần Internet.
- Đề tự tạo, bài đang làm và lịch sử điểm được lưu trong trình duyệt — hãy **Xuất file JSON** để sao lưu.
- Điểm 200–800 chỉ là **ước tính** theo tỉ lệ câu đúng, không phải điểm chính thức.
- Dự án không liên kết với College Board. SAT® là thương hiệu của College Board.
