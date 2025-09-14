// https://github.com/nuxt/nuxt/releases/tag/v3.13.0
// TODO periodically check if this file is still needed, as libraries may update their types
import type {
  ComponentCustomOptions as _ComponentCustomOptions,
  ComponentCustomProperties as _ComponentCustomProperties,
} from "vue";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties extends _ComponentCustomProperties {}
  interface ComponentCustomOptions extends _ComponentCustomOptions {}
}
