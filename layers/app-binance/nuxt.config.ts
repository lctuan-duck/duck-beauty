import { createResolver } from "@nuxt/kit";

const { resolve } = createResolver(import.meta.url);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  alias: {
    "#app-binance": resolve(""),
  },
  components: [
    {
      path: "components",
      prefix: "AppBinance",
    },
  ],
  imports: {
    dirs: ["./stores/**", "./utils/**", "./composables/**"],
  },
  modules: ["@pinia/nuxt", "@nuxtjs/i18n"],
  css: ["~/assets/css/main.css"],
  /**
   * Modules configuration
   */
  i18n: {
    langDir: "../app/locales",
    defaultLocale: "vi",
    locales: [
      { code: "en", file: "en.json" },
      { code: "vi", file: "vi.json" },
    ],
  },
});
