/* eslint-disable */
import fs from 'fs'
import path from 'path'

import initFormData, { normalizeFormFieldName } from './initFormData'
import * as actions from '../actions/initFormData'

const mockedDB = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../faker', 'db.json'), 'utf-8'))

describe('reinitialising form data', () => {
  test('store form data for initialising form', () => {

    // found data[0]
    const action = {
      type: actions.LOAD_IDEA,
      payload: {
        formData: mockedDB.ideas.data[0]
      }
    }

    const result = initFormData({}, action)
    const expectedResult = normalizeFormFieldName(mockedDB.ideas.data[0])

    expect(result.formData).toEqual(expectedResult)

  })
})