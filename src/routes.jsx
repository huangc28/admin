import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import Login from './containers/Login'
import DashBoard from './containers/DashBoard'
import Home from './containers/Home'

export default (
  <Route path="/" >
    <IndexRoute component={Login} />
    <Route path="/login" component={Login} />
    <Route path="/erp" component={App}>
      <IndexRoute component={DashBoard} />
      <Route path="dashboard" component={DashBoard} />
      <Route path="home" component={Home} />
    </Route>
  </Route>
)
