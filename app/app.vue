<script setup lang="ts">
</script>

<template>
  <NuxtLoadingIndicator />
  <UApp
    :toaster="{
      position: 'bottom-left',
    }"
  >
    <DuckBox vaul-drawer-wrapper>
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
    </DuckBox>
  </UApp>
</template>
