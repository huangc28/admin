import fetch from 'isomorphic-fetch'
import url from 'url'

// @TODO extract it to environment configuration file
const BASE_URL = 'http://localhost:3005/api'

/**
 * @param {string} apiUrl
 * @param {object} queries
 */
export const buildApiUrl = (apiPath, queries = {}) => {
  const apiUrl = url.parse(`${BASE_URL}/${apiPath}`)

  // get pre-existed query
  const query = apiUrl.query || {}

  // merge queries
  Object.assign(query, queries)

  // if query object is not empty, assign query
  if (Object.keys(query).length) apiUrl.query = query

  return apiUrl.format()
}

export const getIdeas = ({
  status,
  searchText,
  offset,
  limit,
}) => (
  fetch(buildApiUrl('ideas', {
    status,
    searchText,
    offset,
    limit,
  }), {
    method: 'GET',
    headers: {
      credentials: 'same-origin',
      'Content-Type': 'application/json',
    },
  })
  .then(res => res.json())
)

export const getIdea = id => (
  fetch(buildApiUrl(`ideas/${id}`), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(res => res.json())
)

export const deleteIdea = id => (
  fetch(buildApiUrl(`/ideas/${id}`), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(res => res.json())
)

/**
 * @param {object} formData
 * @returns {object}
 */
export const saveIdea = formData => (
  fetch(buildApiUrl('ideas'), {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(res => res.json())
)

/**
 * @param {object} formData
 * @returns {object}
 */
export const editIdea = formData => (
  fetch(buildApiUrl(`ideas/${formData.id}`), {
    method: 'PUT',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(res => res.json())
)
