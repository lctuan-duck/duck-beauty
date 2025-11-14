<script setup lang="ts">
const { user } = useAuth();
const { coins } = storeToRefs(useBinanceStore());
const colorMode = useColorMode();
const route = useRoute();

const NAV_ITEMS = ref([
  {
    label: "Trang chủ",
    icon: "lucide:home",
    to: "/confession",
    exact: true,
  },
  {
    label: "Review công ty",
    icon: "lucide:building-2",
    to: "/confession/companies",
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

function useLink(to: string, exact = false) {
  return route.path === to || (!exact && route.path.startsWith(to));
}
</script>

<template>
  <header
    class="sticky top-0 z-50 backdrop-blur-lg bg-[var(--ui-bg)]/40 border-b border-muted shadow-sm"
  >
    <div class="max-w-7xl mx-auto px-4 py-3">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-xl flex items-center justify-center bg-cfs-gradient"
          >
            <span class="text-xl">💭</span>
          </div>
          <div>
            <h1
              class="text-xl bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent"
            >
              Confession Market
            </h1>
            <p class="text-xs text-muted">Chia sẻ tâm sự • Kết nối cảm xúc</p>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="hidden md:flex items-center gap-2">
          <UButton
            v-for="item in NAV_ITEMS"
            :key="item.label"
            :variant="useLink(item.to, item.exact) ? 'solid' : 'ghost'"
            :color="useLink(item.to, item.exact) ? 'primary' : undefined"
            class="flex items-center"
            :to="item.to"
          >
            <UIcon :name="item.icon" class="w-4 h-4 mr-2" />
            {{ item.label }}
          </UButton>
        </nav>

        <!-- User Info -->
        <div class="flex items-center gap-3">
          <!-- Coins -->
          <div
            class="flex items-center gap-2 bg-gradient-to-r from-amber-50 to-yellow-50 px-3 py-2 rounded-full border border-amber-200"
          >
            <UIcon name="lucide:coins" class="w-4 h-4 text-amber-500" />
            <span class="text-amber-700">{{ coins }}</span>
          </div>

          <!-- Premium -->
          <div
            v-if="user?.isPremium"
            class="flex items-center gap-1 bg-gradient-to-r from-purple-100 to-pink-100 px-3 py-2 rounded-full border border-purple-200"
          >
            <UIcon name="mdi:crown" class="w-4 h-4 text-purple-600" />
            <span class="text-xs text-purple-700">VIP</span>
          </div>

          <!-- Profile -->
          <UButton
            :variant="useLink('/confession/profile') ? 'solid' : 'outline'"
            :color="useLink('/confession/profile') ? 'primary' : undefined"
            class="flex items-center"
            :class="{ 'bg-cfs-gradient': useLink('/confession/profile') }"
            to="/confession/profile"
          >
            <UIcon name="solar:user-linear" class="w-4 h-4" />
          </UButton>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <nav class="flex md:hidden items-center gap-2 mt-3">
        <UButton
          v-for="item in NAV_ITEMS"
          :key="item.label"
          size="sm"
          :variant="useLink(item.to, item.exact) ? 'solid' : 'ghost'"
          :color="useLink(item.to, item.exact) ? 'primary' : undefined"
          class="flex items-center"
          :to="item.to"
        >
          <UIcon :name="item.icon" class="w-4 h-4 mr-2" />
        </UButton>
      </nav>
    </div>
  </header>
</template>
