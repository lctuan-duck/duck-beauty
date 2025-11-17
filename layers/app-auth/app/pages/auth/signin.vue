<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import { REQUEST_STATUS } from "#app-auth/app/types";
import * as v from "valibot";

const { t } = useI18n();

definePageMeta({
  layout: "default-auth-layout",
});
useHead({
  title: t("appAuth.page.signin.title"),
});

const schema = v.object({
  credential: v.pipe(
    v.string(),
    v.minLength(3, t("appAuth.page.signin.validation.credential"))
  ),
  password: v.pipe(
    v.string(),
    v.minLength(6, t("appAuth.page.signin.validation.password"))
  ),
});

type Schema = v.InferOutput<typeof schema>;

const form = reactive({
  credential: "",
  password: "",
  showPassword: false,
  response: {
    status: REQUEST_STATUS.IDLE,
    code: 0,
  },
  isPending: false,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (form.isPending) return;
  form.isPending = true;

  const { login } = useAuth();
  const data = await login({
    credential: event.data.credential,
    password: event.data.password,
  });

  form.response = data;

  if (data.status === REQUEST_STATUS.SUCCESS) {
    navigateTo("/");
  }
  form.isPending = false;
}

function getErrorMessage() {
  switch (form.response.code) {
    case 400:
      return t("appAuth.page.signin.error.badRequest");
    case 401:
      return t("appAuth.page.signin.error.unauthorized");
    case 404:
      return t("appAuth.page.signin.error.notFound");
    default:
      return t("appAuth.page.signin.error.default");
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
          {{ t("appAuth.page.signin.title") }}
        </DuckText>
        <DuckText class="text-sm text-[var(--ui-text-dimmed)]">
          {{ t("appAuth.page.signin.subtitle") }}
        </DuckText>
      </div>

      <!-- Social Auth -->
      <AppAuthMoleculesAuthSocialCard v-model:in-progressing="form.isPending" />

      <!-- Divider -->
      <USeparator :label="t('appAuth.page.signin.divider')" />

      <!-- Form Inputs -->
      <UForm
        :schema="schema"
        :state="form"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField
          :label="t('appAuth.page.signin.credential.label')"
          name="credential"
        >
          <UInput
            v-model="form.credential"
            :placeholder="t('appAuth.page.signin.credential.placeholder')"
            size="lg"
            auto-capitalize="on"
            auto-complete="email"
            auto-correct="off"
            class="w-full"
          />
        </UFormField>

        <UFormField
          name="password"
          :ui="{
            label: 'flex items-center justify-between w-full',
          }"
        >
          <template #label>
            <DuckText as="span">
              {{ t("appAuth.page.signin.password.label") }}
            </DuckText>
            <UButton
              tabindex="-1"
              variant="link"
              :label="t('appAuth.page.signin.forgotPassword.label')"
              class="p-0"
              to="/auth/forgot-password"
            />
          </template>
          <UInput
            v-model="form.password"
            :placeholder="t('appAuth.page.signin.password.placeholder')"
            :type="form.showPassword ? 'text' : 'password'"
            auto-capitalize="on"
            auto-complete="password"
            auto-correct="off"
            size="lg"
            class="w-full"
          >
            <template #trailing>
              <UButton
                tabindex="-1"
                color="neutral"
                variant="link"
                size="sm"
                :icon="form.showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                :aria-label="
                  form.showPassword ? 'Hide password' : 'Show password'
                "
                :aria-pressed="form.showPassword"
                aria-controls="password"
                @click="form.showPassword = !form.showPassword"
              />
            </template>
          </UInput>
        </UFormField>
        <!-- Submit Button -->
        <UButton
          block
          size="lg"
          :label="t('appAuth.page.signin.submit')"
          :loading="form.isPending"
          :disabled="form.isPending"
          type="submit"
        />
      </UForm>

      <UAlert
        v-if="!form.isPending && form.response.status === REQUEST_STATUS.ERROR"
        color="error"
        variant="soft"
        :title="t('appAuth.page.signin.error.title')"
        :description="getErrorMessage()"
        icon="i-lucide-x-circle"
      />

      <!-- Footer -->
      <div class="flex items-center gap-1 justify-center">
        <DuckText class="text-sm text-muted">
          {{ t("appAuth.page.signin.footerText") }}
        </DuckText>
        <UButton
          variant="link"
          :label="t('appAuth.page.signUp.title')"
          class="p-0"
          to="/auth/signup"
        />
      </div>
    </div>
  </div>
</template>
