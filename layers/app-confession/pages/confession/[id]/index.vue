<script setup lang="ts">
import type { Confession, Comment } from "#app-confession/types";

useHead({
  title: "Confession - Welcome!",
});

definePageMeta({
  layout: "confession-layout",
});

// Một đoạn content mẫu dạng Tiptap JSON
const sampleContent: JSONContent = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Đây là nội dung confession mẫu. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet.lorem ipsum dolor sit amet.lorem ipsum dolor sit amet.lorem ipsum dolor sit amet.lorem ipsum dolor sit amet.lorem ipsum dolor sit amet.lorem ipsum dolor sit amet.lorem ipsum dolor sit amet.lorem ipsum dolor sit amet.lorem ipsum dolor sit amet.lorem ipsum dolor sit amet.lorem ipsum dolor sit amet.lorem ipsum dolor sit amet.lorem ipsum dolor sit amet.lorem ipsum dolor sit amet.lorem ipsum dolor sit amet.",
        },
      ],
    },
  ],
};

// Case 1: Anonymous confession
const anonymousConfession: Confession = {
  id: "conf-002",
  isAnonymous: false,
  user: {
    id: "user-123",
    username: "john_doe",
    avatar:
      "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
    fullName: "John Doe",
  },
  content: sampleContent,
  plainText: "Đây là nội dung confession mẫu.",
  summary: "Confession ngắn gọn",
  tags: ["life", "school"],
  status: 1,
  totalViews: 120,
  totalTips: 3,
  createdAt: new Date("2025-09-01T10:00:00Z"),
  updatedAt: new Date("2025-09-01T12:00:00Z"),
};

const mockComment: Comment = {
  id: "cmt_123",
  confessionId: "conf_456",
  content: {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [{ type: "text", text: "Đây là bình luận mẫu" }],
      },
    ],
  } as JSONContent,
  plainText: "Đây là bình luận mẫu",
  isAnonymous: true,
  createdAt: new Date("2025-09-15T10:00:00Z"),
  updatedAt: new Date("2025-09-15T10:05:00Z"),
  parentId: undefined,
  userId: "user_789",
  user: {
    id: "user-123",
    username: "john_doe",
    avatar:
      "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
    fullName: "John Doe",
  },
};
</script>
<template>
  <DuckBox class="w-full py-4">
    <DuckBox
      class="w-full max-w-xl m-auto rounded-lg ring-1 ring-[var(--ui-border)]"
    >
      <DuckBox class="flex flex-col">
        <!-- post -->
        <AppConfessionMoleculesPlatformConfessionCard
          :item="anonymousConfession"
        />
        <!-- comments -->
        <DuckBox
          class="-mt-1 flex flex-col bg-[var(--ui-bg)] ring-1 ring-[var(--ui-border)] rounded-b-lg overflow-hidden"
        >
          <DuckBox class="ring-1 ring-[var(--ui-border)]">
            <AppConfessionMoleculesPlatformCommentCard :item="mockComment" />
          </DuckBox>
          <DuckBox class="ring-1 ring-[var(--ui-border)]">
            <AppConfessionMoleculesPlatformCommentCard :item="mockComment" />
          </DuckBox>
          <DuckBox class="ring-1 ring-[var(--ui-border)]">
            <AppConfessionMoleculesPlatformCommentCard :item="mockComment" />
          </DuckBox>
          <DuckBox class="ring-1 ring-[var(--ui-border)]">
            <AppConfessionMoleculesPlatformCommentCard :item="mockComment" />
          </DuckBox>
        </DuckBox>
      </DuckBox>
    </DuckBox>
  </DuckBox>
</template>
