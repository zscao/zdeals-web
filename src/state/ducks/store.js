import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import deals from './deals/reducer'
import categories from './categories/reducer'
import api from './api/reducer'

const middleware = [thunk];

if(process.env.NODE_ENV !== 'production') {
  const logger = createLogger();
  middleware.push(logger);
}

const reducers = combineReducers({
  deals,
  categories,
  api
});

export default createStore(
  reducers,
  applyMiddleware(...middleware)
)