<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";
import type { JSONContent } from "@tiptap/vue-3";

const props = withDefaults(
  defineProps<{
    configs?: {
      title?: string;
      // close config
      cancelLabel?: string;
      cancelIcon?: string;
      // open config
      openLabel?: string;
      openIcon?: string;
      // confirm config
      confirmLabel?: string;
      confirmIcon?: string;
    };
  }>(),
  {
    configs: () => ({}),
  }
);

const defaultConfigs = {
  title: "Tạo confession",
  // close config
  cancelLabel: "Hủy",
  cancelIcon: undefined,
  // open config
  openPlaceholder: "Bạn muốn nói gì?",
  openLabel: "Tạo confession",
  openIcon: undefined,
  // confirm config
  confirmLabel: "Đăng",
};

const emits = defineEmits<{
  (e: "on:confirm", content: JSONContent | null): void;
  (e: "on:change-anonymous", value: boolean): void;
}>();
const { user } = useAuth();
const content = ref<JSONContent | null>(null);
const isOpen = defineModel<boolean>("open", { default: false });
const MENU_ACTIONS = ref<DropdownMenuItem[][]>([
  [
    {
      label: "Lưu bản nháp",
      icon: "i-lucide-save",
    },
  ],
]);

const mergedConfigs = computed(() => ({ ...defaultConfigs, ...props.configs }));

function onConfirm() {
  emits("on:confirm", content.value);
  isOpen.value = false;
}

function onChangeAnonymous(value: boolean) {
  emits("on:change-anonymous", value);
}
</script>

<template>
  <UModal
    v-model:open="isOpen"
    :ui="{ content: 'rounded-2xl p-2' }"
    :close-on-escape="true"
    :dismissible="false"
  >
    <slot>
      <UCard class="rounded-2xl">
        <DuckBox class="flex items-center gap-2 p-3 justify-between">
          <DuckUserCard v-if="user" :user="user" :is-show-content="false" />
          <DuckText class="flex-1 font-medium text-[var(--ui-text-muted)]">
            {{ mergedConfigs.openPlaceholder }}
          </DuckText>
          <UButton
            :icon="mergedConfigs.openIcon"
            variant="soft"
            :label="mergedConfigs.openLabel"
          />
        </DuckBox>
      </UCard>
    </slot>

    <template #content>
      <DuckBox>
        <!-- header -->
        <slot name="header">
          <DuckBox class="grid grid-cols-7 grid-rows-1 p-2">
            <!-- cancel button -->
            <DuckBox class="col-span-2 flex items-center justify-start">
              <UButton
                :icon="mergedConfigs.cancelIcon"
                color="neutral"
                :label="mergedConfigs.cancelLabel"
                variant="ghost"
                @click="isOpen = false"
              />
            </DuckBox>
            <!-- title -->
            <DuckText class="col-span-3 text-lg font-medium text-center">
              {{ mergedConfigs.title }}
            </DuckText>
            <!-- more action -->
            <DuckBox class="col-span-2 flex items-center justify-end">
              <UDropdownMenu
                :items="MENU_ACTIONS"
                :content="{
                  align: 'start',
                  side: 'bottom',
                  sideOffset: 8,
                }"
                :ui="{
                  content: 'w-48',
                }"
              >
                <UButton
                  icon="i-lucide-more-vertical"
                  color="neutral"
                  variant="ghost"
                  class="rounded-full"
                />
              </UDropdownMenu>
            </DuckBox>
          </DuckBox>
        </slot>

        <!-- body -->
        <DuckBox class="p-3">
          <DuckEditor
            editor-class="!min-h-20 !max-h-96"
            @update:content="content = $event"
          />
        </DuckBox>
        <!-- footer -->
        <DuckBox class="flex items-center justify-between p-2">
          <USwitch
            unchecked-icon="i-lucide-x"
            checked-icon="i-lucide-check"
            default-value
            label="Đăng ẩn danh"
            @update:model-value="onChangeAnonymous($event)"
          />
          <UButton
            :icon="mergedConfigs.confirmIcon"
            variant="soft"
            :label="mergedConfigs.confirmLabel"
            @click="onConfirm"
          />
        </DuckBox>
      </DuckBox>
    </template>
  </UModal>
</template>
