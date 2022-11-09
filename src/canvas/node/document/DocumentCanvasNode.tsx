import {Box, Container, Stack} from '@sanity/ui'
import {ObjectFormNode} from 'sanity'
import {CanvasFieldErrorNode} from '../CanvasFieldErrorNode'
import {CanvasFieldSetNode} from '../CanvasFieldSetNode'
import {CanvasNodeProps} from '../types'

export function DocumentCanvasNode(props: CanvasNodeProps<ObjectFormNode>) {
  const {node, renderCanvasNode} = props
  const {members} = node

  return (
    <Box paddingX={2} paddingY={5}>
      <Container width={1}>
        <Stack padding={1} space={4}>
          {members.map((member) => {
            if (member.kind === 'error') {
              return <CanvasFieldErrorNode key={member.key} member={member} />
            }

            if (member.kind === 'field') {
              return renderCanvasNode({key: member.key, node: member.field})
            }

            if (member.kind === 'fieldSet') {
              return <CanvasFieldSetNode key={member.key} member={member} />
            }

            return null
          })}
        </Stack>
      </Container>
    </Box>
  )
}
