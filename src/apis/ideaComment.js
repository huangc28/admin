import { buildApiUrl, fetchApi } from './utils'

export const fetchIdeaComment = ideaId => (
  fetchApi(buildApiUrl(`ideas/${ideaId}/ideaComments`))
  .then(res => res.json())
)

/**
 * @param {string} id
 * @param {string} comments
 */
export const reworkIdea = (id, comments) => (
  fetchApi(buildApiUrl('ideaComments'), 'POST', {
    'Content-Type': 'application/json',
  }, {
    body: JSON.stringify({
      idea_id: id,
      content: comments,
    }),
  })
  .then(res => res.json())
)