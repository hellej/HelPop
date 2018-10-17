const initialNotification = { text: null, look: null }
let notifTimeout

const notificationReducer = (store = initialNotification, action) => {

  switch (action.type) {
    case 'SHOWNOTIF':
      return { text: action.text, look: action.look }

    case 'RMNOTIF':
      return initialNotification

    default:
      return store
  }
}

export const showNotification = (text, look, notiftime) => {
  return async (dispatch) => {
    dispatch(rmNotification())
    await new Promise(resolve => notifTimeout = setTimeout(resolve, 120))
    dispatch({ type: 'SHOWNOTIF', text, look })
    clearTimeout(notifTimeout)
    await new Promise(resolve => notifTimeout = setTimeout(resolve, notiftime * 1000))
    dispatch(rmNotification())
  }
}

export const rmNotification = () => {
  clearTimeout(notifTimeout)
  return ({ type: 'RMNOTIF' })
}

export default notificationReducer
