import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'

import Submitable from '../Submitable'
import { createSupplier } from '../../redux/supplier'
import SupplierForm from '../../components/forms/SupplierForm'

/**
 * 1. name
 * 2. address
 * 3. contact
 * 4. phone
 * 5. email
 * 6. website
 */
class CreateSupplierModal extends Component {
  state = {
    open: false,
  }

  onOpen = () => {
    this.setState({
      open: true,
    })
  }

  onCancel = () => {
    this.close()
  }

  onSubmit = value => {
    const {
      createSupplier,
    } = this.props

    createSupplier(value)

    this.close()
  }

  close = () => {
    this.setState({
      open: false,
    })
  }

  render () {
    const { open } = this.state

    return (
      <div>
        <RaisedButton
          label="Create Supplier"
          onTouchTap={this.onOpen}
        />
        <Dialog
          title="Create Supplier"
          open={open}
          onRequestClose={this.close}
        >
          <SupplierForm
            onSubmitCallback={this.onSubmit}
          />

          {/* control button bar */}
          <Submitable
            formName="supplierForm"
            showSaveButton
          />
        </Dialog>
      </div>
    )
  }
}

CreateSupplierModal.propTypes = {
  createSupplier: PropTypes.func,
}

export default connect(null, {
  createSupplier,
})(CreateSupplierModal)
