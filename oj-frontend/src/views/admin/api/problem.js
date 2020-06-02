import request from '../../../utils/request'

export default {
  getProblemList(page, pageSize) {
    let params = {
      page: page,
      pageSize: pageSize
    }
    return request({
      url: '/api/admin/problem/get_page',
      method: 'get',
      params: params
    })
  }
}
