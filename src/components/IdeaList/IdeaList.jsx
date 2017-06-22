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
import { translate } from 'react-i18next'
import IconButton from 'material-ui/IconButton'

import { browserHistory } from 'react-router'

import { getThumbnailUrl } from '../../utils/images'
import { deleteIdea } from '../../redux/ideas'
import {
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
    field: 'image',
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

class IdeaList extends Component {
  renderApproveActions = id => (
    <div>
      {/* view icon */}
      <IconButton
        iconClassName="material-icons"
        tooltip="View"
        onTouchTap={() => browserHistory.push(`/erp/procurement/ideas/${id}`)}
      >
        visibility
      </IconButton>

      {/* add sample */}
      <IconButton
        iconClassName="material-icons"
        tooltip="samples"
        onTouchTap={() => browserHistory.push(`/erp/procurement/ideas/${id}/samples`)}
      >
        add
      </IconButton>
    </div>
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

  renderRejectActions = id => (
    <div>
      <IconButton
        iconClassName="material-icons"
        tooltip="View"
        onTouchTap={() => browserHistory.push(`/erp/procurement/ideas/${id}`)}
      >
        visibility
      </IconButton>
    </div>
  )

  renderApproveActions = id => (
    <div>
      {/* view icon */}
      <IconButton
        iconClassName="material-icons"
        tooltip="View"
        onTouchTap={() => browserHistory.push(`/erp/procurement/ideas/${id}`)}
      >
        visibility
      </IconButton>

      {/* add sample */}
      <IconButton
        iconClassName="material-icons"
        tooltip="samples"
        onTouchTap={() => browserHistory.push(`/erp/procurement/ideas/${id}/samples`)}
      >
        add
      </IconButton>
    </div>
  )

  renderReworkActions = id => {
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
      translation,
      ideas,
    } = this.props

    return (
      <Table selectable={false}>
        {/* data header */}
        <TableHeader>
          <TableRow>
            {
              ideaDataHeaders.map((header, index) => (
                <TableHeaderColumn key={index}>
                  { translation(header.title) }
                </TableHeaderColumn>
              ))
            }

            {/* list of actions to manipulate an idea */}
            <TableHeaderColumn>
              <div>
                {translation('Actions')}
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
                  ideaDataHeaders.map((header, index) => ( // eslint-disable-line no-confusing-arrow
                    <TableRowColumn>
                      {
                        header.field === 'image'
                          ? (
                            <img src={getThumbnailUrl(idea[header.field])} />
                          )
                          : idea[header.field]
                      }
                    </TableRowColumn>
                  ))
                }

                {/* Idea Action Bar */}
                <TableRowColumn style={{ overflow: 'visible' }}>
                  {
                    idea.status === APPROVE
                      ? this.renderApproveActions(idea.id)
                      : ''
                  }
                  {
                    idea.status === PENDING
                      ? this.renderPendingActions(idea.id)
                      : ''
                  }
                  {
                    idea.status === REJECT
                      ? this.renderRejectActions(idea.id)
                      : ''
                  }
                  {
                    idea.status === REWORK || idea.status === NEW
                      ? this.renderReworkActions(idea.id)
                      : ''
                  }
                </TableRowColumn>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    )
  }
}

IdeaList.propTypes = {
  deleteIdea: PropTypes.func,
  ideas: PropTypes.array,
  translation: PropTypes.func,
}

export default translate(null, {
  translateFuncName: 'translation',
})(
  connect(null, {
    deleteIdea,
  })(IdeaList)
)
