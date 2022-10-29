import { combineReducers } from 'redux'

import storage from 'redux-persist/lib/storage'
// slices

import userReducer from './slices/user'
import stocksReducer from './slices/stocks'

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
}

const rootReducer = combineReducers({
  user: userReducer,
  stocks: stocksReducer
})

export { rootPersistConfig, rootReducer }
