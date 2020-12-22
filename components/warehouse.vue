<template>
  <div>

    <!--    查询条件开始-->
    仓库名字：<el-input
    v-model="warehouseName"
    prefix-icon="el-icon-search"
    size="small"
    placeholder="请输入仓库名字"
    clearable
    style="width: 300px;"
    ></el-input>
    <!--    查询条件开始-->

    <!--    添加按钮开始-->
    <el-button
      slot="reference"
      icon="el-icon-edit"
      style="color: green"
      @click="insertdialogFormVisible = true"
    >添加仓库</el-button>
    <!--    添加按钮结束-->

    <!--    批量删除按钮开始-->
    <el-button
      slot="reference"
      icon="el-icon-info"
      style="color: green"
      @click="delallto"
    >删除仓库</el-button>
    <!--    批量删除按钮结束-->

    <!--    表格展示开始-->
    <el-table
      :data="tableData"
      style="width: 100%"
      @select="onRowClick">
      <el-table-column
        prop="id"
        type="selection"
        width="55"
        >
      </el-table-column>
      <el-table-column
        prop="name"
        label="仓库名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="adress"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注">
      </el-table-column>
      <el-table-column
        prop=""
        label="操作">
        <template slot-scope="scope">
          <!--        编辑按钮开始-->
          <el-button
            slot="reference"
            icon="el-icon-edit"
            style="border-radius: 100%;background-color:deepskyblue;color: black;"
            @click="editto(scope.row.id)"
          ></el-button>
          <!--        编辑按钮结束-->

          <!--        删除按钮开始-->
          <el-popconfirm
            confirm-button-text='确认'
            cancel-button-text='取消'
            icon="el-icon-info"
            icon-color="red"
            title="确定删除该仓库吗？"
            @confirm="del(scope.row.id)"
          >
            <el-button
              slot="reference"
              icon="el-icon-delete-solid"
              style="border-radius: 100%;background-color:orangered;color:#ff0202;"
            ></el-button>
          </el-popconfirm>
          <!--        删除按钮结束-->
          <!--          查看详情开始-->
          <a href="#" style="margin-left: 10px;" @click="openCommodityDetailDialog(scope.row.id)"><i class="el-icon-more"></i></a>
          <!--          查看详情结束-->
        </template>
      </el-table-column>
    </el-table>
    <!--    表格展示结束-->

    <!--    分页开始-->
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
    <!--    分页结束-->

    <!--    编辑模态框开始-->
    <el-dialog title="仓库信息编辑" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="仓库名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="仓库地址" :label-width="formLabelWidth">
          <el-input v-model="form.adress" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="仓库电话" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="仓库备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit">确 定</el-button>
      </div>
    </el-dialog>
    <!--    编辑模态框结束-->

    <!--    添加模态框开始-->
    <el-dialog title="仓库信息添加" :visible.sync="insertdialogFormVisible">
      <el-form :model="form">
        <el-form-item label="仓库名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="仓库地址" :label-width="formLabelWidth">
          <el-input v-model="form.adress" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="仓库电话" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="仓库备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="insertdialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="insert">确 定</el-button>
      </div>
    </el-dialog>
    <!--    添加模态框结束-->

    <!--    查看详情模态框开始-->
    <el-dialog title="商品详情"
               :visible.sync="dialogTableVisible_warehouse_detail"
               width="100%"
               top="0"
               lock-scroll="true">

      <!--      查询条件开始-->
      商品名：<el-input v-model="commodity_name"
                    prefix-icon="el-icon-search"
                    size="small"
                    placeholder="请输入商品名字"
                    clearable
                    style="width: 250px;"></el-input>
      <!--      查询条件结束-->

      <!--      添加按钮开始-->
      <el-button type="primary" icon="el-icon-circle-plus" @click.prevent="addComDialogVisible = true">添加商品</el-button>
      <!--      添加按钮开始-->

      <!--      批量删除按钮结束-->
      <el-button type="danger" icon="el-icon-delete-solid" @click="detailDelAll">批量删除</el-button>
      <!--      批量删除按钮结束-->

      <!--      仓库详情表开始-->
      <el-table
        :data="warehouse_detail_table"
        highlight-current-row="true"
        class="infinite-list"
        style="overflow:auto"
        @selection-change="warehouseDetailSelectionChange">
        <el-table-column type="selection" ></el-table-column>
        <el-table-column property="img" label="商" width="200" align="right">
          <template slot-scope="scope">
              <img :src="scope.row.img" width="98" height="98" alt="">
          </template>
        </el-table-column>
        <el-table-column label="品" width="200" align="left">
          <template slot-scope="scope">
            <div class="product-info">
              <h6 style="display: inline-block;width: 300px;">{{scope.row.commodity.name}}</h6>
              <p>品牌：{{scope.row.commodity.brand.name}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column property="number" label="剩余库存" width="200"></el-table-column>
        <el-table-column property="min_number" label="最低库存"></el-table-column>
        <el-table-column label="操作">
           <template slot-scope="scope">
              <!--             删除按钮开始-->
             <el-popconfirm
               confirm-button-text='确认删除'
               cancel-button-text='不用了'
               icon="el-icon-info"
               icon-color="red"
               title="确定删除该商品吗？"
               @confirm="detailDelOne(scope.row.id)"
             >
               <el-button slot="reference" icon="el-icon-delete-solid" type="danger">删除</el-button>
             </el-popconfirm>
             <!--             删除按钮结束-->

            <!--             采购管理开始-->
             <el-button slot="reference" icon="el-icon-shopping-cart-full" type="primary">采购</el-button>
             <!--             采购管理结束-->

           </template>
        </el-table-column>
      </el-table>
      <!--      仓库详情表结束-->

      <!--      添加商品模态框开始-->
      <el-dialog title="收货地址" :visible.sync="addComDialogVisible">

        选择商品：
        <el-table
          ref="multipleTable"
          :data="warehouseComTableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="comHandleSelectionChange"
          @select="select"
          @select-all="selectAll">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="商品名"
            width="120">
            <template slot-scope="scope">{{ scope.row.name }}</template>
          </el-table-column>
          <el-table-column
            prop="brand"
            label="品牌"
            width="120">
          </el-table-column>
        </el-table>

        设置最低库存：<el-input-number v-model="addWarehouseDetailForm.min_number" :min="1" :max="100000" label="描述文字"></el-input-number>

        <span slot="footer" class="dialog-footer">
          <el-button @click="addComDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addWarehouseDetail">确 定</el-button>
        </span>
      </el-dialog>
      <!--      添加商品模态框结束-->

    </el-dialog>
    <!--    查看详情模态框结束-->

  </div>

</template>

<script>
    export default {
        name: "warehouse",
        data() {
          return {
            tableData:[],
            warehouseComTableData: [
              {id:"1",name:"康师傅方便面",brand:"康师傅"},
              {id:"2",name:"康师傅冰红茶",brand:"康师傅"},
              {id:"3",name:"康师傅老坛酸菜牛肉面",brand:"康师傅"},
            ],//仓库商品详情表的添加里面的表格商品数据展示
            dialogTableVisible: false,
            dialogFormVisible: false,
            insertdialogFormVisible:false,
            form: {
              id:'',
              name: '',
              adress:'',
              phone:'',
              remark:'',
            },
            addWarehouseDetailForm:{
              warehouse_id:"",
              commodity_id:"",
              img:"",
              number:0,
              min_number:0,
              remark:"备注",
            },//仓库详情表添加的form
            formLabelWidth: '100px',
            warehouseName:"",//查询条件
            pageindex:1,//当前第几页
            totalnum:1,//总共的条数
            pagesize:5,//每页几条
            multipleSelection:[],//选中的id
            checkedAll:false,//是否全选
            dialogTableVisible_warehouse_detail:false,//是否显示仓库商品详情模态框
            warehouse_detail_table:[],//仓库商品详情集合
            commodity_name:"",//查询条件：商品名字
            warehouse_id:0,//查询条件：仓库id
            warehouseDetailDelId:[],//仓库详情表需要删除的id
            addComDialogVisible:false,//仓库商品详情表添加的模态框
          }
        },
        methods:{
          //----------------------------------------------    仓库页面的方法         ---------------------------------------------------------
          getDate(){
            var _this =this;

            var params = new URLSearchParams();
            params.append('page',_this.pageindex);
            params.append('rows',_this.pagesize);
            params.append('name',_this.warehouseName);

            this.$axios.post("warehouse/query.action",params).
            then(function (result) {  //成功  执行then里面的方法

              _this.tableData=result.data.rows;

              var totalnum = result.data.total;
              _this.totalnum=totalnum;
              var pagetotal = totalnum%5==0?totalnum/5:Math.floor(totalnum/5)+1;
              _this.pagetotal=pagetotal;

            }).catch(function () { //失败 执行catch方法

            });
          },
          del(id){
            var delid = id+",";
            var _this =this;
            var params = new URLSearchParams();
            params.append("ids",delid);


            this.$axios.post("warehouse/delete.action",params).
            then(function (result) {  //成功  执行then里面的方法

              _this.$message({
                message: result.data,
                type: 'success'
              });

              _this.getDate();  //删除操作做完，刷新数据

            }).catch(function (error) { //失败 执行catch方法
              alert(error);
            });

            //将pageindex归为1
            this.pageindex=1;

          },
          delallto(){
            var boolean = confirm("您确定真的要删除吗？");
            if(boolean==true){
              this.delall();
            }
          },
          delall(){

            var delid ="";
            var _this =this;
            var multipleSelection=_this.multipleSelection;

            if(multipleSelection.length<1){
              alert("请选中后删除！！！");
              return;
            }

            for (var i = 0; i < multipleSelection.length; i++) {
              delid=delid+multipleSelection[i]+",";
            }

            var params = new URLSearchParams();
            params.append("ids",delid);


            this.$axios.post("warehouse/delete.action",params).
            then(function (result) {  //成功  执行then里面的方法

              _thi

              s.$message({
                message: result.data,
                type: 'success'
              });

              _this.getDate();  //删除操作做完，刷新数据

            }).catch(function (error) { //失败 执行catch方法
              alert(error);
            });

            //将pageindex归为1
            this.pageindex=1;
          },
          editto(id){
            var _this = this;
            _this.dialogFormVisible = true;

            var params = new URLSearchParams();
            params.append("id",id)
            //将数据异步显示
            this.$axios.post('warehouse/queryById.action',params).
            then(function (result) {
              _this.form=result.data;
            }).
            catch(function (error) {
              alert(error);
            });

          },
          edit(){
            var _this = this;
            var params = new URLSearchParams();
            params.append('id',_this.form.id);
            params.append('name',_this.form.name);
            params.append('adress',_this.form.adress);
            params.append('phone',_this.form.phone);
            params.append('remark',_this.form.remark);

            //执行编辑操作
            this.$axios.post("warehouse/update.action",params).
            then(function (result) {
              _this.$message({
                message: result.data,
                type: 'success'
              });

              _this.getDate();  //修改操作做完，刷新数据

              _this.form={id:'',name: '',adress:'',phone:'',remark:'',};//清空表单中的数据

            }).catch(function (error) {

             alert(error);

            })
            //关闭编辑模态框
            this.dialogFormVisible = false;
          },
          insert(){
            var _this = this;
            var params = new URLSearchParams();
            params.append('name',_this.form.name);
            params.append('adress',_this.form.adress);
            params.append('phone',_this.form.phone);
            params.append('remark',_this.form.remark);

            this.$axios.post('warehouse/insert.action',params).
            then(function (result) {

              _this.$message({
                message: result.data,
                type: 'success'
              });

              _this.getDate();  //修改操作做完，刷新数据

              _this.form={id:'',name: '',adress:'',phone:'',remark:'',};//清空表单中的数据
            }).
            catch(function (error) {
              alert(error);
            });

            this.insertdialogFormVisible=false;//隐藏添加模态框
          },
          handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pagesize=val;
            this.getDate();
          },
          handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.pageindex=val;
            this.getDate();
          },
          onRowClick(row, event, column) {

            var _this = this;
            _this.multipleSelection=[];
            for (var i = 0; i < row.length; i++) {
              _this.multipleSelection.push(row[i].id);
            }

          },

          //----------------------------------------------    商品详情页面的方法         ---------------------------------------------------------
          //商品详情页获取数据
          getWarehouseDetail(){
              var _this = this;

              var params = new URLSearchParams();
              params.append("warehouse_id",_this.warehouse_id);
              params.append("commodity_name",_this.commodity_name);

              this.$axios.post("warehouseDetail/query.action",params).
              then(function (result) {  //成功  执行then里面的方法

                result.data.rows.map(function (item,index,rows) {
                  item.img='src/assets/'+item.img;
                });

                _this.warehouse_detail_table=result.data.rows;

              }).catch(function (error) { //失败 执行catch方法
                alert(error);
              });
          },
          //打开商品详情模态框
          openCommodityDetailDialog(id){

            this.warehouse_id=id;

            this.getWarehouseDetail();

            this.dialogTableVisible_warehouse_detail = true;

          },
          //选中的商品改变
          warehouseDetailSelectionChange(val){
            //当选中改变时
            console.log(val);
            var _this = this;

            _this.warehouseDetailDelId.length=0;
            for(let item of val){
              _this.warehouseDetailDelId.push(item.id);
            }

          },
          //批量删除商品
          detailDelAll(){
            var _this = this;
            var delIdString = "";
            var delId = _this.warehouseDetailDelId;

            var bool = confirm("确认真的删除吗？");
            if(bool==false){
              return;
            }

            if(delId.length==0){
              alert("请选中后删除！！！");
              return;
            }

            for (var i = 0; i <delId.length; i++) {
              delIdString=delIdString+delId[i]+",";
            }

            var params = new URLSearchParams();
            params.append("ids",delIdString);


            this.$axios.post("warehouseDetail/delete.action",params).
            then(function (result) {  //成功  执行then里面的方法

              _this.$message({
                message: result.data,
                type: 'success'
              });

              _this.getWarehouseDetail();  //删除操作做完，刷新数据

            }).catch(function (error) { //失败 执行catch方法
              alert(error);
            });

            //将pageindex归为1
            this.pageindex=1;
          },
          //单个删除商品
          detailDelOne(id){
            var _this = this;
            var delIdString = id+",";


            var params = new URLSearchParams();
            params.append("ids",delIdString);


            this.$axios.post("warehouseDetail/delete.action",params).
            then(function (result) {  //成功  执行then里面的方法

              _this.$message({
                message: result.data,
                type: 'success'
              });

              _this.getWarehouseDetail();  //删除操作做完，刷新数据

            }).catch(function (error) { //失败 执行catch方法
              alert(error);
            });

            //将pageindex归为1
            this.pageindex=1;
          },
          //改变商品列表的复选框时
          comHandleSelectionChange(val){
            if(val.length==0){
              this.addWarehouseDetailForm.commodity_id="";
            }
          },
          //设置只选中一个
          select(selection, row) {
            if (selection.length > 1) {
              let del_row = selection.shift()
              this.$refs.multipleTable.toggleRowSelection(del_row, false)
            }
            this.addWarehouseDetailForm.commodity_id=selection[0].id;
          },
          //设置只选中一个
          selectAll(selection){
            if (selection.length > 1) {
              selection.length = 1
            }
            this.addWarehouseDetailForm.commodity_id=selection[0].id;
          },
          //添加仓库详情表的方法
          addWarehouseDetail(){
            var _this = this;
            _this.addWarehouseDetailForm.warehouse_id=_this.warehouse_id;
            console.log(this.addWarehouseDetailForm);
          },

        },
        watch:{
          "warehouseName":function () {
            this.getDate();
          },
          "commodity_name":function () {
            this.getWarehouseDetail();
          }
        },
        created() {
          this.getDate();
      }
    }
</script>

<style scoped>
  a:hover{
    text-decoration:underline;
  }
</style>
