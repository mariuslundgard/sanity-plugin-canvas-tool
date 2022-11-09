import {Box, Card, Label, Stack} from '@sanity/ui'
import {useMemo} from 'react'
import {isDocumentSchemaType, useSchema} from 'sanity'
import {TypeLink} from './TypeLink'

export function RootNavigator(props: {
  documentId: string | undefined
  documentTypeName: string | undefined
}) {
  const {documentId, documentTypeName} = props
  const schema = useSchema()
  const active = Boolean(documentTypeName && !documentId)
  const currentSchemaType = documentTypeName ? schema.get(documentTypeName) : undefined

  const schemaTypes = useMemo(
    () => schema.getTypeNames().map((typeName) => schema.get(typeName)!),
    [schema]
  )

  const documentSchemaTypes = useMemo(
    () =>
      schemaTypes.filter(isDocumentSchemaType).filter((t) => {
        return t.name !== 'document' && !t.name.startsWith('sanity.')
      }),
    [schemaTypes]
  )

  const otherSchemaTypes = useMemo(
    () => schemaTypes.filter((s) => !documentSchemaTypes.includes(s as any)),
    [documentSchemaTypes, schemaTypes]
  )

  return (
    <Card flex="none" overflow="auto" sizing="border" style={{width: '16em'}} tone="transparent">
      <Stack padding={3} space={1}>
        <Box padding={2}>
          <Label size={1}>Document types</Label>
        </Box>

        {documentSchemaTypes.map((schemaType) => (
          <TypeLink
            key={schemaType.name}
            pressed={!active && schemaType === currentSchemaType}
            schemaType={schemaType}
            selected={active && schemaType === currentSchemaType}
          />
        ))}
      </Stack>

      <Stack hidden padding={3} space={1}>
        <Box padding={2}>
          <Label size={1}>Other types</Label>
        </Box>

        {otherSchemaTypes.map((schemaType) => (
          <TypeLink
            key={schemaType.name}
            pressed={!active && schemaType === currentSchemaType}
            schemaType={schemaType}
            selected={active && schemaType === currentSchemaType}
          />
        ))}
      </Stack>
    </Card>
  )
}
