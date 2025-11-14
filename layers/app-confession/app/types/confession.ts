import { type JSONContent } from "@tiptap/vue-3";

export interface ConfessionUser {
  id: string;
  username: string;
  avatar?: string;
  fullName?: string;
}

interface ConfessionBase {
  id: string;
  userId?: string;
  user: ConfessionUser;
  content: JSONContent;
  plainText: string;
  summary: string;
  tags: string[];
  status: number; // 0: pending, 1: approved, 2: rejected
  isAnonymous: boolean;
  totalViews: number;
  totalTips: number;
  priceCoin?: number;
  // TODO: implement this feature
  reactions: {
    heart: number;
    shock: number;
    sad: number;
    support: number;
  };
  isPurchased?: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export type Confession =
  | ({ isAnonymous: true } & Omit<ConfessionBase, "user" | "userId"> & {})
  | ({ isAnonymous: false } & ConfessionBase);
