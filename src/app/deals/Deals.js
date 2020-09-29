import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import { Box, Grid, Hidden, Drawer } from '@material-ui/core'

import BottomScrollListener from 'react-bottom-scroll-listener'

import TopBar from './top-bar'
import List from './list'
import FilterBar from './filter-bar'
import LoadingBar from './loading-bar'

import { dealSearchHelper } from '../helpers'

import { styles } from './DealsStyles'

import * as dealActions from '../../state/ducks/deals/actions'

const DEFAULT_SORT = "default";

class Deals extends React.Component {

  constructor(props) {
    super(props);
    
    const query = dealSearchHelper.getQueryFromSearchString(this.props.location.search);
    this.state = {
      sort: query.sort || DEFAULT_SORT,
      isShowFilters: false,
      loading: false,
    }
  }


  componentDidUpdate(prevProps) {
    const currLocation = this.props.location;
    const prevLocation = prevProps.location;

    if(currLocation.search !== prevLocation.search) {
      const query = dealSearchHelper.getQueryFromSearchString(currLocation.search);
      
      this.setState({
        sort: query.sort || DEFAULT_SORT
      });
      this.props.searchDeals(query)
    }

    // set loading state
    if(dealSearchHelper.isSearchingDeals(this.props.loadings)) {
      if(!this.state.loading) this.setState({loading: true});
    }
    else if(this.state.loading) {
      this.setState({loading: false});
    }
  }

  sortDeals = sort => {
    if(this.state.loading) return;

    const { location } = this.props;
    if(sort === DEFAULT_SORT) sort = undefined;

    const search = dealSearchHelper.getSearchUrlFromLocation(location.pathname, location.search, {sort});
    this.jumpTo(search);
  }

  filterDeals = (filter, shouldToggleFilters) => {

    //console.log('filter: ', filter);

    if(shouldToggleFilters) this.toggleFitlers();

    const { location } = this.props;
    const search = dealSearchHelper.getSearchUrlFromLocation(location.pathname, location.search, filter);
    this.jumpTo(search);
  }

  queryMore = () => {
    if(this.state.loading) return;

    const { searchResult = {}, location } = this.props;
    if(!searchResult.more || !searchResult.page) return;
    
    const page = searchResult.page + 1;
    const query = dealSearchHelper.getQueryFromSearchString(location.search);
    query.page = page;

    this.props.queryMoreDeals(query)
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

  toggleFitlers = () => {
    //console.log('toggle filter')
    this.setState({
      isShowFilters: !this.state.isShowFilters
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
        <LoadingBar loading={this.state.loading} />
        <TopBar sort={this.state.sort} onSort={this.sortDeals} onMore={this.toggleFitlers} />
        <Box className={classes.dealsBox}>
          <Grid container>
            <Hidden smDown>
              <Grid item md={2}>
                <FilterBar filters={searchResult.filters} onChange={filter => this.filterDeals(filter, false)} loading={this.state.loading} />
              </Grid>
            </Hidden>
            <Grid item md={10} sm={12}>
              <List deals={searchResult.deals} onBuyNow={this.buyNow}/>
              <BottomScrollListener offset={50} onBottom={this.queryMore} />
            </Grid>
          </Grid>
        </Box>
        <Hidden mdUp>
          <Drawer anchor="bottom" open={this.state.isShowFilters} onClose={this.toggleFitlers}>
            <FilterBar inDrawer filters={searchResult.filters} onChange={filter => this.filterDeals(filter, true)} loading={this.state.loading} />
          </Drawer>
        </Hidden>
      </Box>
    )
  }
}

const mapStateToProps = state => ({
  searchResult: state.deals.search.result,
  loadings: state.api.loadings
})

const mapDispatchToProps = {
  ...dealActions
}

const styled = withStyles(styles)(Deals);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(styled))