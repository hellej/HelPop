import * as utils from '../utils'
import saveAs from 'file-saver'

const initialAOIState = {
  FC: {
    type: 'FeatureCollection',
    features: []
  },
  popStats: false
}

const aoiReducer = (store = initialAOIState, action) => {

  switch (action.type) {

    case 'DELETE_AOI':
    case 'RESET_DRAW_AOI':
      return initialAOIState

    case 'POPULATION_CALCULATED':
      return {
        ...store,
        FC: action.FC,
        popStats: true,
      }
    case 'SET_UPLOADED_AOI':
      return {
        ...store,
        FC: action.FC
      }
    case 'CREATE_DRAW_AREAS':
    case 'UPDATE_DRAW_AREAS':
      return {
        ...store,
        popStats: false,
        FC: action.FC,
      }
    default:
      return store
  }
}

export const deleteAOI = () => {
  return { type: 'DELETE_AOI' }
}

export const calculatePopulationStats = (FC) => {
  return {
    type: 'POPULATION_CALCULATED',
    FC: {
      ...FC,
      features: FC.features.map(feature => ({
        ...feature,
        properties: {
          ...feature.properties,
          ...utils.calculatePopulationStats(feature),
        }
      }))
    }
  }
}

export const downloadAOIasGeoJson = (FC) => {
  const text = JSON.stringify(FC, null, 2)
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
  saveAs(blob, 'aoi.geojson')
  return { type: 'AOI_DOWNLOADED' }
}

export default aoiReducer
