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
import IconButton from 'material-ui/IconButton'
import { Tabs, Tab } from 'material-ui/Tabs'
import RaisedButton from 'material-ui/RaisedButton'
import { browserHistory } from 'react-router'

import styles from './ideas.css'
import { sortIdeasByType, getIdeas, deleteIdea } from '../../actions/ideas'
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
    title: 'Thumbnail',
    field: 'thumbnail',
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
    title: 'To Be Approved',
    sortby: SORT_BY_PENDING,
  },
  {
    title: 'Approved',
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
      <TableRowColumn key={index}>
        { idea[header.field] }
      </TableRowColumn>
    ))
  )

  render () {
    const {
      ideas,
      getIdeas,
      deleteIdea,
    } = this.props

    return (
      <div>
        <Tabs>
          {
            sortingTabs.map((tab, index) => (
              <Tab
                key={index}
                onClick={
                  () => getIdeas({
                    status: tab.sortby,
                  })
                }
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

        <Table selectable={false}>
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

              {/* list of actions to manipulate an idea */}
              <TableHeaderColumn>
                <div>
                  Actions
                </div>
              </TableHeaderColumn>
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

                  {/* Idea Action Bar */}
                  <TableRowColumn>
                    {/* visible */}
                    <IconButton
                      iconClassName="material-icons"
                      tooltip="View"
                      onTouchTap={() => browserHistory.push(`/erp/procurement/ideas/${idea.id}`)}
                    >
                      visibility
                    </IconButton>

                    {/* edit */}
                    <IconButton
                      iconClassName="material-icons"
                      tooltip="Edit Idea"
                      onTouchTap={
                        () => browserHistory.push(`/erp/procurement/ideas/${idea.id}/edit`)
                      }
                    >
                      mode_edit
                    </IconButton>

                    {/* Delete */}
                    <IconButton
                      iconClassName="material-icons"
                      tooltip="Delete Idea"
                      onTouchTap={() => deleteIdea(idea.id)}
                    >
                      delete
                    </IconButton>
                  </TableRowColumn>
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
  deleteIdea: PropTypes.func,
  getIdeas: PropTypes.func,
  ideas: PropTypes.array,
  sortIdeasByType: PropTypes.func,
}

const mapStateToProps = state => ({
  ideas: state.ideas.data,
})

export default connect(mapStateToProps, {
  deleteIdea,
  getIdeas,
  sortIdeasByType,
})(Ideas)
