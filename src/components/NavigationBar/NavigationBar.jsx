import React from 'react'

import styles from './NavigationBar.css'

// const procurementList = [
//   {
//     title: 'Ideas',
//     link: '/procurement/ideas',
//   },
// ]

const NavigationBar = () => (
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
    <nav className="mdl-navigation">
      <ul className={styles.subMenu}>
        {/* Procurement submenu */}
        <li className="mdl-navigation__link"> Procurement </li>
        {/* Procurement list */}
        <ul className={styles.subMenu}>
          <li> Ideas </li>
        </ul>
      </ul>
    </nav>
  </div>
)

export default NavigationBar
