var app = angular.module("share.manage.controller", []);
app.controller("manageController", function ($scope, manageAPIService, $timeout, baseUrlService) {
    var baseurl = baseUrlService.get();
    $scope.menus = [
    { 
        title: "用户管理", href: "userManage.html", content: "用户表", iconCls: "icon-ok", flag: "user"
         ,columns:[[
                   { field: "id", title: "id", width: 50 },
                   { field: "userId",  title: "账号", width: 50 }, 
                   { field: "password",  title: "密码", width: 50 }, 
                   { field: "salt",  title: "salt", width: 50 },
                   { field: "QQ",  title: "QQ", width: 100 },
                   { field: "name",  title: "姓名", width: 80 },
                   { field: "phone",  title: "电话", width: 80 },
                   { field: "Email",  title: "邮件", width: 80 },
                   { field: "icon",  title: "图标", width: 50 },
                   { field: "introduction",  title: "介绍", width: 100 },
                   { field: "motto",  title: "说说", width: 100 },
                   { field: "indentity",  title: "身份", width: 50 }
                  ]]
    },
    { 
        title: "主题管理", href: "userManage.html", content: "主题表", iconCls: "icon-ok",flag: "theme"
          ,columns:[[
                       { field: "id", title: "id", width: 50 },
//                       { field: "themeID", title: "themeID", width: 50 }, 
                       { field: "category",  title: "类型", width: 50 }, 
                       { field: "themeName",  title: "主题名", width: 50 },
                       { field: "remark",  title: "备注", width: 100 },
                       { field: "userId",  title: "账号", width: 80 },
                       { field: "show",  title: "可见", width: 80 },
                       { field: "icon",  title: "图标", width: 80 },
                       { field: "point",  title: "精华", width: 50 }
                      ]]
    }
    ];


    $scope.addTab = function (menu) {
        if ($("#tt").tabs('exists', menu.flag)) {
            $("#tt").tabs('select', menu.flag);
        }
        else {
            $('#tt').tabs('add', {
                border: false,
                title: menu.flag,
                content: '',
                closable: true,
                href: menu.href,
                tools: [{}]
        });


    }
    //console.info(menu.columns);
    $timeout(function(){
    $(".dg").datagrid({
        title: menu.content,
        fitColumns: true,
        remoteSort: false,
        idField: 'id',
        singleSelect: false, //是否单选
        pagination: true, //分页控件 
        rownumbers: true, //行号
        pageSize: 10, //每页显示的记录条数，默认为5 
        pageList: [10, 20, 30], //可以设置每页记录条数的列表  
        url: baseurl+"ashx/manageHandler.ashx?flag="+menu.flag,
        columns:menu.columns,
        onLoadError: function () { alert("Load Error"); }
       
    });
    var p = $(".dg").datagrid('getPager'); //中文显示
    $(p).pagination({
        beforePageText: '第', //页数文本框前显示的汉字  
        afterPageText: '页    共 {pages} 页',
        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'
    });
    },500);
    



}
});
