import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import auth from './auth'
import ideaComment from './ideaComments'
import ideas from './ideas'
import ideaSamples from './ideaSamples'
import initFormData from './initFormData'
import photo from './photo'
import purchaseOrder from './purchaseOrder'
import suppliers from './supplier'
import supply from './supply'

const rootReducer = combineReducers({
  auth,
  ideaSamples,
  ideaComment,
  ideas,
  photo,
  initFormData,
  routing: routerReducer,
  form: formReducer,
  purchaseOrder,
  suppliers,
  supply,
})

export default rootReducer
