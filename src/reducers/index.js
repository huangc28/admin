import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import appReducer from './app'
import ideas from './ideas'

const rootReducer = combineReducers({
  appReducer,
  ideas,
  routing: routerReducer,
})

export default rootReducer
