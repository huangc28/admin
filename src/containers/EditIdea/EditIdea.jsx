import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { submit } from 'redux-form/immutable'
import { browserHistory } from 'react-router'

import ControllButtonBar from '../../components/ControllButtonBar'
import {
  getIdeaStatus,
  editIdea,
  saveAndSubmitIdea,
  getIdea,
} from '../../redux/ideas'
import IdeaCommentField from '../../components/IdeaCommentField'
import Submitable from '../../components/Submitable'
import { REWORK } from '../../constants/ideas'
import { SAVE, SAVE_AND_SUBMIT } from '../../constants/generic'
import IdeaFrom from '../../components/forms/IdeaForm'

/**
 * - get id from url query.
 * - retrieve idea from given id.
 * - pass in idea as form data into idea form.
 */
class EditIdea extends Component {
  constructor () {
    super()

    this.state = {
      submitType: SAVE,
      content: '',
    }
  }

  onUpdateComment = content => {
    this.setState({
      content,
    })
  }

  onSubmit = value => {
    let mergedFormData = value

    const {
      submitType,
    } = this.state

    const {
      editIdea,
      saveAndSubmitIdea,
      image,
    } = this.props

    // here, have to get the name of just uploaded image.
    // and submit it alone with other form data.
    if (image) {
      mergedFormData = {
        ...value,
        image,
      }
    }

    if (submitType === SAVE) {
      editIdea(mergedFormData)

      return
    }

    saveAndSubmitIdea(mergedFormData)
  }

  onEdit = () => {
    this.setState({ submitType: SAVE })
  }

  onMount = () => {
    const {
      getIdea,
      params: {
        ideaId,
      },
    } = this.props

    getIdea(ideaId)
  }

  onSaveAndSubmit = () => {
    this.setState({ submitType: SAVE_AND_SUBMIT })
  }

  render () {
    const {
      params: {
        ideaId,
      },
      status,
    } = this.props

    const { content } = this.state

    return (
      <div>
        <ControllButtonBar onBack={
            () => browserHistory.push('/erp/procurement/ideas')
          }
        />

        <IdeaFrom
          onSubmitCallback={this.onSubmit}
          onMount={this.onMount}
        />

        {
          status === REWORK
            ? (
              <IdeaCommentField
                disabled
                ideaId={ideaId}
                content={content}
                onUpdateComment={this.onUpdateComment}
              />
            )
            : ''
        }

        <Submitable
          formName="ideaForm"
          showEditButton
          showSaveAndSubmitButton
          onEdit={this.onEdit}
          onSaveAndSubmit={this.onSaveAndSubmit}
        />
      </div>
    )
  }
}

EditIdea.propTypes = {
  editIdea: PropTypes.func,
  getIdea: PropTypes.func,
  ideaId: PropTypes.number,
  image: PropTypes.string,
  params: PropTypes.shape({
    ideaId: PropTypes.string,
  }),
  saveAndSubmitIdea: PropTypes.func,
  status: PropTypes.number,
  submit: PropTypes.func,
}

const mapStateToProps = (state, ownProps) => ({
  status: getIdeaStatus(state, ownProps.params.ideaId),
  image: state.photo.image,
})

export default connect(mapStateToProps, {
  editIdea,
  saveAndSubmitIdea,
  submit,
  getIdea,
})(EditIdea)
