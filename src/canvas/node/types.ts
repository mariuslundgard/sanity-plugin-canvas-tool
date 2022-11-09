import {ReactElement} from 'react'
import {BaseFormNode} from 'sanity'

/** @alpha */
export interface RenderCanvasNodeCallback {
  (
    canvasValueProps: {key?: string} & Omit<
      // eslint-disable-next-line no-use-before-define
      CanvasNodeProps,
      'renderCanvasNode' | 'renderDefault'
    >
  ): ReactElement
}

/** @alpha */
export interface CanvasNodeProps<N = BaseFormNode> {
  node: N
  renderCanvasNode: RenderCanvasNodeCallback
  renderDefault: RenderCanvasNodeCallback
}
