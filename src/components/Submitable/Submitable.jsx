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

  renderEditButton = () => (
    <div>
      <div>
        <RaisedButton
          label="Edit"
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
        label="Delete"
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

  render () {
    const {
      showEditButton,
      showDeleteButton,
      showResetButton,
      showSaveAndSubmitButton,
      showSaveButton,
      showReworkButton,
    } = this.props

    return (
      <div className={styles.btns}>
        {
          showReworkButton
            ? this.renderReworkButton()
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

  showDeleteButton: PropTypes.bool,
  showEditButton: PropTypes.bool,
  showResetButton: PropTypes.bool,
  showReworkButton: PropTypes.bool,
  showSaveAndSubmitButton: PropTypes.bool,
  showSaveButton: PropTypes.bool,

  submit: PropTypes.func,

  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
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

export default connect(mapStateToProps, {
  submit,
  reset,
})(Submitable)
