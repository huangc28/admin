import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import {
  ONLINE_PAYMENT,
  OFFLINE_PAYMENT,
} from '../../constants/supply'
import {
  getSupplySearchResult,
  getSupplyByProductId,
} from '../../redux/supply'
import styles from './SkuInfo.css'

const PAYMENT_GATEWAY_TEXT = {
  [ONLINE_PAYMENT]: 'online',
  [OFFLINE_PAYMENT]: 'offline',
}

const SkuInfo = ({ supplies, supplyId }) => {
  const supply = getSupplyByProductId(supplies, supplyId)

  const {
    internal_sku: internalSku,
    product_name: productName,
    payment_gateway: paymentGateway,
    supply_link: supplyLink,
  } = supply

  return (
    <div className={styles.container}>
      <h3> SKU Info </h3>
      <ul>
        <li>
          sku number: { internalSku }
        </li>
        <li>
          product name: { productName }
        </li>
        <li>
          payment gateway: { PAYMENT_GATEWAY_TEXT[paymentGateway] }
        </li>
        <li>
          supply link: <a href={supplyLink}> {supplyLink} </a>
        </li>
      </ul>
    </div>
  )
}

SkuInfo.propTypes = {
  supplies: PropTypes.array,

  supplyId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
}

const mapStateToProps = state => ({
  supplies: getSupplySearchResult(state),
})

export default connect(mapStateToProps, null)(SkuInfo)
