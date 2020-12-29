<template>

  <div>
    <!--  页头-->
<!--    <el-page-header @back="goBack" content="角色页面">-->
<!--    </el-page-header>-->

    <br><br>
    <el-button
      slot="reference"
      icon="el-icon-edit"
      style="color: green"
      @click="insertDialogFormVisible = true"
    >添加角色
    </el-button>
    <!--    批量删除-->
    <el-button icon="el-icon-delete-solid" type="danger" size="mini" @click="delall">批量删除</el-button>
    <br>

    <!--表格-->
    <el-table
      :data="tableData.filter(data => !search ||
      data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%" @selection-change="onRowClick">
      <el-table-column
        label="编号"
        type="selection"
        prop="id">
      </el-table-column>
      <el-table-column
        label="姓名"
        prop="name">
      </el-table-column>
      <el-table-column
        align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入姓名查询"/>
        </template>
        <!--        打开编辑模态框-->
        <template slot-scope="scope">
          <el-button
            slot="reference"
            icon="el-icon-edit"
            circle
            style="color: red"
            @click="editOpen(scope.row.id)"
          ></el-button>
          <!--          删除-->
          <el-popconfirm
            confirm-button-text='确认'
            cancel-button-text='取消'
            icon="el-icon-info"
            icon-color="red"
            title="删除该角色吗？"
            @confirm="del(scope.row.id)">
            <el-button
              slot="reference"
              icon="el-icon-delete-solid"
              circle
              style="color: red"
            ></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!--    添加模态框-->
    <el-dialog title="角色信息添加" :visible.sync="insertDialogFormVisible">
      <el-form :model="insertForm">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="insertForm.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="insertDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="insert">确 定</el-button>
      </div>
    </el-dialog>

    <!--    编辑模态框-->
    <el-dialog title="角色信息编辑" :visible.sync="editDialogFormVisible">
      <el-form :model="editForm">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit">确 定</el-button>
      </div>
    </el-dialog>

    <!--分页-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNum">
    </el-pagination>

  </div>
</template>

<script>
    export default {
        name: "RoleList",

      data() {
        return {
          multipleSelection:[],//选中的id
          // 表格数据
          tableData: [],
          search: '',

          currentPage: 1,

          editDialogFormVisible: false,
          insertDialogFormVisible: false,
          editForm: {
            id:'',
            name:''
          },
          insertForm: {
            name:''
          },
          formLabelWidth: '120px',
          pageIndex: 1,//当前第几页
          totalNum: 1,//总共的条数
          pageSize: 5,//每页几条
        }
      },
      methods: {
        getData() {  //获取数据
          var _this = this

          var params = new URLSearchParams();
          params.append('page', _this.pageIndex);
          params.append('rows', _this.pageSize);

          this.$axios.post("role/query.action", params).then(function (result) {  //成功  执行then里面的方法
            _this.tableData = result.data.rows;

            var totalNum = result.data.total;
            _this.totalNum = totalNum;
          }).catch(function () { //失败 执行catch方法

          });
        },
        del(id) {
          var delId = id + ",";
          var _this = this;

          var params = new URLSearchParams();
          params.append("ids", delId);

          this.$axios.post("role/delete.action", params).then(function (result) {  //成功  执行then里面的方法

            _this.$message({
              message: result.data,
              type: 'success'
            });
            _this.getData();  //删除操作做完，刷新数据
          }).catch(function (error) { //失败 执行catch方法
            alert(error);
          });
          //将pageindex归为1
          this.pageindex = 1;
        },
        delall(){

          var delid ="";
          var _this =this;
          var multipleSelection=_this.multipleSelection;

          if(multipleSelection.length==0){
            _this.$message.warning("请选中角色后删除");
            return;
          }

          this.$confirm('您确定真的要删除吗, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {

            for (var i = 0; i < multipleSelection.length; i++) {
              delid=delid+multipleSelection[i]+",";
            }

            var params = new URLSearchParams();
            params.append("ids",delid);


            this.$axios.post("role/delete.action",params).
            then(function (result) {  //成功  执行then里面的方法

              _this.$message({
                message: result.data,
                type: 'success'
              });

              _this.getData();  //删除操作做完，刷新数据

            }).catch(function (error) { //失败 执行catch方法
              alert(error);
            });

            //将pageindex归为1
            this.pageindex=1;

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });


        },
        onRowClick(val) {

          //当选中改变时
          var _this = this;


          _this.multipleSelection.length=0;
          for(let item of val){
            _this.multipleSelection.push(item.id);
          }

        },
        editOpen(id) {
          var _this = this
          this.editDialogFormVisible = true;

          //数据回显
          var params = new URLSearchParams();
          params.append("id", id)
          //将数据异步显示
          this.$axios.post('role/queryById.action', params).then(function (result) {
            _this.editForm = result.data;
          }).catch(function (error) {
            alert(error);
          });
        },
        edit() {
          var _this = this;
          var params = new URLSearchParams();
          params.append('id', _this.editForm.id);
          params.append('name', _this.editForm.name);
          //执行编辑操作
          this.$axios.post("role/update.action", params).then(function (result) {
            //提示信息
            _this.$message({
              message: result.data,
              //类型
              type: 'success'
            });

            _this.getData();  //修改操作做完，刷新数据
            _this.editForm.length=0;//清空表单中的数据
          }).catch(function (error) {
            alert(error);
          })
          //关闭编辑模态框
          this.editDialogFormVisible = false;
        },
        insert() {
          var _this = this;
          var params = new URLSearchParams();
          params.append('name', _this.insertForm.name);
          this.$axios.post('role/insert.action', params).then(function (result) {
            _this.$message({
              message: result.data,
              type: 'success'
            });
            _this.getData();  //修改操作做完，刷新数据
            _this.insertForm={name:''};//清空表单中的数据
          }).catch(function (error) {
            alert(error);
          });
          this.insertDialogFormVisible = false;//隐藏添加模态框
        },

// 页头
//         goBack() {
//           console.log('go back');
//         },
//分页
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
          this.pageSize = val;
          this.getData();
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.pageIndex = val;
          this.getData();
        },
//表格
        handleEdit(index, row) {
          console.log(index, row);
        },
        handleDelete(index, row) {
          console.log(index, row);
        }
      },
      created() {
        this.getData();
      },
    }
</script>

<style scoped>

</style>
