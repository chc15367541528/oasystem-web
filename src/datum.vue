<template>
  <div class="datum">
    <!--顶部-->
    <div style="height: 115px">
      <div class="head">
        <div style="width: 1170px;margin: auto">
          <div class="s-sub">
            <a class="head-left" href="index.html">首页</a>
            <a class="head-left" href="index.html">速客官网</a>
          </div>
          <div class="s-main">
            <span v-show="account==0" class="head-right">您好，请
              <a href="javascript:;" style="color: white" @click="$router.push('/userLogin')">登录</a>
            </span>

            <a class="head-right" href="javascript:;" v-show="account!=0">欢迎你， {{account}}</a>
            <a class="head-right" href="javascript:;" @click="$router.push('/register')" v-show="account==0">注册</a>
            <a class="head-right" href="javascript:;" @click="$router.push('/datum')">个人中心</a>
            <a class="head-right" href="javascript:;" @click="$router.push('/cart')">购物车</a>
          </div>
        </div>
      </div>
      <!--顶部logo/搜索框-->
      <div class="box-top">
        <div style="width: 1170px;margin: auto">
          <div class="row">
            <a href="index.html" class="logo"></a>
            <div class="search-top">
              <input placeholder="华为 Mate 40 Pro 5G" class="search-top-ipt"/>
              <a class="a-search" href="javascript:;">
                <img class="icon-search" src="src/img/icon/搜索.png"/>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
    <!--主体-->
    <div class="container">
      <div class="datum_box">
        <!--左侧菜单-->
        <div class="datum_menu_box">
          <div class="datum_menu_title" @click="menuShow(1)">个人中心</div>
          <div class="datum_menu_name" @click="menuShow(2)">我的资料</div>
          <div class="datum_menu_name" @click="menuShow(3)">我的订单</div>
        </div>
        <!--右侧信息-->
        <div class="datum_right_box">
          <!--首页-->
          <div class="datum_index_box">
            <!--用户信息-->
            <div class="index_msg_box">
              <div class="index_msg_box_left">
                <img src="src/img/bg1.jpg" class="index_msg_img"/>
                <span class="index_msg_name">张三</span>
                <span class="index_msg_account">速客账号: admin</span>
                <span class="index_msg_sm">已实名</span>
                <span class="index_msg_xgzl">修改资料</span>
              </div>
              <div class="index_msg_box_center">
                <span class="index_msg_ddTitle">订单数量</span>
                <span class="index_msg_ddNum">32</span>
              </div>
              <div class="index_msg_box_right">
                <span class="index_msg_merchants_title">提货商户/地址
                <a href="javascript:;" class="index_msg_merchants_edit">编辑</a>
                </span>
                <span class="index_msg_merchants">商户： 老八秘制小汉堡</span>
                <span class="index_msg_address">地址： 湖南硅谷高科软件学院</span>
              </div>
            </div>
            <!--最近订单-->
            <div class="index_msg_order">
              <span class="index_msg_order_title">最近订单
              <a href="javascript:;" class="index_msg_order_queryAll">查看全部>></a>
              </span>
              <div class="index_msg_order_box">
                <div class="index_msg_order_box_top">
                  <img src="src/img/telePhone/10005906_1602833491986_750x750.png.webp" class="index_msg_order_img"/>
                  <div class="index_msg_order_xx">
                    <span class="index_msg_order_name">vivo Y37s</span>
                    <span class="index_msg_order_color">颜色：黑色</span>
                    <span class="index_msg_order_version">版本：8G+128G</span>
                    <span class="index_msg_order_mer">提货商户：老八秘制小汉堡</span>
                    <span class="index_msg_order_address">提货地址：湖南硅谷高科软件学院</span>
                  </div>
                  <span class="index_msg_order_price">￥1599</span>
                  <span class="index_msg_order_num">x1</span>
                  <span class="index_msg_order_state">已发货</span>
                </div>
                <div class="index_msg_order_box_bottom">
                  <div class="index_msg_order_box_bottom_top">
                    <span class="index_msg_sm">运费险</span>
                    <span class="index_msg_order_msg">退换货可自动理赔</span>
                    <span class="index_msg_order_sumPrice">总价：<span style="color: red">￥1599</span></span>
                  </div>
                  <span class="qrsh_btn">确认收货</span>
                  <span class="sqtk_btn">申请退款</span>
                  <span class="order_state">已签收</span>
                </div>
              </div>
            </div>
          </div>
          <!--我的资料-->
          <div class="datum_grzl_box">
            <span class="datum_grzl_title">我的资料</span>
            <div class="datum_grzl_msg_box">
              <span class="datum_grzl_msg_title">账号：</span>
              <span class="datum_grzl_span" id="datum_account_span">admin</span>
              <input class="datum_grzl_ipt" id="datum_account_ipt"/>
            </div>
            <div class="datum_grzl_msg_box">
              <span class="datum_grzl_msg_title">昵称：</span>
              <span class="datum_grzl_span" id="datum_name_span">admin</span>
              <input class="datum_grzl_ipt" id="datum_name_ipt"/>
            </div>
            <div class="datum_grzl_msg_box">
              <span class="datum_grzl_msg_title">地址：</span>
              <span class="datum_grzl_span" id="datum_address_span">admin</span>
              <input class="datum_grzl_ipt" id="datum_address_ipt"/>
            </div>
            <div class="datum_grzl_msg_box">
              <span class="datum_grzl_msg_title">手机：</span>
              <span class="datum_grzl_span" id="datum_phone_span">admin</span>
              <input class="datum_grzl_ipt" id="datum_phone_ipt"/>
            </div>
            <div class="datum_grzl_msg_box">
              <span class="datum_grzl_msg_title">个人介绍：</span>
              <span class="datum_grzl_span" id="datum_remark_span">admin</span>
              <textarea id="datum_remark_ipt"></textarea>
            </div>
          </div>
          <!--我的订单-->
          <div class="datum_order_box">
            我的订单
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "datum",
    data() {
      return {
        account: 0,
      }
    },
    created() {
      this.getData();
    },
    methods: {
      /*获取数据*/
      getData() {
        var _this = this;

        if (sessionStorage.getItem("account") != null && sessionStorage.getItem("account") != undefined && sessionStorage.getItem("account") != "") {
          _this.account = sessionStorage.getItem("account");
        } else {
          _this.account = 0;
        }
      },
      /*页面菜单显示*/
      menuShow(data){
        if (data==1){
          $(".datum_grzl_box").hide();
          $(".datum_order_box").hide();
          $(".datum_index_box").show();
        }else if (data==2){
          $(".datum_grzl_box").show();
          $(".datum_order_box").hide();
          $(".datum_index_box").hide();
        }else {
          $(".datum_grzl_box").hide();
          $(".datum_order_box").show();
          $(".datum_index_box").hide();
        }
      },
    },
  }
</script>

<style scoped>
  .datum {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: left;
    background-color: #f0f3f7;
  }

  .head {
    width: 100%;
    height: 36px;
    line-height: 36px;
    background-color: rgba(0, 0, 0, .8);
  }

  .s-sub {
    float: left;
    text-align: left;
  }

  .s-main {
    float: right;
    text-align: right;
  }

  .head-left {
    display: inline-block;
    padding-left: 10px;
    padding-right: 10px;
    color: lightgray;
    font-size: 12px;
    text-decoration: none;
  }

  .head-left:hover {
    text-decoration: none;
    color: white;
  }

  .head-left:focus {
    text-decoration: none;
    color: white;
  }

  .head-right {
    display: inline-block;
    padding-left: 10px;
    padding-right: 10px;
    color: lightgray;
    font-size: 12px;
    text-decoration: none;
  }

  .head-right:hover {
    text-decoration: none;
    color: white;
  }

  .head-right:focus {
    text-decoration: none;
    color: white;
  }

  .box-top {
    width: 100%;
    height: 80px;
    background-color: white;
    position: absolute;
    z-index: 999;
    top: 35px;
    margin-bottom: 80px;
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, .1);
  }

  .logo {
    float: left;
    display: inline-block;
    width: 127px;
    height: 60px;
    margin-top: 10px;
    background: url("img/suke_logo.png");
    background-size: 100% 100%;
  }

  .search-top {
    float: right;
    width: 250px;
    height: 30px;
    margin-top: 24px;
    background-color: rgb(240, 240, 240);
    border-radius: 50px;
    overflow: hidden;
    border: transparent solid 1px;
  }

  .search-top:hover {
    border: lightgray solid 1px;
  }

  .search-top-ipt {
    float: left;
    width: 220px;
    height: 30px;
    background-color: transparent;
    border: none;
    outline: none;
    padding-left: 15px;
  }

  .a-search {
    display: inline-block;
    margin-top: 3px;
  }

  .icon-search {
    height: 20px;
    width: 20px;
  }

  .datum_box {
    width: 100%;
    height: 550px;
    background-color: white;
    border-radius: 10px;
    margin-top: 40px;
    padding: 20px 10px  20px 10px;
  }
  .datum_menu_box{
    float: left;
    width: 20%;
    height: 100%;
    border-right: lightgray solid 1px;
    padding: 20px;
  }
  .datum_menu_title{
    width: 100%;
    height: 70px;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
  }
  .datum_menu_name{
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    cursor: pointer;
    padding-left: 10px;
    border-radius: 10px;
    margin-bottom: 10px;
  }
  .datum_menu_name:hover{
    background-color: rgb(240,240,240);
  }
  .datum_right_box{
    float: left;
    width: 80%;
    height: 100%;
  }
  .datum_index_box{
    width: 100%;
    height: 100%;
    padding: 20px;
  }
  .index_msg_box{
    width: 100%;
    height: 27%;
    background-color: #f0f3f7;
    border-radius: 10px;
    padding: 10px;
  }
  .index_msg_box_left{
    float: left;
    width: 38%;
    height: 100%;
    border-right: lightgray solid 1px;
  }
  .index_msg_img{
    width: 100px;
    height: 100px;
    border-radius: 100%;
    border: lightgray solid 4px;
    box-shadow: 0 0 10px 0 rgba(0,0,0,.2);
    float: left;
    margin-top: 5px;
    margin-left: 10px;
  }
  .index_msg_name{
    float: left;
    display: inline-block;
    margin-left: 10px;
    margin-top: 10px;
    font-size: 18px;
    width: 190px;
    height: 30px;
    line-height: 30px;
  }
  .index_msg_account{
    display: inline-block;
    width: 190px;
    height: 30px;
    line-height: 30px;
    float: left;
    margin-left: 10px;
    font-size: 13px;
    color: gray;
  }
  .index_msg_sm{
    display: inline-block;
    color: dodgerblue;
    border: dodgerblue solid 1px;
    border-radius: 5px;
    padding-left: 5px;
    padding-right: 5px;
    font-size: 12px;
    margin-left: 10px;
    float: left;
    margin-top: 5px;
  }
  .index_msg_xgzl{
    display: inline-block;
    color: gray;
    border: gray solid 1px;
    border-radius: 5px;
    padding-left: 5px;
    padding-right: 5px;
    font-size: 12px;
    margin-left: 10px;
    float: left;
    margin-top: 5px;
    cursor: pointer;
  }
  .index_msg_box_center{
    float: left;
    width: 24%;
    height: 100%;
    border-right: lightgray solid 1px;
    text-align: center;
  }
  .index_msg_ddTitle{
    display: inline-block;
    width: 100%;
    height: 40%;
    font-size: 18px;
    padding-top: 10px;
  }
  .index_msg_ddNum{
    display: inline-block;
    margin-top: 20px;
    font-size: 16px;
    color: gray;
  }
  .index_msg_box_right{
    float: left;
    width: 38%;
    height: 100%;
  }
  .index_msg_merchants_title{
    display: inline-block;
    width: 100%;
    font-size: 18px;
    padding-top: 10px;
    padding-left: 20px;
  }
  .index_msg_merchants_edit{
    font-size: 13px;
    color: dodgerblue;
    float: right;
    margin-right: 20px;
    margin-top: 5px;
  }
  .index_msg_merchants{
    display: inline-block;
    width: 100%;
    padding-left: 20px;
    font-size: 13px;
    color: gray;
    margin-top: 20px;
  }
  .index_msg_address{
    display: inline-block;
    width: 100%;
    padding-left: 20px;
    font-size: 13px;
    color: gray;
  }
  .index_msg_order{
    height: 73%;
    width: 100%;
  }
  .index_msg_order_title{
    display: inline-block;
    width: 100%;
    height: 50px;
    font-size: 18px;
    padding-top: 20px;
    padding-left: 10px;
  }
  .index_msg_order_queryAll{
    float: right;
    font-size: 13px;
    color: dodgerblue;
    margin-right: 10px;
    margin-top: 5px;
  }
  .index_msg_order_box{
    height: 280px;
    width: 100%;
    margin-top: 13px;
    border-top: lightgray solid 1px;
  }
  .index_msg_order_box_top{
    width: 100%;
    height: 200px;
  }
  .index_msg_order_img{
    height: 180px;
    width: 180px;
    margin-left: 10px;
    margin-top: 10px;
    float: left;
  }
  .index_msg_order_xx{
    height: 100%;
    width: 550px;
    float: left;
    padding-top: 30px;
  }
  .index_msg_order_name{
    display: inline-block;
    width: 100%;
    font-size: 20px;
  }
  .index_msg_order_color{
    display: inline-block;
    width: 100%;
    font-size: 13px;
    color: gray;
  }
  .index_msg_order_version{
    display: inline-block;
    width: 100%;
    font-size: 13px;
    color: gray;
  }
  .index_msg_order_mer{
    display: inline-block;
    width: 100%;
    font-size: 13px;
    color: gray;
    margin-top: 30px;
  }
  .index_msg_order_address{
    display: inline-block;
    width: 100%;
    font-size: 13px;
    color: gray;
  }
  .index_msg_order_price{
    float: left;
    color: red;
    margin-top: 50px;
    margin-left: 30px;
  }
  .index_msg_order_num{
    float: right;
    margin-right: 40px;
    margin-top: 20px;
    color: gray;
  }
  .index_msg_order_state{
    float: right;
    margin-right: 40px;
    margin-top: 20px;
  }
  .index_msg_order_box_bottom{
    width: 100%;
    height: 80px;
  }
  .index_msg_order_box_bottom_top{
    width: 100%;
    height: 30px;
    float: left;
  }
  .index_msg_order_msg{
    float: left;
    color: gray;
    font-size: 12px;
    line-height: 30px;
    margin-left: 10px;
  }
  .index_msg_order_sumPrice{
    float: right;
    margin-right: 40px;
    line-height: 30px;
  }
  .qrsh_btn{
    display: inline-block;
    height: 30px;
    width: 80px;
    text-align: center;
    line-height: 30px;
    border: dodgerblue solid 1px;
    border-radius: 10px;
    color: dodgerblue;
    cursor: pointer;
    margin-top: 20px;
    margin-right: 40px;
    float: right;
  }
  .sqtk_btn{
    display: inline-block;
    height: 30px;
    width: 80px;
    text-align: center;
    line-height: 30px;
    border: gray solid 1px;
    border-radius: 10px;
    color: gray;
    cursor: pointer;
    margin-top: 20px;
    margin-right: 40px;
    float: right;
  }
  .order_state{
    float: right;
    display: inline-block;
    margin-right: 40px;
    margin-top: 20px;
    line-height: 30px;
    display: none;
  }
  .datum_grzl_box{
    width: 100%;
    height: 100%;
    display: none;
    padding: 20px 100px 20px 100px ;
  }
  .datum_grzl_title{
    display: inline-block;
    width: 100%;
    text-align: center;
    font-size: 18px;
  }
  .datum_grzl_msg_box{
    float: left;
    width: 50%;
    height: 50px;
    line-height: 50px;
    padding-left: 100px;
  }
  .datum_grzl_ipt{
    display: none;
  }
  .datum_order_box{
    width: 100%;
    height: 100%;
    padding: 20px;
    display: none;
  }
</style>
