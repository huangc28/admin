import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Tabs, Tab } from 'material-ui/Tabs'
import RaisedButton from 'material-ui/RaisedButton'
import { browserHistory } from 'react-router'
import ReactPaginate from 'react-paginate'
import { translate } from 'react-i18next'

import paginationStyle from '../../styles/pagination.css'
import styles from './ideas.css'
import IdeaList from '../../components/IdeaList'
import ControllButtonBar from '../../components/ControllButtonBar'
import { getIdeas } from '../../redux/ideas'
import {
  ALL,
  NEW,
  APPROVE,
  REWORK,
  REJECT,
  PENDING,
  PER_PAGE,
} from '../../constants/ideas'

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

    getIdeas({
      status: activeTab,
      searchText: '',
      page: 1, // default to get the first page
      perpage: PER_PAGE,
    })
  }

  onTapCreate = () => {
    browserHistory.push('/erp/procurement/ideas/create')
  }

  onPageChange = ({ selected }) => {
    const {
      getIdeas,
      activeTab,
    } = this.props

    // get ideas
    getIdeas({
      status: activeTab,
      searchText: '',
      page: selected + 1,
      perpage: PER_PAGE,
    })
  }

  render () {
    const {
      ideas,
      pageCount,
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
                  () => {
                    getIdeas({
                      status: tab.sortby,
                      searchText: '',
                      offset: 0,
                      limit: PER_PAGE,
                    })
                  }
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

        <IdeaList ideas={ideas} />

        <div className={styles.paginationContainer}>
          <ReactPaginate
            previousLabel="previous"
            nextLabel="next"
            breakLabel={<a href="">...</a>}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.onPageChange}
            containerClassName={paginationStyle.pagination}
            subContainerClassName={'pages pagination'}
            activeClassName={paginationStyle.active}
            disabledClassName={paginationStyle.disabled}
          />
        </div>
      </div>
    )
  }
}

Ideas.propTypes = {
  activeTab: PropTypes.node,
  getIdeas: PropTypes.func,
  ideas: PropTypes.array,
  pageCount: PropTypes.number,
  router: PropTypes.shape({
    goBack: PropTypes.func,
  }),
  sortIdeasByType: PropTypes.func,
  translation: PropTypes.func,
}

const mapStateToProps = state => {
  const { data, status, total } = state.ideas

  return {
    ideas: data,
    pageCount: Math.ceil(total / PER_PAGE),
    activeTab: status,
  }
}

export default translate(null, { translateFuncName: 'translation' })(
  connect(mapStateToProps, {
    getIdeas,
  })(Ideas)
)
