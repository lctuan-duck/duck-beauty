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
  modules: ["@pinia/nuxt", "@nuxtjs/i18n", "@nuxt/eslint", "nuxt-auth-utils"],
  css: ["~/assets/css/main.css"],
  /**
   * Modules configuration
   */
  i18n: {
    langDir: "../locales",
    defaultLocale: "vi",
    locales: [
      { code: "en", file: "en.json" },
      { code: "vi", file: "vi.json" },
    ],
  },

  runtimeConfig: {
    public: {
      clientID: process.env.NUXT_OAUTH_GOOGLE_CLIENT_ID || "",
    },
  },
});
