import {Card} from '@sanity/ui'
import {FieldError} from 'sanity'

/** @alpha */
export function CanvasFieldErrorNode(props: {member: FieldError}) {
  const {member} = props

  return <Card border>Error: {member.error.type}</Card>
}
