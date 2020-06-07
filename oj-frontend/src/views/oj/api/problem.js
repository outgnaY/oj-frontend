import request from '../../../utils/request'

export default {
  getProblemList(page, pageSize) {
    let params = {
      page: page,
      pageSize: pageSize
    }
    return request({
      url: '/api/problem/get_page',
      method: 'get',
      params: params
    })
  },
  getProblemListByKeyword(page, pageSize, keyword) {
    let params = {
      page: page,
      pageSize: pageSize,
      keyword: keyword
    }
    return request({
      url: '/api/problem/get_page_by_keyword',
      method: 'get',
      params: params
    })
  }
}
