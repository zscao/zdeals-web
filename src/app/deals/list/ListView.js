import React from 'react'
import { Box } from '@material-ui/core'

import ItemView from './ItemView'
import NoDeals from './NoDeals'

export default function DealsList({deals = [], onBuyNow, onLoadPriceHistory}) {

  if(deals.length === 0) return <NoDeals />

  return (
    <Box>
      {deals.map(deal => <ItemView key={deal.id} deal={deal} onBuyNow={onBuyNow} onLoadPriceHistory={onLoadPriceHistory} />)}
    </Box>
  )
}