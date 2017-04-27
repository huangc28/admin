import React, { Component } from 'react'
import classNames from 'classnames'
import { Link } from 'react-router'

import styles from './NavigationBar.css'

const procurementListSubmenu = [
  {
    title: 'ideas',
    link: '/procurement/ideas',
  },
  {
    title: 'purchase order',
    link: '/procurement/purchase-order',
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

    const selectedName = getMenuItemName(menuItem.title)
    // If submenu open status equals to false, hide submenu.

    return (
      <div
        key={index}
        onClick={ evt => this.showSubmenu(evt, menuItem.title)}
      >
        <li className={classNames(styles.menuItem, 'mdl-navigation__link')}>
          {title}
        </li>

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
      </div>
    )
  }

  renderSubmenuItem = (submenuItem, index) => {
    const { link, title } = submenuItem

    return (
      <li className="mdl-list__item" key={index}>
        <Link
          to={link}
          className={styles.subMenuLink}
        >
          {title}
        </Link>
      </li>
    )
  }

  render () {
    return (
      <div className="mdl-layout__drawer">
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

        {/* Menu */}
        <nav className={classNames('mdl-navigation', styles.navigation)}>
          <ul className={styles.menu}>
            {
              menuList.map((menuItem, index) => this.renderMenuItem(menuItem, index))
            }
          </ul>
        </nav>
      </div>
    )
  }
}

export default NavigationBar
