import * as constants from './../constants'
import * as utils from './../utils'

let map = null

const initialMapState = {
  basemap: 'Streets',
  initialized: false,
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

export const setBasemap = (basemap) => {
  return { type: 'SET_BASEMAP', basemap }
}

export default mapReducer
