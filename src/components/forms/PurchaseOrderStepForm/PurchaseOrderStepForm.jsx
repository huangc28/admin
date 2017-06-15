import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper'
import AutoComplete from 'material-ui/AutoComplete'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider'

import {
  SUPPLIER_STEP,
  PRICE_STEP,
  TRACKING_STEP,
  FINISHED_STEP,
} from '../../../constants/PurchaseOrderStatus'
import {
  searchSupply,
  getSupplySearchResult,
  getSupplyDataSource,
  getSupplyIdByProductName,
} from '../../../redux/supply'
import {
  searchSuppliers,
  getSupplierSearchResult,
  getSupplierDataSource,
  getSupplierIdByName,
} from '../../../redux/supplier'
import styles from './PurchaseOrderStepForm.css'
import formStyles from '../../../styles/form.css'

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

      // step lock
      stepOneLock: false,

      // stores the values of purchase order data.
      initialValues: {
        approverUserId: '',
        supplier: {
          name: '',
          id: '',
        },
        supply: {
          product_name: '',
          id: '',
        },
        quantity: '',
        price: '',
        shippingCost: '',
        shippingCarrier: '',
        trackingNumber: '',
        transactionNumber: '',
      },
    }
  }

  componentDidMount = () => {
    // console.log('BRYAN, this state', this.state)

    const { onMount } = this.props

    if (onMount) {
      onMount()
    }
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.initialValues !== this.props.initialValues) {
      this.setState({
        initialValues: nextProps.initialValues,
      })
    }
  }

  onNext = () => {
    // if step < 3, increase step number.
    const {
      stepIndex,
    } = this.state

    const nextStep = this.state.stepIndex + 1

    const {
      onStepProceed,
      onSubmit,
    } = this.props

    onStepProceed(nextStep)

    this.setState({
      stepIndex: nextStep,
      finished: stepIndex >= FINISHED_STEP,
    })

    onSubmit(this.state.initialValues)
  }

  onPrev = () => {
    const { stepIndex } = this.state

    if (stepIndex > 0) {
      this.setState({
        stepIndex: stepIndex - 1,
      })
    }
  }

  onNewRequestSupplier = searchText => {
    // search supplier id based on searchText.
    const { suppliersData } = this.props

    this.setState({
      initialValues: {
        ...this.state.initialValues,
        supplier: {
          ...this.state.initialValues.supplier,
          name: searchText,
          id: getSupplierIdByName(suppliersData, searchText),
        },
      },
    })
  }

  onNewRequestSupply = searchText => {
    const { supplyData } = this.props

    this.setState({
      initialValues: {
        ...this.state.initialValues,
        supply: {
          ...this.state.initialValues.supplier,
          product_name: searchText,
          id: getSupplyIdByProductName(supplyData, searchText),
        },
      },
    })
  }

  onInputSupplier = evt => {
    const {
      searchSuppliers,
    } = this.props

    const { value } = evt.target

    // if value is empty, lock step 1 confirm button
    this.validateStepOne(value)

    this.setState({
      initialValues: {
        ...this.state.initialValues,
        supplier: {
          ...this.state.initialValues.supplier,
          name: value,
        },
      },
    })

    // search suppliers, store them into supplier reducer.
    if (value.length > 1) {
      searchSuppliers(value)
    }
  }

  // @TODO bugs!
  onInputSupply = evt => {
    const { searchSupply } = this.props

    const {
      initialValues: {
        supplier: {
          id: supplierId,
        },
      },
    } = this.state

    const { value } = evt.target

    this.validateStepOne(value)

    this.setState({
      initialValues: {
        ...this.state.initialValues,
        supply: {
          ...this.state.initialValues.supply,
          product_name: value,
        },
      },
    })

    // get the current supply id.
    if (value.length > 1 && !!supplierId) {
      searchSupply(supplierId, value)
    }
  }

  onInputQuantity = evt => {
    this.setState({
      initialValues: {
        ...this.state.initialValues,
        quantity: evt.target.value,
      },
    })
  }

  onInputPrice = evt => {
    this.setState({
      initialValues: {
        ...this.state.initialValues,
        price: evt.target.value,
      },
    })
  }

  onInputShippingCost = evt => {
    this.setState({
      initialValues: {
        ...this.state.initialValues,
        shippingCost: evt.target.value,
      },
    })
  }

  validateStepOne = text => {
    if (!text || !text.length) {
      this.setState({
        stepOneLock: true,
      })

      return
    }

    this.setState({
      stepOneLock: false,
    })
  }

  renderFinishedContent = () => (
    <div className={styles.fulfilledSign}>
      FULFILLED
    </div>
  )

  renderStepContent = stepIndex => {
    switch (stepIndex) {
      case SUPPLIER_STEP:
        return this.renderSupplierStep(SUPPLIER_STEP)
      case PRICE_STEP:
        return this.renderPriceStep(PRICE_STEP)
      case TRACKING_STEP:
        return this.renderTrackingStep(TRACKING_STEP)
      case FINISHED_STEP:
        return this.renderFinishedContent(FINISHED_STEP)
      default:
        return this.renderSupplierStep(SUPPLIER_STEP)
    }
  }

  renderSupplierStep = step => {
    const {
      suppliersDataSource,
      supplyDataSource,
    } = this.props

    // destruct initialValues from initalValues
    const {
      initialValues: {
        approverUserId,
        supplier: {
          name,
        },
        supply: {
          product_name: productName,
        },
      },
    } = this.state

    // console.log('is null', approverUserId === null)
    // console.log('is undefined', approverUserId === undefined)
    // console.log('name', name)

    return (
      <div>
        {/* approve */}
        <div className={formStyles.fieldContainer}>
          <h3>
            Approver: { approverUserId }
          </h3>
        </div>

        <div>
          <h3> Place order from </h3>
          <blockquote>
            <AutoComplete
              name="supplier"
              onInput={this.onInputSupplier}
              hintText="Supplier"
              fullWidth
              dataSource={suppliersDataSource}
              onNewRequest={this.onNewRequestSupplier}
              value={name}
            />

            {/* disable supply field when supplier is undecided */}
            <AutoComplete
              name="supply"
              onInput={this.onInputSupply}
              hintText="Supply"
              fullWidth
              dataSource={supplyDataSource}
              onNewRequest={this.onNewRequestSupply}
              value={productName}
            />
          </blockquote>
        </div>
      </div>
    )
  }

  renderPriceStep = step => {
    const {
      initialValues: {
        quantity,
        price,
        shippingCost,
      },
    } = this.state

    const getTotalPrice = (quantity, price, shippingCost) => (
      (parseInt(quantity, 10) * parseInt(price, 10)) + parseInt(shippingCost, 10)
    )

    return (
      <div>
        {/* Quantity */}
        <div className={formStyles.fieldContainer}>
          <TextField
            name="quantity"
            hintText="Quantity"
            underlineShow={false}
            value={quantity}
            onInput={this.onInputQuantity}
          />
        </div>
        <Divider />

        {/* Price */}
        <div className={formStyles.fieldContainer}>
          <TextField
            name="price"
            hintText="Price"
            underlineShow={false}
            value={price}
            onInput={this.onInputPrice}
          />
        </div>
        <Divider />

        {/* Shipping Fee */}
        <div className={formStyles.fieldContainer}>
          <TextField
            name="shippingCost"
            hintText="Shipping Cost"
            underlineShow={false}
            value={shippingCost}
            onInput={this.onInputShippingCost}
          />
        </div>
        <Divider />
        <div className={styles.cost}>
          {
            getTotalPrice(quantity, price, shippingCost)
          }
        </div>
      </div>
    )
  }

  renderTrackingStep = () => {
    const {
      initialValues: {
        shippingCarrier,
        trackingNumber,
        transactionNumber,
      },
    } = this.state

    return (
      <div>
        {/* shipping */}
        <div>
          <h3> Shipping </h3>
          <blockquote>
            <TextField
              name="shippingCarrier"
              hintText="Shipping Carrier"
              fullWidth
              value={shippingCarrier}
            />

            <TextField
              name="trackingNumber"
              hintText="Tracking Number"
              fullWidth
              value={trackingNumber}
            />
          </blockquote>
        </div>

        {/* transaction number */}
        <div>
          <h3> Transaction </h3>
          <blockquote>
            <TextField
              name="transactionNumber"
              hintText="Transaction Number"
              fullWidth
              value={transactionNumber}
            />
          </blockquote>
        </div>
      </div>
    )
  }

  render () {
    const {
      finished,
      stepIndex,
      stepOneLock,
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
        <form className={formStyles.form}>
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
                      label={
                        stepIndex === TRACKING_STEP
                          ? 'Confirm'
                          : 'Next'
                      }
                      disabled={stepOneLock}
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
  initialValues: PropTypes.object,

  searchSuppliers: PropTypes.func,
  searchSupply: PropTypes.func,
  submit: PropTypes.func,
  suppliersData: PropTypes.array,
  suppliersDataSource: PropTypes.array,

  supplyData: PropTypes.array,
  supplyDataSource: PropTypes.array,

  onMount: PropTypes.func,
  onStepProceed: PropTypes.func,
  onSubmit: PropTypes.func,
  onSubmitCallback: PropTypes.func,

}

const mapStateToProps = state => {
  const { formData = {} } = state.initFormData

  /**
   * @TODO jot down the problem when:
   *  supply = null || supplier = null
   *
   *  const {
   *    supplier: {
   *      name: null
   *    } = {},
   *    supply: {
   *      name: null
   *    } = {}
   *  }
   *
   *  won't work.
   */
  // const {
  //   supplier,
  //   supply,
  // } = formData

  return {
    suppliersData: getSupplierSearchResult(state),
    suppliersDataSource: getSupplierDataSource(state),
    supplyData: getSupplySearchResult(state),
    supplyDataSource: getSupplyDataSource(state),
    initialValues: formData,
  }
}

export default connect(mapStateToProps, {
  searchSuppliers,
  searchSupply,
})(PurchaseOrderForm)
