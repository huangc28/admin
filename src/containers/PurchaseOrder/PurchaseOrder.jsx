import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'

import ControllButtonBar from '../../components/ControllButtonBar'
import PurchaseOrderForm from '../../components/forms/PurchaseOrderForm'

class PurchaseOrder extends Component {
  onSubmit = values => {
    const {
      params: {
        orderId,
      },
    } = this.props
    console.log('values', orderId, values)
  }

  render () {
    return (
      <div>
        <ControllButtonBar
          onBack={
            () => browserHistory.push('/erp/procurement/purchase-order')
          }
        />

        <PurchaseOrderForm
          onSubmit={this.onSubmit}
        />
      </div>
    )
  }
}

PurchaseOrder.propTypes = {
  params: PropTypes.shape({
    orderId: PropTypes.string,
  }),
}

export default PurchaseOrder
