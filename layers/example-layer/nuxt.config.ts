import { createResolver } from "@nuxt/kit";

const { resolve } = createResolver(import.meta.url);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  alias: {
    "#example-layer": resolve(""), //TODO: thay đổi đường dẫn đến thư mục chứa layer
  },
  components: [
    {
      path: "components",
      prefix: "ExampleLayer", //TODO: tiền tố cho các component trong layer
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
