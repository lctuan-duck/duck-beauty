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
    editorClass?: string;
  }>(),
  {
    editable: true,
    content: undefined,
    editorClass: "",
  }
);

const emits = defineEmits<{
  (e: "update:content", content: JSONContent): void;
}>();

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
      placeholder: "Bạn đang có tâm sự gì ư? …",
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
});

watch(
  () => editor.value?.getJSON(),
  (newContent) => {
    emits("update:content", newContent as JSONContent);
  }
);

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
    class="flex flex-col gap-1"
    :class="{
      'p-4 ring ring-[var(--ui-border-muted)] rounded-lg': editable,
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
  </div>
</template>
