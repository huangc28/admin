import React, { PropTypes } from 'react'
import { Form, Field, reduxForm } from 'redux-form'

import styles from './IdeaForm.css'
import {
  renderTextField,
  renderCheckBoxField,
} from '../../formFields/fields'

/**
 * product name - string
 * image - string
 * product cost
 * net weight
 * approx pack weight
 * battery
 * branded
 * fragile
 * expected problems / key selling point
 * editor / creator
 */
const IdeaForm = ({
  handleSubmit,
  onSubmitCallback,
  disabled,
}) => (
  <Form
    className={styles.form}
    onSubmit={handleSubmit(onSubmitCallback)}
  >
    <div className={styles.fieldContainer}>
      <Field
        name="productName"
        label="Product Name"
        fullWidth
        disabled={disabled}
        component={renderTextField}
      />
    </div>

    <div className={styles.fieldContainer}>
      <Field
        name="proposerName"
        label="Proposer Name"
        fullWidth
        disabled={disabled}
        component={renderTextField}
      />
    </div>

    <div className={styles.fieldContainer}>
      <Field
        name="productCost"
        label="Product Cost"
        fullWidth
        disabled={disabled}
        component={renderTextField}
      />
    </div>

    <div className={styles.fieldContainer}>
      <Field
        name="netWeight"
        label="Net Weight"
        fullWidth
        disabled={disabled}
        component={renderTextField}
      />
    </div>

    <div className={styles.fieldContainer}>
      <Field
        name="approxPackWeight"
        label="Approximate Pack Weight"
        fullWidth
        disabled={disabled}
        component={renderTextField}
      />
    </div>

    <div className={styles.fieldContainer}>
      <Field
        name="battery"
        label="Battery"
        labelPosition="right"
        disabled={disabled}
        component={renderCheckBoxField}
      />
    </div>

    <div className={styles.fieldContainer}>
      <Field
        name="branded"
        label="Branded"
        labelPosition="right"
        disabled={disabled}
        component={renderCheckBoxField}
      />
    </div>

    <div className={styles.fieldContainer}>
      <Field
        name="fragile"
        label="fragile"
        labelPosition="right"
        disabled={disabled}
        component={renderCheckBoxField}
      />
    </div>

    <div className={styles.fieldContainer}>
      <Field
        name="remark"
        label="remark"
        multiLine
        rows={2}
        rowsMax={4}
        fullWidth
        disabled={disabled}
        component={renderTextField}
      />
    </div>
  </Form>
)

IdeaForm.propTypes = {
  disabled: PropTypes.bool,
  formData: PropTypes.object,
  handleSubmit: PropTypes.func,
  reset: PropTypes.func,
  /**
   * We have to name this function this way,
   * "onSubmit" conflicts with reduc-form native function name.
   */
  onSubmitCallback: PropTypes.func,
}

export default reduxForm({
  form: 'ideaForm',
})(IdeaForm)
