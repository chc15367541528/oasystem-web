<template>
  <div id="app">
    直接拿属性<br>
    {{this.$store.state.msg}}
    <br>
    通过getters方法拿属性值<br>
    {{this.$store.getters.getMsg}}
    <br>
    <input type="button" @click="fun1" value="通过setter方法设置值">
    <br>
    <input type="text" v-model="msg">
    <input type="button" @click="fun2" value="异步延迟设置值">
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    fun1(){
      this.$parent.$store.commit('setMsg',"通过页面按钮设置值");
    },
    fun2(){
      var _this = this;
      this.$parent.$store.dispatch('setAjaxMsg',_this.msg);
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
