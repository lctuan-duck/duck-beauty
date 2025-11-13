<script setup lang="ts">
import type { Comment } from "~~/layers/app-confession/app/types";

const props = defineProps<{
  item: Comment;
}>();
</script>

<template>
  <div class="gap-3 bg-[var(--ui-bg)] p-3">
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
        <div class="mb-1">
          <div>
            <DuckEditor :content="item?.content" :editable="false" />
          </div>
        </div>
        <!-- footer (like, reply, re-post) -->
        <div class="-ml-3 flex items-center gap-2">
          <AppConfessionMoleculesPlatformConfessionActionBarCard />
          <!-- @like="(reaction) => $emit('like', reaction)"
          @reply="$emit('reply')"
          @re-post="$emit('repost')" -->
        </div>
      </template>
    </DuckUserCard>
  </div>
</template>
