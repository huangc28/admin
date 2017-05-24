import fetch from 'isomorphic-fetch'
import url from 'url'

import config from '../config'
import env from '../../env'
import { getAccessToken } from '../reducers/auth'
import { accessTokenUnauthorized } from '../actions/auth'

const { CLIENT_API_HOST } = env()

/**
 * @param {string} apiUrl
 * @param {object} queries
 */
export const buildApiUrl = (apiPath, queries = {}) => {
  const apiUrl = url.parse(`${CLIENT_API_HOST}/${apiPath}`)

  // get pre-existed query
  const query = apiUrl.query || {}

  // merge queries
  Object.assign(query, queries)

  // if query object is not empty, assign query
  if (Object.keys(query).length) apiUrl.query = query

  return apiUrl.format()
}

/**
 * An unified channel for api requesting.
 *
 * fetchApi('/api', UPDATE, {})
 *
 *
 * @param {String} path
 * @param {String} method
 * @param {Object} headers
 * @param {Object} options
 */
export const fetchApi = (path, method = 'GET', headers = {}, options = {}) => {
  // retrieve access-token from store.
  const accessToken = getAccessToken(config.store.getState())

  // assign headers
  const fetchHeaders = {
    ...headers,
    'Access-Token': accessToken,
  }

  return fetch(path, {
    method,
    headers: fetchHeaders,
    ...options,
  })
  .then(res => res.json())
  .then(res => {
    // if by any chance the access token expired
    // log current user out.
    if (res.status === 401) {
      config.store.dispatch(accessTokenUnauthorized('access token unauthorized'))

      throw new Error('access token unauthorized')
    }

    const parsedRes = {
      json: () => res,
    }

    return new Promise(resolve => resolve(parsedRes))
  })
}
