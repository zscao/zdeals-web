import React, { useState, useEffect, useCallback } from 'react'
import { Box, Typography, Checkbox, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import { styles } from './ItemViewStyles'

function ListView({ filter = {}, onChange, classes }) {

  const [current, setCurrent] = useState(filter);

  useEffect(() => {
    setCurrent(filter);
  }, [filter])


  const changeFilter = useCallback((item, checked) => {
    item.selected = checked;

    if (!onChange) return;

    const selected = [];
    current.items.forEach(t => {
      if (t.value === item.value) {
        if (checked) selected.push(t.value);
      }
      else {
        if (t.selected) selected.push(t.value);
      }
    })
    onChange(current.code, selected);
  }, [current, onChange])

  const clear = useCallback(() => {
    onChange(current.code, []);
  }, [current, onChange])


  if (!Array.isArray(current.items) || current.items.length === 0) return null;
  const hasSelected = current.items.some(x => x.selected);

  return (
    <Box className={classes.filter}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="button">
          {current.title}
        </Typography>
        {/* {hasSelected ? <Button color="default" size="small" onClick={clear}>Clear</Button> : <div></div>} */}
        {hasSelected ? <div className={classes.clear} onClick={clear}>Clear</div> : <div></div>}
      </Box>
      {current.items.map(item => (
        <Box key={item.value} display="flex" justifyContent="space-between" alignItems="center" className={classes.item}>
          <span>{item.name}</span>
          <Checkbox classes={{ root: classes.checkbox }} checked={item.selected} color="default" onChange={e => changeFilter(item, e.target.checked)} />
        </Box>))}
    </Box>
  )
}

const styled = withStyles(styles)(ListView)
export default styled