import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import appReducer from './app'
import auth from '../redux/auth'
import ideaComment from '../redux/ideaComments'
import ideas from '../redux/ideas'
// import ideas from './ideas'
import ideaSamples from './ideaSamples'
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
