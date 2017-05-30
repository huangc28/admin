import {
    createActions,
    handleActions,
} from 'redux-actions'

import * as loadingStatus from '../constants/loadingState'

export const {
  fetchIdeaComment,
  fetchIdeaCommentSuccess,
  fetchIdeaCommentFailed,
  reworkIdea,
  reworkIdeaSuccess,
  reworkIdeaFailed,
} = createActions({
  FETCH_IDEA_COMMENT: ideaId => ({
    ideaId,
  }),
  FETCH_IDEA_COMMENT_SUCCESS: (ideaId, comment) => ({
    ideaId,
    comment,
  }),
  FETCH_IDEA_COMMENT_FAILED: errorMessage => ({
    errorMessage,
  }),
  REWORK_IDEA: (id, content) => ({
    id,
    content,
  }),
  REWORK_IDEA_SUCCESS: comment => ({
    comment,
  }),
  REWORK_IDEA_FAILED: errorMessage => ({
    errorMessage,
  }),
})

/**
 * Reducers
 */
const INIT_STATE = {
  errorMessage: null,
  loading: loadingStatus.EMPTY,
  data: [],
}

const ideaCommentReducer = handleActions({
  [fetchIdeaComment]: (state, action) => ({
    ...state,
    loading: loadingStatus.LOADING,
  }),
  [fetchIdeaCommentSuccess]: (state, action) => ({
    ...state,
    data: [
      ...state.data.filter(comment =>
        comment &&
        comment.idea_id &&
        action.payload.comment &&
        action.payload.comment.idea_id &&
        (comment.idea_id === action.payload.comment.idea_id)
      ),
      action.payload.comment,
    ],
  }),
  [fetchIdeaCommentFailed]: (state, action) => ({
    ...state,
    errorMessage: action.payload.errorMessage,
  }),
  [reworkIdea]: (state, action) => ({
    ...state,
    loading: loadingStatus.LOADING,
  }),
  [reworkIdeaSuccess]: (state, action) => ({
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
  [reworkIdeaFailed]: (state, action) => ({
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
