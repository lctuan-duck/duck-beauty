import { createResolver } from "@nuxt/kit";

const { resolve } = createResolver(import.meta.url);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  alias: {
    "#app-auth": resolve(""),
  },
  components: [
    {
      path: "./components",
      prefix: "AppAuth",
    },
  ],
  imports: {
    dirs: ["./stores/**", "./utils/**", "./composables/**"],
  },
  modules: ["@pinia/nuxt", "@nuxtjs/i18n", "@nuxt/eslint"],
  css: ["~/assets/css/main.css"],
  /**
   * Modules configuration
   */
  i18n: {
    lazy: true,
    langDir: "../locales",
    defaultLocale: "vi",
    locales: [
      { code: "en", file: "en.json" },
      { code: "vi", file: "vi.json" },
    ],
  },
});
