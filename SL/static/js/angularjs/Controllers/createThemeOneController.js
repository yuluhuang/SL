var app = angular.module('share.createtheme.controller', []);
app.controller('createThemeOneController', function ($scope, $timeout, createThemeService, loginAPIService, $cookieStore) {

    $scope.nexbtn = true; //按钮禁用
    //如果是登录状态
    //判断是创建theme还是编辑theme通过
    var id = $cookieStore.get("editthemeid");

    console.info("id", id);
    //$cookieStore.remove("editthemeid");
    loginAPIService.islogin().success(function (data) {
        if (data != "false") {
            console.info("sss", id);
            if (typeof (id) !== "undefined") {//如果是编辑，就通过taskid获取taskinfo 绑定到页面
                createThemeService.post({ flag: "getthemeinfobyid", id: id }, {}, function (response) {
                    console.info(response);
                    //拿到数据
                    if (response[0] && response[0].theme) {
                        $scope.theme = response[0].theme[0] || [];
                        $scope.theme.remark = decodeURIComponent($scope.theme.remark);
                        console.info($scope.theme);
                    } else {
                        //alert("zz");
                    }
                });

            }
        }
    });

    //下一步，发送请求
    $scope.sendrequire = function (theme) {
        //如果是登录状态

        loginAPIService.islogin().success(function (data) {
            var f = "";
            if (typeof (id) === "undefined") {//判断是更新还是插入，执行语句不同，此为插入
                f = "inserttheme";

            } else {
                f = "updatetheme";
            }
            if (data[0].flag && data[0].power >= 2) {
                $scope.nexbtn = false; //按钮禁用
                var remark = encodeURIComponent((theme.remark).trim());
                createThemeService.post({ flag: f, themeID: id || 0, themeName: theme.themeName, remark: remark, category: theme.category },
                 {}, function (response) {
                     console.info("aaa", response[0].flag);
                     //后台发送数据都为json（成功[{id：xx}]或失败[{flag:false}]）
                     //response[0] 都成立所有加typeof(response[0].flag) === "undefined"进行判断
                     if (response[0] && typeof (response[0].flag) === "undefined" && response[0].id !== 0) {
                         $cookieStore.put("editthemeid", response[0].id);

                         location.href = "createtheme_2.html";
                         // $cookieStore.remove("editthemeid");
                     } else {
                         alert("error");
                         $scope.nexbtn = true;
                     }
                 });
            }
        });
    }
});
