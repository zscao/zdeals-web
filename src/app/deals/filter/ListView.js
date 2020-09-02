import React from 'react'
import { Box } from '@material-ui/core'

import { withStyles } from '@material-ui/core/styles'
import { styles } from './ListViewStyles'

import ItemView from './ItemView'

function ListView({filters = [], onChange, classes}) {

  return (
    <Box className={classes.filters}>
      {filters.map(filter => <ItemView key={filter.code} filter={filter} onChange={onChange} />)}
    </Box>
  )
}

const styled = withStyles(styles)(ListView)
export default styled