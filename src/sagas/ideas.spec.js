/* eslint-disable */
import { select, put, call } from 'redux-saga/effects'
import fs from 'fs'
import path from 'path'

import * as sagas from './ideas'
import { getAllIdeas } from '../reducers/ideas'
import * as actions from '../actions/ideas'
import * as APIS from '../apis/ideas'
import { storeInitFormData } from '../actions/initFormData'

const mockedDB = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../faker', 'db.json'), 'utf-8'))

describe('loading specified idea to initialize form', () => {
  test('successfully load idea', () => {
    const action = {
      type: actions.LOAD_IDEA,
      payload: {
        id: 1
      }
    }

    const gen = sagas.watchLoadIdeaFlow(action)

    expect(gen.next().value)
      .toEqual(select(getAllIdeas))

    // data found
    const dataFound = mockedDB.ideas.data[0]

    expect(gen.next(mockedDB.ideas.data).value)
      .toEqual(put(storeInitFormData(dataFound)))
  })

  test('specified data not found, fetch from server', () => {
    const action = {
      type: actions.LOAD_IDEA,
      payload: {
        id: 1
      }
    }

    const gen = sagas.watchLoadIdeaFlow(action)

    expect(gen.next().value)
      .toEqual(select(getAllIdeas))

    expect(gen.next([]).value)
      .toEqual(put(actions.getIdea(action.payload.id)))
  })
})

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

