<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    mode?: "SIGN_IN" | "SIGN_UP";
  }>(),
  {
    mode: "SIGN_IN",
  }
);
const { t } = useI18n();
</script>

<template>
  <DuckBox class="text-center space-y-4">
    <DuckText class="text-sm font-medium">
      {{
        t(
          `appAuth.page.${
            props.mode === "SIGN_IN" ? "signin" : "signUp"
          }.social`
        )
      }}
    </DuckText>
    <DuckBox class="flex justify-center space-x-4">
      <UButton icon="flat-color-icons:google" variant="soft" color="neutral" />
      <UButton icon="logos:facebook" variant="soft" color="neutral" />
      <UButton icon="logos:twitter" variant="soft" color="neutral" />
      <UButton icon="bi:github" variant="soft" color="neutral" />
    </DuckBox>
  </DuckBox>
</template>
