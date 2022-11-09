import {createContext} from 'react'
import {Canvas} from './types'

/** @internal */
export const CanvasContext = createContext<Canvas | null>(null)
