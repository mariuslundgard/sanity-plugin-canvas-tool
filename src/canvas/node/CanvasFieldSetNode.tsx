import {Card} from '@sanity/ui'
import {FieldSetMember} from 'sanity'

/** @alpha */
export function CanvasFieldSetNode(props: {member: FieldSetMember}) {
  const {member} = props

  return <Card border>FieldSet – {member.fieldSet.title || member.fieldSet.name}</Card>
}
