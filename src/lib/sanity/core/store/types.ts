import {SanityDocument, SortOrdering, SortOrderingItem} from 'sanity'

/** @alpha */
export interface DocumentListPaneItem extends SanityDocument {
  hasPublished: boolean
  hasDraft: boolean
}

/** @alpha */
export interface SortOrderBy extends SortOrderingItem {
  mapWith?: string
}

/** @alpha */
export interface SortOrder extends Omit<SortOrdering, 'by'> {
  by: SortOrderBy[]
  extendedProjection?: string[]
}

/** @alpha */
export interface QueryResult {
  error: {message: string} | null
  loading: boolean
  onRetry?: (event: unknown) => void
  value: SanityDocument[] | null
}
