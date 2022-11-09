import path from 'path'
import {defineCliConfig} from 'sanity/cli'
import {UserConfig} from 'vite'
import {dataset, projectId} from './src/env'

const MONOREPO_PATH = path.resolve(__dirname, '../../../@sanity/sanity')

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },

  vite: (viteConfig: UserConfig): UserConfig => ({
    ...viteConfig,
    resolve: {
      ...viteConfig.resolve,
      // prettier-ignore
      alias: {
        ...viteConfig.resolve?.alias,
        '@sanity/block-tools': path.resolve(MONOREPO_PATH, 'packages/@sanity/block-tools/src'),
        '@sanity/diff': path.resolve(MONOREPO_PATH, 'packages/@sanity/diff/src'),
        '@sanity/mutator': path.resolve(MONOREPO_PATH, 'packages/@sanity/mutator/src'),
        '@sanity/portable-text-editor': path.resolve(MONOREPO_PATH, 'packages/@sanity/portable-text-editor/src'),
        '@sanity/schema': path.resolve(MONOREPO_PATH, 'packages/@sanity/schema/src/_exports'),
        '@sanity/types': path.resolve(MONOREPO_PATH, 'packages/@sanity/types/src'),
        '@sanity/util': path.resolve(MONOREPO_PATH, 'packages/@sanity/util/exports'),
        '@sanity/validation': path.resolve(MONOREPO_PATH, 'packages/@sanity/validation/src'),
        'sanity/_internal': path.resolve(MONOREPO_PATH, 'packages/sanity/exports/_internal'),
        'sanity/cli': path.resolve(MONOREPO_PATH, 'packages/sanity/exports/cli'),
        'sanity/desk': path.resolve(MONOREPO_PATH, 'packages/sanity/exports/desk'),
        'sanity/router': path.resolve(MONOREPO_PATH, 'packages/sanity/exports/router'),
        'sanity': path.resolve(MONOREPO_PATH, 'packages/sanity/exports/index'),
        'sanity-plugin-canvas-tool': path.resolve(__dirname, '../src'),
      },
    },
    server: {
      ...viteConfig.server,
      fs: {
        ...viteConfig.server?.fs,
        // Allow serving files from one level up to the project root
        allow: [__dirname, MONOREPO_PATH],
      },
    },
  }),
})
