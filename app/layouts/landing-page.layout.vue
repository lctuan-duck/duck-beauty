<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const route = useRoute();
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set(_isDark) {
    colorMode.preference = _isDark ? "dark" : "light";
  },
});

const itemsComputed = computed<NavigationMenuItem[]>(() => [
  {
    label: "Trang chủ",
    active: route.path === "/",
    to: "/",
  },
  {
    label: "Dịch vụ",
    active: route.path === "/services",
    to: "/services",
  },
  {
    label: "Bảng giá",
    active: route.path === "/pricing",
    to: "/pricing",
  },
  {
    label: "Liên hệ",
    active: route.path === "/contact",
    to: "/contact",
  },
]);
</script>

<template>
  <!-- Header -->
  <DuckBox
    as="header"
    class="flex items-center justify-between px-8 py-4 sticky top-0 bg-[var(--ui-bg)] z-10 shadow"
  >
    <DuckBox class="flex items-center space-x-2">
      <DuckLogo />
    </DuckBox>
    <UNavigationMenu
      :items="itemsComputed"
      variant="link"
      class="w-full justify-center"
    >
      <template #components-trailing>
        <UBadge label="44" variant="subtle" size="sm" />
      </template>
    </UNavigationMenu>
    <DuckBox class="gap-2 hidden md:flex items-center">
      <!-- use ClientOnly to remove mismatch error -->
      <ClientOnly>
        <UButton
          color="neutral"
          variant="ghost"
          :icon="isDark ? 'line-md:moon-alt-loop' : 'entypo:light-up'"
          size="lg"
          @click="isDark = !isDark"
        >
        </UButton>
      </ClientOnly>
      <!-- button signin/signup -->
      <UButton label="Đăng nhập" variant="ghost" size="lg" />
      <UButton label="Đăng kí" size="lg" />
    </DuckBox>
  </DuckBox>
  <!-- main -->
  <NuxtPage />
</template>
