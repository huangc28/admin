import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/TextField'
import { connect } from 'react-redux'

import styles from './ReviewIdea.css'
import { getIdeaComment } from '../../reducers/ideas'
import {
  REWORK,
  APPROVE,
  REJECT,
} from '../../constants/ideas'
import {
  reworkIdea,
  rejectIdea,
  approveIdea,
} from '../../actions/ideas'
import {
  fetchIdeaComment,
} from '../../actions/ideaComment'
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

  // componentWillReceiveProps = nextProps => {
  //   const { comment } = nextProps
  //   console.log('componentWillReceiveProps', comment)
  //   // if ()
  // }

  componentDidMount = () => {
    // retrieve latest comment by idea id
    const { fetchIdeaComment, params: { ideaId } } = this.props

    fetchIdeaComment(ideaId)
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
      approveIdea,
      reworkIdea,
      rejectIdea,
      params: {
        ideaId,
      },
    } = this.props

    if (status === REWORK) {
      reworkIdea(ideaId, comments)
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
      comment,
    } = this.props

    const {
      comments,
    } = this.state

    console.log('COMMENT', comment)

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
  approveIdea: PropTypes.func,
  comment: PropTypes.string,
  fetchIdeaComment: PropTypes.func,
  params: PropTypes.shape({
    ideaId: PropTypes.string,
  }),
  rejectIdea: PropTypes.func,
  reworkIdea: PropTypes.func,
}

const mapStateToProps = (state, ownProps) => ({
  comment: getIdeaComment(state, ownProps.params.ideaId),
})

export default connect(mapStateToProps, {
  approveIdea,
  reworkIdea,
  rejectIdea,
  fetchIdeaComment,
})(ReviewIdea)
