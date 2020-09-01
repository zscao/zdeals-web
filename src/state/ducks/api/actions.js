import * as types from './types';

export const apiStart = label => ({
  type: types.API_START,
  payload: label
})

export const apiEnd = label => ({
  type: types.API_END,
  payload: label
})

export const apiSuccess = (label, result, query, state) => {
  const payload = {
    label,
    result,
    query
  };
  if(state) payload.state = state;

  return {
    type: types.API_SUCCESS,
    payload
  }
}

export const apiError = error => ({
  type: types.API_ERROR,
  error
})