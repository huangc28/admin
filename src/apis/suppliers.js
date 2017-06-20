import { fetchApi, buildApiUrl } from './utils'

export const createSupplier = value => (
  fetchApi(buildApiUrl('suppliers'), 'POST', {
    'Content-Type': 'application/json',
  }, {
    body: JSON.stringify(value),
  })
  .then(res => res.json())
)

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