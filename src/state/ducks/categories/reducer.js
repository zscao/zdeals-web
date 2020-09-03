import * as types from './types'
import * as apiTypes from '../api/types'

const defaultState = {
  list: {
    query: null,
    result: null
  }
}

function categories(state = defaultState, action) {
  switch(action.type) {
    case apiTypes.API_SUCCESS:
      return handleApiSuccessAction(state, action.payload);

    default: return state;
  }
}

function handleApiSuccessAction(state, payload) {
  if(!payload.label) return state;

  switch(payload.label) {
    case types.GET_LIST:
      return {
        ...state,
        list: {
          ...state.list,
          ...payload
        }
      };

    default: return state;
  }
}


export default categories