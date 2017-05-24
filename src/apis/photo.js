import { buildApiUrl, fetchApi } from './utils'

/**
 * @param {File} file
 * @returns {Promise}
 */
export const uploadPhoto = formData => (
  fetchApi(buildApiUrl('galleries/upload'), 'POST', {}, {
    body: formData,
  })
  .then(res => res.json())
)
