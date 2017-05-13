import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/TextField'
import { connect } from 'react-redux'

import styles from './ReviewIdea.css'
import { getCommentByIdeaId } from '../../reducers/ideaComment'
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
import Submitable from '../../components/Submitable'

class ReviewIdea extends Component {
  constructor () {
    super()

    this.state = {
      status: '',
      content: '',
    }
  }

  componentDidMount = () => {
    // retrieve latest comment by idea id
    const { fetchIdeaComment, params: { ideaId } } = this.props

    fetchIdeaComment(ideaId)
  }

  componentWillReceiveProps = nextProps => {
    const {
      comment: {
        content,
      },
    } = nextProps

    if (this.state.content !== content) {
      this.setState({ content })
    }
  }

  onInput = evt => {
    this.setState({
      content: evt.target.value,
    })
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

        {/* comments field */}
        <div className={styles.comments}>
          <TextField
            name="ideaComments"
            hintText="Idea Comments"
            floatingLabelText="Idea Comments"
            onInput={this.onInput}
            value={content}
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
  approveIdea: PropTypes.func,
  comment: PropTypes.object,
  fetchIdeaComment: PropTypes.func,
  params: PropTypes.shape({
    ideaId: PropTypes.string,
  }),
  rejectIdea: PropTypes.func,
  reworkIdea: PropTypes.func,
}

const mapStateToProps = (state, ownProps) => ({
  comment: getCommentByIdeaId(state, parseInt(ownProps.params.ideaId, 10)),
})

export default connect(mapStateToProps, {
  approveIdea,
  reworkIdea,
  rejectIdea,
  fetchIdeaComment,
})(ReviewIdea)
