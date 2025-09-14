<script setup lang="ts">
import { useTimeAgo } from "@vueuse/core";
import type { ConfessionResponse } from "#app-confession/types/confession";

defineProps<{
  item: ConfessionResponse;
}>();
</script>

<template>
  <UCard class="w-full p-2">
    <DuckBox class="flex flex-col gap-2">
      <!-- user -->
      <DuckUserCard
        :is-anonymous="item?.isAnonymous"
        :user="item?.isAnonymous ? undefined : item.user"
      >
        <template #subtitle>
          <DuckText class="text-sm text-[var(--ui-text-muted)]">
            {{ useTimeAgo(item?.createdAt) }}
          </DuckText>
        </template>
      </DuckUserCard>
      <!-- content -->
      <DuckBox>
        <DuckEditor :content="item?.content" :editable="false" />
      </DuckBox>
    </DuckBox>
  </UCard>
</template>
