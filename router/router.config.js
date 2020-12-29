import Vue from 'vue'
// 路由
import VueRouter from "vue-router";

import UserLogin from "../components/UserLogin";
import Index from "../src/index";
import Authority from "../src/authority";
import Center from "../src/center.vue";
import Detail from "../src/detail.vue";
import Hou_login from "../components/hou_login.vue";
import Sort from "../src/sort.vue";
import Index2 from "../src/index2.vue";
import Cart from "../src/Cart.vue";
import Balance from "../src/balance";
import Datum from "../src/datum";



Vue.use(VueRouter)

var router = new VueRouter({
  routes:[
    {path:"/userLogin",component:UserLogin},
    {path:"/index",component:Index},
    {path:"/authority",component:Authority},
    {path:"/center",component:Center},
    {path:"/hou_login",component:Hou_login},
    {path:"/detail",component:Detail},
    {path:"/sort",component:Sort},
    {path:"/cart",component:Cart},
    {path:"/balance",component:Balance},
    {path:"/datum",component:Datum},
    {path:"/index2",component:Index2},
    {path:"/",component:Index}//默认访问登录页面
  ]
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

//导出路由管理器对象
export default router
