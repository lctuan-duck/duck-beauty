<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const route = useRoute();

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
    class="flex items-center justify-between px-8 py-4 sticky top-0 bg-white z-10 shadow"
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
    <DuckBox class="space-x-2 hidden md:flex items-center">
      <UButton label="Đăng nhập" variant="ghost" size="lg" />
      <UButton label="Đăng kí" size="lg" />
    </DuckBox>
  </DuckBox>
  <!-- main -->
  <NuxtPage />
</template>
