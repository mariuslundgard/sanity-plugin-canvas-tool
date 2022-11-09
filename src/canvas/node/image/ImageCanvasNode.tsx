import {Box, Card, Stack, Text} from '@sanity/ui'
import {ObjectFormNode} from 'sanity'
import styled from 'styled-components'
import {Image, ImageSource} from '../../../lib/sanity'
import {CanvasNodeLink} from '../../components/CanvasNodeLink'
import {CanvasNodeProps} from '../types'

const StyledImage = styled(Image)`
  display: block;
  width: 100%;
`

export function ImageCanvasNode(props: Omit<CanvasNodeProps<ObjectFormNode>, 'renderDefault'>) {
  const {node} = props
  const value = node.value as ImageSource | undefined

  return (
    <CanvasNodeLink node={node} padding={2} radius={2} style={{lineHeight: 0}}>
      <Stack space={3}>
        <Text size={1} weight="semibold">
          {node.schemaType.title}
        </Text>

        {value?.asset && (
          <Card border radius={1} tone="inherit">
            <StyledImage source={value} />
          </Card>
        )}

        {!value?.asset && (
          <Box
            padding={3}
            style={{border: '1px dashed var(--card-border-color)', borderRadius: '1px'}}
          >
            <Text muted>Image not defined</Text>
          </Box>
        )}
      </Stack>
    </CanvasNodeLink>
  )
}
