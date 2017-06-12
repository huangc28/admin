import { fetchApi, buildApiUrl } from './utils'

export const searchSuppliers = value => (
  fetchApi(buildApiUrl('suppliers/search'), 'POST', {
    'Content-Type': 'application/json',
  }, {
    body: JSON.stringify({
      searchtext: value,
    }),
  })
  .then(res => res.json())
)