import React from 'react'
import { Box, Typography, Checkbox } from '@material-ui/core'

import { useStyles } from './ItemViewStyles'


export default function ListView({filter = {}}) {

  const classes = useStyles();

  return (
      <Box>
        <Typography variant="h6">
          {filter.title}
        </Typography>
        {Array.isArray(filter.items) && filter.items.map(item => (
          <Box key={item.value} display="flex" justifyContent="space-between" alignItems="center" className={classes.item}>
            <span>{item.name}</span>
            <Checkbox classes={{root: classes.checkbox}} color="default" />
          </Box>))}
      </Box>
  )
}