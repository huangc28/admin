import fetch from 'isomorphic-fetch'

// @TODO extract it to environment configuration file
const BASE_URL = 'http://localhost:3005/api'

export const getIdeas = () => (
  fetch(`${BASE_URL}/ideas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
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
