import {Box, Card, Layer, Text} from '@sanity/ui'
import {useMemo} from 'react'
import {isString, stringToPath} from 'sanity'
import {useRouter} from 'sanity/router'
import {SelectedInput} from '../../../lib/sanity'

export function DocumentInspector() {
  const {state: routerState} = useRouter()

  const selectedPath = useMemo(
    () => (isString(routerState.path) ? stringToPath(routerState.path) : undefined),
    [routerState.path]
  )

  return (
    <Card flex={1} overflow="auto" style={{minWidth: '20em'}} tone="transparent">
      <Layer>
        <Card padding={4} shadow={1} tone="inherit">
          <Text weight="bold">DocumentInspector</Text>
        </Card>
      </Layer>

      <Box padding={4}>{selectedPath && <SelectedInput selectedPath={selectedPath} />}</Box>
    </Card>
  )
}
