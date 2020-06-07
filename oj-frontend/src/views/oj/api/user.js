import request from '../../../utils/request'

export default {
  login(data) {
    return request({
      url: '/api/user/login',
      method: 'get',
      params: data
    })
  },
  logout() {
    return request({
      url: '/api/user/logout',
      method: 'get'
    })
  },
  register(data) {
    // console.log("register")
    return request({
      url: '/api/user/register',
      method: 'get',
      params: data
    })
  },
  getUserInfo() {
    return request({
      url: '/api/user/get_user',
      method: 'get'
    })
  },
  checkExistByUsername(username) {
    let params = {
      username: username
    }
    return request({
      url: '/api/user/check_user',
      params: params
    })
  },
  checkExistByEmail(email) {
    let params = {
      email: email
    }
    return request({
      url: '/api/user/check_email',
      params: params
    })
  }
}
