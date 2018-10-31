import * as utils from '../utils'
import { showNotification } from './notificationReducer'

const colorSteps = [
  { color: '#EED322', value: 100 },
  { color: '#E6B71E', value: 500 },
  { color: '#B86B25', value: 900 },
  { color: '#8B4225', value: 2000 },
  { color: '#723122', value: null },
]

const initialDemo3dState = {
  visible: false,
  layerId: 'demo3d',
  colorSteps: colorSteps,
  legendClasses: [],
  legendName: 'Population',
  mbPaintStyle: null,
}

const demo3dReducer = (store = initialDemo3dState, action) => {

  switch (action.type) {

    case 'TOGGLE_3D_DEMO': return { ...store, visible: !store.visible }

    case 'TOGGLE_2D_DEMO': return { ...store, visible: action.visible ? store.visible : false }

    case 'INITIALIZE_DEMO3D':
    case 'SET_COLOR_CLASSES':
      return {
        ...store,
        legendClasses: utils.legendClasses(action.colorSteps),
        mbPaintStyle: utils.mb3DPaintStyle(action.colorSteps, 'ASUKKAITA', 'ASUKKAITA')
      }
    default:
      return store
  }
}

export const initialize3Ddemo = () => {
  return { type: 'INITIALIZE_DEMO3D', colorSteps }
}

export const toggle3Ddemo = (visible) => {
  return async (dispatch) => {
    dispatch({ type: 'TOGGLE_3D_DEMO', visible })
    if (!visible) dispatch(showNotification('Hold down the Ctrl (or command) key and and drag the map', 1, 5.5))
  }
}

export const setPaintStyle = (colorSteps) => {
  return { type: 'SET_COLOR_CLASSES', colorSteps }
}

export default demo3dReducer
