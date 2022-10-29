import { createSlice } from '@reduxjs/toolkit'
// utils
import axios from 'src/utils/axios'

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null
}

const slice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.stocksLoading = true
      state.stocksError = null
    },

    // HAS ERROR
    hasError(state, action) {
      state.stocksLoading = false
      state.stocksError = action.payload
    },

    // GET Stocks
    getStocksSuccess(state, action) {
      state.stocksLoading = false
      state.stocks = action.payload
    }
  }
})

// Reducer
export default slice.reducer
export const { actions } = slice

// Actions
export function getStocks(company) {
  return async (dispatch) => {
    dispatch(actions.startLoading())
    try {
      const response = await axios.get('/api/v1/stocks/?company=' + company)
      dispatch(actions.getStocksSuccess(response.data))
    } catch (error) {
      dispatch(actions.hasError(error))
    }
  }
}
