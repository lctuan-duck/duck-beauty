import type { JSONContent } from "@tiptap/vue-3";
import type { Company, CompanyReview } from "../types";

export const mockCompanies: Company[] = [
  {
    id: "c1",
    name: "TechViet Solutions",
    slug: "teachviet-sulitions",
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
      careerGrowth: 4.0,
    },
    trending: "up",
  },
  {
    id: "c2",
    name: "StartupX Vietnam",
    slug: "startupx-bietnam",
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
    content: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Tôi đã yêu anh ấy được 3 năm, nhưng anh ấy không hề biết. Mỗi ngày đến công ty, tôi chỉ mong được nhìn thấy anh ấy dù chỉ một lần. Tôi nhớ từng chi tiết nhỏ nhất về anh - cách anh cười, cách anh nhíu mày khi tập trung, cách anh uống cà phê vào mỗi buổi sáng.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Hôm qua, tôi vô tình nghe được anh nói chuyện với đồng nghiệp. Anh đã đính hôn. Tim tôi như vỡ tan thành nghìn mảnh. Tôi cố gắng giữ nụ cười trên môi, nhưng nước mắt cứ tràn ra không ngừng khi về đến nhà.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Tôi biết mình nên buông bỏ, nhưng làm sao có thể quên được một người mà bạn đã yêu trong suốt 1095 ngày? Tôi không dám nói ra, vì sợ mất đi cả tình bạn. Giờ đây, tôi chỉ có thể chúc anh hạnh phúc, và âm thầm yêu anh trong im lặng...",
            },
          ],
        },
      ],
    },
    summary: "Môi trường tốt để phát triển, lương cao nhưng đôi khi phải OT",
    rating: 4,
    ratings: {
      salary: 4.5,
      culture: 4.0,
      management: 3.5,
      careerGrowth: 4.5,
    },
    position: "Senior Developer",
    employmentStatus: "current",
    isAnonymous: false,
    isVerified: true,
    helpfulCount: 89,
    notHelpfulCount: 5,
    tags: ["Developer", "Outsourcing", "Work-life balance"],
    createdAt: "2025-11-10T10:00:00Z",
  },
  {
    id: "r2",
    companyId: "c2",
    userId: "user11",
    content: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Tôi đã yêu anh ấy được 3 năm, nhưng anh ấy không hề biết. Mỗi ngày đến công ty, tôi chỉ mong được nhìn thấy anh ấy dù chỉ một lần. Tôi nhớ từng chi tiết nhỏ nhất về anh - cách anh cười, cách anh nhíu mày khi tập trung, cách anh uống cà phê vào mỗi buổi sáng.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Hôm qua, tôi vô tình nghe được anh nói chuyện với đồng nghiệp. Anh đã đính hôn. Tim tôi như vỡ tan thành nghìn mảnh. Tôi cố gắng giữ nụ cười trên môi, nhưng nước mắt cứ tràn ra không ngừng khi về đến nhà.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Tôi biết mình nên buông bỏ, nhưng làm sao có thể quên được một người mà bạn đã yêu trong suốt 1095 ngày? Tôi không dám nói ra, vì sợ mất đi cả tình bạn. Giờ đây, tôi chỉ có thể chúc anh hạnh phúc, và âm thầm yêu anh trong im lặng...",
            },
          ],
        },
      ],
    },
    summary:
      "Toxic workplace nghiêm trọng! CEO toxic, OT liên tục, nhiều người resign vì stress",
    rating: 1,
    ratings: {
      salary: 4.0,
      culture: 1.0,
      management: 1.0,
      careerGrowth: 2.0,
    },
    position: "Product Manager",
    employmentStatus: "former",
    isAnonymous: true,
    isVerified: false,
    helpfulCount: 456,
    notHelpfulCount: 12,
    tags: ["Toxic", "CEO", "Stress", "Resign"],
    createdAt: "2025-11-12T15:30:00Z",
  },
  {
    id: "r3",
    companyId: "c3",
    userId: "user12",
    content: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Tôi đã yêu anh ấy được 3 năm, nhưng anh ấy không hề biết. Mỗi ngày đến công ty, tôi chỉ mong được nhìn thấy anh ấy dù chỉ một lần. Tôi nhớ từng chi tiết nhỏ nhất về anh - cách anh cười, cách anh nhíu mày khi tập trung, cách anh uống cà phê vào mỗi buổi sáng.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Hôm qua, tôi vô tình nghe được anh nói chuyện với đồng nghiệp. Anh đã đính hôn. Tim tôi như vỡ tan thành nghìn mảnh. Tôi cố gắng giữ nụ cười trên môi, nhưng nước mắt cứ tràn ra không ngừng khi về đến nhà.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Tôi biết mình nên buông bỏ, nhưng làm sao có thể quên được một người mà bạn đã yêu trong suốt 1095 ngày? Tôi không dám nói ra, vì sợ mất đi cả tình bạn. Giờ đây, tôi chỉ có thể chúc anh hạnh phúc, và âm thầm yêu anh trong im lặng...",
            },
          ],
        },
      ],
    },
    summary:
      "Công ty tốt cho developer, văn hóa tích cực, work-life balance ổn",
    rating: 4,
    ratings: {
      salary: 4.0,
      culture: 4.5,
      management: 4.0,
      careerGrowth: 4.0,
    },
    position: "Full Stack Developer",
    employmentStatus: "current",
    isAnonymous: false,
    isVerified: true,
    helpfulCount: 67,
    notHelpfulCount: 3,
    tags: ["Developer", "Work-life balance", "Outsourcing"],
    createdAt: "2025-11-13T09:00:00Z",
  },
];
