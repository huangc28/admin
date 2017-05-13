import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {
  REWORK,
  APPROVE,
  REJECT,
} from '../../constants/ideas'
import {
  rejectIdea,
  approveIdea,
} from '../../actions/ideas'
import {
  fetchIdeaComment,
  reworkIdea,
} from '../../actions/ideaComment'
import IdeaForm from '../../components/forms/IdeaForm'
import IdeaCommentField from '../../components/IdeaCommentField'
import Submitable from '../../components/Submitable'

class ReviewIdea extends Component {
  constructor () {
    super()

    this.state = {
      status: '',
      content: '',
    }
  }

  onInput = evt => {
    this.setState({
      content: evt.target.value,
    })
  }

  onUpdateComment = content => {
    this.setState({ content })
  }

  onSubmit = value => {
    const {
      status,
      content,
    } = this.state

    const {
      approveIdea,
      reworkIdea,
      rejectIdea,
      params: {
        ideaId,
      },
    } = this.props

    if (status === REWORK) {
      // console.log('content', content)
      reworkIdea(ideaId, content)
    }

    if (status === REJECT) {
      rejectIdea(ideaId)
    }

    if (status === APPROVE) {
      approveIdea(ideaId)
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
      content,
    } = this.state

    return (
      <div>
        <IdeaForm
          onSubmitCallback={this.onSubmit}
          refId={parseInt(ideaId, 10)}
          disabled
        />

        <IdeaCommentField
          ideaId={ideaId}
          onInput={this.onInput}
          content={content}
          onUpdateComment={this.onUpdateComment}
        />

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
  approveIdea: PropTypes.func,
  comment: PropTypes.object,
  fetchIdeaComment: PropTypes.func,
  params: PropTypes.shape({
    ideaId: PropTypes.string,
  }),
  rejectIdea: PropTypes.func,
  reworkIdea: PropTypes.func,
}

export default connect(null, {
  approveIdea,
  reworkIdea,
  rejectIdea,
  fetchIdeaComment,
})(ReviewIdea)
