<script setup lang="ts">
import { formattedConfessions } from "../../mocks/data";

useHead({
  title: "Confession - Welcome!",
});

definePageMeta({
  layout: "confession-layout",
});
</script>
<template>
  <div class="w-full py-4">
    <div class="w-full max-w-5xl m-auto">
      <AppConfessionMoleculesPlatformConfessionCreate class="mb-4" />
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AppConfessionMoleculesPlatformConfessionPostCard
          v-for="item in formattedConfessions"
          :key="item.id"
          :item="item"
        />
      </div>
    </div>
  </div>
</template>
