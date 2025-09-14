<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});

function getErrorMessage(error?: NuxtError) {
  switch (error?.statusCode) {
    case 404:
      return "Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.";
    case 500:
      return "Đã xảy ra lỗi máy chủ. Vui lòng thử lại sau.";
    case 403:
      return "Bạn không có quyền truy cập vào trang này.";
    case 401:
      return "Bạn cần đăng nhập để truy cập trang này.";
    default:
      return error?.message || "Đã xảy ra lỗi. Vui lòng thử lại sau.";
  }
}
console.log(props.error);
const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <DuckBox
    class="flex flex-col items-center justify-center min-h-screen bg-[var(--ui-bg)]"
  >
    <DuckImg class="max-w-md" loading="eager" />
    <DuckBox class="text-7xl font-bold text-primary mb-4">
      {{ props.error?.statusCode }}
    </DuckBox>
    <DuckBox class="text-2xl font-semibold mb-2">
      {{ props.error?.statusMessage }}
    </DuckBox>
    <DuckBox class="text-neutral-500 mb-6 text-center">
      {{ getErrorMessage(props.error) }}
    </DuckBox>
    <UButton variant="soft" size="lg" icon="i-lucide-home" @click="handleError">
      Quay về trang chủ
    </UButton>
  </DuckBox>
</template>
