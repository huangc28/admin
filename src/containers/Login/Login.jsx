import React, { Component, PropTypes } from 'react'
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import { connect } from 'react-redux'

import styles from './Login.css'
import { login } from '../../actions/auth'

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // eslint-disable-line

const EMAIL_EMPTY_ERROR = 'email can not be empty'
const EMAIL_PATTERN_ERROR = 'email pattern is not matched'
const PASSWORD_EMPTY_ERROR = 'password can not be empty'

class Login extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: '',
      emailErrorText: '',
      passwordErrorText: '',
    }
  }

  // http://stackoverflow.com/questions/36953711/i-cannot-use-material-ui-components-after-update-to-material-ui0-15-0-beta-1
  getChildContext () {
    return { muiTheme: getMuiTheme(baseTheme) }
  }

  onInputEmail = evt => {
    this.setState({
      email: evt.currentTarget.value,
      emailErrorText: '',
    })
  }

  onInputPassword = evt => {
    this.setState({
      password: evt.currentTarget.value,
      passwordErrorText: '',
    })
  }

  onSubmit = () => {
    const {
      email,
      password,
    } = this.state

    this.validateEmail()

    this.validatePassword()

    this.props.login(email, password)
  }

  validateEmail = () => {
    const { email } = this.state

    if (email === '') {
      this.setState({
        emailErrorText: EMAIL_EMPTY_ERROR,
      })

      return
    }

    // validate email pattern
    if (!EMAIL_REGEX.test(email)) {
      this.setState({
        emailErrorText: EMAIL_PATTERN_ERROR,
      })

      return
    }

    this.setState({
      emailErrorText: '',
    })
  }

  validatePassword = () => {
    const { password } = this.state

    if (password === '') {
      this.setState({
        passwordErrorText: PASSWORD_EMPTY_ERROR,
      })

      return
    }

    this.setState({
      passwordErrorText: '',
    })
  }

  render () {
    const {
      email,
      password,
      emailErrorText,
      passwordErrorText,
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
                errorText={emailErrorText}
                value={email}
                onBlur={this.validateEmail}
              />
            </div>

            <div className={styles.text}>
              <TextField
                hintText="password"
                type="password"
                fullWidth
                errorText={passwordErrorText}
                onInput={this.onInputPassword}
                value={password}
                onBlur={this.validatePassword}
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

Login.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
}

Login.propTypes = {
  login: PropTypes.func,
}

export default connect(null, { login })(Login)
