import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import { Tabs, Tab } from 'material-ui/Tabs'
import RaisedButton from 'material-ui/RaisedButton'
import { browserHistory } from 'react-router'

import styles from './ideas.css'
import { sortIdeasByType, getIdeas } from '../../actions/ideas'
import {
  SORT_BY_ALL,
  SORT_BY_NEW,
  SORT_BY_APPROVE,
  SORT_BY_REWORK,
  SORT_BY_REJECT,
  SORT_BY_PENDING,
} from '../../constants/ideas'

const ideaDataHeaders = [
  {
    title: 'Product Name',
    field: 'product_name',
  },
  {
    title: 'Status',
    field: 'status',
  },
  {
    title: 'Proposer Name',
    field: 'proposer_name',
  },
  {
    title: 'Created At',
    field: 'created_at',
  },
  {
    title: 'Updated At',
    field: 'updated_at',
  },
]

const sortingTabs = [
  {
    title: 'All',
    sortby: SORT_BY_ALL,
  },
  {
    title: 'New',
    sortby: SORT_BY_NEW,
  },
  {
    title: 'Approve',
    sortby: SORT_BY_APPROVE,
  },
  {
    title: 'Rework',
    sortby: SORT_BY_REWORK,
  },
  {
    title: 'Reject',
    sortby: SORT_BY_REJECT,
  },
  {
    title: 'Pending',
    sortby: SORT_BY_PENDING,
  },
]

class Ideas extends Component {

  componentDidMount = () => {
    this.props.getIdeas()
  }

  onTapCreate = () => {
    browserHistory.push('/erp/procurement/ideas/create')
  }

  renderIdeaData = idea => (
    ideaDataHeaders.map((header, index) => ( // eslint-disable-line no-confusing-arrow
      index === 0
        ? (
          <TableRowColumn key={index}>
            { idea[header.field] }
          </TableRowColumn>
        )
        : <TableRowColumn key={index}> { idea[header.field] } </TableRowColumn>
    ))
  )

  render () {
    const { ideas } = this.props

    return (
      <div>
        <Tabs>
          {
            sortingTabs.map((tab, index) => (
              <Tab
                key={index}
                onClick={() => this.props.sortIdeasByType(tab.sortby)}
                label={tab.title}
              />
            ))
          }
        </Tabs>

        {/* control button bar */}
        <div className={styles.btnBar}>

          {/* create button */}
          <RaisedButton
            label="Create" default
            onTouchTap={this.onTapCreate}
          />
        </div>

        <Table>
          {/* data header */}
          <TableHeader>
            <TableRow>
              {
                ideaDataHeaders.map((header, index) => (
                  <TableHeaderColumn key={index}>
                    { header.title }
                  </TableHeaderColumn>
                ))
              }
            </TableRow>
          </TableHeader>

          {/* data body */}
          <TableBody>
            {
              ideas.map((idea, index) => (
                <TableRow key={index}>
                  {
                    this.renderIdeaData(idea)
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

Ideas.propTypes = {
  getIdeas: PropTypes.func,
  ideas: PropTypes.array,
  sortIdeasByType: PropTypes.func,
}

const mapStateToProps = state => ({
  ideas: state.ideas.data,
})

export default connect(mapStateToProps, {
  getIdeas,
  sortIdeasByType,
})(Ideas)
