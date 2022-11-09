import {createElement, useCallback} from 'react'
import {ObjectFormNode, PrimitiveFormNode} from 'sanity'
import {CanvasNodeComponent} from '../types'

// Core canvas nodes
import {BooleanCanvasNode} from './boolean/BooleanCanvasNode'
import {ImageCanvasNode} from './image/ImageCanvasNode'
import {NumberCanvasNode} from './number/NumberCanvasNode'
import {ObjectCanvasNode} from './object/ObjectCanvasNode'
import {StringCanvasNode} from './string/StringCanvasNode'
import {CanvasNodeProps} from './types'

/** @alpha */
export function CanvasNodeResolver(props: Omit<CanvasNodeProps, 'renderDefault'>) {
  const {node, renderCanvasNode} = props

  const schemaComponents = node.schemaType.components as
    | {canvas: {node: CanvasNodeComponent | undefined} | undefined}
    | undefined

  const schemaComponent = schemaComponents?.canvas?.node

  const renderDefault = useCallback(() => {
    const parentSchemaType = node.schemaType.type

    if (!parentSchemaType) {
      return <div>No parent schema type</div>
    }

    const defaultProps: Omit<CanvasNodeProps, 'renderDefault'> = {
      node: {...node, schemaType: parentSchemaType},
      renderCanvasNode,
    }

    return <CanvasNodeResolver {...defaultProps} />
  }, [node, renderCanvasNode])

  if (schemaComponent) {
    return createElement(schemaComponent, {...props, renderDefault})
  }

  if (node.schemaType.name === 'image') {
    return <ImageCanvasNode node={node as ObjectFormNode} renderCanvasNode={renderCanvasNode} />
  }

  if (node.schemaType.jsonType === 'boolean') {
    return (
      <BooleanCanvasNode node={node as PrimitiveFormNode} renderCanvasNode={renderCanvasNode} />
    )
  }

  if (node.schemaType.jsonType === 'number') {
    return <NumberCanvasNode node={node as PrimitiveFormNode} renderCanvasNode={renderCanvasNode} />
  }

  if (node.schemaType.jsonType === 'object') {
    return <ObjectCanvasNode node={node as ObjectFormNode} renderCanvasNode={renderCanvasNode} />
  }

  if (node.schemaType.jsonType === 'string') {
    return <StringCanvasNode node={node as PrimitiveFormNode} renderCanvasNode={renderCanvasNode} />
  }

  return <div>Default</div>
}
