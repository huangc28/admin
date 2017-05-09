/* eslint-disable */
import { buildApiUrl } from './erp'

describe('Build api function', () => {
  test('building backend api with no query', () => {
    const apiUrl = buildApiUrl('ideas')

    const expectedUrl = 'http://localhost:3001/api/v1/ideas'

    expect(apiUrl)
      .toEqual(expectedUrl)
  })

  test('build backend api with query', () => {
    const apiUrl = buildApiUrl('ideas', {
      status: 1,
      searchText: '',
      offset: 15,
      limit: 10,
    })

    const expectedUrl = 'http://localhost:3001/api/v1/ideas?status=1&searchText=&offset=15&limit=10'

    expect(apiUrl)
      .toEqual(expectedUrl)
  })
})