export default defineAppConfig({
  head: {
    meta: [
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1.0, viewport-fit=cover, maximum-scale=1.0, user-scalable=no",
      },
    ],
  },
  rootAttrs: {
    "vaul-drawer-wrapper": "",
    class: "bg-[var(--ui-bg)]",
  },
  ui: {
    colors: {
      primary: "cyan",
      neutral: "neutral",
    },
    button: {
      slots: {
        base: "cursor-pointer",
      },
    },
    card: {
      slots: {
        body: "p-2 sm:p-2",
      },
    },
    drawer: {
      variants: {
        direction: {
          bottom: {
            handle: "mt-2 mb-1 w-10 h-1",
          },
        },
      },
      compoundVariants: [
        {
          direction: "bottom",
          class: {
            handle: "w-10 h-1",
          },
        },
      ],
    },
  },
});
