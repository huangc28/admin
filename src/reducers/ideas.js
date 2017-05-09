import * as loadingStatus from '../constants/loadingState'
import * as actionTypes from '../actions/ideas'

const INIT_STATE = {
  status: null,
  data: [],
  errorMessage: null,
  loading: loadingStatus.EMPTY,
}

export default function ideasReducer (state = INIT_STATE, action) {
  switch (action.type) {
    case actionTypes.GET_IDEAS:
      return {
        ...state,
        loading: loadingStatus.LOADING,
      }
    case actionTypes.GET_IDEAS_SUCCESS:
      return {
        ...state,
        data: action.payload.ideas,
        loading: loadingStatus.READY,
      }
    case actionTypes.GET_IDEAS_FAILED:
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
      }
    case actionTypes.DELETE_IDEA_SUCCESS:
      // remove the idea that matches the specified id.
      return {
        ...state,
        data: state.data.filter(idea => idea.id !== action.payload.id),
      }
    case actionTypes.DELETE_IDEA_FAILED:
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
      }
    case actionTypes.SAVE_IDEA_SUCCESS:
      return {
        ...state,
        data: state.data.unshift(action.payload.formData),
      }
    case actionTypes.EDIT_IDEA_SUCCESS:
      return {
        ...state,
        loading: loadingStatus.LOADING,
        // find data that matches the id and replace the data object
        data: state.data.map(formData => {
          if (formData.id === action.payload.formData.id) {
            return action.payload.formdata
          }

          return formData
        }),
      }
    case actionTypes.EDIT_IDEA_FAILED:
      return {
        ...state,
        loading: loadingStatus.ERROR,
        errorMessage: action.payload.errorMessage,
      }
    case actionTypes.GET_IDEA_FAILED:
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
      }
    case actionTypes.GET_IDEA_SUCCESS:
      return {
        ...state,
        data: state.data
          .filter(idea => idea.id === action.payload.idea.id)
          .push(action.payload.idea),
      }
    default:
      return state
  }
}

/**
 * Get all ideas
 *
 * @param {object} state
 */
export const getAllIdeas = state => state.ideas.data

/**
 * @param {object} state
 * @param {number} id
 * @returns {object}
 */
export const ideaSelector = (state, id) => (
  (
    state.ideas.data &&
    state.ideas.data.find(idea => idea.id && idea.id === id)
  ) || null
)
