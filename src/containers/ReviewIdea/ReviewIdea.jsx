import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/TextField'

import styles from './ReviewIdea.css'
import {
  REWORK,
  APPROVE,
  REJECT,
} from '../../constants/ideas'
import IdeaForm from '../../components/forms/IdeaForm'
import Submitable from '../../components/Submitable'

class ReviewIdea extends Component {
  constructor () {
    super()

    this.state = {
      status: '',
      comments: '',
    }
  }

  onInput = evt => {
    this.setState({
      comments: evt.target.value,
    })
  }

  onSubmit = value => {
    const {
      status,
      comments,
    } = this.state

    const {
      reworkIdea,
      params: {
        ideaId,
      },
    } = this.props

    if (status === REWORK) {
      reworkIdea(ideaId, comments)
    }
  }

  onRework = () => {
    this.setState({
      status: REWORK,
    })
  }

  onApprove = () => {
    this.setState({
      status: APPROVE,
    })
  }

  onReject = () => {
    this.setState({
      status: REJECT,
    })
  }

  render () {
    const {
      params: {
        ideaId,
      } = {},
    } = this.props

    const {
      comments,
    } = this.state

    return (
      <div>
        <IdeaForm
          onSubmitCallback={this.onSubmit}
          refId={parseInt(ideaId, 10)}
          disabled
        />

        {/* comments field */}
        <div className={styles.comments}>
          <TextField
            name="ideaComments"
            hintText="Idea Comments"
            floatingLabelText="Idea Comments"
            onInput={this.onInput}
            value={comments}
            fullWidth
            multiLine
          />
        </div>

        <Submitable
          formName="ideaForm"
          showReworkButton
          showRejectButton
          showApproveButton
          onRework={this.onRework}
          onReject={this.onReject}
          onApprove={this.onApprove}
        />
      </div>
    )
  }
}

ReviewIdea.propTypes = {
  params: PropTypes.shape({
    ideaId: PropTypes.string,
  }),

  reworkIdea: PropTypes.func,
}

export default ReviewIdea
