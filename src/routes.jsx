import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import Login from './containers/Login'
import DashBoard from './containers/DashBoard'

/* procurement routes */
import Ideas from './containers/Ideas'
import Idea from './containers/Idea'
import CreateIdea from './containers/CreateIdea'
import EditIdea from './containers/EditIdea'

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
        <Route path="ideas/create" component={CreateIdea} />
        <Route path="ideas/:id" component={Idea} />
        <Route path="ideas/:id/edit" component={EditIdea} />
      </Route>
    </Route>
  </Route>
)
