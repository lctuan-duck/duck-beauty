export interface Breakpoints {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

declare module '#app' {
  interface NuxtApp {
    $breakpoints: Breakpoints;
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $breakpoints: Breakpoints;
  }
}
