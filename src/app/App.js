import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { Container, ThemeProvider, CssBaseline } from '@material-ui/core'

import { withSplashScreen } from './shared'

import DealsPage from './deals'
import AboutPage from './about'
import Footer from './shared/footer'

import { theme, useStyles } from './AppStyles'

const DealsWithSplash = withSplashScreen(DealsPage)

function App() {

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container classes={{ root: classes.mainRoot }}>
        <div className={classes.content}>
          <Router>
            <Switch>
              {/* <Route exact path="/">
              <HomePage />
            </Route> */}
              <Route path="/deals">
                <DealsWithSplash />
              </Route>
              <Route path="/about">
                <AboutPage />
              </Route>
              <Redirect to="/deals" />
            </Switch>
          </Router>
          <Footer />
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default App;
