import {useContext} from 'react'
import {CanvasContext} from './CanvasContext'
import {Canvas} from './types'

/** @alpha */
export function useCanvas(): Canvas {
  const canvas = useContext(CanvasContext)

  if (!canvas) {
    throw new Error(
      'Canvas: missing context value – did you forget to wrap the component tree in a <CanvasProvider />?'
    )
  }

  return canvas
}
