// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/html-self-closing': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/no-v-text-v-html-on-component': 'off',
    'vue/no-v-html': 'off',
    'vue/one-component-per-file': 'off',
    'no-async-promise-executor': 'off',
  },
}
)
