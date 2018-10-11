import * as utils from './../utils'
import { showTooltip } from './tooltipReducer'

let draw = null

const initialAOIState = {
  drawMode: null,
  AOIfeature: null,
  area: null,
  initialized: false,
}

const AOIreducer = (store = initialAOIState, action) => {

  switch (action.type) {

    case 'RESET_DRAW_AOI':
      return {
        ...initialAOIState,
        initialized: true
      }
    case 'INITIALIZE_DRAW':
      return {
        ...store,
        initialized: true
      }
    case 'DRAW_MODE_CHANGED': {
      return {
        ...store,
        drawMode: action.drawMode
      }
    }
    case 'UPDATE_AOI': {
      return {
        ...store,
        AOIfeature: action.AOIfeature,
        area: action.area
      }
    }

    default:
      return store
  }
}

export const initDraw = (drawObject) => {
  return async (dispatch) => {
    draw = drawObject
    await new Promise(resolve => setTimeout(resolve, 2000))
    dispatch({ type: 'INITIALIZE_DRAW' })
  }
}

export const startDrawing = () => {
  return async (dispatch) => {
    draw.changeMode('draw_polygon')
    dispatch(drawModeChanged('draw_polygon'))
    dispatch(showTooltip('Finish drawing by clicking the first point', 1, 5.5))
  }
}

export const deleteAllAOIs = () => {
  return async (dispatch) => {
    draw.deleteAll()
    dispatch({ type: 'RESET_DRAW_AOI' })
  }
}

export const updateAOI = (features) => {
  console.log('aoi feature updated:', features[0])
  const area = utils.getArea(features[0])
  return { type: 'UPDATE_AOI', AOIfeature: features[0], area }
}

export const deleteAOI = () => {
  return { type: 'RESET_DRAW_AOI' }
}

export const drawModeChanged = (drawMode) => {
  return async (dispatch) => {
    console.log('draw mode changed:', drawMode)
    dispatch({ type: 'DRAW_MODE_CHANGED', drawMode })
  }
}

export default AOIreducer
