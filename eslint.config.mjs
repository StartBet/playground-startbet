import withNuxt from './.nuxt/eslint.config.mjs'
import prettierConfig from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier/recommended'

export default withNuxt([
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],
      'prettier/prettier': 'warn'
    }
  },
  prettierConfig,
  prettierPlugin
])
