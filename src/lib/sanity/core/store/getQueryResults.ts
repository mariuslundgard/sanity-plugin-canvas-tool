import {
  catchError,
  map,
  mergeMapTo,
  startWith,
  take,
  scan,
  delay,
  share,
  takeUntil,
} from 'rxjs/operators'
import {concat, merge, of, fromEvent, Observable, Subject} from 'rxjs'
import {ListenQueryOptions, SanityClient, SanityDocument} from 'sanity'
import {listenQuery} from 'sanity'

export interface QueryResults {
  error: Error | null
  loading: boolean
  value: SanityDocument[] | null
}

export const INITIAL_QUERY_RESULTS: QueryResults = {
  error: null,
  loading: false,
  value: null,
}

const LOADING_QUERY_RESULTS: QueryResults = {
  error: null,
  loading: true,
  value: null,
}

export function getQueryResults(
  client: SanityClient,
  query: string,
  params: Record<string, any>,
  options: ListenQueryOptions
): Observable<QueryResults> {
  const retrySubject = new Subject<null>()
  const retry$ = retrySubject.asObservable()

  const onRetry = () => {
    retrySubject.next(null)
  }

  const loaded$ = listenQuery(client, query, params, options).pipe(
    map((documents) => ({
      error: null,
      loading: false,
      value: documents,
    })),
    share()
  )

  const loading$ = of(LOADING_QUERY_RESULTS).pipe(delay(250), takeUntil(loaded$))

  const state$ = merge(loading$, loaded$)

  const online$ = fromEvent(window, 'online')

  return state$.pipe(
    startWith(INITIAL_QUERY_RESULTS),
    catchError((err, caught$) =>
      concat(
        of({
          error: err,
          loading: false,
          value: null,
        }),
        merge(online$, retry$).pipe(take(1), mergeMapTo(caught$))
      )
    ),
    scan((prev, next) => ({...prev, ...next, onRetry}))
  )
}
