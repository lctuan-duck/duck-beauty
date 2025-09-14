<script setup lang="ts">
import { useEditor, EditorContent, type JSONContent } from "@tiptap/vue-3";
import { DragHandle } from "@tiptap/extension-drag-handle";
import StarterKit from "@tiptap/starter-kit";
import NodeRange from "@tiptap/extension-node-range";
import Image from "@tiptap/extension-image";

const props = withDefaults(
  defineProps<{
    editable?: boolean;
    content?: JSONContent;
  }>(),
  {
    editable: true,
    content: undefined,
  }
);

const editor = useEditor({
  content: props.content,
  editable: props.editable,
  extensions: [
    StarterKit,
    NodeRange,
    Image.configure({
      allowBase64: true,
    }),
    ...(props.editable ? [DragHandle] : []),
  ],
  editorProps: {
    attributes: {
      class: props.editable ? "" : "!min-h-0",
      autocomplete: "off",
      autocorrect: "off",
      autocapitalize: "off",
      "aria-label": "Main content area, start typing to enter text.",
    },
  },
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
  <DuckBox
    class="flex flex-col gap-1"
    :class="{
      'p-2 ring ring-[var(--ui-border-muted)] rounded-lg': editable,
    }"
  >
    <!-- editor content -->
    <EditorContent :editor="editor" />
    <USeparator v-if="editable" class="my-1" />
    <!-- list items extension -->
    <DuckBox v-if="editable" class="flex gap-1 items-center justify-center">
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
    </DuckBox>
  </DuckBox>
</template>
