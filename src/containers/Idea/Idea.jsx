import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Submitable from '../../components/Submitable'

import {
  deleteIdea,
  getIdea,
} from '../../actions/ideas'
import ControllButtonBar from '../../components/ControllButtonBar'
import IdeaForm from '../../components/forms/IdeaForm'

class Idea extends Component {

  onSubmit = values => { console.log('value', values) }

  onMount = () => {
    const {
      getIdea,
      params: {
        ideaId,
      },
    } = this.props

    getIdea(ideaId)
  }

  render () {
    const {
      params: {
        ideaId,
      } = {},
      deleteIdea,
    } = this.props

    return (
      <div>
        <ControllButtonBar
          onBack={() => browserHistory.push('/erp/procurement/ideas')}
        />

        <IdeaForm
          onSubmitCallback={this.onSubmit}
          onMount={this.onMount}
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
  getIdea: PropTypes.func,
  params: PropTypes.shape({
    ideaId: PropTypes.string,
  }),
}

export default connect(null, {
  deleteIdea,
  getIdea,
})(Idea)
