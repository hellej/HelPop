import * as utils from '../utils'
import saveAs from 'file-saver'
import { showTooltip } from './tooltipReducer'

const initialAOIState = {
  aoiFeature: null,
  area: null,
  popStats: false,
  pop: null,
  popDens: null,
  popUrbanDens: null,
}

const aoiReducer = (store = initialAOIState, action) => {

  switch (action.type) {

    case 'DELETE_AOI':
    case 'RESET_DRAW_AOI':
      return initialAOIState

    case 'UPDATE_AOI':
      return {
        ...store,
        popStats: false,
        aoiFeature: action.feature,
        area: action.area
      }
    case 'POPULATION_CALCULATED':
      return {
        ...store,
        popStats: true,
        pop: action.pop,
        popDens: action.popDens,
        popUrbanDens: action.popUrbanDens,
      }
    case 'SET_UPLOADED_AOI':
      return {
        ...store,
        popStats: false,
        aoiFeature: action.feature,
        area: utils.getArea(action.feature)
      }
    default:
      return store
  }
}

export const updateAOI = (features) => {
  const area = utils.getArea(features[0])
  return { type: 'UPDATE_AOI', feature: features[0], area }
}

export const deleteAOI = () => {
  return { type: 'DELETE_AOI' }
}

export const calculatePopulationStats = (aoiFeature) => {
  const populationStats = utils.calculatePopulationStats(aoiFeature)
  return {
    type: 'POPULATION_CALCULATED',
    pop: populationStats.totalPopulation,
    popDens: populationStats.populationDensity,
    popUrbanDens: populationStats.populationUrbanDensity
  }
}

export const handleUploadFileChange = (file) => {
  return async (dispatch) => {
    const feature = JSON.parse(file)
    const error = validateAOIFeature(feature)
    if (error) {
      dispatch(showTooltip(error, 2, 5))
      console.log('uploading failed')
      return
    } else {
      dispatch({ type: 'SET_UPLOADED_AOI', feature })
    }
  }
}

export const downloadAOIasGeoJson = (aoi) => {
  const text = JSON.stringify(aoi.aoiFeature)
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
  saveAs(blob, 'aoi.geojson')
  return { type: 'AOI_DOWNLOADED' }
}

const validateAOIFeature = (file) => {
  console.log('uploading: ', file)
  if (!file.type || file.type.localeCompare('feature') !== 1) return 'Uploaded file is not a geojson feature'
  if (!file.geometry) return 'Geometry is missing in the uploaded file'
  if (!file.geometry.coordinates || file.geometry.coordinates[0].length < 3) return 'Geometry is missing in the uploaded file'
  if (file.geometry.type.localeCompare('polygon') === 0 &&
    file.geometry.type.localeCompare('multipolygon') === 0) { return 'Wrong geometry type in the uploaded file' }
  return null
}

export default aoiReducer
