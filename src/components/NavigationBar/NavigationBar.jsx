import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import { translate } from 'react-i18next'

import styles from './NavigationBar.css'

const procurementListSubmenu = [
  {
    title: 'ideas',
    link: '/erp/procurement/ideas',
  },
  {
    title: 'purchase order',
    link: '/erp/procurement/purchase-orders',
  },
]

const menuList = [
  {
    title: 'PROCURE',
    submenu: procurementListSubmenu,
  },
]

/**
 * Get the name main menu item.
 *
 * @param {string} name
 */
const getMenuItemName = name => `item-${name}`

class NavigationBar extends Component {
  constructor () {
    super()

    const subMenuOpenState = {}

    menuList.forEach(menuItem => {
      subMenuOpenState[getMenuItemName(menuItem.title)] = false
    })

    this.state = { subMenuOpenState }
  }

  showSubmenu = (evt, title) => {
    const { subMenuOpenState } = this.state

    const selectedName = getMenuItemName(title)

    // update selected submenu.
    this.setState({
      subMenuOpenState: {
        ...subMenuOpenState,
        [selectedName]: !subMenuOpenState[selectedName],
      },
    })
  }

  renderMenuItem = (menuItem, index) => {
    const { title, submenu } = menuItem

    const { subMenuOpenState } = this.state

    const { translation } = this.props

    const selectedName = getMenuItemName(menuItem.title)
    // If submenu open status equals to false, hide submenu.

    return (
      <MenuItem
        key={index}
        onTouchTap={evt => this.showSubmenu(evt, title)}
      >
        {translation(title)}

        {
          subMenuOpenState[selectedName]
            ? (
              <ul className={styles.subMenu}>
                {
                  submenu.map((submenuItem, index) => this.renderSubmenuItem(submenuItem, index))
                }
              </ul>
            )
            : ''
        }
      </MenuItem>
    )
  }

  renderSubmenuItem = (submenuItem, index) => {
    const { link, title } = submenuItem

    const {
      translation,
      onClose,
    } = this.props

    return (
      <MenuItem
        key={index}
        onTouchTap={() => {
          browserHistory.push(link)
          onClose()
        }}
      >
        {translation(title)}
      </MenuItem>
    )
  }

  render () {
    const {
      open,
      onClose,
    } = this.props

    return (
      <Drawer
        open={open}
        width={200}
        docked={false}
        onRequestChange={onClose}
      >
        {/* header */}
        <header className={styles.header}>
          {/* name */}
          <div>
            Bryan Huang
          </div>

          {/* status */}
          <div>
            system status: admin
          </div>
        </header>

        {
          menuList.map((menuItem, index) => this.renderMenuItem(menuItem, index))
        }
      </Drawer>
    )
  }
}

NavigationBar.defaultProps = {
  open: false,
}

NavigationBar.propTypes = {
  open: PropTypes.bool,
  translation: PropTypes.func,
  onClose: PropTypes.func,
}

export default translate(null, { translateFuncName: 'translation' })(NavigationBar)
