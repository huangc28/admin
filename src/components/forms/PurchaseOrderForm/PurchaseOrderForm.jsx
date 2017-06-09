import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Form, Field, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

import Submitable from '../../../components/Submitable'
import styles from './PurchaseOrderForm.css'
import formStyle from '../../../styles/form.css'

const SUPPLIER_STEP = 0
const PRICE_STEP = 1
const TRACKING_STEP = 2
const FINISHED_STEP = 3

/**
 * steppers:
 *  step 1 (supplier):
 *    - show approver (not editable)
 *    - ask user to prompt: supplier (supports auto-complete)
 *    - ask user to prompt: supply sku (supports auto-complete)
 *  step 2 (price):
 *    - show editable quantity
 *    - show editable price
 *    - show total price of this purchase order
 *  step 3 (tracking):
 *    - ask user to prompt: transaction number
 *    - ask user to prompt shipping info:
 *      - carrier
 *      - tracking number
 */
class PurchaseOrderForm extends Component {
  constructor () {
    super()

    this.state = {
      finished: false,
      stepIndex: SUPPLIER_STEP,
    }
  }



  onSave = values => {
    console.log('values', values)
  }

  renderFinishedContent = () => (
    <div>
      This po is fulfilled
    </div>
  )

  renderStepContent = stepIndex => {
    switch (stepIndex) {
      case SUPPLIER_STEP:
        return this.renderSupplierStep()
      case PRICE_STEP:
        return this.renderPriceStep()
      case TRACKING_STEP:
        return this.renderTrackingStep()
      default:
        return this.renderSupplierStep()
    }
  }

  renderSupplierStep = () => {
    return (
      <div>
        supplier stop
      </div>
    )
  }

  renderPriceStep = () => {
    return (
      <div>
        price step
      </div>
    )
  }

  renderTrackingStep = () => {
    return (
      <div>
        Tracking step
      </div>
    )
  }

  render () {
    const {
      finished,
      stepIndex,
    } = this.state

    const {
      onSubmit,
    } = this.props

    return (
      <div>
        {/* stepper */}
        <Stepper activeStop={stepIndex}>
          <Step>
            <StepLabel>
              Supplier
            </StepLabel>
          </Step>
          <Step>
            <StepLabel>
              Price
            </StepLabel>
          </Step>
          <Step>
            <StepLabel>
              Tracking
            </StepLabel>
          </Step>
        </Stepper>

        {/* step content */}
        <Form>
          {
            finished
              ? this.renderFinishedContent()
              : this.renderStepContent(stepIndex)
          }

          {/* control buttons */}
          {
            stepIndex === TRACKING_STEP
              ? ''
              : (
                <div>
                  <FlatButton
                    label="Back"
                    disabled={stepIndex === SUPPLIER_STEP}
                    onTouchTap={this.handlePrev}
                  />
                  <RaisedButton
                    label="Next"
                    primary
                    onTouchTap={this.handleNext}
                  />
                </div>
              )
          }
        </Form>
      </div>
    )
  }
}

PurchaseOrderForm.propTypes = {
  onSubmit: PropTypes.func,
}

export default connect(null, null)(
  reduxForm({
    form: 'purchaseOrderForm',
  })(PurchaseOrderForm)
)
