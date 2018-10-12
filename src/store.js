import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import drawReducer from './reducers/drawReducer'
import tooltipReducer from './reducers/tooltipReducer'
import aoiReducer from './reducers/aoiReducer'

const reducer = combineReducers({
  draw: drawReducer,
  aoi: aoiReducer,
  tooltip: tooltipReducer
})

const store = createStore(
  reducer, composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store
