import {Card, CardProps} from '@sanity/ui'
import {HTMLProps, ReactNode, useMemo} from 'react'
import {BaseFormNode, pathToString} from 'sanity'
import {useRouter, useStateLink} from 'sanity/router'

/** @alpha */
export function CanvasNodeLink(
  props: {children?: ReactNode; node: BaseFormNode} & CardProps &
    Omit<HTMLProps<HTMLDivElement>, 'height' | 'ref'>
) {
  const {children, node, ...restProps} = props
  const {state: routerState} = useRouter()

  const state = useMemo(
    () => ({...routerState, path: pathToString(node.path)}),
    [node.path, routerState]
  )

  const link = useStateLink({state})

  return (
    <Card {...restProps} {...link} as="a">
      {children}
    </Card>
  )
}
