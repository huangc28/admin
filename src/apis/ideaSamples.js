import { buildApiUrl, fetchApi } from './utils'

export const fetchSamples = ideaId => (
  fetchApi(buildApiUrl(`ideas/${ideaId}/ideaSamples`))
  .then(res => res.json())
)
