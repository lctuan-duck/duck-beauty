<script setup lang="ts">
import type { UserRes } from "#app-auth/types";

withDefaults(
  defineProps<{
    user?: Pick<UserRes, "username" | "avatar" | "id" | "fullName">;
    isAnonymous?: boolean;
    titleClass?: string;
  }>(),
  {
    isAnonymous: false,
    user: undefined,
    titleClass: "",
  }
);
</script>

<template>
  <DuckBox v-if="isAnonymous" class="flex items-center gap-3" v-bind="$attrs">
    <!-- User Avatar -->
    <UAvatar size="lg" :src="getAvatarUrl()" alt="User Avatar" />
    <!-- content -->
    <DuckBox>
      <!-- username -->
      <DuckBox :class="titleClass">
        <DuckText class="font-medium">{{ getRandomUsername() }}</DuckText>
        <slot name="subtitle"></slot>
      </DuckBox>
      <slot name="content"></slot>
    </DuckBox>
  </DuckBox>

  <DuckBox v-else-if="user" class="flex items-center gap-3" v-bind="$attrs">
    <!-- User Avatar -->
    <UAvatar size="lg" :src="getAvatarUrl(user.avatar)" alt="User Avatar" />
    <!-- content -->
    <DuckBox>
      <!-- username -->
      <DuckBox :class="titleClass">
        <DuckText class="font-medium">{{ user.username }}</DuckText>
        <slot name="subtitle"></slot>
      </DuckBox>
      <slot name="content"></slot>
    </DuckBox>
  </DuckBox>
</template>
