import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider'

import { isInteger, isFloat } from '../../../utils/validations'
import styles from './PurchaseOrderStepForm.css'
import { PRICE_STEP } from '../../../constants/purchaseOrderStatus'
import formStyles from '../../../styles/form.css'
import { editPurchaseOrder } from '../../../redux/purchaseOrder'

/**
 * @param {Float} quantity
 * @param {Float} price
 * @param {Integer} shippingCost
 * @returns {Float}
 */
export const getTotalPrice = (quantity = 0, price = 0, shippingCost = 0) => {
  const pQuantity = (typeof quantity === 'string')
    ? parseFloat(quantity)
    : quantity

  const pPrice = (typeof price === 'string')
    ? parseFloat(price)
    : price

  const pShippingCost = (typeof shippingCost === 'string')
    ? parseFloat(shippingCost)
    : shippingCost

  const result = (pQuantity * pPrice) + pShippingCost

  const rounded = Math.round(result * 100) / 100

  return rounded
}

class PoStepTwo extends Component {

  state = {
    id: '',
    lock: false,
    quantity: '',
    price: '',
    shippingCost: '',
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
      quantity,
      price,
      shippingCost,
    } = this.state

    onNext()

    editPurchaseOrder({
      step: PRICE_STEP + 1,
      id,
      quantity,
      price,
      shippingCost,
    })
  }

  onInputQuantity = evt => {
    this.setState({
      quantity: evt.target.value,
    }, () => this.validateLock())
  }

  onInputPrice = evt => {
    this.setState({
      price: evt.target.value,
    }, () => this.validateLock())
  }

  onInputShippingCost = evt => {
    this.setState({
      shippingCost: evt.target.value,
    }, () => this.validateLock())
  }

  /**
   * 1. Quantity ---> integer and exists
   * 2. Price ---> float
   * 3. shipping cost ---> float
   */
  validateLock = () => {
    const {
      quantity,
      price,
      shippingCost,
    } = this.state

    // check quantity is integer and exists
    if (!isInteger(quantity)) {
      this.setState({
        lock: true,
      })

      return
    }

    // check price is float and exists
    if (!isFloat(price) && !isInteger(price)) {
      this.setState({
        lock: true,
      })

      return
    }

    // check shipping cost is integer and exists
    if (!isFloat(shippingCost) && !isInteger(shippingCost)) {
      this.setState({
        lock: true,
      })

      return
    }

    this.setState({
      lock: false,
    })
  }

  render () {
    const {
      quantity,
      price,
      shippingCost,
      lock,
    } = this.state

    const {
      onPrev,
    } = this.props

    return (
      <form className={formStyles.form}>
        <div className={styles.content}>
          {/* Quantity */}
          <div className={formStyles.fieldContainer}>
            <TextField
              name="quantity"
              hintText="Quantity"
              underlineShow={false}
              value={quantity}
              onInput={this.onInputQuantity}
            />
          </div>
          <Divider />

          {/* Price */}
          <div className={formStyles.fieldContainer}>
            <TextField
              name="price"
              hintText="Price"
              underlineShow={false}
              value={price}
              onInput={this.onInputPrice}
            />
          </div>
          <Divider />

          {/* Shipping Fee */}
          <div className={formStyles.fieldContainer}>
            <TextField
              name="shippingCost"
              hintText="Shipping Cost"
              underlineShow={false}
              value={shippingCost}
              onInput={this.onInputShippingCost}
            />
          </div>
          <Divider />
          <div className={styles.cost}>
            {
              getTotalPrice(quantity, price, shippingCost)
            }
          </div>

          {/* control button bar */}
          <div className={styles.btnBar}>
            <FlatButton
              label="Back"
              onTouchTap={onPrev}
            />
            <RaisedButton
              label="Next"
              primary
              onTouchTap={this.onSubmit}
              disabled={lock}
            />
          </div>
        </div>
      </form>
    )
  }
}

PoStepTwo.propTypes = {
  formData: PropTypes.object.isRequired,

  editPurchaseOrder: PropTypes.func,

  onNext: PropTypes.func,
  onPrev: PropTypes.func,
}

export default connect(null, {
  editPurchaseOrder,
})(PoStepTwo)
