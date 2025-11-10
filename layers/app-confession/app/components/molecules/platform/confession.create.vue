<template>
  <AppConfessionMoleculesDesktopConfessionCreateModal
    v-if="$breakpoints.isDesktop || $breakpoints.isTablet"
  />
  <AppConfessionMoleculesMobileConfessionCreateDrawer v-else />
</template>
