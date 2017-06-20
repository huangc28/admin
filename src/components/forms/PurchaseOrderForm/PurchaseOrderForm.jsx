import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider'

import { getTotalPrice } from '../PurchaseOrderStepForm/PoStepTwo'
import formStyles from '../../../styles/form.css'
import styles from './PurchaseOrderForm.css'

class PurchaseOrderForm extends Component {

  state = {
    approverUserId: '',
    supplierName: '',
    supplyName: '',
    quantity: '',
    price: '',
    shippingCost: '',
    shippingCarrier: '',
    trackingNumber: '',
    transactionNumber: '',
  }

  componentDidMount = () => {
    const { onMount } = this.props

    if (onMount) {
      onMount()
    }
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.initialValues !== this.props.initialValues) {
      // initialize purchase order form
      const {
        approverUserId,
        supplier: {
          name: supplierName,
        },
        supply: {
          product_name: supplyName,
        },
        quantity,
        price,
        shippingCost,
        shippingCarrier,
        trackingNumber,
        transactionNumber,
      } = nextProps.initialValues

      this.setState({
        approverUserId,
        supplierName,
        supplyName,
        quantity,
        price,
        shippingCost,
        shippingCarrier,
        trackingNumber,
        transactionNumber,
      })
    }
  }

  render () {
    const {
      disabled,
    } = this.props

    const {
      approverUserId,
      supplierName,
      supplyName,
      quantity,
      price,
      shippingCost,
      shippingCarrier,
      trackingNumber,
      transactionNumber,
    } = this.state

    return (
      <form className={formStyles.form}>
        {/* approver */}
        <div className={formStyles.fieldContainer}>
          <TextField
            disabled={disabled}
            hintText="Approver"
            fullWidth
            value={approverUserId}
          />
        </div>

        {/* suppliers */}
        <div>
          <h3> Place order from </h3>
          <blockquote>
            <TextField
              disabled={disabled}
              hintText="Supplier"
              fullWidth
              value={supplierName}
            />

            <TextField
              disabled={disabled}
              hintText="Supply"
              fullWidth
              value={supplyName}
            />
          </blockquote>
        </div>

        {/* price */}
        <div>
          <h3> Price </h3>
          <blockquote>
            {/* Quantity */}
            <div className={formStyles.fieldContainer}>
              <TextField
                disabled={disabled}
                name="quantity"
                hintText="Quantity"
                underlineShow={false}
                value={quantity}
              />
            </div>
            <Divider />

            {/* Price */}
            <div className={formStyles.fieldContainer}>
              <TextField
                disabled={disabled}
                hintText="Price"
                underlineShow={false}
                value={price}
              />
            </div>
            <Divider />

            {/* Shipping Fee */}
            <div className={formStyles.fieldContainer}>
              <TextField
                disabled={disabled}
                hintText="Shipping Cost"
                underlineShow={false}
                value={shippingCost}
              />
            </div>
            <Divider />
            <div className={styles.cost}>
              {
                getTotalPrice(quantity, price, shippingCost)
              }
            </div>
          </blockquote>
        </div>

        {/* tracking */}
        <div>
          <h3> Shipping </h3>
          <blockquote>
            <TextField
              disabled={disabled}
              hintText="Shipping Carrier"
              fullWidth
              value={shippingCarrier}
            />

            <TextField
              disabled={disabled}
              hintText="Tracking Number"
              fullWidth
              value={trackingNumber}
            />
          </blockquote>
        </div>

        {/* transaction number */}
        <div>
          <h3> Transaction </h3>
          <blockquote>
            <TextField
              disabled={disabled}
              hintText="Transaction Number"
              fullWidth
              value={transactionNumber}
            />
          </blockquote>
        </div>
      </form>
    )
  }
}

PurchaseOrderForm.propTypes = {
  disabled: PropTypes.bool,
  handleSubmit: PropTypes.func,
  initialValues: PropTypes.object,
  onMount: PropTypes.func,
}

const mapStateToProps = state => ({
  initialValues: state.initFormData.formData,
})

export default connect(mapStateToProps, null)(PurchaseOrderForm)
