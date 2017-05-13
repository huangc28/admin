import { handleActions } from 'redux-actions'

import * as loadingStatus from '../constants/loadingState'
import * as actions from '../actions/ideaComment'

const INIT_STATE = {
  loading: loadingStatus.EMPTY,
  data: [],
}

const ideaCommentReducer = handleActions({
  [actions.fetchIdeaComment]: (state, action) => ({
    ...state,
    loading: loadingStatus.LOADING,
    data: [
      ...state.data,
      action.payload.comment,
    ],
  }),
}, INIT_STATE)

export default ideaCommentReducer
