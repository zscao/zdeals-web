import React, { useState } from 'react'
import { Box, Button } from '@material-ui/core'

import { withStyles } from '@material-ui/core/styles'
import { styles } from './ListViewStyles'

import FilterItem from './FilterItem'

/// mode: drawer/panel
function ListView({inDrawer, filters = [], onChange, loading, classes}) {
  
  const [changed, setChanged] = useState({});

  const changeFilter = (code, selected) => {
    if(!inDrawer && !loading) {
      onChange({[code]: selected});
      return;
    }

    setChanged({
      ...changed,
      [code]: selected
    });
  }

  const applyFilters = () => {
    if(loading) return;
    onChange(changed);
  }

  return (
    <Box className={classes.filters}>
      {inDrawer && <Box textAlign="right" className={classes.actions}>
        <Button className={classes.done} size="small" onClick={applyFilters} disabled={loading}>Done</Button>
      </Box>}
      {filters.map(filter => <FilterItem inDrawer={inDrawer} key={filter.code} filter={filter} onChange={changeFilter} />)}
    </Box>
  )
}

const styled = withStyles(styles)(ListView)
export default styled