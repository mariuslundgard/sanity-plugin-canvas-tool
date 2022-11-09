import {UnknownIcon} from '@sanity/icons'
import {Box, Card, Code, Flex, Text} from '@sanity/ui'
import {createElement} from 'react'
import {SchemaType} from 'sanity'
import {useStateLink} from 'sanity/router'

export function TypeLink(props: {pressed: boolean; schemaType: SchemaType; selected: boolean}) {
  const {pressed, schemaType, selected} = props
  const {href, onClick} = useStateLink({state: {type: schemaType.name}})

  return (
    <Card
      as="button"
      href={href}
      onClick={onClick}
      paddingX={3}
      paddingY={2}
      pressed={pressed}
      radius={2}
      selected={selected}
      tone="inherit"
    >
      <Flex gap={2}>
        <Box flex="none">
          <Text size={1}>{createElement(schemaType.icon || UnknownIcon)}</Text>
        </Box>

        <Box flex={1}>
          {/* Title */}
          {schemaType.title && (
            <Text size={1} weight="semibold">
              {schemaType.title}
            </Text>
          )}

          {/* Untitled */}
          {!schemaType.title && (
            <Code size={1} weight="semibold">
              {schemaType.name}
            </Code>
          )}
        </Box>
      </Flex>
    </Card>
  )
}
