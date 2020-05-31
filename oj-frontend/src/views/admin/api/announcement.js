import request from '../../../utils/request'


export default {
  getAnnouncementList(page, pageSize) {
    let params = {
      page: page,
      pageSize: pageSize
    }
    return request({
      url: '/api/admin/announcement/get_page',
      method: 'get',
      params: params
    })
  },
  deleteAnnouncement(id) {
    let params = {
      id: id
    }
    return request({
      url: '/api/admin/announcement/del_by_id',
      method: 'get',
      params: params
    })
  },
  createAnnouncement(data) {
    return request({
      url: '/api/admin/announcement/create',
      method: 'get',
      params: data
    })
  },
  updateAnnouncement(data) {
    return request({
      url: '/api/admin/announcement/update',
      method: 'get',
      params: data
    })
  }
}
