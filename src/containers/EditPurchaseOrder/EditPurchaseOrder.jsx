import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import styles from './EditPurchaseOrder.css'
// import * as status from '../../constants/PurchaseOrder'

// const getPurchaseOrderStatusText = {
//   [status.PURCHASE_ORDER_UNFULFILL]: 'unfulfill',
//   [status.PURCHASE_ORDER_FULFILL]: 'fulfill',
// }

class PurchaseOrderEdit extends Component {
  constructor () {
    super()

    // this.state = {
    //   status: status.PURCHASE_ORDER_UNFULFILL,
    // }
  }

  render () {
    const {
      status,
    } = this.state

    return (
      <div className={styles.root}>
        <div className={styles.fulfillInfo}>
          aa
        </div>
        <div className={styles.approverInfo}>
          <TextField
            hintText = "Approver"
            fullWidth
            disabled
          />
        </div>

        {/* supplier info */}
        <div className={styles.supplierInfo}>
          <h3> Place order from </h3>
          <blockquote>
            <TextField
              hintText = "Supplier"
              floatingLabelText = "Supplier"
              fullWidth
            />
            <TextField
              hintText = "Supply"
              floatingLabelText = "Supply"
              fullWidth
            />
          </blockquote>
        </div>

        {/* sku info */}
        <div className={styles.skuInfo}>
          <TextField
            hintText = "Sku Number"
            fullWidth
            disabled
          />
          <TextField
            hintText = "Product Name"
            fullWidth
            disabled
          />
          <TextField
            hintText = "Supply Link"
            fullWidth
            disabled
          />
          <TextField
            hintText = "Supply Contack(Mobile)"
            fullWidth
            disabled
          />
          <TextField
            hintText = "Supply Contack(Email)"
            fullWidth
            disabled
          />
        </div>

        {/* shipping info */}
        <div className={styles.shippingInfo}>
          <h3>shipping</h3>
          <blockquote>
            <TextField
              hintText = "Carrier"
              floatingLabelText = "Carrier"
              fullWidth
            />
            <TextField
              hintText = "Track Number"
              floatingLabelText = "Track Number"
              fullWidth
            />
            <TextField
              hintText = "Trans Action Number"
              floatingLabelText = "Trans Action Number"
              fullWidth
            />
          </blockquote>
        </div>

        <div className={styles.confirm}>
          <RaisedButton
            label = "confirm Edit"
            primary
          />
        </div>
      </div>
    )
  }
}

export default PurchaseOrderEdit
