<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-button type="primary" round @click="auth()">授权</el-button>
        </el-row>
      </el-header>
      <el-container>
        <el-aside style="width: 500px">
<!--          <el-table-->
<!--            :data="roleTable"-->
<!--            style="width: 100%"-->
<!--            @selection-change="onRowClick">-->

<!--            <el-table-column-->
<!--              type="selection"-->
<!--              prop="id"-->
<!--              width="180">-->
<!--            </el-table-column>-->

<!--            <el-table-column-->
<!--              label="角色"-->
<!--              prop="name"-->
<!--              width="180">-->
<!--            </el-table-column>-->
<!--          </el-table>-->
          <div style="width: 400px">
            <el-table
              :data="role"
              @row-click="getRoleMenu">
              <el-table-column
                prop="id"
                label="角色id">
              </el-table-column>
              <el-table-column
                prop="name"
                label="角色名">
              </el-table-column>
            </el-table>
          </div>
        </el-aside>
        <el-main>
<!--          <el-tree-->
<!--            :data="treeMenu"-->
<!--            show-checkbox-->
<!--            node-key="id"-->
<!--            :default-expanded-keys="[1, 1]"-->
<!--            :default-checked-keys="[1]"-->
<!--            :props="defaultProps">-->

<!--          </el-tree>-->
          <el-input v-model="rname" readonly style="width: 200px"></el-input>
          <el-tree
            :data="menuDate"
            show-checkbox
            node-key="id"
            ref="tree"
            :default-expanded-keys="roleMenu"
            :default-checked-keys="roleMenu"
            :default-expand-all="false"
            :expand-on-click-node="false">
          </el-tree>


          <div slot="footer" class="dialog-footer">
            <el-button @click="authorRoleMenudialog = false" >取 消</el-button>
            <el-button type="primary" @click="author">授权</el-button>
          </div>
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

        role:[],
        menuDate:[],
        roleMenu:[],
        authorRoleMenudialog:false,
        menuids:[],//获取所有选中的节点
        roleid:0,
        mids:'',
        rname:'',
        roleTable: [],
        multipleSelection: [],//选中的id
        checkedAll: false,//是否全选
        rId: '0',//初始化角色id为0
        treeMenu: [],
        defaultProps: []
      }
    },
    methods: {
      getrole() {  //获取数据
        var _this = this;
        this.$axios.post("role/queryAll.action").then(function (result) {  //成功  执行then里面的方法
          _this.role = result.data;

        }).catch(function (error) { //失败 执行catch方法
          console.log(error)
        });
      },
      getdata() {  //获取数据
        var _this = this;
        var params=new URLSearchParams();

        params.append("staid",sessionStorage.getItem("staffid"))
        this.$axios.post("queryAuthorMenu.action",params).then(function (result) {  //成功  执行then里面的方法
          _this.menuDate = result.data;

        }).catch(function (error) { //失败 执行catch方法
          console.log(error)
        });
      },
      getRoleMenu(row,column,event){
        var _this = this;

        _this.authorRoleMenudialog=true;

        var params = new URLSearchParams();
        params.append("rid",row.roleid);
        this.$axios.post("queryAllRoleMenu.action",params).then(function (result) {  //成功  执行then里面的方法
          for(var i=0;i<result.data.length;i++){
            _this.roleMenu.push(result.data[i].mid);
          };
          _this.roleid=row.roleid;
          _this.rname=row.rolename

          _this.getdata();
        }).catch(function (error) { //失败 执行catch方法
          console.log(error)
        });
      },
      closeDialog(){
        this.roleMenu=[];
      },
      author(){
        var _this=this;

        _this.menuids=this.$refs.tree.getCheckedKeys();
        _this.menuids.forEach((item)=>{
          _this.mids+=item+','
        })

        var params = new URLSearchParams();
        params.append("roleid",_this.roleid);
        params.append("menuids",_this.mids);
        this.$axios.post("author.action",params).then(function (result) {  //成功  执行then里面的方法
          _this.$message({
            message: result.data,
            type: 'success'
          });

          _this.authorRoleMenudialog=false;
        }).catch(function (error) { //失败 执行catch方法
          console.log(error)
        })
      }
    },
    created() {
      this.getrole();
    }
  }
</script>

<style scoped>

</style>
