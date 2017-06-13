import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import {
  getSupplierSearchResult,
  getSupplierIdByName,
} from '../../redux/supplier'
import {
  getSupplySearchResult,
  getSupplyIdByProductName,
} from '../../redux/supply'
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
      suppliersData,
      supplyData,
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
        supplier,
        productName,
      } = values
      editPurchaseOrder({
        id: orderId,
        step,
        supplierId: getSupplierIdByName(suppliersData, supplier),
        supplyId: getSupplyIdByProductName(supplyData, productName),
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
        step,
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

      // shipping_carrier
      // tracking_number
      // transaction_number
      editPurchaseOrder({
        id: orderId,
        step,
        shippingCarrier,
        trackingNumber,
        transactionNumber,
      })
    }
  }

  onStepProceed = step => {
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
          onSubmitCallback={this.onSubmit}
          onStepProceed={this.onStepProceed}
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
  suppliersData: PropTypes.array,
  supplyData: PropTypes.array,
}

const mapStateToProps = state => ({
  suppliersData: getSupplierSearchResult(state),
  supplyData: getSupplySearchResult(state),
})

export default connect(mapStateToProps, {
  fetchPurchaseOrder,
  editPurchaseOrder,
})(PurchaseOrder)
