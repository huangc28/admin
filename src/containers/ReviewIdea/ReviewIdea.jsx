import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import IdeaForm from '../../containers/EditIdea'
import Submitable from '../../components/Submitable'

class ReviewIdea extends Component {
  onSubmit = value => {
    console.log('BRYAN: review idea', value)
  }

  componentDidMount = () => {
    console.log('TRIGGERED review idea')
  }

  render () {
    return (
      <div>
        <IdeaForm
          onSubmitCallback={this.onSubmit}
          testProps="test"
          disabled
        />
      </div>
    )
  }
}

ReviewIdea.propTypes = {
  ideaId: PropTypes.number,
}

const mapStateToProps = (state, ownProps) => {
  return {
    ideaId: ownProps.params && ownProps.params.id && parseInt(ownProps.params.id, 10),
  }
}

export default connect(null, null)(ReviewIdea)
