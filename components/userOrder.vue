<template>
  <div>
    <el-container>
      <el-header ref="header" :height="headerHeight">
        <el-form size="mini" :inline="true" ref="headerrow">
          <!--          <el-form-item label="专业：">-->
          <!--            <spec-combo v-model=frmsrh.spno></spec-combo>-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label="年级：">-->
          <!--            <grade-input v-model="frmsrh.grade">-->
          <!--            </grade-input>-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label="班级：">-->
          <!--            <ban-input v-model="frmsrh.classno" v-bind:spno="frmsrh.spno" v-bind:grade="frmsrh.grade"></ban-input>-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label="学号：">-->
          <!--            <el-input v-model="frmsrh.stid" style="width:120px;" clearable></el-input>-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label="姓名：">-->
          <!--            <el-input v-model="frmsrh.name" style="width:100px;" clearable></el-input>-->
          <!--          </el-form-item>-->
          <el-form-item label="订单状态：">
            <el-select v-model="params.state" placeholder="请选择" style="width:100px;">
              <el-option v-for="item in stuflag" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <template>

            </template>
          </el-form-item>
        </el-form>
      </el-header>
      <el-main ref="maintab">
        <el-table ref="table" v-loading="table.loading" size="mini" :height="table.height"
                  :data="tableData" border>
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column label="订单id" prop="id" align="center" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column label="订单编号" prop="order_number" align="center" width="150"
                           show-overflow-tooltip></el-table-column>
          <el-table-column label="用户对象" prop="user" align="center" width="80">
            <template slot-scope="scope">

              <span style="margin-left: 10px">{{ scope.row.user.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="商户对象" prop="merchants" align="center" width="80">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.merchants.account }}</span>
            </template>
          </el-table-column>
          <el-table-column label="订单创建时间" prop="createtime" align="center" width="120"></el-table-column>
          <el-table-column label="出库时间" prop="shipmenttime" align="center" width="100"></el-table-column>
          <el-table-column label="颜色" prop="color" align="center" width="100"></el-table-column>
          <el-table-column label="版本" prop="version" align="center" width="100"></el-table-column>
          <el-table-column label="商品图片" align="center" width="100">
            <template slot-scope="scope">
              <img :src="scope.row.commodity.img" width="60" height="60"/>
            </template>
          </el-table-column>
          <el-table-column label="单价" prop="price" align="center" width="100"></el-table-column>
          <el-table-column label="数量" prop="number" align="center" width="100"></el-table-column>
          <el-table-column label="商品" prop="commodity" align="center" width="100">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.commodity.name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="总价" prop="totalmoney" align="center" width="100"></el-table-column>
          <el-table-column label="状态" prop="state" align="center" width="100" :formatter="state">
            <template slot-scope="scope">
              <span v-show="scope.row.state==1" style="color: red;">待付款</span>
              <span v-show="scope.row.state==2" style="color: orange;">待提货</span>
              <span v-show="scope.row.state==3" style="color: green;">已提货</span>
              <span v-show="scope.row.state==4" style="color: cornflowerblue;">待发货</span>
            </template>
          </el-table-column>
          <el-table-column label="备注" prop="remark" align="center" width="100"></el-table-column>
          <el-table-column label="操作" align="center" width="100">
            <template slot-scope="scope">
              <el-button v-show="scope.row.state==4"  type="primary" @click="updateState(scope.row.id)">发货</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer style="height:35px;">
        <el-pagination background
                       layout="total, sizes, prev, pager, next,slot"
                       v-bind:current-page="table.page"
                       v-bind:page-sizes="table.pagesize"
                       v-bind:page-size="table.rows"
                       v-bind:total="table.total"
                       v-on:size-change="pagesizechange"
                       v-on:current-change="pageindexchange"
                        @current-change="currentChange">
        </el-pagination>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "userOrder",
    data() {
      return {
        tableData: [],
        headerHeight: 70,
        stuflag: [{value: '', label: '全部'}, {value: '1', label: '待付款'}, {value: '2', label: '待提货'}, {value: '3',label: '已提货'}, {value: '4',label: '待发货'}],

        params: {
          spno: '',
          grade: '',
          classno: '',
          stid: '',
          name: '',
          state: ''
        },
        table: {
          loading: false,
          height: 400,
          data: [],
          page: 1,
          rows: 5,
          pagesize: [5, 10, 15, 20, 25, 30],
          total: 0
        }
      }
    },
    methods: {
      pagesizechange(size) {
        this.table.rows = size;
        this.list();
      },
      pageindexchange(pindex) {
        this.table.page = pindex;
        this.list();
      },
      list() {

      },
      add() {

      },
      exp() {

      },
      imp() {

      },
      batchupdate() {

      },
      upimg() {

      },
      getData() {
        var _this = this;

        var params = new URLSearchParams();
        params.append('page', _this.table.page);
        params.append('rows', _this.table.rows);
        params.append('state', _this.params.state);

        this.$axios.post("userOrder/query.action", params).then(function (result) {  //成功  执行then里面的方法
          var data = result.data.rows;
          for(var order of data){
            order.commodity.img="src/assets/"+order.commodity.img;
          }

          console.log(data);

          _this.tableData = data;

          _this.table.total= result.data.total;
        }).catch(function () { //失败 执行catch方法

        });
      },
      currentChange(val){
        var _this = this;
        _this.table.page=val;
        _this.getData();
      },
      state(val){
        if(val.state=='1'){
          return '待付款';
        }else if(val.state=='2'){
          return '待提货';
        }else {
          return '已提货';
        }
      },
      updateState(id){
        var _this = this;

        var params = new URLSearchParams();
        params.append('id',id);
        params.append('state',2);

        this.$axios.post("userOrder/update.action", params).then(function (result) {  //成功  执行then里面的方法
          _this.getData();
          _this.$message({
            message: result.data,
            type: 'success'
          });
        }).catch(function () { //失败 执行catch方法

        });
      },

    },
    created() {
      this.getData();
    },
    mounted() {
      this.$nextTick(function () {
        this.table.height = this.$refs.maintab.$el.clientHeight - 10;
        this.headerHeight = this.$refs.headerrow.$el.clientHeight;
        var self = this;
        window.onresize = function () {
          self.table.height = self.$refs.maintab.$el.clientHeight - 10;
          self.headerHeight = self.$refs.headerrow.$el.clientHeight;
        }
      })
    },
    watch: {
      params: {
        deep: true,
        handler: function (newVal, oldVal) {
          this.table.page = 1;
          this.getData();
        }
      },
    }
  }
</script>

<style scoped>

</style>
