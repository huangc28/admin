import fetch from 'isomorphic-fetch'

// @TODO extract it to environment configuration file
const BASE_URL = 'http://localhost:3005/api'

export const getIdeas = ({
  status,
  searchText,
  offset,
  limit,
}) => (
  fetch(`${BASE_URL}/ideas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      status,
      searchText,
      offset,
      limit,
    }),
  })
  .then(res => res.json())
)

export const getIdea = id => (
  fetch(`${BASE_URL}/idea`, {
    method: 'POST',
    body: JSON.stringify({
      id,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(res => res.json())
)

export const deleteIdea = id => (
  fetch(`${BASE_URL}/idea/destroy`, {
    method: 'POST',
    body: JSON.stringify({
      id,
    }),
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
  fetch(`${BASE_URL}/idea/save`, {
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
  fetch(`${BASE_URL}/idea/edit`, {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(res => res.json())
)