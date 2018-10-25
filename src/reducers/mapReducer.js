import * as constants from './../constants'
import * as utils from './../utils'

let map = null

const initialMapState = {
  basemap: 'Streets',
  initialized: false,
  center: {},
  zoom: 0,
}

const mapReducer = (store = initialMapState, action) => {

  switch (action.type) {

    case 'INITIALIZE_MAP': {
      return { ...store, initialized: true }
    }
    case 'SET_BASEMAP': {
      map.setStyle(constants.BASEMAPS[action.basemap].url)
      return { ...store, basemap: action.basemap }
    }
    case 'UPDATE_CAMERA': {
      return { ...store, center: action.center, zoom: action.zoom }
    }
    case 'ZOOM_TO_FEATURE': {
      const bbox = utils.getBbox(utils.getBuffer(action.feature, 1000))
      map.fitBounds(bbox)
      return store
    }
    case 'SET_UPLOADED_AOI': {
      const bbox = utils.getBbox(utils.getBuffer(action.FC, 1000))
      map.fitBounds(bbox)
      return store
    }
    default:
      return store
  }
}

export const initializeMap = (mapObject) => {
  map = mapObject
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
