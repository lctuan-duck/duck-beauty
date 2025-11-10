<script lang="ts" setup>
import { REACTION_TYPE } from "~~/layers/app-confession/app/types/reactions";

const REACTIONS = [
  {
    label: "Heart",
    icon: "❤️",
    type: REACTION_TYPE.LOVE,
  },
  {
    label: "Laugh",
    icon: "😂",
    type: REACTION_TYPE.HAHA,
  },
  {
    label: "Wow",
    icon: "😮",
    type: REACTION_TYPE.WOW,
  },
  {
    label: "Sad",
    icon: "😢",
    type: REACTION_TYPE.SAD,
  },
  {
    label: "Angry",
    icon: "😡",
    type: REACTION_TYPE.ANGRY,
  },
];

const emit = defineEmits<{
  (e: "select", reaction: (typeof REACTIONS)[number]): void;
}>();

function onSelect(reaction: (typeof REACTIONS)[number]) {
  emit("select", reaction);
}
</script>

<template>
  <UPopover
    placement="top"
    mode="hover"
    :open-delay="0"
    :content="{
      align: 'start',
      side: 'bottom',
      sideOffset: 8,
    }"
  >
    <slot>
      <UButton
        icon="i-lucide-heart"
        color="neutral"
        variant="ghost"
        class="rounded-full"
      />
    </slot>
    <template #content>
      <DuckBox class="grid grid-cols-5 gap-2 p-2">
        <UTooltip
          v-for="reaction in REACTIONS"
          :key="reaction.type"
          :text="reaction.label"
          :delay="0"
        >
          <UButton
            variant="ghost"
            :ui="{ label: 'text-lg' }"
            class="px-1 py-0"
            :label="reaction.icon"
            @click="onSelect(reaction)"
          />
        </UTooltip>
      </DuckBox>
    </template>
  </UPopover>
</template>
