import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { Container, ThemeProvider, CssBaseline } from '@material-ui/core'

import { withSplashScreen } from './shared'

import Header from './header'
import DealsPage from './deals'
import AboutPage from './about'
import PrivacyPage from './privacy'

import NavBar from './nav-bar'
import Footer from './footer'

import { theme, useStyles } from './AppStyles'


const routes = () => (
  <>
    <Header />
    <Switch>
      <Route path="/deals" component={DealsPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Redirect to="/deals" />
    </Switch>
    <NavBar />
  </>
);

const RoutesWithSplash = withSplashScreen(routes)

function App() {

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container classes={{ root: classes.mainRoot }}>
        <div className={classes.content}>
          <Router>
            <RoutesWithSplash />
          </Router>
        </div>
        <Footer />
      </Container>
    </ThemeProvider>
  );
}

export default App;
