import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import {
  fetchPurchaseOrder,
  editPurchaseOrder,
} from '../../redux/purchaseOrder.js'
import ControllButtonBar from '../../components/ControllButtonBar'
import PurchaseOrderStepForm from '../../components/forms/PurchaseOrderStepForm'

class PurchaseOrder extends Component {
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
