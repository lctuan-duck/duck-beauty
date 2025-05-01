import { registerManualViteConfig } from "./.configs";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    "@nuxt/ui",
    "@nuxtjs/i18n",
    "@nuxt/image",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxt/eslint",
    "@nuxt/scripts",
  ],
  components: [
    {
      path: "components",
      prefix: "Duck",
    },
  ],
  css: ["~/assets/css/main.css"],
  vite: {
    ...registerManualViteConfig(),
  },
  /**
   * Modules configuration
   */
  i18n: {
    lazy: true,
    strategy: "no_prefix",
    langDir: "../app/locales",
    defaultLocale: "vi",
    locales: [
      { code: "en", file: "en.json" },
      { code: "vi", file: "vi.json" },
    ],
    compilation: {
      strictMessage: false,
    },
  },
  extends: [
    "./layers", // Layer cục bộ
    "./layers/example-layer", // Layer cục bộ khác
  ],
});
