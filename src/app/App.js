import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { Container, ThemeProvider, CssBaseline } from '@material-ui/core'

import { withSplashScreen } from './shared'

import DealsPage from './deals'
import AboutPage from './about'
import PrivacyPage from './privacy'

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
              <Route path="/deals" component={DealsWithSplash} />
              <Route path="/about" component={AboutPage} />
              <Route path="/privacy" component={PrivacyPage} />
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
