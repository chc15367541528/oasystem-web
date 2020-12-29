<template>
  <div class="cart">
    <!--顶部-->
    <div style="height: 115px">
      <div class="head">
        <div style="width: 1170px;margin: auto">
          <div class="s-sub">
            <a class="head-left" href="index.html">首页</a>
            <a class="head-left" href="index.html">速客官网</a>
          </div>
          <div class="s-main">
            <span v-show="account==0" class="head-right">您好，请
              <a href="javascript:;" style="color: white" @click="$router.push('/userLogin')">登录</a>
            </span>

            <a class="head-right" href="javascript:;" v-show="account!=0">欢迎你， {{account}}</a>
            <a class="head-right" href="javascript:;" @click="$router.push('/register')" v-show="account==0">注册</a>
            <a class="head-right" href="javascript:;" @click="$router.push('/datum')">个人中心</a>
            <a class="head-right" href="javascript:;" @click="$router.push('/cart')">购物车</a>
          </div>
        </div>
      </div>
      <!--顶部logo/搜索框-->
      <div class="box-top">
        <div style="width: 1170px;margin: auto">
          <div class="row">
            <a href="index.html" class="logo"></a>
            <div class="search-top">
              <input placeholder="华为 Mate 40 Pro 5G" class="search-top-ipt"/>
              <a class="a-search" href="javascript:;">
                <img class="icon-search" src="src/img/icon/搜索.png"/>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
    <!-- 购物车 -->
    <div class="box">
      <div id="shopping-cart" class="page-shopping-cart">
        <span class="cart-title">购物清单</span>
        <el-table
          :data="tableData"
          empty-text="您的购物车没有商品呢，快去逛逛吧！"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="100" align="center"></el-table-column>
          <el-table-column label="商" width="100" align="right">
            <template slot-scope="scope">
              <img :src="scope.row.commodity.img" width="98" height="98" alt="">
            </template>
          </el-table-column>
          <el-table-column label="品" width="400" align="left" class="td-product">
            <template slot-scope="scope">
              <div class="product-info">
                <h5 style="display: inline-block;width: 300px;">{{scope.row.commodity.name}}</h5>
                <p>品牌：{{scope.row.commodity.brand.name}}&nbsp;&nbsp;颜色:{{scope.row.colorInfo.color}}&nbsp;&nbsp;</p>
                <p>版本：{{scope.row.versionInfo.version}}</p>
              </div>
              <div class="clearfix"></div>
            </template>
          </el-table-column>
          <el-table-column label="数量" align="center" width="192">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.number" :min="1" label="描述文字"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="单价(元)" align="center">
            <template slot-scope="scope">
              <p class="red-text">￥<span class="price-text">{{scope.row.versionInfo.price}}</span>.00</p>
            </template>
          </el-table-column>
          <el-table-column label="金额(元)" align="center">
            <template slot-scope="scope">
              <p class="red-text">￥<span class="price-text">{{scope.row.number*scope.row.versionInfo.price}}</span>.00
              </p>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">

              <!--        删除按钮开始-->
              <el-popconfirm
                confirm-button-text='确认'
                cancel-button-text='取消'
                icon="el-icon-info"
                icon-color="red"
                title="确定移除该商品吗？"
                @confirm="delOne(scope.row.id)"
              >
                <el-button slot="reference" icon="el-icon-delete-solid" type="danger" size="mini">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

      </div>
      <!-- 最后一行统计 -->
      <div class="cart-product-info">
        <div style="width: 1170px;margin: auto">
          <a href="javascript:;" class="delete-product" @click="delchecked">删除所选商品</a>
          <a href="#" class="keep-shopping" @click="keepShopping">继续购物</a>
          <a href="javascript:;" class="fr btn-buy" @click="bug">去结算</a>
          <a href="javascript:;" class="fr product-total">￥<span>{{totalPrice}}</span></a>
          <a href="javascript:;" class="fr check-num"><span>{{totalNumber}}</span>件商品总计（不含运费）:</a>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jQuery';

  export default {
    data() {
      return {
        editIsDialog: false, //编辑弹窗
        addIsDialog: false, //添加弹窗
        multipleSelection: [], //存放已选择的数据
        formData: {
          name: "",
          price: "",
          number: ""
        },
        editData: {},
        formLabelWidth: "200",
        //表格中的数据
        tableData: [],
        selectedId: [],//被选中的id集合
        account:0,

        colorDatas:[],
        versionDatas:[],
        numberDatas:[],
        commodity_idDatas:[],
      };
    },
    methods: {
      // 点击复选框发生的变化
      handleSelectionChange(val) {
        this.multipleSelection = val; //给定义的数组赋值

        // 去重获取被选中的id值存入到数组中
        if (val.length == 0) {
          this.selectedId.length = 0;
        } else {

          //先清空之前的
          this.selectedId.length = 0;
          //push值进去
          for (let selectedItem of val) {
            this.selectedId.push(selectedItem.id)
          }

        }

      },
      handleDelete(index, row) {
        alert("取消了");
      },
      //获取购物车数据
      getData() {
        var _this = this;

        if (sessionStorage.getItem("account")!=null&&sessionStorage.getItem("account")!=undefined&&sessionStorage.getItem("account")!=""){
          _this.account=sessionStorage.getItem("account");
        }else {
          _this.account=0;
        }

        var params = new URLSearchParams();
        params.append("user_id", 1);

        this.$axios.post("shoppingCar/query.action", params).then(function (result) {
          //获取到购物车对象集合
          var shoppingCartList = result.data.rows;
          for (var item of shoppingCartList) {
            item.commodity.img = 'src/assets/' + item.commodity.img;
          }

          _this.tableData = shoppingCartList;

        }).catch(function (error) {

        });
      },

      //删除单个购物车
      delOne(id) {
        var _this = this;

        var delid = id + ",";
        var params = new URLSearchParams();
        params.append("ids", delid);


        this.$axios.post("shoppingCar/delete.action", params).then(function (result) {  //成功  执行then里面的方法

          _this.$message({
            message: result.data,
            type: 'success'
          });

          _this.getData();  //删除操作做完，刷新数据

        }).catch(function (error) { //失败 执行catch方法

        });

        //操作做完 清空delids
        this.delids.length = 0;

      },
      //删除勾选的商品
      delchecked() {
        var _this = this;

        var delids = _this.selectedId;

        //判断用户是否选中了商品
        if (delids.length == 0) {
          _this.$message.warning("请选中商品后删除");
          return;
        }

        _this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.$message({
            type: 'success',
            message: '删除成功!'
          });
          var delidsString = "";
          //循环合成一个id字符串
          for (var i = 0; i < delids.length; i++) {
            delidsString = delidsString + delids[i] + ",";
          }

          var params = new URLSearchParams();
          params.append("ids", delidsString);

          this.$axios.post("shoppingCar/delete.action", params).then(function (result) {  //成功  执行then里面的方法

            _this.getData();  //删除操作做完，刷新数据

          }).catch(function (error) { //失败 执行catch方法

          });

          //操作做完 清空delids
          this.selectedId.length = 0;
        }).catch(() => {
          _this.$message({
            type: 'info',
            message: '已取消删除'
          });
        })
      },

      delBuyCheck(){
        var _this = this;
        var delids = _this.selectedId;
        var delidsString = "";
        //循环合成一个id字符串
        for (var i = 0; i < delids.length; i++) {
          delidsString = delidsString + delids[i] + ",";
        }

        var params = new URLSearchParams();
        params.append("ids", delidsString);

        this.$axios.post("shoppingCar/delete.action", params).then(function (result) {  //成功  执行then里面的方法

        }).catch(function (error) { //失败 执行catch方法

        });
      },
      //继续购物
      keepShopping() {
        //跳转到商品浏览界面
        this.$router.push("/sort");
      },
      //结算
      bug() {
        //点击结算时，添加订单数据
        var _this = this;

        var multipleSelection = _this.multipleSelection;

        for (var i = 0; i <multipleSelection.length ; i++) {
          _this.colorDatas.push(multipleSelection[i].colorInfo.id);
          _this.versionDatas.push(multipleSelection[i].versionInfo.id);
          _this.numberDatas.push(multipleSelection[i].number);
          _this.commodity_idDatas.push(multipleSelection[i].commodity.id);

        }
        _this.delBuyCheck();
        _this.$router.push({
          path: '/balance',
          query:{
            colorDatas:_this.colorDatas,
            versionDatas:_this.versionDatas,
            numberDatas:_this.numberDatas,
            commodity_idDatas:_this.commodity_idDatas
          }
        })
        _this.colorDatas.length=0;
        _this.versionDatas.length=0;
        _this.numberDatas.length=0;
        _this.commodity_idDatas.length=0;
        _this.getData();  //操作做完，刷新数据

      },
    },
    // 通过computed计算属性及时改变
    computed: {
      // 总价
      totalPrice() {
        var price_total = 0;
        for (var i = 0; i < this.multipleSelection.length; i++) {
          price_total +=
            this.multipleSelection[i].versionInfo.price * this.multipleSelection[i].number;
        }
        return price_total;
      },
      // 总数
      totalNumber() {
        var number_total = 0;
        for (var i = 0; i < this.multipleSelection.length; i++) {
          number_total += this.multipleSelection[i].number;
        }
        return number_total;
      }
    },
    components: {},
    created() {
      this.getData();
    }
  };
</script>

<style scoped>
  .cart {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: left;
    background-color: #f0f3f7;
  }

  .head {
    width: 100%;
    height: 36px;
    line-height: 36px;
    background-color: rgba(0, 0, 0, .8);
  }

  .s-sub {
    float: left;
    text-align: left;
  }

  .s-main {
    float: right;
    text-align: right;
  }

  .head-left {
    display: inline-block;
    padding-left: 10px;
    padding-right: 10px;
    color: lightgray;
    font-size: 12px;
    text-decoration: none;
  }

  .head-left:hover {
    text-decoration: none;
    color: white;
  }

  .head-left:focus {
    text-decoration: none;
    color: white;
  }

  .head-right {
    display: inline-block;
    padding-left: 10px;
    padding-right: 10px;
    color: lightgray;
    font-size: 12px;
    text-decoration: none;
  }

  .head-right:hover {
    text-decoration: none;
    color: white;
  }

  .head-right:focus {
    text-decoration: none;
    color: white;
  }

  .box-top {
    width: 100%;
    height: 80px;
    background-color: white;
    position: absolute;
    z-index: 999;
    top: 35px;
    margin-bottom: 80px;
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, .1);
  }

  .logo {
    float: left;
    display: inline-block;
    width: 127px;
    height: 60px;
    margin-top: 10px;
    background: url("img/suke_logo.png");
    background-size: 100% 100%;
  }

  .search-top {
    float: right;
    width: 250px;
    height: 30px;
    margin-top: 24px;
    background-color: rgb(240, 240, 240);
    border-radius: 50px;
    overflow: hidden;
    border: transparent solid 1px;
  }

  .search-top:hover {
    border: lightgray solid 1px;
  }

  .search-top-ipt {
    float: left;
    width: 220px;
    height: 30px;
    background-color: transparent;
    border: none;
    outline: none;
    padding-left: 15px;
  }

  .a-search {
    display: inline-block;
    margin-top: 3px;
  }

  .icon-search {
    height: 20px;
    width: 20px;
  }

  .addDialog .el-input {
    width: 90%;
  }

  .total_warpper {
    text-align: right;
    margin-top: 30px;
  }

  h3 {
    margin-top: 10px;
  }

  /*新复制来的样式*/
  .fl {
    float: left;
  }

  .fr {
    float: right;
  }

  blockquote,
  body,
  dd,
  div,
  dl,
  dt,
  fieldset,
  form,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  img,
  input,
  li,
  ol,
  p,
  table,
  td,
  textarea,
  th,
  ul {
    margin: 0;
    padding: 0;
  }

  .clearfix {
    zoom: 1;
  }

  .clearfix:after {
    clear: both;
  }

  .clearfix:after {
    content: '.';
    display: block;
    overflow: hidden;
    visibility: hidden;
    font-size: 0;
    line-height: 0;
    width: 0;
    height: 0;
  }

  a {
    text-decoration: none;
    color: #333;
  }

  img {
    vertical-align: middle;
  }

  .box {
    width: 100%;
    background-color: #f0f3f7;
    padding-top: 50px;
    padding-bottom: 100px;
  }

  .page-shopping-cart {
    width: 1200px;
    margin: auto;
    font-size: 14px;
    border-radius: 10px;
    background-color: white;
    overflow: hidden;
    padding-bottom: 0;
  }

  .cart-title {
    display: inline-block;
    width: 100%;
    color: rgba(0, 0, 0, .7);
    font-size: 16px;
    text-align: left;
    padding-left: 20px;
    line-height: 68px;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, .1);
  }

  .page-shopping-cart .red-text {
    color: #e94826;
  }

  .page-shopping-cart .check-span {
    display: block;
    width: 24px;
    height: 24px;
    margin-top: 9px;
    background: url("../src/assets/勾选 (1).png") no-repeat center;
    background-size: 100% 100%;
    cursor: pointer;
  }

  /* 点击时改变勾选 */

  .page-shopping-cart .check-span.check-true {
    background: url("../src/assets/勾选.png") no-repeat center;
    background-size: 100% 100%;
    cursor: pointer;
  }

  .page-shopping-cart .td-check {
    width: 70px;
  }

  .page-shopping-cart .td-product {
    width: 460px;
  }

  .page-shopping-cart .td-num,
  .page-shopping-cart .td-price,
  .page-shopping-cart .td-total {
    width: 160px;
  }

  .page-shopping-cart .td-do {
    width: 150px;
  }

  .cart-product-title {
    text-align: center;
    height: 38px;
    line-height: 38px;
    padding: 0 20px;
    background-color: #f7f7f7;
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
  }

  .cart-product-title .td-product {
    text-align: center;
    font-size: 14px;
  }

  .cart-product-title .td-check {
    text-align: left;
  }

  .cart-product-title .td-check .check-span .check-span {
    margin: 9px 6px 0 0;
  }

  /* 内容开始 */

  .cart-product {
    padding: 0 20px;
    text-align: center;
  }

  .cart-product table {
    width: 100%;
    text-align: center;
    font-size: 14px;
  }

  .cart-product table td {
    padding: 20px 0;
  }

  .cart-product table tr {
    border-bottom: 1px dashed #e3e3e3;
  }

  .cart-product table tr:last-child {
    border-bottom: none;
  }

  .cart-product table .product-num {
    border: 1px solid #e3e3e3;
    display: inline-block;
    text-align: center;
  }

  .cart-product table .product-num .num-do {
    width: 24px;
    height: 28px;
    background: #f7f7f7;
    display: block;
  }

  .cart-product table .product-num .num-reduce span {
    display: block;
    width: 6px;
    height: 2px;
    margin: 13px auto 0 auto;
    background: url("assets/加号.png") no-repeat -40px -22px;
  }

  .cart-product table .product-num .num-add span {
    display: block;
    width: 8px;
    height: 8px;
    margin: 10px auto 0 auto;
    background: url("assets/加号.png") no-repeat -60px -22px;
  }

  .cart-product table .product-num .num-input {
    width: 42px;
    height: 28px;
    line-height: 28px;
    border: none;
    text-align: center;
  }

  .cart-product table .td-product {
    text-align: center;
    font-size: 12px;
    line-height: 20px;
  }

  .cart-product table .td-product img {
    border: 1px solid #e3e3e3;
    margin-right: 10px;
  }

  .cart-product table .td-product .product-info {
    display: inline-block;
    vertical-align: middle;
    text-align: left;
  }

  .cart-product table .td-do {
    font-size: 12px;
  }

  /* 最后一行统计 */

  .cart-product-info {
    height: 80px;
    width: 100%;
    line-height: 80px;
    padding-left: 50px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, .1);
    position: fixed;
    z-index: 999;
    bottom: 0;
    background-color: white;
  }

  .delete-product {
    color: #666;
  }

  .delete-product span {
    display: inline-block;
    vertical-align: top;
    margin: 18px 8px 0 0;
    width: 13px;
    height: 15px;
    background: url("assets/删除.png") no-repeat -60px 0;
  }

  .product-total {
    font-size: 14px;
    color: #e94826;
  }

  .product-total span {
    font-size: 20px;
  }

  .check-num {
    color: #333;
  }

  .check-num span {
    color: #e94826;
  }

  .keep-shopping {
    color: #666;
    margin-left: 40px;
  }

  .keep-shopping span {
    display: inline-block;
    vertical-align: top;
    margin: 18px 8px 0 0;
    width: 15px;
    height: 15px;
    background: url("assets/购物车.png") no-repeat -40px 0;
  }

  .btn-buy {
    height: 50px;
    color: white;
    font-size: 20px;
    display: block;
    width: 110px;
    background-color: indianred;
    text-align: center;
    margin-left: 30px;
    margin-top: 15px;
    line-height: 50px;
    border-radius: 10px;
  }

  /* cart-worder */

  .page-shopping-cart .cart-worder {
    padding: 20px;
  }

  .page-shopping-cart .cart-worder .choose-worder {
    color: #fff;
    display: block;
    background: #39e;
    width: 140px;
    height: 40px;
    line-height: 40px;
    border-radius: 4px;
    text-align: center;
    margin-right: 20px;
  }

  .page-shopping-cart .cart-worder .choose-worder span {
    display: inline-block;
    vertical-align: top;
    margin: 9px 10px 0 0;
    width: 22px;
    height: 22px;
    /*background: url("cartBg.png") no-repeat -92px 0;*/
  }

  .page-shopping-cart .cart-worder .worker-info {
    color: #666;
  }

  .page-shopping-cart .cart-worder .worker-info img {
    border-radius: 100%;
    margin-right: 10px;
  }

  .page-shopping-cart .cart-worder .worker-info span {
    color: #000;
  }

  .choose-worker-box {
    width: 620px;
    background: #fff;
  }

  .choose-worker-box .box-title {
    height: 40px;
    line-height: 40px;
    background: #F7F7F7;
    text-align: center;
    position: relative;
    font-size: 14px;
  }

  .choose-worker-box .box-title a {
    display: block;
    position: absolute;
    top: 15px;
    right: 16px;
    width: 10px;
    height: 10px;
    /*background: url("shopping_cart.png") no-repeat -80px 0;*/
  }

  .choose-worker-box .box-title a:hover {
    /*background: url("shopping_cart.png") no-repeat -80px -22px;*/
  }

  .choose-worker-box .worker-list {
    padding-top: 30px;
    height: 134px;
    overflow-y: auto;
  }

  .choose-worker-box .worker-list li {
    float: left;
    width: 25%;
    text-align: center;
    margin-bottom: 30px;
  }

  .choose-worker-box .worker-list li p {
    margin-top: 8px;
  }

  .choose-worker-box .worker-list li.cur a {
    color: #f70;
  }

  .choose-worker-box .worker-list li.cur a img {
    border: 1px solid #f70;
  }

  .choose-worker-box .worker-list li a:hover {
    color: #f70;
  }

  .choose-worker-box .worker-list li a:hover img {
    border: 1px solid #f70;
  }

  .choose-worker-box .worker-list li img {
    border: 1px solid #fff;
    border-radius: 100%;
  }
</style>
