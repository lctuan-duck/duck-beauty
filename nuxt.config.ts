import { registerManualViteConfig } from "./.configs";
import { createResolver } from "@nuxt/kit";

const { resolve } = createResolver(import.meta.url);
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  alias: {
    "#app-base": resolve(__dirname, "app"),
  },
  app: {
    head: {
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/images/logo.png",
          sizes: "96x96",
        },
        // {
        //   rel: "icon",
        //   type: "image/svg+xml",
        //   href: "/svg/logo.svg",
        // },
        {
          rel: "shortcut icon",
          href: "/logo.ico",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/images/logo-label.png",
        },
        // { rel: "manifest", href: "/site.webmanifest" },
      ],
    },
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  imports: {
    dirs: ["./server/utils/**"],
  },
  modules: [
    "@nuxt/ui",
    "@nuxtjs/i18n",
    "@nuxt/image",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxt/eslint",
    "@nuxt/scripts",
    "nuxt-auth-utils",
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
});