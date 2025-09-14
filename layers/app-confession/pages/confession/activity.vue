<script setup lang="ts">
useHead({
  title: "Confession - Welcome!",
});

definePageMeta({
  layout: "confession-layout",
});
</script>
<template>
  <DuckBox class="p-4">
    <UInput placeholder="Search..." size="lg" class="w-full" />
  </DuckBox>
</template>
