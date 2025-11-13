<script setup lang="ts">
import { REQUEST_STATUS } from "#app-auth/app/types";
import type { FormSubmitEvent } from "@nuxt/ui";
import * as v from "valibot";

const { t } = useI18n();

definePageMeta({
  layout: "default-auth-layout",
});
useHead({
  title: t("appAuth.page.forgotPassword.title"),
});

const schema = v.object({
  email: v.pipe(
    v.string(t("appAuth.page.forgotPassword.validation.email")),
    v.email(t("appAuth.page.forgotPassword.validation.email"))
  ),
});

type Schema = v.InferOutput<typeof schema>;

const timer = ref<NodeJS.Timeout | null>(null);
const state = reactive({
  response: {
    status: REQUEST_STATUS.IDLE,
    code: 0,
  },
  form: {
    email: "",
  },
  loading: {
    isPending: false,
  },
  countdown: 60,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (state.loading.isPending) return;
  if (timer.value) return;

  state.loading.isPending = true;

  const result = await useAuth().forgotPassword(event.data.email);

  state.response = result;
  state.loading.isPending = false;

  if (result.status === REQUEST_STATUS.SUCCESS) {
    startCountdown();
  }
}

function startCountdown() {
  if (timer.value) clearInterval(timer.value);
  state.countdown = 60;

  timer.value = setInterval(() => {
    state.countdown--;

    if (state.countdown <= 0 && timer.value) {
      clearInterval(timer.value);
      timer.value = null;
    }
  }, 1000);
}

function getErrorMessage() {
  switch (state.response.code) {
    case 400:
      return t("appAuth.page.forgotPassword.error.badRequest");
    case 404:
      return t("appAuth.page.forgotPassword.error.notFound");
    default:
      return t("appAuth.page.forgotPassword.error.default");
  }
}
</script>

<template>
  <div class="max-sm:mx-4 sm:w-[400px]">
    <!-- Form Card -->
    <div
      class="p-8 w-full max-w-md space-y-4 relative overflow-hidden bg-[var(--ui-bg)] shadow-xl rounded-xl ring ring-[var(--ui-border)]"
    >
      <!-- Header -->
      <div class="text-center space-y-1">
        <DuckText class="text-2xl font-semibold">
          {{ t("appAuth.page.forgotPassword.title") }}
        </DuckText>
        <DuckText class="text-sm text-[var(--ui-text-dimmed)]">
          {{ t("appAuth.page.forgotPassword.subtitle") }}
        </DuckText>
      </div>

      <!-- Form Inputs -->
      <UForm
        :schema="schema"
        :state="state.form"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField
          :label="t('appAuth.page.forgotPassword.email.label')"
          name="email"
        >
          <UInput
            v-model="state.form.email"
            :placeholder="t('appAuth.page.forgotPassword.email.placeholder')"
            size="lg"
            auto-capitalize="on"
            auto-complete="email"
            auto-correct="off"
            class="w-full"
          />
        </UFormField>
        <!-- Submit Button -->
        <UButton
          v-if="!timer && state.countdown !== 0"
          block
          size="lg"
          :label="t('appAuth.page.forgotPassword.submit')"
          :loading="state.loading.isPending"
          :disabled="state.loading.isPending"
          type="submit"
        />
        <UButton
          v-else
          block
          type="submit"
          :disabled="!!state.countdown"
          :loading="state.loading.isPending"
          :label="
            t('appAuth.page.forgotPassword.reSendAfter', {
              seconds: state.countdown,
            })
          "
        />
      </UForm>

      <!-- Footer -->
      <div class="flex items-center gap-1 justify-center">
        <DuckText class="text-sm text-[var(--ui-text-muted)]">
          {{ t("appAuth.backToPage") }}
        </DuckText>
        <UButton
          variant="link"
          :label="t('appAuth.page.signin.title')"
          class="p-0"
          to="/auth/signin"
        />
      </div>

      <div v-if="!state.loading.isPending">
        <UAlert
          v-if="state.response.status === REQUEST_STATUS.SUCCESS"
          color="success"
          variant="soft"
          :title="t('appAuth.page.forgotPassword.toastSuccess.title')"
          :description="
            t('appAuth.page.forgotPassword.toastSuccess.description')
          "
          icon="i-lucide-check-circle"
        />

        <UAlert
          v-if="state.response.status === REQUEST_STATUS.ERROR"
          color="error"
          variant="soft"
          :title="t('appAuth.page.forgotPassword.error.title')"
          :description="getErrorMessage()"
          icon="i-lucide-x-circle"
        />
      </div>
    </div>
  </div>
</template>
