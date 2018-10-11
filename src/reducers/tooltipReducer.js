const initialTooltip = { text: null, style: null }
let notifTimeout

const tooltipReducer = (store = initialTooltip, action) => {

  switch (action.type) {
    case 'SHOWNOTIF':
      return { text: action.text, style: action.style }

    case 'RMNOTIF':
      return initialTooltip

    default:
      return store
  }
}

export const showTooltip = (text, style, notiftime) => {
  return async (dispatch) => {
    dispatch(rmTooltip())
    await new Promise(resolve => notifTimeout = setTimeout(resolve, 120))
    dispatch({ type: 'SHOWNOTIF', text, style })
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
