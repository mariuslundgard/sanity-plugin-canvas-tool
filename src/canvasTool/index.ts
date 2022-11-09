import {ComposeIcon} from '@sanity/icons'
import {definePlugin} from 'sanity'
import {CanvasTool} from './CanvasTool'
import {router} from './router'

/** @alpha */
export interface CanvasToolPluginOptions {}

/** @alpha */
export const canvasTool = definePlugin<CanvasToolPluginOptions | void>((_options = {}) => {
  return {
    name: 'sanity-plugin-canvas-tool',
    tools: [
      {
        icon: ComposeIcon,
        name: 'canvas',
        title: 'Canvas',
        component: CanvasTool,
        router,
      },
    ],
  }
})
