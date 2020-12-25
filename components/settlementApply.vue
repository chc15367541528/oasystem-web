<template>
  <div>
    申请类型：
    <el-select v-model="type" placeholder="请选择申请类型">
      <el-option label="请选择类型" value=""></el-option>
      <el-option label="商户申请入驻" value="1"></el-option>
      <el-option label="商户修改信息" value="2"></el-option>
    </el-select>

    <el-table :data="tableData" style="width: 100%" @selection-change="onRowClick">
      <el-table-column
        prop="id"
        type="selection"
        width="55"
      >
      </el-table-column>
      <el-table-column
        prop="user.name"
        label="用户"
        width="180">
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型">
        <template slot-scope="scope">
          <span v-show="scope.row.type==1">商户申请入驻</span>
          <span v-show="scope.row.type==2">商户修改信息</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="state"
        label="状态">
        <template slot-scope="scope">
          <div v-show="scope.row.state==0" style="color: blue">未审核</div>
          <div v-show="scope.row.state==1" style="color: green">已通过</div>
          <div v-show="scope.row.state==2" style="color: red">已驳回</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注">
      </el-table-column>
      <el-table-column
        prop=""
        label="操作">
        <template slot-scope="scope">
            <span v-show="scope.row.state!=0">已审核</span>
            <el-select v-show="scope.row.state==0" v-model="sh_state" style="width: 100px">
              <el-option label="通过" value="1"></el-option>
              <el-option label="驳回" value="2"></el-option>
            </el-select>
          <el-button v-show="scope.row.state==0" type="primary" @click="shenHeClick(scope.row.id)">审核</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pageindex"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pagesize"
        layout="sizes, prev, pager, next"
        :total="totalnum">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "settlementApply",
    data() {
      return {
        tableData: [],
        gridData: [],

        form: {
          id: '',
          user: '',
          type: '',
          state: '',
          remark: '',
        },
        sh_state: '',
        formLabelWidth: '1' +
          '' +
          '' +
          '' +
          '' +
          '' +
          '' +
          '' +
          '' +
          '' +
          '20px',
        type: "",//查询条件
        pageindex: 1,//当前第几页
        totalnum: 1,//总共的条数
        pagesize: 5,//每页几条
        multipleSelection: [],//选中的id
        checkedAll: false,//是否全选
      }
    },
    methods: {
      getDate() {
        var _this = this;

        var params = new URLSearchParams();
        params.append('page', _this.pageindex);
        params.append('rows', _this.pagesize);
        params.append('type', _this.type);

        this.$axios.post("settlementApply/query.action", params).then(function (result) {  //成功  执行then里面的方法

          _this.tableData.length=0;
          _this.tableData = result.data.rows;

          var totalnum = result.data.total;
          _this.totalnum = totalnum;
          var pagetotal = totalnum % 5 == 0 ? totalnum / 5 : Math.floor(totalnum / 5) + 1;
          _this.pagetotal = pagetotal;

        }).catch(function () { //失败 执行catch方法

        });

      },
      shenHeClick(id){
        var sh_state=this.sh_state;

        if (sh_state==""||sh_state==null){
          alert("请选择审核类型")
        }else {
          this.shenHe(sh_state,id);
        }
      },
      shenHe(sh_state,id) {
        var _this = this;
        var params = new URLSearchParams();
        params.append('id', id);
        params.append('state',sh_state);

        //执行编辑操作
        this.$axios.post("settlementApply/update.action", params).then(function (result) {
          if (result.data=="修改成功"){
            _this.$message({
              message: result.data,
              type: 'success'
            });
          }else {
            _this.$message({
              message: result.data,
              type: 'error'
            });
          }




        }).catch(function (error) {

          alert(error);

        });
        _this.getDate();  //修改操作做完，刷新数据
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pagesize = val;
        this.getDate();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pageindex = val;
        this.getDate();
      },
      onRowClick(row, event, column) {

        var _this = this;
        _this.multipleSelection = [];
        for (var i = 0; i < row.length; i++) {
          _this.multipleSelection.push(row[i].id);
        }

      },
    },

    watch: {
      "type": function () {
        this.getDate();
      },
    },
    created() {
      this.getDate();
    }
  }
</script>

<style scoped>

</style>
