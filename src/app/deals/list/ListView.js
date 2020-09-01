import React from 'react'
import { Box } from '@material-ui/core'

import ItemView from './ItemView'

export default function DealsList({deals = []}) {
  return (
    <Box>
      {deals.map(deal => <ItemView key={deal.id} deal={deal} />)}
    </Box>
  )
}