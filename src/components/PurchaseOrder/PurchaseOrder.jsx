import React, { PropTypes } from 'react'
import IconButton from 'material-ui/IconButton'
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import { browserHistory } from 'react-router'

const PurchaseOrder = ({ id, name, assignee, image, internalSku }) => (
  <TableRow>
    {/* supply name */}
    <TableRowColumn>
      { name }
    </TableRowColumn>

    {/* thumbnail */}
    <TableRowColumn>
      { image }
    </TableRowColumn>

    {/* assignee */}
    <TableRowColumn>
      { assignee }
    </TableRowColumn>

    {/* internal sku */}
    <TableRowColumn>
      {internalSku}
    </TableRowColumn>

    {/* purchase order action */}
    <TableRowColumn style={{ overflow: 'visible' }}>
      <IconButton
        iconClassName="material-icons"
        tooltip="View"
        onTouchTap={
          () => browserHistory.push(
            `/erp/procurement/purchase-order/${id}`
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
            `/erp/procurement/purchase-order/${id}/edit`
          )
        }
      >
        mode_edit
      </IconButton>
    </TableRowColumn>
  </TableRow>
)

PurchaseOrder.propTypes = {
  assignee: PropTypes.number,
  id: PropTypes.number,
  image: PropTypes.string,
  internalSku: PropTypes.string,

  /**
   * supply name
   */
  name: PropTypes.string,
}

export default PurchaseOrder
