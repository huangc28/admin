/**
 * POST data format: x-www-form-urlencoded
 */

import express from 'express'
import fetch from 'isomorphic-fetch'
import url from 'url'

const router = express.Router()

/**
 * @param {number} code
 * @param {string} message
 */
const errorObjFormatter = (code, message) => ({
  code,
  error: {
    message,
  },
})

// @TODO this is the base URL of ERP for testing purposes
const ERP_BASE_URL = 'http://localhost:3001/api/v1'

/**
 * @param {string} apiUrl
 * @param {object} queries
 */
export const buildApiUrl = (apiPath, queries) => {
  const apiUrl = url.parse(`${ERP_BASE_URL}/${apiPath}`)

  // get pre-existed query
  const query = apiUrl.query

  // merge queries
  Object.assign(query, queries)

  // if query object is not empty, assign query
  if (Object.keys(query).length) apiUrl.query = query

  return apiUrl.format()
}

router.post('/ideas', (req, res, next) => {
  const {
    status,
    searchText,
    offset,
    limit,
  } = req.body

  fetch(`${ERP_BASE_URL}/ideas?status=${status}&searchText=${searchText}&offset=${offset}&limit=${limit}`) // eslint-disable-line max-len
    .then(res => res.json())
    .then(
      response => {
        res.send(response)
      }
    )
    .catch(next)
})

router.post('/idea', (req, res, next) => {
  const { id } = req.body

  if (!id) {
    res.send(errorObjFormatter(400, 'idea id is not specified'))
  }

  // // @TODO here we use fake api from json-server
  fetch(`${ERP_BASE_URL}/ideas/${id}`)
    .then(res => res.json())
    .then(
      response => {
        res.send(response)
      }
    )
    .catch(next)
})

/**
 * Save ideas.
 */
router.post('/idea/save', (req, res, next) => {
  const { body: formData } = req

  if (!formData) {
    res.send(errorObjFormatter(400, 'form data is not provided'))
  }

  fetch(`${ERP_BASE_URL}/ideas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
  .then(res => res.json())
  .then(
    response => {
      res.send(response)
    }
  )
  .catch(next)
})

/**
 * @TODO backend api hasn't setup yet.
 *
 * submit implies create and save.
 */
router.post('/idea/submit', (req, res, next) => {
  const { body: formData } = req

  if (!formData) {
    res.send(errorObjFormatter(400, 'form data is not provided'))
  }

  fetch(`${ERP_BASE_URL}/idea/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
  .then(res => res.json())
  .then(
    response => {
      res.send(response)
    }
  )
  .catch(next)
})

/**
 * @TODO backend api hasn't setup yet.
 *
 * submit implies create and save.
 */
router.post('/idea/edit', (req, res, next) => {
  const { body: formData } = req

  if (!formData) {
    res.send(errorObjFormatter(400, 'form data is not provided'))
  }

  fetch(`${ERP_BASE_URL}/ideas/${formData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
  .then(res => res.json())
  .then(
    response => {
      res.send(response)
    }
  )
  .catch(next)
})

/**
 * Delete idea.
 */
router.post('/idea/destroy', (req, res, next) => {
  const { id } = req.body

  if (!id) {
    res.send(errorObjFormatter(400, 'id is not specified'))
  }

  fetch(`${ERP_BASE_URL}/ideas/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(res => res.json())
  .then(
    response => {
      res.send(response)
    }
  )
  .catch(next)
})

router.use((err, req, res, next) => {
  res.send(err)
})

export default router