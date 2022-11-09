import {BaseEditor} from 'slate'
import {ReactEditor} from 'slate-react'

export interface CustomEditor extends BaseEditor, ReactEditor {
  //
}

// export interface TitleNode {
//   type: 'title'
//   children: CustomText[]
// }

// export interface ParagraphNode {
//   type: 'paragraph'
//   children: CustomText[]
// }

// export type CustomElement = TitleNode | ParagraphNode

export type CustomElement = {
  type: 'field'
  name: string
  // eslint-disable-next-line no-use-before-define
  children: CustomText[]
}

export interface CustomText {
  text: string
}

declare module 'slate' {
  export interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText
  }
}
