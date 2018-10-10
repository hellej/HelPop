const initialAOIState = {
  drawMode: null,
  AOIfeature: null,
}

const AOIreducer = (store = initialAOIState, action) => {

  switch (action.type) {
    case 'DRAW_MODE_CHANGED': {
      return {
        ...store,
        drawMode: action.drawMode
      }
    }
    case 'UPDATE_AOI': {
      return {
        ...store,
        AOIfeature: action.AOIfeature
      }
    }
    case 'RESET_DRAW_AOI':
      return initialAOIState

    default:
      return store
  }
}

export const updateAOI = (features) => {
  console.log('aoi feature updated:', features[0])
  return { type: 'UPDATE_AOI', AOIfeature: features[0] }
}

export const deleteAOIs = () => {
  return { type: 'RESET_DRAW_AOI' }
}

export const drawModeChanged = (drawMode) => {
  console.log('draw mode changed:', drawMode)
  return { type: 'DRAW_MODE_CHANGED', drawMode }
}

export default AOIreducer
