import React from 'react'
import { Box, Grid, Paper, Typography, Button } from '@material-ui/core'

import { useStyles } from './ItemViewStyles'

export default function ItemView({ deal }) {

  const classes = useStyles();

  return (
    <Paper elevation={3} classes={{ root: classes.deal }}>
      <Grid container classes={{ root: classes.top }}>
        <Grid item sm={2}></Grid>
        <Grid item sm={8}>
          <Box className={classes.meta}>
            {deal.store && <span><a href="{deal.store.website}">{deal.store.name}</a> | </span>}
            <span>{deal.createdTimeString}</span>
          </Box>
        </Grid>
        <Grid item sm={2}></Grid>
      </Grid>
      <Grid container>
        <Grid item sm={2} xs={12}>
          <Box className={classes.picture}>
            <img src={deal.picture} alt="" />
          </Box>
        </Grid>
        <Grid item sm={8} xs={12}>
          <Typography variant="h6" classes={{ root: classes.title }}>{deal.title}</Typography>
          <Box className={classes.price}>
            <span className="deal-price">{deal.dealPriceString}</span>
            {deal.fullPriceString && <del>{deal.fullPriceString}</del>}
            <span className="discount">{deal.discount}</span>
            <span className="highlight">{deal.highlight}</span>
          </Box>
          <Typography variant="body2" classes={{ root: classes.description }}>{deal.description}</Typography>
        </Grid>
        <Grid item sm={2} xs={12}>
          <Box className={classes.actions}>
            <Button variant="contained" color="primary">Buy Now</Button>
          </Box>
        </Grid>
      </Grid>

    </Paper>
  )
}