import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Form, Field, reduxForm } from 'redux-form'
import {
  Checkbox,
  TextField,
} from 'redux-form-material-ui'

import styles from './IdeaForm.css'
import { loadIdea } from '../../../actions/ideas'

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
      loadIdea,
      refId,
    } = this.props

    if (refId) {
      loadIdea(refId)
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
  handleSubmit: PropTypes.func,

  /**
   * Load idea data.
   * use the data to reinitialize form.
   */
  loadIdea: PropTypes.func,

  /**
   * Use refId to load existing idea data.
   */
  refId: PropTypes.string,
  reset: PropTypes.func,

  /**
   * We have to name this function this way,
   * "onSubmit" conflicts with reduc-form native function name.
   */
  onSubmitCallback: PropTypes.func,
}

const mapStateToProps = state => ({
  initialValues: state.initFormData.formData,
})

export default connect(mapStateToProps, {
  loadIdea,
})(
  reduxForm({
    form: 'ideaForm',
    enableReinitialize: true,
  })(IdeaForm)
)
