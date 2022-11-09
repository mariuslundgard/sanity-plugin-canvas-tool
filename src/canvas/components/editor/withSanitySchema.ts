import {MutableRefObject} from 'react'
import {ObjectSchemaType} from 'sanity'
import {Descendant, Element, Node, Path, Transforms} from 'slate'
import {CustomEditor} from './types'

function getSlateValueAtPath(value: Descendant[], path: Path): Descendant | null {
  if (path.length === 0) {
    return null
  }

  const idx = path[0]

  if (path.length === 1) {
    return value[idx]
  }

  const childValue = value[idx]

  if (!('children' in childValue)) {
    return null
  }

  return getSlateValueAtPath(childValue.children, path.slice(1))
}

function nextTick(cb: () => void) {
  setTimeout(cb, 0)
}

export function withSanitySchema(options: {
  editor: CustomEditor
  schemaType: ObjectSchemaType
  value: MutableRefObject<Descendant[]>
}): CustomEditor {
  const {editor, schemaType, value} = options
  const {apply, normalizeNode} = editor

  editor.apply = (op) => {
    if (op.type === 'insert_text') {
      const target = getSlateValueAtPath(value.current, op.path.slice(-1))

      if (!Element.isElement(target)) {
        apply(op)
        return
      }

      const targetType = schemaType.fields.find((field) => field.name === target?.name)

      apply(op)

      if (!targetType) {
        return
      }

      nextTick(() => {
        const after = getSlateValueAtPath(value.current, op.path)

        if (!Element.isElement(after)) {
          console.log({
            type: 'change',
            path: [targetType.name],
            value: after?.text || undefined,
            schemaType: targetType,
          })
        }
      })

      return
    }

    apply(op)
  }

  editor.insertBreak = () => {
    //
  }

  editor.normalizeNode = (entry) => {
    const [node, path] = entry

    if (path.length === 1 && path[0] === 0) {
      if (Element.isElement(node) && node.name !== 'title') {
        Transforms.setNodes(editor, {name: 'title'}, {at: path})
        return
      }
    }

    if (path.length === 1 && path[0] > 0) {
      if (Element.isElement(node) && node.name === 'title') {
        Transforms.setNodes(editor, {name: 'paragraph'}, {at: path})
        return
      }
    }

    // If the element is a paragraph, ensure its children are valid.
    if (Element.isElement(node) && node.name === 'paragraph') {
      for (const [child, childPath] of Node.children(editor, path)) {
        if (Element.isElement(child) && !editor.isInline(child)) {
          Transforms.unwrapNodes(editor, {at: childPath})
          return
        }
      }
    }

    // Fall back to the original `normalizeNode` to enforce other constraints.
    normalizeNode(entry)
  }

  return editor
}
