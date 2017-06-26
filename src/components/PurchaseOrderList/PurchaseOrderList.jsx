import React, { PropTypes } from 'react'
import {
  Table,
  TableRow,
  TableHeader,
  TableHeaderColumn,
  TableBody,
} from 'material-ui/Table'

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
]

const PurchaseOrderList = ({ children }) => (
  <Table>
    {/* data header */}
    <TableHeader
      displaySelectAll={false}
      adjustForCheckbox={false}
    >
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

    <TableBody>
      { children }
    </TableBody>
  </Table>
)

PurchaseOrderList.propTypes = {
  children: PropTypes.node,
}

export default PurchaseOrderList
