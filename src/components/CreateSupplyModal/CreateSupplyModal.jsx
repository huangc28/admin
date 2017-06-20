import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'

import { createSupply } from '../../redux/supply'
import Submitable from '../Submitable'
import SupplyForm from '../forms/SupplyForm'

class CreateSupplyModal extends Component {
  state = {
    open: false,
  }

  onOpen = () => {
    this.setState({
      open: true,
    })
  }

  onSubmit = value => {
    const { createSupply } = this.props

    createSupply(value)

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
          label="Create Supply"
          onTouchTap={this.onOpen}
        />

        <Dialog
          title="Create Supply"
          open={open}
          onRequestClose={this.close}
          autoScrollBodyContent
        >
          <SupplyForm
            onSubmitCallback={this.onSubmit}
          />

          <Submitable
            formName="supplyForm"
            showSaveButton
          />
        </Dialog>
      </div>
    )
  }
}

CreateSupplyModal.propTypes = {
  createSupply: PropTypes.func,
}

export default connect(null, {
  createSupply,
})(CreateSupplyModal)
