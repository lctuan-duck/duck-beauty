<script setup lang="ts">
const isOpen = defineModel("open", {
  default: false,
  type: Boolean,
});
</script>

<template>
  <UDrawer
    v-model:open="isOpen"
    :should-scale-background="$breakpoints.isMobile"
    :set-background-color-on-scale="$breakpoints.isMobile"
    :direction="$breakpoints.isMobile ? 'bottom' : 'right'"
    :handle="$breakpoints.isMobile"
    :dismissible="$breakpoints.isMobile"
    :modal="$breakpoints.isMobile"
    :ui="{ body: 'w-sm' }"
  >
    <slot />

    <template #body>
      <div class="flex items-center justify-between gap-4 mb-4">
        <h2 class="text-highlighted font-semibold">Drawer non-dismissible</h2>

        <UButton
          color="neutral"
          variant="ghost"
          icon="i-lucide-x"
          @click="isOpen = false"
        />
      </div>
    </template>
  </UDrawer>
</template>
