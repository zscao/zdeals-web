import React from 'react'

import { Box, IconButton, InputBase, NativeSelect } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

import { useStyles } from './SearchBarStyles'

export default function SearchBar() {

  const classes = useStyles();

  return (
    <Box className={classes.search}>
      <NativeSelect inputProps={{'aria-label': 'category'}} disableUnderline className={classes.select}>
        <option value="">All category</option>
        <option value="computers">Computers</option>
        <option value="monitors">Monitors</option>
        <option value="electrics">Electrics</option>
      </NativeSelect>
      <InputBase classes={{root: classes.inputRoot, input: classes.inputInput}} />
      <Box className={classes.searchButton}>
        <IconButton color="inherit" aria-label="search" onClick={() => console.log('search icon clicked')}>
          <SearchIcon />
        </IconButton>
      </Box>
    </Box>
  )
}