export function registerManualViteConfig() {
  return {
    build: {
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes("tailwind")) {
              return "chunk-tailwind";
            } else if (id.includes("radix-vue")) {
              return "chunk-radix-vue";
            } else if (id.includes("markdown-it")) {
              return "chunk-markdown-it";
            } else if (id.includes("/reka-ui")) {
              return "chunk-reka-ui";
            } else if (id.includes("/@nuxt/image/")) {
              return "chunk-nuxt-image";
            } else if (id.includes("/@nuxtjs/i18n/")) {
              return "chunk-nuxtjs-i18n";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/composables/")
            ) {
              return "chunk-nuxt-ui-composables";
            } else if (id.includes("/@nuxt/ui/") && id.includes("/utils/")) {
              return "chunk-nuxt-ui-utils";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/Accordion")
            ) {
              return "chunk-nuxt-ui-accordion";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/Alert")
            ) {
              return "chunk-nuxt-ui-alert";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/App")
            ) {
              return "chunk-nuxt-ui-app";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/Avatar")
            ) {
              return "chunk-nuxt-ui-avatar";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/AvatarGroup")
            ) {
              return "chunk-nuxt-ui-avatar-group";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/Badge")
            ) {
              return "chunk-nuxt-ui-badge";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/Breadcrumb")
            ) {
              return "chunk-nuxt-ui-breadcrumb";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/Button")
            ) {
              return "chunk-nuxt-ui-button";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/ButtonGroup")
            ) {
              return "chunk-nuxt-ui-button-group";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/Calendar")
            ) {
              return "chunk-nuxt-ui-calendar";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/Card")
            ) {
              return "chunk-nuxt-ui-card";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/Carousel")
            ) {
              return "chunk-nuxt-ui-carousel";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/Checkbox")
            ) {
              return "chunk-nuxt-ui-checkbox";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/Chip")
            ) {
              return "chunk-nuxt-ui-chip";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/Collapsible")
            ) {
              return "chunk-nuxt-ui-collapsible";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/ColorPicker")
            ) {
              return "chunk-nuxt-ui-color-picker";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/CommandPalette")
            ) {
              return "chunk-nuxt-ui-command-palette";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/Container")
            ) {
              return "chunk-nuxt-ui-container";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/ContextMenu")
            ) {
              return "chunk-nuxt-ui-context-menu";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/ContextMenuContent")
            ) {
              return "chunk-nuxt-ui-context-menu-content";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/Drawer")
            ) {
              return "chunk-nuxt-ui-drawer";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/DropdownMenu")
            ) {
              return "chunk-nuxt-ui-dropdown-menu";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/DropdownMenuContent")
            ) {
              return "chunk-nuxt-ui-dropdown-menu-content";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/Form")
            ) {
              return "chunk-nuxt-ui-form";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/FormField")
            ) {
              return "chunk-nuxt-ui-form-field";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/Icon")
            ) {
              return "chunk-nuxt-ui-icon";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/Input")
            ) {
              return "chunk-nuxt-ui-input";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/InputMenu")
            ) {
              return "chunk-nuxt-ui-input-menu";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/InputNumber")
            ) {
              return "chunk-nuxt-ui-input-number";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/Kbd")
            ) {
              return "chunk-nuxt-ui-kbd";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/Link")
            ) {
              return "chunk-nuxt-ui-link";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/LinkBase")
            ) {
              return "chunk-nuxt-ui-link-base";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/Modal")
            ) {
              return "chunk-nuxt-ui-modal";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/ModalProvider")
            ) {
              return "chunk-nuxt-ui-modal-provider";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/NavigationMenu")
            ) {
              return "chunk-nuxt-ui-navigation-menu";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/Pagination")
            ) {
              return "chunk-nuxt-ui-pagination";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/PinInput")
            ) {
              return "chunk-nuxt-ui-pin-input";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/Popover")
            ) {
              return "chunk-nuxt-ui-popover";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/Progress")
            ) {
              return "chunk-nuxt-ui-progress";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/RadioGroup")
            ) {
              return "chunk-nuxt-ui-radio-group";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/Select")
            ) {
              return "chunk-nuxt-ui-select";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/SelectMenu")
            ) {
              return "chunk-nuxt-ui-select-menu";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/Separator")
            ) {
              return "chunk-nuxt-ui-separator";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/Skeleton")
            ) {
              return "chunk-nuxt-ui-skeleton";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/Slideover")
            ) {
              return "chunk-nuxt-ui-slideover";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/SlideoverProvider")
            ) {
              return "chunk-nuxt-ui-slideover-provider";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/Slider")
            ) {
              return "chunk-nuxt-ui-slider";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/Stepper")
            ) {
              return "chunk-nuxt-ui-stepper";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/Switch")
            ) {
              return "chunk-nuxt-ui-switch";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/Table")
            ) {
              return "chunk-nuxt-ui-table";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/Tabs")
            ) {
              return "chunk-nuxt-ui-tabs";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/Textarea")
            ) {
              return "chunk-nuxt-ui-textarea";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/Toast")
            ) {
              return "chunk-nuxt-ui-toast";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/Toaster")
            ) {
              return "chunk-nuxt-ui-toaster";
            } else if (
              id.includes("/@nuxt/ui/") &&
              id.includes("/components/Tooltip")
            ) {
              return "chunk-nuxt-ui-tooltip";
            } else if (id.includes("/@nuxt/ui/")) {
              return "chunk-nuxt3-ui";
            } else if (id.includes("/apexcharts/")) {
              return "chunk-apexcharts";
            }
          },
        },
      },
    },
  };
}
