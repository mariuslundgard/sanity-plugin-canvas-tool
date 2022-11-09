import {Box, Stack, Text} from '@sanity/ui'
import {createElement, useCallback} from 'react'
import {ObjectFormNode, PrimitiveFormNode} from 'sanity'
import {Image, ImageSource, isDescendentOfType} from '../../lib/sanity'
import {CanvasElementComponent} from '../types'
import {BooleanCanvasElement} from './boolean/BooleanCanvasElement'
import {DocumentCanvasElement} from './document/DocumentCanvasElement'
import {CanvasElementProps} from './types'

/** @alpha */
export function CanvasElementResolver(props: Omit<CanvasElementProps, 'renderDefault'>) {
  const {attributes, children, node, renderCanvasElement} = props

  const schemaComponents = node.schemaType.components as
    | {canvas: {element: CanvasElementComponent | undefined} | undefined}
    | undefined

  const schemaComponent = schemaComponents?.canvas?.element

  const renderDefault = useCallback(() => {
    const parentSchemaType = node.schemaType.type

    if (!parentSchemaType) {
      return <div>No parent schema type</div>
    }

    const defaultProps: Omit<CanvasElementProps, 'renderDefault'> = {
      attributes,
      children,
      node: {...node, schemaType: parentSchemaType},
      renderCanvasElement,
    }

    return <CanvasElementResolver {...defaultProps} />
  }, [attributes, children, node, renderCanvasElement])

  if (schemaComponent) {
    return createElement(schemaComponent, {...props, renderDefault})
  }

  if (isDescendentOfType(node.schemaType, 'document')) {
    return (
      <DocumentCanvasElement
        {...(props as Omit<CanvasElementProps<ObjectFormNode>, 'renderDefault'>)}
      />
    )
  }

  if (node.schemaType.name === 'image') {
    const value = node.value as ImageSource

    return (
      <Stack contentEditable={false} space={3}>
        <Text size={1} weight="semibold">
          {node.schemaType.title}
        </Text>
        <div>{value?.asset && <Image source={value} style={{width: '100%'}} />}</div>
      </Stack>
    )
  }

  if (node.schemaType.jsonType === 'boolean') {
    return (
      <BooleanCanvasElement
        attributes={attributes}
        node={node as PrimitiveFormNode}
        renderCanvasElement={renderCanvasElement}
      >
        {children}
      </BooleanCanvasElement>
    )
  }

  // if (node.schemaType.jsonType === 'number') {
  //   return (
  //     <NumberCanvasElement
  //       node={node as PrimitiveFormNode}
  //       renderCanvasElement={renderCanvasElement}
  //     />
  //   )
  // }

  if (node.schemaType.jsonType === 'object') {
    return <div contentEditable={false}>object</div>
  }

  if (node.schemaType.jsonType === 'array') {
    return <div contentEditable={false}>array</div>
  }

  // if (node.schemaType.jsonType === 'string') {
  //   return (
  //     <StringCanvasElement
  //       node={node as PrimitiveFormNode}
  //       renderCanvasElement={renderCanvasElement}
  //     />
  //   )
  // }

  return (
    <Box marginY={4}>
      <Text as="p">
        <span {...attributes}>{children}</span>
      </Text>
    </Box>
  )
}
