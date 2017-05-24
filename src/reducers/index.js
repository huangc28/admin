import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import appReducer from './app'
import auth from './auth'
import ideaSamples from './ideaSamples'
import ideaComment from './ideaComment'
import ideas from './ideas'
import photo from './photo'
import initFormData from './initFormData'

const rootReducer = combineReducers({
  appReducer,
  auth,
  ideaSamples,
  ideaComment,
  ideas,
  photo,
  initFormData,
  routing: routerReducer,
  form: formReducer,
})

export default rootReducer
