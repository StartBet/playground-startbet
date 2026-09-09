import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    include: [
      'app/tests/**/*.test.ts',
      'app/components/**/*.test.ts',
      'app/composables/**/*.test.ts',
      'app/utils/**/*.test.ts'
    ],
    setupFiles: ['./app/tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        '.nuxt/',
        '.output/',
        'dist/',
        'app/tests/',
        '**/*.d.ts',
        '**/eslint.config*',
        '**/*.config.*'
      ]
    }
  }
})
