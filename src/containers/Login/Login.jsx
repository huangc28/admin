import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import { connect } from 'react-redux'

import styles from './Login.css'
import { login } from '../../actions/auth'

class Login extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: '',
    }
  }

  onInputEmail = evt => {
    this.setState({
      email: evt.currentTarget.value,
    })
  }

  onInputPassword = evt => {
    this.setState({
      password: evt.currentTarget.value,
    })
  }

  onSubmit = () => {
    const {
      email,
      password,
    } = this.state

    this.props.login(email, password)
  }

  render () {
    const {
      email,
      password,
    } = this.state

    return (
      <div className={styles.root}>
        <div className={styles.cardContainer}>
          {/* Title */}
          <div className={styles.cardTitle}>
            Next Deal Shop
          </div>

          {/* Content */}
          <div className={styles.cardContent}>
            <div className={styles.text}>
              <TextField
                hintText="email"
                fullWidth
                onInput={this.onInputEmail}
                value={email}
              />
            </div>

            <div className={styles.text}>
              <TextField
                hintText="password"
                type="password"
                fullWidth
                onInput={this.onInputPassword}
                value={password}
              />
            </div>
          </div>

          {/* Action bar */}
          <div className={styles.cardAction}>
            <FlatButton
              label="Login"
              default
              onTouchTap={this.onSubmit}
            />
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  login: PropTypes.func,
}

export default connect(null, { login })(Login)
