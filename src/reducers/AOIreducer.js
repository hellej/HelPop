import * as utils from './../utils'
import { showTooltip } from './tooltipReducer'

const initialAOIState = {
  drawMode: null,
  AOIfeature: null,
  area: null,
}

const AOIreducer = (store = initialAOIState, action) => {

  switch (action.type) {
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
    case 'RESET_DRAW_AOI':
      return initialAOIState

    default:
      return store
  }
}

export const updateAOI = (features) => {
  console.log('aoi feature updated:', features[0])
  const area = utils.getArea(features[0])
  return { type: 'UPDATE_AOI', AOIfeature: features[0], area }
}

export const deleteAOIs = () => {
  return { type: 'RESET_DRAW_AOI' }
}

export const drawModeChanged = (drawMode) => {
  return async (dispatch) => {
    console.log('draw mode changed:', drawMode)
    if (drawMode === 'draw_polygon') {
      dispatch(showTooltip('Finish drawing by clicking the first point', 1, 5.5))
    }
    dispatch({ type: 'DRAW_MODE_CHANGED', drawMode })
  }
}

export default AOIreducer
