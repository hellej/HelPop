import * as utils from '../utils'

const initialAOIState = {
  aoiFeature: null,
  area: null,
}

const aoiReducer = (store = initialAOIState, action) => {

  switch (action.type) {

    case 'DELETE_AOI':
    case 'RESET_DRAW_AOI':
      return initialAOIState

    case 'UPDATE_AOI': {
      return {
        ...store,
        aoiFeature: action.feature,
        area: action.area
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

export default aoiReducer
