import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { saveIdeaSample } from '../../actions/ideaSamples'
import { SAVE } from '../../constants/generic'
import IdeaSampleForm from '../../components/forms/IdeaSampleForm'
import Submitable from '../../components/Submitable'

class CreateIdeaSample extends Component {
  constructor () {
    super()

    this.state = {
      submitType: null,
    }
  }

  onSubmit = value => {
    const {
      submitType,
    } = this.state

    const {
      saveIdeaSample,
      params: {
        ideaId,
      },
    } = this.props

    if (submitType === SAVE) {
      // merge ideaId into submitting value.
      saveIdeaSample(
        Object.assign(value, { ideaId })
      )
    }
  }

  onSave = () => {
    this.setState({
      submitType: SAVE,
    })
  }

  render () {
    return (
      <div>
        <IdeaSampleForm onSubmitCallback={this.onSubmit} />

        <Submitable
          formName="ideaSampleForm"
          onSave={this.onSave}
          showSaveButton
          showResetButton
        />
      </div>
    )
  }
}

CreateIdeaSample.propTypes = {
  params: PropTypes.shape({
    ideaId: PropTypes.string,
  }),
  saveIdeaSample: PropTypes.func,
}

export default connect(null, {
  saveIdeaSample,
})(CreateIdeaSample)
