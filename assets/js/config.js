/*
 * Cấu hình chung cho trang web.
 * Bạn có thể chỉnh sửa các giá trị dưới đây mà không cần đụng tới phần còn lại của mã nguồn.
 */
window.APP_CONFIG = {
  // Tên hiển thị của trang web.
  siteName: 'SAT Math Practice',

  // Máy tính Desmos (giống máy tính trong Bluebook).
  // Khóa "dcb31709b452b1cf9dc26972add0fda6" là khóa demo công khai của Desmos.
  // Nếu đưa trang web lên mạng cho nhiều người dùng, hãy đăng ký khóa riêng (miễn phí cho giáo dục)
  // tại https://www.desmos.com/my-api rồi thay vào đây.
  desmosApiUrl: 'https://www.desmos.com/api/v1.11/calculator.js',
  desmosApiKey: 'dcb31709b452b1cf9dc26972add0fda6',

  // Thời gian mặc định (phút) cho một module nếu đề không ghi thời gian.
  // Trên SAT thật: 35 phút cho 22 câu ≈ 1,6 phút/câu.
  defaultMinutesPerQuestion: 1.6,

  // Hiện cảnh báo khi còn lại số giây này.
  timeWarningSeconds: 300
};
