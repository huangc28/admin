import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Field, Form, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import Divider from 'material-ui/Divider'

import formStyles from '../../../styles/form.css'
import { deleteInitFormData } from '../../../redux/initFormData'
import styles from './PurchaseOrderForm.css'

class PurchaseOrderForm extends Component {

  componentDidMount = () => {
    const { onMount } = this.props

    if (onMount) {
      onMount()
    }
  }

  componentWillUnmount = () => {
    this.props.deleteInitFormData()
  }

  render () {
    const {
      disabled,
      handleSubmit,
      onSubmitCallback,
    } = this.props

    return (
      <Form
        className={formStyles.form}
        onSubmit={handleSubmit(onSubmitCallback)}
      >
        {/* approver */}
        <div className={formStyles.fieldContainer}>
          <Field
            disabled
            name="approverId"
            hintText="Approver"
            fullWidth
            component={TextField}
          />
        </div>

        {/* suppliers */}
        <div>
          <h3> Place order from </h3>
          <blockquote>
            <Field
              disabled={disabled}
              onInput={this.onInputSupplier}
              name="supplier"
              hintText="Supplier"
              fullWidth
              component={TextField}
            />

            <Field
              disabled={disabled}
              onInput={this.onInputSupply}
              name="internalSku"
              hintText="Supply"
              fullWidth
              component={TextField}
            />
          </blockquote>
        </div>

        {/* price */}
        <div>
          <h3> Price </h3>
          <blockquote>
            {/* Quantity */}
            <div className={formStyles.fieldContainer}>
              <Field
                disabled={disabled}
                name="quantity"
                hintText="Quantity"
                underlineShow={false}
                component={TextField}
              />
            </div>
            <Divider />

            {/* Price */}
            <div className={formStyles.fieldContainer}>
              <Field
                disabled={disabled}
                name="price"
                hintText="Price"
                underlineShow={false}
                component={TextField}
              />
            </div>
            <Divider />

            {/* Shipping Fee */}
            <div className={formStyles.fieldContainer}>
              <Field
                disabled={disabled}
                name="shippingCost"
                hintText="Shipping Cost"
                underlineShow={false}
                component={TextField}
              />
            </div>
            <Divider />
            <div className={styles.cost}>
              Total: 100
            </div>
          </blockquote>
        </div>

        {/* tracking */}
        <div>
          <h3> Shipping </h3>
          <blockquote>
            <Field
              disabled={disabled}
              name="shippingCarrier"
              hintText="Shipping Carrier"
              fullWidth
              component={TextField}
            />

            <Field
              disabled={disabled}
              name="trackingNumber"
              hintText="Tracking Number"
              fullWidth
              component={TextField}
            />
          </blockquote>
        </div>

        {/* transaction number */}
        <div>
          <h3> Transaction </h3>
          <blockquote>
            <Field
              disabled={disabled}
              name="orderNumber"
              hintText="Transaction Number"
              fullWidth
              component={TextField}
            />
          </blockquote>
        </div>
      </Form>
    )
  }
}

PurchaseOrderForm.propTypes = {
  deleteInitFormData: PropTypes.func,
  disabled: PropTypes.bool,
  handleSubmit: PropTypes.func,
  onMount: PropTypes.func,
  onSubmitCallback: PropTypes.func,
}

const mapStateToProps = state => {
  const { formData } = state.initFormData

  return {
    initialValues: {
      ...formData,
      supplier: (
        formData &&
        formData.ideaSample &&
        formData.ideaSample.supplier
      ) || null,
    },
  }
}

export default connect(mapStateToProps, {
  deleteInitFormData,
})(
  reduxForm({
    form: 'purchaseOrderForm',
    enableReinitialize: true,
  })(PurchaseOrderForm)
)
