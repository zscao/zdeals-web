import React from 'react'
import { LinearProgress } from '@material-ui/core'

import { withStyles } from '@material-ui/core/styles'
import { styles } from './LoadingBarStyles'

function LoadingBar({loading, classes}) {
  return (
    <LinearProgress variant={loading ? 'indeterminate' : 'determinate'} 
      value={100} 
      color="primary" 
      classes={{root: classes.root, colorPrimary: classes.colorPrimary, barColorPrimary: classes.bar}} />
  )
}

const styled = withStyles(styles)(LoadingBar)
export default styled