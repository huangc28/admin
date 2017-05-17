import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames/bind'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import styles from './IdeaSampleReworkModal.css'
import { editIdeaSample } from '../../actions/ideaSamples'

const cx = classnames.bind(styles)

/**
 * Put the specified job in next event loop.
 * (put it in queue after all jobs in stack have been executed.)
 *
 * example: wait for tiny amount of time before animation take affect on DOM.
 *
 * @param {func} callback
 * @param {number} waitTime
 */
export const waitToAnimateAfterDomRenderred = (callback, waitTime = 0) => {
  setTimeout(() => { callback() }, waitTime)
}

class IdeaSampleReworkModal extends Component {
  constructor () {
    super()

    this.state = {
      showAnimation: true,
      showModal: false,
      comment: '',
    }
  }

  componentWillMount = () => {
    waitToAnimateAfterDomRenderred(() => {
      this.setState({
        showModal: true,
        showAnimation: true,
      })
    })
  }

  componentWillUnmount = () => {
    this.setState({
      comment: '',
    })
  }

  onTouchTap = () => {
    editIdeaSample()
  }

  onInput = evt => {
    this.setState({
      comment: evt.target.value,
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

  render () {
    const {
      showAnimation,
      showModal,
      comment,
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

          {/* comments */}
          <TextField
            hintText="Comments"
            floatingLabelText="Comments"
            value={comment}
            multiLine
            onInput={this.onInput}
          />

          <div className={styles.buttons}>
            <RaisedButton
              primary
              label="submit"
              onTouchTap={this.onTouchTap}
            />
          </div>
        </div>
      </div>
    )
  }
}

IdeaSampleReworkModal.propTypes = {
  showModal: PropTypes.bool,
  onClose: PropTypes.func,
}

export default connect()(IdeaSampleReworkModal)
