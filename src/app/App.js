import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Container } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core'

import DealsPage from './deals'
import AboutPage from './about'
import HomePage from './home'

import { theme, useStyles } from './AppStyles'

function App() {

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
    <Container classes={{root: classes.mainRoot}}>
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
    </Container>
    </ThemeProvider>
  );
}

export default App;
