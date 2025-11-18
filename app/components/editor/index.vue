<script setup lang="ts">
import { useEditor, EditorContent, type JSONContent } from "@tiptap/vue-3";
import { DragHandle } from "@tiptap/extension-drag-handle";
import StarterKit from "@tiptap/starter-kit";
import NodeRange from "@tiptap/extension-node-range";
import Image from "@tiptap/extension-image";
import { Placeholder } from "@tiptap/extensions";

const props = withDefaults(
  defineProps<{
    editable?: boolean;
    content?: JSONContent;
    placeholder?: string;
    editorClass?: string;
    clampedHeight?: number;
    isRequired?: boolean;
  }>(),
  {
    editable: true,
    content: undefined,
    placeholder: "Bạn đang có tâm sự gì ư? …",
    editorClass: "",
    clampedHeight: 0,
    isRequired: false,
  }
);

const emits = defineEmits<{
  (e: "update:content", content: JSONContent): void;
  (e: "update:content-text", contentText: string): void;
  (e: "blur", payload: { isEmpty: boolean }): void;
}>();

const wrapperRef = useTemplateRef<HTMLElement>("editorWrapper");
const isClamped = ref(false);
const state = reactive({
  isEditorEmpty: false,
  isBlurred: false,
  isFocused: false,
});

const editor = useEditor({
  content: props.content,
  editable: props.editable,
  extensions: [
    StarterKit,
    NodeRange,
    Image.configure({
      allowBase64: true,
    }),
    Placeholder.configure({
      placeholder: props.placeholder,
    }),
    ...(props.editable ? [DragHandle] : []),
  ],
  editorProps: {
    attributes: {
      class:
        "overflow-y-auto scroll-smaller h-full" +
        (props.editable
          ? ` ${props.editorClass}`
          : ` ${props.editorClass} !min-h-0`),
      autocomplete: "off",
      autocorrect: "off",
      autocapitalize: "off",
      "aria-label": "Main content area, start typing to enter text.",
    },
  },
  onBlur({ editor }) {
    state.isBlurred = true;
    state.isFocused = false;
    const text = editor.getText().trim();
    const isEmpty = text.length === 0;

    if (props.isRequired && props.editable) {
      state.isEditorEmpty = isEmpty;
    }

    emits("blur", { isEmpty });
  },
  onFocus() {
    state.isFocused = true;
    state.isBlurred = false;
  },
});

function checkClamped() {
  if (!wrapperRef.value) return;
  if (!props.clampedHeight || props.clampedHeight <= 0) return;

  const el = wrapperRef.value;

  // đảm bảo khi clamp thì có max-height
  el.style.maxHeight = props.clampedHeight + "px";
  el.style.overflow = "hidden";

  nextTick(() => {
    // Sau nextTick nhưng vẫn quá sớm với TipTap → dùng requestAnimationFrame
    requestAnimationFrame(() => {
      isClamped.value = el.scrollHeight > el.clientHeight;
    });
  });
}

watch(
  () => editor.value?.getJSON(),
  (newContent) => {
    emits("update:content", newContent as JSONContent);
    checkClamped();
  }
);

watch(
  () => editor.value?.getText().trim(),
  (value) => {
    if (value === undefined) return;
    if (state.isFocused) {
      state.isEditorEmpty = value.length === 0;
      emits("update:content-text", value || "");
    }
    if (!state.isBlurred) return;
    state.isEditorEmpty = value.length === 0;
    emits("update:content-text", value || "");
  }
);

defineExpose({
  editor,
});

const EXTENSION_ITEMS = [
  {
    label: "Bold",
    icon: "i-lucide:bold",
    action: () => editor.value?.chain().focus().toggleBold().run(),
  },
  {
    label: "Italic",
    icon: "i-lucide:italic",
    action: () => editor.value?.chain().focus().toggleItalic().run(),
  },
  {
    label: "Strike",
    icon: "i-lucide:strikethrough",
    action: () => editor.value?.chain().focus().toggleStrike().run(),
  },
  {
    label: "Code",
    icon: "i-lucide:code",
    action: () => editor.value?.chain().focus().toggleCodeBlock().run(),
  },
  {
    label: "Underline",
    icon: "i-lucide:underline",
    action: () => editor.value?.chain().focus().toggleUnderline().run(),
  },
  {
    label: "Link",
    icon: "i-lucide:link",
    action: () => editor.value?.chain().focus().toggleLink().run(),
  },
  {
    label: "List",
    icon: "i-lucide:list",
    childs: [
      {
        label: "Bullet List",
        icon: "i-lucide:list",
        onSelect: () => editor.value?.chain().focus().toggleBulletList().run(),
      },
      {
        label: "Ordered List",
        icon: "i-lucide:list-ordered",
        onSelect: () => editor.value?.chain().focus().toggleOrderedList().run(),
      },
      // {
      //   label: "Task List",
      //   icon: "i-lucide:check-square",
      //   onSelect: () => editor.value?.chain().focus().toggleTaskList().run(),
      // },
    ],
  },
];
</script>

<template>
  <div
    ref="editorWrapper"
    class="flex flex-col gap-1 relative"
    :class="{
      'p-4 ring ring-[var(--ui-border-muted)] rounded-lg': editable,
      'ring-[var(--ui-error)]': state.isEditorEmpty,
      'ring-2': state.isEditorEmpty && state.isFocused,
    }"
  >
    <!-- editor content -->
    <EditorContent class="h-full" :editor="editor" />
    <USeparator v-if="editable" class="my-1" />
    <!-- list items extension -->
    <div v-if="editable" class="flex gap-1 items-center justify-center">
      <UTooltip
        v-for="item in EXTENSION_ITEMS"
        :key="item.label"
        :text="item.label"
        :delay-duration="100"
      >
        <UButton
          v-if="!item.childs"
          :icon="item.icon"
          color="neutral"
          variant="ghost"
          @click="item?.action?.()"
        />
        <UDropdownMenu
          v-else
          :items="item.childs"
          :content="{
            align: 'start',
            side: 'bottom',
            sideOffset: 8,
          }"
          :ui="{
            content: 'w-48',
          }"
        >
          <UButton :icon="item.icon" color="neutral" variant="ghost" />
        </UDropdownMenu>
      </UTooltip>
    </div>

    <!-- Fade-out nếu bị clamp && editable = false -->
    <div
      v-if="isClamped && !props.editable"
      class="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-b from-transparent to-default/80"
    />
  </div>
</template>
