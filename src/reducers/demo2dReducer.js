import * as utils from './../utils'

const colorSteps = [
  { color: '#EED322', value: 100 },
  { color: '#E6B71E', value: 500 },
  { color: '#B86B25', value: 900 },
  { color: '#8B4225', value: 2000 },
  { color: '#723122', value: null },
]

const initialDemo2dState = {
  visible: false,
  layerId: 'demo2d',
  colorSteps: colorSteps,
  legendClasses: [],
  mbPaintStyle: null,
}

const demo2dReducer = (store = initialDemo2dState, action) => {

  switch (action.type) {

    case 'TOGGLE_2D_DEMO': return { ...store, visible: !store.visible }

    case 'INITIALIZE_DEMO2D':
    case 'SET_COLOR_CLASSES':
      return {
        ...store,
        legendClasses: utils.legendClasses(action.colorSteps),
        mbPaintStyle: utils.mbPaintStyle(action.colorSteps)
      }
    default:
      return store
  }
}

export const initialize2Ddemo = () => {
  return { type: 'INITIALIZE_DEMO2D', colorSteps }
}

export const toggle2Ddemo = () => {
  return { type: 'TOGGLE_2D_DEMO' }
}

export const setPaintStyle = (colorSteps) => {
  return { type: 'SET_COLOR_CLASSES', colorSteps }
}

export default demo2dReducer
