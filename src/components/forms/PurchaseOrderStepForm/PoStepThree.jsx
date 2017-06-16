import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

import { TRACKING_STEP } from '../../../constants/PurchaseOrderStatus'
import styles from './PurchaseOrderStepForm.css'
import formStyles from '../../../styles/form.css'
import { editPurchaseOrder } from '../../../redux/purchaseOrder'

class PoStepThree extends Component {

  state = {
    id: '',
    shippingCarrier: '',
    trackingNumber: '',
    transactionNumber: '',
  }

  componentDidMount = () => {
    this.setState({
      ...this.props.formData,
    })
  }

  onSubmit = () => {
    const {
      onNext,
      editPurchaseOrder,
    } = this.props

    const {
      id,
      shippingCarrier,
      trackingNumber,
      transactionNumber,
    } = this.state

    // @TODO these two can be wrapped into one callback, passed down by parent component.
    onNext()

    editPurchaseOrder({
      step: TRACKING_STEP + 1,
      id,
      shippingCarrier,
      trackingNumber,
      transactionNumber,
    })
  }

  onInputShippingCarrier = evt => {
    this.setState({
      shippingCarrier: evt.target.value,
    })
  }

  onInputTrackingNumber = evt => {
    this.setState({
      trackingNumber: evt.target.value,
    })
  }

  onInputTransactionNumber = evt => {
    this.setState({
      transactionNumber: evt.target.value,
    })
  }

  render () {
    const {
      shippingCarrier,
      trackingNumber,
      transactionNumber,
    } = this.state

    const { onPrev } = this.props

    return (
      <form className={formStyles.form}>
        <div className={styles.content}>
          {/* shipping */}
          <div>
            <h3> Shipping </h3>
            <blockquote>
              <TextField
                name="shippingCarrier"
                hintText="Shipping Carrier"
                fullWidth
                value={shippingCarrier}
                onInput={this.onInputShippingCarrier}
              />

              <TextField
                name="trackingNumber"
                hintText="Tracking Number"
                fullWidth
                value={trackingNumber}
                onInput={this.onInputTrackingNumber}
              />
            </blockquote>
          </div>

          {/* transaction number */}
          <div>
            <h3> Transaction </h3>
            <blockquote>
              <TextField
                name="transactionNumber"
                hintText="Transaction Number"
                fullWidth
                value={transactionNumber}
                onInput={this.onInputTransactionNumber}
              />
            </blockquote>
          </div>

          {/* control button bar */}
          <div className={styles.btnBar}>
            <FlatButton
              label="Back"
              onTouchTap={onPrev}
            />
            <RaisedButton
              label="Confirm"
              primary
              onTouchTap={this.onSubmit}
            />
          </div>
        </div>
      </form>
    )
  }
}

PoStepThree.propTypes = {
  formData: PropTypes.object.isRequired,

  editPurchaseOrder: PropTypes.func,

  onNext: PropTypes.func,
  onPrev: PropTypes.func,
}

export default connect(null, {
  editPurchaseOrder,
})(PoStepThree)
