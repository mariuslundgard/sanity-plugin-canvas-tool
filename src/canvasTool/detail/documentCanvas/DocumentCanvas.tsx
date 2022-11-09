import {Card, Text} from '@sanity/ui'
import {createRef, useMemo} from 'react'
import {CanvasElementProps, useCanvas} from '../../../canvas'
import {useDocumentForm, useDocumentState} from '../../../lib/sanity'
import {DocumentTitle} from './DocumentTitle'

export function DocumentCanvas() {
  const {
    renderCanvasElement,
    // renderCanvasNode,
  } = useCanvas()
  const {ready} = useDocumentState()
  const {node} = useDocumentForm()

  const attributes: CanvasElementProps['attributes'] = useMemo(
    () => ({
      'data-slate-node': 'element',
      ref: createRef(),
    }),
    []
  )

  const children = useMemo(() => <></>, [])

  return (
    <Card flex={2} overflow="auto">
      <Card padding={4} shadow={1}>
        <Text weight="bold">
          <DocumentTitle />
        </Text>
      </Card>

      {ready && renderCanvasElement({attributes, children, node})}

      {/* {renderCanvasNode({node})} */}
    </Card>
  )
}
