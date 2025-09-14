import { type JSONContent } from "@tiptap/vue-3";

export interface ConfessionUser {
  id: string;
  username: string;
  avatar?: string;
  fullName?: string;
}

interface Confession {
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
  createdAt: Date;
  updatedAt: Date;
}

export type ConfessionResponse =
  | ({ isAnonymous: true } & Omit<Confession, "user" | "userId"> & {})
  | ({ isAnonymous: false } & Confession);
