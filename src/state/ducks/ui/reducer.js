import * as types from './types'

const defaultState = {
  showNavBar: false
}

export default function ui(state = defaultState, action) {
  switch(action.type) {
    case types.TOGGLE_NAVBAR:
      return {
        ...state,
        showNavBar: !state.showNavBar
      };

    default: return state;
  }
}