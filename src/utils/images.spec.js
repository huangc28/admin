/* eslint-disable */
import { addLargeImageSuffix } from './images'

describe('image url generator util functions', () => {
  test('add scale suffix for large image', () => {
    const name = 'test.png'

    const result = addLargeImageSuffix(name)

    expect(result).toBe('test_360_360.png')
  })
})