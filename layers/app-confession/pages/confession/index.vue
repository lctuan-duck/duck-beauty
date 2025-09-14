<script setup lang="ts">
import type { ConfessionResponse } from "#app-confession/types";

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
      content: [{ type: "text", text: "Đây là nội dung confession mẫu." }],
    },
  ],
};

// Case 1: Anonymous confession
const anonymousConfession: ConfessionResponse = {
  id: "conf-001",
  isAnonymous: true,
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
</script>
<template>
  <DuckBox class="w-full py-4">
    <DuckBox class="w-full max-w-xl m-auto">
      <AppConfessionMoleculesPlatformConfessionCard
        :item="anonymousConfession"
      />
    </DuckBox>
  </DuckBox>
</template>
