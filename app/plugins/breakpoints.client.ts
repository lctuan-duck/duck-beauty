import { defineNuxtPlugin } from "#app";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

export default defineNuxtPlugin((nuxtApp) => {
  const breakpointsState = reactive({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  });

  if (import.meta.client) {
    const breakpoints = useBreakpoints(breakpointsTailwind);

    watchEffect(() => {
      breakpointsState.isMobile = breakpoints.smaller("sm").value;
      breakpointsState.isTablet = breakpoints.between("sm", "lg").value;
      breakpointsState.isDesktop = breakpoints.greater("lg").value;
    });
  }

  nuxtApp.provide("breakpoints", breakpointsState);
});

// HOW TO USE THIS PLUGIN

// ============ IN SCRIPT SETUP ===========
// const { $breakpoints } = useNuxtApp();
// console.log($breakpoints.isMobile);

// ============ IN TEMPLATE ===========
// <div v-if="$breakpoints.isMobile">Mobile</div>
