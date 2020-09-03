import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { dealSearchHelper } from '../../shared'

import * as dealsActions from '../../../state/ducks/deals/actions'
import * as categoryActions from '../../../state/ducks/categories/actions'

import './SplashScreen.css'


export function withSplashScreen(WrappedComponent) {

  class SpalshScreen extends React.Component {

    state = {
      loaded: false
    }

    componentDidMount() {
     const { searchDeals, getCategoryList, location } = this.props;
     const query = dealSearchHelper.getQueryFromSearchString(location.search);

      // loading data
      Promise.all([
        searchDeals(query),
        getCategoryList(),
      ])
      .then(() => {
        this.setState({loaded: true})
      });
    }

    render() {
      if(this.state.loaded) return <WrappedComponent {...this.props} />
      return LoadingMessage();
    }
  }
  
  const mapStateToProps = state => ({
    loaded: state.deals.loaded  // not in use
  })

  const mapDispatchToProps = {
    searchDeals: dealsActions.searchDeals,
    getCategoryList: categoryActions.getCategoryList,
  }

  return connect(mapStateToProps, mapDispatchToProps)(withRouter(SpalshScreen))
}


function LoadingMessage() {
  return (
    <div className="splash-screen">
      Please wait a moment while loading ...
      <div className="loading-dot">.</div>
    </div>
  )
}