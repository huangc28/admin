import React, { Component, PropTypes } from 'react'
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'

import styles from './Login.css'
import { login } from '../../redux/auth'

const PHONE_EMPTY_ERROR = 'phone can not be empty'
const PASSWORD_EMPTY_ERROR = 'password can not be empty'

class Login extends Component {
  constructor () {
    super()

    this.state = {
      phone: '',
      password: '',
      phoneErrorText: '',
      passwordErrorText: '',
    }
  }

  // http://stackoverflow.com/questions/36953711/i-cannot-use-material-ui-components-after-update-to-material-ui0-15-0-beta-1
  getChildContext () {
    return { muiTheme: getMuiTheme(baseTheme) }
  }

  onInputPhone = evt => {
    this.setState({
      phone: evt.target.value,
      phoneErrorText: '',
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
      phone,
      password,
    } = this.state

    this.validatePhone()

    this.validatePassword()

    this.props.login(phone, password)
  }

  validatePhone = () => {
    const { phone } = this.state

    if (phone === '') {
      this.setState({
        phoneErrorText: PHONE_EMPTY_ERROR,
      })

      return
    }

    this.setState({
      phoneErrorText: '',
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
      phone,
      password,
      phoneErrorText,
      passwordErrorText,
    } = this.state

    const {
      errorMessage,
      translation,
    } = this.props

    return (
      <div className={styles.root}>
        <div className={styles.cardContainer}>
          {/* Title */}
          <div className={styles.cardTitle}>
            { translation('Xin Yi') } ERP
          </div>

          {/* Content */}
          <div className={styles.cardContent}>
            <div className={styles.text}>
              <TextField
                hintText="phone"
                fullWidth
                onInput={this.onInputPhone}
                errorText={phoneErrorText}
                value={phone}
                onBlur={this.validatePhone}
              />
            </div>

            <div className={styles.text}>
              <TextField
                hintText={translation('password')}
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
              label={translation('Login')}
              default
              onTouchTap={this.onSubmit}
            />

            <div className={styles.error}>
              {
                errorMessage
              }
            </div>
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
  errorMessage: PropTypes.string,
  login: PropTypes.func,
  translation: PropTypes.func,
}

const mapStateToProps = state => ({
  errorMessage: state.auth.errorMessage,
})

export default translate(null, { translateFuncName: 'translation' })(
  connect(mapStateToProps, { login })(Login)
)
