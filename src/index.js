/* global __CLIENT__ */

import React from 'react'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { I18nextProvider } from 'react-i18next'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import i18n from './i18n'
import { AUTH } from './constants/auth'
import configureStore from './store/configureStore'
import rootReducer from './redux/reducers'
import routes from './routes'
import { init } from './config'

let auth = {}

// try to restore auth info from session storage.
if (__CLIENT__ && sessionStorage) {
  const authObj = sessionStorage.getItem(AUTH)

  if (authObj) {
    auth = JSON.parse(authObj)
  }
}

// initialize material muiTheme object.
// providing the identical theme object on the server side too.
// @issue: https://stackoverflow.com/questions/35481084/react-starter-kit-and-material-ui-useragent-should-be-supplied-in-the-muitheme
export const muiTheme = getMuiTheme(null, {
  userAgent: 'all',
})

if (__CLIENT__) {
  const initialState = {
    ...window.__INITIAL_STATE__,
    auth: { ...auth },
  }

  const store = configureStore(rootReducer, initialState)

  const history = syncHistoryWithStore(browserHistory, store)

  // assign store in config for later usage
  // eg. setting "access_token" in every api request
  init({ store })

  if (module.hot) {
    module.hot.accept()
  }

  if (__CLIENT__) {
    const App = () => (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <I18nextProvider i18n={i18n}>
            <Router routes={routes} history={history} />
          </I18nextProvider>
        </MuiThemeProvider>
      </Provider>
    )

    ReactDOM.render(
      <App />,
      document.getElementById('app')
    )
  }
}