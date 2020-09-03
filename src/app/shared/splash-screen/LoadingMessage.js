import React from 'react'
import { CircularProgress, Container, Box } from '@material-ui/core'

import { styles } from './LoadingMessageStyles'
import { withStyles } from '@material-ui/core/styles'

function LoadingMessage({classes}) {
  return (
    <Container className={classes.root}>
      <Box> Please wait a moment while loading ... </Box>
      <CircularProgress />
    </Container>
  )
}

const styled = withStyles(styles)(LoadingMessage)
export default styled