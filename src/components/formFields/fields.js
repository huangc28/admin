/**
 * This is simple wrapper of redux-form on material-ui.
 * redux-form: http://redux-form.com/
 * material-ui: http://www.material-ui.com/
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
  ...custom
}) => (
  <Checkbox
    label={label}
    input={input.value}
    onCheck={input.onChange}
    {...custom}
  />
)

renderCheckBoxField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
}