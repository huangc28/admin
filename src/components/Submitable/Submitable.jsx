import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { submit, reset } from 'redux-form/immutable'
import RaisedButton from 'material-ui/RaisedButton'

import styles from './Submitable.css'

class Submitable extends Component {
  onTouchTapSave = () => {
    const {
      onSave,
      formName,
      submit,
    } = this.props

    if (onSave) {
      onSave()
    }

    submit(formName)
  }

  onTouchTapSaveAndSubmit = () => {
    const {
      onSaveAndSubmit,
      formName,
      submit,
    } = this.props

    if (onSaveAndSubmit) {
      onSaveAndSubmit()
    }

    submit(formName)
  }

  renderSaveButton = () => (
    <div>
      <RaisedButton
        label="Save"
        type="submit"
        onTouchTap={this.onTouchTapSave}
        primary
      />
    </div>
  )

  renderSaveAndSubmitButton = () => (
    <div>
      <RaisedButton
        label="Save & Submit"
        type="button"
        onTouchTap={this.onTouchTapSaveAndSubmit}
        primary
      />
    </div>
  )

  renderResetButton = () => {
    const { reset } = this.props

    return (
      <div>
        <RaisedButton
          label="reset"
          type="button"
          onTouchTap={() => reset()}
          default
        />
      </div>
    )
  }

  render () {
    const {
      showResetButton,
      showSaveAndSubmitButton,
      showSaveButton,
    } = this.props

    return (
      <div className={styles.btns}>
        {
          showSaveButton
            ? this.renderSaveButton()
            : ''
        }
        {
          showSaveAndSubmitButton
            ? this.renderSaveAndSubmitButton()
            : ''
        }
        {
          showResetButton
            ? this.renderResetButton()
            : ''
        }
      </div>
    )
  }
}

Submitable.propTypes = {
  formName: PropTypes.string.isRequired,
  reset: PropTypes.func,
  showResetButton: PropTypes.bool,
  showSaveAndSubmitButton: PropTypes.bool,
  showSaveButton: PropTypes.bool,
  submit: PropTypes.func,
  onSave: PropTypes.func,
  onSaveAndSubmit: PropTypes.func,
}

Submitable.defaultProps = {
  showResetButton: false,
  showSaveAndSubmitButton: false,
  showSaveButton: false,
}

const mapStateToProps = () => ({})

export default connect(mapStateToProps, {
  submit,
  reset,
})(Submitable)
