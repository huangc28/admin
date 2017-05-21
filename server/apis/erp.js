/**
 * POST data format: x-www-form-urlencoded
 */

import express from 'express'
import fetch from 'isomorphic-fetch'
import url from 'url'

import env from '../../env'

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

// get ERP_BASE_URL from .env
const { ERP_API_HOST } = env()

/**
 * @param {string} apiUrl
 * @param {object} queries
 */
export const buildApiUrl = (apiPath, queries = {}) => {
  const apiUrl = url.parse(`${ERP_API_HOST}/${apiPath}`)

  // get pre-existed query
  const query = apiUrl.query || {}

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

  fetch(buildApiUrl('ideas', {
    status,
    searchText,
    offset,
    limit,
  })) // eslint-disable-line max-len
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

  // @TODO here we use fake api from json-server
  fetch(buildApiUrl(`ideas/${id}`))
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

  fetch(buildApiUrl('ideas'), {
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

  fetch(buildApiUrl(`ideas/${formData.id}`), {
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

  fetch(buildApiUrl(`ideas/${id}`), {
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