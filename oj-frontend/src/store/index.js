import Vue from 'vue'
import Vuex from 'vuex'
import types from './types'
import api from '../views/oj/api'
// console.log(api)

Vue.use(Vuex)

const rootState = {
  website: {}
}

const rootGetters = {
  'website'(state) {
    return state.website
  }
}
const rootMutations = {
  [types.UPDATE_WEBSITE_CONF](state, payload) {
    state.website = payload
  }
}
const rootActions = {
  getWebsiteConfig({commit}) {
    api.base.getWebsiteConfig().then(res => {
      console.log(res.data)
      commit(types.UPDATE_WEBSITE_CONF, res.data)
    })
  }
}

export default new Vuex.Store({
  modules: {

  },
  state: rootState,
  getters: rootGetters,
  mutations: rootMutations,
  actions: rootActions
})

export {types}
