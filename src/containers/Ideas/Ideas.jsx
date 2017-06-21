import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Tabs, Tab } from 'material-ui/Tabs'
import RaisedButton from 'material-ui/RaisedButton'
import { browserHistory } from 'react-router'
import { translate } from 'react-i18next'

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

    getIdeas(activeTab)
  }

  onTapCreate = () => {
    browserHistory.push('/erp/procurement/ideas/create')
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

        <IdeaList ideas={ideas} />
      </div>
    )
  }
}

Ideas.propTypes = {
  activeTab: PropTypes.node,
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
    getIdeas,
  })(Ideas)
)
