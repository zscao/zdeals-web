import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import { Box, Grid, Hidden } from '@material-ui/core'

import Header from './header'
import TopBar from './top-bar'
import List from './list'
import Filters from './filter'

import { dealSearchHelper } from '../shared'

import { styles } from './DealsStyles'

import * as dealActions from '../../state/ducks/deals/actions'


class Deals extends React.Component {

  componentDidUpdate(prevProps) {
    const currLocation = this.props.location;
    const prevLocation = prevProps.location;

    if(currLocation.search !== prevLocation.search) {
      const query = dealSearchHelper.getQueryFromSearchString(currLocation.search);
      this.props.searchDeals(query);
    }
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
        <Header />
        <TopBar onSort={this.sortDeals} />
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
})

const mapDispatchToProps = {
  ...dealActions
}

const styled = withStyles(styles)(Deals);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(styled))