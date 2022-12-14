import {defineConfig} from '@sanity/pkg-utils'

export default defineConfig({
  extract: {
    rules: {
      'ae-internal-missing-underscore': 'off',
    },
  },
  minify: false,
  legacyExports: true,
  tsconfig: 'tsconfig.dist.json',
})
