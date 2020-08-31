import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import DealsPage from './deals'
import AboutPage from './about'
import HomePage from './home'

function App() {
  return (
    <div>
      <h2>ZDeals Web (Material UI verion)</h2>
      <hr/>
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/deals">
            <DealsPage />
          </Route>
          <Route path="/about">
            <AboutPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
