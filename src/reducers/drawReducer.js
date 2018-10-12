import { showTooltip } from './tooltipReducer'

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
    case 'DRAW_MODE_CHANGED': {
      return {
        ...store,
        drawMode: action.drawMode
      }
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
    dispatch(drawModeChanged('draw_polygon'))
    dispatch(showTooltip('Finish drawing by clicking the first point', 1, 5.5))
  }
}

export const deleteAllDrawsAOIs = () => {
  return async (dispatch) => {
    draw.deleteAll()
    dispatch({ type: 'RESET_DRAW_AOI' })
  }
}

export const drawModeChanged = (drawMode) => {
  return async (dispatch) => {
    console.log('draw mode changed:', drawMode)
    dispatch({ type: 'DRAW_MODE_CHANGED', drawMode })
  }
}

export default drawReducer
