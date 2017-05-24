import { handleActions } from 'redux-actions'
import * as loadingStatus from '../constants/loadingState'

import * as actions from '../actions/photo'

const INIT_STATE = {
  loading: loadingStatus.EMPTY,
  image: null,
  errorMessage: '',
}

const photoReducer = handleActions({
  [actions.uploadPhoto]: (state, action) => ({
    loading: loadingStatus.LOADING,
  }),
  [actions.uploadPhotoSuccess]: (state, action) => ({
    loading: loadingStatus.READY,
    image: action.payload.image,
  }),
  [actions.uploadPhotoFailed]: (state, action) => ({
    loading: loadingStatus.ERROR,
    errorMessage: action.payload.errorMessage,
  }),
}, INIT_STATE)

export default photoReducer