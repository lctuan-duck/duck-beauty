<script setup lang="ts">
import { mockCompanies } from "../../mocks/data";

useHead({
  title: "Confession - Welcome!",
});

definePageMeta({
  layout: "confession-layout",
});
</script>
<template>
  <div class="w-full py-4">
    <div class="w-full max-w-6xl m-auto">
      <div class="mb-4 w-full">
        <AppCompanyMoleculesPlatformCompanySearchInput />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AppCompanyMoleculesPlatformCompanyCard
          v-for="item in mockCompanies"
          :key="item.id"
          :company="item"
        />
      </div>
    </div>
  </div>
</template>
