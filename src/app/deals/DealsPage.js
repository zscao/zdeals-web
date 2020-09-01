import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { Box, Grid } from '@material-ui/core'

import HeadBar from './header'
import Toolbar from './toobar'
import Deals from './list'
import Filters from './filter'

import { useStyles } from './DealsPageStyles'

import * as dealsAction from '../../state/ducks/deals/actions'

function DealsPage({searchDeals, search}) {

  const classes = useStyles();

  useEffect(() => {
    searchDeals({});
  }, [])


  const searchResult = (search && search.result) || {}

  return (
    <Box>
      <HeadBar />
      <Toolbar />
      <Box className={classes.dealsBox}>
        <Grid container>
          <Grid item md={2}>
              <Filters filters={searchResult.filters} />
          </Grid>
          <Grid item md={10}>
              <Deals deals={searchResult.deals} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

const mapStateToProps = state => ({
  search: state.deals.search,
  loaded: state.deals.loaded
})

const mapDispatchToProps = {
  ...dealsAction
}

export default connect(mapStateToProps, mapDispatchToProps)(DealsPage)