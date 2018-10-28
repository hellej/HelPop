import * as utils from './../utils'

const initialMapState = {
  basemap: 'Streets',
  initialized: false,
  camera3d: false,
  zoomToBbox: null,
  center: {},
  zoom: 0,
}

const mapReducer = (store = initialMapState, action) => {

  switch (action.type) {

    case 'INITIALIZE_MAP':
      return { ...store, initialized: true }

    case 'SET_BASEMAP':
      return { ...store, basemap: action.basemap }

    case 'UPDATE_CAMERA':
      return { ...store, center: action.center, zoom: action.zoom }

    case 'ZOOM_TO_FEATURE':
      return { ...store, zoomToBbox: utils.getBbox(utils.getBuffer(action.feature, 1000)) }

    case 'TOGGLE_3D_DEMO':
      return { ...store, camera3d: !store.camera3d }

    case 'TOGGLE_2D_DEMO':
      return { ...store, camera3d: false }

    case 'SET_UPLOADED_AOI':
      return { ...store, zoomToBbox: utils.getBbox(utils.getBuffer(action.FC, 1000)) }

    default:
      return store
  }
}

export const initializeMap = () => {
  return { type: 'INITIALIZE_MAP' }
}

export const zoomToFeature = (feature) => {
  return { type: 'ZOOM_TO_FEATURE', feature }
}

export const updateCamera = (center, zoom) => {
  return { type: 'UPDATE_CAMERA', center, zoom }
}

export const setBasemap = (basemap) => {
  return { type: 'SET_BASEMAP', basemap }
}

export default mapReducer
