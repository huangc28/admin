/* global __CLIENT__ */

import React from 'react'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'

import configureStore from './store/configureStore'
import rootReducer from './reducers'
import routes from './routes'

const initialState = window.__INITIAL_STATE__
const store = configureStore(rootReducer, initialState)

const history = syncHistoryWithStore(browserHistory, store)

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

  const {
    hasHotReloaded,
  } = store.getState().hotReloaded

  if (!hasHotReloaded) {
    injectTapEventPlugin()
  }

  ReactDOM.render(
    <App />,
    document.getElementById('app')
  )
}
