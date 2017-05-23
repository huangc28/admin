import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { submit, reset } from 'redux-form/immutable'
import RaisedButton from 'material-ui/RaisedButton'
import { translate } from 'react-i18next'

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

  onTouchTapEdit = () => {
    const {
      onEdit,
      formName,
      submit,
    } = this.props

    if (onEdit) {
      onEdit()
    }

    submit(formName)
  }

  onTouchTapDelete = () => {
    const { onDelete } = this.props

    onDelete()
  }

  onTouchTapRework = () => {
    const {
      onRework,
      submit,
      formName,
    } = this.props

    if (onRework) {
      onRework()
    }

    submit(formName)
  }

  onTouchTapReject = () => {
    // we don't need to submit anything in reject action.
    const {
      onReject,
      submit,
      formName,
    } = this.props

    if (onReject) {
      onReject()
    }

    submit(formName)
  }

  onTouchTapApprove = () => {
    const {
      onApprove,
      submit,
      formName,
    } = this.props

    if (onApprove) {
      onApprove()
    }

    submit(formName)
  }

  renderSaveButton = () => (
    <div>
      <RaisedButton
        label={this.props.translation('Save')}
        type="submit"
        onTouchTap={this.onTouchTapSave}
        primary
      />
    </div>
  )

  renderSaveAndSubmitButton = () => (
    <div>
      <RaisedButton
        label={this.props.translation('Save & Submit')}
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
          label={this.props.translation('Reset')}
          type="button"
          onTouchTap={() => reset()}
          default
        />
      </div>
    )
  }

  renderEditButton = () => (
    <div>
      <div>
        <RaisedButton
          label={this.props.translation('Edit')}
          type="button"
          onTouchTap={this.onTouchTapEdit}
          primary
        />
      </div>
    </div>
  )

  renderDeleteButton = () => (
    <div>
      <RaisedButton
        label={this.props.translation('Delete')}
        type="button"
        onTouchTap={this.onTouchTapDelete}
        default
      />
    </div>
  )

  renderReworkButton = () => (
    <div>
      <RaisedButton
        label="Rework"
        type="button"
        onTouchTap={this.onTouchTapRework}
        default
      />
    </div>
  )

  renderRejectButton = () => (
    <div>
      <RaisedButton
        label="Reject"
        type="button"
        onTouchTap={this.onTouchTapReject}
        secondary
      />
    </div>
  )

  renderApproveButton = () => (
    <div>
      <RaisedButton
        label="Approve"
        type="button"
        onTouchTap={this.onTouchTapApprove}
        primary
      />
    </div>
  )

  render () {
    const {
      showEditButton,
      showDeleteButton,
      showResetButton,
      showSaveAndSubmitButton,
      showSaveButton,
      showReworkButton,
      showRejectButton,
      showApproveButton,
    } = this.props

    return (
      <div className={styles.btns}>
        {
          showReworkButton
            ? this.renderReworkButton()
            : ''
        }
        {
          showRejectButton
            ? this.renderRejectButton()
            : ''
        }
        {
          showApproveButton
            ? this.renderApproveButton()
            : ''
        }
        {
          showEditButton
            ? this.renderEditButton()
            : ''
        }

        {
          showDeleteButton
            ? this.renderDeleteButton()
            : ''
        }

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

  showApproveButton: PropTypes.bool,
  showDeleteButton: PropTypes.bool,
  showEditButton: PropTypes.bool,
  showRejectButton: PropTypes.bool,
  showResetButton: PropTypes.bool,
  showReworkButton: PropTypes.bool,
  showSaveAndSubmitButton: PropTypes.bool,
  showSaveButton: PropTypes.bool,

  submit: PropTypes.func,

  translation: PropTypes.func,

  onApprove: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onReject: PropTypes.func,
  onRework: PropTypes.func,
  onSave: PropTypes.func,
  onSaveAndSubmit: PropTypes.func,
}

Submitable.defaultProps = {
  showDeleteButton: false,
  showEditButton: false,
  showResetButton: false,
  ShowReworkButton: false,
  showSaveAndSubmitButton: false,
  showSaveButton: false,
}

const mapStateToProps = () => ({})

export default translate(null, { translateFuncName: 'translation' })(
  connect(mapStateToProps, {
    submit,
    reset,
  })(Submitable)
)
