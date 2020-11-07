import * as types from './types'

import { dispatchFetch } from '../dispatchFetch'

export const searchDeals = data => {
  return dispatchFetch({
    url: '/deals',
    label: types.SEARCH_DEALS,
    data
  });
}

export const queryMoreDeals = data => {
  return dispatchFetch({
    url: '/deals',
    label: types.QUERY_MORE,
    data
  })
}

export const visitDeal = dealId => {
  return dispatchFetch({
    url: `/deals/visit/${dealId}`,
    label: types.VISIT_DEAL,
    method: 'POST'
  })
}

export const loadPriceHistory = dealId => {
  return dispatchFetch({
    url: `/deals/price/${dealId}`,
    label: types.LOAD_PRICE_HISOTRY
  })
}