import {Box, Stack, Text} from '@sanity/ui'
import {PrimitiveFormNode} from 'sanity'
import {SelectedInput} from '../../../lib/sanity'
import {CanvasNodeProps} from '../types'

export function StringCanvasNode(props: Omit<CanvasNodeProps<PrimitiveFormNode>, 'renderDefault'>) {
  const {node} = props

  return (
    <Box padding={2}>
      <Stack space={3}>
        <Text size={1} weight="semibold">
          {node.schemaType.title}
        </Text>

        <SelectedInput selectedPath={node.path} />
      </Stack>
    </Box>
  )
}
