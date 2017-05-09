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
      ideaId,
      deleteIdea,
    } = this.props

    return (
      <div>
        <IdeaForm
          onSubmitCallback={this.onSubmit}
          refId={ideaId}
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
  ideaId: PropTypes.number,
}

const mapStateToProps = (state, ownProps) => ({
  ideaId: parseInt(ownProps.params.id, 10),
})

export default connect(mapStateToProps, {
  deleteIdea,
})(Idea)
