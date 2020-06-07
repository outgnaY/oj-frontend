import Vue from 'vue'
import Router from 'vue-router'
import About from '../views/help/About'
import Home from "../views/Home";
import ProblemList from "../views/problem/ProblemList";
import Logout from "../views/user/Logout";

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/logout',
      name: 'logout',
      meta: {title: 'Logout'},
      component: Logout
    },
    {
      path: '/about',
      name: 'about',
      meta: {title: 'About'},
      component: About
    },
    {
      path: '/problem',
      name: 'problem-list',
      meta: {title: 'Problem List'},
      component: ProblemList
    }
  ]
})
