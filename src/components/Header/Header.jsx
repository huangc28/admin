import React, { PropTypes } from 'react'

const Header = ({ title }) => (
  <header className="mdl-layout__header mdl-layout__header--scroll">
    <div className="mdl-layout__header-row">
      {/* Title */}
      <span className="mdl-layout-title">
        {title}
      </span>

      <div className="mdl-layout-spacer" />
    </div>
  </header>
)

Header.propTypes = {
  title: PropTypes.string,
}

export default Header
