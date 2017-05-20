/* eslint-disable */
import * as actions from './ideaSamples'

describe('idea samples actions', () => {
  test('delete idea sample failed actions', () => {
    const errorMessage = 'delete idea failed'

    expect(actions.deleteIdeaSampleFailed('delete idea failed'))
      .toEqual({
        type: actions.deleteIdeaSampleFailed().type,
        payload: {
          errorMessage,
        },
      })
  })
})