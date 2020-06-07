// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import VueClipboard from 'vue-clipboard2'
import Panel from './components/Panel'
import store from '../../store'
import 'iview/dist/styles/iview.css'
import '../../styles/index.less'
import filters from "../../utils/filters";

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
Vue.use(iView)
Vue.use(VueClipboard)
Vue.component(Panel.name, Panel)
// 注册全局消息提示
Vue.prototype.$Message.config({
  duration: 2
})
Vue.prototype.$error = (s) => Vue.prototype.$Message.error(s)
Vue.prototype.$info = (s) => Vue.prototype.$Message.info(s)
Vue.prototype.$success = (s) => Vue.prototype.$Message.success(s)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
