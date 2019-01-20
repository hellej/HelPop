import { mbutils } from './../utils/index'
import { showNotification } from './notificationReducer'
import censusFC from './../data/vaesto-250m-2017.json'

const initialDemo3dState = {
  visible: false,
  layerId: 'demo3d',
  colorSteps: [],
  legendClasses: [],
  legendName: 'Population',
  mbPaintStyle: null,
  tooltipShowCount: 0,
}

const demo3dReducer = (store = initialDemo3dState, action) => {

  switch (action.type) {

    case 'TOGGLE_3D_DEMO': return { ...store, visible: !store.visible, tooltipShowCount: store.tooltipShowCount + 1 }

    case 'TOGGLE_2D_DEMO': return { ...store, visible: action.visible ? store.visible : false }

    case 'REMOVE_2D_3D_POPS':
      return { ...store, visible: false }

    case 'INITIALIZE_DEMO3D':
    case 'SET_COLOR_CLASSES':
      return {
        ...store,
        colorSteps: action.colorSteps,
        legendClasses: action.legendClasses,
        mbPaintStyle: action.mbPaintStyle,
      }
    default:
      return store
  }
}

export const initialize3Ddemo = () => {
  const propValues = censusFC.features.map(feat => feat.properties.ASUKKAITA)
  const min = Math.min(...propValues)
  const max = Math.max(...propValues)

  const colors = ['#EED322', '#E6B71E', '#B86B25', '#8B4225', '#723122']
  const colorSteps = mbutils.getCustomColorSteps(colors, [200, 600, 1100, 1900, max])
  // const colorSteps = utils.getEqualColorSteps(colors, min, max)
  const legendClasses = mbutils.legendClasses(colorSteps, min, max)
  const mbPaintStyle = mbutils.mb3DPaintStyle(colorSteps, 'ASUKKAITA', 'ASUKKAITA')
  return { type: 'INITIALIZE_DEMO3D', colorSteps, legendClasses, mbPaintStyle }
}

export const toggle3Ddemo = (visible, tooltipShowCount) => {
  return async (dispatch) => {
    dispatch({ type: 'TOGGLE_3D_DEMO', visible })
    if (!visible && tooltipShowCount < 4) dispatch(showNotification('Hold down the Ctrl (or command) key and and drag the map', 1, 4))
  }
}

export const start3Ddemo = () => {
  return async (dispatch) => {
    dispatch({ type: 'TOGGLE_3D_DEMO', visible: false })
    dispatch(showNotification('Hold down the Ctrl (or command) key and and drag the map', 1, 7))
  }
}

export const setPaintStyle = (colorSteps) => {
  return { type: 'SET_COLOR_CLASSES', colorSteps }
}

export default demo3dReducer
