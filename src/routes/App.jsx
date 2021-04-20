import React from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Home from '@containers/Home'
import Notes from '@containers/Notes'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/notes' component={Notes} />
      </Switch>
    </Router>
  )
}

export default App
