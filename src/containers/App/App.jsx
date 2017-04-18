import React, { PropTypes } from 'react'

import Header from '../../components/Header'
import NavigationBar from '../../components/NavigationBar'

const App = ({ children }) => (
  <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
    {/* navigation bar */}
    <NavigationBar />

    {/* header */}
    <Header />

    {/* Content */}
    <main className="mdl-layout__content">
      {children}
    </main>
  </div>
)

App.propTypes = {
  children: PropTypes.node,
}

export default App
