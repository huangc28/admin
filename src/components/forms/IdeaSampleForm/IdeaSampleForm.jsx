import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Form, Field, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'

import styles from './IdeaSampleForm.css'
import ImageUpload from '../../../components/ImageUpload'
import PreviewImageField from '../fields/PreviewImage'

const validate = values => {
  const errors = {}

  // productName is required
  if (!values.productName) {
    errors.productName = 'is required'
  }

  // float required
  const requireFloat = [
    'inventoryLevel',
    'estimateShippingCost',
    'price',
    'weight',
    'length',
    'width',
    'height',
  ]

  requireFloat.forEach(field => {
    if (!/\d+(\.\d+)?/.test(values[field])) {
      errors[field] = 'number required'
    }
  })

  return errors
}

class IdeaSampleForm extends Component {
  state = {
    preview: '',
  }

  componentDidMount = () => {
    const { onMount } = this.props

    if (onMount) {
      onMount()
    }
  }

  onSelected = imgDataUrl => {
    this.setState({
      preview: imgDataUrl,
    })
  }

  render () {
    const {
      handleSubmit,
      onSubmitCallback,
      disabled,
    } = this.props

    const { preview } = this.state

    return (
      <Form
        className={styles.form}
        onSubmit={handleSubmit(onSubmitCallback)}
      >
        <div className={styles.fieldContainer}>
          <Field
            name="supplier"
            hintText="Supplier"
            floatingLabelText="Supplier"
            fullWidth
            disabled={disabled}
            component={TextField}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="productName"
            hintText="Product Name"
            floatingLabelText="Product Name"
            fullWidth
            disabled={disabled}
            component={TextField}
          />
        </div>

        {/* image preview */}
        <div className={styles.imagePreivew}>
          <Field
            name="image"
            src={preview}
            component={PreviewImageField}
          />
        </div>

        {/* image upload */}
        <ImageUpload onSelected={this.onSelected} />

        <div className={styles.fieldContainer}>
          <Field
            name="location"
            hintText="Location"
            floatingLabelText="Location"
            fullWidth
            disabled={disabled}
            component={TextField}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="inventoryLevel"
            hintText="Inventory Level"
            floatingLabelText="Inventory Level"
            fullWidth
            disabled={disabled}
            component={TextField}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="estimateShippingCost"
            hintText="estimate shipping cost"
            floatingLabelText="estimate shipping cost"
            fullWidth
            disabled={disabled}
            component={TextField}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="price"
            hintText="Price"
            floatingLabelText="Price"
            fullWidth
            disabled={disabled}
            component={TextField}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="exterior"
            hintText="Exterior"
            floatingLabelText="Exterior"
            fullWidth
            disabled={disabled}
            component={TextField}
            multiLine
            rows={2}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="color"
            hintText="Color"
            floatingLabelText="Color"
            fullWidth
            disabled={disabled}
            component={TextField}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="material"
            hintText="Material"
            floatingLabelText="Material"
            fullWidth
            disabled={disabled}
            component={TextField}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="weight"
            hintText="Weight"
            floatingLabelText="Weight"
            fullWidth
            disabled={disabled}
            component={TextField}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="length"
            hintText="Length"
            floatingLabelText="Length"
            fullWidth
            disabled={disabled}
            component={TextField}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="width"
            hintText="Width"
            floatingLabelText="Width"
            fullWidth
            disabled={disabled}
            component={TextField}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="height"
            hintText="Height"
            floatingLabelText="Height"
            fullWidth
            disabled={disabled}
            component={TextField}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="qualityRemark"
            hintText="Quality Remark"
            floatingLabelText="Quality Remark"
            fullWidth
            disabled={disabled}
            component={TextField}
            multiLine
            rows={2}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="quantityRemark"
            hintText="Quantity Remark"
            floatingLabelText="Quantity Remark"
            fullWidth
            disabled={disabled}
            component={TextField}
            multiLine
            rows={2}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="csRemark"
            hintText="Customer Service Remark"
            floatingLabelText="Customer Service Remark"
            fullWidth
            disabled={disabled}
            component={TextField}
            multiLine
            rows={2}
          />
        </div>
      </Form>
    )
  }
}

IdeaSampleForm.propTypes = {
  disabled: PropTypes.bool,
  handleSubmit: PropTypes.func,

  /**
   * Callback to be executed on componentDidMount
   */
  onMount: PropTypes.func,
  onSubmitCallback: PropTypes.func,
}

const mapStateToProps = state => ({
  initialValues: state.initFormData.formData,
})

export default connect(mapStateToProps)(
  reduxForm({
    form: 'ideaSampleForm',
    enableReinitialize: true,
    validate,
  })(IdeaSampleForm)
)
