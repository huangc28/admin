import React, { Component, PropTypes } from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import IconButton from 'material-ui/IconButton'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import * as poStatus from '../../constants/purchaseOrder'
import { fetchPurchaseOrders } from '../../redux/purchaseOrder'

const HEADERS = [
  {
    title: 'Product Name',
    field: 'product_name',
  },
  {
    title: 'Thumbnail',
    field: 'image',
  },
  {
    title: 'Assignee',
    field: 'assignee_user_id',
  },
  {
    title: 'Internal Sku',
    field: 'internal_sku',
  },
  {
    title: 'Status',
    field: 'status',
  },
]

const statusText = {
  [poStatus.PURCHASE_ORDER_UNFULFILLED]: 'unfulfilled',
  [poStatus.PURCHASE_ORDER_FULFILLED]: 'fulfilled',
}

/**
 * 1. product name
 * 2. thumbnail
 * 3. supplier
 * 4. assignee
 * 5. internal sku
 */
class PurchaseOrders extends Component {
  componentWillMount = () => {
    // fetch purchase orders
    this.props.fetchPurchaseOrders()
  }

  // @TODO this part should
  renderOrder = (order, index) => (
    HEADERS.map((header, index) => (
      <TableRowColumn key={index}>
        {
          header.title === 'Status' // @TODO is there a better way of writing it?
            ? statusText[
              order[header.field]
            ]
            : order[header.field]
        }
      </TableRowColumn>
    ))
  )

  render () {
    const { orders } = this.props

    return (
      <div>
        <Table>
          {/* data header */}
          <TableHeader>
            <TableRow>
              {
                HEADERS.map((header, index) => (
                  <TableHeaderColumn key={index}>
                    { header.title }
                  </TableHeaderColumn>
                ))
              }

              <TableHeaderColumn>
                Actions
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>

          {/* orders data */}
          <TableBody>
            {
              orders.map((order, index) => (
                <TableRow key={index}>
                  {
                    this.renderOrder(order, index)
                  }

                  {
                    // solve the problem of icon tooltip being hidden
                    // by table row column: https://github.com/callemall/material-ui/issues/4671
                    <TableRowColumn style={{ overflow: 'visible' }}>
                      <IconButton
                        iconClassName="material-icons"
                        tooltip="View"
                        onTouchTap={
                          () => browserHistory.push(
                            `/erp/procurement/purchase-order/${order.id}`
                          )
                        }
                      >
                        visibility
                      </IconButton>

                      <IconButton
                        iconClassName="material-icons"
                        tooltip="Edit"
                        onTouchTap={
                          () => browserHistory.push(
                            `/erp/procurement/purchase-order/${order.id}/edit`
                          )
                        }
                      >
                        mode_edit
                      </IconButton>
                    </TableRowColumn>
                  }
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
    )
  }
}

PurchaseOrders.propTypes = {
  fetchPurchaseOrders: PropTypes.func,
  orders: PropTypes.array,
}

const mapStateToProps = state => ({
  orders: state.purchaseOrder.data,
})

export default connect(mapStateToProps, {
  fetchPurchaseOrders,
})(PurchaseOrders)
