import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import { submit } from 'redux-form/immutable'

import styles from './EditIdea.css'
import { SAVE, SAVE_AND_SUBMIT } from '../../constants/generic'
import {
  editIdea,
  saveAndSubmitIdea,
} from '../../actions/ideas'
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
    }
  }

  onSubmit = value => {
    const {
      submitType,
    } = this.state

    const {
      editIdea,
      saveAndSubmitIdea,
    } = this.props

    console.log('BRYAN: edit idea', editIdea)

    if (submitType === SAVE) {
      editIdea(value)

      return
    }

    saveAndSubmitIdea(value)
  }

  onTouchTapSave = () => {
    const { submit } = this.props

    this.setState({ submitType: SAVE })
    submit('ideaForm')
  }

  onTouchTapSaveAndSubmit = () => {
    const { submit } = this.props

    this.setState({ submitType: SAVE_AND_SUBMIT })
    submit('ideaForm')
  }

  render () {
    const { ideaId } = this.props

    return (
      <div>
        <IdeaFrom
          onSubmitCallback={this.onSubmit}
          refId={ideaId}
        />

        {/* buttons */}
        <div className={styles.btns}>
          <div>
            <RaisedButton
              label="Save"
              type="submit"
              onTouchTap={this.onTouchTapSave}
              primary
            />
          </div>
          <div>
            <RaisedButton
              label="Save & Submit"
              type="button"
              onTouchTap={this.onTouchTapSaveAndSubmit}
              default
            />
          </div>
        </div>
      </div>
    )
  }
}

EditIdea.propTypes = {
  editIdea: PropTypes.func,
  ideaId: PropTypes.string,
  saveAndSubmitIdea: PropTypes.func,
  submit: PropTypes.func,
}

const mapStateToProps = (state, ownProps) => ({
  ideaId: ownProps.params.id,
})

export default connect(mapStateToProps, {
  editIdea,
  saveAndSubmitIdea,
  submit,
})(EditIdea)
