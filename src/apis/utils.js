import fetch from 'isomorphic-fetch'
import url from 'url'

import config from '../config'
import { getAccessToken } from '../reducers/auth'

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
    'Content-Type': 'application/json',
    'Access-Token': accessToken,
  }

  return fetch(path, {
    method,
    headers: fetchHeaders,
    ...options,
  })
}
