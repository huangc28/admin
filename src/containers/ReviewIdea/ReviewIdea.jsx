import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

import {
  REWORK,
  APPROVE,
  REJECT,
} from '../../constants/ideas'
import {
  rejectIdea,
  approveIdea,
  getIdea,
} from '../../actions/ideas'
import {
  fetchIdeaComment,
  reworkIdea,
} from '../../actions/ideaComment'
import ControllButtonBar from '../../components/ControllButtonBar'
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

  onMount = () => {
    const {
      getIdea,
      params: {
        ideaId,
      },
    } = this.props

    getIdea(ideaId)
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
        <ControllButtonBar
          onBack={() => browserHistory.push('/erp/procurement/ideas')}
        />

        <IdeaForm
          onSubmitCallback={this.onSubmit}
          onMount={this.onMount}
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
  getIdea: PropTypes.func,
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
  getIdea,
})(ReviewIdea)
