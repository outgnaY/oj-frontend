import Vue from 'vue'
import Vuex from 'vuex'
import types from './types'
import api from '../views/oj/api'
import user from "./modules/user";
// console.log(api)

Vue.use(Vuex)

const rootState = {
  website: {},
  modalStatus: {
    mode: 'login',
    visible: false
  }
}

const rootGetters = {
  'website'(state) {
    return state.website
  },
  'modalStatus'(state) {
    return state.modalStatus
  }
}
const rootMutations = {
  [types.UPDATE_WEBSITE_CONF](state, payload) {
    state.website = payload
  },
  [types.CHANGE_MODAL_STATUS](state, payload) {
    if(payload.mode !== undefined) {
      state.modalStatus.mode = payload.mode
    }
    if(payload.visible !== undefined) {
      state.modalStatus.visible = payload.visible
    }
  }
}
const rootActions = {
  getWebsiteConfig({commit}) {
    api.base.getWebsiteConfig().then(res => {
      // console.log(res.data)
      commit(types.UPDATE_WEBSITE_CONF, res.data.data)
    })
  },
  changeModalStatus({commit}, payload) {
    commit(types.CHANGE_MODAL_STATUS, payload)
  }
}

export default new Vuex.Store({
  modules: {
    user
  },
  state: rootState,
  getters: rootGetters,
  mutations: rootMutations,
  actions: rootActions
})

export {types}
