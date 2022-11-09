import {Checkbox, Flex, Text} from '@sanity/ui'
import {PrimitiveFormNode} from 'sanity'
import {CanvasNodeLink} from '../../components/CanvasNodeLink'
import {CanvasElementProps} from '../types'

export function BooleanCanvasElement(
  props: Omit<CanvasElementProps<PrimitiveFormNode>, 'renderDefault'>
) {
  const {node} = props
  const value = node.value as boolean | undefined

  return (
    <CanvasNodeLink node={node} padding={2} radius={2} style={{lineHeight: 0}}>
      <Flex gap={3}>
        <div style={{margin: '-4px 0'}}>
          <Checkbox checked={value === true} indeterminate={value === undefined} readOnly />
        </div>

        <Text muted={value === undefined} size={1} weight="semibold">
          {node.schemaType.title}
        </Text>
      </Flex>
    </CanvasNodeLink>
  )
}
