import {Box, Heading} from '@sanity/ui'
import {PrimitiveFormNode} from 'sanity'
import {CanvasElementProps} from 'sanity-plugin-canvas-tool'

export function TitleElement(props: CanvasElementProps<PrimitiveFormNode>) {
  const {attributes, children} = props

  return (
    <Box marginBottom={5}>
      <Heading as="h1">
        <span {...attributes}>{children}</span>
      </Heading>
    </Box>
  )
}
