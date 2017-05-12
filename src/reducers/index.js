import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import appReducer from './app'
import auth from './auth'
import ideas from './ideas'
import initFormData from './initFormData'

const rootReducer = combineReducers({
  appReducer,
  auth,
  ideas,
  initFormData,
  routing: routerReducer,
  form: formReducer,
})

export default rootReducer
