import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import AOIreducer from './reducers/AOIreducer'
import tooltipReducer from './reducers/tooltipReducer'

const reducer = combineReducers({
  AOI: AOIreducer,
  tooltip: tooltipReducer
})

const store = createStore(
  reducer, composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store
