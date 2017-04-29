import fetch from 'isomorphic-fetch'

const BASE_URL = 'http://localhost:3005/api'

export const getIdeas = () => (
  fetch(`${BASE_URL}/ideas`, {
    method: 'POST',
  })
  .then(res => res.json())
)
