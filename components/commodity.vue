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
          <el-form-item label="姓名：">
            <el-input v-model="params.name" style="width:100px;" clearable></el-input>
          </el-form-item>
          <el-form-item label="类型：">
            <el-select v-model="params.commodityType_id" placeholder="请选择" style="width:100px;">
              <el-option v-for="item in commodityTypes" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="品牌：">
            <el-select v-model="params.brand_id" placeholder="请选择" style="width:100px;">
              <el-option v-for="item in brands" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <template>
              <el-button type="primary" icon="el-icon-search" size="mini" @click="getData">查询</el-button>
              <el-button type="success" icon="el-icon-plus" size="mini" @click="add">新增</el-button>
              <el-button type="primary" icon="el-icon-download" size="mini" @click="exp">导出</el-button>
              <el-button type="success" icon="el-icon-upload2" size="mini" @click="imp">导入</el-button>
              <el-button type="warning" icon="el-icon-edit-outline" size="mini" @click="batchupdate">批量修改</el-button>
              <el-button type="warning" icon="el-icon-picture" size="mini" @click="upimg">上传照片</el-button>
            </template>
          </el-form-item>
        </el-form>
      </el-header>
      <el-main ref="maintab">
        <el-table ref="table" v-loading="table.loading" size="mini" :height="table.height"
                  :data="table.data" border>
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column label="商品名" prop="name" align="center" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column label="图片"  align="center" width="150" show-overflow-tooltip>
            <template slot-scope="scope">
              <img @src="scope.row.img" width="60px" height="60px">
            </template>
          </el-table-column>
          <el-table-column label="规格" prop="specifications" align="center" width="80"></el-table-column>
          <el-table-column label="类型" prop="commodityType.name" align="center" width="80"></el-table-column>
          <el-table-column label="品牌" prop="brand.name" align="center" width="120"></el-table-column>
          <el-table-column></el-table-column>
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
                       v-on:current-change="pageindexchange">
        </el-pagination>
      </el-footer>
    </el-container>



  </div>

</template>

<script>
    export default {
        name: "commodity",
        data() {
          return {
            headerHeight: 70,
            commodityTypes: [{ value: '1', label: '电脑' }, { value: '2', label: '手机' }, { value: '3', label: '手表' }, { value: '4', label: '平板' }],
            brands: [{ value: '1', label: '小米' }, { value: '2', label: '红米' }, { value: '3', label: '华为' },
                    { value: '4', label: 'vivo' }, { value: '5', label: 'oppo' }, { value: '6', label: '乐视' }, { value: '7', label: '腾讯特供' }],
            params:{
              name:"",
              commodityType_id:"",
              brand_id:"",
            },//查询数据的参数
            table: {
              loading: false,
              height: 550,
              data: [],
              page: 1,
              rows: 5,
              pagesize: [5, 10, 20, 30, 40, 50],
              total: 0,
            },
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
          //获取表格数据的方法
          getData() {
            var _this =this;

            var params = new URLSearchParams();
            params.append('page',_this.table.page);
            params.append('rows',_this.table.rows);
            params.append('name',_this.params.name);
            params.append('commodityType_id',_this.params.commodityType_id);
            params.append('name',_this.params.brand_id);

            this.$axios.post("commodity/query.action",params).
            then(function (result) {  //成功  执行then里面的方法

              _this.table.data=result.data.rows;
              console.log(result.data.rows);

              _this.table.total=result.data.total;

            }).catch(function () { //失败 执行catch方法

            });
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

          }
        },
        //表格一创建就查询出数据
        created() {
          this.getData();
        },
      mounted() {
          this.$nextTick(function () {
            this.table.height = Number(this.$refs.maintab.$el.clientHeight - 10);
            this.headerHeight = Number(this.$refs.headerrow.$el.clientHeight);
            var self = this;
            window.onresize = function () {
              self.table.height = Number(self.$refs.maintab.$el.clientHeight - 10);
              self.headerHeight = Number(self.$refs.headerrow.$el.clientHeight);
            }
          })
        },
        watch: {
          frmsrh: {
            deep: true,
            handler: function (newVal, oldVal) {
              this.table.page = 1;
            }
          }
        },
    }
</script>

<style scoped>

</style>
