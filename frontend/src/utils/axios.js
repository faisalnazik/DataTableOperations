import axios from 'axios'

// ----------------------------------------------------------------------

const HOST_API = 'http://localhost:8000/'

const axiosInstance = axios.create({
  baseURL: HOST_API
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
)

export default axiosInstance
