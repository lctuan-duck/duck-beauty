<script setup lang="ts">
import { useImage } from "@vueuse/core";
import { IMAGE_DEFAULT } from "~/constants";

const props = withDefaults(
  defineProps<{
    src?: string;
    element?: "img" | "nuxt-img";
  }>(),
  {
    src: IMAGE_DEFAULT.PLACEHOLDER,
    element: "nuxt-img",
  }
);

const { isLoading, error } = useImage({ src: props.src }, { delay: 0 });
</script>
<template>
  <USkeleton v-if="isLoading" class="size-full" v-bind="$attrs" />
  <NuxtImg
    v-else-if="!isLoading && props.element === 'nuxt-img'"
    :src="error ? IMAGE_DEFAULT.PLACEHOLDER : props.src"
    alt="image"
    width="100%"
    height="100%"
    loading="lazy"
    placeholder="blur"
    decoding="async"
    v-bind="$attrs"
  />
  <img
    v-else
    :src="error ? IMAGE_DEFAULT.PLACEHOLDER : props.src"
    alt="image"
    width="100%"
    height="100%"
    loading="lazy"
    decoding="async"
    :class="[
      'transition-all duration-700 ease-in-out',
      isLoading ? 'blur-sm grayscale-0' : 'grayscale',
    ]"
    v-bind="$attrs"
  />
</template>
