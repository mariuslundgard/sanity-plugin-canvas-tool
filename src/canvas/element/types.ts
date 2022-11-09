import {ReactElement} from 'react'
import {BaseFormNode} from 'sanity'

/** @alpha */
export interface RenderCanvasElementCallback {
  (
    canvasValueProps: {key?: string} & Omit<
      // eslint-disable-next-line no-use-before-define
      CanvasElementProps,
      'renderCanvasElement' | 'renderDefault'
    >
  ): ReactElement
}

/** @alpha */
export interface CanvasElementProps<N = BaseFormNode> {
  attributes: {
    'data-slate-node': 'element'
    'data-slate-inline'?: true
    'data-slate-void'?: true
    dir?: 'rtl'
    ref: any
  }
  children: ReactElement
  node: N
  renderCanvasElement: RenderCanvasElementCallback
  renderDefault: RenderCanvasElementCallback
}
