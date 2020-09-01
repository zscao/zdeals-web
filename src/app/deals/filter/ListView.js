import React from 'react'
import { Box } from '@material-ui/core'

import { useStyles } from './ListViewStyles'

import ItemView from './ItemView'

export default function ListView({filters = []}) {

  const classes = useStyles();

  return (
    <Box className={classes.list}>
      {filters.map(filter => <ItemView key={filter.code} filter={filter} />)}
    </Box>
  )
}