import {createElement, ReactNode, useCallback, useMemo} from 'react'
import {useMiddlewareComponent} from '../lib/sanity'
import {CanvasContext} from './CanvasContext'
import {CanvasElementResolver, RenderCanvasElementCallback} from './element'
import {CanvasNodeResolver, RenderCanvasNodeCallback} from './node'
import {Canvas} from './types'

/** @alpha */
export function CanvasProvider(props: {children?: ReactNode}) {
  const {children} = props

  const canvasElementComponent = useMiddlewareComponent({
    defaultComponent: CanvasElementResolver,
    pick: (plugin) => plugin.canvas?.components?.element,
  })

  const renderCanvasElement: RenderCanvasElementCallback = useCallback(
    (canvasElementProps) =>
      createElement(canvasElementComponent, {
        ...(canvasElementProps as any),
        renderCanvasElement,
      }),
    [canvasElementComponent]
  )

  const canvasNodeComponent = useMiddlewareComponent({
    defaultComponent: CanvasNodeResolver,
    pick: (plugin) => plugin.canvas?.components?.node,
  })

  const renderCanvasNode: RenderCanvasNodeCallback = useCallback(
    (canvasNodeProps) =>
      createElement(canvasNodeComponent, {
        ...(canvasNodeProps as any),
        renderCanvasNode,
      }),
    [canvasNodeComponent]
  )

  const canvas: Canvas = useMemo(
    () => ({
      renderCanvasElement,
      renderCanvasNode,
    }),
    [renderCanvasElement, renderCanvasNode]
  )

  return <CanvasContext.Provider value={canvas}>{children}</CanvasContext.Provider>
}
