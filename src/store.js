import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import drawReducer from './reducers/drawReducer'
import notificationReducer from './reducers/notificationReducer'
import aoiReducer from './reducers/aoiReducer'
import mapReducer from './reducers/mapReducer'

const reducer = combineReducers({
  draw: drawReducer,
  aoi: aoiReducer,
  notification: notificationReducer,
  map: mapReducer,
})

const store = createStore(
  reducer, composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store
