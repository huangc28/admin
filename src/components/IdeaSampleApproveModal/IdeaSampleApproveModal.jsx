import React, { Component, PropTypes } from 'react'
import classnames from 'classnames/bind'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import styles from './IdeaSampleApproveModal.css'

const cx = classnames.bind(styles)

/**
 * @TODO integrate redux form instead of writing form manually.
 */
class IdeaSampleApproveModal extends Component {
  constructor () {
    super()

    this.state = {
      showModal: true,
      showAnimation: true,
      assignee: '',
      quantity: 1,
    }
  }

  onInputAssignee = evt => {
    this.setState({
      assignee: evt.target.value,
    })
  }

  onInputQuantity = evt => {
    this.setState({
      quantity: evt.target.value,
    })
  }

  onClose = () => {
    this.setState({
      showModal: false,
    })
  }

  onTransitionEnd = () => {
    const { onClose } = this.props

    if (!this.state.showModal) {
      this.setState({
        showAnimation: false,
      })

      onClose()
    }
  }

  onSubmit = () => {
    console.log('trigger on submit')
  }

  render () {
    const {
      showAnimation,
      showModal,
      assignee,
      quantity,
    } = this.state

    return (
      <div
        onTransitionEnd={this.onTransitionEnd}
        className={cx('root', {
          animate: showAnimation,
          visible: showModal,
          hidden: !showModal,
        })}
      >
        <div
          className={styles.background}
          onClick={this.onClose}
        />

        <div className={styles.content}>

          {/* assignee */}
          <div className={styles.container}>
            <TextField
              hintText="Assignee"
              floatingLabelText="Assignee"
              value={assignee}
              onInput={this.onInputAssignee}
            />
          </div>

          {/* quantity */}
          <div className={styles.container}>
            <TextField
              hintText="Quantity"
              floatingLabelText="Quantity"
              value={quantity}
              onInput={this.onInputQuantity}
            />
          </div>

          <div className={styles.container}>
            <div className={styles.buttons}>
              <RaisedButton
                primary
                label="submit"
                onTouchTap={this.onSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

IdeaSampleApproveModal.propTypes = {
  onClose: PropTypes.func,
}

export default IdeaSampleApproveModal
