import {Card, Code, Layer, Stack, Text} from '@sanity/ui'
import {SchemaType} from 'sanity'

export function TypeDetail(props: {schemaType: SchemaType}) {
  const {schemaType} = props

  return (
    <Card borderRight flex="none" overflow="hidden" style={{width: '20em'}}>
      <Layer>
        <Card padding={4}>
          <Stack space={3}>
            {schemaType.title ? (
              <Text size={2} weight="bold">
                {schemaType.title}
              </Text>
            ) : (
              <Code size={2} weight="bold">
                {schemaType.name}
              </Code>
            )}
            <Text muted size={1}>
              {schemaType.description || <>No description</>}
            </Text>
          </Stack>
        </Card>
      </Layer>
    </Card>
  )
}
