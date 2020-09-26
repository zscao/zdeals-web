import React from 'react'
import { Box, Typography, Checkbox, FormControlLabel } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import { styles } from './FilterItemViewInDrawerStyles'

function ItemView({ filter, onChange, loading, classes }) {

  return (
    <Box className={classes.filter}>
      <Box>
        <Typography variant="button">
          {filter.title}
        </Typography>
      </Box>
      <Box>
        {filter.items.map(item => (
            <FormControlLabel
              key={item.value}
              classes={{root: classes.itemRoot, label: classes.itemLabel}}
              checked={item.selected} 
              color="default" 
              onChange={e => onChange(item, e.target.checked)}
              control={<Checkbox classes={{ root: classes.checkbox }}  />}
              label={item.name}
              disabled={loading}
            />
          ))}
          </Box>
    </Box>
  )
}

const styled = withStyles(styles)(ItemView)
export default styled