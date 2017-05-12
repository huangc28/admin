/* global __CLIENT__ */

import React from 'react'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// import getMuiTheme from 'material-ui/styles/getMuiTheme'

import { ACCESS_TOKEN } from './constants/auth'
import configureStore from './store/configureStore'
import rootReducer from './reducers'
import routes from './routes'
import { init } from './config'

let accessToken

// restore accessToken from session storage
// if session key exists.
if (__CLIENT__ && sessionStorage) {
  accessToken = sessionStorage.getItem(ACCESS_TOKEN)
}

const initialState = {
  ...window.__INITIAL_STATE__,
  auth: {
    accessToken,
  },
}
const store = configureStore(rootReducer, initialState)

const history = syncHistoryWithStore(browserHistory, store)

// assign store in config for later usage
// eg. setting "access_token" in every api request
init({ store })

// const muiTheme = getMuiTheme({
//   userAgent: 'all',
// })

if (module.hot) {
  module.hot.accept()
}

if (__CLIENT__) {
  const App = () => (
    <Provider store={store}>
      <MuiThemeProvider>
        <Router routes={routes} history={history} />
      </MuiThemeProvider>
    </Provider>
  )

  ReactDOM.render(
    <App />,
    document.getElementById('app')
  )
}
