import {Stack, Text} from '@sanity/ui'
import {ObjectFormNode} from 'sanity'
import {CanvasFieldErrorNode} from '../CanvasFieldErrorNode'
import {CanvasFieldSetNode} from '../CanvasFieldSetNode'
import {CanvasNodeProps} from '../types'

export function ObjectCanvasNode(props: Omit<CanvasNodeProps<ObjectFormNode>, 'renderDefault'>) {
  const {node, renderCanvasNode} = props

  return (
    <Stack padding={2} space={3}>
      <Text size={1} weight="semibold">
        {node.schemaType.title}
      </Text>

      <Stack paddingLeft={1} space={4} style={{borderLeft: '1px solid var(--card-border-color)'}}>
        {node.members.map((m) => {
          if (m.kind === 'error') {
            return <CanvasFieldErrorNode key={m.key} member={m} />
          }

          if (m.kind === 'field') {
            return renderCanvasNode({node: m.field})
          }

          if (m.kind === 'fieldSet') {
            return <CanvasFieldSetNode key={m.key} member={m} />
          }

          return null
        })}
      </Stack>
    </Stack>
  )
}
