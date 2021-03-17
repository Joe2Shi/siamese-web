import vue from '../main'
import axios from 'axios'
import store from '../store'

const service = axios.create({
  baseURL: 'http://api.joe2shi.com',
  timeout: 10000
})

service.interceptors.request.use(config => {
  const token = localStorage.token
  if (token) {
    config.headers.token = token
  }
  store.state.loading = true
  return config
})

service.interceptors.response.use(response => {
  store.state.loading = false
  return response
}, error => {
  store.state.loading = false
  if (error.response && error.response.status === 401) {
    vue.$router.push({ path: 'signin' })
  }
  if (error.code === undefined) {
    vue.$store.dispatch('showSnackbar', { message: error.message, color: 'error' })
  }
  if (error.code === 'ECONNABORTED') {
    vue.$store.dispatch('showSnackbar', { message: vue.$t('System.ConnectTimeout'), color: 'error' })
  }
})

export default service
