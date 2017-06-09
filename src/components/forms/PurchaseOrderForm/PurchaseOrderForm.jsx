import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider'

import styles from './PurchaseOrderForm.css'
import formStyles from '../../../styles/form.css'

const SUPPLIER_STEP = 0
const PRICE_STEP = 1
const TRACKING_STEP = 2
const FINISHED_STEP = 3

const STEPS = ['Supplier', 'Price', 'Tracking', 'Finished']

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

  onNext = () => {
    // if step < 3, increase step number.
    const { stepIndex } = this.state

    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= FINISHED_STEP,
    })
  }

  onPrev = () => {
    const { stepIndex } = this.state

    if (stepIndex > 0) {
      this.setState({
        stepIndex: stepIndex - 1,
      })
    }
  }

  onInputSupplier = evt => {
    console.log('auto complete supplier input')
  }

  onInputSupply = evt => {
    console.log('auto complete supply input')
  }

  onSave = values => {
    console.log('values', values)
  }

  renderFinishedContent = () => (
    <div className={styles.fulfilledSign}>
      FULFILLED
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
      case FINISHED_STEP:
        return this.renderFinishedContent()
      default:
        return this.renderSupplierStep()
    }
  }

  renderSupplierStep = () => (
    <div>
      {/* approve */}
      <div className={formStyles.fieldContainer}>
        <Field
          disabled
          name="approver"
          hintText="Approver"
          fullWidth
          component={TextField}
        />
      </div>

      <div>
        <h3> Place order from </h3>
        <blockquote>
          <Field
            onInput={this.onInputSupplier}
            name="supplierId"
            hintText="Supplier"
            fullWidth
            component={TextField}
          />

          <Field
            onInput={this.onInputSupply}
            name="internalSku"
            hintText="Supply"
            fullWidth
            component={TextField}
          />
        </blockquote>
      </div>
    </div>
  )

  renderPriceStep = () => (
    <div>
      {/* Quantity */}
      <div className={formStyles.fieldContainer}>
        <Field
          name="quantity"
          hintText="Quantity"
          underlineShow={false}
          component={TextField}
        />
      </div>
      <Divider />

      {/* Price */}
      <div className={formStyles.fieldContainer}>
        <Field
          name="price"
          hintText="Price"
          underlineShow={false}
          component={TextField}
        />
      </div>
      <Divider />

      {/* Shipping Fee */}
      <div className={formStyles.fieldContainer}>
        <Field
          name="shippingCost"
          hintText="Shipping Cost"
          underlineShow={false}
          component={TextField}
        />
      </div>
      <Divider />
      <div className={styles.cost}>
        100
      </div>
    </div>
  )

  renderTrackingStep = () => (
    <div>
      {/* shipping */}
      <div>
        <h3> Shipping </h3>
        <blockquote>
          <Field
            name="shippingCarrier"
            hintText="Shipping Carrier"
            fullWidth
            component={TextField}
          />

          <Field
            name="trackingNumber"
            hintText="Tracking Number"
            fullWidth
            component={TextField}
          />
        </blockquote>
      </div>

      {/* transaction number */}
      <div>
        <h3> Transaction </h3>
        <blockquote>
          <Field
            name="transactionNumber"
            hintText="Transaction Number"
            fullWidth
            component={TextField}
          />
        </blockquote>
      </div>
    </div>
  )

  render () {
    const {
      finished,
      stepIndex,
    } = this.state

    const {
      handleSubmit,
    } = this.props

    return (
      <div>
        {/* stepper */}
        <Stepper activeStep={stepIndex}>
          {
            STEPS.map((step, index) => (
              <Step key={index}>
                <StepLabel>
                  { step }
                </StepLabel>
              </Step>
            ))
          }
        </Stepper>

        {/* step content */}
        <form
          onSubmit={handleSubmit}
          className={formStyles.form}
        >
          <div className={styles.content}>
            {
              finished
                ? this.renderFinishedContent()
                : this.renderStepContent(stepIndex)
            }

            {/* control buttons */}
            {
              stepIndex === FINISHED_STEP
                ? ''
                : (
                  <div className={styles.btnBar}>
                    <FlatButton
                      label="Back"
                      disabled={stepIndex === SUPPLIER_STEP}
                      onTouchTap={this.onPrev}
                    />
                    <RaisedButton
                      type="submit"
                      label={
                        stepIndex === TRACKING_STEP
                          ? 'Confirm'
                          : 'Next'
                      }
                      primary
                      onTouchTap={this.onNext}
                    />
                  </div>
                )
            }
          </div>
        </form>
      </div>
    )
  }
}

PurchaseOrderForm.propTypes = {
  handleSubmit: PropTypes.func,
}

export default connect(null, null)(
  reduxForm({
    form: 'purchaseOrderForm',
  })(PurchaseOrderForm)
)
