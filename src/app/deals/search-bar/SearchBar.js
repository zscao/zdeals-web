import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { Box, IconButton, InputBase, NativeSelect } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

import { withStyles } from '@material-ui/core/styles'
import { styles } from './SearchBarStyles'

import { dealSearchHelper } from './../../shared'

class SearchBar extends React.Component {

  constructor(props) {
    super(props);

    // init state
    const currLocation = this.props.location;
    const query = dealSearchHelper.getSearchFromString(currLocation.search);

    this.state = {
      category: query.c || '',
      keywords: query.k || '',
    }
  }

  componentDidUpdate(prevProps) {
    const currLocation = this.props.location;
    const prevLocation = prevProps.location;

    // console.log('current location: ', currLocation);
    // console.log('current state: ', this.state);

    if(currLocation.search !== prevLocation.search) {
      const query = dealSearchHelper.getSearchFromString(currLocation.search);

      // console.log('query: ', query);

      if(!query.c) query.c = '';
      if(!query.k) query.k = '';

      const state = {};
      if(query.c !== this.state.category) state.category = query.c;
      if(query.k !== this.state.keywords) state.keywords = query.k;

      // console.log('new state: ', state);

      if(Object.keys(state).length > 0) {
        // console.log('change state: ', state);
        this.setState({...state});
      }
    }
  }

  setCategory = category => {
    this.setState({ category });
    this.keywordsInput.select();
    this.keywordsInput.focus();
  }

  setKeywords = keywords => {
    this.setState({ keywords })
  }

  onKeywordsInputKeyPress = e => {
    if (e.key === 'Enter') this.search();
  }

  search = () => {
    const query = {};
    if(this.state.category) query.c = this.state.category;

    const keywords = this.state.keywords.trim();
    if(keywords) query.k = keywords;

    const next = dealSearchHelper.getSearchUrlFromLocation('/deals', undefined, query);

    this.jumpTo(next)
  }

  jumpTo = next => {
    const { history } = this.props;
    history.push(next);
  }

  render() {

    const { classes, categories } = this.props;

    //console.log('current state in render: ', this.state);

    return (
      <Box className={classes.search}>
        <NativeSelect
          inputProps={{ 'aria-label': 'category' }} 
          disableUnderline 
          className={classes.select} 
          value={this.state.category}
          onChange={e => this.setCategory(e.target.value)}>
            <option value=''>All</option>
            {categories.map(x => <option key={x.code} value={x.code}>{'..'.repeat(x.path.length - 1) + x.title}</option>)}
        </NativeSelect>
        <InputBase 
          classes={{ root: classes.inputRoot, input: classes.inputInput }}
          value={this.state.keywords}
          onChange={e => this.setKeywords(e.target.value)} 
          inputRef={e => this.keywordsInput = e} 
          onKeyPress={this.onKeywordsInputKeyPress} />
        <Box className={classes.searchButton}>
          <IconButton color="inherit" aria-label="search" onClick={this.search}>
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>
    )
  }
}


const mapStateToProps = state => ({
  search: state.deals.search,
  categories: state.categories.list.result,
})

const styled = withStyles(styles)(SearchBar);
export default connect(mapStateToProps)(withRouter(styled))
