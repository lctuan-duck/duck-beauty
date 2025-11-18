<script setup lang="ts">
import type { CompanyReview } from "#app-company/app/types";

const props = defineProps<{
  review: CompanyReview;
}>();

const isOpen = defineModel("open", {
  default: false,
  type: Boolean,
});

const isViewerReacted = false; // TODO: Fetch from API

const ratingBreakdown = computed(() => {
  if (!props.review) return [];

  return [
    {
      label: "Lương thưởng",
      value: props.review.ratings.salary,
    },
    { label: "Văn hóa công ty", value: props.review.ratings.culture },
    { label: "Quản lý", value: props.review.ratings.management },
    {
      label: "Cơ hội thăng tiến",
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

function getRatingColor(rating: number) {
  if (rating >= 4) return "success";
  if (rating >= 3) return "warning";
  return "error";
}
</script>

<template>
  <UDrawer
    v-model:open="isOpen"
    :should-scale-background="$breakpoints.isMobile"
    :set-background-color-on-scale="$breakpoints.isMobile"
    :direction="$breakpoints.isMobile ? 'bottom' : 'right'"
    :handle="$breakpoints.isMobile"
    :overlay="$breakpoints.isMobile"
    :inset="false"
    handle-only
    :ui="{
      header: $breakpoints.isMobile ? '' : 'w-sm',
      body: $breakpoints.isMobile ? '' : 'w-sm',
    }"
  >
    <slot />

    <template #header>
      <div class="flex items-center justify-between gap-4">
        <DuckText as="h2" class="font-semibold">
          {{ props.review.position }}
        </DuckText>
        <UButton
          color="neutral"
          variant="ghost"
          icon="i-lucide-x"
          @click="isOpen = false"
        />
      </div>
    </template>

    <template #body>
      <div class="space-y-4">
        <!-- rating total -->
        <div class="flex items-center gap-2">
          <UBadge
            size="xl"
            icon="material-symbols:star-rounded"
            :color="getRatingColor(props.review.rating)"
            variant="outline"
          >
            {{ props.review.rating.toFixed(1) }}/5.0
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

        <USeparator />

        <!-- Rating Breakdown -->
        <div class="space-y-2">
          <div class="mb-4 font-semibold">Chi tiết đánh giá</div>
          <div
            v-for="rating in ratingBreakdown"
            :key="rating.label"
            class="flex items-center gap-2 text-sm"
          >
            <DuckText as="span" class="w-68">
              {{ rating.label }}
            </DuckText>
            <UProgress :model-value="rating.value" :max="5" />
            <DuckText as="span" class="w-8 text-right">
              {{ rating.value.toFixed(1) }}
            </DuckText>
          </div>
        </div>

        <USeparator />

        <!-- Content -->
        <!-- Full Content -->
        <div class="leading-relaxed">
          <DuckEditor :content="props.review?.content" :editable="false" />
        </div>

        <USeparator />

        <!-- Reactions -->
        <div class="flex flex-col items-center gap-2 w-full">
          <DuckText as="h4" class="text-sm"
            >Review này có hữu ích không?</DuckText
          >
          <div class="flex items-center gap-2 w-full">
            <UButton
              :variant="isViewerReacted ? 'solid' : 'outline'"
              class="justify-center flex-1"
              icon="i-lucide-thumb-up"
            >
              Có
              {{
                props.review.helpfulCount
                  ? `(${props.review.helpfulCount})`
                  : ""
              }}
            </UButton>
            <UButton
              :variant="isViewerReacted ? 'solid' : 'outline'"
              class="justify-center flex-1"
              icon="i-lucide-thumb-down"
            >
              Không
              {{
                props.review.notHelpfulCount
                  ? `(${props.review.notHelpfulCount})`
                  : ""
              }}
            </UButton>
          </div>
        </div>
      </div>
    </template>
  </UDrawer>
</template>
