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
import ReviewIdea from './containers/ReviewIdea'

export default (
  <Route path="/" >
    <IndexRoute component={Login} />
    <Route path="login" component={Login} />
    <Route path="erp" component={App}>
      <IndexRoute component={DashBoard} />
      <Route path ="dashboard" component={DashBoard} />

      {/* procurement idea*/}
      <Route path="procurement/ideas">
        <IndexRoute component={Ideas} />
        <Route path="create" component={CreateIdea} />
        <Route path=":ideaId" component={Idea} />
        <Route path=":ideaId/review" component={ReviewIdea} />
        <Route path=":ideaId/edit" component={EditIdea} />
      </Route>
    </Route>
  </Route>
)
