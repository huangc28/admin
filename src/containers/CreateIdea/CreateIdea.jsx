import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { submit, reset } from 'redux-form/immutable'
import RaisedButton from 'material-ui/RaisedButton'

import styles from './CreateIdea.css'
import IdeaForm from '../../components/forms/IdeaForm'
import { SAVE, SAVE_AND_SUBMIT } from '../../constants/generic'
import {
  saveIdea,
  saveAndSubmitIdea,
} from '../../actions/ideas'

class CreateIdea extends Component {
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
      saveIdea,
      saveAndSubmitIdea,
    } = this.props

    if (submitType === SAVE) {
      saveIdea(value)

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
    const {
      reset,
    } = this.props

    return (
      <div>
        <IdeaForm onSubmitCallback={this.onSubmit} />
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
              primary
            />
          </div>
          <div>
            <RaisedButton
              label="reset"
              type="button"
              onTouchTap={() => reset('ideaForm')}
              default
            />
          </div>
        </div>
      </div>
    )
  }
}

CreateIdea.propTypes = {
  reset: PropTypes.func,
  saveAndSubmitIdea: PropTypes.func,
  saveIdea: PropTypes.func,
  submit: PropTypes.func,
}

export default connect(null, {
  saveIdea,
  saveAndSubmitIdea,
  submit,
  reset,
})(CreateIdea)
