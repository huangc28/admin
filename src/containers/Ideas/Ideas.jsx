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
import { translate } from 'react-i18next'

import ControllButtonBar from '../../components/ControllButtonBar'
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
    title: 'ALL',
    sortby: ALL,
  },
  {
    title: 'NEW',
    sortby: NEW,
  },
  {
    title: 'TO BE APPROVED',
    sortby: PENDING,
  },
  {
    title: 'APPROVED',
    sortby: APPROVE,
  },
  {
    title: 'REWORK',
    sortby: REWORK,
  },
  {
    title: 'REJECT',
    sortby: REJECT,
  },
]

class Ideas extends Component {

  componentDidMount = () => {
    const {
      getIdeas,
      activeTab,
    } = this.props

    getIdeas(activeTab)
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
      ideas,
      getIdeas,
      activeTab,
      router: {
        goBack,
      },
      translation,
    } = this.props

    const createIdeaButton = (
      <RaisedButton
        label={translation('Create')}
        default
        onTouchTap={this.onTapCreate}
      />
    )

    return (
      <div>
        <Tabs value={activeTab}>
          {
            sortingTabs.map((tab, index) => (
              <Tab
                value={tab.sortby}
                key={index}
                onActive={
                  () => { getIdeas(tab.sortby) }
                }
                label={translation(tab.title)}
              />
            ))
          }
        </Tabs>

        {/* control button bar */}
        <ControllButtonBar
          onBack={() => goBack()}
          rightButton={createIdeaButton}
        />

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
                    this.renderIdeaData(idea)
                  }

                  {/* Idea Action Bar */}
                  <TableRowColumn>
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
      </div>
    )
  }
}

Ideas.propTypes = {
  activeTab: PropTypes.node,
  deleteIdea: PropTypes.func,
  getIdeas: PropTypes.func,
  ideas: PropTypes.array,
  router: PropTypes.shape({
    goBack: PropTypes.func,
  }),
  sortIdeasByType: PropTypes.func,
  translation: PropTypes.func,
}

const mapStateToProps = state => {
  const { data, status } = state.ideas

  return {
    ideas: data,
    activeTab: status,
  }
}

export default translate(null, { translateFuncName: 'translation' })(
  connect(mapStateToProps, {
    deleteIdea,
    getIdeas,
    sortIdeasByType,
  })(Ideas)
)
