import React from 'react'

import { Box, NativeSelect } from '@material-ui/core'
import { useStyles } from './ToolbarStyles'

const SortByOptions = {
  default: "Default",
  price_asc: "Price: Low to High",
  price_desc: "Price: High to Low",
}

export default function Toolbar() {

  const classes = useStyles();

  const sortKeys = Object.keys(SortByOptions);

  return (
    <Box className={classes.toolbar}>
      <Box component="span" m={1}>Sort By:</Box>
      <NativeSelect inputProps={{'aria-label': 'sort by'}} disableUnderline className={classes.select}>
        {sortKeys.map(key => <option key={key} value={key}>{SortByOptions[key]}</option>)}
      </NativeSelect>
    </Box>
  )
}