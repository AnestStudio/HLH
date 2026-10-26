# Cấu Trúc Giao Diện & Thư Mục Templates — TrọAwesome

Tài liệu này lưu trữ chi tiết cấu trúc thư mục giao diện, quy ước thiết kế và kiến trúc kế thừa layout sử dụng **Thymeleaf Layout Dialect** trong dự án **TrọAwesome**.

---

## 1. Tổng Quan Kiến Trúc Giao Diện

- **Template Engine:** Thymeleaf 3 + `thymeleaf-layout-dialect` (v4.0.1)
- **CSS / UI Framework:** Bootstrap 5.3.3 (Offline tại `static/vendor/bootstrap/`)
- **Icon Set:** FontAwesome 6.5.1 Free (Offline tại `static/vendor/fontawesome/`)
- **Phong Cách Thiết Kế:** Neo-Brutalism hiện đại (Viền đậm 2-3px, bóng đổ cứng dứt khoát, gam màu vàng - xanh pastel - mint)
- **Assets Dùng Chung:**
  - `static/css/common/base.css`: Nạp tập trung fonts, variables, colors, layout và components.
  - `static/css/common/components.css`: Chứa các class giao diện dùng chung (`.fa-card`, `.fa-btn`, `.spinner-overlay`, `.btn-scroll-to-top`,...).
  - `static/fonts/`: Phông chữ Be Vietnam Pro & Outfit offline.

---

## 2. Cây Thư Mục Chi Tiết (`src/main/resources/templates/`)

```text
src/main/resources/templates/
├── layouts/                             # KHUNG GIAO DIỆN DÙNG CHUNG (MASTER LAYOUTS)
│   ├── main.html                        # Layout chính cho người dùng & khách thuê
│   ├── admin.html                       # Layout dành riêng cho trang quản trị hệ thống
│   └── auth.html                        # Layout tối giản cho các trang xác thực
│
├── fragments/                           # CÁC KHỐI GIAO DIỆN TÁI SỬ DỤNG (REUSABLE FRAGMENTS)
│   ├── head.html                        # Meta tags, CSRF meta tokens cho AJAX, nạp Bootstrap/FontAwesome/CSS
│   ├── scripts.html                     # Bootstrap bundle JS
│   ├── header.html                      # Thanh thông báo trên cùng (Top Announcement Strip)
│   ├── navbar.html                      # Thanh điều hướng chính của khách & người thuê
│   ├── sidebar.html                     # Thanh điều hướng cho trang quản trị Admin
│   ├── footer.html                      # Footer chân trang
│   ├── search-filter.html               # Bộ lọc tìm kiếm trọ (từ khóa, trường ĐH, quận, mức giá)
│   ├── rental-card.html                 # Thẻ hiển thị phòng trọ (ảnh, giá, diện tích, tag xác thực, nút yêu thích)
│   ├── pagination.html                  # Thanh phân trang chuẩn phong cách Neo-Brutalism
│   ├── spinner.html                     # Loading overlay toàn màn hình (bật/tắt qua class .d-none)
│   └── toast.html                       # Khung thông báo góc màn hình (Success / Error từ FlashAttributes)
│
├── home/                                # TRANG CHỦ & GIỚI THIỆU
│   ├── index.html                       # Trang chủ: Hero banner, tìm kiếm radar, phòng nổi bật
│   ├── about.html                       # Giới thiệu về nền tảng TrọAwesome
│   └── home.html                        # Giao diện dashboard tổng quan dành cho user đã đăng nhập
│
├── rentals/                             # TÌM KIẾM & XEM PHÒNG TRỌ
│   ├── list.html                        # Danh sách phòng theo lưới card + bộ lọc + phân trang
│   ├── detail.html                      # Chi tiết phòng trọ: thông số, mô tả, tiện ích, chủ nhà, tab review
│   └── map.html                         # Bản đồ Radar tìm trọ theo bán kính quanh cổng trường Đại học
│
├── roommates/                           # TÌM BẠN Ở GHÉP / CÙNG PHÒNG
│   ├── list.html                        # Danh sách các bài đăng tìm người ở ghép
│   ├── detail.html                      # Chi tiết hồ sơ thói quen sinh hoạt, ngân sách chia sẻ
│   ├── create.html                      # Form đăng tin tìm bạn cùng phòng mới
│   └── edit.html                        # Chỉnh sửa nội dung tin tìm người ở ghép
│
├── reviews/                             # ĐÁNH GIÁ & NHẬN XÉT PHÒNG TRỌ
│   ├── list.html                        # Cộng đồng đánh giá, cảnh báo nhà trọ
│   ├── create.html                      # Viết đánh giá cho phòng trọ đã từng thuê
│   └── edit.html                        # Chỉnh sửa đánh giá của người dùng
│
├── account/                             # QUẢN LÝ TÀI KHOẢN CÁ NHÂN
│   ├── profile.html                     # Xem thông tin hồ sơ người dùng
│   ├── edit-profile.html                # Form cập nhật thông tin cá nhân
│   ├── favorites.html                   # Danh sách các phòng trọ đã bấm tim lưu tin
│   └── my-reviews.html                  # Danh sách các nhận xét mà tài khoản đã viết
│
├── owner/                               # KÊNH CHỦ NHÀ / CHỦ TRỌ
│   ├── dashboard.html                   # Bảng điều khiển chủ trọ: thống kê lượt xem, tin nhắn mới
│   ├── my-rentals.html                  # Danh sách các phòng trọ đang cho thuê của chủ nhà
│   ├── create-rental.html               # Form đăng tải phòng trọ mới
│   └── edit-rental.html                 # Chỉnh sửa thông tin phòng & trạng thái còn/hết phòng
│
├── messages/                            # KÊNH NHẮN TIN TRỰC TIẾP
│   ├── inbox.html                       # Hộp thư các cuộc trò chuyện đang có
│   └── conversation.html                # Cửa sổ chat chi tiết với chủ trọ hoặc người ở ghép
│
├── auth/                                # XÁC THỰC TÀI KHOẢN (Kế thừa layouts/auth)
│   ├── login.html                       # Đăng nhập (kèm ghi nhớ mật khẩu, thông báo lỗi)
│   ├── register.html                    # Đăng ký tài khoản mới
│   └── forgot-password.html             # Khôi phục mật khẩu qua email
│
├── admin/                               # QUẢN TRỊ HỆ THỐNG (Kế thừa layouts/admin)
│   ├── dashboard.html                   # Bảng điều khiển quản trị: số liệu người dùng, phòng chờ duyệt
│   ├── users.html                       # Quản lý danh sách tài khoản & phân quyền
│   ├── reports.html                     # Xử lý báo cáo vi phạm, tin ảo, cảnh báo lừa đảo
│   └── settings.html                    # Cấu hình hệ thống (tên web, email quản trị, tự động duyệt)
│
├── users/                               # QUẢN LÝ NGƯỜI DÙNG CHI TIẾT
│   ├── list.html                        # Danh sách người dùng hệ thống (có modal xác nhận xóa)
│   ├── detail.html                      # Xem chi tiết hồ sơ tài khoản
│   └── form.html                        # Form thêm mới / cập nhật tài khoản
│
└── error/                               # CÁC TRANG BÁO LỖI
    ├── 403.html                         # Lỗi 403 — Không có quyền truy cập
    ├── 404.html                         # Lỗi 404 — Không tìm thấy trang
    └── 500.html                         # Lỗi 500 — Lỗi máy chủ nội bộ
```

---

## 3. Quy Ước Kế Thừa Layout (Thymeleaf Layout Dialect)

Mọi trang con (`client`, `owner`, `roommates`,...) đều tuân theo chuẩn kế thừa:

```html
<!DOCTYPE html>
<html lang="vi"
      xmlns:th="http://www.thymeleaf.org"
      xmlns:layout="http://www.ultraq.net.nz/thymeleaf/layout"
      layout:decorate="~{layouts/main}"> <!-- Hoặc layouts/admin, layouts/auth -->
<head>
  <!-- Tiêu đề trang sẽ tự động ghép vào layout theo mẫu: [Tên Trang] — TrọAwesome -->
  <title>Tiêu Đề Trang Con</title>

  <!-- (Tùy chọn) Slot CSS riêng của trang nếu có -->
  <th:block layout:fragment="page-styles">
    <link rel="stylesheet" th:href="@{/css/custom-page.css}">
  </th:block>
</head>
<body>
  <!-- Nội dung chính của trang -->
  <main layout:fragment="content" class="container py-4">
    ...
  </main>

  <!-- (Tùy chọn) Slot đặt Modal riêng để tránh lỗi z-index & backdrop của Bootstrap -->
  <th:block layout:fragment="modal">
    <div class="modal fade" id="exampleModal" tabindex="-1">...</div>
  </th:block>

  <!-- (Tùy chọn) Slot Javascript riêng của trang -->
  <th:block layout:fragment="page-scripts">
    <script th:src="@{/js/custom-page.js}"></script>
  </th:block>
</body>
</html>
```

---

## 4. Cách Sử Dụng Các Fragment Dùng Chung

### A. Nhúng Bộ Lọc Tìm Kiếm Trọ
```html
<div th:replace="~{fragments/search-filter :: search_filter}"></div>
```

### B. Nhúng Thẻ Phòng Trọ (Rental Card)
```html
<th:block th:replace="~{fragments/rental-card :: rental_card}"></th:block>
```

### C. Nhúng Thanh Phân Trang
```html
<div th:replace="~{fragments/pagination :: pagination}"></div>
```

### D. Kích Hoạt Loading Spinner từ Javascript
```javascript
// Bật Spinner khi gửi AJAX hoặc upload ảnh
document.getElementById('global-spinner').classList.remove('d-none');

// Tắt Spinner khi hoàn tất
document.getElementById('global-spinner').classList.add('d-none');
```

### E. Gửi Thông Báo Toast từ Spring Controller
```java
@PostMapping("/save")
public String saveRental(RedirectAttributes redirectAttributes) {
    // Lưu dữ liệu...
    redirectAttributes.addFlashAttribute("successMessage", "Tin phòng trọ đã được lưu thành công!");
    return "redirect:/owner/my-rentals";
}
```
Toast sẽ tự động hiển thị ở góc trên bên phải màn hình thông qua fragment `fragments/toast :: toast`.
