import React, { PropTypes } from 'react'
import IconButton from 'material-ui/IconButton'

import styles from './ControllButtonBar.css'

const ControllButtonBar = ({ onBack, rightButton }) => (
  <div className={styles.btnBar}>
    {/* Back Button */}
    <IconButton
      iconClassName="material-icons"
      tooltip="Back"
      onTouchTap={onBack}
    >
      arrow_back
    </IconButton>

    {
      rightButton || ''
    }
  </div>
)

ControllButtonBar.propTypes = {
  rightButton: PropTypes.node,
  onBack: PropTypes.func,
}

export default ControllButtonBar
