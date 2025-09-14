<script setup lang="ts">
import type { UserRes } from "#app-auth/types";

withDefaults(
  defineProps<{
    user?: Pick<UserRes, "username" | "avatar" | "id" | "fullName">;
    isAnonymous?: boolean;
  }>(),
  {
    isAnonymous: false,
    user: undefined,
  }
);
</script>

<template>
  <DuckBox v-if="isAnonymous" class="flex items-center gap-3">
    <!-- User Avatar -->
    <UAvatar size="lg" :src="getAvatarUrl()" alt="User Avatar" />
    <!-- username -->
    <DuckBox>
      <DuckText class="font-medium">Ẩn danh</DuckText>
      <slot name="subtitle"></slot>
    </DuckBox>
  </DuckBox>

  <DuckBox v-else-if="user" class="flex items-center gap-3">
    <!-- User Avatar -->
    <UAvatar size="md" :src="getAvatarUrl(user.avatar)" alt="User Avatar" />
    <!-- username -->
    <DuckBox>
      <DuckText class="font-medium">{{ user.username }}</DuckText>
      <slot name="subtitle"></slot>
    </DuckBox>
  </DuckBox>
</template>
