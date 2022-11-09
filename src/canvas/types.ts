import {ComponentType} from 'react'
import {
  ArrayOfObjectsFormNode,
  ArrayOfPrimitivesFormNode,
  BooleanFormNode,
  ObjectFormNode,
  PrimitiveFormNode,
} from 'sanity'
import {CanvasElementProps, RenderCanvasElementCallback} from './element'
import {CanvasNodeProps, RenderCanvasNodeCallback} from './node'

/** @alpha */
export interface Canvas {
  renderCanvasElement: RenderCanvasElementCallback
  renderCanvasNode: RenderCanvasNodeCallback
}

/** @alpha */
export type CanvasElementComponent = ComponentType<CanvasElementProps>

/** @alpha */
export type CanvasNodeComponent = ComponentType<CanvasNodeProps>

/** @alpha */
export interface CanvasPluginOptions {
  components?: {
    element?: CanvasElementComponent
    node?: CanvasNodeComponent
  }
}

/** @alpha */
export type ArrayOfObjectsCanvasElementComponent = ComponentType<
  CanvasElementProps<ArrayOfObjectsFormNode>
>

/** @alpha */
export type ArrayOfPrimitivesCanvasElementComponent = ComponentType<
  CanvasElementProps<ArrayOfPrimitivesFormNode>
>

/** @alpha */
export type BooleanCanvasElementComponent = ComponentType<CanvasElementProps<BooleanFormNode>>

/** @alpha */
export type StringCanvasElementComponent = ComponentType<CanvasElementProps<PrimitiveFormNode>>

/** @alpha */
export type ObjectCanvasElementComponent = ComponentType<CanvasElementProps<ObjectFormNode>>

/** @alpha */
export type NumberCanvasElementComponent = ComponentType<CanvasElementProps<PrimitiveFormNode>>

/** @alpha */
export type TextCanvasElementComponent = ComponentType<CanvasElementProps<PrimitiveFormNode>>

/** @alpha */
export type ArrayOfObjectsCanvasNodeComponent = ComponentType<
  CanvasNodeProps<ArrayOfObjectsFormNode>
>

/** @alpha */
export type ArrayOfPrimitivesCanvasNodeComponent = ComponentType<
  CanvasNodeProps<ArrayOfPrimitivesFormNode>
>

/** @alpha */
export type BooleanCanvasNodeComponent = ComponentType<CanvasNodeProps<BooleanFormNode>>

/** @alpha */
export type StringCanvasNodeComponent = ComponentType<CanvasNodeProps<PrimitiveFormNode>>

/** @alpha */
export type ObjectCanvasNodeComponent = ComponentType<CanvasNodeProps<ObjectFormNode>>

/** @alpha */
export type NumberCanvasNodeComponent = ComponentType<CanvasNodeProps<PrimitiveFormNode>>

/** @alpha */
export type TextCanvasNodeComponent = ComponentType<CanvasNodeProps<PrimitiveFormNode>>

declare module 'sanity' {
  export interface PluginOptions {
    canvas?: CanvasPluginOptions
  }

  export interface ArrayOfObjectsComponents {
    canvas: {
      node?: ArrayOfObjectsCanvasNodeComponent
      element?: ArrayOfObjectsCanvasElementComponent
    }
  }

  export interface ArrayOfPrimitivesComponents {
    canvas: {
      node?: ArrayOfPrimitivesCanvasNodeComponent
      element?: ArrayOfPrimitivesCanvasElementComponent
    }
  }

  export interface BlockComponents {
    canvas: {
      node?: ArrayOfObjectsCanvasNodeComponent
      element?: ArrayOfObjectsCanvasElementComponent
    }
  }

  export interface BooleanComponents {
    canvas: {node?: BooleanCanvasNodeComponent; element?: BooleanCanvasElementComponent}
  }

  export interface DateComponents {
    canvas: {node?: StringCanvasNodeComponent; element?: StringCanvasElementComponent}
  }

  export interface DatetimeComponents {
    canvas: {node?: StringCanvasNodeComponent; element?: StringCanvasElementComponent}
  }

  export interface DocumentComponents {
    canvas: {node?: ObjectCanvasNodeComponent; element?: ObjectCanvasElementComponent}
  }

  export interface FileComponents {
    canvas: {node?: ObjectCanvasNodeComponent; element?: ObjectCanvasElementComponent}
  }

  export interface GeopointComponents {
    canvas: {node?: ObjectCanvasNodeComponent; element?: ObjectCanvasElementComponent}
  }

  export interface NumberComponents {
    canvas: {node?: NumberCanvasNodeComponent; element?: NumberCanvasElementComponent}
  }

  export interface ObjectComponents {
    canvas: {node?: ObjectCanvasNodeComponent; element?: ObjectCanvasElementComponent}
  }

  export interface ReferenceComponents {
    canvas: {node?: ObjectCanvasNodeComponent; element?: ObjectCanvasElementComponent}
  }

  export interface CrossDatasetReferenceComponents {
    canvas: {node?: ObjectCanvasNodeComponent; element?: ObjectCanvasElementComponent}
  }

  export interface SlugComponents {
    canvas: {node?: ObjectCanvasNodeComponent; element?: ObjectCanvasElementComponent}
  }

  export interface SpanComponents {
    canvas: {node?: ObjectCanvasNodeComponent; element?: ObjectCanvasElementComponent}
  }

  export interface StringComponents {
    canvas: {node?: StringCanvasNodeComponent; element?: StringCanvasElementComponent}
  }

  export interface TextComponents {
    canvas: {node?: TextCanvasNodeComponent; element?: TextCanvasElementComponent}
  }

  export interface UrlComponents {
    canvas: {node?: StringCanvasNodeComponent; element?: StringCanvasElementComponent}
  }

  export interface EmailComponents {
    canvas: {node?: StringCanvasNodeComponent; element?: StringCanvasElementComponent}
  }
}
