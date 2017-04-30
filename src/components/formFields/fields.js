/**
 * This is a simple wrapper of material-ui for redux-form .
 * redux-form: http://redux-form.com/
 * material-ui: http://www.material-ui.com/
 *
 * Be aware that DO NOT pass in attributes that material-ui components
 * can't recongnize. For example: "meta".
 */

import React, { PropTypes } from 'react'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'

export const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

renderTextField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
}

export const renderCheckBoxField = ({
  input,
  label,
  labelPosition,
  disabled,
}) => (
  <Checkbox
    label={label}
    labelPosition={labelPosition}
    disabled={disabled}
    {...input}
  />
)

renderCheckBoxField.propTypes = {
  disabled: PropTypes.bool,
  input: PropTypes.object,
  label: PropTypes.string,
  labelPosition: PropTypes.string,
}