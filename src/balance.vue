<template>
  <div class="balance">
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
    <!--主体-->
    <div id="box">
      <div class="container">
        <!--商品信息-->
        <div class="row">
          <div class="car_xx" v-for="(item,index) in commodityData">
            <div class="car_xx_top">
              <div class="car_xx_top_left">
                <img :src="item.img" class="car_img"><br/>
                <span class="car_xx_top_left_span">*图片仅供参考,请以实物为准</span>
              </div>
              <div class="car_xx_top_right">
                <p class="car_name_p">{{item.name}}</p>
                <p class="car_xx_p">品牌：{{brandData[index].name}}&emsp;颜色：{{colorData[index].color}}&emsp;版本：{{versionData[index].version}}</p>
              </div>
              <span class="goods_num">x{{numbers[index]}}</span>
            </div>
            <div class="car_xx_bottom">
              <!--发票信息-->
              <div class="car_xx_bottom_left">
                <span class="car_xx_title">发票信息</span>
                <span class="car_xx_fp">电子普通发票&emsp;&emsp;个人</span>
                <span class="car_xx_fpxx">注：如果商品由第三方卖家销售，发票内容由其卖家决定，发票由卖家开具并寄出</span>
              </div>
              <!--价格信息-->
              <div class="car_xx_bottom_right">
                <span class="goods_price_box">商品单价:<span class="goods_price">￥{{price[index]}}</span></span>
                <span class="goods_num_box_price">商品数量:<span class="goods_num_price">x{{numbers[index]}}</span></span>
                <span class="goods_sumPrice_box">结算金额:<span class="goods_sumPrice">￥{{sumPrice[index]}}</span></span>
              </div>
            </div>
          </div>
        </div>
        <!--底部付款-->
        <div class="row">
          <div id="fuKuan_box">
            <div id="fuKuan_box_left">
              <input type="checkbox" id="fuKuan_box_checkbox" checked/>
              <span id="fuKuan_box_left_text">已阅读并同意</span>
              <a id="fuKuan_box_left_a">《速客数码购物条例》</a>
            </div>
            <div id="fuKuan_box_right">
              <button id="fuKuan_box_btn" @click="addOrder">提交订单</button>
              <span id="fuKuan_box_price">￥{{sumPrices}}</span>
              <span id="fuKuan_box_right_text">现在下单只需支付</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--底部-->
    <div class="foot">
      <div style="width: 1170px;margin: auto">
        <div style="width: 100%;float: left" id="bottom_box_top">
          <div style="width: 16.66%;float: left">
            <p class="bottom_box_title">购物相关</p>
            <p>
              <a href="javascript:;" class="bottom_box_a">购物指南</a>
            </p>
            <p>
              <a href="javascript:;" class="bottom_box_a">配送方式</a>
            </p>
            <p>
              <a href="javascript:;" class="bottom_box_a">支付方式</a>
            </p>
            <p>
              <a href="javascript:;" class="bottom_box_a">常见问题</a>
            </p>
          </div>
          <div style="width: 16.66%;float: left">
            <p class="bottom_box_title">特色服务</p>
            <p>
              <a href="javascript:;" class="bottom_box_a">防伪查询</a>
            </p>
            <p>
              <a href="javascript:;" class="bottom_box_a">补购保障</a>
            </p>
            <p>
              <a href="javascript:;" class="bottom_box_a">以旧换新</a>
            </p>
            <p>
              <a href="javascript:;" class="bottom_box_a">礼品包装</a>
            </p>
          </div>
          <div style="width: 16.66%;float: left">
            <p class="bottom_box_title">保修与退换货</p>
            <p>
              <a href="javascript:;" class="bottom_box_a">保修政策</a>
            </p>
            <p>
              <a href="javascript:;" class="bottom_box_a">退换货政策</a>
            </p>
            <p>
              <a href="javascript:;" class="bottom_box_a">保修状态查询</a>
            </p>
            <p>
              <a href="javascript:;" class="bottom_box_a">配件防伪查询</a>
            </p>
          </div>
          <div style="width: 25%;float: right">
            <p class="bottom_box_title">客服热线</p>
            <p class="bottom_box_a">
              <a href="javascript:;" class="bottom_box_a">中国内地拨打：1010-1020</a>
            </p>
            <p class="bottom_box_a">
              <a href="javascript:;" class="bottom_box_a">其他地区拨打： +86-10-6064-1387</a>
            </p>
            <button type="button" class="bottom_btn">在线客服</button>
          </div>
        </div>
        <div style="width: 100%;float: left" id="bottom_box_center">
          <span class="bottom_box_title" style="float: left">资质证书</span>
          <a href="javascript:;">
            <img class="bottom_img" src="src/img/bottom1.png">
          </a>
          <a href="javascript:;">
            <img class="bottom_img" src="src/img/bottom2.png">
          </a>
          <a href="javascript:;">
            <img class="bottom_img" src="src/img/bottom3.png">
          </a>
          <a href="javascript:;">
            <img class="bottom_img" src="src/img/bottom4.png">
          </a>
          <a href="javascript:;">
            <img class="bottom_img" src="src/img/bottom5.png">
          </a>
          <a href="javascript:;">
            <img class="bottom_img" src="src/img/bottom6.png">
          </a>
          <a href="javascript:;">
            <img class="bottom_img" src="src/img/bottom7.png">
          </a>
        </div>
        <div style="width: 100%" id="bottom_box_friend">
          <span class="bottom_box_friend_span">友情链接：</span>
          <a href="javascript:;" class="bottom_box_friend_a">出境游</a>
          <a href="javascript:;" class="bottom_box_friend_a">旅行地图</a>
          <a href="javascript:;" class="bottom_box_friend_a">旅游天气</a>
          <a href="javascript:;" class="bottom_box_friend_a">美国租车</a>
          <a href="javascript:;" class="bottom_box_friend_a">国外租车</a>
          <a href="javascript:;" class="bottom_box_friend_a">国际油价</a>
          <a href="javascript:;" class="bottom_box_friend_a">国外自驾游</a>
          <a href="javascript:;" class="bottom_box_friend_a">探途地图</a>
          <a href="javascript:;" class="bottom_box_friend_a">深圳国旅</a>
          <a href="javascript:;" class="bottom_box_friend_a">川藏线租车</a>
          <a href="javascript:;" class="bottom_box_friend_a">常州光大国旅</a>
          <a href="javascript:;" class="bottom_box_friend_a">度假别墅</a>
          <a href="javascript:;" class="bottom_box_friend_a">美国旅游</a>
          <a href="javascript:;" class="bottom_box_friend_a">龙摄天下摄影网</a>
          <a href="javascript:;" class="bottom_box_friend_a">银川旅游</a>
          <a href="javascript:;" class="bottom_box_friend_a">厦门国旅</a>
          <a href="javascript:;" class="bottom_box_friend_a">深圳旅游攻略</a>
          <a href="javascript:;" class="bottom_box_friend_a">广州户外</a>
          <a href="javascript:;" class="bottom_box_friend_a">旅行社</a>
          <a href="javascript:;" class="bottom_box_friend_a">美车致</a>
          <a href="javascript:;" class="bottom_box_friend_a">多多驿站</a>
          <a href="javascript:;" class="bottom_box_friend_a">YOOZ</a>
          <a href="javascript:;" class="bottom_box_friend_a">北京中国国际旅行社</a>
          <a href="javascript:;" class="bottom_box_friend_a">图灵未来资本</a>
          <a href="javascript:;" class="bottom_box_friend_a">网红地图</a>
          <a href="javascript:;" class="bottom_box_friend_a">TOM旅游</a>
        </div>
        <div style="width: 100%" id="bottom_box_bottom">
          <span class="bottom_box_bottom_span">© 2011-2020 suke.com. All Rights Reserved. 湖南达嘉维康医药有限公司 版权所有 </span>
          <a href="javascript:;" class="bottom_box_bottom_a">营业执照 </a>
          <a href="javascript:;" class="bottom_box_bottom_a">湘ICP备11007328号 </a>
          <a href="javascript:;" class="bottom_box_bottom_a">
            <img src="src/img/bottomLogo.png">
            湘公网安备 44010602000444号</a>
        </div>
      </div>
    </div>



    <!-- 添加模态框-->
    <el-dialog id="paydialog" title="支付" :visible.sync="dialogFormVisible">
      <div id="mydiv">

      </div>
    </el-dialog>
  </div>
</template>

<script>
  import $ from 'jQuery';

  export default {
    name: "balance",
    data() {
      return {
        account: 0,
        user_id:0,
        merchants:0,
        price:[],
        sumPrice:[],
        sumPrices:0.0,
        numbers: [],
        brandData:[],

        commodity_id: [],
        commodityData: [],
        colorId: [],
        colorData: [],
        versionId: [],
        versionData: [],

        tradeno:"",
        tradename:"",
        dialogFormVisible:false

      }
    },
    created() {
      this.getData();
      this.queryByAccount(sessionStorage.getItem("account"));
    },
    methods: {
      /*根据账号查询用户*/
      queryByAccount:function(account){
        var _this=this;

        var params = new URLSearchParams();
        params.append('account', account);

        _this.$axios.post("user/queryByAccount.action", params).then(function (result) {  //成功  执行then里面的方法
          var str = JSON.stringify(result.data).toString();
          _this.user_id= str.match(/id":(\S*),"account/)[1];
          _this.merchants=str.match(/user_id":(\S*),"balance/)[1];
        }).catch(function () { //失败 执行catch方法

        });
      },
      /*获取时间*/
      getDate(data){
        var date = new Date();

        var y= date .getFullYear(); //获取完整的年份(4位)
        var m=date .getMonth()+1; //获取当前月份(0-11,0代表1月)
        var d=date .getDate(); //获取当前日(1-31)
        var h=date .getHours(); //获取当前小时数(0-23)
        var mi= date .getMinutes(); //获取当前分钟数(0-59)
        var s= date .getSeconds(); //获取当前秒数(0-59)
        var ms= date .getMilliseconds(); //获取当前毫秒数(0-999)

        if (m<10){
          m="0"+m;
        }
        if (d<10){
          d="0"+d;
        }
        if (h<10){
          h="0"+h;
        }
        if (mi<10){
          mi="0"+mi;
        }
        if (s<10){
          s="0"+s;
        }

        if (data==1){
          return y.toString()+m.toString()+d.toString()+h.toString()+mi.toString()+s.toString()+ms.toString();
        }else {
          return y.toString()+"-"+m.toString()+"-"+d.toString()+" "+h.toString()+":"+mi.toString()+":"+s.toString();
        }



      },

      getUrlKey(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
      },
      /*获取数据*/
      getData() {
        var _this = this;

        if (_this.$route.query.colorDatas==null||_this.$route.query.colorDatas==""||_this.$route.query.colorDatas==undefined||_this.$route.query.colorDatas.length==0){
          _this.commodity_id.push(_this.getUrlKey("commodityId")) ;
          _this.numbers.push(_this.getUrlKey("numbers")) ;
          _this.colorId.push(_this.getUrlKey("colorId")) ;
          _this.versionId.push(_this.getUrlKey("versionId")) ;
        }else {
          _this.colorId=_this.$route.query.colorDatas;
          _this.versionId=_this.$route.query.versionDatas;
          _this.numbers=_this.$route.query.numberDatas;
          _this.commodity_id=_this.$route.query.commodity_idDatas;
        }

        _this.account = sessionStorage.getItem("account");

        //商品查询
        for (var i = 0; i < _this.commodity_id.length; i++) {
          _this.colorQuery(_this.colorId[i]);

          _this.versionQuery(_this.versionId[i],i);

          var params = new URLSearchParams();
          params.append('id', _this.commodity_id[i]);
          this.$axios.post("commodity/queryById.action", params).then(function (result) {  //成功  执行then里面的方法

            var data = result.data;

            data.img = "src/img/telePhone/" + data.img ;

            _this.commodityData.push(data);

            _this.brandQuery(data.brand.id);

          }).catch(function () { //失败 执行catch方法

          });
        }

      },
      /*颜色查询*/
      colorQuery: function (id) {
        var _this = this;
        //颜色查询
        var params = new URLSearchParams();
        params.append('id', id);

        _this.$axios.post("colorInfo/queryById.action", params).then(function (result) {  //成功  执行then里面的方法
          _this.colorData.push(result.data);
        }).catch(function () { //失败 执行catch方法

        });
      },
      /*版本查询*/
      versionQuery: function (vid,index) {
        var _this = this;

        var params = new URLSearchParams();
        params.append('id', vid);

        _this.$axios.post("versionInfo/queryById.action", params).then(function (result) {  //成功  执行then里面的方法
          _this.versionData.push(result.data);
          _this.price.push(result.data.price);

          var sumPrice;
          sumPrice=parseFloat(parseInt(_this.numbers[index])*parseFloat(result.data.price));

          var sumPrices=_this.sumPrices;
          sumPrices=sumPrices+sumPrice;

          _this.sumPrice.push(sumPrice);
          _this.sumPrices=sumPrices;
        }).catch(function () { //失败 执行catch方法

        });
      },
      /*品牌查询*/
      brandQuery:function(id){
        var _this = this;

        var params = new URLSearchParams();
        params.append('id', id);

        _this.$axios.post("brand/queryById.action", params).then(function (result) {  //成功  执行then里面的方法
          _this.brandData.push(result.data);
        }).catch(function () { //失败 执行catch方法

        });
      },
      /*提交订单*/
      pay(){

        var params = new URLSearchParams();
        params.append("tradeno",this.tradeno);  //订单号
        params.append("price",this.sumPrices);    //价格
        params.append("tradename",this.tradename);  //订单名字

        this.$axios.post("pay.action",params).then(function (result) {

          var bodystr = result.data;  //后端返回的支付页面代码
          console.log(bodystr)
          bodystr=bodystr.substr(0,bodystr.indexOf("<script>"));
          console.log(bodystr)
          document.getElementById("mydiv").innerHTML=bodystr;
          document.forms[0].submit();   //返回代码中需要表单提交得到真实的支付页面

        }).catch();

        this.dialogFormVisible=true;
      }
      ,
      addOrder:function(){
        var _this=this;
        /*设置订单号*/
        for (var i = 0; i < _this.commodity_id.length; i++) {

          //
          _this.tradename=_this.commodityData[i].name+"/";

          var orderNum="sk"+_this.getDate(1)+_this.commodity_id[i];

          //
          _this.tradeno=orderNum;

          var params = new URLSearchParams();

          var img=_this.commodityData[i].img.substring(18);

          params.append('order_number', orderNum);
          params.append('user_id', _this.user_id);
          params.append('merchants_id', _this.merchants);
          params.append('commodity_id', _this.commodity_id[i]);
          params.append('color', _this.colorData[i].color);
          params.append('version', _this.versionData[i].version);
          params.append('img', img);
          params.append('price', _this.price[i]);
          params.append('number', _this.numbers[i]);
          params.append('totalmoney', _this.sumPrice[i]);
          params.append('createtime', _this.getDate(2));

          _this.$axios.post("userOrder/insert.action", params).then(function (result) {  //成功  执行then里面的方法
            const h = _this.$createElement;

            _this.$notify({
              title: "提交成功",
              message: h('i', {style: 'color: gray;font-style:normal'}, "已为您提交订单，请及时付款")
            });
          }).catch(function () { //失败 执行catch方法

          });

        }

        _this.tradename=_this.tradename.substr(0,_this.tradename.length-2);

        //调用支付宝沙箱的支付功能
        _this.pay();

      },
    },
  }
</script>

<style scoped>
  #box {
    background-color: #f0f3f7;
    padding-bottom: 20px;
  }

  /*顶部样式*/
  .balance {
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


  /*底部样式*/
  .foot {
    width: 100%;
    height: 600px;
    background-color: rgba(0, 0, 0, .8);
  }

  .bottom_box_title {
    color: white;
    font-size: 22px;
    display: block;
    height: 50px;
    line-height: 50px;
  }

  .bottom_box_a {
    color: rgb(190, 190, 190);
    font-size: 14px;
    text-decoration: none;
  }

  .bottom_box_a:hover {
    color: dodgerblue;
    font-size: 14px;
    text-decoration: none;
  }

  .bottom_btn {
    width: 220px;
    height: 35px;
    border: lightgray solid 1px;
    background-color: transparent;
    color: white;
    transition: .3s;
    border-radius: 5px;
    outline: none;
  }

  .bottom_btn:hover {
    border: dodgerblue solid 1px;
    background-color: dodgerblue;
    transition: .3s;
  }

  #bottom_box_top {
    border-bottom: rgb(80, 80, 100) solid 1px;
    padding-top: 70px;
    padding-bottom: 50px;
  }

  #bottom_box_center {
    border-bottom: rgb(80, 80, 100) solid 1px;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .bottom_img {
    width: 100px;
    height: 40px;
    float: left;
    margin-left: 10px;
    margin-top: 5px;
  }

  #bottom_box_friend {
    border-bottom: rgb(80, 80, 100) solid 1px;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .bottom_box_friend_span {
    font-size: 12px;
    color: rgb(190, 190, 190);
  }

  .bottom_box_friend_a {
    font-size: 12px;
    color: rgb(190, 190, 190);
    text-decoration: none;
  }

  .bottom_box_friend_a:hover {
    font-size: 12px;
    color: dodgerblue;
    text-decoration: none;
  }

  #bottom_box_bottom {
    text-align: center;
    padding-top: 20px;
  }

  .bottom_box_bottom_span {
    font-size: 12px;
    color: rgb(190, 190, 190);
  }

  .bottom_box_bottom_a {
    font-size: 12px;
    color: rgb(190, 190, 190);
    text-decoration: none;
  }

  .bottom_box_bottom_a:hover {
    font-size: 12px;
    color: dodgerblue;
    text-decoration: none;
  }

  .car_xx {
    background-color: white;
    width: 100%;
    height: 320px;
    margin-top: 15px;
    padding: 10px 20px 10px 20px;
    border-radius: 10px;
  }

  .car_xx_top {
    width: 100%;
    height: 50%;
    border-bottom: lightgray solid 1px;
  }

  .car_xx_top_left {
    height: 100%;
    width: 200px;
    float: left;
  }

  .car_img {
    height: 120px;
    width: 120px;
    float: top;
  }

  .car_xx_top_left_span {
    float: top;
    font-size: 10px;
    color: gray;
  }

  .car_xx_top_right {
    height: 100%;
    width: 637px;
    float: left;
  }

  .car_name_p {
    font-size: 23px;
    margin-top: 40px;
  }

  .car_xx_p {
    color: gray;
  }

  .goods_num {
    display: inline-block;
    line-height: 150px;
    float: right;
    margin-right: 20px;
  }

  .car_xx_bottom {
    height: 50%;
    width: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .car_xx_bottom_left {
    float: left;
    height: 100%;
    width: 50%;
    border-right: lightgray solid 1px;
  }

  .car_xx_title {
    display: inline-block;
    width: 100%;
    height: 30px;
    float: left;
    line-height: 30px;
    font-size: 18px;
  }

  .car_xx_fp {
    float: left;
    display: inline-block;
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 13px;
    margin-top: 10px;
  }

  .car_xx_fpxx {
    display: inline-block;
    width: 100%;
    float: left;
    font-size: 12px;
    color: gray;
    margin-top: 10px;
    padding-right: 20px;
  }

  .car_xx_bottom_right {
    float: left;
    height: 100%;
    width: 50%;
  }

  .goods_price_box {
    display: inline-block;
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
  }

  .goods_price {
    color: red;
    margin-left: 20px;
  }

  .goods_num_box_price {
    display: inline-block;
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
  }

  .goods_num_price {
    color: red;
    margin-left: 20px;
  }

  .goods_sumPrice_box {
    display: inline-block;
    text-align: right;
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding-right: 20px;
  }

  .goods_sumPrice {
    color: red;
    margin-left: 20px;
    font-size: 25px;
  }

  #fuKuan_box {
    width: 100%;
    height: 70px;
    background-color: white;
    margin-top: 15px;
    margin-bottom: 15px;
    border-radius: 10px;
    padding-right: 10px;
  }

  #fuKuan_box_left {
    height: 100%;
    width: 40%;
    float: left;
  }

  #fuKuan_box_checkbox {
    margin-top: 28px;
    float: left;
    margin-left: 15px;
  }

  #fuKuan_box_left_text {
    float: left;
    margin-left: 5px;
    line-height: 70px;
  }

  #fuKuan_box_left_a {
    float: left;
    line-height: 70px;
    color: dodgerblue;
  }

  #fuKuan_box_right {
    height: 100%;
    width: 60%;
    float: left;
  }

  #fuKuan_box_right_text {
    display: block;
    font-size: 12px;
    color: gray;
    width: 48px;
    height: 24px;
    float: right;
    margin-top: 18px;
    margin-right: 5px;
  }

  #fuKuan_box_price {
    font-size: 24px;
    color: orangered;
    float: right;
    margin-right: 10px;
    font-weight: bold;
    margin-top: 18px;
  }

  #fuKuan_box_btn {
    background-color: rgb(50, 50, 50);
    color: white;
    float: right;
    border: none;
    margin-right: 5px;
    width: 170px;
    height: 50px;
    margin-top: 10px;
    border-radius: 3px;
    transition: .3s;
    outline: none;
    font-size: 18px;
  }

  #fuKuan_box_btn:hover {
    background-color: gray;
    transition: .3s;
  }
</style>
