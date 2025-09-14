<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";
import { SIZE } from "~/constants";

const colorMode = useColorMode();
const { user } = useAuth();
const route = useRoute();

const NAV_ITEMS = ref([
  {
    label: "Home",
    icon: "i-lucide-home",
    to: "/confession",
    exact: true,
  },
  {
    label: "Search",
    icon: "i-lucide-search",
    to: "/confession/search",
  },
  {
    label: "Activity",
    icon: "i-lucide-bell",
    to: "/confession/activity",
  },
]);

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set(_isDark) {
    colorMode.preference = _isDark ? "dark" : "light";
  },
});

const itemsDropdown = computed<DropdownMenuItem[]>(() => [
  {
    label: user.value?.username || "[unknown]",
    avatar: { src: getAvatarUrl(user.value?.avatar) },
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

function useLink(to: string, exact = false) {
  return route.path === to || (!exact && route.path.startsWith(to));
}
</script>

<template>
  <DuckBox class="flex h-full w-full">
    <!-- navigation left -->
    <DuckBox
      class="h-dvh p-2 flex flex-col gap-4 justify-between"
      :style="{ width: SIZE.SIDEBAR_WIDTH + 'px' }"
    >
      <!-- logo -->
      <DuckLogo type="label" class="text-base" />
      <DuckBox class="flex flex-col flex-1 items-center justify-start gap-2">
        <UButton
          v-for="item in NAV_ITEMS"
          :key="item.label"
          :to="item.to"
          :icon="item.icon"
          :aria-label="item.label"
          size="lg"
          :color="useLink(item.to, item?.exact) ? 'primary' : 'neutral'"
          :variant="useLink(item.to, item?.exact) ? 'soft' : 'ghost'"
        />
      </DuckBox>
      <DuckBox class="flex flex-col gap-2 items-center justify-center">
        <UButton
          color="neutral"
          variant="soft"
          :icon="isDark ? 'line-md:moon-alt-loop' : 'entypo:light-up'"
          size="lg"
          @click="isDark = !isDark"
        >
        </UButton>
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
              :src="getAvatarUrl(user?.avatar)"
              :alt="user?.username"
              variant="ghost"
              class="cursor-pointer"
              to="/profile"
            />
          </UButton>
        </UDropdownMenu>
      </DuckBox>
    </DuckBox>

    <!-- page -->
    <DuckBox class="flex-1 p-2 bg-[var(--ui-bg-muted)]">
      <slot />
    </DuckBox>
  </DuckBox>
</template>
