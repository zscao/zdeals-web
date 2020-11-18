import React, { useState } from 'react'
import { Box, Grid, Paper, Typography, Button } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'

import { useStyles } from './ItemViewStyles'
import { PriceChart } from '../../shared'

export default function ItemView({ deal, onBuyNow, onLoadPriceHistory }) {

  const [expired, setExpired] = useState(false);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState(undefined);

  const classes = useStyles();

  if(!deal) return null;

  const loadPriceHistory = () => {
    if(typeof onLoadPriceHistory !== 'function') return;

    onLoadPriceHistory(deal)
    .then(response => {
      // console.log('load price history: ', response);
      setPrice(response);
    })
    .catch(error => {
      setPrice([]);
    })
  }

  const buyNow = () => {
    if (typeof onBuyNow === 'function') {
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
            {deal.store && <span><a target="_blank" rel="noopener noreferrer" href={deal.source}>{deal.store.name}</a> | </span>}
            <span>added {deal.createdTimeString}</span>
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
            {deal.usedPriceString && <del>{deal.usedPriceString}</del>}
            {deal.discount && <span className="discount">{deal.discount}</span>}
            <span className="highlight">{deal.highlight}</span>{' '}
            {deal.freeShipping && <span className="delivery">Free Shipping</span>}
          </Box>
          <Typography variant="body2" classes={{ root: classes.description }}>{deal.description}</Typography>
          {expired && <Alert severity="warning">Oops! This deal is temporarily unavailable or has expired.</Alert>}
        </Grid>
        <Grid item sm={2} xs={12}>
          <Box display="flex" flexDirection="column" justifyContent="center" className={classes.actions}>
            <Button 
              color="primary" variant="contained" 
              href={deal.source} target="_blank" rel="noopener noreferrer" 
              disabled={expired || loading} 
              onClick={buyNow}>
                {loading ? 'Opening' : 'Buy Now'}
            </Button>
            <Button variant="contained" disabled={Array.isArray(price)} onClick={loadPriceHistory}>Price History</Button>

          </Box>

        </Grid>
      </Grid>

      {Array.isArray(price) && <Grid container>
        <Grid item sm={2}></Grid>
        <Grid item sm={8} xs={12}>
          {price.length > 0 ? <PriceChart data={price} /> : <Alert severity="info">Price history is not available for this item.</Alert>}
        </Grid>
        <Grid item sm={2}></Grid>
      </Grid>}

    </Paper>
  )
}