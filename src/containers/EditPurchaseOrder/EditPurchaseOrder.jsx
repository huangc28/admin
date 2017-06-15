import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import {
  SUPPLIER_STEP,
  PRICE_STEP,
  TRACKING_STEP,
} from '../../constants/PurchaseOrderStatus'
import {
  fetchPurchaseOrder,
  editPurchaseOrder,
} from '../../redux/purchaseOrder.js'
import ControllButtonBar from '../../components/ControllButtonBar'
import PurchaseOrderStepForm from '../../components/forms/PurchaseOrderStepForm'

class PurchaseOrder extends Component {
  constructor () {
    super()

    this.state = {
      step: 0,
    }
  }

  onSubmit = values => {
    const {
      params: {
        orderId,
      },
      editPurchaseOrder,
    } = this.props

    const {
      step,
    } = this.state

    // dispatch edit purchase order action.
    if (step === SUPPLIER_STEP) {
      // if page refreshed, selectedSupplierId and selectedSupplyId
      // will be refreshed. Thus, we have to retrieve both id from text
      // again.
      const {
        supplier: {
          id: supplierId,
        } = {},
        supply: {
          id: supplyId,
        } = {},
      } = values

      editPurchaseOrder({
        id: orderId,
        step: step + 1,
        supplierId,
        supplyId,
      })
    }

    if (step === PRICE_STEP) {
      const {
        price,
        quantity,
        shippingCost,
      } = values

      // price
      // quantity
      // shippingCost
      editPurchaseOrder({
        id: orderId,
        step: step + 1,
        price,
        quantity,
        shippingCost,
      })
    }

    if (step === TRACKING_STEP) {
      const {
        shippingCarrier,
        trackingNumber,
        transactionNumber,
      } = values

      editPurchaseOrder({
        id: orderId,
        step: step + 1,
        shippingCarrier,
        trackingNumber,
        transactionNumber,
      })
    }
  }

  onStepChange = step => {
    this.setState({ step })
  }

  onMount = () => {
    const {
      fetchPurchaseOrder,
      params: {
        orderId,
      },
    } = this.props

    fetchPurchaseOrder(orderId)
  }

  render () {
    return (
      <div>
        <ControllButtonBar
          onBack={
            () => browserHistory.push('/erp/procurement/purchase-order')
          }
        />

        <PurchaseOrderStepForm
          onMount={this.onMount}
          onSubmit={this.onSubmit}
          onStepChange={this.onStepChange}
        />
      </div>
    )
  }
}

PurchaseOrder.propTypes = {
  editPurchaseOrder: PropTypes.func,
  fetchPurchaseOrder: PropTypes.func,
  params: PropTypes.shape({
    orderId: PropTypes.string,
  }),
}

export default connect(null, {
  fetchPurchaseOrder,
  editPurchaseOrder,
})(PurchaseOrder)
