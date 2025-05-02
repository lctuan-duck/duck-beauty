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

const imageOptions = reactive({ src: props.src });
const { isLoading, error } = useImage(imageOptions, { delay: 0 });
</script>
<template>
  <USkeleton v-if="isLoading" class="size-full" v-bind="$attrs" />
  <NuxtImg
    v-else-if="!isLoading && props.element === 'nuxt-img'"
    :src="error ? IMAGE_DEFAULT.PLACEHOLDER : imageOptions.src"
    alt="image"
    width="100%"
    height="100%"
    loading="lazy"
    v-bind="$attrs"
  />
  <img
    v-else
    :src="error ? IMAGE_DEFAULT.PLACEHOLDER : imageOptions.src"
    alt="image"
    width="100%"
    height="100%"
    loading="lazy"
    v-bind="$attrs"
  />
</template>
