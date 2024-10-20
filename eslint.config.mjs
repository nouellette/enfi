import globals from 'globals'
import eslintPluginSvelte from 'eslint-plugin-svelte'


export default [
  { files: ['**/*.{js,mjs,cjs,svelte}'] },
  { languageOptions: { globals: globals.browser } },
  ...eslintPluginSvelte.configs['flat/recommended'],
  {
    rules: {
      'semi': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      'quotes': ['error', 'single']
    },
  },
]