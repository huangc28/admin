import { createActions } from 'redux-actions'

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
