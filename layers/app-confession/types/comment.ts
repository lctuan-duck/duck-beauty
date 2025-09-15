import { type JSONContent } from "@tiptap/vue-3";
import type { Confession, ConfessionUser } from "./confession";

export interface Comment {
  id: string;
  confessionId: string;
  content: JSONContent;
  plainText: string;
  isAnonymous: boolean;
  createdAt: Date;
  updatedAt: Date;
  // parent comment
  parentId?: string;
  // user who made the comment
  userId: string;
  user: ConfessionUser;
}

export type CommentResponse =
  | ({ isAnonymous: true } & Omit<Comment, "userId" | "user">)
  | ({ isAnonymous: false } & Comment);

export interface CommentWithRelations extends Comment {
  confession: Confession;
  parent?: Comment | null;
  replies: Comment[];
}
