import { buildApiUrl, fetchApi } from './utils'

export const getIdeas = ({
  status,
  searchText,
  page,
  perpage,
}) => (
  fetchApi(buildApiUrl('ideas', {
    status,
    searchText,
    page,
    perpage,
  }), 'GET', {
    credentials: 'same-origin',
  })
  .then(res => res.json())
)

export const getIdea = id => (
  fetchApi(buildApiUrl(`ideas/${id}`), 'GET', {
    credentials: 'same-origin',
  })
  .then(res => res.json())
)

export const deleteIdea = id => (
  fetchApi(buildApiUrl(`/ideas/${id}`), 'DELETE', {
    'Content-Type': 'application/json',
  })
  .then(res => res.json())
)

/**
 * @param {object} formData
 * @returns {object}
 */
export const saveIdea = formData => (
  fetchApi(buildApiUrl('ideas'), 'POST', {
    'Content-Type': 'application/json',
  }, {
    body: JSON.stringify(formData),
  })
  .then(res => res.json())
)

/**
 * @param {object} formData
 * @returns {object}
 */
export const editIdea = formData => (
  fetchApi(buildApiUrl(`ideas/${formData.id}`), 'PUT', {
    'Content-Type': 'application/json',
  }, {
    body: JSON.stringify(formData),
  })
  .then(res => res.json())
)

/**
 * @param {String} ideaId
 * @param {Promise}
 */
export const rejectIdea = ideaId => (
  fetchApi(buildApiUrl(`/ideaComments/${ideaId}`), 'DELETE', {
    'Content-Type': 'application/json',
  })
  .then(res => res.json())
)

