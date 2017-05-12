/* eslint-disable */
import { login, logout } from './auth'

describe('Auth actions', () => {
  test('Login action', () => {
    const expectedAction = {
        type: 'LOGIN',
        payload: {
          email: 'test@gmail.com',
          password: 'password',
        },
      }

    expect(login('test@gmail.com', 'password'))
      .toEqual(expectedAction)
  })

  test('logout action', () => {
    const expectedAction = {
      type: 'LOGOUT',
    }

    expect(logout())
      .toEqual(expectedAction)
  })
})