<template>
  <div>
    登录
    <br>
    <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="账号" prop="account">
        <el-input v-model="loginForm.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <!--    <el-form-item label="确认密码" prop="checkPass">-->
      <!--      <el-input type="password" v-model="loginForm.checkPass" autocomplete="off"></el-input>-->
      <!--    </el-form-item>-->
      <el-form-item>
        <el-button type="primary" @click="login('loginFrom')">Login</el-button>
        <el-button @click="resetForm('loginForm')">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      var checkAccount = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账号不能为空'));
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.loginForm.checkPass !== '') {
            this.$refs.loginForm.validateField('checkPass');
          }
          callback();
        }
      };
      // var validatePass2 = (rule, value, callback) => {
      //   if (value === '') {
      //     callback(new Error('请再次输入密码'));
      //   } else if (value !== this.loginForm.password) {
      //     callback(new Error('两次输入密码不一致!'));
      //   } else {
      //     callback();
      //   }
      // };
      return {
        loginForm: {
          account: '',
          password: ''
          // checkPass: '',
        },
        rules: {
          account: [
            {validator: checkAccount, trigger: 'blur'}
          ],
          password: [
            {validator: validatePass, trigger: 'blur'}
          ]
          // checkPass: [
          //   { validator: validatePass2, trigger: 'blur' }
          // ]
        }
      };
    },
    methods: {
      login() {
        var _this = this

        var params = new URLSearchParams();
        params.append("account", _this.loginForm.account);
        params.append("password", _this.loginForm.password);

        this.$axios.post("user/login.action", params).then(function (result) {
          if (result.data.code == "0") {
            //登录成功  跳转 首页
            alert(result.data.msg);
            sessionStorage.setItem("account", result.data.account)
            _this.$router.push("/index");
          } else {
            alert(result.data.msg);
          }
        }).catch(function (error) {
            elert(error);
          }
        )
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>

</style>
