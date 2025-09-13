import { type JSONContent } from "@tiptap/vue-3";

export interface ConfessionUser {
  id: string;
  username: string;
  avatar?: string;
  fullName?: string;
}

export type ConfessionResponse =
  | {
      id: string;
      content: JSONContent;
      plainText: string;
      summary: string;
      tags: string[];
      status: number; // 0: pending, 1: approved, 2: rejected
      isAnonymous: true; // 🔥 phân biệt union ở đây
      totalViews: number;
      totalTips: number;
      createdAt: Date;
      updatedAt: Date;
    }
  | {
      id: string;
      userId?: string;
      user: ConfessionUser;
      content: JSONContent;
      plainText: string;
      summary: string;
      tags: string[];
      status: number; // 0: pending, 1: approved, 2: rejected
      isAnonymous: false; // 🔥 phân biệt union ở đây
      totalViews: number;
      totalTips: number;
      createdAt: Date;
      updatedAt: Date;
    };
