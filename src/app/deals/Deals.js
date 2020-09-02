import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import { Box, Grid, Hidden } from '@material-ui/core'

import HeadBar from './header'
import Toolbar from './toobar'
import List from './list'
import Filters from './filter'

import { dealSearchHelper } from '../shared'

import { styles } from './DealsStyles'

import * as dealsAction from '../../state/ducks/deals/actions'


class Deals extends React.Component {

  componentDidMount() {
    const { searchDeals, location } = this.props;
    const query = dealSearchHelper.getQueryFromSearchString(location.search);

    searchDeals(query);
  }

  componentDidUpdate(prevProps) {
    const currLocation = this.props.location;
    const prevLocation = prevProps.location;

    if(currLocation.search !== prevLocation.search) {
      const query = dealSearchHelper.getQueryFromSearchString(currLocation.search);
      this.props.searchDeals(query);
    }
  }

  searchDeals = (query = {}) => {

    const { location } = this.props;
    if(!query.c) query.c = undefined;
    if(!query.k) query.k = undefined;

    const search = dealSearchHelper.getSearchUrlFromLocation(location.pathname, null, query);
    this.jumpTo(search);
  }

  sortDeals = sort => {

    const { location } = this.props;
    if(sort === 'default') sort = undefined;

    const search = dealSearchHelper.getSearchUrlFromLocation(location.pathname, location.search, {sort});
    this.jumpTo(search);
  }

  filterDeals = (code, items) => {

    const filter = {[code]: items};
    //console.log('filter: ', filter);

    const { location } = this.props;

    const search = dealSearchHelper.getSearchUrlFromLocation(location.pathname, location.search, filter);
    this.jumpTo(search);
  }

  jumpTo = next => {
    const { history } = this.props;
    history.push(next);
  }

  render() {
    const { search, classes } = this.props;
    const searchResult = (search && search.result) || {}

    return (
      <Box>
        <HeadBar onSearch={this.searchDeals} />
        <Toolbar onSort={this.sortDeals} />
        <Box className={classes.dealsBox}>
          <Grid container>
            <Hidden smDown>
              <Grid item md={2}>
                <Filters filters={searchResult.filters} onChange={this.filterDeals} />
              </Grid>
            </Hidden>
            <Grid item md={10} sm={12}>
              <List deals={searchResult.deals} />
            </Grid>
          </Grid>
        </Box>
      </Box>
    )
  }
}

const mapStateToProps = state => ({
  search: state.deals.search,
  loaded: state.deals.loaded
})

const mapDispatchToProps = {
  ...dealsAction
}

const styled = withStyles(styles)(Deals);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(styled))