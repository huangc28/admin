import { buildApiUrl, fetchApi } from './utils'

export const fetchSamples = ideaId => (
  fetchApi(buildApiUrl(`ideas/${ideaId}/ideaSamples`))
  .then(res => res.json())
)

export const editSample = ideaSample => (
  fetchApi(buildApiUrl(
    `/ideaSamples/${ideaSample.id}`), 'PUT', {},
    {
      body: JSON.stringify(ideaSample),
    }
  )
  .then(res => res.json())
)

export const saveIdeaSample = ideaSample => (
  fetchApi(buildApiUrl('ideaSamples'), 'POST', {},
    {
      body: JSON.stringify(ideaSample),
    }
  )
  .then(res => res.json())
)