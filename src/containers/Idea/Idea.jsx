import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import { browserHistory } from 'react-router'

import { deleteIdea } from '../../actions/ideas'
import styles from './Idea.css'
import IdeaForm from '../../components/forms/IdeaForm'

class Idea extends Component {

  onSubmit = values => { console.log('value', values) }

  render () {
    const {
      ideaId,
      deleteIdea,
    } = this.props

    return (
      <div>
        <IdeaForm
          onSubmitCallback={this.onSubmit}
          refId={ideaId}
          disabled
        />

        {/* buttons */}
        <div className={styles.btns}>
          <div>
            <RaisedButton
              label="Edit"
              type="button"
              onTouchTap={() => browserHistory.push(`/erp/procurement/ideas/${ideaId}/edit`)}
              primary
            />
          </div>
          <div>
            <RaisedButton
              label="Delete"
              type="button"
              onTouchTap={() => deleteIdea(ideaId)}
              default
            />
          </div>
        </div>
      </div>
    )
  }
}

Idea.propTypes = {
  deleteIdea: PropTypes.func,
  ideaId: PropTypes.string,
}

const mapStateToProps = (state, ownProps) => ({
  ideaId: ownProps.params.id,
})

export default connect(mapStateToProps, {
  deleteIdea,
})(Idea)
