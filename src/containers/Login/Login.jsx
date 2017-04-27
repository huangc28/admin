import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { login } from '../../actions/auth'
import classNames from 'classnames'

import styles from './Login.css'

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
        <div className={classNames('mdl-card mdl-shadow--6dp', styles.card)}>
          {/* title */}
          <div className="mdl-card__title mdl-color--primary mdl-color-text--white">
            <h2 className="mdl-card__title-text">
              Next Deal Shop co.
            </h2>
          </div>

          <div className="mdl-card__supporting-text">

            {/* form tag is necessary for mdl for the text field to work properly */}
            <form>
              {/* email */}
              <div className="mdl-textfield mdl-js-textfield">
                <input
                  className="mdl-textfield__input"
                  type="text"
                  id="email"
                  value={email}
                  onInput={this.onInputEmail}
                />
                <label
                  className="mdl-textfield__label"
                  htmlFor="email"
                >
                  email
                </label>
              </div>

              {/* password */}
              <div className="mdl-textfield mdl-js-textfield">
                <input
                  className="mdl-textfield__input"
                  type="password"
                  id="password"
                  value={password}
                  onInput={this.onInputPassword}
                />
                <label
                  className="mdl-textfield__label"
                  htmlFor="password"
                >
                  password
                </label>
              </div>
            </form>
          </div>

          {/* login button */}
          <div className="mdl-card__actions mdl-card--border">
            <button
              className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
              onClick={this.onSubmit}
            >
              Log in
            </button>

            {/* error tag */}
            <span className={styles.error}>
              email and password not matched!
            </span>
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
