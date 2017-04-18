import React from 'react'

const Header = () => (
  <header className="mdl-layout__header mdl-layout__header--scroll">
    <div className="mdl-layout__header-row">
      {/* Title */}
      <span className="mdl-layout-title">Title</span>
      {/* Add spacer, to align navigation to the right */}
      <div className="mdl-layout-spacer" />
      {/* Navigation. We hide it in small screens. */}
    </div>
  </header>
)

export default Header
