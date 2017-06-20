import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import ControllButtonBar from '../../components/ControllButtonBar'
import { fetchPurchaseOrder } from '../../redux/purchaseOrder'
import PurchaseOrderForm from '../../components/forms/PurchaseOrderForm'
import Submitable from '../../components/Submitable'

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
    const {
      params: {
        orderId,
      },
      router: {
        goBack,
      },
    } = this.props

    return (
      <div>
        <ControllButtonBar
          onBack={goBack}
        />

        <PurchaseOrderForm
          onMount={this.onMount}
          disabled
        />

        <Submitable
          formName="purchaseOrderForm"
          showEditButton
          onEdit={() => {
            browserHistory.push(`/erp/procurement/purchase-order/${orderId}/edit`)
          }}
        />
      </div>
    )
  }
}

PurchaseOrder.propTypes = {
  fetchPurchaseOrder: PropTypes.func,
  params: PropTypes.shape({
    orderId: PropTypes.string,
  }),
  router: PropTypes.shape({
    goBack: PropTypes.func,
  }),
}

export default connect(null, {
  fetchPurchaseOrder,
})(PurchaseOrder)
