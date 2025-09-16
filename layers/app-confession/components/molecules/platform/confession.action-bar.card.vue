<script setup lang="ts">
import type { REACTION_TYPE } from "#app-confession/types/reactions";

type Reaction = {
  label: string;
  icon: string;
  type: REACTION_TYPE;
};

const emits = defineEmits<{
  (e: "like", reaction: Reaction): void;
  (e: "reply" | "re-post"): void;
}>();
</script>

<template>
  <AppConfessionMoleculesPlatformReactionsPopover
    @select="(reaction) => emits('like', reaction)"
  >
    <UButton
      icon="i-lucide-heart"
      color="primary"
      variant="ghost"
      label="10k"
    />
  </AppConfessionMoleculesPlatformReactionsPopover>
  <UButton
    icon="i-lucide-message-circle"
    color="neutral"
    variant="ghost"
    label="342"
    @click="emits('reply')"
  />
  <UButton
    icon="i-lucide-repeat"
    color="neutral"
    variant="ghost"
    label="93"
    @click="emits('re-post')"
  />
</template>
