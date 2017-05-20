import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {
  fetchSample,
  editIdeaSample,
} from '../../actions/ideaSamples'
import IdeaSampleForm from '../../components/forms/IdeaSampleForm'
import Submitable from '../../components/Submitable/Submitable'

class EditIdeaSample extends Component {
  onSubmit = value => {
    const { editIdeaSample } = this.props

    editIdeaSample(value)
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
    return (
      <div>
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
  params: PropTypes.shape({
    sampleId: PropTypes.string,
  }),
}

export default connect(null, {
  fetchSample,
  editIdeaSample,
})(EditIdeaSample)
