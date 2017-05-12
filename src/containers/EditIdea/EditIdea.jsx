import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { submit } from 'redux-form/immutable'

import Submitable from '../../components/Submitable'
import { SAVE, SAVE_AND_SUBMIT } from '../../constants/generic'
import {
  editIdea,
  saveAndSubmitIdea,
} from '../../actions/ideas'
import IdeaFrom from '../../components/forms/IdeaForm'

/**
 * - get id from url query.
 * - retrieve idea from given id.
 * - pass in idea as form data into idea form.
 */
class EditIdea extends Component {
  constructor () {
    super()

    this.state = {
      submitType: SAVE,
    }
  }

  componentDidMount = () => {
    console.log('TRIGGERED EDITIDEA')
  }

  onSubmit = value => {
    const {
      submitType,
    } = this.state

    const {
      editIdea,
      saveAndSubmitIdea,
    } = this.props

    if (submitType === SAVE) {
      editIdea(value)

      return
    }

    saveAndSubmitIdea(value)
  }

  onEdit = () => {
    this.setState({ submitType: SAVE })
  }

  onSaveAndSubmit = () => {
    this.setState({ submitType: SAVE_AND_SUBMIT })
  }

  render () {
    const { ideaId } = this.props.params

    return (
      <div>
        <IdeaFrom
          onSubmitCallback={this.onSubmit}
          refId={parseInt(ideaId, 10)}
        />

        <Submitable
          formName="ideaForm"
          showEditButton
          showSaveAndSubmitButton
          onEdit={this.onEdit}
          onSaveAndSubmit={this.onSaveAndSubmit}
        />
      </div>
    )
  }
}

EditIdea.propTypes = {
  editIdea: PropTypes.func,
  ideaId: PropTypes.number,
  params: PropTypes.shape({
    ideaId: PropTypes.string,
  }),
  saveAndSubmitIdea: PropTypes.func,
  submit: PropTypes.func,
}

export default connect(null, {
  editIdea,
  saveAndSubmitIdea,
  submit,
})(EditIdea)
