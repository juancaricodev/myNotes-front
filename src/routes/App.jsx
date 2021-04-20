import React from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Home from '@containers/Home'
import Notes from '@containers/Notes'
import Layout from '@layouts/Layout'

const App = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/notes' component={Notes} />
        </Switch>
      </Layout>
    </Router>
  )
}

export default App
