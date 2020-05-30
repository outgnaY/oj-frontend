import axios from 'axios'

const service = axios.create({
  // baseURL: '/test',
  timeout: 15000
})
// service.defaults.baseURL = "http://127.0.0.1:8088"
// service.defaults.baseURL = "/test"
export default service
