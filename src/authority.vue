<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-button type="primary" round>授权</el-button>
        </el-row>
      </el-header>
      <el-container>
        <el-aside>
          <el-table
            :data="roleTable"
            style="width: 100%"
            @select="onRowClick">
            <el-table-column
              type="selection"
              prop="id"
              width="180"
              @click="">
            </el-table-column>
            <el-table-column
              label="角色"
              prop="name"
              width="180">
            </el-table-column>
          </el-table>
        </el-aside>
        <el-main>
          <el-tree
            :data="treeMenu"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            :props="defaultProps">
          </el-tree>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "authority",
    data() {
      return {
        roleTable: [],
        multipleSelection: [],//选中的id
        checkedAll: false,//是否全选
        rId: '0',//初始化角色id为0
        treeMenu: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    methods: {
      getTreeData() {  //获取数据
        var _this = this

        this.$axios.post("role/queryAll.action").then(function (result) {  //成功  执行then里面的方法
          _this.roleTable = result.data;
        }).catch(function () { //失败 执行catch方法

        });

      },
      getRoleData() {  //获取数据
        var _this = this

        this.$axios.post("role/queryAll.action").then(function (result) {  //成功  执行then里面的方法
          _this.roleTable = result.data;
        }).catch(function () { //失败 执行catch方法

        });

      }
    ,
      onRowClick(row, event, column) {

        var _this = this;
        _this.multipleSelection = [];
        for (var i = 0; i < row.length; i++) {
          _this.multipleSelection.push(row[i].id);
        }

      },
    },
    //显示角色信息  表格
    // $(function () {
    //   //初始化表格
    //   $('#rolelist').bootstrapTable({
    //     url: 'queryallroles.action',
    //     method: 'GET',                      //请求方式（*）
    //     //toolbar: '#toolbar',              //工具按钮用哪个容器
    //     striped: true,                      //是否显示行间隔色
    //     cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
    //     //pagination: true,                   //是否显示分页（*）
    //     sortable: true,                     //是否启用排序
    //     sortOrder: "asc",                   //排序方式
    //     sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
    //     //pageNumber: 1,                      //初始化加载第一页，默认第一页,并记录
    //     //pageSize: 5,                     //每页的记录行数（*）
    //     //pageList: [5, 10, 25, 50, 100],        //可供选择的每页的行数（*）
    //     search: false,                      //是否显示表格搜索
    //     strictSearch: true,
    //     showColumns: true,                  //是否显示所有的列（选择显示的列）
    //     showRefresh: true,                  //是否显示刷新按钮
    //     minimumCountColumns: 2,             //最少允许的列数
    //     clickToSelect: true,                //是否启用点击选中行
    //     //height: 500,                      //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
    //     uniqueId: "id",                     //每一行的唯一标识，一般为主键列
    //     singleSelect:true,
    //     //showToggle: true,                   //是否显示详细视图和列表视图的切换按钮
    //     //cardView: false,                    //是否显示详细视图
    //     // detailView: false,                  //是否显示父子表
    //     //得到查询的参数
    //     queryParams: function (params) {
    //       //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
    //       var temp = {
    //         rows: params.limit,                         //页面大小
    //         page: (params.offset / params.limit) + 1  //页码
    //       };
    //       return temp;
    //     },
    //     columns: [{
    //       field: ' ',
    //       title: '编号',
    //       checkbox:true
    //     },{
    //       field: 'id',
    //       title: '编号'
    //     }, {
    //       field: 'name',
    //       title: '角色名'
    //     }],
    //     onClickRow:function (row, $element) {  ////角色表格  绑定点击事件
    //       rid = row.id ;   //获取点击的角色id
    //       $("#tree2").reloadTree();  //重新加载菜单数据控件
    //     }
    //   });
    // });

    //初始化角色id为0，点击角色列表时，更改此变量的值
    //当点击角色列表，更改此值后，会重新加载树控件   角色id主要查询有哪些菜单数据需要选中
    // var rid =0;
    //显示菜单信息
    // let param = {
    //   data: {
    //     url: "queryallmenus2.action",
    //     type: 'get',
    //     subFunc: function(){   //此方法有作者封装   返回一个json数据  （组装要传给后台的数据 返回）
    //       return {'rid':rid};
    //     }
    //   },
    //   //数据处理方法
    //   process: {
    //     open: true,
    //     icon: "iconUrl",
    //     checkbox: {
    //       enable: true,
    //       name: 'name',
    //       value: 'id',
    //       checked: function(item,index,layer) {
    //         return item.checked;
    //       },   //返回绑定的menuinfo中的checked属性   false 不选中， true  选中
    //       //checkbox点击触发事件,function(e,checkbox,type){return void}
    //       onChecked: undefined
    //     },
    //     //标题(鼠标悬停时显示),字段或者function(item,index,layer){return str},
    //     title: "name",
    //     //树节点显示内容,字段或者function(item,index,layer){return str},
    //     text: 'name',
    //     //子级(list集合),字段名或者function(item,index,layer){return list}
    //     child: 'childMenu',
    //   },
    //   fill: true,
    //   fontSize: 16
    // }
    // $(function () {
    //   $("#tree2").loadTree(param);
    //
    // })
    // //授权操作
    // $("#btnauthsave").click(function () {
    //   //获取角色id
    //   var role =$('#rolelist').bootstrapTable("getSelections");
    //   if(role.length==0){
    //     alert("请选择一个角色");
    //   }
    //   //获取所有菜单id
    //
    //   var menuids =[];
    //   $("#tree2").getSelect().each(function (i) {
    //     menuids.push(this.value);
    //   })
    //   //异步传递给控制层
    //   console.log(menuids);
    //   $.post("auth.action",
    //     {"roleid":role[0].id,"menuids":JSON.stringify(menuids) },
    //     function (data) {
    //       alert(data);
    //     },"text");
    //   //回调  弹出结果
    // })
    created() {
      this.getRoleData();
    },
  }
</script>

<style scoped>

</style>
