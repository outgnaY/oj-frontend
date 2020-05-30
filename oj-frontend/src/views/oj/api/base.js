import request from '../../../utils/request'


export default {
  getLanguages() {
    return request({
      url: '/api/language',
      method: 'get'
    })
  },
  getWebsiteConfig() {
    return request({
      url: '/api/websiteconfig',
      method: 'get'
    })
  }
}

