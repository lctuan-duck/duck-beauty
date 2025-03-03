export default defineAppConfig({
  head: {
    meta: [
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0',
      },
    ],
  },
  rootAttrs: {
    'vaul-drawer-wrapper': '',
    class: 'bg-[var(--ui-bg)]',
  },
  ui: {
    colors: {
      primary: 'violet',
      neutral: 'neutral',
    },
    button: {
      slots: {
        base: 'cursor-pointer',
      },
    },
    card: {
      slots: {
        body: 'p-4 sm:p-4',
      },
    },
    drawer: {
      variants: {
        direction: {
          bottom: {
            handle: 'mt-2 mb-1 w-10 h-1',
          },
        },
      },
      compoundVariants: [
        {
          direction: 'bottom',
          class: {
            handle: 'w-10 h-1',
          },
        },
      ],
    },
  },
});
