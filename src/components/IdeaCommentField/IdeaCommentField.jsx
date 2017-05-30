import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'

import styles from './IdeaCommentField.css'
import {
  fetchIdeaComment,
  getCommentByIdeaId,
} from '../../redux/ideaComments'

class IdeaCommentField extends Component {
  constructor () {
    super()
    this.state = {
      hasFetched: false,
    }
  }

  componentDidMount = () => {
    // retrieve latest comment by idea id
    const { fetchIdeaComment, ideaId } = this.props

    fetchIdeaComment(ideaId)
  }

  componentWillReceiveProps = nextProps => {
    const {
      comment: {
        content = '',
      } = {},
    } = nextProps

    const { content: prevContent, onUpdateComment } = this.props

    if (prevContent !== content && !this.state.hasFetched) {
      this.setState({ hasFetched: true })

      onUpdateComment(content)
    }
  }

  componentWillUnmount = () => {
    this.setState({
      hasFetched: false,
    })
  }

  render () {
    const {
      content,
      disabled,
      onInput,
    } = this.props

    return (
      <div className={styles.comments}>
        <TextField
          disabled={disabled}
          name="ideaComments"
          hintText="Idea Comments"
          floatingLabelText="Idea Comments"
          onInput={onInput}
          value={content}
          fullWidth
          multiLine
        />
      </div>
    )
  }
}

IdeaCommentField.propTypes = {
  comment: PropTypes.object,
  content: PropTypes.string,
  disabled: PropTypes.bool,
  fetchIdeaComment: PropTypes.func,
  ideaId: PropTypes.string,
  onInput: PropTypes.func,
  onUpdateComment: PropTypes.func,
}

const mapStateToProps = (state, ownProps) => ({
  comment: getCommentByIdeaId(state, parseInt(ownProps.ideaId, 10)),
})

export default connect(mapStateToProps, {
  fetchIdeaComment,
})(IdeaCommentField)
