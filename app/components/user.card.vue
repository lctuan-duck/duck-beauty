<script setup lang="ts">
import type { UserRes } from "#app-auth/app/types";

withDefaults(
  defineProps<{
    user?: Pick<UserRes, "username" | "avatar" | "id" | "fullName">;
    isAnonymous?: boolean;
    titleClass?: string;
    isShowContent?: boolean;
  }>(),
  {
    isAnonymous: false,
    user: undefined,
    titleClass: "",
    isShowContent: true,
  }
);
</script>

<template>
  <div v-if="isAnonymous" class="flex items-center gap-3" v-bind="$attrs">
    <!-- User Avatar -->
    <UAvatar size="lg" :src="getAvatarUrl()" alt="User Avatar" />
    <!-- content -->
    <div v-if="isShowContent">
      <!-- username -->
      <div :class="titleClass">
        <DuckText class="font-medium">{{ getRandomUsername() }}</DuckText>
        <slot name="subtitle"></slot>
      </div>
      <slot name="content"></slot>
    </div>
  </div>

  <div v-else-if="user" class="flex items-center gap-3" v-bind="$attrs">
    <!-- User Avatar -->
    <UAvatar size="lg" :src="getAvatarUrl(user.avatar)" alt="User Avatar" />
    <!-- content -->
    <div v-if="isShowContent">
      <!-- username -->
      <div :class="titleClass">
        <DuckText class="font-medium">{{ user.username }}</DuckText>
        <slot name="subtitle"></slot>
      </div>
      <slot name="content"></slot>
    </div>
  </div>
</template>
