import { fetchApi, buildApiUrl } from '../apis/utils'

export const searchUsers = searchText => (
  fetchApi(buildApiUrl('users/search'), 'POST', {
    'Content-Type': 'application/json',
  }, {
    body: JSON.stringify({
      searchtext: searchText,
    }),
  })
  .then(res => res.json())
)