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
  ALL,
  NEW,
  APPROVE,
  REWORK,
  REJECT,
  PENDING,
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
    sortby: ALL,
  },
  {
    title: 'New',
    sortby: NEW,
  },
  {
    title: 'To Be Approved',
    sortby: PENDING,
  },
  {
    title: 'Approved',
    sortby: APPROVE,
  },
  {
    title: 'Rework',
    sortby: REWORK,
  },
  {
    title: 'Reject',
    sortby: REJECT,
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

  renderPendingActions = id => (
    <div>
      {/* review idea */}
      <IconButton
        iconClassName="material-icons"
        tooltip="Review"
        onTouchTap={() => browserHistory.push(`/erp/procurement/ideas/${id}/review`)}
      >
        spellcheck
      </IconButton>
    </div>
  )

  renderActions = id => {
    const { deleteIdea } = this.props

    return (
      <div>
        {/* visible */}
        <IconButton
          iconClassName="material-icons"
          tooltip="View"
          onTouchTap={() => browserHistory.push(`/erp/procurement/ideas/${id}`)}
        >
          visibility
        </IconButton>

        {/* edit */}
        <IconButton
          iconClassName="material-icons"
          tooltip="Edit Idea"
          onTouchTap={
            () => browserHistory.push(`/erp/procurement/ideas/${id}/edit`)
          }
        >
          mode_edit
        </IconButton>

        {/* Delete */}
        <IconButton
          iconClassName="material-icons"
          tooltip="Delete Idea"
          onTouchTap={() => deleteIdea(id)}
        >
          delete
        </IconButton>
      </div>
    )
  }

  render () {
    const {
      ideas,
      getIdeas,
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
                    {
                      do {
                        if (idea.status === PENDING) { this.renderPendingActions(idea.id) }
                        else { this.renderActions(idea.id) }
                      }
                    }
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
