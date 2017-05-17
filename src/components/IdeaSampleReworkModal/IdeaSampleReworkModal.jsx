import React, { Component, PropTypes } from 'react'
import classnames from 'classnames/bind'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import styles from './IdeaSampleReworkModal.css'

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

  onTouchTap = () => {
    const {
      comment,
    } = this.state

    this.props.onSubmit(comment)

    this.onClose()
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
          <div className={styles.container}>
            <TextField
              hintText="Comments"
              floatingLabelText="Comments"
              value={comment}
              multiLine
              onInput={this.onInput}
            />
          </div>

          <div className={styles.container}>
            <div className={styles.buttons}>
              <RaisedButton
                primary
                label="submit"
                onTouchTap={this.onTouchTap}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

IdeaSampleReworkModal.propTypes = {
  /**
   * Recieve sample id. Is used as a reference
   * to update "sample".
   */
  showModal: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
}

export default IdeaSampleReworkModal
