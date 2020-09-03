import * as types from './types'

import { dispatchFetch } from '../dispatchFetch'

export const getCategoryList = () => {
  return dispatchFetch({
    url: '/category/list',
    label: types.GET_LIST
  });
}