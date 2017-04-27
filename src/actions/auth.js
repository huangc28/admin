const LOGIN = 'LOGIN'

/**
 * @param {string} email
 * @param {string} password
 */
export const login = (email, password) => ({
  type: LOGIN,
  payload: {
    email,
    password,
  },
})