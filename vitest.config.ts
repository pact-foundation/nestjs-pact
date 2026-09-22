import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    // Vitest 5 defaults clearMocks to true; keep Jest's behaviour so calls made in beforeAll survive into tests
    clearMocks: false,
  }
})
