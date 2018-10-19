import * as utils from './../utils'

const colorClasses = [
  { color: '#EED322', value: 100 },
  { color: '#E6B71E', value: 500 },
  { color: '#B86B25', value: 900 },
  { color: '#8B4225', value: 2000 },
  { color: '#723122', value: null },
]

const initialDemo2dState = {
  visible: false,
  layerId: 'demo2d',
  colorClasses: colorClasses,
  mbPaintStyle: null,
}

const demo2dReducer = (store = initialDemo2dState, action) => {

  switch (action.type) {

    case 'TOGGLE_2D_DEMO': return { ...store, visible: !store.visible }

    case 'INITIALIZE_DEMO2D':
    case 'SET_COLOR_CLASSES':
      return { ...store, mbPaintStyle: utils.mbPaintStyle(action.colorClasses) }

    default:
      return store
  }
}

export const initialize2Ddemo = () => {
  return { type: 'INITIALIZE_DEMO2D', colorClasses }
}

export const toggle2Ddemo = () => {
  return { type: 'TOGGLE_2D_DEMO' }
}

export const setPaintStyle = (colorClasses) => {
  return { type: 'SET_COLOR_CLASSES', colorClasses }
}

export default demo2dReducer
