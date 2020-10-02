import React, { useState } from 'react'
import { Box, Grid, Paper, Typography, Button } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'

import { useStyles } from './ItemViewStyles'

export default function ItemView({ deal, onBuyNow }) {

  const [expired, setExpired] = useState(false);
  const [loading, setLoading] = useState(false);

  const classes = useStyles();

  if(!deal) return null;

  const buyNow = () => {
    if (typeof (onBuyNow) === 'function') {
      setLoading(true);
      onBuyNow(deal)
        .then(response => {
          setLoading(false);
          //console.log('after buy now: ', response);
        })
        .catch(error => {
          setLoading(false);
          setExpired(true);
        });
    }
  }

  return (
    <Paper elevation={3} classes={{ root: classes.deal }}>
      <Grid container classes={{ root: classes.top }}>
        <Grid item sm={2}></Grid>
        <Grid item sm={8}>
          <Box className={classes.meta}>
            {deal.store && <span><a target="_blank" rel="noopener noreferrer" href={deal.store.website}>{deal.store.name}</a> | </span>}
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
            {deal.discount && <span className="discount">{deal.discount}</span>}
            <span className="highlight">{deal.highlight}</span>{' '}
            {deal.freeShipping && <span className="delivery">Free Shipping</span>}
          </Box>
          <Typography variant="body2" classes={{ root: classes.description }}>{deal.description}</Typography>
          {expired && <Alert severity="warning">Oops! This deal is temporarily unavailable or has expired.</Alert>}
        </Grid>
        <Grid item sm={2} xs={12}>
          <Box display="flex" justifyContent="center" className={classes.actions}>
            <Button 
              color="primary"variant="contained" 
              href={deal.source} target="_blank" rel="noopener" 
              disabled={expired || loading} 
              onClick={buyNow}>
                {loading ? 'Opening' : 'Buy Now'}
            </Button>
          </Box>
        </Grid>
      </Grid>

    </Paper>
  )
}