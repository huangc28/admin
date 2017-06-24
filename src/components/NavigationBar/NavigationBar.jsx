import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Drawer from 'material-ui/Drawer'
import Collapsible from 'react-collapsible'
import { translate } from 'react-i18next'

import styles from './NavigationBar.css'

const procurementListSubmenu = [
  {
    title: 'ideas',
    link: '/erp/procurement/ideas',
  },
  {
    title: 'purchase order',
    link: '/erp/procurement/purchase-order',
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

    const { translation } = this.props

    // If submenu open status equals to false, hide submenu.
    return (
      <Collapsible
        key={index}
        trigger={
          <div className={styles.menuItem}>
            {
              translation(title)
            }
          </div>
        }
        transitionTime={200}
        classParentString={styles.collapsible}
        contentOuterClassName={styles.menuContent}
        contentInnerClassName={styles.menuContentInner}
      >
        {
          submenu.map((submenuItem, index) => this.renderSubmenuItem(submenuItem, index))
        }
      </Collapsible>
    )
  }

  renderSubmenuItem = (submenuItem, index) => {
    const { link, title } = submenuItem

    const {
      translation,
      onClose,
    } = this.props

    return (
      <label
        className={styles.submenuItem}
        key={index}
        onTouchTap={() => {
          browserHistory.push(link)
          onClose()
        }}
      >
        {translation(title)}
      </label>
    )
  }

  render () {
    const {
      open,
      onClose,
      username,
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
            { username }
          </div>
        </header>

        {/* side bar menu */}
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
  username: PropTypes.string,
  onClose: PropTypes.func,
}

const mapStateToProps = state => ({
  username: state.auth.username,
})

export default translate(null, { translateFuncName: 'translation' })(
  connect(mapStateToProps, null)(NavigationBar)
)
