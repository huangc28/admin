import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import ControllButtonBar from '../../components/ControllButtonBar'
import { deleteInitFormData } from '../../redux/initFormData'
import { saveIdeaSample } from '../../redux/ideaSamples'
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

  componentWillMount = () => {
    this.props.deleteInitFormData()
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
    const {
      router: {
        goBack,
      },
    } = this.props

    return (
      <div>
        <ControllButtonBar onBack={goBack} />

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
  deleteInitFormData: PropTypes.func,
  params: PropTypes.shape({
    ideaId: PropTypes.string,
  }),
  router: PropTypes.shape({
    goBack: PropTypes.func,
  }),
  saveIdeaSample: PropTypes.func,
}

export default connect(null, {
  deleteInitFormData,
  saveIdeaSample,
})(CreateIdeaSample)
