import React from 'react'
import { browserHistory } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'

import ControllButtonBar from '../../components/ControllButtonBar'
import PurchaseOrderForm from '../../components/forms/PurchaseOrderForm'
import styles from './PurchaseOrder.css'

const PurchaseOrder = () => (
  <div className = {styles.root}>
    <div className = {styles.back}>
      <ControllButtonBar
        onBack = {() => browserHistory.push('/erp/dashboard')}
      />
    </div>

    <div className = {styles.content}>
      <PurchaseOrderForm />
    </div>

    {/* actions */}
    <div className = {styles.confirmButton}>
      <RaisedButton
        label = "confirm Edit"
        primary
      />
    </div>
  </div>
)

export default PurchaseOrder
