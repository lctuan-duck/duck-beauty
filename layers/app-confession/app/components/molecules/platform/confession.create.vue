<script lang="ts" setup>
import * as v from "valibot";
import { createReusableTemplate } from "@vueuse/core";

import type { JSONContent } from "@tiptap/vue-3";

interface FormState {
  summary: string;
  content: JSONContent | null;
  tags: string[];
  unlockPrice: number;
  allowTips: boolean;
}

export interface ModalAndDrawerPropsCreateCfs {
  configs?: {
    title?: string;
    // close config
    cancelLabel?: string;
    cancelIcon?: string;
    // open config
    openPlaceholder?: string;
    openLabel?: string;
    openIcon?: string;
    // confirm config
    confirmLabel?: string;
    confirmIcon?: string;
  };
}

const defaultConfigs = {
  title: "Viết Confession",
  // close config
  cancelLabel: "Hủy",
  cancelIcon: undefined,
  // open config
  openPlaceholder: "Viết Confession của bạn...",
  openLabel: undefined,
  openIcon: "lucide:edit",
  // confirm config
  confirmLabel: "Đăng confession",
  confirmIcon: "i-lucide-send",
};

const LIST_NOTE = [
  "Confession sẽ được kiểm duyệt trước khi hiển thị",
  "Không đăng nội dung vi phạm pháp luật, 18+, spam",
  "Tôn trọng quyền riêng tư của người khác",
  "Bạn có thể kiếm coins từ tips của người đọc",
];

const schema = v.object({
  summary: v.pipe(
    v.string(),
    v.minLength(10, "Phải có ít nhất 10 ký tự"),
    v.maxLength(100, "Phải có nhiều nhất 100 ký tự")
  ),
});

const props = withDefaults(defineProps<ModalAndDrawerPropsCreateCfs>(), {
  configs: () => ({}),
});

const [DefineFormTemplate, ReuseFormTemplate] = createReusableTemplate();

const isOpen = defineModel<boolean>("open", { default: false });
const editorState = reactive({ isEditorEmpty: false });

const state = reactive<FormState>({
  summary: "",
  content: null,
  tags: [],
  unlockPrice: 0,
  allowTips: true,
});

const mergedConfigs = computed(() => ({ ...defaultConfigs, ...props.configs }));

watch(isOpen, () => {
  if (!isOpen.value) editorState.isEditorEmpty = false;
});

function handleUpdateContent(content: JSONContent) {
  state.content = content;
}
</script>

<template>
  <DefineFormTemplate>
    <UForm :schema="schema" :state="state" class="space-y-4">
      <UFormField
        label="Tiêu đề / tóm tắt"
        name="summary"
        required
        :hint="`${state.summary.length}/100 ký tự`"
      >
        <UInput
          v-model="state.summary"
          placeholder="Vd: Tôi đã thầm yêu người đồng nghiệp 3 năm..."
          required
          size="lg"
          class="w-full"
        />
      </UFormField>

      <UFormField
        label="Nội dung chi tiết"
        name="content"
        required
        :error="editorState.isEditorEmpty ? 'Nội dung không được để trống' : ''"
      >
        <DuckEditor
          ref="editorRef"
          editor-class="!min-h-20 !max-h-96"
          placeholder="Kể câu chuyện của bạn..."
          is-required
          @update:content="handleUpdateContent"
          @update:content-text="editorState.isEditorEmpty = $event.length === 0"
          @blur="
            ({ isEmpty }) => {
              editorState.isEditorEmpty = isEmpty;
            }
          "
        />
      </UFormField>

      <UFormField label="Tags" name="tags" required hint="Tối đa 5 tags">
        <UInputTags
          v-model="state.tags"
          placeholder="Vd: Tình yêu, công việc, gia đình..."
          required
          size="lg"
          class="w-full"
        />
      </UFormField>

      <USeparator />

      <DuckText class="font-medium text-lg">Cài đặt</DuckText>

      <UAlert color="warning" variant="subtle">
        <template #title>
          <div class="w-full flex items-center justify-between">
            <DuckText class="font-semibold">Giá mở khoá</DuckText>
            <DuckText class="text-amber-900 text-lg"
              >{{ state.unlockPrice }} coin</DuckText
            >
          </div>
        </template>
        <template #actions>
          <div class="w-full flex gap-2 items-center">
            <div class="w-full flex flex-col gap-1">
              <USlider v-model="state.unlockPrice" :min="0" :max="100" />
              <div class="w-full flex items-center justify-between">
                <DuckText class="text-muted text-sm">Miễn phí</DuckText>
                <DuckText class="text-muted text-sm">100 coin</DuckText>
              </div>
              <DuckText class="text-amber-900 text-sm">
                Người đọc cần {{ state.unlockPrice }} coins để mở khóa nội dung
                (VIP xem miễn phí)</DuckText
              >
            </div>
          </div>
        </template>
      </UAlert>

      <UAlert
        title="Cho phép nhận tips"
        description="Người đọc có thể tip coins nếu thích confession của bạn"
        color="success"
        variant="subtle"
        orientation="horizontal"
      >
        <template #actions>
          <USwitch v-model="state.allowTips" />
        </template>
      </UAlert>

      <USeparator />

      <UAlert title="Lưu ý trước khi đăng" color="info" variant="subtle">
        <template #description>
          <ul class="list-disc list-inside space-y-1">
            <li v-for="note in LIST_NOTE" :key="note" class="text-info">
              {{ note }}
            </li>
          </ul>
        </template>
      </UAlert>
    </UForm>
  </DefineFormTemplate>

  <AppConfessionMoleculesDesktopConfessionCreateModal
    v-if="$breakpoints.isDesktop || $breakpoints.isTablet"
    v-model:open="isOpen"
    :configs="mergedConfigs"
  >
    <template #body>
      <ReuseFormTemplate />
    </template>
  </AppConfessionMoleculesDesktopConfessionCreateModal>

  <AppConfessionMoleculesMobileConfessionCreateDrawer
    v-else
    v-model:open="isOpen"
    :configs="mergedConfigs"
  >
    <template #body>
      <ReuseFormTemplate />
    </template>
  </AppConfessionMoleculesMobileConfessionCreateDrawer>
</template>
