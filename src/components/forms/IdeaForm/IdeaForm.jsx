import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Form, Field, reduxForm } from 'redux-form'
import {
  Checkbox,
  TextField,
} from 'redux-form-material-ui'
import { translate } from 'react-i18next'

import styles from './IdeaForm.css'
import ImageUpload from '../../ImageUpload'

/**
 * @param {Object} values
 * @returns {Object} errors
 */
const validate = values => {
  const errors = {}

  // productName is requried
  if (!values.productName) {
    errors.productName = 'Required'
  }

  // netWeight, width, height, length should be float.
  const requireFloat = [
    'netWeight',
    'width',
    'height',
    'length',
  ]

  requireFloat.forEach(field => {
    if (!/\d+(\.\d+)?/.test(values[field])) {
      errors[field] = 'number required'
    }
  })

  return errors
}

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
class IdeaForm extends Component {
  componentDidMount = () => {
    const {
      onMount,
    } = this.props

    if (onMount) {
      onMount()
    }
  }

  render () {
    const {
      handleSubmit,
      onSubmitCallback,
      disabled,
      translation,
    } = this.props

    return (
      <Form
        className={styles.form}
        onSubmit={handleSubmit(onSubmitCallback)}
      >
        <div className={styles.fieldContainer}>
          <Field
            name="productName"
            hintText={translation('Product Name')}
            floatingLabelText={translation('Product Name')}
            fullWidth
            disabled={disabled}
            component={TextField}
          />
        </div>

        {/* image upload */}
        <ImageUpload />

        <div className={styles.fieldContainer}>
          <Field
            name="proposerName"
            hintText={translation('Proposer Name')}
            floatingLabelText={translation('Proposer Name')}
            fullWidth
            disabled={disabled}
            component={TextField}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="netWeight"
            hintText={translation('Net Weight')}
            floatingLabelText={translation('Net Weight')}
            fullWidth
            disabled={disabled}
            component={TextField}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="approximatePackWeight"
            hintText={translation('Approxmiate Pack Weight')}
            floatingLabelText={translation('Approxmiate Pack Weight')}
            fullWidth
            disabled={disabled}
            component={TextField}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="productCost"
            hintText={translation('Product Cost')}
            floatingLabelText={translation('Product Cost')}
            fullWidth
            disabled={disabled}
            component={TextField}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="battery"
            label={translation('Battery')}
            labelPosition="right"
            disabled={disabled}
            component={Checkbox}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="branded"
            label={translation('Branded')}
            labelPosition="right"
            disabled={disabled}
            component={Checkbox}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="fragile"
            label={translation('Fragile')}
            labelPosition="right"
            disabled={disabled}
            component={Checkbox}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="color"
            hintText={translation('Color')}
            floatingLabelText={translation('Color')}
            fullWidth
            disabled={disabled}
            component={TextField}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="width"
            hintText={translation('Width')}
            floatingLabelText={translation('Width')}
            fullWidth
            disabled={disabled}
            component={TextField}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="height"
            hintText={translation('Height')}
            floatingLabelText={translation('Height')}
            fullWidth
            disabled={disabled}
            component={TextField}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="length"
            hintText={translation('Length')}
            floatingLabelText={translation('Length')}
            fullWidth
            disabled={disabled}
            component={TextField}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="accessories"
            hintText={translation('Accessories')}
            floatingLabelText={translation('Accessories')}
            multiLine
            rows={2}
            rowsMax={4}
            fullWidth
            disabled={disabled}
            component={TextField}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="remark"
            hintText={translation('Remark')}
            floatingLabelText={translation('Remark')}
            multiLine
            rows={2}
            rowsMax={4}
            fullWidth
            disabled={disabled}
            component={TextField}
          />
        </div>
      </Form>
    )
  }
}

IdeaForm.propTypes = {
  disabled: PropTypes.bool,
  handleSubmit: PropTypes.func,

  initialValues: PropTypes.shape({
    image: PropTypes.string,
  }),
  reset: PropTypes.func,

  /**
   * Specify the status of this idea.
   * so we know that which stage this idea is currently at.
   */
  status: PropTypes.number,
  translation: PropTypes.func,
  onMount: PropTypes.func,

  /**
   * We have to name this function this way,
   * "onSubmit" conflicts with redux-form native function name.
   */
  onSubmitCallback: PropTypes.func,
}

const mapStateToProps = state => ({
  initialValues: state.initFormData.formData,
})

export default translate(null, { translateFuncName: 'translation' })(
  connect(mapStateToProps, null)(
    reduxForm({
      form: 'ideaForm',
      enableReinitialize: true,
      validate,
    })(IdeaForm)
  )
)
