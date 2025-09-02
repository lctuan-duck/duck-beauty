<script setup lang="ts">
import { REQUEST_STATUS } from "#app-auth/types";
import type { FormSubmitEvent } from "@nuxt/ui";
import * as v from "valibot";

const { t } = useI18n();

definePageMeta({
  layout: "default-auth-layout",
});
useHead({
  title: t("appAuth.page.resetPassword.title"),
});

const schema = v.pipe(
  v.object({
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

const sessionResetPW = useRoute().query.session as string;

const state = reactive({
  response: {
    status: REQUEST_STATUS.IDLE,
    code: 0,
  },
  form: {
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
  },
  loading: {
    isPending: false,
  },
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (state.loading.isPending) return;
  if (!sessionResetPW) return;

  state.loading.isPending = true;

  const result = await useAuth().resetPassword({
    session: sessionResetPW,
    password: event.data.password,
  });

  state.response = result;
  state.loading.isPending = false;
}

function getErrorMessage() {
  switch (state.response.code) {
    case 400:
      return t("appAuth.page.resetPassword.error.badRequest");
    case 404:
      return t("appAuth.page.resetPassword.error.notFound");
    default:
      return t("appAuth.page.resetPassword.error.default");
  }
}
</script>

<template>
  <DuckBox class="max-sm:mx-4 sm:w-[400px]">
    <!-- Form Card -->
    <DuckBox
      class="p-8 w-full max-w-md space-y-4 relative overflow-hidden bg-[var(--ui-bg)] shadow-xl rounded-xl ring ring-[var(--ui-border)]"
    >
      <!-- Header -->
      <DuckBox class="text-center space-y-1">
        <DuckText class="text-2xl font-semibold">
          {{ t("appAuth.page.resetPassword.title") }}
        </DuckText>
        <DuckText class="text-sm text-[var(--ui-text-dimmed)]">
          {{ t("appAuth.page.resetPassword.subtitle") }}
        </DuckText>
      </DuckBox>

      <!-- Reset Password Success Card -->
      <DuckBox v-if="state.response.status === REQUEST_STATUS.SUCCESS">
        <UAlert
          color="success"
          variant="soft"
          :title="t('appAuth.page.resetPassword.toastSuccess.title')"
          :description="
            t('appAuth.page.resetPassword.toastSuccess.description')
          "
          icon="i-lucide-check-circle"
        />
      </DuckBox>

      <!-- Form Inputs -->
      <UForm
        v-else
        :schema="schema"
        :state="state.form"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField
          name="password"
          :label="t('appAuth.page.resetPassword.password.label')"
          :ui="{
            label: 'flex items-center justify-between w-full',
          }"
        >
          <UInput
            v-model="state.form.password"
            :placeholder="t('appAuth.page.resetPassword.password.placeholder')"
            :type="state.form.showPassword ? 'text' : 'password'"
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
                :icon="
                  state.form.showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'
                "
                :aria-label="
                  state.form.showPassword ? 'Hide password' : 'Show password'
                "
                :aria-pressed="state.form.showPassword"
                aria-controls="password"
                @click="state.form.showPassword = !state.form.showPassword"
              />
            </template>
          </UInput>
        </UFormField>
        <UFormField
          name="confirmPassword"
          :label="t('appAuth.page.resetPassword.confirmPassword.label')"
          :ui="{
            label: 'flex items-center justify-between w-full',
          }"
        >
          <UInput
            v-model="state.form.confirmPassword"
            :placeholder="
              t('appAuth.page.resetPassword.confirmPassword.placeholder')
            "
            :type="state.form.showConfirmPassword ? 'text' : 'password'"
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
                :icon="
                  state.form.showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'
                "
                :aria-label="
                  state.form.showPassword ? 'Hide password' : 'Show password'
                "
                :aria-pressed="state.form.showPassword"
                aria-controls="password"
                @click="state.form.showPassword = !state.form.showPassword"
              />
            </template>
          </UInput>
        </UFormField>
        <!-- Submit Button -->
        <UButton
          block
          size="lg"
          :label="t('appAuth.page.resetPassword.submit')"
          :loading="state.loading.isPending"
          :disabled="state.loading.isPending"
          type="submit"
        />
      </UForm>

      <!-- Footer -->
      <DuckBox class="flex items-center gap-1 justify-center">
        <DuckText class="text-sm text-[var(--ui-text-muted)]">
          {{ t("appAuth.backToPage") }}
        </DuckText>
        <UButton
          variant="link"
          :label="t('appAuth.page.signin.title')"
          class="p-0"
          to="/auth/signin"
        />
      </DuckBox>

      <UAlert
        v-if="
          !state.loading.isPending &&
          state.response.status === REQUEST_STATUS.ERROR
        "
        color="error"
        variant="soft"
        :title="t('appAuth.page.resetPassword.error.title')"
        :description="getErrorMessage()"
        icon="i-lucide-x-circle"
      />
    </DuckBox>
  </DuckBox>
</template>
