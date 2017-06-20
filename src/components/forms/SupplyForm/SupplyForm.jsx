import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Form, Field, reduxForm } from 'redux-form'
import {
  Checkbox,
  SelectField,
  TextField,
  AutoComplete,
} from 'redux-form-material-ui'
import MenuItem from 'material-ui/MenuItem'

import { getSupplierSearchResult } from '../../../redux/supplier'
import { searchSupply } from '../../../redux/supply'
import {
  ONLINE_PAYMENT,
  OFFLINE_PAYMENT,
} from '../../../constants/supply'
import formStyles from '../../../styles/form.css'

/**
 * 1. product_name
 * 2. external_sku
 * 3. internal_sku
 * 4. price
 * 5. payment_gateway
 * 6. estimate_shipping_cost
 * 7. interior_package_spec
 * 8. net_weight
 * 9. package_weight
 * 10. length
 * 11. width
 * 12. height
 * 13. color
 * 14. material
 * 15. battery
 * 16. fragile
 * 17. inventory_level
 * 18. supply_link
 * 19. image
 * 20. remark
 * 21. on_sale
 *
 */
class SupplyForm extends Component {
  onInputSupplierName = evt => {
    const { value } = evt.target

    if (value.length > 1) {
      // search supplier
      searchSupply(value)
    }
  }

  render () {
    const {
      handleSubmit,
      onSubmitCallback,
      supplierData,
    } = this.props

    return (
      <Form onSubmit={handleSubmit(onSubmitCallback)}>
        {/* name */}
        <div className={formStyles.fieldContainer}>
          <Field
            name="productName"
            hintText="Supply Name"
            floatingLabelText="Supply Name"
            fullWidth
            component={TextField}
          />
        </div>

        {/* supplier name */}
        <div className={formStyles.fieldContainer}>
          <Field
            name="supplierId"
            hintText="Supplier"
            floatingLabelText="Supplier"
            fullWidth
            component={AutoComplete}
            onInput={this.onInputSupplierName}
            dataSource={supplierData}
            dataSourceConfig={{
              text: 'name',
              value: 'id',
            }}
          />
        </div>

        {/* image */}
        <div className={formStyles.fieldContainer}>
          image
        </div>

        {/* external sku */}
        <div className={formStyles.fieldContainer}>
          <Field
            name="externalSku"
            hintText="external SKU"
            floatingLabelText="external SKU"
            fullWidth
            component={TextField}
          />
        </div>

        {/* internal sku */}
        <div className={formStyles.fieldContainer}>
          <Field
            name="internalSku"
            hintText="Internal SKU"
            floatingLabelText="Internal SKU"
            fullWidth
            component={TextField}
          />
        </div>

        {/* price */}
        <div className={formStyles.fieldContainer}>
          <Field
            name="price"
            hintText="Price"
            floatingLabelText="Price"
            fullWidth
            component={TextField}
          />
        </div>

        {/* payment gateway */}
        <div className={formStyles.fieldContainer}>
          <Field
            name="paymentGateway"
            floatingLabelText="Payment Gateway"
            hintText="Payment Gateway"
            component={SelectField}
          >
            <MenuItem value={ONLINE_PAYMENT} primaryText="Online" />
            <MenuItem value={OFFLINE_PAYMENT} primaryText="Offline" />
          </Field>
        </div>

        {/* estimate shipping cost */}
        <div className={formStyles.fieldContainer}>
          <Field
            name="estimateShippingCost"
            hintText="Estimate Shipping Cost"
            floatingLabelText="Estimate Shipping Cost"
            fullWidth
            component={TextField}
          />
        </div>

        {/* interior package spec */}
        <div className={formStyles.fieldContainer}>
          <Field
            name="interiorPackageSpec"
            hintText="Interior Package Spec"
            floatingLabelText="Interior Package Spec"
            fullWidth
            multiLine
            component={TextField}
          />
        </div>

        {/* net weight */}
        <div className={formStyles.fieldContainer}>
          <Field
            name="netWeight"
            hintText="Net Weight"
            floatingLabelText="Net Weight"
            fullWidth
            component={TextField}
          />
        </div>

        {/* package weight */}
        <div className={formStyles.fieldContainer}>
          <Field
            name="packageWeight"
            hintText="Package Weight"
            floatingLabelText="Package Weight"
            fullWidth
            component={TextField}
          />
        </div>

        {/* length */}
        <div className={formStyles.fieldContainer}>
          <Field
            name="length"
            hintText="Length"
            floatingLabelText="Length"
            fullWidth
            component={TextField}
          />
        </div>

        {/* width */}
        <div className={formStyles.fieldContainer}>
          <Field
            name="width"
            hintText="Width"
            floatingLabelText="Width"
            fullWidth
            component={TextField}
          />
        </div>

        {/* height */}
        <div className={formStyles.fieldContainer}>
          <Field
            name="height"
            hintText="Height"
            floatingLabelText="Height"
            onInput={this.onInputHeight}
            fullWidth
            component={TextField}
          />
        </div>

        {/* color */}
        <div className={formStyles.fieldContainer}>
          <Field
            name="color"
            hintText="Color"
            floatingLabelText="Color"
            fullWidth
            component={TextField}
          />
        </div>

        {/* material */}
        <div className={formStyles.fieldContainer}>
          <Field
            name="material"
            hintText="Material"
            floatingLabelText="Material"
            fullWidth
            component={TextField}
          />
        </div>

        {/* fragile */}
        <div className={formStyles.fieldContainer}>
          <Field
            name="fragile"
            label="Fragile"
            component={Checkbox}
          />
        </div>

        {/* inventory level */}
        <div className={formStyles.fieldContainer}>
          <Field
            name="inventoryLevel"
            hintText="Inventory Level"
            floatingLabelText="Inventory Level"
            fullWidth
            component={TextField}
          />
        </div>

        {/* supply link */}
        <div className={formStyles.fieldContainer}>
          <Field
            name="supplyLink"
            hintText="Supply Link"
            floatingLabelText="Supply Link"
            fullWidth
            component={TextField}
          />
        </div>

        {/* remark */}
        <div className={formStyles.fieldContainer}>
          <Field
            name="remark"
            hintText="Remark"
            floatingLabelText="Remark"
            fullWidth
            multiLine
            component={TextField}
          />
        </div>

        {/* on sale */}
        <div className={formStyles.fieldContainer}>
          <Field
            name="onSale"
            label="On Sale"
            component={Checkbox}
          />
        </div>
      </Form>
    )
  }
}

SupplyForm.propTypes = {
  handleSubmit: PropTypes.func,
  supplierData: PropTypes.array,
  onSubmitCallback: PropTypes.func,
}

const mapStateToProps = state => ({
  supplierData: getSupplierSearchResult(state),
})

export default connect(mapStateToProps, null)(
  reduxForm({
    form: 'supplyForm',
  })(SupplyForm)
)
