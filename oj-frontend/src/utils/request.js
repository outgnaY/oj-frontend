import axios from 'axios'
import store from '../store'
import {ERROR_CODE} from './constants'

const service = axios.create({
  // baseURL: '/test',
  timeout: 15000
})
service.interceptors.response.use(
  response => {
    if(response.data.code !== 0) {
      if(response.data.code === ERROR_CODE.ERROR_CODE_AUTH) {
        store.dispatch('changeModalStatus', {'mode': 'login', 'visible': true})
      }
      return response
    }
    else {
      return response
    }
  },
  error => {
    return Promise.reject(error)
  })
export default service
