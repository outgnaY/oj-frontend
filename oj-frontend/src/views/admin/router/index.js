import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import Announcement from "../components/Announcement";
import ProblemList from "../views/problem/ProblemList";
import Problem from "../views/problem/Problem";

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
        },
        {
          path: 'problem/create',
          name: 'create-problem',
          component: Problem
        },
        {
          path: 'problem/edit/:problemId',
          name: 'edit-problem',
          component: Problem
        }
      ]
    }
  ]
})
