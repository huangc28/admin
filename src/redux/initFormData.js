import camelize from 'underscore.string/camelize'
import {
  createActions,
  handleActions,
} from 'redux-actions'

export const STORE_INIT_FORM_DATA = 'STORE_INIT_FORM_DATA'
export const EDIT_INIT_FORM_DATA = 'EDIT_INIT_FORM_DATA'
export const DELETE_INIT_FORM_DATA = 'DELETE_INIT_FORM_DATA'

export const {
  storeInitFormData,
  editInitFormData,
  deleteInitFormData,
} = createActions({
  [STORE_INIT_FORM_DATA]: formData => ({
    formData,
  }),
  [EDIT_INIT_FORM_DATA]: (attribute, value) => ({
    attribute,
    value,
  }),
}, DELETE_INIT_FORM_DATA)

/**
 * @param {object} formData
 * @return {object} normalizedFormData
 */
export const normalizeFormFieldName = formData => {
  const normalizedFormData = {}

  if (formData) {
    // transform snake_case to camelCase
    Object.keys(formData).forEach(fieldName => {
      const normalizedFieldName = camelize(fieldName)

      normalizedFormData[normalizedFieldName] = formData[fieldName]
    })
  }

  return normalizedFormData
}

const INIT_STATE = {
  formData: {},
}

const reducer = handleActions({
  [storeInitFormData]: (state, action) => ({
    ...state,
    formData: normalizeFormFieldName(action.payload.formData),
  }),
  [deleteInitFormData]: (state, action) => ({
    ...state,
    formData: {},
  }),
}, INIT_STATE)

export default reducer
