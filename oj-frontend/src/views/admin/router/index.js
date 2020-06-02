import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import Announcement from "../components/Announcement";
import ProblemList from "../views/problem/ProblemList";

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/admin/',
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: 'announcement',
          name: 'announcement',
          component: Announcement
        },
        {
          path: 'problems',
          name: 'problem-list',
          component: ProblemList
        }
      ]
    }
  ]
})
