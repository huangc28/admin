import React from 'react'
import TextField from 'material-ui/TextField'

const PurchaseOrderForm = () => (
  <div>
    <TextField
      hintText = "Quantity"
      floatingLabelText = "Quantity"
      fullWidth
    />
    <TextField
      hintText = "Internal SKU"
      floatingLabelText = "Internal SKU"
      fullWidth
    />
    <TextField
      hintText = "External SKU"
      floatingLabelText = "External SKU"
      fullWidth
    />
    <TextField
      hintText = "Order Number"
      floatingLabelText = "Order Number"
      fullWidth
    />
    <TextField
      hintText = "Shipping Carrier"
      floatingLabelText = "Shipping Carrier"
      fullWidth
    />
    <TextField
      hintText = "Tracking Number"
      floatingLabelText = "Tracking Number"
      fullWidth
    />
  </div>
)

export default PurchaseOrderForm