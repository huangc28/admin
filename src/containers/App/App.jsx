import React, { PropTypes } from 'react'

import { getLocation } from '../../utils/routes'
import Header from '../../components/Header'
import NavigationBar from '../../components/NavigationBar'

const routeMap = {
  '/home': 'HOME',
}

const App = ({ children, pathname }) => {
  const currentRoute = getLocation()

  return (
    <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
      {/* navigation bar */}
      <NavigationBar />

      {/* header */}
      <Header title={routeMap[currentRoute] || ''} />

      {/* Content */}
      <main className="mdl-layout__content">
        {children}
      </main>
    </div>
  )
}

App.propTypes = {
  children: PropTypes.node,
  pathname: PropTypes.string,
}

export default App
