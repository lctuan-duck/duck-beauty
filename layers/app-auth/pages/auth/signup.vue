<script setup lang="ts">
import * as v from "valibot";
import type { FormSubmitEvent } from "@nuxt/ui";

const { t } = useI18n();

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
        8,
        t("appAuth.page.signUp.validation.minLength", { length: 8 })
      ),
      v.maxLength(
        30,
        t("appAuth.page.signUp.validation.maxLength", { length: 30 })
      )
    ),
    confirmPassword: v.pipe(
      v.string(),
      v.minLength(
        8,
        t("appAuth.page.signUp.validation.minLength", { length: 8 })
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

const toast = useToast();
const form = reactive({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  showPassword: false,
  showConfirmPassword: false,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({
    title: t("appAuth.page.signUp.toastSuccess.title"),
    description: t("appAuth.page.signUp.toastSuccess.description"),
    color: "success",
  });
  console.log(event.data);
}
</script>

<template>
  <DuckBox
    class="min-h-screen flex items-center justify-center relative overflow-hidden"
  >
    <!-- Form Card -->
    <DuckBox class="p-8 rounded-xl w-full max-w-md shadow-lg space-y-6">
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
      <DuckBox class="text-center space-y-4">
        <DuckText class="text-sm font-medium">
          {{ t("appAuth.page.signUp.social") }}
        </DuckText>
        <DuckBox class="flex justify-center space-x-4">
          <UButton
            icon="flat-color-icons:google"
            variant="soft"
            color="neutral"
          />
          <UButton icon="logos:twitter" variant="soft" color="neutral" />
          <UButton icon="logos:facebook" variant="soft" color="neutral" />
          <UButton icon="bi:github" variant="soft" color="neutral" />
        </DuckBox>
      </DuckBox>

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
              /> </template
          ></UInput>
        </UFormField>
        <!-- Submit Button -->
        <UButton
          block
          size="lg"
          :label="t('appAuth.page.signUp.submit')"
          type="submit"
        />
      </UForm>

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
