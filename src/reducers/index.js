import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import appReducer from './app'

const rootReducer = combineReducers({
  appReducer,
  routing: routerReducer,
})

export default rootReducer
