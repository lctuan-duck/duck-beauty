<script setup lang="ts">
import type { Comment } from "#app-confession/types";

const props = defineProps<{
  item: Comment;
}>();
</script>

<template>
  <DuckBox class="gap-3 bg-[var(--ui-bg)] p-3">
    <!-- User Avatar -->
    <DuckUserCard
      :is-anonymous="item?.isAnonymous"
      :user="item?.isAnonymous ? undefined : item.user"
      title-class="flex gap-2 items-center"
      class="items-start"
    >
      <template #subtitle>
        <DuckText class="text-sm text-[var(--ui-text-muted)]">
          {{ useTimeAgo(item?.createdAt) }}
        </DuckText>
      </template>
      <template #content>
        <!-- user content -->
        <DuckBox class="mb-1">
          <DuckBox>
            <DuckEditor :content="item?.content" :editable="false" />
          </DuckBox>
        </DuckBox>
        <!-- footer (like, reply, re-post) -->
        <DuckBox class="-ml-3 flex items-center gap-2">
          <AppConfessionMoleculesPlatformActionBarCard />
          <!-- @like="(reaction) => $emit('like', reaction)"
          @reply="$emit('reply')"
          @re-post="$emit('repost')" -->
        </DuckBox>
      </template>
    </DuckUserCard>
  </DuckBox>
</template>
