import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { submit, reset } from 'redux-form/immutable'

import IdeaForm from '../../components/forms/IdeaForm'
import { SAVE, SAVE_AND_SUBMIT } from '../../constants/generic'
import {
  SORT_BY_NEW,
  SORT_BY_PENDING,
} from '../../constants/ideas'
import Submitable from '../../components/Submitable'
import {
  saveIdea,
  saveAndSubmitIdea,
} from '../../actions/ideas'

class CreateIdea extends Component {
  constructor () {
    super()

    this.state = {
      submitType: SAVE,
      status: SORT_BY_NEW,
    }
  }

  onSubmit = value => {
    const {
      submitType,
    } = this.state

    const {
      saveIdea,
      saveAndSubmitIdea,
    } = this.props

    if (submitType === SAVE) {
      saveIdea(value)

      return
    }

    saveAndSubmitIdea(value)
  }

  onSave = () => {
    this.setState({
      submitType: SAVE,
      status: SORT_BY_NEW,
    })
  }

  onSaveAndSubmit = () => {
    this.setState({
      submitType: SAVE_AND_SUBMIT,
      status: SORT_BY_PENDING,
    })
  }

  render () {
    const { status } = this.state

    return (
      <div>
        <IdeaForm
          onSubmitCallback={this.onSubmit}
          status={status}
        />
        <Submitable
          formName="ideaForm"
          onSave={this.onSave}
          onSaveAndSubmit={this.onSaveAndSubmit}
          showSaveButton
          showSaveAndSubmitButton
          showResetButton
        />
      </div>
    )
  }
}

CreateIdea.propTypes = {
  reset: PropTypes.func,
  saveAndSubmitIdea: PropTypes.func,
  saveIdea: PropTypes.func,
  submit: PropTypes.func,
}

export default connect(null, {
  saveIdea,
  saveAndSubmitIdea,
  submit,
  reset,
})(CreateIdea)
