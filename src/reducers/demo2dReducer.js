import { mbutils } from './../utils/index'
import * as censusFC from './../data/vaesto-250m-2017.json'

const initialDemo2dState = {
  visible: false,
  layerId: 'demo2d',
  colorSteps: [],
  legendClasses: [],
  legendName: 'Population',
  mbPaintStyle: null,
}

const demo2dReducer = (store = initialDemo2dState, action) => {

  switch (action.type) {

    case 'TOGGLE_2D_DEMO':
      return { ...store, visible: !store.visible }

    case 'TOGGLE_3D_DEMO':
      return { ...store, visible: action.visible ? store.visible : false }

    case 'INITIALIZE_DEMO2D':
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

export const initialize2Ddemo = () => {
  const propValues = censusFC.features.map(feat => feat.properties.ASUKKAITA)
  const min = Math.min(...propValues)
  const max = Math.max(...propValues)

  const colors = ['#EED322', '#E6B71E', '#B86B25', '#8B4225', '#723122']
  const colorSteps = mbutils.getCustomColorSteps(colors, [200, 600, 1100, 1900, max])
  // const colorSteps = utils.getEqualColorSteps(colors, min, max)
  const legendClasses = mbutils.legendClasses(colorSteps, min, max)
  const mbPaintStyle = mbutils.mbPaintStyle(colorSteps, 'ASUKKAITA')
  return { type: 'INITIALIZE_DEMO2D', colorSteps, legendClasses, mbPaintStyle }
}

export const toggle2Ddemo = (visible) => {
  return { type: 'TOGGLE_2D_DEMO', visible }
}

export const setPaintStyle = (colorSteps) => {
  return { type: 'SET_COLOR_CLASSES', colorSteps }
}

export default demo2dReducer
