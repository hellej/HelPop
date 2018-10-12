import { showTooltip } from './tooltipReducer'
import * as utils from '../utils'

let draw = null

const initialDrawState = {
  drawMode: null,
  initialized: false,
}

const drawReducer = (store = initialDrawState, action) => {

  switch (action.type) {

    case 'INITIALIZE_DRAW':
      return {
        ...store,
        initialized: true
      }
    case 'RESET_DRAW_AOI':
      return {
        ...initialDrawState,
        initialized: true
      }
    case 'DRAW_MODE_CHANGED':
      return {
        ...store,
        drawMode: action.drawMode
      }
    case 'SET_UPLOADED_AOI': {
      const aoiFC = utils.asFeatureCollection([action.feature])
      console.log('action FC:', aoiFC)
      draw.set(aoiFC)
      return { ...store }
    }
    default:
      return store
  }
}

export const initializeDraw = (drawObject) => {
  return async (dispatch) => {
    draw = drawObject
    await new Promise(resolve => setTimeout(resolve, 2000))
    dispatch({ type: 'INITIALIZE_DRAW' })
  }
}

export const startDrawing = () => {
  return async (dispatch) => {
    draw.changeMode('draw_polygon')
    dispatch({ type: 'DRAW_MODE_CHANGED', drawMode: 'draw_polygon' })
    dispatch(showTooltip('Finish drawing by clicking the first point', 1, 5.5))
  }
}

export const deleteAllDrawsAOIs = () => {
  return async (dispatch) => {
    draw.deleteAll()
    dispatch({ type: 'RESET_DRAW_AOI' })
  }
}

export const deleteSelectedDrawNode = () => {
  return async (dispatch) => {
    draw.trash()
    dispatch({ type: 'DELETE_NODE' })
    dispatch({ type: 'DRAW_MODE_CHANGED', drawMode: 'simple_select' })
  }
}

export const drawSelectionChanged = () => {
  return async (dispatch) => {
    const points = draw.getSelectedPoints().features
    if (points.length === 0) {
      dispatch({ type: 'DRAW_MODE_CHANGED', drawMode: 'simple_select' })
    } else { dispatch({ type: 'DRAW_MODE_CHANGED', drawMode: 'direct_select' }) }
  }
}

export default drawReducer
