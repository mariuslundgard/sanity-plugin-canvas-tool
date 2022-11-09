import {Box, Container} from '@sanity/ui'
import {ObjectFormNode} from 'sanity'
import {Editor} from '../../components/editor/Editor'
import {CanvasElementProps} from '../types'

export function DocumentCanvasElement(
  props: Omit<CanvasElementProps<ObjectFormNode>, 'renderDefault'>
) {
  const {node} = props

  return (
    <Box paddingX={4} paddingY={5}>
      <Container width={1}>
        <Editor node={node} schemaType={node.schemaType} />
      </Container>
    </Box>
  )
}
