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
  },
  getProblemListByKeyword(page, pageSize, keyword) {
    let params = {
      page: page,
      pageSize: pageSize,
      keyword: keyword
    }
    return request({
      url: '/api/admin/problem/get_page_by_keyword',
      method: 'get',
      params: params
    })
  },
  getProblemById(id) {
    let params = {
      id: id
    }
    console.log(params)
    return request({
      url: '/api/admin/problem/get_by_id',
      method: 'get',
      params: params
    })
  },
  deleteProblem(id) {
    let params = {
      id: id
    }
    return request({
      url: '/api/admin/problem/del_by_id',
      method: 'get',
      params: params
    })
  },
  createProblem(data) {
    return request({
      url: '/api/admin/problem/create',
      method: 'post',
      data: data
    })
  },
  updateProblem(data) {
    console.log(data)
    return request({
      url: '/api/admin/problem/update',
      method: 'post',
      data: data
    })
  }
}
