const initialAOIState = {
  AOI: null
}

const AOIreducer = (store = initialAOIState, action) => {

  switch (action.type) {
    case 'UPDATE_AOI': {
      return {
        ...store,
        AOI: action.AOI
      }
    }
    case 'RESET_DRAW_AOI':
      return initialAOIState

    default:
      return store
  }
}

export const updateAOI = (draw) => {
  const AOI = draw
  return { type: 'UPDATE_AOI', AOI }
}

export default AOIreducer
