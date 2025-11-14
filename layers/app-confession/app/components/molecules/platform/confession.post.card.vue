<script setup lang="ts">
import { useTimeAgo } from "@vueuse/core";
import type { Confession } from "~~/layers/app-confession/app/types/confession";
import type { DropdownMenuItem } from "@nuxt/ui";

const props = defineProps<{
  item: Confession;
  isPremium?: boolean;
}>();

const binanceStore = useBinanceStore();
const toast = useToast();

const isOpenDrawer = ref(false);
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

const totalReactions = computed(() => {
  const r = props.item.reactions;
  return r.heart + r.shock + r.sad + r.support;
});

const stats = computed(() => {
  const data: {
    label: string;
    icon: string;
    color?: string;
    value: string | number | null;
  }[] = [
    {
      label: "Lượt xem",
      icon: "solar:eye-outline",
      value: props.item.totalViews.toLocaleString(),
    },
    {
      label: "Phản ứng",
      icon: "solar:heart-linear",
      color: "text-pink-500",
      value: totalReactions.value,
    },
    {
      label: "Tips",
      icon: "lucide:coins",
      color: "text-amber-500",
      value: props.item.totalTips,
    },
  ];
  if (props.item.totalViews > 5000) {
    data.push({
      label: "Hot",
      icon: "material-symbols:trending-up-rounded",
      color: "text-primary",
      value: "Hot",
    });
  }

  return data;
});

const canView = computed(() => {
  return (
    props.item?.isPurchased || props?.isPremium || props.item.priceCoin === 0
  );
});

async function onCopyLink() {
  if (!props.item) return;
  await navigator.clipboard.writeText(props.item.id);
  toast.add({
    title: "Sao chép",
    description: "Đã sao chép liên kết vào clipboard.",
    color: "success",
  });
}

const handleOpenDetail = () => {
  isOpenDrawer.value = true;
};

const handleUnlockClick = (e: MouseEvent) => {
  e.stopPropagation();
  if (props.item?.priceCoin) {
    // call api to unlock cfs
    binanceStore.handlePurchaseWithCoins(props.item.priceCoin);
  }
};
</script>

<template>
  <UCard
    class="group hover:shadow-lg transition-all duration-300 cursor-pointer border border-[var(--ui-primary)]/20 hover:border-[var(--ui-primary)] bg-default backdrop-blur-sm rounded-xl"
    variant="soft"
    @click="handleOpenDetail"
  >
    <!-- Header -->
    <template #header>
      <div class="flex items-start justify-between mb-2">
        <div class="flex-1">
          <h3
            class="text-lg font-semibold leading-snug mb-2 group-hover:text-primary transition-colors"
          >
            {{ props.item.summary }}
          </h3>
        </div>

        <UIcon
          v-if="!canView"
          name="solar:lock-outline"
          class="w-5 h-5 flex-shrink-0 text-primary"
        />
      </div>

      <!-- tags -->
      <div class="flex flex-wrap gap-1.5">
        <UBadge
          v-for="(tag, index) in props.item.tags.slice(0, 3)"
          :key="index"
          variant="soft"
          class="text-xs"
        >
          {{ tag }}
        </UBadge>

        <UBadge
          v-if="props.item.isAnonymous"
          variant="outline"
          class="text-xs border-gray-300"
        >
          👤 Ẩn danh
        </UBadge>
      </div>
    </template>

    <!-- Body -->
    <div
      class="text-sm text-toned line-clamp-3"
      :class="{ 'blur-sm select-none': !canView }"
    >
      <template v-if="canView">
        <DuckEditor :content="props.item?.content" :editable="false" />
      </template>
      <template v-else>
        Nội dung này yêu cầu mở khóa để xem. Click để xem chi tiết và mở khóa...
      </template>
    </div>

    <!-- Footer -->
    <template #footer>
      <div class="flex flex-col gap-3 pt-3 border-t border-purple-50">
        <!-- Stats -->
        <div class="flex items-center gap-4 text-xs text-gray-500 w-full">
          <UTooltip
            v-for="stat in stats"
            :key="stat.label"
            :delay-duration="200"
            :text="stat.label"
          >
            <div class="flex items-center gap-1">
              <UIcon :name="stat.icon" class="w-5 h-5" :class="stat.color" />
              <span :class="stat.color">{{ stat.value }}</span>
            </div>
          </UTooltip>
        </div>

        <!-- Unlock Button -->
        <UButton
          v-if="!canView"
          class="w-full justify-center"
          @click="handleUnlockClick"
        >
          <UIcon name="solar:lock-outline" class="w-4 h-4 mr-2" />
          Mở khóa với {{ props.item.priceCoin }} coins
        </UButton>
        <AppConfessionMoleculesPlatformConfessionViewDetailDrawer
          :open="isOpenDrawer"
          @update:open="isOpenDrawer = $event"
        />
      </div>
    </template>
  </UCard>
</template>
