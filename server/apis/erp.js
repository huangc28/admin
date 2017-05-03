import express from 'express'
import fetch from 'isomorphic-fetch'

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
const ERP_BASE_URL_TEST = 'http://localhost:3002'
const ERP_BASE_URL = 'http://localhost:3001'

router.post('/ideas', (req, res, next) => {
  fetch(`${ERP_BASE_URL_TEST}/ideas`)
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
  fetch(`${ERP_BASE_URL_TEST}/idea/${id}`)
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
 */
router.post('/idea/save', (req, res, next) => {
  const { body: formData } = req

  if (!formData) {
    res.send(errorObjFormatter(400, 'form data is not provided'))
  }

  fetch(`${ERP_BASE_URL}/idea`, {
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

router.use((err, req, res, next) => {
  res.send(err)
})

export default router