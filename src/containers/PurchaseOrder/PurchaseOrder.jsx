import React, { PropTypes } from 'react'
import { browserHistory } from 'react-router'

import Submitable from '../../components/Submitable'
import ControllButtonBar from '../../components/ControllButtonBar'
import PurchaseOrderForm from '../../components/forms/PurchaseOrderForm'

const PurchaseOrder = ({ params: { orderId } }) => (
  <div>
    <ControllButtonBar
      onBack={
        () => browserHistory.push('/erp/procurement/purchase-order')
      }
    />

    <PurchaseOrderForm />

    {/* actions */}
    <Submitable
      formName="purchaseOrderForm"
      showEditButton
      onEdit={
        () => browserHistory.push(`/erp/procurement/purchase-order/${orderId}`)
      }
    />
  </div>
)

PurchaseOrder.propTypes = {
  params: PropTypes.shape({
    orderId: PropTypes.string,
  }),
}

export default PurchaseOrder
