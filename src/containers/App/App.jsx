import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import IconButton from 'material-ui/IconButton'
import Popover from 'material-ui/Popover'
import AppBar from 'material-ui/AppBar'
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'

import { logout } from '../../actions/auth'
import { getLocation } from '../../utils/routes'
import NavigationBar from '../../components/NavigationBar'

injectTapEventPlugin()

/**
 * @param {string} currentRoute
 */
const getPageTitle = currentRoute => {
  if (currentRoute.includes('ideas')) {
    return 'IDEAS'
  }

  return 'HOME'
}

class App extends Component {
  constructor () {
    super()

    this.state = {
      showDrawer: false,
      showPopover: false,
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

  onOpenPopover = evt => {
    evt.preventDefault()

    this.setState({
      showPopover: true,
      popoverEl: evt.currentTarget,
    })
  }

  onClosePopover = () => {
    this.setState({ showPopover: false })
  }

  onCloseDrawer = () => {
    this.setState({ showDrawer: false })
  }

  render () {
    const currentRoute = getLocation()

    const {
      children,
      logout,
    } = this.props

    const {
      showPopover,
      popoverEl,
      showDrawer,
    } = this.state

    const moreButton = (
      <IconButton
        iconClassName="material-icons"
        tooltip="More"
      >
        more_vert
      </IconButton>
    )

    return (
      <div>
        {/* navigation */}
        <NavigationBar
          open={showDrawer}
          onClose={this.onCloseDrawer}
        />

        {/* header */}
        <AppBar
          title={getPageTitle(currentRoute) || ''}
          onLeftIconButtonTouchTap={this.onToggleDrawer}
          iconElementRight={moreButton}
          onRightIconButtonTouchTap={this.onOpenPopover}
        />

        {/* popover */}
        <Popover
          open={showPopover}
          anchorEl={popoverEl}
          onRequestClose={this.onClosePopover}
          targetOrigin={{
            horizontal: 'right',
            vertical: 'top',
          }}
          anchorOrigin={{
            horizontal: 'right',
            vertical: 'top',
          }}
        >
          <Menu>
            <MenuItem
              primaryText="Sign out"
              onTouchTap={logout}
            />
          </Menu>
        </Popover>

        {/* Content */}
        <main>
          {children}
        </main>
      </div>
    )
  }
}

App.childContextTypes = {
  muiTheme: PropTypes.object.isRequired,
}

App.propTypes = {
  children: PropTypes.node,
  logout: PropTypes.func,
}

export default connect(null, {
  logout,
})(App)
