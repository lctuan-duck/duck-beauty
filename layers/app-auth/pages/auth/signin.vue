<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import * as v from "valibot";

const { t } = useI18n();

useHead({
  title: t("appAuth.page.signin.title"),
});

const schema = v.object({
  email: v.pipe(v.string(), v.email(t("appAuth.page.signin.validation.email"))),
  password: v.pipe(
    v.string(),
    v.minLength(8, t("appAuth.page.signin.validation.password"))
  ),
});

type Schema = v.InferOutput<typeof schema>;

const toast = useToast();
const form = reactive({
  email: "",
  password: "",
  showPassword: false,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({
    title: t("appAuth.page.signin.toastSuccess.title"),
    description: t("appAuth.page.signin.toastSuccess.description"),
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
          {{ t("appAuth.page.signin.title") }}
        </DuckText>
        <DuckText class="text-sm text-[var(--ui-text-dimmed)]">
          {{ t("appAuth.page.signin.subtitle") }}
        </DuckText>
      </DuckBox>

      <!-- Social Auth -->
      <DuckBox class="text-center space-y-4">
        <DuckText class="text-sm font-medium">
          {{ t("appAuth.page.signin.social") }}
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
      <USeparator :label="t('appAuth.page.signin.divider')" />

      <!-- Form Inputs -->
      <UForm
        :schema="schema"
        :state="form"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField :label="t('appAuth.page.signin.email.label')" name="email">
          <UInput
            v-model="form.email"
            :placeholder="t('appAuth.page.signin.email.placeholder')"
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
          type="submit"
        />
      </UForm>

      <!-- Footer -->
      <DuckBox class="flex items-center gap-1 justify-center">
        <DuckText class="text-sm text-[var(--ui-text-muted)]">
          {{ t("appAuth.page.signin.footerText") }}
        </DuckText>
        <UButton
          variant="link"
          :label="t('appAuth.page.signin.footerAction')"
          class="p-0"
          to="/auth/signup"
        />
      </DuckBox>
    </DuckBox>
  </DuckBox>
</template>
