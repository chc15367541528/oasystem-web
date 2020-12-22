<template>
  <div>
    <h1>商品分类列表</h1>
    <!--查询条件开始-->
    <el-row type="flex" class="row-bg">
      <el-col :span="10">
        <el-button type="primary" @click="addType" icon="el-icon-add">添加</el-button>
        <el-button type="info" @click="editType" icon="el-icon-edit">编辑</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="delType">删除</el-button>
      </el-col>
      <el-col :span="10">
        <el-input placeholder="类型名称" v-model="condition" clearable style="width: 300px;">
        </el-input>
        <el-button type="primary" @click="getData" icon="el-icon-search">搜索</el-button>
      </el-col>
    </el-row>
    <!--查询条件结束-->

    <!--表格展示开始 -->
    <el-row type="flex" class="row-bg">
      <el-table
        :data="tableData"
        ref="commodityTypeTable"
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
          prop="id"
          label="类型id"
          width="180"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="类型名称"
          width="180"
          align="center">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          align="center">
        </el-table-column>
      </el-table>
    </el-row>
    <!--表格展示结束 -->

    <!-- 表格工具栏结束 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!-- 表格工具栏结束 -->

    <!--添加模态框开始 -->
    <el-dialog title="添加商品分类信息" :visible.sync="typeAddDialogVisible" width="50%">
      <el-form :model="commodityTypeForm"  status-icon :rules="typeRules" ref="commodityTypeForm" label-width="100px" class="demo-ruleForm">
        <el-row type="flex" class="row-bg">
          <el-col :span="10">
            <el-form-item label="类型名称" prop="name">
              <el-input type="text" v-model="commodityTypeForm.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="备注" prop="remark">
              <el-input type="text" v-model="commodityTypeForm.remark" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item>
          <el-button type="primary" @click="submitForm('commodityTypeForm')">提交</el-button>
          <el-button @click="resetForm('commodityTypeForm')">重置</el-button>
        </el-form-item>

      </el-form>
    </el-dialog>
    <!--添加模态框结束-->
  </div>
</template>

<script>
  export default {
    name: "commodityType",
    data(){
      return{
        condition:'',
        tableData:[],
        pageSize:5,
        currentPage:1,
        total:0,
        typeRules: {
          name:[{required:true,message:'商品类型不能为空',trigger:'blur'}],
          remark:[{required:true,message:'备注不能为空',trigger:'blur'}]
        },
        ids:[],//选中行的Id集合
        typeAddDialogVisible:false,
        commodityTypeForm:{
          id:'',
          name:'',
          remark:''
        },
        multipleSelection:[]
      }
    },
    methods:{
      getData(){
        var _this = this;

        var params = new URLSearchParams();

        params.append("rows", _this.pageSize);
        params.append("page", _this.currentPage);
        params.append("name",this.condition);

        this.$axios.post("commodityType/query.action",params).then(function (result) {

          _this.tableData = result.data.rows;
          _this.total = result.data.total;
        })
      },
      addType(){
        this.typeAddDialogVisible = true;
        this.resetForm('commodityTypeForm');
      },
      editType(){

      },
      delType(){
        var _this=this;
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
          _this.ids.forEach((item) => {
            str = str + item + ",";//拼接要删除的id字符串
          });
          console.log(str);

          var params = new URLSearchParams();
          params.append("ids",str);

          this.$axios.post("commodityType/delete.action",params).then(function (result) {
            _this.$message({
              message: result.data,
              type: "success"
            });

            _this.getData();
          })
        })
      },
      selCurrentRow(val){
        if (val) {
          this.$refs.commodityTypeTable.toggleRowSelection(val);
        }
      },
      handleSelectionChange(val){
        //遍历选中
        var  _this = this;
        val.forEach(row => {
          //把选中行的id加入数组
          _this.multipleSelection.push(row.id);
        });

        this.ids = this.multipleSelection;//选中所有行的id集合
        this.multipleSelection = [];//清空旧数组

        console.log(this.ids);
      },
      handleSizeChange:function (size){
        this.pageSize = size;
        this.getData();
      },
      handleCurrentChange:function(currentPage){
        this.currentPage = currentPage;
        this.getData();
      },
      submitForm(formName){
        let _this = this;
        this.$refs[formName].validate((valid) => {
          if(valid){
            var params = new URLSearchParams();
            params.append("name",this.commodityTypeForm.name);
            params.append("remark",this.commodityTypeForm.remark);
            this.$axios.post("commodityType/add.action",params).then(function (result) {
              _this.$message({
                type: 'success',
                showClose: true,
                message: result.data
              });
              _this.typeAddDialogVisible = false;
              _this.getData();

              //清除输入框的值
              _this.commodityTypeForm.name="";
              _this.commodityTypeForm.remark="";

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
      resetForm(){
        this.$refs[formName].resetFields();
      }
    },
    created() {
      this.getData();
    }
  }
</script>
