import React, { Component, PropTypes } from 'react'
import AutoComplete from 'material-ui/AutoComplete'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'

import styles from './PurchaseOrderStepForm.css'
import CreateSupplierModal from '../../../components/CreateSupplierModal'
import CreateSupplyModal from '../../../components/CreateSupplyModal'
import SkuInfo from '../../../components/SkuInfo'
import {
  searchSuppliers,
  getSupplierSearchResult,
  getSupplierDataSource,
  getSupplierIdByName,
} from '../../../redux/supplier'
import { SUPPLIER_STEP } from '../../../constants/purchaseOrderStatus'
import { editPurchaseOrder } from '../../../redux/purchaseOrder'
import {
  searchSupply,
  getSupplySearchResult,
  getSupplyDataSource,
  getSupplyIdByProductName,
} from '../../../redux/supply'
import formStyles from '../../../styles/form.css'

class PoStepOne extends Component {
  state = {
    // submit button lock
    lock: false,

    id: '', // purchase order id
    approverUserId: '',
    supplierName: '',
    supplierId: '',
    supplyName: '',
    supplyId: '',
  }

  componentDidMount = () => {
    this.setState({
      ...this.props.formData,
    })
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.formData !== this.props.formData) {
      this.setState({
        ...nextProps.formData,
      })
    }
  }

  onSubmit = () => {
    const {
      onNext,
      editPurchaseOrder,
    } = this.props

    const {
      id,
      approverUserId,
      supplierId,
      supplyId,
    } = this.state

    onNext()

    editPurchaseOrder({
      step: SUPPLIER_STEP + 1,
      id,
      approverUserId,
      supplierId,
      supplyId,
    })
  }

  onNewRequestSupplier = searchText => {
    // search supplier id based on searchText.
    const { supplierData } = this.props

    this.setState({
      supplierName: searchText,
      supplierId: getSupplierIdByName(supplierData, searchText),
    })

    this.validateLock()
  }

  onNewRequestSupply = searchText => {
    const { supplyData } = this.props

    this.setState({
      supplyName: searchText,
      supplyId: getSupplyIdByProductName(supplyData, searchText),
    })

    this.validateLock()
  }

  onInputSupplier = evt => {
    const { searchSuppliers } = this.props

    const { value } = evt.target

    // if value is empty, lock step 1 confirm button
    this.setState({
      supplierName: value,
      supplierId: '',
      supplyName: '',
      supplyId: '',
    }, () => this.validateLock())

    // search suppliers, store them into supplier reducer.
    if (value.length > 1) {
      searchSuppliers(value)
    }
  }

  onInputSupply = evt => {
    const { searchSupply } = this.props

    const { supplierId } = this.state

    const { value } = evt.target
    this.setState({
      supplyName: value,
      supplyId: '', // clear supply id
    }, () => this.validateLock())

    // get the current supply id.
    if (value.length > 1 && !!supplierId) {
      searchSupply(supplierId, value)
    }
  }

  /**
   * unlock submit button when satisfy following requirements
   *
   * 1. supplier id is not null
   * 2. supply id is not null
   * 3. supplier name should exists and can not be empty string
   * 4. supply name should exists and can not be empty string
   */
  validateLock = () => {
    const {
      supplierName,
      supplierId,
      supplyName,
      supplyId,
    } = this.state

    // 1.
    if (supplierId === null || supplierId === '') {
      this.setState({
        lock: true,
      })

      return
    }

    // 2.
    if (supplyId === null || supplyId === '') {
      this.setState({
        lock: true,
      })

      return
    }

    // 3.
    if (!supplierName || supplierName === '' || supplierName === null) {
      this.setState({
        lock: true,
      })

      return
    }

    // 4.
    if (!supplyName || supplyName === '' || supplyName === null) {
      this.setState({
        lock: true,
      })

      return
    }

    this.setState({
      lock: false,
    })
  }

  render () {
    const {
      supplyId,
      approverUserId,
      supplierName,
      supplyName,
      lock,
    } = this.state

    const {
      supplierDataSource,
      supplyDataSource,
    } = this.props

    return (
      <form className={formStyles.form}>
        <div className={styles.content}>
          {/* approve */}
          <div className={formStyles.fieldContainer}>
            <h3>
              Approver: { approverUserId }
            </h3>
          </div>

          <div>
            <h3> Place order from </h3>
            <blockquote>
              <div>
                <AutoComplete
                  name="supplier"
                  onInput={this.onInputSupplier}
                  hintText="Supplier"
                  fullWidth
                  dataSource={supplierDataSource}
                  onNewRequest={this.onNewRequestSupplier}
                  value={supplierName}
                />

                {/* create supplier button */}
                <CreateSupplierModal />
              </div>

              <div>
                {/* disable supply field when supplier is undecided */}
                <AutoComplete
                  name="supply"
                  onInput={this.onInputSupply}
                  hintText="Supply"
                  fullWidth
                  dataSource={supplyDataSource}
                  onNewRequest={this.onNewRequestSupply}
                  value={supplyName}
                />

                {/* create supply button */}
                <CreateSupplyModal />

                <div className={styles.skuContainer}>
                  {
                    supplyId && supplyId !== ''
                      ? <SkuInfo supplyId={supplyId} />
                      : ''
                  }
                </div>
              </div>
            </blockquote>
          </div>

          {/* control button bar */}
          <div className={styles.btnBar}>
            <FlatButton
              label="Back"
              disabled
              onTouchTap={this.onPrev}
            />
            <RaisedButton
              label="Next"
              primary
              onTouchTap={this.onSubmit}
              disabled={lock}
            />
          </div>
        </div>
      </form>
    )
  }
}

PoStepOne.propTypes = {
  /**
   * step one form data in a form like:
   *
   * {
   *   approveUserId
   *   supplier
   *   supplierId
   *   supply
   *   supplyId
   * }
   *
   */
  formData: PropTypes.object.isRequired,

  editPurchaseOrder: PropTypes.func,

  searchSuppliers: PropTypes.func,
  searchSupply: PropTypes.func,

  supplierData: PropTypes.array,
  supplierDataSource: PropTypes.array,

  supplyData: PropTypes.array,
  supplyDataSource: PropTypes.array,

  onNext: PropTypes.func,
}

const mapStateToProps = state => ({
  supplierData: getSupplierSearchResult(state),
  supplyData: getSupplySearchResult(state),

  supplierDataSource: getSupplierDataSource(state),
  supplyDataSource: getSupplyDataSource(state),
})

export default connect(mapStateToProps, {
  editPurchaseOrder,
  searchSuppliers,
  searchSupply,
})(PoStepOne)
