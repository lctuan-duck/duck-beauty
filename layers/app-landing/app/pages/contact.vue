<script setup lang="ts">
import * as v from "valibot";
import type { FormSubmitEvent } from "@nuxt/ui";

definePageMeta({
  layout: "landing-page-layout",
});
const { t } = useI18n();
const schema = v.object({
  email: v.pipe(v.string(), v.email("Invalid email")),
  name: v.pipe(
    v.string(),
    v.minLength(3, "Name must be at least 3 characters")
  ),
  phone: v.pipe(
    v.string(),
    v.minLength(8, "Phone number must be at least 8 characters")
  ),
  message: v.pipe(
    v.string(),
    v.minLength(10, "Message must be at least 10 characters")
  ),
});

type Schema = v.InferOutput<typeof schema>;

const state = reactive({
  email: "",
  name: "",
  phone: "",
  message: "",
});

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({
    title: "Success",
    description: "The form has been submitted.",
    color: "success",
  });
  console.log(event.data);
}
</script>

<template>
  <main class="max-w-[1440px] mx-auto px-8 h-full pb-10 flex flex-col gap-16">
    <div
      class="flex flex-col lg:flex-row justify-between items-center gap-8 py-8"
    >
      <div class="flex-1 space-y-10">
        <DuckText as="h2" class="text-3xl font-serif font-semibold">{{
          t("appLanding.page.contact.location.title")
        }}</DuckText>

        <div>
          <DuckText as="h3" class="text-xl font-semibold"
            >Bà Rịa - Vũng Tàu</DuckText
          >
          <DuckText class="text-sm text-muted">
            {{ t("appLanding.page.contact.location.description") }}
          </DuckText>

          <div class="mt-2 space-y-2">
            <div class="flex items-start gap-2">
              <UIcon
                name="i-heroicons-map-pin"
                class="text-[var(--ui-info)] mt-1"
              />
              <div>
                <DuckText class="font-semibold">
                  {{ t("appLanding.page.contact.location.addressLabel") }}
                </DuckText>
                <DuckText class="text-sm">
                  {{ t("appLanding.page.contact.location.address") }}</DuckText
                >
              </div>
            </div>

            <div class="flex items-start gap-2">
              <UIcon
                name="i-heroicons-phone"
                class="text-[var(--ui-info)] mt-1"
              />
              <div>
                <DuckText class="font-semibold">
                  {{ t("appLanding.page.contact.location.phoneLabel") }}
                </DuckText>
                <DuckText class="text-sm">
                  {{ t("appLanding.page.contact.location.phone") }}
                </DuckText>
              </div>
            </div>
            <div class="flex items-start gap-2">
              <UIcon name="lucide:mail" class="text-[var(--ui-info)] mt-1" />
              <div>
                <DuckText class="font-semibold">
                  {{ t("appLanding.page.contact.location.emailLabel") }}
                </DuckText>
                <DuckText>hello@flowbase.com</DuckText>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Image -->
      <div class="flex-1 flex justify-center">
        <DuckImg
          src="https://mbspilates.vn/wp-content/uploads/2024/07/tiem-nail-ha-noi-1.webp"
          alt="Salon Location"
          class="rounded-b-full border-b-2 w-full max-w-md object-cover"
        />
      </div>
    </div>
    <!-- form contact -->
    <div
      class="bg-[var(--ui-primary)]/10 rounded-xl min-h-screen flex flex-col items-center justify-center p-8"
    >
      <DuckText
        class="text-3xl font-semibold text-center text-[var(--ui-text-toned)] mb-2"
      >
        {{ t("appLanding.page.contact.form.title") }}
      </DuckText>
      <DuckText class="text-center text-muted mb-8">
        {{ t("appLanding.page.contact.form.subtitle") }}
      </DuckText>

      <div
        class="bg-[var(--ui-bg)] p-6 rounded-xl shadow-md w-full max-w-2xl flex flex-col gap-4"
      >
        <UForm
          :schema="schema"
          :state="state"
          class="flex flex-col gap-4 items-center"
          @submit="onSubmit"
        >
          <div class="flex-1 w-full grid grid-cols-2 grid-rows-3 gap-7">
            <UFormField
              :label="t(`appLanding.page.contact.form.name`)"
              name="name"
            >
              <UInput
                v-model="state.name"
                icon="lucide:user"
                :placeholder="
                  t(`appLanding.page.contact.form.placeholder.name`)
                "
                class="w-full"
                size="xl"
              />
            </UFormField>

            <UFormField
              :label="t(`appLanding.page.contact.form.email`)"
              name="email"
              class="col-start-1 row-start-2"
            >
              <UInput
                v-model="state.email"
                icon="lucide:mail"
                placeholder="example@email.com"
                class="w-full"
                size="xl"
              />
            </UFormField>

            <UFormField
              :label="t(`appLanding.page.contact.form.phone`)"
              name="phone"
              class="col-start-1 row-start-3"
            >
              <UInput
                v-model="state.phone"
                icon="lucide:phone"
                :placeholder="
                  t(`appLanding.page.contact.form.placeholder.phone`)
                "
                class="w-full"
                size="xl"
              />
            </UFormField>

            <UFormField
              :label="t(`appLanding.page.contact.form.message`)"
              name="message"
              class="col-start-2 row-start-1 row-span-3"
            >
              <UTextarea
                v-model="state.message"
                :placeholder="
                  t(`appLanding.page.contact.form.placeholder.message`)
                "
                class="w-full h-full"
                size="xl"
                :rows="9"
              />
            </UFormField>
          </div>

          <UButton type="submit" size="xl" class="mt-4">{{
            t(`appLanding.page.contact.form.button`)
          }}</UButton>
        </UForm>
      </div>
    </div>
  </main>
  <!-- Footer -->
  <AppLandingMoleculesFooter />
</template>
