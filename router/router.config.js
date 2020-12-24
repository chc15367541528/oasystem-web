import Vue from 'vue'
// 路由
import VueRouter from "vue-router";

import UserLogin from "../components/UserLogin";
import Index from "../src/index";
import Authority from "../src/authority";


Vue.use(VueRouter)

export  default  new VueRouter({
  routes:[
    {path:"/userLogin",component:UserLogin},
    {path:"/index",component:Index},
    {path:"/authority",component:Authority},
    {path:"/",component:Authority}//默认访问登录页面
  ]
})
