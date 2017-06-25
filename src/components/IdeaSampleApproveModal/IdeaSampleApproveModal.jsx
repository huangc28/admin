import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames/bind'
import AutoComplete from 'material-ui/AutoComplete'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import { isInteger } from '../../utils/validations'
import { searchUsers } from '../../redux/users'
import styles from './IdeaSampleApproveModal.css'

const cx = classnames.bind(styles)

/**
 * @TODO integrate redux form instead of writing form manually.
 */
class IdeaSampleApproveModal extends Component {
  state = {
    // submit button disabled
    disabled: true,

    showModal: true,
    showAnimation: true,
    assignee: '',
    assigneeId: '',
    quantity: 1,
  }

  onInputAssignee = evt => {
    const { searchUsers } = this.props

    const { value } = evt.target

    this.setState({
      assignee: evt.target.value,
      assigneeId: '',
    }, () => this.verifyInput())

    searchUsers(value)
  }

  onNewRequestAssignee = selected => {
    const { id } = selected

    this.setState({
      assigneeId: id,
    }, () => this.verifyInput())
  }

  onInputQuantity = evt => {
    this.setState({
      quantity: evt.target.value,
    }, () => this.verifyInput())
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
    const {
      assignee,
      quantity,
    } = this.state

    this.props.onSubmit(assignee, quantity)

    this.onClose()
  }

  verifyInput = () => {
    console.log('trigger verify input')

    const {
      assigneeId,
      quantity,
    } = this.state

    if (!assigneeId || assigneeId === '') {
      this.setState({
        disabled: true,
      })

      return
    }

    if (!isInteger(quantity) || quantity === 0 || quantity === '0') {
      this.setState({
        disabled: true,
      })

      return
    }

    this.setState({
      disabled: false,
    })
  }

  render () {
    const {
      showAnimation,
      showModal,
      assignee,
      quantity,
      disabled,
    } = this.state

    const { searchResult } = this.props

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
            <AutoComplete
              hintText="Assignee"
              floatingLabelText="Assignee"
              value={assignee}
              onInput={this.onInputAssignee}
              dataSource={searchResult}
              dataSourceConfig={{
                text: 'username',
                value: 'id',
              }}
              onNewRequest={this.onNewRequestAssignee}
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
                disabled={disabled}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

IdeaSampleApproveModal.propTypes = {
  searchResult: PropTypes.array,
  searchUsers: PropTypes.func,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
}

const mapStateToProps = state => ({
  searchResult: state.users.searchResult,
})

export default connect(mapStateToProps, {
  searchUsers,
})(IdeaSampleApproveModal)
