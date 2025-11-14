# 📈 Project Documentation: Confession Market - Nền tảng Chia Sẻ Tâm Sự Ẩn Danh Kiếm Tiền

## 1. 🔎 Têm Tóm Tắt

"Confession Market" là một nền tảng web/app nơi người dùng có thể viết tâm sự, chân thật, câu chuyện 1-0-2 một cách ẩn danh. Các confession có thể được mua quyền xem bởi người dùng khác. Nội dung hay, cảm động sẽ được tip bằng coin hoặc chia sẻ rộng rãi.

---

## 2. 💼 Tổng Quan Tính Năng

### 2.1. Cho người viết

- Viết confession 1 cách ẩn danh
- Tùy chọn đặt giá confession hoặc nhận tip
- Xem thống kê: số lượt xem, số coin, top trending

### 2.2. Cho người đọc

- Xem preview/tóm tắt confession
- Mua quyền xem đầy đủ
- Tip cho confession hay
- Tạo danh sách confession yêu thích
- Comment hoặc chia sẻ (nếu confession cho phép)

### 2.3. VIP & Premium

- Xem toàn bộ nội dung không giới hạn
- Được truy cập confession hot trước 24h
- Ẩn quảng cáo

---

## 3. 💰 Mô Hình Kiếm Tiền

| Cách      | Mô tả                                     |
| --------- | ----------------------------------------- |
| Bán coin  | Mua coin để dùng xem/nâng cấp             |
| Tip       | Gửi coin cho confession cảm động          |
| Gói VIP   | Gói tháng/năm, xem không giới hạn         |
| Quảng cáo | Banner theo ngữ cảnh (đọc tạo dựa vào AI) |

---

## 4. 📊 User Flow

1. **Người viết**:

   - Vào trang /write
   - Nhập nội dung (editor markdown)
   - Đặt giá hoặc chọn nhận tip
   - Submit → review → duyệt

2. **Người đọc**:

   - Lướt trang home/feed
   - Xem preview → click mua xem toàn bộ
   - Mở xem → tip / react / comment / chia sẻ

3. **Admin**:

   - Duyệt nội dung
   - Ẩn/spam/quản lý vi phạm
   - Thống kê doanh thu

---

## 5. 📊 DB Schema Gợi Ý

### ⭐ users

- id
- username (optional, nếu muốn lộ)
- email (private)
- isPremium
- totalCoin
- createdAt

### ⭐ confessions

- id
- userId
- content (full)
- summary
- priceCoin (default = 1)
- totalTips
- totalViews
- tags
- isApproved
- isAnonymous (true)
- createdAt

### ⭐ tips

- id
- confessionId
- userId
- amount
- createdAt

### ⭐ purchases

- id
- confessionId
- userId
- createdAt

### ⭐ reactions (optional)

- id
- confessionId
- userId
- type (like / heart / shock / etc)
- createdAt

---

## 6. 🧰 Tech Stack Gợi Ý

- **Frontend**: Nuxt 3 / React + TailwindCSS
- **Backend**: Supabase / Firebase / NestJS + MongoDB
- **Thanh toán**: Stripe / ZaloPay / Momo (qua SDK)
- **Realtime**: WebSocket (Pusher / Supabase Realtime)
- **AI**: Gợi ý nội dung hot / nhận dạng xu hướng

---

## 7. 🌈 Marketing & Phát Triển

- Cộng đồng confession (Fanpage / GenZ confession)
- Mở campaign hashtag: #ThuNhanKhongLo
- Collab KOL ẩn danh: "Thú nhận bí mật của tôi"
- Mở event viết confessions có thưởng theo tuần/tháng

---

## 8. 🎯 KPI ban đầu (gợi ý)

- 1K confession sau 1 tháng
- 10K lượt xem
- 5K coin giao dịch
- 20 người VIP

---

## 9. ⚠️ Risk & Giải Pháp

| Risk           | Giải pháp                           |
| -------------- | ----------------------------------- |
| Spam / NSFW    | AI Filter + mod duyệt               |
| Lộ danh tính   | Tuyệt đối lậu danh / bị khoá        |
| Thiếu nội dung | Chạy seed / collab KOL ẩn danh      |
| Cạnh tranh     | Nâng UI/UX + AI gợi ý + cá nhân hóa |

---

## 10. 🌟 Mở Rộng Tương Lai

- Mở rộng sang **trủ tọc ẩn danh, confession audio, voice**
- Tích hợp AI tóm tắt / chat với confession
- Cho phép gửi confession cho người khác (nếu họ cho phép)

---

> 📄 _File này có thể được chia nhỏ ra backlog và roadmap chi tiết để triển khai MVP trong 1-2 tháng._

## 11. ⭐ Mở rộng: Review Công Ty (Company Reviews)

Mục tiêu: mở rộng nền tảng để cho phép người dùng (ẩn danh hoặc công khai) viết review công ty — giúp cộng đồng chia sẻ trải nghiệm làm việc, phỏng vấn, văn hoá công ty. Review có thể được tip, mua quyền xem (nếu author muốn) và sẽ được quản lý/moderate giống confession.

### 11.1. Tính năng chính

- Viết review công ty (ẩn danh hoặc gắn tên).
- Gắn tag: tuyển dụng, lương, culture, work-life balance, phỏng vấn.
- Đánh giá theo sao (1-5) + điểm chi tiết (lương, culture, management).
- Người đọc có thể:
  - Xem preview, mua quyền xem toàn bộ (nếu review đặt giá).
  - Tip cho review tốt.
  - Thả reaction (helpful / not helpful).
  - Báo cáo vi phạm (spam, libel, PII).
- Company profile:
  - Trang chi tiết công ty (logo, mô tả, ngành, địa điểm, tổng đánh giá trung bình).
  - Hiển thị rating trung bình, số review, trend (mức độ tích cực theo thời gian).
- Moderation:
  - AI + reviewer human để kiểm tra nội dung nhạy cảm/PII.
  - Queue duyệt cho admin/moderator.
  - Tự động hide khi bị report nhiều.
- Verification:
  - Tùy chọn "verified reviewer" (qua email công ty hoặc LinkedIn) — optional.
- Privacy & Legal:
  - Chính sách xử lý PII và khiếu nại (takedown).
  - Hỗ trợ ẩn danh tuyệt đối (no IP or metadata disclosure).

### 11.2. DB Schema mở rộng (gợi ý)

- companies
  - id, name, slug, logoUrl, industry, headquarters, website, createdAt
- company_reviews
  - id, companyId, userId (nullable), title, content, rating (1-5), aspects JSON (salary, culture...), priceCoin, isAnonymous, isApproved, totalTips, totalViews, createdAt
- review_reactions
  - id, reviewId, userId, type (helpful/not), createdAt
- company_stats (cached)
  - companyId, avgRating, reviewCount, lastUpdated

Ví dụ Prisma models (gợi ý):

```prisma
model Company {
  id        String   @id @default(cuid())
  name      String
  slug      String   @unique
  logoUrl   String?
  industry  String?
  website   String?
  reviews   CompanyReview[]
  createdAt DateTime @default(now())
}

model CompanyReview {
  id         String   @id @default(cuid())
  company    Company  @relation(fields: [companyId], references: [id])
  companyId  String
  authorId   String?  // nullable for anonymous
  title      String
  content    String
  rating     Int
  aspects    Json?
  priceCoin  Int      @default(0)
  isAnonymous Boolean @default(true)
  isApproved Boolean  @default(false)
  totalTips  Int      @default(0)
  totalViews Int      @default(0)
  createdAt  DateTime @default(now())
}
```
