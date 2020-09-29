import React from 'react'

import { Box } from '@material-ui/core'

import { withStyles } from '@material-ui/core/styles'
import { styles } from './FooterStyles'

function Footer({classes}) {
  return (
    <Box className={classes.footer}>
      Copyright © 2020 Zentex All Rights Reserved
    </Box>
  )
}

const styled = withStyles(styles)(Footer)
export default styled