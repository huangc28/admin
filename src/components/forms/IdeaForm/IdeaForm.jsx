import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Form, Field, reduxForm } from 'redux-form'
import {
  Checkbox,
  TextField,
} from 'redux-form-material-ui'

import styles from './IdeaForm.css'
import { getIdea } from '../../../actions/ideas'

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
      getIdea,
      refId,
    } = this.props

    if (refId) {
      getIdea(refId)
    }
  }

  render () {
    const {
      handleSubmit,
      onSubmitCallback,
      disabled,
    } = this.props

    return (
      <Form
        className={styles.form}
        onSubmit={handleSubmit(onSubmitCallback)}
      >
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

        <div className={styles.fieldContainer}>
          <Field
            name="proposerName"
            hintText="Proposer Name"
            floatingLabelText="Proposer Name"
            fullWidth
            disabled={disabled}
            component={TextField}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="netWeight"
            hintText="Net Weight"
            floatingLabelText="Net Weight"
            fullWidth
            disabled={disabled}
            component={TextField}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="approximatePackWeight"
            hintText="Approxmiate Pack Weight"
            floatingLabelText="Approxmiate Pack Weight"
            fullWidth
            disabled={disabled}
            component={TextField}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="productCost"
            hintText="Product Cost"
            floatingLabelText="Product Cost"
            fullWidth
            disabled={disabled}
            component={TextField}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="battery"
            label="Battery"
            labelPosition="right"
            disabled={disabled}
            component={Checkbox}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="branded"
            label="Branded"
            labelPosition="right"
            disabled={disabled}
            component={Checkbox}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            name="fragile"
            label="fragile"
            labelPosition="right"
            disabled={disabled}
            component={Checkbox}
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
            name="accessories"
            hintText="Accessories"
            floatingLabelText="Accessories"
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
            hintText="remark"
            floatingLabelText="remark"
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

  /**
   * Load idea data.
   * use the data to reinitialize form.
   */
  getIdea: PropTypes.func,

  handleSubmit: PropTypes.func,

  /**
   * Use refId to load existing idea data.
   */
  refId: PropTypes.number,
  reset: PropTypes.func,

  /**
   * Specify the status of this idea.
   * so we know that which stage this idea is currently at.
   */
  status: PropTypes.number,

  /**
   * We have to name this function this way,
   * "onSubmit" conflicts with reduc-form native function name.
   */
  onSubmitCallback: PropTypes.func,
}

const mapStateToProps = (state, ownProps) => ({
  initialValues: state.initFormData.formData,
})

export default connect(mapStateToProps, {
  getIdea,
})(
  reduxForm({
    form: 'ideaForm',
    enableReinitialize: true,
  })(IdeaForm)
)
