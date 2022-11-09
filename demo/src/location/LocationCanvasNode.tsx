import {Code, Stack, Text} from '@sanity/ui'
import {BaseFormNode, ObjectFormNode, PrimitiveFormNode} from 'sanity'
import {CanvasNodeLink, CanvasNodeProps, findField} from 'sanity-plugin-canvas-tool'

export function LocationCanvasNode(props: CanvasNodeProps<ObjectFormNode>) {
  const {node} = props
  const latitude = findField<PrimitiveFormNode>(node, 'latitude')
  const longitude = findField<PrimitiveFormNode>(node, 'longitude')

  return (
    <CanvasNodeLink node={node as BaseFormNode} padding={2} radius={2}>
      <Stack space={3}>
        <Text size={1} weight="semibold">
          {node.schemaType.title}
        </Text>

        <Code language="json">{`${latitude?.value || 0}, ${longitude?.value || 0}`}</Code>
      </Stack>
    </CanvasNodeLink>
  )
}
