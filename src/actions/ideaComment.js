import { createActions } from 'redux-actions'

export const {
  fetchIdeaComment,
  fetchIdeaCommentSuccess,
  fetchIdeaCommentFailed,
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
})
