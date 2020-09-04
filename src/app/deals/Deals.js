import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import { Box, Grid, Hidden } from '@material-ui/core'

import BottomScrollListener from 'react-bottom-scroll-listener'

import Header from './header'
import TopBar from './top-bar'
import List from './list'
import Filters from './filter'

import { dealSearchHelper, openLinkInNewTab } from '../helpers'

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

  queryMore = () => {

    const { searchResult = {}, location } = this.props;
    if(!searchResult.more || !searchResult.page) return;
    
    const page = searchResult.page + 1;
    const query = dealSearchHelper.getQueryFromSearchString(location.search);
    query.page = page;

    this.props.queryMoreDeals(query);
  }

  buyNow = deal => {
    if (!deal || !deal.id) return Promise.resolve(true);

    return this.props.visitDeal(deal.id)
      .then(response => {
        //console.log('visit deal: ', response);
        // if (response.source) openLinkInNewTab(response.source);
        return response;
      })
      .catch(error => {
        //console.log('error:', error);
        if (Array.isArray(error.errors) && error.errors.length > 0) {
          return Promise.reject(error.errors[0]);
        }
        else {
          return Promise.reject({
            code: 500,
            message: 'Internal server error'
          })
        }
      })
  }

  jumpTo = next => {
    const { history } = this.props;
    history.push(next);
  }

  render() {
    const { searchResult = {}, classes } = this.props;

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
              <List deals={searchResult.deals} onBuyNow={this.buyNow}/>
            </Grid>
          </Grid>
        </Box>
        <BottomScrollListener onBottom={this.queryMore} />
      </Box>
    )
  }
}

const mapStateToProps = state => ({
  searchResult: state.deals.search.result,
})

const mapDispatchToProps = {
  ...dealActions
}

const styled = withStyles(styles)(Deals);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(styled))