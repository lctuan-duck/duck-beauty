<script setup lang="ts">
import { useTimeAgo } from "@vueuse/core";
import type { Confession } from "~~/layers/app-confession/app/types/confession";
import type { DropdownMenuItem } from "@nuxt/ui";

const props = defineProps<{
  item: Confession;
}>();

const toast = useToast();

const MENU_ACTIONS = ref<DropdownMenuItem[][]>([
  [
    {
      label: "Lưu",
      icon: "i-lucide-bookmark",
    },
    {
      label: "Sao chép liên kết",
      icon: "i-lucide-link",
      onSelect: onCopyLink,
    },
    {
      label: "Báo cáo",
      icon: "tabler:message-report",
      color: "error",
    },
  ],
]);

async function onCopyLink() {
  if (!props.item) return;
  await navigator.clipboard.writeText(props.item.id);
  toast.add({
    title: "Sao chép",
    description: "Đã sao chép liên kết vào clipboard.",
    color: "success",
  });
}
</script>

<template>
  <UCard class="w-full p-3 rounded-2xl">
    <div class="flex flex-col gap-1">
      <!-- user -->
      <div class="flex items-center justify-between">
        <DuckUserCard
          :is-anonymous="item?.isAnonymous"
          :user="item?.isAnonymous ? undefined : item.user"
        >
          <template #subtitle>
            <DuckText class="text-xs text-[var(--ui-text-muted)]">
              {{ useTimeAgo(item?.createdAt) }}
            </DuckText>
          </template>
        </DuckUserCard>
        <!-- menu actions -->
        <UDropdownMenu
          :items="MENU_ACTIONS"
          :content="{
            align: 'start',
            side: 'bottom',
            sideOffset: 8,
          }"
          :ui="{
            content: 'w-48',
          }"
        >
          <UButton
            icon="i-lucide-more-vertical"
            color="neutral"
            variant="ghost"
            class="rounded-full"
          />
        </UDropdownMenu>
      </div>
      <!-- content -->
      <div>
        <DuckEditor :content="item?.content" :editable="false" />
      </div>
      <!-- footer (like, reply, re-post) -->
      <div class="-ml-3 flex items-center gap-2">
        <AppConfessionMoleculesPlatformConfessionActionBarCard />
        <!-- @like="(reaction) => $emit('like', reaction)"
          @reply="$emit('reply')"
          @re-post="$emit('repost')" -->
      </div>
    </div>
  </UCard>
</template>
