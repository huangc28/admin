import { handleActions } from 'redux-actions'

import * as loadingStatus from '../constants/loadingState'
import * as actions from '../actions/ideaComment'

const INIT_STATE = {
  errorMessage: null,
  loading: loadingStatus.EMPTY,
  data: [],
}

const ideaCommentReducer = handleActions({
  [actions.fetchIdeaComment]: (state, action) => ({
    ...state,
    loading: loadingStatus.LOADING,
  }),
  [actions.fetchIdeaCommentSuccess]: (state, action) => ({
    ...state,
    data: [
      ...state.data.filter(comment =>
        comment &&
        comment.idea_id &&
        (comment.idea_id === action.payload.comment.idea_id)
      ),
      action.payload.comment,
    ],
  }),
  [actions.fetchIdeaCommentFailed]: (state, action) => ({
    ...state,
    errorMessage: action.payload.errorMessage,
  }),
  [actions.reworkIdea]: (state, action) => ({
    ...state,
    loading: loadingStatus.LOADING,
  }),
  [actions.reworkIdeaSuccess]: (state, action) => ({
    // @TODO belongs_to_user data should be remove from server.
    ...state,
    loading: loadingStatus.LOADING,
    data: [
      ...state.data.filter(comment =>
        comment &&
        comment.idea_id &&
        (comment.idea_id === action.payload.comment.idea_id)
      ),
      action.payload.comment,
    ],
  }),
  [actions.reworkIdeaFailed]: (state, action) => ({
    ...state,
    errorMessage: action.payload.errorMessage,
  }),
}, INIT_STATE)

export default ideaCommentReducer

/**
 * @param {Object} state
 * @param {String} ideaId
 * @returns {Object}
 */
export const getCommentByIdeaId = (state, ideaId) => (
  state.ideaComment.data.find(comment => (comment && comment.idea_id) === ideaId)
)
