import {CanvasNodeProps} from 'sanity-plugin-canvas-tool'

export function CanvasNode(props: CanvasNodeProps) {
  const {renderDefault} = props

  return renderDefault(props)
}
