import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {
  fetchSample,
  editIdeaSample,
} from '../../redux/ideaSamples'
import ControllButtonBar from '../../components/ControllButtonBar'
import IdeaSampleForm from '../../components/forms/IdeaSampleForm'
import Submitable from '../../components/Submitable/Submitable'

class EditIdeaSample extends Component {
  onSubmit = value => {
    const {
      editIdeaSample,
      image,
    } = this.props

    editIdeaSample({
      ...value,
      image,
    })
  }

  onMount = () => {
    const {
      params: {
        sampleId,
      },
      fetchSample,
    } = this.props

    fetchSample(sampleId)
  }

  render () {
    const {
      router: {
        goBack,
      },
    } = this.props

    return (
      <div>
        <ControllButtonBar
          onBack={() => goBack()}
        />

        <IdeaSampleForm
          onSubmitCallback={this.onSubmit}
          onMount={this.onMount}
        />

        <Submitable
          formName="ideaSampleForm"
          showEditButton
        />
      </div>
    )
  }
}

EditIdeaSample.propTypes = {
  editIdeaSample: PropTypes.func,
  fetchSample: PropTypes.func,
  image: PropTypes.string,
  params: PropTypes.shape({
    sampleId: PropTypes.string,
  }),
  router: PropTypes.shape({
    goBack: PropTypes.func,
  }),
}

const mapStateToProps = state => ({
  image: state.photo.image,
})

export default connect(mapStateToProps, {
  fetchSample,
  editIdeaSample,
})(EditIdeaSample)
