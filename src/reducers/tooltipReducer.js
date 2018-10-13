const initialTooltip = { text: null, look: null }
let notifTimeout

const tooltipReducer = (store = initialTooltip, action) => {

  switch (action.type) {
    case 'SHOWNOTIF':
      return { text: action.text, look: action.look }

    case 'RMNOTIF':
      return initialTooltip

    default:
      return store
  }
}

export const showTooltip = (text, look, notiftime) => {
  return async (dispatch) => {
    dispatch(rmTooltip())
    await new Promise(resolve => notifTimeout = setTimeout(resolve, 120))
    dispatch({ type: 'SHOWNOTIF', text, look })
    clearTimeout(notifTimeout)
    await new Promise(resolve => notifTimeout = setTimeout(resolve, notiftime * 1000))
    dispatch(rmTooltip())
  }
}

export const rmTooltip = () => {
  clearTimeout(notifTimeout)
  return ({ type: 'RMNOTIF' })
}

export default tooltipReducer
