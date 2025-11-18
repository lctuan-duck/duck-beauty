<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";
import type { ModalAndDrawerPropsCreateCfs } from "~~/layers/app-confession/app/components/organimsms/confession.create.vue";

const props = defineProps<ModalAndDrawerPropsCreateCfs>();

const emits = defineEmits<{
  (e: "on:confirm"): void;
  (e: "on:change-anonymous", value: boolean): void;
}>();
const { user } = useAuth();

const isOpen = defineModel<boolean>("open", { default: false });

const MENU_ACTIONS = ref<DropdownMenuItem[][]>([
  [
    {
      label: "Lưu bản nháp",
      icon: "i-lucide-save",
    },
  ],
]);

function onConfirm() {
  emits("on:confirm");
}

function onChangeAnonymous(value: boolean) {
  emits("on:change-anonymous", value);
}
</script>

<template>
  <UDrawer v-model:open="isOpen" :ui="{ content: 'p-2 h-full' }">
    <slot>
      <UCard class="rounded-2xl cursor-pointer">
        <div class="flex items-center gap-2 p-3 justify-between">
          <DuckUserCard v-if="user" :user="user" :is-show-content="false" />
          <DuckText class="flex-1 font-medium text-muted">
            {{ props.configs?.openPlaceholder }}
          </DuckText>
          <UButton
            :icon="props.configs?.openIcon"
            variant="soft"
            :label="props.configs?.openLabel"
          />
        </div>
      </UCard>
    </slot>

    <template #content>
      <div class="h-[calc(100%-14px)] flex flex-col relative">
        <!-- header -->
        <slot name="header">
          <div class="grid grid-cols-7 grid-rows-1 p-2">
            <!-- cancel button -->
            <div class="col-span-2 flex items-center justify-start">
              <UButton
                :icon="props.configs?.cancelIcon"
                color="neutral"
                :label="props.configs?.cancelLabel"
                variant="ghost"
                @click="isOpen = false"
              />
            </div>
            <!-- title -->
            <DuckText class="col-span-3 text-lg font-medium text-center">
              {{ props.configs?.title }}
            </DuckText>
            <!-- more action -->
            <div class="col-span-2 flex items-center justify-end">
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
            </div>
          </div>
        </slot>

        <!-- body -->
        <div class="p-3 flex-1 overflow-y-auto">
          <slot name="body"></slot>
        </div>
        <!-- footer -->
        <div
          class="flex-shrink-0 flex items-center justify-between p-2 pt-4 shadow-inner"
        >
          <USwitch
            unchecked-icon="i-lucide-x"
            checked-icon="i-lucide-check"
            default-value
            label="Đăng ẩn danh"
            @update:model-value="onChangeAnonymous($event)"
          />
          <UButton
            :icon="props.configs?.confirmIcon"
            variant="soft"
            :label="props.configs?.confirmLabel"
            @click="onConfirm"
          />
        </div>
      </div>
    </template>
  </UDrawer>
</template>
