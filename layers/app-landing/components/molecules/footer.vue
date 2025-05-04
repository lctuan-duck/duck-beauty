<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <DuckBox as="footer" class="px-8 py-12 bg-[var(--ui-bg-elevated)] mt-16">
    <DuckBox class="grid md:grid-cols-5 gap-8">
      <DuckBox class="col-span-2 space-y-4">
        <DuckBox class="flex items-center space-x-2">
          <DuckLogo />
        </DuckBox>
        <DuckText class="text-[var(--ui-text-muted)]">
          {{ t("appLanding.page.index.footer.about.desc") }}
        </DuckText>
        <DuckBox class="flex space-x-3">
          <DuckText class="text-[var(--ui-text-dimmed)]">Fb</DuckText>
          <DuckText class="text-[var(--ui-text-dimmed)]">Tw</DuckText>
          <DuckText class="text-[var(--ui-text-dimmed)]">In</DuckText>
          <DuckText class="text-[var(--ui-text-dimmed)]">Be</DuckText>
        </DuckBox>
      </DuckBox>

      <DuckBox>
        <DuckText class="font-semibold mb-4">
          {{ t("appLanding.page.index.footer.quickLinks.title") }}
        </DuckText>
        <DuckText class="text-[var(--ui-text-muted)]">
          {{ t("appLanding.page.index.footer.quickLinks.home") }}
        </DuckText>
        <DuckText class="text-[var(--ui-text-muted)]">
          {{ t("appLanding.page.index.footer.quickLinks.services") }}
        </DuckText>
        <DuckText class="text-[var(--ui-text-muted)]">
          {{ t("appLanding.page.index.footer.quickLinks.careers") }}
        </DuckText>
        <DuckText class="text-[var(--ui-text-muted)]">
          {{ t("appLanding.page.index.footer.quickLinks.pricing") }}
        </DuckText>
      </DuckBox>

      <DuckBox>
        <DuckText class="font-semibold mb-4">
          {{ t("appLanding.page.index.footer.services.title") }}
        </DuckText>
        <DuckText class="text-[var(--ui-text-muted)]">
          {{ t("appLanding.page.index.footer.services.nails") }}
        </DuckText>
        <DuckText class="text-[var(--ui-text-muted)]">
          {{ t("appLanding.page.index.footer.services.spa") }}
        </DuckText>
        <DuckText class="text-[var(--ui-text-muted)]">
          {{ t("appLanding.page.index.footer.services.makeup") }}
        </DuckText>
        <DuckText class="text-[var(--ui-text-muted)]">
          {{ t("appLanding.page.index.footer.services.skincare") }}
        </DuckText>
      </DuckBox>

      <DuckBox>
        <DuckText class="font-semibold mb-4">
          {{ t("appLanding.page.index.footer.newsletter.title") }}
        </DuckText>
        <UFormField
          :description="t('appLanding.page.index.footer.newsletter.desc')"
        >
          <UInput
            variant="soft"
            :placeholder="
              t('appLanding.page.index.footer.newsletter.placeholder')
            "
            class="w-full"
          />
        </UFormField>
      </DuckBox>
    </DuckBox>

    <DuckBox class="mt-8 text-center text-sm text-[var(--ui-text-dimmed)]">
      {{ t("appLanding.page.index.footer.copyright") }}
    </DuckBox>
  </DuckBox>
</template>
