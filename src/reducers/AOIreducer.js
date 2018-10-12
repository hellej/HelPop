import * as utils from '../utils'

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

    case 'UPDATE_AOI': {
      return {
        ...store,
        popStats: false,
        aoiFeature: action.feature,
        area: action.area
      }
    }

    case 'POPULATION_CALCULATED': {
      return {
        ...store,
        popStats: true,
        pop: action.pop,
        popDens: action.popDens,
        popUrbanDens: action.popUrbanDens,
      }
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
  console.log('populationStats:', populationStats)
  return {
    type: 'POPULATION_CALCULATED',
    pop: populationStats.totalPopulation,
    popDens: populationStats.populationDensity,
    popUrbanDens: populationStats.populationUrbanDensity
  }
}

export default aoiReducer
