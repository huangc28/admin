import React, { Component } from 'react'
import CreateIdeaForm from '../../components/forms/CreateIdeaForm'

class CreateIdea extends Component {
  onSubmit = data => {
    console.log(data)
  }

  render () {
    return (
      <CreateIdeaForm onSubmit={this.onSubmit} />
    )
  }
}

export default CreateIdea
