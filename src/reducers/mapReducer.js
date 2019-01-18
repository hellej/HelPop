import { turf } from '../utils/index'

const initialMapState = {
  basemap: 'Streets',
  initialized: false,
  camera3d: false,
  zoomToBbox: null,
  center: {},
  zoom: 0,
  mouseOnFeature: null,
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
      return { ...store, zoomToBbox: turf.getBbox(turf.getBuffer(action.feature, 1000)) }

    case 'REMOVE_2D_3D_POPS':
      return { ...store, camera3d: false, mouseOnFeature: null }

    case 'TOGGLE_3D_DEMO':
      return { ...store, camera3d: !store.camera3d, mouseOnFeature: null }

    case 'TOGGLE_2D_DEMO':
      return { ...store, camera3d: false, mouseOnFeature: null }

    case 'SET_UPLOADED_AOI':
      return { ...store, zoomToBbox: turf.getBbox(turf.getBuffer(action.FC, 1000)) }

    case 'SET_MOUSEON_FEATURE': {
      if (action.feature === undefined) return { ...store, mouseOnFeature: null }
      return { ...store, mouseOnFeature: action.feature }
    }

    default:
      return store
  }
}

export const remove2Dand3Dpops = () => {
  return { type: 'REMOVE_2D_3D_POPS' }
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

export const setMouseOnFeature = (feature) => {
  return { type: 'SET_MOUSEON_FEATURE', feature }
}

export default mapReducer
