<script setup lang="ts">
const searchQuery = ref("");
</script>

<template>
  <div>
    <UInput
      v-model="searchQuery"
      icon="i-lucide-search"
      placeholder="Tìm kiếm công ty theo tên, ngành nghề, địa điểm..."
      size="xl"
      class="w-full"
      :ui="{ trailing: 'pe-1', base: 'rounded-2xl py-4' }"
    >
      <template v-if="searchQuery?.length" #trailing>
        <UButton
          color="neutral"
          variant="link"
          icon="i-lucide-circle-x"
          aria-label="Clear input"
          @click="searchQuery = ''"
        />
      </template>
    </UInput>
  </div>
</template>
