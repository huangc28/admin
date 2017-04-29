import express from 'express'
import fetch from 'isomorphic-fetch'

const router = express.Router()

/**
 * @param {number} code
 * @param {string} message
 */
const errorObjFormatter = (code, message) => ({
  code,
  message,
})

// @TODO this is the base URL of ERP for testing purposes
const ERP_BASE_URL = 'http://localhost:3002'

router.post('/ideas', (req, res, next) => {
  fetch(`${ERP_BASE_URL}/ideas`)
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