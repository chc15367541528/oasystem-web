<template>
    <div class="hou_login">
      <!-- signin end -->
      <section class="signin">
        <div class="container">

          <div class="sign-content">

            <h2>速客数码后台登录</h2>
<!--            <el-form :model="loginForm">-->
            <div class="row">
              <div class="col-sm-12">
                <div class="signin-form">
                    <div class="form-group">
                      <label for="login_user">用户名</label>
<!--                      <el-form-item label="账号" prop="account">-->
<!--                        <el-input v-model="loginForm.account"></el-input>-->
                        <input class="form-control" v-model="account" id="login_user" placeholder="请输入用户名">
<!--                      </el-form-item>-->
                    </div>
                    <div class="form-group">
                      <label for="login_pass">密码</label>
<!--                      <el-form-item label="密码" prop="password">-->
<!--                        <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>-->
                        <input type="password" v-model="password" class="form-control" id="login_pass" placeholder="请输入密码">
<!--                      </el-form-item>-->
                    </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <div class="signin-footer">
<!--                  <el-form-item>-->
                  <button type="button" class="btn signin_btn signin_btn_two" data-toggle="modal"
                          data-target=".signin_modal" @click="login()">
                    登录
                  </button>
<!--                  </el-form-item>-->
                </div>
              </div>
            </div>
<!--            </el-form>-->
          </div>
        </div>

      </section>
    </div>
</template>

<script>
    export default {
        name: "hou_login",
      data() {
        return {
            account: '',
            password: ''
        };
      },
      methods: {
        login() {
          var _this = this

          var params = new URLSearchParams();
          params.append("account", _this.account);
          params.append("password", _this.password);

          this.$axios.post("staff/login.action", params).then(function (result) {
            if (result.data.code == "0") {
              //登录成功  跳转 首页
              alert(result.data.msg);
              sessionStorage.setItem("staffAccount", result.data.account)
              sessionStorage.setItem("staffid", result.data.id)
              _this.$router.push("/index2");
            } else {
              alert(result.data.msg);
            }
          }).catch(function (error) {
              elert(error);
            }
          )
        }
      }
    }
</script>

<style scoped>
  .hou_login{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: left;
  }

  a,a:hover,a:active,a:focus {
    display:inline-block;
    text-decoration:none;
    color: #7c8089;
    font-size: 16px;
    font-weight: 400;
    padding:0;
  }
  h1,h2,h3,h4,h5,h6 {
    margin: 0;
    color:#464d5f;
    font-family: 'Poppins', sans-serif;
    text-transform: capitalize;
    font-weight: 400;
  }
  p {
    margin: 0;
    line-height: 28px;
    color:#97a0ba;
    font-size:16px;
    font-family: 'Poppins', sans-serif;
  }
  img{    border:none;max-width:100%; height:auto;}
  ul{
    padding: 0;
    margin: 0 auto;
    list-style: none;
  }
  ul li {
    list-style: none;

  }
  select,input,textarea,button,.form-control{box-shadow:none;outline:0!important;}


  html,body{
    height: 100%;
    position: relative;
    z-index: 2;
  }
  [placeholder]:focus::-webkit-input-placeholder {
    -webkit-transition: opacity 0.3s 0.3s ease;
    -moz-transition: opacity 0.3s 0.3s ease;
    -ms-transition: opacity 0.3s 0.3s ease;
    -o-transition: opacity 0.3s 0.3s ease;
    transition: opacity 0.3s 0.3s ease;
    opacity: 0;
  }


  .signin{
    background: #f4f6fa;
    padding: 250px 0;
  }

  .sign-content {
    max-width: 620px;
    margin: 0 auto;
  }
  .sign-content h2{
    color: #464d5f;
    font-size: 30px;
    text-align: center;
    margin-bottom: 54px;
  }

  /*.signin-form  .form-control*/
  .signin-form  .form-control {
    background: transparent;
    border: transparent;
    border-bottom: 1px solid #bcbfc9;
    border-radius: 0;
    outline: 0!important;
    box-shadow: none;
    padding: 0px 0;
    height: 46px;
    -webkit-transition: linear .5s;
    -moz-transition: linear .5s;
    -ms-transition: linear .5s;
    -o-transition: linear .5s;
    transition: linear .5s;
  }
  .signin-form  .form-control:hover,.signin-form  .form-control:focus{
    border-bottom: 1px solid #474d5b;
    color:#474d5b;
  }

  .signin-form label{
    position: relative;
    top: 5px;
    color: #474d5b;
    font-size:14px;
    font-weight: 500;
    text-transform: capitalize;
    margin-bottom: 0px;
  }
  .signin-form input[type="text"],.signin-form input[type="email"],.signin-form input[type="password"]{
    color:#474d5b;
    font-size:16px;
    font-weight: 400;
  }
  .form-control{
    padding-left: 20px;
    padding-right: 20px;
  }

  /*.password-circle*/
  .signin-password,.signin-modal-password {
    margin-top: 15px;
  }
  .password-circle,.password-modal-circle {
    display: inline-block;
    margin-bottom: 17px;
  }
  .single-password-circle,.single-password-modal-circle{
    display: inline-block
  }
  .single-forgot-password-circle ,.single-forgot-password-modal-circle {
    display: inline-block;
    float: right;
    color: #7c8089;
    font-size: 16px;
    font-weight: 400;
  }
  .single-password-circle input[type="radio"],.single-password-modal-circle input[type="radio"] {
    display:none;
  }
  .single-password-circle input[type="radio"] + label,.single-password-modal-circle input[type="radio"] + label{
    color: #7c8089;
    font-size: 16px;
    font-weight: 400;
    text-transform: capitalize;
    margin-bottom: 17px;
    margin-right:5px;
  }
  .single-password-circle input[type="radio"] + label span.round-boarder,
  .single-password-modal-circle input[type="radio"] + label span.round-boarder-modal{
    display:inline-block;
    width:20px;
    height:20px;
    margin:-1px 15px 0 0;
    vertical-align:middle;
    cursor:pointer;
    -moz-border-radius:  50%;
    border-radius:  50%;
  }
  .single-password-circle input[type="radio"] + label span.round-boarder1,
  .single-password-modal-circle input[type="radio"] + label span.round-boarder-modal-one{
    display:inline-block;
    width: 12px;
    height: 12px;
    margin: -8px 0px 0 2px;
    vertical-align:middle;
    cursor:pointer;
    -moz-border-radius:  50%;
    border-radius:  50%;
  }
  .single-password-circle input[type="radio"] + label span.round-boarder,
  .single-password-modal-circle input[type="radio"] + label span.round-boarder-modal{
    border:2px solid #d5dadf;
  }

  .single-password-circle input[type="radio"] + label span.round-boarder1,
  .single-password-modal-circle input[type="radio"] + label span.round-boarder-modal-one {
    border:1px solid #fff;
    background-color:#fff;
  }

  .single-password-circle input[type="radio"]:checked + label span.round-boarder1,
  .single-password-modal-circle input[type="radio"]:checked + label span.round-boarder-modal-one{
    background-color:#5a84fd;
  }

  .single-password-circle input[type="radio"] + label span.round-boarder1,
  .single-password-circle input[type="radio"]:checked + label span.round-boarder1,

  .single-password-modal-circle input[type="radio"] + label span.round-boarder-modal-one,
  .single-password-modal-circle input[type="radio"]:checked + label span.round-boarder-modal-one {
    -webkit-transition:background-color 0.4s linear;
    -o-transition:background-color 0.4s linear;
    -moz-transition:background-color 0.4s linear;
    transition:background-color 0.4s linear;
  }
  /*.password-circle*/

  /*.btn.signin_btn*/
  .btn.signin_btn,.btn.signin_btn:focus {
    width: 620px;
    padding: 0;
    height: 60px;
    background: #26d9b3;
    color: #fff;
    font-size: 14px;
    text-transform: uppercase;
    border-radius: 3px;
    box-shadow: 0 5px 30px rgba(60,191,163,.3);
    margin-top: 23px;
  }

  .btn.signin_btn.signin_btn_two,.btn.signin_btn.signin_btn_two:focus{background: #5a84fd;box-shadow: 0 5px 30px rgba(0,66,255,.3);}
  /*.btn.signin_btn*/

  .signin-footer p{
    color: #91949c;
    font-size:16px;
    max-width: 265px;
    margin: 35px auto;

  }
  .signin-footer p>a{
    color: #7c8089;
    font-size:16px;
    font-weight: 500;
    text-transform: capitalize;

  }

</style>
