<script setup lang="ts"></script>

<template>
  <div class="flex flex-col h-full min-h-dvh w-full relative">
    <!-- header -->
    <AppConfessionMoleculesPlatformConfessionHeader />

    <!-- page -->
    <div class="flex-1 p-2 bg-[var(--ui-bg-muted)]">
      <slot />
    </div>
  </div>
</template>
