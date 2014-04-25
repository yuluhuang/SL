var app = angular.module('share.uploadOne.controller', ['ngCookies']);
app.controller('uploadOneController', function ($scope, $timeout, uploadAPIService, loginAPIService, $cookieStore) {

    $scope.nexbtn = true; //按钮禁用
    //如果是登录状态
    //判断是创建task还是编辑task通过
    var id = $cookieStore.get("edittaskid");
    //$cookieStore.remove("edittaskid");
    loginAPIService.islogin().success(function (data) {
        if (data[0].flag && data[0].power >= 2) {//已登陆，权限
            console.info("sss", id);
            if (typeof (id) !== "undefined") {//如果是编辑，就通过taskid获取taskinfo 绑定到页面
                uploadAPIService.post({ flag: "gettaskinfobyid", id: id }, {}, function (response) {
                    //拿到数据
                    if (response[0] && response[0].task) {
                        $scope.task = response[0].task[0] || [];
                        $scope.task.remark = decodeURIComponent($scope.task.remark);

                        $scope.themeName = response[0].task[0].themeName;
                        console.info($scope.tasks);
                    } else {
                        //alert("zz");
                    }
                });
            }
        }
    });
    //下一步，发送请求
    $scope.sendrequire = function (task) {
        //如果是登录状态
        loginAPIService.islogin().success(function (data) {

            var f = "";
            if (typeof (id) === "undefined") {//判断是更新还是插入，执行语句不同，此为插入
                f = "inserttask";
            } else {
                f = "updatetask";
            }
            var themeName = $scope.themeName;
            //用户单击selectOne，themeID不为0，
            var themeID = $scope.themeID || 0;
            //如果为0（即用户未选择提供的活动名）继续判断用户输入的活动名是否已存在
            //遍历判断
            if (!themeID) {//如果为0
                console.info("ssss", $scope.themes);
                angular.forEach($scope.themes, function (v, k) {
                    if (v.themeName == themeName) {
                        console.info("ssss", v);
                        themeID = v.themeID
                    }
                });
            }
            if (data[0].flag && data[0].power >= 2) {//已登陆，权限
                $scope.nexbtn = false; //按钮禁用
                var remark = encodeURIComponent((task.remark).trim());
                uploadAPIService.post({ flag: f, taskName: task.taskName, taskID: task.taskID || 0, remark: remark, category: task.category,
                    time: (new Date()).getTime(), themeID: themeID, themeName: themeName
                }, {}, function (response) {
                    console.info("aaa", response[0].flag);
                    //后台发送数据都为json（成功[{id：xx}]或失败[{flag:0}]）
                    //response[0] 都成立所有加typeof(response[0].flag) === "undefined"进行判断
                    if (response[0] && typeof (response[0].flag) === "undefined" && response[0].id !== 0) {
                        $cookieStore.put("taskid", response[0].id);
                        console.info($cookieStore.get("taskid"));

                        location.href = "upload_2.html";
                        $cookieStore.remove("edittaskid");
                    } else {
                        alert("error");
                        $scope.nexbtn = true;
                    }
                });
            }
        });
    }

    //获取themes

    $scope.$watch("$scope.themeName", function () {
        console.info($scope.themeName);
        $timeout(function () {
            uploadAPIService.post({ flag: "selecttheme", key: $scope.themeName || "" }, {}, function (response) {
                console.info(response);
                if (response[0] && typeof (response[0].flag) === "undefined") {
                    $scope.themes = response[0].theme;
                }
                else {
                    alert("查询失败");
                }
            });

        }, 380);
    });



    $scope.selectOne = function (theme) {
        $scope.themeName = theme.themeName;
        $scope.themeID = theme.themeID;
        $scope.themes = "";

    }

});
