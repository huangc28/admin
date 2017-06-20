import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper'

import PoStepOne from './PoStepOne'
import PoStepTwo from './PoStepTwo'
import PoStepThree from './PoStepThree'
import PoStepFour from './PoStepFour'

import {
  SUPPLIER_STEP,
  PRICE_STEP,
  TRACKING_STEP,
  FINISHED_STEP,
} from '../../../constants/purchaseOrderStatus'

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
      stepIndex: SUPPLIER_STEP,

      stepOneData: {
        approverUserId: '',
        supplierName: '',
        supplierId: '',
        supplyName: '',
        supplyId: '',
      },

      stepTwoData: {
        quantity: '',
        price: '',
        shippingCost: '',
      },

      stepThreeData: {
        shippingCarrier: '',
        trackingNumber: '',
        transactionNumber: '',
      },
    }
  }

  componentDidMount = () => {
    const { onMount } = this.props

    if (onMount) {
      onMount()
    }
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.initialValues !== this.props.initialValues) {
      const {
        id,
        approverUserId,
        supplier: {
          name: supplierName,
          id: supplierId,
        },
        supply: {
          product_name: supplyName,
          id: supplyId,
        },
        quantity,
        price,
        shippingCost,
        shippingCarrier,
        trackingNumber,
        transactionNumber,
        step,
      } = nextProps.initialValues

      this.setState({
        stepIndex: step,
        stepOneData: {
          id,
          approverUserId,
          supplierName,
          supplierId,
          supplyName,
          supplyId,
        },

        stepTwoData: {
          id,
          quantity,
          price,
          shippingCost,
        },

        stepThreeData: {
          id,
          shippingCarrier,
          trackingNumber,
          transactionNumber,
        },
      })
    }
  }

  onNext = () => {
    // if step < 3, increase step number.
    this.setState({
      stepIndex: this.state.stepIndex + 1,
    })
  }

  onPrev = () => {
    this.setState({
      stepIndex: this.state.stepIndex - 1,
    })
  }

  render () {
    const {
      stepIndex,
      stepOneData,
      stepTwoData,
      stepThreeData,
    } = this.state

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
        {
          stepIndex === SUPPLIER_STEP
            ? (<PoStepOne
              formData={stepOneData}
              onNext={this.onNext}
            />)
            : ''
        }

        {
          stepIndex === PRICE_STEP
            ? (<PoStepTwo
              formData={stepTwoData}
              onNext={this.onNext}
              onPrev={this.onPrev}
            />)
            : ''
        }

        {
          stepIndex === TRACKING_STEP
            ? (<PoStepThree
              formData={stepThreeData}
              onNext={this.onNext}
              onPrev={this.onPrev}
            />)
            : ''
        }

        {
          stepIndex === FINISHED_STEP
            ? (<PoStepFour />)
            : ''
        }
      </div>
    )
  }
}

PurchaseOrderForm.propTypes = {
  initialValues: PropTypes.object,

  submit: PropTypes.func,

  onMount: PropTypes.func,
  onStepChange: PropTypes.func,
  onSubmit: PropTypes.func,
}

const mapStateToProps = state => ({
  initialValues: state.initFormData.formData,
})

export default connect(mapStateToProps, null)(PurchaseOrderForm)
