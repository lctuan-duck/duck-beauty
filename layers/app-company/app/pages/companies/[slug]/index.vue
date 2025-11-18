<script setup lang="ts">
import { mockCompanies } from "../../../mocks/data";

const route = useRoute();
const router = useRouter();

const company = computed(() =>
  mockCompanies.find((c) => c.slug === route.params.slug)
);
const getTrendingIcon = computed(() => {
  switch (company.value?.trending) {
    case "up":
      return { name: "i-lucide-trending-up", class: "text-success" };
    case "down":
      return { name: "i-lucide-trending-down", class: "text-error" };
    default:
      return { name: undefined, class: "text-muted" };
  }
});

const ratingBreakdown = computed(() => {
  return [
    {
      label: "Lương",
      value: company.value?.ratings.salary,
    },
    {
      label: "Văn hóa",
      value: company.value?.ratings.culture,
    },
    {
      label: "Quản lý",
      value: company.value?.ratings.management,
    },
    {
      label: "Sự nghiệp",
      value: company.value?.ratings.careerGrowth,
    },
  ];
});

const getRatingColor = (rating: number) => {
  if (rating >= 4) return "text-success";
  if (rating >= 3) return "text-warning";
  return "text-error";
};

useHead({
  title: "Company - Welcome!",
});

definePageMeta({
  layout: "company-layout",
});
</script>
<template>
  <div class="w-full py-4">
    <main v-if="company" class="w-full max-w-6xl m-auto flex flex-col gap-4">
      <!-- Back -->
      <div>
        <UButton
          size="lg"
          color="neutral"
          variant="ghost"
          icon="i-lucide-arrow-left"
          @click="router.back()"
        >
          Quay lại
        </UButton>
      </div>

      <!-- Company Card -->
      <div
        class="border border-[var(--ui-primary)]/20 rounded-xl overflow-hidden"
      >
        <!-- Gradient Header -->
        <div
          class="bg-cfs-gradient px-6 py-8 max-sm:px-4 max-sm:py-6 text-white rounded-t-xl"
        >
          <div class="flex items-start gap-6">
            <div
              v-if="company?.logo"
              class="text-6xl bg-white/20 backdrop-blur rounded-2xl w-24 h-24 flex items-center justify-center max-sm:hidden"
            >
              {{ company.logo }}
            </div>

            <div class="flex-1">
              <div class="flex items-start justify-between mb-3">
                <div>
                  <DuckText as="h1" class="text-4xl mb-2">
                    {{ company?.name }}
                  </DuckText>

                  <div class="flex items-center gap-3">
                    <UBadge :size="$breakpoints.isMobile ? 'sm' : 'md'">
                      <UIcon name="lucide:building-2" class="w-3 h-3 mr-1" />
                      {{ company.industry }}
                    </UBadge>

                    <UBadge :size="$breakpoints.isMobile ? 'sm' : 'md'">
                      <UIcon name="i-lucide-map-pin" class="w-3 h-3 mr-1" />
                      {{ company.location }}
                    </UBadge>

                    <UBadge
                      v-if="getTrendingIcon.name"
                      :size="$breakpoints.isMobile ? 'sm' : 'md'"
                    >
                      <UIcon
                        :name="getTrendingIcon.name"
                        class="size-4 max-sm:size-3"
                        :class="getTrendingIcon.class"
                      />
                    </UBadge>
                  </div>
                </div>
              </div>

              <DuckText class="text-cyan-50 max-w-2xl">
                {{ company.description }}
              </DuckText>
            </div>
          </div>
        </div>

        <!-- Body -->
        <div class="p-6 max-sm:p-4">
          <!-- Stats -->
          <div
            class="grid grid-cols-1 sm:grid-cols-3 sm:gap-6 max-sm:gap-y-4 mb-6"
          >
            <!-- Rating Box -->
            <UCard
              class="col-span-1 bg-[var(--ui-primary)]/5 rounded-xl p-2 border border-[var(--ui-primary)]/40"
            >
              <div class="mb-2 font-semibold">Đánh giá chung</div>

              <div class="flex items-end gap-1 mb-3">
                <div
                  class="text-5xl font-semibold"
                  :class="[getRatingColor(company.averageRating)]"
                >
                  {{ company.averageRating.toFixed(1) }}
                </div>
                <div class="text-2xl text-gray-400 mb-1">/5.0</div>
              </div>

              <div class="flex items-center gap-1 mb-2">
                <UIcon
                  v-for="i in 5"
                  :key="i"
                  name="material-symbols:star-rounded"
                  class="w-5 h-5"
                  :class="
                    i <= Math.round(company.averageRating)
                      ? 'fill-yellow-400 text-yellow-400 bg-yellow-400'
                      : 'text-gray-300'
                  "
                />
              </div>

              <div class="flex items-center gap-2 text-sm">
                <UIcon name="mingcute:comment-line" class="size-4" />
                <DuckText as="span"
                  >{{ company.totalReviews }} reviews</DuckText
                >
              </div>
            </UCard>

            <!-- Rating Detail -->
            <UCard class="col-span-2 rounded-xl p-2">
              <div class="mb-3 font-semibold">Đánh giá chi tiết</div>

              <!-- Rating Breakdown -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
                <div
                  v-for="item in ratingBreakdown"
                  :key="item.label"
                  class="flex items-center gap-2 text-sm"
                >
                  <DuckText as="span" class="w-32">
                    {{ item.label }}
                  </DuckText>
                  <UProgress :model-value="item.value" :max="5" />
                  <DuckText
                    as="span"
                    class="w-8 text-right font-semibold text-primary"
                  >
                    {{ (item.value || 0).toFixed(1) }}
                  </DuckText>
                </div>
              </div>
            </UCard>
          </div>

          <!-- Call To Action -->
          <div class="flex gap-3">
            <UButton
              size="lg"
              icon="lucide:edit"
              label="Viết review"
              class="max-sm:flex-1 justify-center"
            />
            <UButton
              size="lg"
              icon="lucide:users"
              variant="outline"
              label="Theo dõi"
              class="max-sm:flex-1 justify-center"
            />
          </div>
        </div>
      </div>

      <!-- Reviews -->
      <DuckText as="h2" class="text-2xl font-semibold">
        Reviews từ nhân viên
      </DuckText>

      <AppCompanyMoleculesPlatformCompanyReviewList :company-id="company.id" />
    </main>
  </div>
</template>
