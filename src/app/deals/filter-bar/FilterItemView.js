import React from 'react'
import { Box, Typography, Checkbox } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import { TextButton } from '../../shared'

import { styles } from './FilterItemViewStyles'

function ItemView({ filter, onChange, onClear, loading, classes }) {

  const hasSelected = filter.items.some(x => x.selected);

  return (
    <Box className={classes.filter}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="button">
          {filter.title}
        </Typography>
        {hasSelected ? <TextButton className={classes.clear} disabled={loading} onClick={onClear}>CLEAR</TextButton> : <div></div> }
      </Box>
      {filter.items.map(item => (
        <Box key={item.value} display="flex" justifyContent="space-between" alignItems="center" className={classes.item}>
          <span>{item.name}</span>
          <Checkbox disabled={loading} classes={{ root: classes.checkbox }} checked={item.selected} color="default" onChange={e => onChange(item, e.target.checked)} />
        </Box>))}
    </Box>
  )
}

const styled = withStyles(styles)(ItemView)
export default styled