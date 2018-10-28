import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import drawReducer from './reducers/drawReducer'
import notificationReducer from './reducers/notificationReducer'
import aoiReducer from './reducers/aoiReducer'
import mapReducer from './reducers/mapReducer'
import demo2dReducer from './reducers/demo2dReducer'
import demo3dReducer from './reducers/demo3dReducer'
import menuReducer from './reducers/menuReducer'

const reducer = combineReducers({
  draw: drawReducer,
  aoi: aoiReducer,
  notification: notificationReducer,
  map: mapReducer,
  demo2d: demo2dReducer,
  demo3d: demo3dReducer,
  menu: menuReducer,
})

const store = createStore(
  reducer, composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store
