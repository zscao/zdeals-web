import React, { useState, useEffect, useCallback } from 'react'

import FilterItemView from './FilterItemView'
import FilterItemViewInDrawer from './FilterItemViewInDrawer'

function FilterItem({ inDrawer, filter = {}, onChange, classes }) {

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

  return inDrawer 
      ? <FilterItemViewInDrawer filter={current} onChange={changeFilter} onClear={clear} />
      : <FilterItemView filter={current} onChange={changeFilter} onClear={clear} />
}

export default FilterItem