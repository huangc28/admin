import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'

import styles from './Ideas.css'
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

  renderTab = (tab, key) => {
    const { title, sortby } = tab

    return (
      <a
        href="#stub-panel"
        key={key}
        className={`mdl-tabs__tab${key === 0 ? ' is-active' : ''}`}
        onClick={evt => {
          // @TODO write a helper for preventDefault.
          evt.preventDefault()
          evt.stopPropagation()

          this.props.sortIdeasByType(sortby)
        }}
      >
        { title }
      </a>
    )
  }

  renderIdeaDataHeader = () => (
    ideaDataHeaders.map((header, index) => // eslint-disable-line no-confusing-arrow
      index === 0
        ? (
          <th key={index} className="mdl-data-table__cell--non-numeric">
            { header.title }
          </th>
        )
        : <th key={index}> {header.title} </th>
    )
  )

  renderIdeaData = idea => (
    ideaDataHeaders.map((header, index) => ( // eslint-disable-line no-confusing-arrow
      index === 0
        ? (
          <td className="mdl-data-table__cell--non-numeric" key={index}>
            { idea[header.field] }
          </td>
        )
        : <td key={index}> { idea[header.field] } </td>
    ))
  )

  render () {
    const { ideas } = this.props

    return (
      <div className="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
        <div className="mdl-tabs__tab-bar">
          {
            sortingTabs.map((tab, index) => this.renderTab(tab, index))
          }
        </div>

        <div id="stub-panel" className={classNames('mdl-tabs__panel', styles.content)}>
          <table
            className={classNames(
              'classmdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp',
              styles.table
            )}
          >
            {/* data header */}
            <thead>
              <tr>
                {
                  this.renderIdeaDataHeader()
                }
              </tr>
            </thead>

            {/* data body */}
            <tbody>
              {
                ideas.map((idea, index) => (
                  <tr key={index}>
                    {
                      this.renderIdeaData(idea)
                    }
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

Ideas.propTypes = {
  getIdeas: PropTypes.func,
  ideas: PropTypes.array,
  sortIdeasByType: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    ideas: state.ideas.data,
  }
}

export default connect(mapStateToProps, {
  getIdeas,
  sortIdeasByType,
})(Ideas)
