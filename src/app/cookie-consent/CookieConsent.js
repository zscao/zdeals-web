import React, { useState } from 'react'
import { AppBar, Container, Box, Button } from '@material-ui/core'

import { styles } from './CookieConsentStyles'
import { withStyles } from '@material-ui/core/styles'

import Cookies from 'universal-cookie'

const CookieName = 'cookie-consent';
const cookies = new Cookies();

function CookieConsent({classes}) {

  const [consent, setConsent] = useState(cookies.get(CookieName));
  if(consent !== undefined) return null; 

  const setCookieConsent = () => {
    const value = 'Accepted';
    const expires = new Date();
    expires.setDate(expires.getDate() + 180);

    cookies.set(CookieName, value, {expires, sameSite: 'lax'});
    // update state
    setConsent(value);
  }

  return (
    <AppBar position="fixed" className={classes.root}>
      <Container>
        <Box display="flex" justifyContent="space-between">
          <Box className={classes.terms}>
            We use cookies to improve your experience on our site. Find more details in our <a href="/privacy" target="_blank">Privacy Policy</a>.
          </Box>          
          <Box className={classes.actions}>
            <Button color="secondary" onClick={setCookieConsent}>Accept</Button>
          </Box>
        </Box>
      </Container>
    </AppBar>
  )
}



const styled = withStyles(styles)(CookieConsent)
export default styled