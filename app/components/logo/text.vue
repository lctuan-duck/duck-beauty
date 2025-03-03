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
  <component :is="as" class="sofia-regular text-2xl" v-bind="$attrs">
    Duck Beauty
  </component>
</template>

<style scoped>
.pacifico-regular {
  font-family: "Pacifico", serif;
  font-weight: 400;
  font-style: normal;
}
.sofia-regular {
  font-family: "Sofia", serif;
  font-weight: 700;
  font-style: normal;
}

</style>