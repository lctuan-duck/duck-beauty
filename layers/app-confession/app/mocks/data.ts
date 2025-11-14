import type { JSONContent } from "@tiptap/vue-3";
import type { Confession } from "../types";

export const formattedConfessions: Confession[] = [
  {
    id: "1",
    isAnonymous: true,
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
    } as JSONContent,
    plainText:
      "Tôi đã yêu anh ấy được 3 năm, nhưng anh ấy không hề biết. Mỗi ngày đến công ty, tôi chỉ mong được nhìn thấy anh ấy dù chỉ một lần...",
    summary:
      "Tôi đã thầm yêu người đồng nghiệp 3 năm, nhưng giờ anh ấy đã đính hôn...",
    tags: ["Tình yêu", "Crush", "Đau lòng", "Văn phòng"],
    status: 1,
    totalViews: 3420,
    totalTips: 247,
    reactions: {
      heart: 892,
      shock: 45,
      sad: 1234,
      support: 567,
    },
    priceCoin: 5,
    createdAt: new Date("2025-11-10T08:30:00Z"),
    updatedAt: new Date("2025-11-10T08:30:00Z"),
  },

  {
    id: "2",
    isAnonymous: true,
    content: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Năm 2020, tôi bỏ việc ở công ty đa quốc gia...",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Những tháng đầu, tôi chỉ kiếm được vài trăm ngàn từ Youtube...",
            },
          ],
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "Nhưng tôi không bỏ cuộc..." }],
        },
      ],
    } as JSONContent,
    plainText:
      "Năm 2020, tôi bỏ việc ở công ty đa quốc gia để theo đuổi đam mê làm youtuber...",
    summary:
      "Bỏ việc lương 40 triệu để làm youtuber - Quyết định điên rồ hay sáng suốt nhất đời tôi?",
    tags: ["Nghề nghiệp", "Đam mê", "Thành công", "Truyền cảm hứng"],
    status: 1,
    totalViews: 8920,
    totalTips: 891,
    reactions: {
      heart: 2341,
      shock: 456,
      sad: 12,
      support: 1890,
    },
    priceCoin: 3,
    createdAt: new Date("2025-11-12T14:15:00Z"),
    updatedAt: new Date("2025-11-12T14:15:00Z"),
  },

  {
    id: "3",
    isAnonymous: true,
    content: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Tôi làm việc ở một startup công nghệ được mệnh danh là unicorn...",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "CEO của công ty là một người cực kỳ toxic...",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Tôi viết confession này để cảnh báo..." },
          ],
        },
      ],
    } as JSONContent,
    plainText:
      "Tôi làm việc ở một startup unicorn. Mọi thứ nhìn tưởng tốt, nhưng sự thật bên trong rất toxic...",
    summary: "Sự thật đen tối đằng sau một startup unicorn nổi tiếng...",
    tags: ["Công việc", "Toxic workplace", "Startup", "Cảnh báo"],
    status: 1,
    totalViews: 12340,
    totalTips: 1234,
    reactions: {
      heart: 345,
      shock: 2890,
      sad: 1567,
      support: 890,
    },
    priceCoin: 8,
    createdAt: new Date("2025-11-13T09:45:00Z"),
    updatedAt: new Date("2025-11-13T09:45:00Z"),
  },

  {
    id: "4",
    isAnonymous: true,
    content: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Nội dung đầy đủ về câu chuyện gia đình..." },
          ],
        },
      ],
    } as JSONContent,
    plainText: "Nội dung đầy đủ về câu chuyện gia đình...",
    summary:
      "Tôi phát hiện ra bí mật 20 năm của gia đình - Cuộc đời tôi chỉ là một lời nói dối?",
    tags: ["Gia đình", "Bí mật", "Cuộc sống"],
    status: 1,
    totalViews: 6789,
    totalTips: 567,
    reactions: {
      heart: 234,
      shock: 1890,
      sad: 1234,
      support: 456,
    },
    priceCoin: 10,
    createdAt: new Date("2025-11-11T16:20:00Z"),
    updatedAt: new Date("2025-11-11T16:20:00Z"),
  },

  {
    id: "5",
    isAnonymous: true,
    content: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Chi tiết về chuyện tình tay ba..." },
          ],
        },
      ],
    } as JSONContent,
    plainText: "Chi tiết về chuyện tình tay ba...",
    summary: "Tôi đang yêu 2 người cùng một lúc và không thể lựa chọn...",
    tags: ["Tình yêu", "Tình tay ba", "Rối ren"],
    status: 1,
    totalViews: 2345,
    totalTips: 89,
    reactions: {
      heart: 123,
      shock: 456,
      sad: 89,
      support: 234,
    },
    priceCoin: 2,
    createdAt: new Date("2025-11-14T11:00:00Z"),
    updatedAt: new Date("2025-11-14T11:00:00Z"),
  },
];
