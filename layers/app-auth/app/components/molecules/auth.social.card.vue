<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    mode?: "SIGN_IN" | "SIGN_UP";
  }>(),
  {
    mode: "SIGN_IN",
  }
);

const inProgressing = defineModel<boolean>("inProgressing", { default: false });

const { t } = useI18n();
const { loadGoogleScript, loginWithGoogle } = useGoogleAuth();

onMounted(() => {
  loadGoogleScript();
});

async function handleLoginWithGoogle() {
  try {
    inProgressing.value = true;
    await loginWithGoogle();
  } catch (error) {
    console.error("Google login failed:", error);
  } finally {
    inProgressing.value = false;
  }
}
</script>

<template>
  <div class="text-center space-y-4">
    <DuckText class="text-sm font-medium">
      {{
        t(
          `appAuth.page.${
            props.mode === "SIGN_IN" ? "signin" : "signUp"
          }.social`
        )
      }}
    </DuckText>
    <div class="flex justify-center space-x-4">
      <UButton
        icon="flat-color-icons:google"
        variant="soft"
        color="neutral"
        @click="handleLoginWithGoogle"
      />
      <UButton icon="logos:facebook" variant="soft" color="neutral" />
      <UButton icon="logos:twitter" variant="soft" color="neutral" />
      <UButton icon="bi:github" variant="soft" color="neutral" />
    </div>
  </div>
</template>
