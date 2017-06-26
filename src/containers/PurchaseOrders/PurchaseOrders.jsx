import React, { Component, PropTypes } from 'react'
import { Tabs, Tab } from 'material-ui/Tabs'
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

import {
  PURCHASE_ORDER_UNFULFILLED,
  PURCHASE_ORDER_FULFILLED,
  PER_PAGE,
} from '../../constants/purchaseOrderStatus'
import { fetchPurchaseOrders } from '../../redux/purchaseOrder'

const HEADERS = [
  {
    title: 'Product Name',
    field: 'supplyName',
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
  [PURCHASE_ORDER_UNFULFILLED]: 'unfulfilled',
  [PURCHASE_ORDER_FULFILLED]: 'fulfilled',
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
    // fetch unfulfilled purchase orders
    this.props.fetchPurchaseOrders({
      page: 1,
      perpage: PER_PAGE,
      status: PURCHASE_ORDER_UNFULFILLED,
    })
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
    const {
      orders,
      fetchPurchaseOrders,
    } = this.props

    return (
      <div>
        {/* tabs */}
        <Tabs>
          <Tab
            value={PURCHASE_ORDER_UNFULFILLED}
            onActive={
              () => {
                // get unfulfilled purchase orders
                fetchPurchaseOrders({
                  page: 1,
                  perpage: PER_PAGE,
                  status: PURCHASE_ORDER_UNFULFILLED,
                })
              }
            }
            label="fulfilled"
          />
          <Tab
            value={PURCHASE_ORDER_FULFILLED}
            onActive={
              () => {
                // get unfulfilled purchase orders
                fetchPurchaseOrders({
                  page: 1,
                  perpage: PER_PAGE,
                  status: PURCHASE_ORDER_FULFILLED,
                })
              }
            }
            label="unfufilled"
          />
        </Tabs>

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
