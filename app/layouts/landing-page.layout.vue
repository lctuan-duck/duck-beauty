<script setup lang="ts">
import type { NavigationMenuItem, DropdownMenuItem } from "@nuxt/ui";

const { t } = useI18n();
const route = useRoute();
const colorMode = useColorMode();
const { user } = useAuth();

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
    label: t("appLanding.page.index.header.nav.home"),
    active: route.path === "/",
    to: "/",
  },
  {
    label: t("appLanding.page.index.header.nav.services"),
    active: route.path === "/services",
    to: "/services",
  },
  {
    label: t("appLanding.page.index.header.nav.pricing"),
    active: route.path === "/pricing",
    to: "/pricing",
  },
  {
    label: t("appLanding.page.index.header.nav.contact"),
    active: route.path === "/contact",
    to: "/contact",
  },
]);
const itemsDropdown = computed<DropdownMenuItem[]>(() => [
  {
    label: user.value?.username || "[unknown]",
    avatar: {
      src: user.value?.avatar,
    },
    type: "label",
  },
  {
    label: "Logout",
    icon: "i-lucide:log-out",
    color: "error",
    onSelect() {
      const { logout } = useAuth();
      logout();
    },
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
      <!-- user card -->
      <DuckBox v-if="user?.id" class="gap-2 flex items-center">
        <UDropdownMenu
          size="lg"
          :items="itemsDropdown"
          :content="{
            align: 'start',
          }"
          :ui="{
            content: 'w-48',
          }"
        >
          <UButton size="lg" color="neutral" variant="ghost" class="p-0">
            <UAvatar
              :src="user?.avatar"
              :alt="user?.username"
              variant="ghost"
              class="cursor-pointer"
              to="/profile"
            />
          </UButton>
        </UDropdownMenu>

        <UButton
          :label="t('appLanding.page.index.header.cta.manicure')"
          size="lg"
        />
      </DuckBox>
      <!-- button signin/signup -->
      <DuckBox v-else class="gap-2 flex items-center">
        <UButton
          :label="t('appAuth.page.signin.title')"
          variant="ghost"
          size="lg"
          to="/auth/signin"
        />
        <UButton
          :label="t('appAuth.page.signUp.title')"
          size="lg"
          to="/auth/signup"
        />
      </DuckBox>
    </DuckBox>
  </DuckBox>
  <!-- main -->
  <NuxtPage />
</template>
