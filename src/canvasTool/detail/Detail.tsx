import {Card, Flex, Text} from '@sanity/ui'
import {isDocumentSchemaType, useSchema} from 'sanity'
import {DocumentFormProvider} from '../../lib/sanity'
import {DocumentCanvas} from './documentCanvas'
import {DocumentInspector} from './documentInspector'
import {TypeDetail} from './TypeDetail'

export function Detail(props: {
  documentId: string | undefined
  documentTypeName: string | undefined
}) {
  const {documentId, documentTypeName} = props
  const schema = useSchema()
  const schemaType = documentTypeName ? schema.get(documentTypeName) : undefined

  if (!schemaType) {
    return (
      <Card flex={1} padding={4}>
        <Text>Select a type</Text>
      </Card>
    )
  }

  if (isDocumentSchemaType(schemaType)) {
    return (
      <Flex flex={1}>
        {documentId && (
          <DocumentFormProvider documentId={documentId} schemaType={schemaType}>
            <DocumentCanvas />
            <DocumentInspector />
          </DocumentFormProvider>
        )}
      </Flex>
    )
  }

  return <TypeDetail schemaType={schemaType} />
}
