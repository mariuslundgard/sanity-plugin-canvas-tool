import {unstable_useValuePreview as useValuePreview} from 'sanity'
import {useDocumentForm, useDocumentValue} from '../../../lib/sanity'

export function DocumentTitle() {
  const {node} = useDocumentForm()
  const value = useDocumentValue()
  const preview = useValuePreview({schemaType: node.schemaType, value})

  if (preview.isLoading) {
    return <>Loading…</>
  }

  return <>{preview.value?.title || <em>Untitled</em>}</>
}
