<template>
    <div>
      <el-popconfirm
        confirm-button-text='确认'
        cancel-button-text='取消'
        icon="el-icon-info"
        icon-color="red"
        title="确定删除该商品吗？"
        @confirm="delcommodity"
      >
        <el-button
          slot="reference"
          icon="el-icon-delete-solid"
          circle
          style="color: red"
        ></el-button>
      </el-popconfirm>



      <!-- Form -->
      <el-button
        slot="reference"
        icon="el-icon-edit"
        circle
        style="color: red"
        @click="dialogFormVisible = true"
      ></el-button>

      <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="活动名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="活动区域" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>


    </div>
</template>

<script>
    export default {
        name: "stafflist",
        methods:{
          delcommodity(){
            alert("删除成功！！！");
          }
        },
      data() {
        return {
          gridData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }],
          dialogTableVisible: false,
          dialogFormVisible: false,
          form: {
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
          },
          formLabelWidth: '120px'
        };
      }
    }
</script>

<style scoped>

</style>
