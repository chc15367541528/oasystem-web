<template>
    <div>
      <el-row type="flex" class="row-bg">
        <el-col :span="6">
          <el-button type="primary" @click="addUser" icon="el-icon-add">添加</el-button>
          <el-button type="info" @click="editUser" icon="el-icon-edit">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="delRes">删除</el-button>
        </el-col>
        <el-col :span="10">
          <el-input placeholder="用户名" v-model="condition" clearable style="width: 300px;">
          </el-input>
          <el-button type="primary" @click="getData" icon="el-icon-search">搜索</el-button>
        </el-col>
      </el-row>


      <el-row type="flex" class="row-bg">
        <el-table
          :data="tableData"
          ref="userTable"
          tooltip-effect="dark"
          highlight-current-row
          border
          @row-click="selCurrentRow"
          @selection-change="handleSelectionChange"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55"
            align="center">
          </el-table-column>
          <el-table-column
            prop="name"
            label="用户名"
            width="180"
            align="center">
          </el-table-column>
          <el-table-column
            prop="sex"
            label="性别"
            width="180"
            align="center">
          </el-table-column>
          <el-table-column
            prop="age"
            label="年龄"
            align="center">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            :formatter="status"
            align="center">
          </el-table-column>
        </el-table>
      </el-row>

      <!-- 表格工具栏 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>

      <!--添加模态框开始 -->
      <el-dialog title="添加用户信息" :visible.sync="userAddDialogVisible" width="50%">
        <el-form :model="userForm" status-icon :rules="userRules" ref="userForm" label-width="100px" class="demo-ruleForm">
          <el-row type="flex" class="row-bg">
            <el-col :span="10">
              <el-form-item label="用户名" prop="name">
                <el-input type="text" v-model="userForm.name" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="性别" prop="sex">
                <el-input type="text" v-model="userForm.sex" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg">
            <el-col :span="10">
              <el-form-item label="年龄" prop="age">
                <el-input type="number" v-model="userForm.age" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item>
            <el-button type="primary" @click="submitForm('userForm')">提交</el-button>
            <el-button @click="resetForm('userForm')">重置</el-button>
          </el-form-item>

        </el-form>
      </el-dialog>
      <!--添加模态框结束 -->

      <!--修改模态框开始 -->
      <el-dialog title="修改用户信息" :visible.sync="userEditDialogVisible" width="50%">
        <el-form :model="userForm" status-icon :rules="userRules" ref="userForm" label-width="100px" class="demo-ruleForm">
          <el-row type="flex" class="row-bg">
            <el-col :span="10">
              <el-form-item label="用户名" prop="name">
                <el-input type="text" v-model="userForm.name" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="性别" prop="sex">
                <el-input type="text" v-model="userForm.sex" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg">
            <el-col :span="10">
              <el-form-item label="年龄" prop="age">
                <el-input type="number" v-model="userForm.age" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="状态" prop="enable">
                <el-select v-model="userForm.status" placeholder="请选择">
                  <el-option
                    v-for="item in statuOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item>
            <el-button type="primary" @click="editForm('userForm')">提交</el-button>
            <el-button @click="resetForm('userForm')">取消</el-button>
          </el-form-item>

        </el-form>
      </el-dialog>
      <!--修改模态框结束-->
    </div>
</template>

<script>
    export default {
        name: "UserList",
        data(){
          var cheCkSex = (rule,value,callback) =>{
            if(!value){
              return callback(new Error('性别不能为空'));
            }

            if(value=='男' || value=='女'){
              return callback();
            }else{
              return callback(new Error('性别只能为男或女'));
            }
          };

          return {
            condition:'',
            pageSize:5,
            total:0,
            currentPage:1,
            userAddDialogVisible:false,
            userEditDialogVisible:false,
            tableData:[],
            ids:[],//选中行的Id集合
            multipleSelection:[],
            userForm:{
              id:'',
              name:'',
              sex:'',
              age:'',
              status:''
            },
            userRules:{
              name:[{required:true,message:'用户名不能为空',trigger:'blur'}],
              sex:[{validator: cheCkSex, trigger: 'blur'}]
            },
            statuOptions:[{
              value:1,
              label:'启用'
            },{
              value:2,
              label:'停用'
            }]
          }
        },
        methods:{
          getData(){
            var _this = this;

            var params = new URLSearchParams();

            params.append("rows", _this.pageSize);
            params.append("page", _this.currentPage);
            params.append("name",this.condition);

            this.$axios.post("queryUser.action",params).then(function (result) {

              _this.tableData = result.data.rows;
              _this.total = result.data.total;
            })
          },
          addUser(){
            this.userAddDialogVisible = true;
            this.resetForm('userForm');
          },
          editUser(){
            if(this.ids.length != 1){
              this.$message({
                message: "编辑且仅能选择一条数据",
                type: "error"
              });
              return;
            }
            this.userEditDialogVisible = true;

            var id = this.ids[0];

            var params = new URLSearchParams();
            params.append("id",id);
            var _this = this;
            this.$axios.post("queryUserById.action",params).then(function (result) {
              _this.userForm.id = result.data.id;
              _this.userForm.name = result.data.name;
              _this.userForm.sex = result.data.sex;
              _this.userForm.age = result.data.age;
              _this.userForm.status = result.data.status;
            })

          },
          delRes(){
            if(this.ids.length==0){
              this.$message({
                message: "请选择一条数据",
                type: "error"
              });
              return;
            }

            this.$confirm('此操作将删除选中的数据,是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(() => {
              var str = "";
              this.ids.forEach((item) => {
                str = str + item + ",";//拼接要删除的id字符串
              });

              var params = new URLSearchParams();
              params.append("ids",str);

              var _this = this;

              this.$axios.post("delUser.action",params).then(function (result) {
                _this.$message({
                  message: result.data,
                  type: "success"
                });

                _this.getData();
              })
            })
          },
          status(val){
            if(val.status=='1'){
              return '启用';
            }else{
              return '停用';
            }
          },
          selCurrentRow(val){
            if (val) {
              this.$refs.userTable.toggleRowSelection(val);
            }
          },
          handleSelectionChange(val){
            //遍历选中
            val.forEach(row => {
              //把选中行的id加入数组
              this.multipleSelection.push(row.id);
            });

            this.ids = this.multipleSelection;//选中所有行的id集合
            this.multipleSelection = [];//清空旧数组

            console.log(this.ids);
          },
          handleSizeChange:function (size){
            this.pageSize = size;
            this.getdata();
          },
          handleCurrentChange:function(currentPage){
            this.currentPage = currentPage;
            this.getdata();
          },
          submitForm(formName){
            let _this = this;
            this.$refs[formName].validate((valid) => {
              if(valid){
                var params = new URLSearchParams();
                params.append("name",this.userForm.name);
                params.append("sex",this.userForm.sex);
                params.append("age",this.userForm.age);
                this.$axios.post("addUser.action",params).then(function (result) {
                  _this.$message({
                    type: 'success',
                    showClose: true,
                    message: result.data
                  });
                  _this.userAddDialogVisible = false;
                  _this.getData();

                }).catch(
                  _this.$message({
                    type: 'error',
                    showClose: true,
                    message: result.data
                  })
                )
              }else{
                _this.$message({
                  type: 'error',
                  showClose: true,
                  message: "请确认后再提交"
                });
              }
            })
          },
          editForm(formName){
            this.$refs[formName].validate((valid) => {
              if (valid) {
                var _this = this;
                var params = new URLSearchParams();
                params.append("id",this.userForm.id);
                params.append("name",this.userForm.name);
                params.append("sex",this.userForm.sex);
                params.append("age",this.userForm.age);
                params.append("status",this.userForm.status);
                this.$axios.post("updateUser.action",params).then(function (result) {
                  _this.$message({
                    type: 'success',
                    showClose: true,
                    message: result.data
                  });
                  _this.userEditDialogVisible = false;
                  _this.getData();

                }).catch(
                  _this.$message({
                    type: 'error',
                    showClose: true,
                    message: result.data
                  })
                )
              }else{
                _this.$message({
                  type: 'error',
                  showClose: true,
                  message: "请确认后再提交"
                });
              }
            })
          },
          resetForm(formName){
            this.$refs[formName].resetFields();
          }
        },
        created() {
          this.getData();
        }
    }
</script>

<style scoped>
.row-bg{
  margin-bottom: 20px;
}
</style>
