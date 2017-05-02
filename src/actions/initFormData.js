/**
 * Loading exisiting data and use it to reinitialise redux-form
 */

export const STORE_INIT_FORM_DATA = 'STORE_INIT_FORM_DATA'

/**
 * @param {object} formData
 * @returns {object}
 */
export const storeInitFormData = formData => ({
  type: STORE_INIT_FORM_DATA,
  payload: {
    formData,
  },
})
