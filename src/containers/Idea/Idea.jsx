import React, { Component, PropTypes } from 'react'

import IdeaForm from '../../components/forms/IdeaForm'

class Idea extends Component {
  onSubmit = values => { console.log('value', values) }

  render () {
    return (
      <div>
        <IdeaForm
          onSubmitCallback={this.onSubmit}
          disabled
        />
      </div>
    )
  }
}

Idea.propTypes = {
  idea: PropTypes.object,
}

export default Idea
