import { buildApiUrl, fetchApi } from './utils'

export const fetchIdeaComment = ideaId => (
  fetchApi(buildApiUrl(`/ideas/${ideaId}/ideaComments`))
  .then(res => res.json())
)
