import { fetchApi, buildApiUrl } from './utils'

export const searchSupply = (supplierId, searchText) => (
  fetchApi(buildApiUrl('supplies/search'), 'POST', {
    'Content-Type': 'application/json',
  }, {
    body: JSON.stringify({
      supplierid: supplierId,
      searchtext: searchText,
    }),
  })
  .then(res => res.json())
)
