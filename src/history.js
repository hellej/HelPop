import { createBrowserHistory } from 'history'

export default createBrowserHistory()

export const sameHistoryLocation = (props, nextProps) => {
  if ((nextProps.location.key !== props.location.key) &&
    (nextProps.location.pathname === props.location.pathname)) return true
  return false
}
