import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  // base: '/admin/',
  routes: [
    {
      path: '/admin/',
      name: 'home',
      component: Home
    }
  ]
})
