import {Card, Label} from '@sanity/ui'
import {useCallback, useMemo, useRef, useState} from 'react'
import {ObjectFormNode, ObjectSchemaType} from 'sanity'
import {createEditor, Descendant} from 'slate'
import {Slate, Editable, withReact, RenderElementProps} from 'slate-react'
import {findField, isFieldMember} from '../../../lib/sanity'
import {useCanvas} from '../../useCanvas'
import {withSanitySchema} from './withSanitySchema'

export function Editor(props: {node: ObjectFormNode; schemaType: ObjectSchemaType}) {
  const {node, schemaType} = props
  const {renderCanvasElement} = useCanvas()

  const [value, setValue] = useState<Descendant[]>(() => {
    const fieldMembers = node.members.filter(isFieldMember)

    return fieldMembers.map((mem) => {
      return {
        type: 'field',
        name: mem.name,
        children: [
          {
            text: String(mem.field.value),
          },
        ],
      }
    })
  })

  const valueRef = useRef(value)

  const editor = useMemo(
    () => withReact(withSanitySchema({editor: createEditor(), schemaType, value: valueRef})),
    [schemaType]
  )

  const handleChange = useCallback((nextValue: Descendant[]) => {
    valueRef.current = nextValue
    setValue(nextValue)
  }, [])

  const renderElement = useCallback(
    (elementProps: RenderElementProps) => {
      const {attributes, children, element} = elementProps
      const elementNode = findField(node, element.name)

      if (elementNode) {
        return renderCanvasElement({attributes, children, node: elementNode})
      }

      // fallback
      return (
        <Card contentEditable={false} marginY={3} padding={2} radius={3} tone="caution">
          <Label muted size={1}>
            Unknown element type: {element.type}
          </Label>
        </Card>
      )
    },
    [node, renderCanvasElement]
  )

  return (
    <Slate editor={editor} onChange={handleChange} value={value}>
      <Editable
        // renderElement?: (props: RenderElementProps) => JSX.Element;
        renderElement={renderElement}
        // renderLeaf?: (props: RenderLeafProps) => JSX.Element;
        // renderPlaceholder?: (props: RenderPlaceholderProps) => JSX.Element;
        // scrollSelectionIntoView?: (editor: ReactEditor, domRange: DOMRange) => void;
      />
    </Slate>
  )
}
