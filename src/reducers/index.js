import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import appReducer from './app'
import ideas from './ideas'

const rootReducer = combineReducers({
  appReducer,
  ideas,
  routing: routerReducer,
  form: formReducer,
})

export default rootReducer
