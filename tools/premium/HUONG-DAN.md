# Hướng dẫn tunn.sat Premium (dành cho chủ trang)

Premium mở khóa các bài **Advanced Tests** và các bài **Practice Tests có đánh dấu Premium** (hiện là các đề năm
2026; chỉ đề 2025 miễn phí) trên tunn.sat. Bạn bán cho học sinh một **mã** dạng
`TUNN-XXXX-XXXX-XXXX`. Mỗi mã chỉ dùng được trên **một thiết bị** tại một thời điểm.

Việc kiểm tra mã do một "máy chủ" nhỏ làm. Máy chủ này là một đoạn mã Google Apps Script, gắn với một
Google Sheet của chính bạn. Bạn quản lý mã ngay trong Google Sheet đó. Tất cả đều miễn phí.

**Bạn cần chuẩn bị:**

- Một tài khoản Google (nên dùng Gmail cá nhân).
- File `Code.gs`: nằm trong thư mục `tools/premium/server/` của trang web. Lập trình viên sẽ gửi cho bạn.
- File `private-key.json` (**khóa bí mật**): lập trình viên gửi riêng cho bạn. Đây là file quan trọng nhất.
  Không gửi cho ai khác. Xem [Phần 4](#phần-4-giữ-khóa-bí-mật).

Giao diện Google có thể là tiếng Anh hoặc tiếng Việt. Hướng dẫn ghi cả hai, ví dụ: **Deploy** (Triển khai).

---

## Phần 1. Cài đặt lần đầu (khoảng 15 phút)

### Bước 1. Tạo Google Sheet

1. Mở <https://sheets.google.com>.
2. Bấm **Blank** (Trang tính trống).
3. Đặt tên file, ví dụ `tunn.sat Premium`.
4. Kiểm tra múi giờ: menu **File** (Tệp) → **Settings** (Cài đặt) → **Time zone** (Múi giờ) phải là
   **(GMT+07:00)** (Bangkok, Hanoi hoặc Ho Chi Minh đều được). Bấm **Save settings** (Lưu cài đặt).
   Nhờ vậy các ngày giờ trong trang tính hiện theo giờ Việt Nam.

### Bước 2. Mở Apps Script

1. Trong Google Sheet, bấm menu **Extensions** (Tiện ích mở rộng) → **Apps Script**.
2. Một tab mới mở ra. Bấm vào chữ "Untitled project" (Dự án không có tiêu đề) và đặt tên, ví dụ `tunn.sat Premium`.

### Bước 3. Dán mã

1. Ô soạn thảo đang có sẵn vài dòng mẫu (`function myFunction() { … }`).
2. Bấm vào ô soạn thảo, nhấn **Ctrl+A** (Mac: **Cmd+A**), rồi nhấn **Delete**. Ô phải trống hoàn toàn.
3. Mở file `Code.gs`. Chọn **toàn bộ** nội dung (Ctrl+A), sao chép (Ctrl+C).
4. Dán vào ô soạn thảo (Ctrl+V).
5. Bấm nút **Save** (Lưu, hình đĩa mềm) hoặc nhấn Ctrl+S.

> Kiểm tra: dòng đầu tiên phải là `/** @OnlyCurrentDoc */`. Dòng cuối là dấu `}`.

### Bước 4. Tải lại Google Sheet

1. Quay lại tab Google Sheet.
2. Nhấn **F5** (hoặc nút tải lại trang của trình duyệt).
3. Đợi vài giây. Menu **tunn.sat Premium** xuất hiện ở thanh menu, bên phải menu Help (Trợ giúp).
4. Ba trang tính **Codes**, **Settings**, **Log** được tạo tự động. Nếu chưa thấy cũng không sao: chúng sẽ được tạo ở bước 5.

### Bước 5. Cài khóa bí mật

1. Bấm menu **tunn.sat Premium** → **Cài đặt khóa bí mật…**
2. Lần đầu tiên, Google hỏi quyền (xem khung bên dưới). Cấp quyền xong, bấm lại **Cài đặt khóa bí mật…**
   (lần bấm đầu chỉ dùng để cấp quyền).
3. Mở file `private-key.json` bằng Notepad (Windows) hoặc TextEdit (Mac).
4. Chọn tất cả (Ctrl+A), sao chép (Ctrl+C).
5. Dán vào ô trong hộp thoại (Ctrl+V), bấm **OK**.
6. Thấy thông báo **Đã cài khóa bí mật** là xong.

Nếu thấy **Chưa cài được khóa**: đọc lý do trong thông báo. Thường là dán nhầm file hoặc dán thiếu.
Xem [Phần 6](#phần-6-xử-lý-sự-cố).

> **Màn hình cấp quyền của Google (chỉ lần đầu)**
>
> 1. Hộp thoại **Authorization required** (Cần cấp quyền) → bấm **Continue** (Tiếp tục).
> 2. Chọn tài khoản Google của bạn.
> 3. Màn hình **Google hasn't verified this app** (Google chưa xác minh ứng dụng này) hiện ra.
>    Điều này **bình thường**: đây là script của chính bạn, Google chưa duyệt nó vì nó không công khai.
> 4. Bấm **Advanced** (Nâng cao) → **Go to tunn.sat Premium (unsafe)** (Đi tới … (không an toàn)).
> 5. Bấm **Allow** (Cho phép).
>
> Script chỉ xin quyền với **chính file Google Sheet này** và quyền hiện hộp thoại. Nó không đọc Gmail
> hay Drive của bạn.

### Bước 6. Kiểm tra cài đặt

1. Bấm menu **tunn.sat Premium** → **Kiểm tra cài đặt**.
2. Tiêu đề hộp thoại phải là **Kiểm tra cài đặt: OK**, và phải có dòng "Khóa khớp với khóa công khai của trang web".
   Dòng **[LƯU Ý]** chỉ để bạn biết, không cần làm gì.
3. Nếu có dòng **[CẦN SỬA]**: làm theo lời nhắn trong dòng đó, rồi chạy lại **Kiểm tra cài đặt**.

Sau này, mỗi khi bạn sửa tay trang **Codes** (gõ ngày, đổi Status, dán mã…), nên chạy lại **Kiểm tra cài đặt**:
nó chỉ ra từng ô máy chủ không đọc được (ví dụ "dòng 12: cột Expires … không phải ngày giờ hợp lệ"),
mã bị trùng và mã gõ sai.

### Bước 7. Triển khai (Deploy) thành web app

1. Quay lại tab Apps Script.
2. Bấm nút **Deploy** (Triển khai) ở góc trên bên phải → **New deployment** (Tùy chọn triển khai mới).
3. Bấm hình bánh răng cạnh chữ **Select type** (Chọn loại) → chọn **Web app** (Ứng dụng web).
4. **Description** (Mô tả): gõ `tunn.sat Premium`.
5. **Execute as** (Thực thi dưới dạng): chọn **Me** (Tôi – email của bạn).
6. **Who has access** (Người có quyền truy cập): chọn **Anyone** (Bất kỳ ai).
   Không chọn "Anyone with Google account": học sinh sẽ không dùng được.
7. Bấm **Deploy** (Triển khai). Nếu Google hỏi quyền lần nữa, làm như khung ở bước 5.
8. Google hiện **Web app URL**: một địa chỉ dạng `https://script.google.com/macros/s/……/exec`.
   Bấm **Copy** (Sao chép). Địa chỉ phải kết thúc bằng **`/exec`** (không phải `/dev`).

Kiểm tra nhanh: dán địa chỉ đó vào trình duyệt. Bạn sẽ thấy dòng chữ
`{"ok":true,"service":"tunn.sat premium","version":1}`.

### Bước 8. Gắn địa chỉ vào trang web

Gửi địa chỉ `/exec` cho lập trình viên. Địa chỉ này **không phải bí mật**: nó nằm công khai trong mã trang web.
Máy chủ chỉ trả khóa cho mã hợp lệ, nên để lộ địa chỉ không sao.

Nếu bạn tự làm: trong file `assets/js/config.js`, tìm phần `premium` và dán địa chỉ vào `api`:

```js
premium: {
  api: 'https://script.google.com/macros/s/……/exec',
  contact: { text: 'Zalo 0900 000 000', url: 'https://zalo.me/0900000000' }
},
```

`contact` là nơi học sinh liên hệ mua mã (có thể để `null`).

Xong! Trang web đã bán được mã.

---

## Phần 2. Bán mã hằng ngày

### Tạo mã mới

1. Bấm menu **tunn.sat Premium** → **Tạo mã mới…**
2. Trả lời 3 câu hỏi:
   - **Bao nhiêu mã?** Một số từ 1 đến 500.
   - **Bao nhiêu ngày?** Số ngày mã dùng được, **tính từ lúc học sinh kích hoạt** (lần đầu nhập mã),
     không phải từ hôm nay. Ví dụ `30`, `90`, `365`. Nhập `0` hoặc để trống = **dùng vĩnh viễn**.
   - **Ghi chú** (không bắt buộc): tên người mua, lớp, đợt bán… Chỉ bạn thấy.
3. Một cửa sổ hiện danh sách mã. Bấm **Sao chép tất cả** để copy.
4. Các mã cũng được lưu trong trang **Codes**, với Status = `new`.

Mỗi người mua nên có **một mã riêng** và một dòng Ghi chú (Note) riêng, để sau này dễ tìm.

### Mã trông như thế nào

- Dạng **`TUNN-XXXX-XXXX-XXXX`**, ví dụ `TUNN-7KQ4-M2XD-9HPK`.
- 12 ký tự sau `TUNN-` gồm chữ số và chữ in hoa. Không bao giờ có các chữ I, L, O, U (dễ nhầm).
- Học sinh gõ sao cũng được: chữ thường, thiếu dấu gạch, có dấu cách, không gõ `TUNN-`.
  Gõ chữ O thay cho số 0, chữ I hay L thay cho số 1 cũng được. Dán nguyên tin nhắn có mã
  (ví dụ "Mã của em: TUNN-…") cũng được: trang web tự lấy mã ra.
- Ký tự cuối là ký tự kiểm tra: gõ sai một ký tự thì trang web báo "mã không đúng" ngay.

### Đưa mã cho học sinh

1. Gửi mã riêng cho từng người (tin nhắn Zalo, Messenger, email…).
2. Dặn học sinh mở tunn.sat bằng **trình duyệt sẽ dùng để học**: Chrome, Safari, Edge hoặc Firefox.
   **Không** mở link ngay trong Zalo/Facebook/Messenger. Trình duyệt bên trong các ứng dụng đó được tính là
   một thiết bị khác. Hãy copy link rồi dán vào Chrome hoặc Safari.
3. Học sinh mở một bài Premium (Advanced, hoặc đề Practice có ổ khóa) → bấm **Unlock with a code** → nhập mã → **Unlock**.
4. Mã gắn vào thiết bị đó. Tất cả bài Premium mở trên thiết bị đó, kể cả khi mất mạng.

### Mã cho chính bạn (để xem và sửa bài Premium)

Trên trang web, bài Premium cũng bị khóa với bạn cho tới khi bạn nhập mã. Trang Admin chỉ sửa được bài
Premium trên trình duyệt đã mở khóa (bài khóa chỉ gỡ được, không sửa được).

1. Tạo **một mã vĩnh viễn** cho mình: **Tạo mã mới…** → 1 mã, Days = `0`, Ghi chú `Chủ trang`.
2. Mở tunn.sat bằng trình duyệt bạn dùng để vào trang Admin, rồi nhập mã đó.
3. Mỗi máy hoặc trình duyệt khác của bạn cần một mã riêng (một mã = một thiết bị).

Đăng bài Advanced mới từ trang Admin vẫn làm như cũ: trang tự mã hóa bài ngay trong trình duyệt trước khi
đưa lên GitHub, không cần mã.

### Khóa một đề Practice (Premium)

Đề Practice cũng có thể thu phí: trong trang Admin → soạn đề, ô **Section** chọn **Practice · Premium**
(tương đương dòng `premium: yes` trong phần đầu đề). Đề vẫn nằm trong mục Practice Tests theo năm nhưng có ổ khóa,
và cùng một mã Premium mở được cả đề Advanced lẫn các đề Practice này.

- **Đề mới**: chọn Practice · Premium ngay từ đầu, đề không bao giờ lộ ra dưới dạng chữ.
- **Đề đã đăng miễn phí trước đó**: khóa lại chỉ chặn được người vào trang từ giờ. Nội dung cũ vẫn đọc được trong
  lịch sử GitHub (và ai đã lưu thì vẫn còn). Muốn xóa hẳn khỏi GitHub phải tạo lại repo không lịch sử như đã làm
  ngày 12/10.
- **Mở miễn phí lại**: trước hết nhập mã Premium của bạn trên trình duyệt dùng trang Admin (để mở được đề), mở đề
  trong trang Admin, chọn **Practice** rồi đăng lại.

### Ý nghĩa các cột trong trang Codes

| Cột | Ý nghĩa |
| --- | --- |
| **Code** | Mã. Đừng sửa. |
| **Status** | `new` = chưa dùng · `active` = đang dùng · `expired` = hết hạn · `revoked` = đã thu hồi. |
| **Days** | Số ngày dùng được, tính từ lúc kích hoạt. `0` hoặc trống = vĩnh viễn. |
| **Note** | Ghi chú của bạn (tên người mua…). |
| **Created** | Ngày tạo mã. |
| **Activated** | Lần đầu học sinh nhập mã. |
| **Expires** | Ngày hết hạn. Máy chủ tự điền khi kích hoạt (nếu Days > 0). Trống = vĩnh viễn. |
| **Device** | Mã nhận dạng thiết bị đang dùng, dạng `k_…` (dấu vân tay của khóa riêng trong trình duyệt của học sinh). Mã kích hoạt trước bản cập nhật có thể còn một chuỗi ngẫu nhiên ngắn hơn; nó tự đổi sang `k_…` ở lần kiểm tra kế tiếp. Trống = chưa gắn thiết bị nào. |
| **Device info** | Loại thiết bị, ví dụ `iPhone · Safari`, `Windows · Chrome`. |
| **Last check** | Lần gần nhất trang web của học sinh kiểm tra mã. |
| **Moved** | Lần gần nhất mã đổi sang thiết bị khác. |
| **Moves** | Số lần học sinh tự chuyển mã sang thiết bị khác. |

Không đổi tên các trang tính (Codes, Settings, Log) và không đổi hàng tiêu đề.
Muốn thêm cột riêng (ví dụ số điện thoại người mua), hãy thêm **ở bên phải cột Moves**. Nếu chèn cột vào
giữa, máy chủ sẽ từ chối mọi mã (Log ghi `setup (Codes header changed)`) cho tới khi bạn xóa cột đó đi.
Sắp xếp (sort) hay lọc (filter) các dòng thì không sao.

Nếu một ô máy chủ cần dùng có giá trị lạ (Status không phải 4 giá trị trên, Days không phải số, ngày gõ sai),
máy chủ **từ chối mã đó** thay vì đoán, và ghi `sheet (dòng …: cột …)` vào Log. Học sinh đang dùng mã vẫn mở
được các bài đã mở trên máy mình; học sinh mới thì chưa kích hoạt được. Sửa ô đó là mã dùng lại được ngay.

### Một mã = một thiết bị

- Lần đầu nhập mã, mã được gắn vào thiết bị (đúng hơn: trình duyệt) đó.
- Thiết bị khác nhập cùng mã sẽ bị từ chối. Học sinh thấy thông báo mã đang dùng ở thiết bị khác.
- Trang web kiểm tra lại mã khoảng mỗi ngày một lần.
- **Chép dữ liệu trình duyệt sang máy khác không dùng được.** Mỗi trình duyệt tự tạo một khóa riêng không thể
  xuất ra hay sao chép; máy chủ chỉ gửi khóa mở bài đã khóa lại cho đúng trình duyệt đó. Máy nhận dữ liệu chép
  sang sẽ thấy "Premium has to be set up again in this browser", và nhập mã ở đó thì bị từ chối như một thiết bị khác.
- Vì vậy nếu học sinh **xóa dữ liệu trang web** (hoặc dùng cửa sổ ẩn danh), trình duyệt đó thành "thiết bị mới":
  học sinh nhập lại mã và chờ tới ngày được tự chuyển, hoặc bạn bấm **Gỡ thiết bị**.

### Học sinh tự chuyển sang thiết bị mới ("Move after days")

Trong trang **Settings**, dòng **Move after days** (mặc định `7`):

- Học sinh **tự** chuyển mã sang thiết bị mới được, nhưng **tối đa 1 lần mỗi 7 ngày**
  (tính từ lần kích hoạt hoặc lần chuyển gần nhất). Cách làm: nhập lại mã trên thiết bị mới.
- Thiết bị cũ bị khóa ở lần kiểm tra sau.
- Nếu chưa đủ 7 ngày, học sinh thấy ngày có thể chuyển.
- Đặt `0` = học sinh **không** tự chuyển được. Chỉ bạn chuyển được, bằng **Gỡ thiết bị** (bên dưới).
  Chọn `0` nếu bạn lo học sinh chia sẻ mã cho nhau. Giữ `7` để đỡ phải hỗ trợ.
- Cột **Moves** cho biết mỗi mã đã tự chuyển bao nhiêu lần. Số lớn bất thường = có thể đang chia sẻ mã.

### Gỡ thiết bị (khi học sinh cần đổi máy ngay)

Dùng khi học sinh:

- đổi điện thoại hoặc máy tính, cài lại máy;
- xóa dữ liệu trình duyệt (xóa lịch sử, cookie), hoặc dùng chế độ ẩn danh;
- lỡ mở trang trong Zalo/Facebook, rồi muốn dùng Chrome/Safari (hoặc ngược lại).

Cách làm:

1. Mở trang **Codes**. Tìm mã (Ctrl+F, gõ mã hoặc tên trong Note).
2. Bấm vào một ô bất kỳ trên dòng của mã đó (chọn nhiều dòng liền nhau cũng được; khi đang lọc, các dòng bị
   lọc ẩn đi sẽ không bị đụng tới).
3. Bấm menu **tunn.sat Premium** → **Gỡ thiết bị của mã đang chọn** → **Yes** (Có).
4. Báo học sinh nhập lại mã trên thiết bị mới.

Thời hạn của mã **không thay đổi**. Thiết bị cũ bị khóa ở lần kiểm tra sau. Sau khi kích hoạt lại, học sinh
phải đợi "Move after days" ngày mới tự chuyển tiếp được.

### Thu hồi mã

Dùng khi hoàn tiền, khi mã bị chia sẻ công khai…

- **Cách 1:** bấm vào ô trên dòng của mã → menu **tunn.sat Premium** → **Thu hồi mã đang chọn** → **Yes**.
- **Cách 2:** ở cột **Status**, chọn `revoked` trong danh sách.

Học sinh bị khóa ở lần kiểm tra tiếp theo: thường trong vòng 24 giờ (xem **Refresh hours**), khi học sinh mở
lại trang web. Nếu máy của học sinh không có mạng, các bài đã mở vẫn dùng được tối đa 7 ngày. Muốn mở lại mã:
đổi Status về `active`.

Đừng xóa dòng của mã: bạn sẽ mất lịch sử của mã đó. Hãy thu hồi.

### Gia hạn hoặc đổi thời hạn

- **Mã đã kích hoạt:** sửa ngày ở cột **Expires** (bấm đúp vào ô để chọn trên lịch, hoặc gõ
  `2027-12-31 23:59`). Ô Expires có cả giờ: gõ `2027-12-31` (không có giờ) nghĩa là hết hạn lúc 0 giờ, tức
  **đầu** ngày 31/12/2027. Muốn học sinh dùng hết ngày đó, gõ `2027-12-31 23:59`. Nếu Status đang là `expired`,
  máy chủ tự đổi lại `active` khi học sinh mở lại trang.
- Sửa ô Days của mã **đã kích hoạt** không có tác dụng: khi kích hoạt, máy chủ đã tính và điền sẵn Expires.
  Muốn đổi thời hạn thì sửa Expires.
- **Đổi thành vĩnh viễn:** xóa ô Expires, đặt Days = `0`, đặt Status = `active`.
- **Mã chưa kích hoạt:** chỉ cần sửa cột Days.
- Đừng tự gõ `expired` để khóa mã. Muốn khóa mã, hãy **thu hồi**.

### Trang Settings

| Setting | Mặc định | Ý nghĩa |
| --- | --- | --- |
| **Move after days** | `7` | Sau bao nhiêu ngày học sinh được tự chuyển mã sang thiết bị mới. `0` = chỉ chủ trang. |
| **Refresh hours** | `24` | Cứ bao nhiêu giờ trang web kiểm tra lại mã. Mã bị thu hồi sẽ bị khóa sau tối đa chừng ấy giờ. |

Chỉ sửa cột **Value**. Không đổi tên cột Setting.

### Trang Log

Mỗi lần học sinh nhập mã hoặc trang web kiểm tra mã, một dòng được ghi vào **Log**:
**Time** (giờ), **Action** (việc gì), **Code**, **Device**, **Result** (kết quả).

- Action: `activate` (nhập mã), `refresh` (kiểm tra lại), `create` (tạo mã), `revoke` (thu hồi),
  `reset` (gỡ thiết bị), `install-key` (cài khóa), `rate` (chặn vì thử sai nhiều), `error` (lỗi).
- Result: `ok`, `ok (moved)` (đã chuyển máy), `ok (upgraded)` (mã kích hoạt trước bản cập nhật vừa chuyển sang
  khóa thiết bị `k_…`, không tính là chuyển máy), `notfound`, `device`, `revoked`, `expired`, `invalid`, `setup`,
  `sheet`, `busy`, `update`… (xem [Phần 6](#phần-6-xử-lý-sự-cố)).
- Log giữ khoảng 5000 dòng mới nhất. Log **không** chứa khóa bí mật, nên có thể chụp màn hình gửi lập trình viên.

---

## Phần 2b. Bán Premium bằng chuyển khoản (QR, tự kích hoạt)

Học sinh bấm **Thanh toán** trên trang Practice Tests, chọn gói, quét **mã QR VietQR** bằng app ngân hàng. Nội dung chuyển khoản là mã đơn dạng `TUNNXXXXXXXX`. Khi tiền vào, máy chủ tạo một mã Premium mới và trang web của học sinh **tự kích hoạt** trên đúng máy đã đặt đơn (không cần nhập mã). Mã cũng hiện trên màn hình để học sinh lưu lại.

### Cài đặt lần đầu

1. Trong `assets/js/config.js`, phần `premium.payment`: điền `account` (số tài khoản), `accountName` (tên chủ tài khoản, IN HOA không dấu). `bank: 'MB'` là MB Bank. Khi `account` còn trống, trang web chỉ hiện nút nhập mã.
2. Giá và số ngày của gói nằm ở **hai chỗ, phải giống nhau**: `PREMIUM.PLANS` trong `Code.gs` (máy chủ dùng giá này để kiểm tra số tiền) và `premium.payment.plans` trong `config.js` (giá hiện trên trang).
3. Dán `Code.gs` mới vào Apps Script → **Deploy → Manage deployments → Edit → Version: New version** (đường link /exec giữ nguyên). Tải lại Google Sheet: có thêm trang **Orders**.
4. Menu **tunn.sat Premium → Cài đặt thanh toán (webhook)…**: máy chủ tạo một mã bí mật và hiện phần `?hook=…`.
5. Trên **SePay → Tích hợp WebHooks → Thêm webhook**:
   - Gọi đến URL: đường link Web app (kết thúc bằng `/exec`) **nối thêm** `?hook=…` vừa hiện.
   - Sự kiện: **Có tiền vào**. Chứng thực: **Không cần chứng thực** (mã bí mật đã nằm trong link). Kiểu nội dung: `application/json`.
6. Thử: đặt một đơn trên web, chuyển đúng số tiền với đúng nội dung. Trong vài giây, trang Orders đổi sang `paid` và có mã ở cột Code.

Giữ link webhook bí mật: ai có link đều có thể báo "đã thanh toán". Nếu lộ, chạy lại menu và chọn tạo mã mới, rồi dán link mới vào SePay.

### Trang Orders

| Cột | Ý nghĩa |
|---|---|
| Order | Mã đơn = nội dung chuyển khoản (`TUNNXXXXXXXX`) |
| Status | `pending` chờ tiền · `paid` đã nhận · `expired` quá 24 giờ chưa trả · `cancelled` |
| Plan, Amount, Days | Gói, số tiền phải trả, số ngày dùng (tính từ lúc kích hoạt) |
| Created, Paid | Lúc đặt đơn, lúc nhận tiền |
| Code | Mã Premium tạo cho đơn (cũng có trong trang Codes, ghi chú `Order TUNN…`) |
| Device | Thiết bị đã đặt đơn: chỉ thiết bị này nhận được mã tự động |
| Payment, Note | Mã giao dịch và số tiền; ghi chú khi chuyển thiếu (`Underpaid: …`) |

### Duyệt tay (không cần SePay)

Nếu học sinh chuyển khoản mà đơn vẫn `pending` (chuyển sai nội dung, webhook chưa cài…), bạn kiểm tra tiền trong app ngân hàng rồi đổi **Status** của đơn thành **`paid`**. Lần kiểm tra tiếp theo của trang web (vài giây) sẽ tạo mã và tự kích hoạt. Học sinh đã đóng trang thì lần mở lại sau sẽ tự kích hoạt; hoặc bạn gửi mã ở cột Code cho học sinh.

- Chuyển **thiếu tiền**: đơn giữ `pending`, cột Note ghi số đã nhận. Học sinh chuyển thêm **đủ số tiền** với cùng nội dung, hoặc bạn tự duyệt tay.
- Một đơn chưa trả quá 24 giờ thành `expired`, nhưng nếu tiền vẫn đến sau đó thì đơn vẫn được tính là đã trả.
- Mỗi thiết bị đặt tối đa 5 đơn mỗi giờ.

Trong trang Log, các dòng `webhook` cho biết máy chủ đã làm gì với mỗi giao dịch: `paid · code created`, `underpaid`, `no order reference` (nội dung không có mã đơn), `refused (wrong or missing token)`.

## Phần 3. Cập nhật máy chủ sau này

Khi lập trình viên gửi file `Code.gs` mới:

1. Mở Google Sheet → **Extensions** (Tiện ích mở rộng) → **Apps Script**.
2. Bấm vào ô soạn thảo, Ctrl+A, Delete. Dán **toàn bộ** `Code.gs` mới. Bấm **Save** (Lưu).
3. Bấm **Deploy** (Triển khai) → **Manage deployments** (Quản lý các bản triển khai).
4. Chọn bản triển khai đang dùng → bấm **Edit** (hình bút chì ✏️).
5. Ở ô **Version** (Phiên bản), chọn **New version** (Phiên bản mới).
6. Bấm **Deploy** (Triển khai).
7. Quay lại Google Sheet, tải lại trang (F5), chạy **Kiểm tra cài đặt**.

Địa chỉ `/exec` **giữ nguyên**, không cần sửa trang web. Khóa bí mật vẫn còn, không cần cài lại.

Lưu ý:

- Chỉ bấm Save mà **không** tạo New version thì web app vẫn chạy mã cũ.
- **Không** bấm "New deployment" (Tùy chọn triển khai mới) khi cập nhật: làm vậy sẽ ra một địa chỉ `/exec` mới.

---

## Phần 4. Giữ khóa bí mật

- `private-key.json` là chìa khóa mở **tất cả** bài Premium (Advanced và Practice có khóa). Ai có file này có thể đọc toàn bộ bài.
- Không gửi file vào nhóm chat. Không đưa lên GitHub. Không dán vào đâu khác ngoài menu
  **Cài đặt khóa bí mật…**
- **Sao lưu** file ở nơi an toàn: USB riêng, thư mục Google Drive riêng (không chia sẻ), hoặc trình quản lý
  mật khẩu.
- Sau khi cài, khóa nằm trong Apps Script, mục **Project Settings** (Cài đặt dự án) → **Script Properties**
  (`PRIVATE_KEY_JWK`). Ai có quyền **chỉnh sửa** Google Sheet hoặc Apps Script đều xem được khóa.
  Vì vậy đừng chia sẻ quyền chỉnh sửa file này cho người khác.
- **Nếu mất file** nhưng máy chủ vẫn chạy: chưa sao, khóa vẫn nằm trong Script Properties. Hãy nhờ lập trình
  viên giúp lấy lại một bản sao.
- **Nếu mất cả file lẫn máy chủ, hoặc khóa bị lộ:** báo lập trình viên ngay. Lập trình viên phải tạo cặp khóa
  mới và mã hóa lại tất cả bài Advanced; bạn cài khóa mới bằng **Cài đặt khóa bí mật…** Các mã đã bán vẫn dùng
  được (mã nằm trong Google Sheet); học sinh chỉ cần mở lại trang web.

---

## Phần 5. Giới hạn miễn phí của Google

Google Apps Script miễn phí với tài khoản Google thường. Mỗi lần học sinh nhập hoặc kiểm tra mã chỉ chạy
khoảng 1 giây. Các giới hạn chính (tài khoản thường, có thể thay đổi, xem
<https://developers.google.com/apps-script/guides/services/quotas>):

- Khoảng **30 lượt chạy cùng lúc**. Mỗi lượt tối đa 6 phút.
- Khoảng **50.000 lần đọc cài đặt (Properties) mỗi ngày**. Mỗi lần kiểm tra mã dùng 1 lần.
- Một Google Sheet chứa được tới 10 triệu ô: đủ cho rất nhiều mã.

Mỗi học sinh chỉ kiểm tra mã khoảng 1 lần mỗi ngày, nên giới hạn trên đủ cho hàng nghìn học sinh.
Nếu Google tạm thời từ chối (quá giới hạn), học sinh vẫn dùng được các bài đã mở trên máy mình tới 7 ngày.

---

## Phần 6. Xử lý sự cố

### Lỗi học sinh gặp (cột Result trong Log)

| Result / thông báo | Nghĩa là | Cách xử lý |
| --- | --- | --- |
| `invalid` | Yêu cầu sai định dạng (hiếm). Mã gõ sai thường bị chính trang web chặn trước, với thông báo "This code doesn't look right", nên không có dòng Log. | Bảo học sinh kiểm tra lại từng ký tự, tải lại trang rồi thử lại. |
| `notfound` · "We couldn't find this code" | Mã không có trong trang Codes. | Kiểm tra mã đã gửi; dòng của mã có bị xóa không. |
| `device` · "already active on another device" | Mã đang gắn với thiết bị/trình duyệt khác. | Bảo học sinh dùng đúng trình duyệt cũ (không mở trong Zalo/Facebook), hoặc đợi tới ngày được báo, hoặc bạn **Gỡ thiết bị**. |
| `revoked` · "turned off" | Mã đã bị thu hồi. | Nếu nhầm: đổi Status về `active`. |
| `expired` · "has expired" | Mã hết hạn. | Muốn gia hạn: sửa cột Expires. |
| `rate` · "Too many attempts" | Thiết bị đó nhập sai mã quá 10 lần trong 15 phút. | Đợi 15 phút rồi thử lại. |
| `update (no device key)` · "tunn.sat was updated" | Trang web học sinh đang mở là bản cũ (mở từ trước khi cập nhật). | Bảo học sinh tải lại trang (F5) rồi thử lại. |
| `setup` | Máy chủ chưa có khóa bí mật (hoặc khóa hỏng), mất trang Codes, hoặc hàng tiêu đề trang Codes bị sửa / có cột chèn vào giữa (`setup (Codes header changed)`). | Chạy **Kiểm tra cài đặt** và làm theo dòng **[CẦN SỬA]**. |
| `sheet (dòng …: cột …)` · "problem in the list of codes" | Một ô trên dòng của mã có giá trị máy chủ không đọc được (Status lạ, Days không phải số, ngày gõ sai). Máy chủ từ chối mã đó cho tới khi sửa. | Sửa đúng ô được nêu (ví dụ Expires gõ `2027-12-31 23:59`, Status chọn trong danh sách), rồi chạy **Kiểm tra cài đặt**. |
| `busy` / `error` · "Something went wrong" | Lỗi tạm thời của Google hoặc của máy chủ. | Thử lại sau. Nếu lặp lại nhiều: chụp các dòng `error` trong Log gửi lập trình viên. |

### Lỗi khi cài đặt

- **Không thấy menu tunn.sat Premium:** tải lại Google Sheet (F5) và đợi vài giây. Kiểm tra đã bấm Save trong
  Apps Script chưa, và Apps Script có mở từ **chính** Google Sheet này không (Extensions → Apps Script).
- **"Chưa cài được khóa … KHÔNG khớp với khóa công khai của trang web":** bạn dán nhầm file khóa (ví dụ khóa
  cũ). Hỏi lập trình viên đúng file `private-key.json`.
- **"… khóa CÔNG KHAI …":** bạn dán file `premium-key.json`. Cần dán file `private-key.json`.
- **"… bị thiếu phần …" / "… bị lỗi hoặc bị thiếu":** chưa copy hết. Mở lại file, Ctrl+A, copy lại.
- **Lỗi có chữ `BigInt` hoặc `ReferenceError`:** Apps Script đang tắt V8. Vào **Project Settings** (Cài đặt dự án,
  hình bánh răng) → tích ô **Enable Chrome V8 runtime** → Save.
- **Mở địa chỉ `/exec` lại ra trang đăng nhập Google:** ô **Who has access** chưa phải **Anyone**. Vào
  **Deploy** → **Manage deployments** → **Edit** (bút chì) → Who has access: **Anyone** → Version: **New version**
  → **Deploy**.
- **Không chọn được "Anyone":** tài khoản trường học/công ty có thể bị chặn. Hãy dùng Gmail cá nhân.
- **Sửa Code.gs mà trang web không thay đổi:** bạn chưa tạo **New version** (xem [Phần 3](#phần-3-cập-nhật-máy-chủ-sau-này)).
- **Trang web ghi "Premium codes are coming soon":** trang web chưa có địa chỉ `/exec` (Bước 8).
- **Học sinh báo "Can't reach the code service":** mạng của học sinh có vấn đề, hoặc địa chỉ `/exec` sai, hoặc
  Who has access chưa phải Anyone.

---

## Phần 7. Dành cho lập trình viên

- Thử máy chủ trên máy tính (không dùng máy chủ thật hay mã thật):
  `PREMIUM_PRIVATE_KEY_FILE=/đường/dẫn/ngoài/repo/private-key.json node tools/premium/test-server.mjs`
  (hoặc `--key <file>`). Không có khóa thì phần lớn bài test vẫn chạy với một khóa tạm.
- Chạy máy chủ giả lập: `node tools/premium/sim.mjs --key /đường/dẫn/ngoài/repo/private-key.json --port 8787 --codes 3`.
  Nó in ra các mã thử. Đặt tạm `APP_CONFIG.premium.api = 'http://localhost:8787/exec'` trong
  `assets/js/config.js` (**không commit**), rồi chạy `python3 -m http.server 8080` và mở <http://localhost:8080/>.
- Mỗi lần sửa `tools/premium/server/Code.gs`: chạy lại test, rồi nhắc chủ trang làm [Phần 3](#phần-3-cập-nhật-máy-chủ-sau-này).
  Sửa file trong repo **không** thay đổi máy chủ đang chạy.
- Quy tắc trong Code.gs (bộ giả lập báo lỗi nếu vi phạm): mọi lần ghi vào trang tính nằm trong `withLock_`
  (LockService), và `SpreadsheetApp.flush()` chạy trước khi nhả khóa; chỉ dùng API có trong Apps Script
  (không TextEncoder, atob, fetch…); mảng byte đưa vào `Utilities` là byte có dấu (-128..127).
- Tên menu trong Code.gs: **tunn.sat Premium** → **Tạo mã mới…**, **Thu hồi mã đang chọn**,
  **Gỡ thiết bị của mã đang chọn**, **Cài đặt khóa bí mật…**, **Kiểm tra cài đặt**.
