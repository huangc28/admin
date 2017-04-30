import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import IdeaFrom from '../../components/forms/IdeaForm'
import { ideaSelector } from '../../reducers/ideas'

/**
 * - get id from url query.
 * - retrieve idea from given id.
 * - pass in idea as form data into idea form.
 */
class EditIdea extends Component {
  onSubmit = value => {
    console.log('BRYAN: value', value)
  }

  render () {
    const {
      idea,
    } = this.props

    return (
      <IdeaFrom
        formData={idea}
        onSubmitCallback={this.onSubmit}
      />
    )
  }
}

EditIdea.propTypes = {
  idea: PropTypes.object,
}

const mapStateToProps = (state, ownProps) => ({
  idea: ideaSelector(ownProps.params.id),
})

export default connect(mapStateToProps, null)(EditIdea)
