import request from '../../../utils/request'

export default {
  getAnnouncementList(offset, limit) {
    let params = {
      offset: offset,
      limit: limit
    }
    return request({
      url: '/getAnnouncementList',
      method: 'get',
      params: params
    })
  }
}
