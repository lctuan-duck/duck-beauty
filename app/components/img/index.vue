<script setup lang="ts">
import { useImage } from '@vueuse/core'

const props = defineProps({
  src: {
    type: String,
    default: 'https://place-hold.it/1920x1080',
  },
});

const imageOptions = reactive({ src: props.src });
const { isLoading, error } = useImage(imageOptions, { delay: 0 });

</script>
<template>
  <USkeleton v-if="isLoading" class="size-full" v-bind="$attrs" />
  <NuxtImg v-else-if="error" src="https://place-hold.it/1920x1080" alt="image" width="100%" height="100%"
    loading="lazy" v-bind="$attrs" />
  <NuxtImg v-else :src="imageOptions.src" alt="image" width="100%" height="100%" loading="lazy" v-bind="$attrs" />
</template>
