import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import IdeaForm from '../../components/forms/IdeaForm'

class Idea extends Component {

  onSubmit = values => { console.log('value', values) }

  render () {
    const { ideaId } = this.props

    return (
      <div>
        <IdeaForm
          onSubmitCallback={this.onSubmit}
          refId={ideaId}
          disabled
        />
      </div>
    )
  }
}

Idea.propTypes = {
  ideaId: PropTypes.string,
}

const mapStateToProps = (state, ownProps) => ({
  ideaId: ownProps.params.id,
})

export default connect(mapStateToProps, null)(Idea)
