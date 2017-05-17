import { createActions } from 'redux-actions'

export const {
  getIdeas,
  getIdeasSuccess,
  getIdeasFailed,
  getIdea,
  getIdeaSuccess,
  saveIdea,
  saveIdeaSuccess,
  saveIdeaFailed,
  editIdea,
  editIdeaSuccess,
  editIdeaFailed,
  saveAndSubmitIdea,
  saveAndSubmitIdeaSuccess,
  saveAndSubmitIdeaFailed,
  deleteIdea,
  deleteIdeaSuccess,
  deleteIdeaFailed,
  rejectIdea,
  approveIdea,
} = createActions({
  GET_IDEAS: (
    status = '', // default to retrieve all
    searchText = '',
    offset = '',
    limit = '',
  ) => ({
    status,
    searchText,
    offset,
    limit,
  }),
  GET_IDEAS_SUCCESS: ideas => ({ ideas }),
  GET_IDEAS_FAILED: errorMessage => ({ errorMessage }),
  GET_IDEA: id => ({ id }),
  GET_IDEA_SUCCESS: idea => ({ idea }),
  GET_IDEA_FAILED: errorMessage => ({ errorMessage }),
  SAVE_IDEA: formData => ({ formData }),
  SAVE_IDEA_SUCCESS: formData => ({ formData }),
  SAVE_IDEA_FAILED: errorMessage => ({ errorMessage }),
  EDIT_IDEA: formData => ({ formData }),
  EDIT_IDEA_SUCCESS: formData => ({ formData }),
  EDIT_IDEA_FAILED: errorMessage => ({ errorMessage }),
  SAVE_AND_SUBMIT_IDEA: formData => ({ formData }),
  SAVE_AND_SUBMIT_IDEA_SUCCESS: formData => ({ formData }),
  SAVE_AND_SUBMIT_IDEA_FAILED: errorMessage => ({ errorMessage }),
  DELETE_IDEA: id => ({ id }),
  DELETE_IDEA_SUCCESS: id => ({ id }),
  DELETE_IDEA_FAILED: errorMessage => ({ errorMessage }),
  REJECT_IDEA: ideaId => ({ ideaId }),
  APPROVE_IDEA: ideaId => ({ ideaId }),
})
