import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import ControllButtonBar from '../../components/ControllButtonBar'
import { deleteInitFormData } from '../../redux/initFormData'
import { saveIdeaSample } from '../../redux/ideaSamples'
import IdeaSampleForm from '../../components/forms/IdeaSampleForm'
import Submitable from '../../components/Submitable'

class CreateIdeaSample extends Component {
  componentWillMount = () => {
    this.props.deleteInitFormData()
  }

  onSubmit = value => {
    const {
      saveIdeaSample,
      params: {
        ideaId,
      },
      image,
    } = this.props

    saveIdeaSample(
      Object.assign(value, {
        ideaId,
        image,
      })
    )
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
          showSaveButton
          showResetButton
        />
      </div>
    )
  }
}

CreateIdeaSample.propTypes = {
  deleteInitFormData: PropTypes.func,
  image: PropTypes.string,
  params: PropTypes.shape({
    ideaId: PropTypes.string,
  }),
  router: PropTypes.shape({
    goBack: PropTypes.func,
  }),
  saveIdeaSample: PropTypes.func,
}

const mapStateToProps = state => ({
  image: state.photo.image,
})

export default connect(mapStateToProps, {
  deleteInitFormData,
  saveIdeaSample,
})(CreateIdeaSample)
