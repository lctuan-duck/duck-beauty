<script setup lang="ts">
import * as v from "valibot";
import type { FormSubmitEvent } from "@nuxt/ui";
import { REQUEST_STATUS } from "#app-auth/types";

const { t } = useI18n();

definePageMeta({
  layout: "default-auth-layout",
});
useHead({
  title: t("appAuth.page.signUp.title"),
});

const schema = v.pipe(
  v.object({
    username: v.pipe(
      v.string(),
      v.minLength(3, t("appAuth.page.signUp.validation.username"))
    ),
    email: v.pipe(
      v.string(),
      v.email(t("appAuth.page.signUp.validation.email"))
    ),
    password: v.pipe(
      v.string(),
      v.minLength(
        6,
        t("appAuth.page.signUp.validation.minLength", { length: 6 })
      ),
      v.maxLength(
        30,
        t("appAuth.page.signUp.validation.maxLength", { length: 30 })
      )
    ),
    confirmPassword: v.pipe(
      v.string(),
      v.minLength(
        6,
        t("appAuth.page.signUp.validation.minLength", { length: 6 })
      ),
      v.maxLength(
        30,
        t("appAuth.page.signUp.validation.maxLength", { length: 30 })
      )
    ),
  }),
  v.forward(
    v.partialCheck(
      [["password"], ["confirmPassword"]],
      (input) => input.password === input.confirmPassword,
      t("appAuth.page.signUp.validation.passwordMatch")
    ),
    ["confirmPassword"]
  )
);

type Schema = v.InferOutput<typeof schema>;

const form = reactive({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  showPassword: false,
  showConfirmPassword: false,
  response: {
    status: REQUEST_STATUS.IDLE,
    code: 0,
  },
  isPending: false,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (form.isPending) return;
  form.isPending = true;

  const { register } = useAuth();

  const data = await register({
    username: event.data.username,
    password: event.data.password,
    email: event.data.email,
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
      return t("appAuth.page.signUp.error.badRequest");
    case 404:
      return t("appAuth.page.signUp.error.notFound");
    case 409:
      return t("appAuth.page.signUp.error.conflict");
    default:
      return t("appAuth.page.signUp.error.default");
  }
}
</script>

<template>
  <DuckBox class="h-full max-sm:mx-4 sm:w-[400px]">
    <!-- Form Card -->
    <DuckBox
      class="p-8 w-full max-w-md space-y-4 relative overflow-hidden bg-[var(--ui-bg)] shadow-xl rounded-xl ring ring-[var(--ui-border)]"
    >
      <!-- Header -->
      <DuckBox class="text-center space-y-1">
        <DuckText class="text-2xl font-semibold">
          {{ t("appAuth.page.signUp.title") }}
        </DuckText>
        <DuckText class="text-sm text-[var(--ui-text-dimmed)]">
          {{ t("appAuth.page.signUp.subtitle") }}
        </DuckText>
      </DuckBox>

      <!-- Social Auth -->
      <AppAuthMoleculesAuthSocialCard mode="SIGN_UP" />

      <!-- Divider -->
      <USeparator :label="t('appAuth.page.signUp.divider')" />

      <!-- Form Inputs -->
      <UForm
        :schema="schema"
        :state="form"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField
          :label="t('appAuth.page.signUp.username.label')"
          name="username"
        >
          <UInput
            v-model="form.username"
            :placeholder="t('appAuth.page.signUp.username.placeholder')"
            size="lg"
            class="w-full"
          />
        </UFormField>

        <UFormField :label="t('appAuth.page.signUp.email.label')" name="email">
          <UInput
            v-model="form.email"
            :placeholder="t('appAuth.page.signUp.email.placeholder')"
            size="lg"
            class="w-full"
          />
        </UFormField>

        <UFormField
          :label="t('appAuth.page.signUp.password.label')"
          name="password"
        >
          <UInput
            v-model="form.password"
            :placeholder="t('appAuth.page.signUp.password.placeholder')"
            :type="form.showPassword ? 'text' : 'password'"
            size="lg"
            class="w-full"
          >
            <template #trailing>
              <UButton
                color="neutral"
                tabindex="-1"
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

        <UFormField
          :label="t('appAuth.page.signUp.confirmPassword.label')"
          name="confirmPassword"
        >
          <UInput
            v-model="form.confirmPassword"
            :placeholder="t('appAuth.page.signUp.confirmPassword.placeholder')"
            :type="form.showConfirmPassword ? 'text' : 'password'"
            size="lg"
            class="w-full"
          >
            <template #trailing>
              <UButton
                tabindex="-1"
                color="neutral"
                variant="link"
                size="sm"
                :icon="
                  form.showConfirmPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'
                "
                :aria-label="
                  form.showConfirmPassword ? 'Hide password' : 'Show password'
                "
                :aria-pressed="form.showConfirmPassword"
                aria-controls="password"
                @click="form.showConfirmPassword = !form.showConfirmPassword"
              />
            </template>
          </UInput>
        </UFormField>
        <!-- Submit Button -->
        <UButton
          block
          size="lg"
          :label="t('appAuth.page.signUp.submit')"
          type="submit"
          :loading="form.isPending"
          :disabled="form.isPending"
        />
      </UForm>
      <UAlert
        v-if="form.response.status === REQUEST_STATUS.ERROR"
        color="error"
        variant="soft"
        :title="t('appAuth.page.signUp.error.title')"
        :description="getErrorMessage()"
        icon="i-lucide-x-circle"
      />
      <!-- Footer -->
      <DuckBox class="flex items-center gap-1 justify-center">
        <DuckText class="text-sm text-[var(--ui-text-muted)]">
          {{ t("appAuth.page.signUp.footerText") }}
        </DuckText>
        <UButton
          variant="link"
          :label="t('appAuth.page.signUp.footerAction')"
          class="p-0"
          to="/auth/signin"
        />
      </DuckBox>
    </DuckBox>
  </DuckBox>
</template>
