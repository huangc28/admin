import { fetchApi, buildApiUrl } from './utils'

export const createSupply = supply => (
  fetchApi(buildApiUrl('supplies'), 'POST', {
    'Content-Type': 'application/json',
  }, {
    body: JSON.stringify(supply),
  })
  .then(res => res.json())
)

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
