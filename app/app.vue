<script setup lang="ts"></script>

<template>
  <NuxtLoadingIndicator />
  <UApp
    :toaster="{
      position: 'bottom-left',
    }"
  >
    <div vaul-drawer-wrapper>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </UApp>
</template>
