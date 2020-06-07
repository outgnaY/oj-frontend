// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '../../store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Panel from "./components/Panel";
import Cancel from "./components/Cancel";
import Save from "./components/Save";
import IconBtn from "./components/IconBtn";
import katex from '../../plugins/katex'
import filters from "../../utils/filters";

import './style.less'

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(katex)
Vue.component(Panel.name, Panel)
Vue.component(Cancel.name, Cancel)
Vue.component(Save.name, Save)
Vue.component(IconBtn.name, IconBtn)
Vue.prototype.$error = (msg) => {
  Vue.prototype.$message({'message': msg, 'type': 'error'})
}
Vue.prototype.$success = (msg) => {
  Vue.prototype.$message({'message': msg})
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
