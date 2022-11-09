import {ArrowLeftIcon} from '@sanity/icons'
import {Box, Button, Card, Code, Flex, Label, Spinner, Stack, Text} from '@sanity/ui'
import {isValidElement} from 'react'
import {useMemoObservable} from 'react-rx'
import {
  ObjectSchemaType,
  SanityDefaultPreview,
  SanityDocument,
  getPreviewStateObservable,
  getPreviewValueWithFallback,
  isRecord,
  isString,
  useDocumentPreviewStore,
  getPublishedId,
} from 'sanity'
import {useStateLink} from 'sanity/router'
import {isNumber} from '../../lib/isNumber'
import {SortOrder, SortOrderBy, useDocumentList} from '../../lib/sanity'

export function DocumentTypeNavigator(props: {
  apiVersion: string
  defaultOrdering: SortOrderBy[]
  documentId?: string
  filter: string
  params: Record<string, unknown>
  schemaType: ObjectSchemaType
  sortOrder?: SortOrder
}) {
  const {apiVersion, defaultOrdering, documentId, filter, params, schemaType, sortOrder} = props

  const {
    error,
    // fullList,
    // handleListChange,
    items,
    loading,
    onRetry,
  } = useDocumentList({
    apiVersion,
    defaultOrdering,
    filter,
    params,
    sortOrder,
  })

  return (
    <Card
      flex="none"
      overflow="hidden"
      style={{width: '16em'}}
      tone={error ? 'critical' : 'transparent'}
    >
      <Card borderBottom padding={3} tone="inherit">
        <BackLink />
      </Card>

      <Box padding={4} paddingBottom={2}>
        <Stack space={2}>
          {schemaType.title ? (
            <Text size={1} weight="semibold">
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
      </Box>

      {loading && (
        <Flex align="center" direction="column" height="fill" justify="center" padding={4}>
          <Spinner muted />
        </Flex>
      )}

      {error && (
        <Box padding={4}>
          <Stack space={3}>
            <Label muted size={0}>
              Error loading list
            </Label>
            <Text weight="medium">{error.message}</Text>
            <Box>
              <Button onClick={onRetry} text="Retry" />
            </Box>
          </Stack>
        </Box>
      )}

      {!loading && !error && (
        <Stack padding={3} space={1}>
          {items.map((item) => (
            <DocumentLink
              key={item._id}
              schemaType={schemaType}
              selected={getPublishedId(item._id) === documentId}
              value={item}
            />
          ))}
        </Stack>
      )}
    </Card>
  )
}

function BackLink() {
  const linkProps = useStateLink({state: {}})

  return (
    <Button
      {...linkProps}
      aria-label="Back"
      as="a"
      fontSize={1}
      icon={ArrowLeftIcon}
      mode="bleed"
      padding={2}
      space={2}
      text="Back"
    />
  )
}

function DocumentLink(props: {
  schemaType: ObjectSchemaType
  selected: boolean
  value: SanityDocument
}) {
  const {schemaType, selected, value} = props
  const documentPreviewStore = useDocumentPreviewStore()
  const id = getPublishedId(value._id)
  const linkProps = useStateLink({state: {type: schemaType.name, id}})

  const title =
    (isRecord(value.title) && isValidElement(value.title)) ||
    isString(value.title) ||
    isNumber(value.title)
      ? value.title
      : undefined

  const {draft, published, isLoading} = useMemoObservable(
    () => getPreviewStateObservable(documentPreviewStore, schemaType, value._id, title),
    [documentPreviewStore, schemaType, value._id, title]
  )!

  return (
    <Card
      {...linkProps}
      as="a"
      paddingX={2}
      paddingY={1}
      radius={2}
      selected={selected}
      tone="inherit"
    >
      <SanityDefaultPreview
        {...getPreviewValueWithFallback({value, draft, published})}
        isPlaceholder={isLoading}
      />
    </Card>
  )
}
