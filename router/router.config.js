import Vue from 'vue'
// 路由
import VueRouter from "vue-router";

import UserLogin from "../components/UserLogin";
import Index from "../src/index";
import Authority from "../src/authority";
import Center from "../src/center.vue";
import Detail from "../src/detail.vue";
import Hou_login from "../src/hou_login.vue";
import Sort from "../src/sort.vue";


Vue.use(VueRouter)

export  default  new VueRouter({
  routes:[
    {path:"/userLogin",component:UserLogin},
    {path:"/index",component:Index},
    {path:"/authority",component:Authority},
    {path:"/center",component:Center},
    {path:"/hou_login",component:Hou_login},
    {path:"/detail",component:Detail},
    {path:"/sort",component:Sort},
    {path:"/",component:Index}//默认访问登录页面
  ]
})
