import {Config, defineConfig} from 'sanity'
import {canvasTool} from 'sanity-plugin-canvas-tool'
import {deskTool} from 'sanity/desk'
import {CanvasNode} from './src/CanvasNode'
import {dataset, projectId} from './src/env'
import {schema} from './src/schema'

export default defineConfig<Config>({
  projectId,
  dataset,

  name: 'default',
  title: 'Canvas Demo',
  schema,

  canvas: {
    components: {
      node: CanvasNode,
    },
  },

  document: {
    actions: [],
  },

  plugins: [canvasTool(), deskTool()],
})
