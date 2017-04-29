import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import Login from './containers/Login'
import DashBoard from './containers/DashBoard'

/* procurement routes */
import Ideas from './containers/Ideas'

export default (
  <Route path="/" >
    <IndexRoute component={Login} />
    <Route path="login" component={Login} />
    <Route path="erp" component={App}>
      <IndexRoute component={DashBoard} />
      <Route path ="dashboard" component={DashBoard} />

      {/* procurement */}
      <Route path="procurement">
        <IndexRoute component={Ideas} />
        <Route path="ideas" component={Ideas} />
      </Route>
    </Route>
  </Route>
)
