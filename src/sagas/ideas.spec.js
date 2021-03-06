/* eslint-disable */
import { select, put, call } from 'redux-saga/effects'
import fs from 'fs'
import path from 'path'

import * as sagas from './ideas'
import { getAllIdeas } from '../reducers/ideas'
import * as actions from '../actions/ideas'
import * as APIS from '../apis/ideas'
import { storeInitFormData } from '../redux/initFormData'

const mockedDB = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../faker', 'db.json'), 'utf-8'))

describe("delete idea flow", () => {
  test("delete idea success", () => {
    const action = {
      type: actions.DELETE_IDEA,
      payload: {
        id: 1
      }
    }

    const expectedResponse = {
      status: 200,
    }

    const gen = sagas.watchDeleteIdeaFlow(action)

    expect(gen.next().value)
      .toEqual(call(APIS.deleteIdea, action.payload.id))

    expect(gen.next(expectedResponse).value)
      .toEqual(put(actions.deleteIdeaSuccess(action.payload.id)))
  })

  test("delete idea failed", () => {
    const action = {
      type: actions.DELETE_IDEA,
      payload: {
        id: 1
      }
    }

    const expectedResponse = {
      status: 500,
      error: {
        message: 'failed to delete idea'
      },
    }

    const gen = sagas.watchDeleteIdeaFlow(action)

    expect(gen.next().value)
      .toEqual(call(APIS.deleteIdea, action.payload.id))

    expect(gen.next(expectedResponse).value)
      .toEqual(put(actions.deleteIdeaFailed(expectedResponse.error.message)))
  })
})

describe("save idea flow", () => {
  test("save idea success", () => {
    const mockedFormData = mockedDB.ideas.data[0]

    const action = {
      type: actions.SAVE_IDEA,
      payload: {
        formData: mockedFormData
      }
    }

    const expectedResponse = {
      status: 200,
      data: mockedFormData,
    }

    const gen = sagas.watchSaveIdeaFlow(action)

    expect(gen.next().value)
      .toEqual(call(APIS.saveIdea, action.payload.formData))

    expect(gen.next(expectedResponse).value)
      .toEqual(put(actions.saveIdeaSuccess(expectedResponse.data)))
  })
})

