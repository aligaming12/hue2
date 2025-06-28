# Huế Tourism Website

Trang web du lịch Huế hiện đại với thông tin chi tiết về các điểm đến, văn hóa, ẩm thực và hướng dẫn du lịch tại cố đô Huế.

## Tính năng

- **Thiết kế hiện đại và responsive**: Trang web có giao diện thân thiện với người dùng, tương thích với mọi thiết bị.
- **Slideshow trang chủ**: Trình chiếu ảnh các địa điểm du lịch nổi bật.
- **Thông tin chi tiết trong popup**: Mỗi điểm đến, món ăn và nét văn hóa đều có popup hiển thị thông tin chi tiết.
- **Bố cục rõ ràng**: Các mục nội dung được phân chia hợp lý, dễ tìm kiếm.
- **Hiệu ứng chuyển động mượt mà**: Tạo trải nghiệm người dùng tốt hơn.

## Cấu trúc thư mục

```
Hue-Tourism/
│
├── index.html          # Trang chủ
├── styles.css          # File CSS chính
├── script.js           # File JavaScript chính
│
├── assets/             # Thư mục chứa tài nguyên
│   └── images/         # Thư mục chứa hình ảnh
│       ├── dai-noi.jpg
│       ├── chua-thien-mu.jpg
│       ├── lang-tu-duc.jpg
│       └── ...
│
└── README.md           # File hướng dẫn (bạn đang đọc)
```

## Hướng dẫn cài đặt

1. Clone hoặc tải xuống repository này.
2. Tạo thư mục `assets/images` và thêm các hình ảnh vào thư mục này.
3. Mở file `index.html` trong trình duyệt để xem trang web.

## Hình ảnh cần thiết

Để trang web hiển thị đúng, bạn cần thêm các hình ảnh sau vào thư mục `assets/images`:

- **Slideshow**: dai-noi.jpg, chua-thien-mu.jpg, lang-tu-duc.jpg
- **Điểm đến**: destination-dai-noi.jpg, destination-thien-mu.jpg, destination-lang-tu-duc.jpg, destination-thuan-an.jpg
- **Ẩm thực**: cuisine-bun-bo.jpg, cuisine-banh-khoai.jpg, cuisine-com-hen.jpg
- **Hình ảnh chi tiết**: dai-noi-detail.jpg, thien-mu-detail.jpg, lang-tu-duc-detail.jpg, thuan-an-detail.jpg, nha-nhac-detail.jpg, thu-cong-detail.jpg, le-hoi-detail.jpg, bun-bo-detail.jpg, banh-khoai-detail.jpg, com-hen-detail.jpg

## Công nghệ sử dụng

- HTML5
- CSS3 (with Flexbox and Grid)
- JavaScript (Vanilla)
- Font Awesome (for icons)
- Google Fonts

## Tùy chỉnh

Bạn có thể tùy chỉnh trang web theo các cách sau:

- Thay đổi màu sắc chủ đạo trong file CSS (biến --primary-color, --secondary-color)
- Thêm hoặc xóa các điểm đến trong phần "destinations-grid"
- Thêm nội dung mới vào các popup thông qua việc chỉnh sửa object contentMap trong file script.js

## Liên hệ

Nếu có câu hỏi hoặc góp ý, vui lòng liên hệ qua email: info@huetourism.com

---

© 2023 Huế Tourism. Đã đăng ký bản quyền.

## Cấu trúc thư mục ảnh

Các ảnh được tổ chức theo các thư mục sau:

- **assets/images/slides**: Chứa ảnh cho slideshow trang chủ
  - Kích thước đề xuất: 1600x900px
  - Format: JPG hoặc WebP
  - Tên file: `slide-1.jpg`, `slide-2.jpg`, ...

- **assets/images/destinations**: Chứa ảnh cho các điểm đến
  - Kích thước đề xuất: 800x600px
  - Format: JPG hoặc WebP
  - Tên file: `destination-ten-diem-den.jpg`
  - Ví dụ: `destination-dai-noi.jpg`, `destination-thien-mu.jpg`

- **assets/images/cuisine**: Chứa ảnh cho ẩm thực
  - Kích thước đề xuất: 800x600px
  - Format: JPG hoặc WebP
  - Tên file: `cuisine-ten-mon-an.jpg`
  - Ví dụ: `cuisine-bun-bo.jpg`, `cuisine-banh-khoai.jpg`

- **assets/images/culture**: Chứa ảnh cho văn hóa
  - Kích thước đề xuất: 800x600px
  - Format: JPG hoặc WebP
  - Tên file: `culture-ten-van-hoa.jpg`
  - Ví dụ: `culture-nha-nhac.jpg`, `culture-le-hoi.jpg`

## Chi tiết các điểm đến

Mỗi điểm đến cần có:
- Ảnh thumbnail (trong thư mục destinations)
- Ảnh chi tiết (thêm hậu tố `-detail`, ví dụ: `dai-noi-detail.jpg`)

## Tối ưu hóa ảnh

Để trang web tải nhanh hơn, hãy tối ưu hóa ảnh:
1. Nén ảnh để giảm kích thước file
2. Sử dụng định dạng WebP nếu có thể
3. Đảm bảo kích thước phù hợp, không quá lớn 