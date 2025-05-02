<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: "img" | "label";
  }>(),
  {
    type: "img",
  }
);
</script>

<template>
  <DuckBox v-if="type === 'img'" class="flex items-center gap-1">
    <DuckImg
      src="/images/logo.png"
      alt="Logo DuckBeauty"
      class="w-10 object-cover"
      v-bind="$attrs"
    />
    <DuckText as="span" class="pacifico-regular">Duck Beauty</DuckText>
  </DuckBox>
  <DuckText v-else as="span" class="pacifico-regular text-2xl" v-bind="$attrs">
    Duck Beauty
  </DuckText>
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
