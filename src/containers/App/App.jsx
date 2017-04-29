import React, { Component, PropTypes } from 'react'
import AppBar from 'material-ui/AppBar'
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import { getLocation } from '../../utils/routes'
import NavigationBar from '../../components/NavigationBar'

const routeMap = {
  '/home': 'HOME',
  '/erp/procurement/ideas': 'IDEAS',
}

class App extends Component {
  constructor () {
    super()

    this.state = {
      showDrawer: false,
    }
  }

  // issue with using drawer
  // http://stackoverflow.com/questions/36953711/i-cannot-use-material-ui-components-after-update-to-material-ui0-15-0-beta-1
  getChildContext () {
    return { muiTheme: getMuiTheme(baseTheme) }
  }

  onToggleDrawer = () => {
    this.setState({ showDrawer: !this.state.showDrawer })
  }

  onCloseDrawer = () => {
    this.setState({ showDrawer: false })
  }

  render () {
    const currentRoute = getLocation()

    const { children } = this.props

    const {
      showDrawer,
    } = this.state

    return (
      <div>
        {/* navigation */}
        <NavigationBar open={showDrawer} onClose={this.onCloseDrawer} />

        {/* header */}
        <AppBar
          title={routeMap[currentRoute] || ''}
          onLeftIconButtonTouchTap={this.onToggleDrawer}
        />

        {/* Content */}
        <main>
          {children}
        </main>
      </div>
    )
  }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
}

App.propTypes = {
  children: PropTypes.node,
}

export default App
