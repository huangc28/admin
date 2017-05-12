import { buildApiUrl } from '../apis/utils'

/**
 * @param {string} email
 * @param {string} password
 */
export const authorize = (email, password) => (
  fetch(buildApiUrl('login'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
  .then(response => response.json())
)
