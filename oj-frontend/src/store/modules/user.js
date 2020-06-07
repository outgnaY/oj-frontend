import types from "../types";
import storage from "../../utils/storage";
import api from '../../views/oj/api'
import {STORAGE_KEY, USER_TYPE} from "../../utils/constants";

const state = {
  user: {}
}
const getters = {
  user: state => state.user,
  isAuthenticated: (state, getters) => {
    // console.log(!!getters.user)
    return !!getters.user.username
  },
  isAdminRole: (state, getters) => {
    return getters.user.userType === USER_TYPE.ADMIN
  }
}
const mutations = {
  [types.CHANGE_USER](state, user) {
    state.user = user
    storage.set(STORAGE_KEY.AUTHED, !!user.username)
  }
}
const actions = {
  getUser({commit}) {
    api.user.getUserInfo().then(res => {
      console.log(res)
      commit(types.CHANGE_USER, res.data.data || {})
    })

  },
  clearUser({commit}) {
    commit(types.CHANGE_USER, {})
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
