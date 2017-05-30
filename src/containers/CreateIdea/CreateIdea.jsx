import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { submit, reset } from 'redux-form/immutable'
import { browserHistory } from 'react-router'

import ControllButtonBar from '../../components/ControllButtonBar'
import IdeaForm from '../../components/forms/IdeaForm'
import { deleteInitFormData } from '../../actions/initFormData'
import { SAVE, SAVE_AND_SUBMIT } from '../../constants/generic'
import Submitable from '../../components/Submitable'
import {
  saveIdea,
  saveAndSubmitIdea,
} from '../../redux/ideas'

class CreateIdea extends Component {
  constructor () {
    super()

    this.state = {
      submitType: SAVE,
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
      saveIdea,
      saveAndSubmitIdea,
      image,
    } = this.props

    const composedValue = {
      ...value,
      image,
    }

    if (submitType === SAVE) {
      saveIdea(composedValue)

      return
    }

    saveAndSubmitIdea(composedValue)
  }

  onSave = () => {
    this.setState({
      submitType: SAVE,
    })
  }

  onSaveAndSubmit = () => {
    this.setState({
      submitType: SAVE_AND_SUBMIT,
    })
  }

  render () {
    return (
      <div>
        <ControllButtonBar
          onBack={() => browserHistory.push('/erp/procurement/ideas')}
        />

        <IdeaForm onSubmitCallback={this.onSubmit} />
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
  deleteInitFormData: PropTypes.func,
  image: PropTypes.string,
  reset: PropTypes.func,
  saveAndSubmitIdea: PropTypes.func,
  saveIdea: PropTypes.func,
  submit: PropTypes.func,
}

const mapStateToProps = state => ({
  image: state.photo.image,
})

export default connect(mapStateToProps, {
  deleteInitFormData,
  saveIdea,
  saveAndSubmitIdea,
  submit,
  reset,
})(CreateIdea)
