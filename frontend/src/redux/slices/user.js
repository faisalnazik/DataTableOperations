import { createSlice } from '@reduxjs/toolkit'
// utils
import axios from 'src/utils/axios'

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null
}

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true
      state.error = null
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false
      state.error = action.payload
    },

    // GET USERS
    getUserSuccess(state, action) {
      state.isLoading = false
      state.users = action.payload
    },

    // UPDATE USER
    updateUserSuccess(state, action) {
      state.isLoading = false
      state.users = state.users.map((user) => {
        if (user.id === action.payload.id) {
          return action.payload
        }
        return user
      })
    }
  }
})

// Reducer
export default slice.reducer
export const { actions } = slice

// Actions
export function getUsers() {
  return async (dispatch) => {
    dispatch(actions.startLoading())
    try {
      const response = await axios.get('/api/v1/accounts/users/')
      dispatch(actions.getUserSuccess(response.data))
    } catch (error) {
      dispatch(actions.hasError(error))
    }
  }
}

export function updateUser(user) {
  return async (dispatch) => {
    dispatch(actions.startLoading())
    try {
      const response = await axios.put(`/api/v1/accounts/users/${user.id}/`, user)
      dispatch(actions.updateUserSuccess(response.data))
    } catch (error) {
      dispatch(actions.hasError(error))
    }
  }
}
