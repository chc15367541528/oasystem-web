<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-button type="primary" round @click="auth()">授权</el-button>
        </el-row>
      </el-header>
      <el-container>
        <el-aside>
          <el-table
            :data="roleTable"
            style="width: 100%"
            @selection-change="onRowClick">

            <el-table-column
              type="selection"
              prop="id"
              width="180">
            </el-table-column>

            <el-table-column
              label="角色"
              prop="name"
              width="180">
            </el-table-column>
          </el-table>
        </el-aside>
        <el-main>
          <el-tree
            :data="treeMenu"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[1, 1]"
            :default-checked-keys="[1]"
            :props="defaultProps">

          </el-tree>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "authority",
    data() {
      return {
        roleMenu:[],
        roleTable: [],
        multipleSelection: [],//选中的id
        checkedAll: false,//是否全选
        rId: '0',//初始化角色id为0
        treeMenu: [],
        defaultProps: []
      }
    },
    methods: {
      getTreeData() {  //获取数据
      },
      getRoleData() {  //获取数据
        var _this = this

        this.$axios.post("role/queryAll.action").then(function (result) {  //成功  执行then里面的方法
          _this.roleTable = result.data;
        }).catch(function () { //失败 执行catch方法

        });

      },
      showMenuByRoleId(id) {
        var _this = this

        var params = new URLSearchParams();
        params.append("rid", id)

        this.$axios.post("menu/queryAllMenus.action", params).then(function (result) {  //成功  执行then里面的方法

          for(var i = 0;i<result.data.length;i++){
            _this.treeMenu.push(result.data[i].mid)
          }
        }).catch(function () { //失败 执行catch方法

        });
      },
      onRowClick(row, event, column) {

        var _this = this;
        _this.multipleSelection = [];
        for (var i = 0; i < row.length; i++) {
          _this.multipleSelection.push(row[i].id);
        }
      },
      auth(){
        var _this = this

        var params = new URLSearchParams();
        params.append("rid", id)

        this.$axios.post("menu/authority.action", params).then(function (result) {  //成功  执行then里面的方法

          for(var i = 0;i<result.data.length;i++){
            _this.treeMenu.push(result.data[i].mid)
          }
        }).catch(function () { //失败 执行catch方法

        });
      }
    },
    created() {
      this.getRoleData();
    },
  }
</script>

<style scoped>

</style>
