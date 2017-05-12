import { buildApiUrl, fetchApi } from './utils'

export const getIdeas = ({
  status,
  searchText,
  offset,
  limit,
}) => (
  fetchApi(buildApiUrl('ideas', {
    status,
    searchText,
    offset,
    limit,
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
  fetchApi(buildApiUrl(`/ideas/${id}`), 'DELETE')
  .then(res => res.json())
)

/**
 * @param {object} formData
 * @returns {object}
 */
export const saveIdea = formData => (
  fetchApi(buildApiUrl('ideas'), 'POST', {}, {
    body: JSON.stringify(formData),
  })
  .then(res => res.json())
)

/**
 * @param {object} formData
 * @returns {object}
 */
export const editIdea = formData => (
  fetchApi(buildApiUrl(`ideas/${formData.id}`), 'PUT', {}, {
    body: JSON.stringify(formData),
  })
  .then(res => res.json())
)
