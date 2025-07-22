<script setup lang="ts">
withDefaults(
  defineProps<{
    isLoading?: boolean;
  }>(),
  {
    isLoading: false,
  }
);
</script>

<template>
  <Transition name="fade" mode="out-in">
    <DuckBox
      v-if="isLoading"
      class="size-dvh fixed top-0 left-0 right-0 bottom-0 z-[9999] bg-[var(--ui-bg)] flex items-center justify-center"
    >
    </DuckBox>
  </Transition>
</template>
