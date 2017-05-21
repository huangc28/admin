import camelize from 'underscore.string/camelize'

import * as ACTIONS from '../actions/initFormData'

const INIT_STATE = {
  formData: {},
}

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

export default function initFormData (state = INIT_STATE, action) {
  switch (action.type) {
    case ACTIONS.STORE_INIT_FORM_DATA: {
      // before we can use this data, we should normalize the field name.
      return {
        ...state,
        formData: normalizeFormFieldName(action.payload.formData),
      }
    }
    case ACTIONS.DELETE_INIT_FORM_DATA: {
      return {
        ...state,
        formData: {},
      }
    }
    default:
      return state
  }
}