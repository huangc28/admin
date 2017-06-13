import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Field, Form, reduxForm } from 'redux-form'
import {
  TextField,
  AutoComplete,
} from 'redux-form-material-ui'
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper'
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

const validate = values => {
  console.log('BRYAN: validation', values)
}

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
      selectedSupplierId: null,

      // step locks
      stepOneLock: true,
    }
  }

  componentDidMount = () => {
    const { onMount } = this.props

    if (onMount) {
      onMount()
    }
  }

  onNext = () => {
    // if step < 3, increase step number.
    const {
      stepIndex,
    } = this.state

    const {
      onStepProceed,
      submit,
    } = this.props

    onStepProceed(stepIndex)

    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= FINISHED_STEP,
    })

    submit('purchaseOrderForm')
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

    const supplierId = getSupplierIdByName(suppliersData, searchText)

    this.setState({
      selectedSupplierId: supplierId,
    })
  }

  onInputSupplier = evt => {
    const {
      searchSuppliers,
    } = this.props

    const { value } = evt.target

    // search suppliers, store them into supplier reducer.
    if (value.length > 1) {
      searchSuppliers(value)
    }
  }

  // @TODO bugs!
  onInputSupply = evt => {
    const { searchSupply } = this.props

    const { selectedSupplierId } = this.state

    const { value } = evt.target

    // get the current supply id.
    if (value.length > 1 && !!selectedSupplierId) {
      searchSupply(selectedSupplierId, value)
    }
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

    return (
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
              name="supplier"
              hintText="Supplier"
              filter={AutoComplete.fuzzyFilter}
              fullWidth
              component={AutoComplete}
              dataSource={suppliersDataSource}
              onNewRequest={this.onNewRequestSupplier}
            />

            {/* disable supply field when supplier is undecided */}
            <Field
              onInput={this.onInputSupply}
              name="productName"
              hintText="Supply"
              filter={AutoComplete.fuzzyFilter}
              fullWidth
              component={AutoComplete}
              dataSource={supplyDataSource}
              onNewRequest={this.onNewRequestSupply}
            />
          </blockquote>
        </div>
      </div>
    )
  }

  renderPriceStep = step => (
    <div>
      {/* Quantity */}
      <div className={formStyles.fieldContainer}>
        <Field
          name="quantity"
          hintText="Quantity"
          underlineShow={false}
          component={TextField}
          // validate={[(...args) => { console.log('args', args, step) }]}
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
      onSubmitCallback,
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
        <Form
          onSubmit={handleSubmit(onSubmitCallback)}
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
        </Form>
      </div>
    )
  }
}

PurchaseOrderForm.propTypes = {
  handleSubmit: PropTypes.func,

  searchSuppliers: PropTypes.func,
  searchSupply: PropTypes.func,
  submit: PropTypes.func,
  suppliersData: PropTypes.array,
  suppliersDataSource: PropTypes.array,

  supplyData: PropTypes.array,
  supplyDataSource: PropTypes.array,

  onMount: PropTypes.func,
  onStepProceed: PropTypes.func,
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
  const {
    supplier,
    supply,
  } = formData

  return {
    suppliersData: getSupplierSearchResult(state),
    suppliersDataSource: getSupplierDataSource(state),
    supplyData: getSupplySearchResult(state),
    supplyDataSource: getSupplyDataSource(state),
    initialValues: {
      ...formData,
      supplier: (supplier && supplier.name) || null,
      productName: (supply && supply.product_name) || null,
    },
  }
}

export default connect(mapStateToProps, {
  searchSuppliers,
  searchSupply,
})(
  reduxForm({
    form: 'purchaseOrderForm',
    enableReinitialize: true,
    validate,
  })(PurchaseOrderForm)
)
