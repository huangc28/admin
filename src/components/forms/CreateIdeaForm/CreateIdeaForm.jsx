import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'

import styles from './CreateIdeaForm.css'
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
class CreateIdeaForm extends Component {
  render () {
    const { handleSubmit } = this.props

    return (
      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <div className={styles.fieldContainer}>
          <Field
            name="productName"
            label="Product Name"
            fullWidth
            component={renderTextField}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="proposerName"
            label="Proposer Name"
            fullWidth
            component={renderTextField}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="productCost"
            label="Product Cost"
            fullWidth
            component={renderTextField}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="netWeight"
            label="Net Weight"
            fullWidth
            component={renderTextField}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="approxPackWeight"
            label="Approximate Pack Weight"
            fullWidth
            component={renderTextField}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="battery"
            label="Battery"
            labelPosition="right"
            component={renderCheckBoxField}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="branded"
            label="Branded"
            labelPosition="right"
            component={renderCheckBoxField}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="fragile"
            label="fragile"
            labelPosition="right"
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
            component={renderTextField}
          />
        </div>

        <div className={styles.btns}>
          <div>
            <RaisedButton
              label="submit"
              type="submit"
              primary
            />
          </div>
          <div>
            <RaisedButton
              label="reset"
              default
              onTouchTap={reset}
            />
          </div>
        </div>
      </form>
    )
  }
}

CreateIdeaForm.propTypes = {
  handleSubmit: PropTypes.func,
}

export default reduxForm({
  form: 'createIdeaForm',
})(CreateIdeaForm)
