import { showNotification } from './notificationReducer'
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
      draw.set(action.FC)
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
    dispatch(showNotification('Finish drawing by clicking the first point', 1, 5.5))
  }
}

export const deleteAllDrawsAOIs = () => {
  draw.deleteAll()
  return { type: 'RESET_DRAW_AOI' }
}

export const deleteSelectedDrawing = () => {
  draw.trash()
  return { type: 'DRAW_MODE_CHANGED', drawMode: 'simple_select' }
}

export const drawSelectionChanged = () => {
  const points = draw.getSelectedPoints().features
  if (points.length === 0) {
    return { type: 'DRAW_MODE_CHANGED', drawMode: 'simple_select' }
  } else {
    return { type: 'DRAW_MODE_CHANGED', drawMode: 'direct_select' }
  }
}

export const updateDrawAreas = (e) => {
  const updatedFeature = e.features[0]
  const FC = draw
    .setFeatureProperty(updatedFeature.id, 'area', utils.getArea(updatedFeature))
    .getAll()
  return { type: 'UPDATE_DRAW_AREAS', FC }
}

export const createDrawAreas = (e) => {
  return async (dispatch) => {
    const createdFeature = e.features[0]
    const name = prompt('Please enter a name for the new area', `Alue ${draw.getAll().features.length}`)
    const FC = draw
      .setFeatureProperty(createdFeature.id, 'name', name)
      .setFeatureProperty(createdFeature.id, 'area', utils.getArea(createdFeature))
      .getAll()
    dispatch(showNotification('AOI created. Start editing by clicking a node. Drag polygon if it needs to be moved.', 3, 9))
    dispatch({ type: 'CREATE_DRAW_AREAS', FC })
  }
}

export const handleUploadFileChange = (file) => {
  return async (dispatch) => {
    const fileFC = JSON.parse(file)
    const error = utils.validateAOIFeature(fileFC)
    if (error) {
      dispatch(showNotification(error, 2, 5))
    } else {
      draw.set(fileFC)
      dispatch({ type: 'SET_UPLOADED_AOI', FC: utils.addAreaAndNameToFC(draw.getAll()) })
      dispatch(showNotification('AOI feature succesfully loaded', 3, 5))
    }
  }
}

export default drawReducer
