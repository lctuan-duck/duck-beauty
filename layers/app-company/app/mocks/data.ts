import type { JSONContent } from "@tiptap/vue-3";
import type { Company } from "../types";

export const mockCompanies: Company[] = [
  {
    id: "c1",
    name: "TechViet Solutions",
    slug: 'teachviet-sulitions',
    logo: "🏢",
    industry: "Công nghệ phần mềm",
    location: "Hà Nội",
    description:
      "Công ty phát triển phần mềm hàng đầu Việt Nam với hơn 500 nhân viên",
    totalReviews: 127,
    averageRating: 3.8,
    ratings: {
      salary: 4.2,
      culture: 3.5,
      management: 3.2,
      workLifeBalance: 3.9,
      careerGrowth: 4.0,
    },
    trending: "up",
  },
  {
    id: "c2",
    name: "StartupX Vietnam",
    slug: 'startupx-bietnam',
    logo: "🚀",
    industry: "E-commerce",
    location: "TP. Hồ Chí Minh",
    description: "Startup thương mại điện tử được định giá 100 triệu USD",
    totalReviews: 89,
    averageRating: 3.2,
    ratings: {
      salary: 4.5,
      culture: 2.8,
      management: 2.5,
      workLifeBalance: 2.3,
      careerGrowth: 3.8,
    },
    trending: "down",
  },
  {
    id: "c3",
    name: "VinaTech Global",
    slug: "vinaTech-global",
    logo: "🌟",
    industry: "Outsourcing",
    location: "Đà Nẵng",
    description: "Công ty outsourcing với khách hàng toàn cầu",
    totalReviews: 234,
    averageRating: 4.1,
    ratings: {
      salary: 4.0,
      culture: 4.3,
      management: 4.2,
      workLifeBalance: 4.0,
      careerGrowth: 3.9,
    },
    trending: "stable",
  },
  {
    id: "c4",
    name: "Digital Marketing Pro",
    slug: "digital-marketing-pro",
    logo: "📱",
    industry: "Digital Marketing",
    location: "TP. Hồ Chí Minh",
    description: "Agency marketing hàng đầu với portfolio ấn tượng",
    totalReviews: 56,
    averageRating: 2.2,
    ratings: {
      salary: 3.7,
      culture: 4.2,
      management: 3.8,
      workLifeBalance: 3.5,
      careerGrowth: 4.1,
    },
    trending: "up",
  },
];

export const mockCompanyReviews: CompanyReview[] = [
  {
    id: "r1",
    companyId: "c1",
    userId: "user10",
    content: `Tôi đã làm việc tại TechViet Solutions được 3 năm ở vị trí Senior Developer. Đây là trải nghiệm của tôi:

**Ưu điểm:**
- Lương thưởng rất OK, cao hơn mặt bằng chung 20-30%
- Được làm việc với công nghệ mới: React, Node.js, AWS
- Team lead và đồng nghiệp support nhiệt tình
- Có training và budget cho self-learning
- Cơ hội thăng tiến rõ ràng

**Nhược điểm:**
- Thỉnh thoảng phải OT khi deadline gấp (nhưng có tính công)
- Một số dự án outsourcing khá nhàm chán
- Office ở xa trung tâm, đi lại hơi bất tiện
- Meeting hơi nhiều, đôi khi không hiệu quả

**Kết luận:** Đây là một công ty tốt để phát triển career, đặc biệt với junior/mid-level developer. Môi trường chuyên nghiệp, học hỏi được nhiều. Tôi recommend!`,
    summary: "Môi trường tốt để phát triển, lương cao nhưng đôi khi phải OT",
    rating: 4,
    ratings: {
      salary: 4.5,
      culture: 4.0,
      management: 3.5,
      workLifeBalance: 4.0,
      careerGrowth: 4.5,
    },
    position: "Senior Developer",
    employmentStatus: "current",
    isAnonymous: false,
    isVerified: true,
    priceCoin: 3,
    totalTips: 45,
    helpfulCount: 89,
    notHelpfulCount: 5,
    tags: ["Developer", "Outsourcing", "Work-life balance"],
    createdAt: "2025-11-10T10:00:00Z",
  },
  {
    id: "r2",
    companyId: "c2",
    userId: "user11",
    content: `WARNING: Đừng apply vào công ty này nếu bạn coi trọng mental health!

Tôi làm ở StartupX được 8 tháng và đã quyết định resign. Đây là những gì tôi trải qua:

**Văn hóa toxic:**
- CEO và CTO thường xuyên chửi bới nhân viên trong meeting
- Không có work-life balance: làm tới 10-11PM là chuyện bình thường
- Weekend vẫn phải online, không reply là bị "nhắc nhở"
- Thường xuyên thay đổi requirement đột ngột, blame team khi không kịp

**Lương cao nhưng không xứng đáng:**
- Lương 30-40 triệu nhưng làm việc như 2-3 người
- Không có tăng lương định kỳ, chỉ có "lời hứa suông"
- Benefit gần như không có, bảo hiểm xã hội đóng theo mức thấp nhất

**Turnover rate cực cao:**
- Trong 8 tháng tôi ở đó, đã có 15 người resign
- HR liên tục tuyển người mới để lấp chỗ trống
- Không có training, onboarding cẩu thả

Tôi đã bị stress, mất ngủ, và sức khỏe giảm sút nghiêm trọng. Hiện tại đang điều trị trầm cảm. Please, đừng mắc sai lầm như tôi!`,
    summary:
      "Toxic workplace nghiêm trọng! CEO toxic, OT liên tục, nhiều người resign vì stress",
    rating: 1,
    ratings: {
      salary: 4.0,
      culture: 1.0,
      management: 1.0,
      workLifeBalance: 1.0,
      careerGrowth: 2.0,
    },
    position: "Product Manager",
    employmentStatus: "former",
    isAnonymous: true,
    isVerified: false,
    priceCoin: 5,
    totalTips: 234,
    helpfulCount: 456,
    notHelpfulCount: 12,
    tags: ["Toxic", "CEO", "Stress", "Resign"],
    createdAt: "2025-11-12T15:30:00Z",
  },
  {
    id: "r3",
    companyId: "c3",
    userId: "user12",
    content: "Review chi tiết về VinaTech Global...",
    summary:
      "Công ty tốt cho developer, văn hóa tích cực, work-life balance ổn",
    rating: 4,
    ratings: {
      salary: 4.0,
      culture: 4.5,
      management: 4.0,
      workLifeBalance: 4.5,
      careerGrowth: 4.0,
    },
    position: "Full Stack Developer",
    employmentStatus: "current",
    isAnonymous: false,
    isVerified: true,
    priceCoin: 2,
    totalTips: 23,
    helpfulCount: 67,
    notHelpfulCount: 3,
    tags: ["Developer", "Work-life balance", "Outsourcing"],
    createdAt: "2025-11-13T09:00:00Z",
  },
];
