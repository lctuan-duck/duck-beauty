<script lang="ts">
export default defineComponent({
  inheritAttrs: false,
  props: {
    as: {
      type: String,
      default: 'p',
    },
  },
});
</script>

<template>
  <component :is="as" v-bind="$attrs">
    <slot />
  </component>
</template>
