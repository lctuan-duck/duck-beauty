export default function useDevTools() {
  if (import.meta.client) {
    console.log(
      '%cDừng lại!',
      'color: red; font-size: 56px; font-weight: bold;'
    );
    console.log(
      '%cĐây là một tính năng của trình duyệt dành riêng cho những nhà phát triển. Nếu ai đó nói với bạn phải sao chép hay dán bất cứ điều gì vào đây. Thì chắc chắn 100% là họ đang cố gắng chiếm quyền kiểm soát tài khoản và truy cập vào dữ liệu cá nhân của bạn. Nếu bạn không hiểu rõ vấn đề, hãy đóng tab này ngay lập tức!',
      'font-size: 24px'
    );
  }
}
