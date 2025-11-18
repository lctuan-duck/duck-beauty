<script setup lang="ts">
import type { CompanyReview } from "#app-company/app/types";

const props = defineProps<{
  review: CompanyReview;
}>();

const isOpenDrawer = ref(false);

const ratingBreakdown = computed(() => {
  if (!props.review) return [];

  return [
    {
      label: "Lương",
      value: props.review.ratings.salary,
    },
    { label: "Văn hóa", value: props.review.ratings.culture },
    { label: "Quản lý", value: props.review.ratings.management },
    {
      label: "Sự nghiệp",
      value: props.review.ratings.careerGrowth,
    },
  ];
});

const employmentStatusLabel = computed(() => {
  switch (props.review.employmentStatus) {
    case "current":
      return "Đang làm việc";
    case "former":
      return "Đã nghỉ việc";
    case "candidate":
      return "Ứng viên";
    default:
      return "không xác định";
  }
});

const stats = computed(() => {
  return [
    {
      label: "Hữu ích",
      icon: "i-lucide-thumb-up",
      value: props.review.helpfulCount || 0,
      color: "text-success",
    },
    {
      label: "Không hữu ích",
      icon: "i-lucide-message-circle",
      value: props.review.notHelpfulCount || 0,
      color: "text-error",
    },
  ];
});

function getRatingColor(rating: number) {
  if (rating >= 4) return "success";
  if (rating >= 3) return "warning";
  return "error";
}

const handleOpenDetail = () => {
  isOpenDrawer.value = true;
};
</script>

<template>
  <UCard
    class="group hover:shadow-lg transition-all p-2 max-sm:p-1 duration-300 cursor-pointer border border-[var(--ui-primary)]/20 hover:border-[var(--ui-primary)] bg-default backdrop-blur-sm rounded-xl"
    @click="handleOpenDetail"
  >
    <div class="flex flex-col gap-3">
      <div class="flex items-center gap-2">
        <UBadge
          size="xl"
          icon="material-symbols:star-rounded"
          :color="getRatingColor(props.review.rating)"
          variant="outline"
        >
          {{ props.review.rating.toFixed(1) }}
        </UBadge>
        <UBadge color="neutral" variant="solid">
          {{ employmentStatusLabel }}
        </UBadge>
        <UBadge
          v-if="props.review.isVerified"
          variant="outline"
          icon="i-lucide-badge-check"
          label="Verified"
        />
      </div>

      <div>
        <DuckText as="h3" class="font-semibold">
          {{ props.review.position }}
        </DuckText>
        <DuckText as="p" class="text-sm text-muted-foreground">
          {{ props.review.summary }}
        </DuckText>
      </div>

      <!-- Tags -->
      <div class="flex flex-wrap gap-2">
        <UBadge
          v-for="(tag, index) in props.review.tags"
          :key="index"
          variant="soft"
        >
          {{ tag }}
        </UBadge>
        <UBadge v-if="props.review.isAnonymous" variant="outline">
          👤 Ẩn danh
        </UBadge>
      </div>

      <!-- Rating Breakdown -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div
          v-for="rating in ratingBreakdown"
          :key="rating.label"
          class="flex flex-col justify-center items-center gap-2 text-sm"
        >
          <DuckText as="span" class="text-muted text-center">
            {{ rating.label }}
          </DuckText>
          <DuckText as="span" class="text-primary font-semibold text-lg">
            {{ rating.value.toFixed(1) }}
          </DuckText>
        </div>
      </div>

      <DuckEditor
        :content="props.review?.content"
        :editable="false"
        :clamped-height="45"
      />

      <USeparator />

      <!-- Stats -->
      <div class="flex items-center gap-4 text-xs w-full">
        <UTooltip
          v-for="stat in stats"
          :key="stat.label"
          :delay-duration="200"
          :text="stat.label"
        >
          <div class="flex items-center gap-1">
            <UIcon :name="stat.icon" class="w-5 h-5" :class="stat.color" />
            <DuckText as="span" :class="stat.color">{{ stat.value }}</DuckText>
          </div>
        </UTooltip>
      </div>
    </div>
  </UCard>
  <AppCompanyMoleculesPlatformCompanyViewDetailDrawer
    :open="isOpenDrawer"
    :review="props.review"
    @update:open="isOpenDrawer = $event"
  />
</template>
