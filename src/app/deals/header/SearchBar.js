import React, { useState, useRef } from 'react'
import { Box, IconButton, InputBase, NativeSelect } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

import { withStyles } from '@material-ui/core/styles'
import { styles } from './SearchBarStyles'

function SearchBar({onSearch, classes}) {

  const [category, setCategory] = useState('');
  const [keywords, setKeywords] = useState('');

  const keywordsInput = useRef(null);

  const search = () => onSearch({c: category, k: keywords.trim()});

  const selectCategory = c => {
    setCategory(c);
    keywordsInput.current.select();
    keywordsInput.current.focus();
  }

  const onKeywordsInputKeyPress = e => {
    if(e.key === 'Enter') search();
  }

  return (
    <Box className={classes.search}>
      <NativeSelect inputProps={{'aria-label': 'category'}} disableUnderline className={classes.select} onChange={e => selectCategory(e.target.value)}>
        <option value="">All category</option>
        <option value="computers">Computers</option>
        <option value="monitors">Monitors</option>
        <option value="electrics">Electrics</option>
      </NativeSelect>
      <InputBase classes={{root: classes.inputRoot, input: classes.inputInput}} onChange={e => setKeywords(e.target.value)} inputRef={keywordsInput} onKeyPress={onKeywordsInputKeyPress} />
      <Box className={classes.searchButton}>
        <IconButton color="inherit" aria-label="search" onClick={search}>
          <SearchIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

const styled = withStyles(styles)(SearchBar)
export default styled