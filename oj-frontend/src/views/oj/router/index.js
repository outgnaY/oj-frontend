import Vue from 'vue'
import Router from 'vue-router'
import About from '../views/help/About'
import HelloWorld from "../components/HelloWorld";

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'helloWorld',
      component: HelloWorld
    },
    {
      path: '/about',
      name: 'about',
      meta: {title: 'About'},
      component: About
    }
  ]
})
