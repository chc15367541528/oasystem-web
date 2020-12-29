<template>
  <div id="app" class="homeWrap">
    <el-container style="height:100%" direction="vertical">
      <!--      导航栏开始-->
      <el-header height="100px">

      </el-header>
      <!--      导航栏结束-->
      <el-container>
        <el-aside>
          <el-row class="tac">
            <el-col :span="12">

              <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose">

                <el-submenu v-if="menu.childMenu.length>0" :index="menu.id+''"  v-for="menu in menusData">
                  <template  slot="title">
<!--                    <i :class="menu.iconUrl"></i>-->
                    <span>{{menu.name}}</span>
                  </template>

                  <!-- <el-menu-item-group>-->

                  <el-menu-item  :index="menu.id+'_'+childe.id"  v-for="childe in menu.childMenu" @click="addTab(childe.name,childe.linkUrl)">
<!--                    <i :class="childe.iconUrl"></i>-->
                    {{childe.name}}
                  </el-menu-item>
                  <!--</el-menu-item-group>-->

                </el-submenu>

              </el-menu>
            </el-col>
          </el-row>
<!--          <el-row class="tac">-->
<!--            <el-col :span="12" style="width: 100%;height: 100%;">-->
<!--              <el-menu-->
<!--                default-active="2"-->
<!--                class="el-menu-vertical-demo">-->
<!--                &lt;!&ndash;                @open="handleOpen"&ndash;&gt;-->
<!--                &lt;!&ndash;                @close="handleClose">&ndash;&gt;-->
<!--                &lt;!&ndash; 菜单组件中使用路由配置方式-->
<!--          在el-main中通过router-view展示子组件-->
<!--          &ndash;&gt;-->
<!--                <el-submenu index="1">-->
<!--                  <template slot="title">-->
<!--                    <i class="el-icon-user-solid"></i>-->
<!--                    <span>资料管理</span>-->
<!--                  </template>-->
<!--                  <el-menu-item-group>-->
<!--                    <el-menu-item index="1-1" @click="addTab('用户列表','userlist')">用户列表</el-menu-item>-->
<!--                    <el-menu-item index="1-2" @click="addTab('部门列表','deptlist')">部门列表</el-menu-item>-->
<!--                    <el-menu-item index="1-3" @click="addTab('员工列表','staffList')">员工管理</el-menu-item>-->
<!--                    <el-menu-item index="1-4" @click="addTab('仓库列表','warehouselist')">仓库列表</el-menu-item>-->
<!--                    <el-menu-item index="1-5" @click="addTab('角色列表','roleList')">角色列表</el-menu-item>-->
<!--                    <el-menu-item index="1-6" @click="addTab('分类列表','commoditytypelist')">分类列表</el-menu-item>-->
<!--                    <el-menu-item index="1-7" @click="addTab('商品管理','commoditylist')">商品管理</el-menu-item>-->
<!--                  </el-menu-item-group>-->
<!--                </el-submenu>-->

<!--                <el-submenu index="2">-->
<!--                  <template slot="title">-->
<!--                    <i class="el-icon-location"></i>-->
<!--                    <span>订单管理</span>-->
<!--                  </template>-->
<!--                  <el-menu-item-group>-->
<!--                    <el-menu-item index="1-1" @click="addTab('订单列表','userorderlist')">订单列表</el-menu-item>-->
<!--                  </el-menu-item-group>-->
<!--                </el-submenu>-->

<!--                <el-submenu index="3">-->
<!--                  <template slot="title">-->
<!--                    <i class="el-icon-user-solid"></i>-->
<!--                    <span>权限管理</span>-->
<!--                  </template>-->
<!--                  <el-menu-item-group>-->
<!--                    <el-menu-item index="1-1" @click="addTab('员工角色','staffRole')">员工角色</el-menu-item>-->
<!--                    <el-menu-item index="1-2" @click="addTab('角色权限','authority')">角色权限</el-menu-item>-->
<!--                  </el-menu-item-group>-->
<!--                </el-submenu>-->

<!--              </el-menu>-->
<!--            </el-col>-->
<!--          </el-row>-->
        </el-aside>
        <el-main>

          <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
            <el-tab-pane
              v-for="(item, index) in editableTabs"
              :key="item.name"
              :label="item.title"
              :name="item.name"
            >
              <component :is="item.content"></component>
            </el-tab-pane>
          </el-tabs>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import MenuVue from '../components/menu.vue';
  import Userlist from "../components/userlist";
  import Deptlist from "../components/deptlist";
  import StaffList from "../components/StaffList";
  import Warehouselist from "../components/warehouse";
  import RoleList from "../components/RoleList";
  import Userorderlist from "../components/userOrder";
  import CommodityTypeList from "../components/commodityType";
  import StaffAuthority from "../components/staffAuthority";
  import Authority from "../components/RoleMenu";
  import CommodityList from "../components/commodity";

  export default {
    components: {
      menuvue: MenuVue,
      userlist: Userlist,
      deptlist: Deptlist,
      staffList: StaffList,
      warehouselist: Warehouselist,
      roleList: RoleList,
      userorderlist: Userorderlist,
      commoditytypelist: CommodityTypeList,
      staffAuthority: StaffAuthority,
      authority: Authority,
      commoditylist: CommodityList
    },
    data() {
      return {
        editableTabsValue: '1',
        editableTabs: [],
        tabIndex: 0,
        staffid:sessionStorage.getItem("staffid"),
        menusData:[]
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      getData1() {//获取登录者的id
        var _this = this;
        if (sessionStorage.getItem("staffid") != null && sessionStorage.getItem("staffid") != undefined && sessionStorage.getItem("staffid") != "") {
          _this.staffid = sessionStorage.getItem("staffid");
        } else {
          _this.staffid = 0;
        }
      },
      getmenudata() {  //获取数据
        var _this = this;

        var params = new URLSearchParams();
        params.append("sid", _this.staffid);

        this.$axios.post("menu/queryAllLeftMenu.action", params).then(function (result) {  //成功  执行then里面的方法
          _this.menusData = result.data;

        }).catch(function (error) { //失败 执行catch方法
          console.log(error)
        });
      },
      addTab(titleName, comval) {
        var res = this.editableTabs.filter((item) => {
          return item.title == titleName
        });
        if (res.length == 0) {
          let newTabName = ++this.tabIndex + '';
          this.editableTabs.push({
            title: titleName,
            name: newTabName,
            content: comval
          });
          this.editableTabsValue = newTabName;
        } else {
          this.editableTabsValue = res[0].name;
        }
      },
      removeTab(targetName) {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      }
    },
    created() {
      this.getData1();
      this.getmenudata();
    },
  }
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: left;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: left;
  }
  .homeWrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    border: aliceblue 1px solid;
    width: 300px;
    min-height: 545px;
  }
</style>
