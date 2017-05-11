import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Submitable from '../../components/Submitable'

import { deleteIdea } from '../../actions/ideas'
import IdeaForm from '../../components/forms/IdeaForm'

class Idea extends Component {

  onSubmit = values => { console.log('value', values) }

  render () {
    const {
      params: {
        ideaId,
      } = {},
      deleteIdea,
    } = this.props

    return (
      <div>
        <IdeaForm
          onSubmitCallback={this.onSubmit}
          refId={parseInt(ideaId, 10)}
          disabled
        />

        <Submitable
          formName="ideaForm"
          showEditButton
          showDeleteButton
          onEdit={() => browserHistory.push(`/erp/procurement/ideas/${ideaId}/edit`)}
          onDelete={() => deleteIdea(ideaId)}
        />
      </div>
    )
  }
}

Idea.propTypes = {
  deleteIdea: PropTypes.func,
  params: PropTypes.shape({
    ideaId: PropTypes.string,
  }),
}

export default connect(null, {
  deleteIdea,
})(Idea)
