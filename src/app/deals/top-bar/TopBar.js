import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Box, NativeSelect, IconButton, Hidden } from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

import { styles } from './TopBarStyles'


const SortByOptions = {
  default: "Default",
  price_asc: "Price: Low to High",
  price_desc: "Price: High to Low",
}

function TopBar({classes, onSort}) {

  const sortKeys = Object.keys(SortByOptions);

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" className={classes.topbar}>
      <div>
        <Hidden mdUp>
          <IconButton aria-label="filters">
            <MoreHorizIcon />
          </IconButton>
        </Hidden>
      </div>
      <div>
        <span className={classes.sort}>Sort by:</span>
        <NativeSelect inputProps={{ 'aria-label': 'sort by' }} disableUnderline className={classes.select} onChange={e => onSort(e.target.value)}>
          {sortKeys.map(key => <option key={key} value={key}>{SortByOptions[key]}</option>)}
        </NativeSelect>
      </div>
    </Box>
  )
}

const styled = withStyles(styles)(TopBar)
export default styled