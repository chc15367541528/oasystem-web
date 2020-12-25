<template>

  <div>


    <el-container>
      <el-header ref="header" :height="headerHeight">
        <el-form size="mini" :inline="true" ref="headerrow">
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
              <el-button type="success" icon="el-icon-plus" size="mini" @click="insertDialogVisible=true">新增</el-button>
              <el-button icon="el-icon-delete-solid" type="danger" size="mini" @click="delAll">批量删除</el-button>
<!--              <el-button type="primary" icon="el-icon-download" size="mini" >导出</el-button>-->
<!--              <el-button type="success" icon="el-icon-upload2" size="mini" >导入</el-button>-->
<!--              <el-button type="warning" icon="el-icon-edit-outline" size="mini">批量修改</el-button>-->
<!--              <el-button type="warning" icon="el-icon-picture" size="mini" >上传照片</el-button>-->
            </template>
          </el-form-item>
        </el-form>
      </el-header>
      <el-main ref="maintab">
        <el-table ref="table" v-loading="table.loading" size="mini" :height="table.height"
                  :data="table.data" border @selection-change="selectionChange">
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column label="商品名" prop="name" align="center" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column label="图片"  align="center" width="150" show-overflow-tooltip>
            <template slot-scope="scope">
              <img :src="scope.row.img" width="60px" height="60px">
            </template>
          </el-table-column>
          <el-table-column label="规格" prop="specifications" align="center" width="80"></el-table-column>
          <el-table-column label="类型" prop="" align="center" width="80">
            <template slot-scope="scope">
              {{scope.row.commodityType.name}}
            </template>
          </el-table-column>
          <el-table-column label="品牌" prop="address" align="center" width="120">
            <template slot-scope="scope">
              {{scope.row.brand.name}}
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            label="操作">
            <template slot-scope="scope">
              <!--        编辑按钮开始-->
              <el-button slot="reference" icon="el-icon-edit-outline" type="primary" @click="editTo(scope.row.id)" size="mini">编辑</el-button>
              <!--        编辑按钮结束-->

              <!--        删除按钮开始-->
              <el-popconfirm
                confirm-button-text='确认'
                cancel-button-text='取消'
                icon="el-icon-info"
                icon-color="red"
                title="确定删除该商品吗？"
                @confirm="del(scope.row.id)"
              >
                <el-button slot="reference" icon="el-icon-delete-solid" type="danger" size="mini">删除</el-button>
              </el-popconfirm>
              <!--        删除按钮结束-->

              <!--        添加图片按钮开始-->
              <el-button slot="reference" type="success" icon="el-icon-plus" @click="addImgsTo(scope.row.id)" size="mini">添加图片</el-button>
              <!--        添加图片按钮结束-->

              <!--        添加规格按钮开始-->
              <el-button slot="reference" type="success" icon="el-icon-plus" @click="addVersionTo(scope.row.id)"  size="mini">添加规格</el-button>
              <!--        添加规格按钮结束-->
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
                       v-on:current-change="pageindexchange">
        </el-pagination>
      </el-footer>
    </el-container>


    <!--    添加商品的模态框开始-->
    <el-dialog title="新增商品" :visible.sync="insertDialogVisible" top="0" >
      <el-form :model="Form.insertForm"  :rules="rules"  ref="insertForm"  class="demo-ruleForm" label-width="100px">
        <el-form-item label="名字"  prop="name">
          <el-input v-model="Form.insertForm.name" autocomplete="off" size="mini" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="规格" prop="specifications">
          <el-input v-model="Form.insertForm.specifications" autocomplete="off" size="mini" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item  label="类型" prop="commodityType_id">
          <el-select v-model="Form.insertForm.commodityType_id" placeholder="请选择类型" size="mini">
            <el-option v-for="item in commodityTypes" v-if="item.value!=0" :key="item.value" :label="item.label" :value="item.value" >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品牌" prop="brand_id">
          <el-select v-model="Form.insertForm.brand_id" placeholder="请选择品牌" size="mini">
            <el-option  v-for="item in brands" v-if="item.value!=0" :key="item.value" :label="item.label" :value="item.value" size="mini">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图片" >
          <el-upload
            class="avatar-uploader"
            action="none"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="onInsertChange">
            <img v-if="Form.insertForm.imageUrl" :src="Form.insertForm.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="备注" >
          <el-input v-model="Form.insertForm.remark" autocomplete="off" size="mini" style="width: 400px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="insertDialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="insert('insertForm')" size="mini">确 定</el-button>
      </div>
    </el-dialog>
    <!--    添加商品的模态框结束-->

    <!--    编辑商品的模态框开始-->
    <el-dialog title="编辑商品" :visible.sync="updateDialogVisible" top="0">
      <el-form :model="Form.updateForm" :rules="rules"  ref="updateForm"  class="demo-ruleForm" label-width="100px">
        <el-form-item label="名字" prop="name">
          <el-input v-model="Form.updateForm.name" autocomplete="off" size="mini" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="规格" prop="specifications">
          <el-input v-model="Form.updateForm.specifications" autocomplete="off" size="mini" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="commodityType_id">
          <el-select v-model="Form.updateForm.commodityType_id" placeholder="请选择类型" size="mini">
            <el-option v-for="item in commodityTypes" :key="item.value" :label="item.label" :value="item.value" >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品牌" prop="brand_id">
          <el-select v-model="Form.updateForm.brand_id" placeholder="请选择品牌" size="mini">
            <el-option v-for="item in brands" :key="item.value" :label="item.label" :value="item.value" >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图片" >
          <el-upload
            class="avatar-uploader"
            action="none"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="onUpdateChange">
            <img v-if="Form.updateForm.imageUrl" :src="Form.updateForm.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
<!--          <input type="file" @change="getUpdateFile($event)" style="width: 400px;border-radius: 4px;border: 1px solid #DCDFE6;" size="mini"/>-->
        </el-form-item>
        <el-form-item label="备注" >
          <el-input v-model="Form.updateForm.remark" autocomplete="off" size="mini" style="width: 400px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateDialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="update('updateForm')" size="mini">确 定</el-button>
      </div>
    </el-dialog>
    <!--    编辑商品的模态框结束-->


    <!--    添加图片的模态框开始-->
    <el-dialog title="添加商品图片" :visible.sync="addImgDialogVisible" top="0">
      <el-form :model="Form" :rules="rules"  ref="updateForm"  class="demo-ruleForm" label-width="100px">

        <el-form-item label="图片列表" >
        <el-upload
          action="none"
          :auto-upload="false"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-change="onChange">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addImgDialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary"  size="mini" @click="addComImg">确 定</el-button>
      </div>
    </el-dialog>
    <!--    添加图片的模态框结束-->

    <!--    商品规格添加的模态框开始-->
    <el-dialog title="添加商品规格" :visible.sync="addVersionDialogVisible" top="0">
      <el-form :model="Form.addVersions" :rules="rules"  ref="addVersions"  class="demo-ruleForm" label-width="100px">

        <el-form-item label="规格名" prop="version">
          <el-input v-model="Form.addVersions.version" autocomplete="off" size="mini" style="width: 400px;"></el-input>
        </el-form-item>

        <el-form-item label="价       格" prop="price">
          <el-input-number v-model="Form.addVersions.price" :precision="2" :step="1" :min="1" ></el-input-number>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVersionDialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="addVersion('addVersions')" size="mini">确 定</el-button>
      </div>
    </el-dialog>
    <!--    商品规格添加的模态框结束-->
  </div>

</template>

<script>
    export default {
        name: "commodity",
        data() {
          return {
            dialogImageUrl: '',
            dialogVisible: false,
            insertDialogVisible:false,//用来控制添加用户模态框的显示
            updateDialogVisible:false,//用来控制编辑用户模态框的显示
            addImgDialogVisible:false,
            addVersionDialogVisible:false,
            headerHeight: 70,
            commodityTypes: [],//商品类型下拉框的选项
            brands: [],//品牌下拉框的选项
            params:{
              name:"",
              commodityType_id:"",
              brand_id:"",
            },//查询数据的参数
            delParams:"",//要删除的参数
            selectedId:"",//存放当前点击行的id
            Form:{
              insertForm:{id:"",name:"",specifications:"",commodityType_id:"",brand_id:"",file:'',remark:"",imageUrl:'',},
              updateForm:{id:"",name:"",specifications:"",commodityType_id:"",brand_id:"",file:'',remark:"",imageUrl:'',},
              addImgs:[],
              addVersions:{commodity_id:"",version:"",price: 0},
            },
            table: {
              loading: false,
              height: 550,
              data: [],
              page: 1,
              rows: 5,
              pagesize: [5, 10, 20, 30, 40, 50],
              total: 0,
            },
            rules: {
              name: [
                { required: true, message: '请输入商品名字', trigger: 'blur' },
                { min: 3, message: '商品名字的长度至少要大于3', trigger: 'blur' }
              ],
              specifications: [
                { required: true, message: '请输入规格', trigger: 'change' }
              ],
              commodityType_id: [
                { required: true, message: '请选择类型', trigger: 'change' }
              ],
              brand_id: [
                { required: true, message: '请选择品牌', trigger: 'change' }
              ],
              version:[
                { required: true, message: '请输入规格名字', trigger: 'blur' },
              ],
            },//表单验证规则
          }
        },
        methods: {
          handleRemove(file, fileList) {
            console.log(file, fileList);
          },
          handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
          },
          onChange(file, fileList){
            console.log("图片集合"+fileList);
            var _this = this;
            _this.Form.addImgs=fileList;
          },
          //打开添加商品图片模态框
          addImgsTo(id){
            this.addImgDialogVisible = true;
            this.selectedId=id;
          },
          //添加图片列表时执行
          addComImg(){
            var _this = this;

            var comId = _this.selectedId;


            for(var item of _this.Form.addImgs){

              var params = {'commodity_id':_this.selectedId,'file':item.raw};

              let  formData = new FormData();
              // formData.append("img",this.addform.img);
              //将需要提交的表单数据 快速组装为H5定义的类型FormData
              Object.keys(params).forEach((key) => {
                formData.append(key, params[key]);
              });


              this.$axios({
                method: 'post',
                url: 'imgInfo/insert.action',
                data:formData,
                headers: {
                  'Content-Type':'multipart/form-data'
                }
              })
                .then(function (result) {
                })
                .catch(function (error) {

                });


            }

            _this.$message.success("商品图片添加成功");
            _this.addImgDialogVisible = false;
            //清空表单数据
            _this.Form.addImgs={};
          },
          //打开添加商品规格模态框
          addVersionTo(id){
            this.addVersionDialogVisible = true;
            this.selectedId=id;
          },
          //添加规格时执行
          addVersion(formName){

            var _this =this;

            this.$refs[formName].validate((valid) => {
                if (valid) {


                  var params = new URLSearchParams();
                  params.append('commodity_id',_this.selectedId);
                  params.append('version',_this.Form.addVersions.version);
                  params.append('price',_this.Form.addVersions.price);

                  this.$axios.post("versionInfo/insert.action",params).
                  then(function (result) {  //成功  执行then里面的方法

                    if(result.data=="添加成功"){
                      _this.$message.success(result.data);
                    }else {
                      _this.$message.error(result.data);
                    }

                    _this.addVersionDialogVisible = false;

                    _this.Form.addVersions={commodity_id:"",version:"",price: 0};

                  }).catch(function () { //失败 执行catch方法

                  });



                } else {
                  console.log('error submit!!');
                  return false;
                }
            });




          },
          pagesizechange(size) {
            this.table.rows = size;
            this.getData();
          },
          pageindexchange(pindex) {
            this.table.page = pindex;
            this.getData();
          },
          //获取表格数据的方法
          getData() {
            var _this =this;

            var params = new URLSearchParams();
            params.append('page',_this.table.page);
            params.append('rows',_this.table.rows);
            params.append('name',_this.params.name);
            params.append('commodityType_id',_this.params.commodityType_id);
            params.append('brand_id',_this.params.brand_id);
            console.log("当前第几页",this.table.page);
            console.log("每页几条",this.table.rows);
            console.log("参数",this.params);

            this.$axios.post("commodity/query.action",params).
            then(function (result) {  //成功  执行then里面的方法
              var data = result.data.rows;

              for(var com of data){
                com.img="../src/assets/"+com.img;
              }

              _this.table.data=data;
              console.log(result.data.rows);

              _this.table.total=result.data.total;

            }).catch(function () { //失败 执行catch方法

            });
          },
          //跳转到编辑页面
          editTo(id){
            console.log("要编辑的id："+id);

            var _this =this;

            var params = new URLSearchParams();
            params.append('id',id);

            this.$axios.post("commodity/queryById.action",params).
            then(function (result) {  //成功  执行then里面的方法

              //打开编辑模态框
              _this.updateDialogVisible=true;


                _this.Form.updateForm.id=result.data.id;
              _this.Form.updateForm.name=result.data.name;
              _this.Form.updateForm.specifications=result.data.specifications;
              _this.Form.updateForm.commodityType_id=result.data.commodityType.id;
              _this.Form.updateForm.brand_id=result.data.brand.id;
              _this.Form.updateForm.imageUrl="../src/assets/"+result.data.img;
              _this.Form.updateForm.remark=result.data.remark;

            }).catch(function () { //失败 执行catch方法

            });
          },
          //删除单个
          del(id){
            console.log("要删除的id："+id);

            var _this =this;

            var params = new URLSearchParams();
            params.append('ids',id+",");

            this.$axios.post("commodity/delete.action",params).
            then(function (result) {  //成功  执行then里面的方法

              if(result.data=="删除成功"){
                _this.$message.success(result.data);
              }else{
                _this.$message.error(result.data);
              }

              _this.table.page=1;
              _this.getData();
            }).catch(function () { //失败 执行catch方法

            });
          },
          //删除多个
          delAll(){
            var _this =this;

            if(_this.delParams==""){
              _this.$message.warning("请选中商品后删除");
              return;
            }

            this.$confirm('此操作将删除选中的商品, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {

              var params = new URLSearchParams();
              params.append('ids',_this.delParams);
              console.log("要删除的id："+_this.delParams);

              this.$axios.post("commodity/delete.action",params).
              then(function (result) {  //成功  执行then里面的方法

                if(result.data=="删除成功"){
                  _this.$message.success(result.data);
                }else{
                  _this.$message.error(result.data);
                }

                _this.table.page=1;
                _this.getData();
              }).catch(function () { //失败 执行catch方法

              });

            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });


          },
          //新增商品
          insert(formName){
            var _this =this;

            this.$refs[formName].validate((valid) => {
              if (valid) {

                let  formData = new FormData();
                // formData.append("img",this.addform.img);
                //将需要提交的表单数据 快速组装为H5定义的类型FormData
                Object.keys(this.Form.insertForm).forEach((key) => {
                  formData.append(key, this.Form.insertForm[key]);
                });

                //此处使用原生的axios，因为文件提交 要设置 类型Content-Type=multipart/form-data，切记，需要post提交
                //此处axios原生类似于 jquery的 原生  $.ajax 和 $.get  $.post
                this.$axios({
                  method: 'post',
                  url: 'commodity/insert.action',
                  data:formData,
                  headers: {
                    'Content-Type':'multipart/form-data'
                  }
                })
                  .then(function (result) {
                    _this.$message.success(result.data);
                    _this.insertDialogVisible = false;
                    //刷新数据
                    _this.getData();
                    //清空表单数据
                    _this.Form.insertForm={id:"",name:"",specifications:"",commodityType_id:"",brand_id:"",file:'',remark:"",imageUrl:'',};
                  })
                  .catch(function (error) {
                    _this.$message.error("新增失败");
                    console.log(error);
                  });

              } else {
                console.log('error submit!!');
                return false;
              }
            });



          },
          //编辑商品
          update(formName){
            var _this =this;




            this.$refs[formName].validate((valid) => {
              if (valid) {



                let  formData = new FormData();
                // formData.append("img",this.addform.img);
                //将需要提交的表单数据 快速组装为H5定义的类型FormData
                Object.keys(this.Form.updateForm).forEach((key) => {
                  if(key=="file"){
                    if(this.Form.updateForm[key]!=''){
                      formData.append(key, this.Form.updateForm[key]);
                    }
                  }else{
                    formData.append(key, this.Form.updateForm[key]);
                  }

                });

                //此处使用原生的axios，因为文件提交 要设置 类型Content-Type=multipart/form-data，切记，需要post提交
                //此处axios原生类似于 jquery的 原生  $.ajax 和 $.get  $.post
                this.$axios({
                  method: 'post',
                  url: 'commodity/update.action',
                  data:formData,
                  headers: {
                    'Content-Type':'multipart/form-data'
                  }
                })
                  .then(function (result) {
                    _this.$message.success(result.data);
                    _this.updateDialogVisible = false;
                    //刷新数据
                    _this.getData();
                    //清空表单
                    _this.Form.updateForm={id:"",name:"",specifications:"",commodityType_id:"",brand_id:"",file:'',remark:"",imageUrl:'',};
                  })
                  .catch(function (error) {
                    _this.$message.error("编辑失败");
                    console.log(error);
                  });


              } else {
                console.log('error submit!!');
                return false;
              }
            });



          },
          //当选中的列改变时
          selectionChange(val){
            //当选中改变时
            var _this = this;

            _this.delParams="";
            for(let item of val){
              _this.delParams=_this.delParams+item.id+",";
            }
          },
          //获取图片文件
          // getInsertFile: function (event) {  //文件每次选中，触发此方法  将选中的文件内容填充到Form.insertForm中的img  后台通过img获取文件内容
          //   this.Form.insertForm.file = event.target.files[0];
          //   console.log(this.Form.insertForm.file);
          // },
          //获取图片文件
          // getUpdateFile: function (event) {  //文件每次选中，触发此方法  将选中的文件内容填充到Form.insertForm中的img  后台通过img获取文件内容
          //   this.Form.updateForm.file = event.target.files[0];
          //   console.log(this.Form.updateForm.file);
          // },
          onInsertChange(file, fileList){
            this.Form.insertForm.imageUrl="http://localhost:9090/src/assets/"+file.name;
            this.Form.insertForm.file=file.raw;
          },
          onUpdateChange(file, fileList){
            this.Form.updateForm.imageUrl="http://localhost:9090/src/assets/"+file.name;
            this.Form.updateForm.file=file.raw;
          },
        },
        //表格一创建就查询出数据
        created() {
          var _this = this;
          this.getData();

          //商品类型下拉框的json数组
          this.$axios.post("commodityType/queryAll.action").
          then(function (result) {  //成功  执行then里面的方法

            _this.commodityTypes.push({ value: '0', label: '全部' });
            for(var item of result.data){
              _this.commodityTypes.push({ value:item.id, label:item.name });
            }

          }).catch(function () { //失败 执行catch方法

          });

          //商品品牌下拉框的json数组
          this.$axios.post("brand/queryAll.action").
          then(function (result) {  //成功  执行then里面的方法

            _this.brands.push({ value: '0', label: '全部' });
            for(var item of result.data){
              _this.brands.push({ value:item.id, label:item.name });
            }

          }).catch(function () { //失败 执行catch方法

          });
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
          params: {
            deep: true,
            handler: function (newVal, oldVal) {
              this.table.page = 1;
              //参数改变，重新查询数据
              this.getData();
            }
          }
        },
    }
</script>

<style scoped>
  el-input{
    width: 400px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px dashed #409EFF;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;

  }
</style>
