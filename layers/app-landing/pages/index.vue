<script setup lang="ts">
useHead({
  title: "DuckBeauty - Móng Xinh, Tự Tin Lên Ngôi!",
});
definePageMeta({
  layout: "landing-page-layout",
});

const { t } = useI18n();
</script>

<template>
  <!-- Main -->
  <DuckBox as="main" class="max-w-[1440px] mx-auto h-full">
    <!-- Hero Section -->
    <DuckBox
      as="section"
      class="flex flex-col-reverse md:flex-row items-center justify-between px-8 py-4"
    >
      <DuckBox class="w-full md:w-1/2 space-y-6">
        <DuckText as="h1" class="text-4xl md:text-5xl font-bold leading-tight">
          {{ t("appLanding.page.index.hero.title") }}
        </DuckText>
        <DuckText class="text-[var(--ui-text-muted)]">
          {{ t("appLanding.page.index.hero.subtitle") }}
        </DuckText>
        <DuckBox
          class="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-6"
        >
          <UButton :label="t('appLanding.page.index.hero.cta')" size="xl" />
          <DuckBox>
            <DuckText class="font-semibold">
              {{ t("appLanding.page.index.hero.hotlineLabel") }}
            </DuckText>
            <DuckText class="text-sm text-[var(--ui-text-muted)]">
              {{ t("appLanding.page.index.hero.hotlineSub") }}
            </DuckText>
          </DuckBox>
        </DuckBox>
      </DuckBox>
      <DuckBox
        class="w-full md:w-2/3 overflow-hidden relative"
        :style="{
          '-webkit-mask-image': `url(/images/mark-01.png)`,
          '-webkit-mask-repeat': 'no-repeat',
        }"
      >
        <DuckImg
          src="/images/nail-02.jpg"
          alt="Khách hàng hạnh phúc"
          class="rounded-xl mx-auto w-4/5 max-h-[520px] object-cover mt-10"
        />
      </DuckBox>
    </DuckBox>

    <!-- Features -->
    <DuckBox
      as="section"
      class="px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
    >
      <DuckBox class="space-y-3">
        <DuckBox
          class="mx-auto w-12 h-12 bg-rose-300 text-white flex items-center justify-center rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M18.364 5.636a9 9 0 11-12.728 0M15 11h.01M9 11h.01M12 11h.01"
            />
          </svg>
        </DuckBox>
        <DuckText as="h3" class="font-semibold text-lg">
          {{ t("appLanding.page.index.features.support.title") }}
        </DuckText>
        <DuckText class="text-sm text-[var(--ui-text-muted)]">
          {{ t("appLanding.page.index.features.support.desc") }}
        </DuckText>
      </DuckBox>
      <DuckBox class="space-y-3">
        <DuckBox
          class="mx-auto w-12 h-12 bg-green-300 text-white flex items-center justify-center rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13 16h-1v-4h-1m4 0h.01M12 18h.01"
            />
          </svg>
        </DuckBox>
        <DuckText as="h3" class="font-semibold text-lg">
          {{ t("appLanding.page.index.features.experts.title") }}
        </DuckText>
        <DuckText class="text-sm text-[var(--ui-text-muted)]">
          {{ t("appLanding.page.index.features.experts.desc") }}
        </DuckText>
      </DuckBox>
      <DuckBox class="space-y-3">
        <DuckBox
          class="mx-auto w-12 h-12 bg-orange-300 text-white flex items-center justify-center rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17 20h5v-2a3 3 0 00-3-3h-1a3 3 0 00-3 3v2zm-4 0H6v-2a3 3 0 013-3h1a3 3 0 013 3v2zm-4-6a3 3 0 110-6 3 3 0 010 6zm10 0a3 3 0 110-6 3 3 0 010 6z"
            />
          </svg>
        </DuckBox>
        <DuckText as="h3" class="font-semibold text-lg">
          {{ t("appLanding.page.index.features.team.title") }}
        </DuckText>
        <DuckText class="text-sm text-[var(--ui-text-muted)]">
          {{ t("appLanding.page.index.features.team.desc") }}
        </DuckText>
      </DuckBox>
    </DuckBox>
  </DuckBox>
  <!-- Footer -->
  <AppLandingMoleculesFooter />
</template>
