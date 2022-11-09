import {Stack, Text} from '@sanity/ui'
import {PrimitiveFormNode} from 'sanity'
import {CanvasNodeLink} from '../../components/CanvasNodeLink'
import {CanvasNodeProps} from '../types'

export function NumberCanvasNode(props: Omit<CanvasNodeProps<PrimitiveFormNode>, 'renderDefault'>) {
  const {node} = props
  const value = node.value as number | undefined

  return (
    <CanvasNodeLink node={node} padding={2} radius={2}>
      <Stack space={3}>
        <Text size={1} weight="semibold">
          {node.schemaType.title}
        </Text>

        {value === undefined && <Text muted>empty</Text>}
        {value !== undefined && <Text>{String(value)}</Text>}
      </Stack>
    </CanvasNodeLink>
  )
}
