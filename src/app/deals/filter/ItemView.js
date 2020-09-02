import React, { useState, useEffect } from 'react'
import { Box, Typography, Checkbox } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import { styles } from './ItemViewStyles'

function ListView({filter = {}, onChange, classes}) {

  const [current, setCurrent] = useState(filter);

  useEffect(() => {
    setCurrent(filter);
  }, [filter]) 


  const changeFilter = (item, checked) => {
    item.selected = checked;

    if(!onChange) return;

    const selected = [];
    current.items.forEach(t => {
      if(t.value === item.value) {
        if(checked) selected.push(t.value);
      }
      else {
        if(t.selected) selected.push(t.value);
      }
    })
    onChange(current.code, selected)
  }

  return (
      <Box>
        <Typography variant="h6">
          {current.title}
        </Typography>
        {Array.isArray(current.items) && current.items.map(item => (
          <Box key={item.value} display="flex" justifyContent="space-between" alignItems="center" className={classes.item}>
            <span>{item.name}</span>
            <Checkbox classes={{root: classes.checkbox}} checked={item.selected} color="default" onChange={e => changeFilter(item, e.target.checked)} />
          </Box>))}
      </Box>
  )
}

const styled = withStyles(styles)(ListView)
export default styled