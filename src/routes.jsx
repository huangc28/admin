import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import Login from './containers/Login'
import DashBoard from './containers/DashBoard'

/* procurement idea routes */
import Ideas from './containers/Ideas'
import Idea from './containers/Idea'
import CreateIdea from './containers/CreateIdea'
import EditIdea from './containers/EditIdea'
import ReviewIdea from './containers/ReviewIdea'
import IdeaSamples from './containers/IdeaSamples'
import CreateIdeaSamples from './containers/CreateIdeaSample'
import EditIdeaSample from './containers/EditIdeaSample'
import PurchaseOrders from './containers/PurchaseOrders'

/* purchase-order */
import PurchaseOrder from './containers/PurchaseOrder'

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
        <Route path=":ideaId/samples" component={IdeaSamples} />
        <Route path=":ideaId/samples/create" component={CreateIdeaSamples} />
        <Route path=":ideaId/samples/:sampleId/edit" component={EditIdeaSample} />
        <Route path=":ideaId/review" component={ReviewIdea} />
        <Route path=":ideaId/edit" component={EditIdea} />
      </Route>

      {/* purchase order */}
      <Route path="procurement/purchase-order">
        <IndexRoute component={PurchaseOrders} />
        <Route path=":orderId/edit" component={PurchaseOrder} />
      </Route>
    </Route>
  </Route>
)
