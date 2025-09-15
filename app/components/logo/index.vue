<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: "img" | "label";
    to?: string;
  }>(),
  {
    type: "img",
    to: "/",
  }
);
</script>

<template>
  <DuckBox v-if="type === 'img'" class="flex items-center gap-1">
    <DuckImg
      src="/images/logo.png"
      alt="Logo"
      class="w-10 object-cover cursor-pointer"
      v-bind="$attrs"
      @click="navigateTo(to)"
    />
    <DuckText as="span" class="pacifico-regular">Duck</DuckText>
  </DuckBox>
  <DuckText
    v-else
    as="span"
    class="pacifico-regular text-2xl cursor-pointer text-center"
    v-bind="$attrs"
    @click="navigateTo(to)"
  >
    Duck
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
