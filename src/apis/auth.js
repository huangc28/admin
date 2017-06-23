import { buildApiUrl } from '../apis/utils'

/**
 * @param {string} phone
 * @param {string} password
 */
export const authorize = (phone, password) => (
  fetch(buildApiUrl('login'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      phone_number: phone,
      password,
    }),
  })
  .then(response => response.json())
)
