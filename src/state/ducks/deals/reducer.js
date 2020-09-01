import * as types from './types'
import * as apiTypes from '../api/types'

const defaultState = {
  search: {
    query: null,
    result: null,
    state: null
  },
  loaded: false
}

function deals(state = defaultState, action) {
  switch(action.type) {
    case apiTypes.API_SUCCESS:
      return handleApiSuccessAction(state, action.payload);

    default: return state;
  }
}

function handleApiSuccessAction(state, payload) {
  if(!payload.label) return state;

  switch(payload.label) {

    case types.SEARCH_DEALS:
      return {
        ...state, 
        search: {
          ...state.search,
          ...payload
        },
        loaded: true
      };

    case types.QUERY_MORE:
      payload.result.deals = [
        ...state.search.result.deals,
        ...payload.result.deals
      ];
      payload.query = state.search.query;
      return {
        ...state, 
        search: {
          ...state.search,
          ...payload
        }
      };

    default: return state;
  }
}

export default deals;