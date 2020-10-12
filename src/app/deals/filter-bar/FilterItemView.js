import React, { useState } from 'react'
import { Box, Typography, Checkbox } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import { TextButton } from '../../shared'

import { styles } from './FilterItemViewStyles'

function ItemView({ filter, onChange, onClear, classes }) {

  const [maxShow, setMaxShow] = useState(16);

  const items = [];
  for(let i=0; i<filter.items.length; i++) {
    if(i >= maxShow) break;

    const item = filter.items[i];

    items.push(
      <Box key={item.value} display="flex" justifyContent="space-between" alignItems="center" className={classes.item}>
        <span>{item.name}</span>
        <Checkbox classes={{ root: classes.checkbox }} checked={item.selected} color="default" onChange={e => onChange(item, e.target.checked)} />
      </Box>
    )
  }

  const hasSelected = filter.items.some(x => x.selected);

  return (
    <Box className={classes.filter}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="button">
          {filter.title}
        </Typography>
        {hasSelected ? <TextButton className={classes.clear} onClick={onClear}>Clear</TextButton> : <div></div> }
      </Box>
      {items}
      {filter.items.length > maxShow && <Box display="flex" justifyContent="flex-end" >
        <TextButton className={classes.more} onClick={() => setMaxShow(maxShow * 2)}>Show More</TextButton>
      </Box>}
    </Box>
  )
}

const styled = withStyles(styles)(ItemView)
export default styled