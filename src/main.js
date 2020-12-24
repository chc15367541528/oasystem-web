import Vue from 'vue'
import App from './App.vue'
import Login from '../components/UserLogin.vue'
import Index2 from "./index2.vue";

//导入bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import $ from 'jquery'
import 'bootstrap/dist/js/bootstrap.min'

//导入axios
import Axios from 'axios'
//配置axios访问的地址
Axios.defaults.baseURL = "http://localhost:8080/oasystem"
// 将baseURL绑定到全局
Vue.prototype.$axios = Axios

//导入路由
import Router from '../router/router.config'

// 导入vuex
import Store from '../vuex/store.js'

// 导入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

new Vue({
  el: '#app',
  render: h => h(App),
  router:Router,
  store:Store//挂载Store
})
