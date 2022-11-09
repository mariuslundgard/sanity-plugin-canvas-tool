import {Flex} from '@sanity/ui'
import {useMemo} from 'react'
import {isString, ObjectSchemaType, useSchema} from 'sanity'
import {useRouter} from 'sanity/router'
import {CanvasProvider} from '../canvas'
import {SortOrderBy} from '../lib/sanity'
import {Detail} from './detail/Detail'
import {DocumentTypeNavigator} from './navigator/DocumentTypeDetail'
import {RootNavigator} from './navigator/RootNavigator'

export function CanvasTool() {
  const {state: routerState} = useRouter()
  const documentTypeName = isString(routerState.type) ? routerState.type : undefined
  const documentId = isString(routerState.id) ? routerState.id : undefined
  const schema = useSchema()
  const schemaType = documentTypeName ? schema.get(documentTypeName) : undefined

  const apiVersion = '2022-11-01'

  const defaultOrdering: SortOrderBy[] = useMemo(
    () => [{field: 'createdBy', direction: 'desc'}],
    []
  )

  const params: Record<string, unknown> = useMemo(() => ({}), [])

  return (
    <CanvasProvider>
      <Flex height="fill">
        {!documentTypeName && (
          <RootNavigator documentId={documentId} documentTypeName={documentTypeName} />
        )}

        {documentTypeName && schemaType && (
          <DocumentTypeNavigator
            apiVersion={apiVersion}
            defaultOrdering={defaultOrdering}
            documentId={documentId}
            filter={`_type == "${schemaType.name}"`}
            params={params}
            schemaType={schemaType as ObjectSchemaType}
          />
        )}

        <Detail documentId={documentId} documentTypeName={documentTypeName} />
      </Flex>
    </CanvasProvider>
  )
}
