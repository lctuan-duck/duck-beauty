<script setup lang="ts">
import type { Company } from "#app-company/app/types";

const props = defineProps<{
  company: Company;
}>();

const getTrendingIcon = computed(() => {
  switch (props.company.trending) {
    case "up":
      return { name: "i-lucide-trending-up", class: "text-green-600" };
    case "down":
      return { name: "i-lucide-trending-down", class: "text-red-600" };
    default:
      return { name: undefined, class: "text-muted" };
  }
});

const ratingBreakdown = computed(() => {
  return [
    {
      label: "Lương",
      value: props.company.ratings.salary,
    },
    {
      label: "Văn hóa",
      value: props.company.ratings.culture,
    },
    {
      label: "Quản lý",
      value: props.company.ratings.management,
    },
    {
      label: "Work-life",
      value: props.company.ratings.workLifeBalance,
    },
  ];
});

const getRatingColor = (rating: number) => {
  if (rating >= 4) return "text-success";
  if (rating >= 3) return "text-warning";
  return "text-error";
};
</script>

<template>
  <UCard
    class="group hover:shadow-lg transition-all duration-300 cursor-pointer border border-[var(--ui-primary)]/20 hover:border-[var(--ui-primary)] bg-default backdrop-blur-sm rounded-xl"
    @click="navigateTo(`/companies/${props.company.slug}`)"
  >
    <!-- Header -->
    <div class="flex items-start gap-3 pb-3">
      <div class="text-4xl">
        {{ props.company.logo }}
      </div>

      <div class="flex-1 min-w-0">
        <DuckText
          as="h3"
          class="text-lg truncate font-semibold leading-snug mb-2 group-hover:text-primary transition-colors"
        >
          {{ props.company.name }}
        </DuckText>

        <div class="flex gap-2 mb-2">
          <UBadge color="neutral" variant="outline">
            {{ props.company.industry }}
          </UBadge>

          <div class="flex items-center gap-1">
            <UIcon name="i-lucide-map-pin" class="w-3 h-3" />
            <DuckText as="span" class="text-xs">
              {{ props.company.location }}
            </DuckText>
          </div>
        </div>
      </div>
      <div v-if="getTrendingIcon.name">
        <UIcon
          :name="getTrendingIcon.name"
          class="w-4 h-4"
          :class="getTrendingIcon.class"
        />
      </div>
    </div>

    <!-- Rating -->
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2">
        <div
          :class="[
            'text-3xl font-semibold',
            getRatingColor(props.company.averageRating),
          ]"
        >
          {{ props.company.averageRating.toFixed(1) }}
        </div>

        <div>
          <div class="flex items-center gap-1">
            <UIcon
              v-for="i in 5"
              :key="i"
              name="material-symbols:star-rounded"
              class="size-5"
              :class="
                i <= Math.round(props.company.averageRating)
                  ? 'fill-yellow-400 text-yellow-400 bg-yellow-400'
                  : 'text-gray-300'
              "
            />
          </div>

          <div class="flex items-center gap-1 text-sm">
            <UIcon name="mingcute:comment-line" class="size-4" />
            <DuckText as="span">
              {{ props.company.totalReviews }} reviews
            </DuckText>
          </div>
        </div>
      </div>
    </div>

    <!-- Rating Breakdown -->
    <div class="space-y-2">
      <div
        v-for="item in ratingBreakdown"
        :key="item.label"
        class="flex items-center gap-2 text-sm"
      >
        <DuckText as="span" class="w-24 text-muted">{{ item.label }}</DuckText>
        <UProgress :model-value="item.value" :max="5" />
        <DuckText as="span" class="w-8 text-right text-muted">
          {{ item.value.toFixed(1) }}
        </DuckText>
      </div>
    </div>

    <!-- Description -->
    <DuckText as="p" class="text-muted line-clamp-2 mt-4 text-md">
      {{ props.company.description }}
    </DuckText>
  </UCard>
</template>
