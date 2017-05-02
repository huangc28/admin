import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import appReducer from './app'
import hotReloaded from './hotReloaded'
import ideas from './ideas'
import initFormData from './initFormData'

const rootReducer = combineReducers({
  appReducer,
  hotReloaded,
  ideas,
  initFormData,
  routing: routerReducer,
  form: formReducer,
})

export default rootReducer
