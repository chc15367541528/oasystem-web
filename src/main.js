import Vue from 'vue'
import App from './App.vue'
import App2 from "./App2.vue";
import Index2 from "./index2.vue";

// 导入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//导入axios
import Axios from 'axios'

//配置axios访问的地址
Axios.defaults.baseURL = "http://localhost:8080/oasystem_web_war_exploded"
// 将baseURL绑定到全局
Vue.prototype.$axios = Axios

//导入vuex
import Store from '../vuex/store.js'

Vue.use(ElementUI)

new Vue({
  el: '#app',
  render: h => h(Index2),
  store:Store,//挂载Store
})
