<script setup lang="ts">
import { DotLottieVue } from "@lottiefiles/dotlottie-vue";

withDefaults(
  defineProps<{
    isLoading?: boolean;
    animation?: "BASE" | "WELCOME";
  }>(),
  {
    isLoading: false,
    animation: "BASE",
  }
);

const emits = defineEmits<{
  (e: "complete"): void;
}>();
</script>

<template>
  <Transition name="fade" mode="out-in">
    <DuckBox
      v-if="isLoading"
      class="size-full fixed top-0 left-0 right-0 bottom-0 z-[9999] bg-[var(--ui-bg)] flex items-center justify-center"
    >
      <DotLottieVue
        v-if="animation === 'WELCOME'"
        src="/animations/json/welcome.json"
        style="height: 500px; width: 500px"
        autoplay
        loop
        :render-config="{
          autoResize: true,
        }"
        @on-complete="() => emits('complete')"
      />
    </DuckBox>
  </Transition>
</template>
