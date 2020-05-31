import request from '../../../utils/request'

export default {
  getAnnouncementList(page, pageSize) {
    let params = {
      page: page,
      pageSize: pageSize
    }
    return request({
      url: '/api/announcement/get_page',
      method: 'get',
      params: params
    })
  }
}
