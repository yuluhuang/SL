var app = angular.module('share.myhome.controller', []);
app.controller('myHomeController', function ($scope, myHomeAPIService, loginAPIService, $cookieStore) {

    $cookieStore.remove("editthemeid");
    $cookieStore.remove("taskid");
    $cookieStore.remove("playtaskid");
    //如果是登录状态
    loginAPIService.islogin().success(function (data) {
        console.info(data);
        if (data[0].flag) {
            myHomeAPIService.post({ flag: "myhome" }, {}, function (response) {
                console.info(response);
                if (response[0]) {

                    $scope.user = response[0].user[0]; //用户信息+theme ==>  user：[userinfo,theme:[{},...]]
                    $scope.user.icon = "uploads/z/mid_" + $scope.user.icon.substring(10);
                    $scope.user.motto = decodeURIComponent($scope.user.motto);

                    angular.forEach($scope.user.theme, function (v, k) {
                        v.remark = decodeURIComponent(v.remark);
                    });

                }
            });
        }
    });


    //通过themeID获取task

    $scope.getzuoqin = function (huod) {
        loginAPIService.islogin().success(function (data) {
            if (data[0].flag) {
                myHomeAPIService.post({ flag: "zuopinfo", id: huod.themeID }, {}, function (response) {
                    console.info('aaa', response[0]);
                    if (response[0]) {
                        $scope.user.theme.tasks = response[0].task || [];
                        angular.forEach($scope.user.theme.tasks, function (v, k) {
                            v.remark = decodeURIComponent(v.remark);
                        });

                    }

                    console.info(huod.themeID, $scope.user);
                });
            }
        });
    }


    //删除活动

    $scope.deleteTheme = function (theme) {
        loginAPIService.islogin().success(function (data) {
            //已登陆且权限〉2的用户可删除
            if (data[0].flag && data[0].power >= 2) {
                if (confirm('你确定要删除吗')) {
                    myHomeAPIService.post({ flag: "deleteTheme", id: theme.themeID }, {}, function (response) {
                        console.log(response);
                        if (response[0].flag) {

                            alert("删除成功");
                            console.info(theme);
                            angular.forEach($scope.user.theme, function (v, k) {
                                if (v.themeID === theme.themeID) {
                                    $scope.user.theme.splice(k, 1);
                                }
                            });
                        } else {
                            alert("删除失败");
                        }
                    });
                }
            } else {
                if (data[0].flag) {
                    alert("login");
                    window.location.href = "login.html";
                } else {
                    alert("权限不足");
                }
            }
        });

    }

    //编辑活动
    $scope.editTheme = function (theme) {
        $cookieStore.put("editthemeid", theme.themeID);
        console.info( $cookieStore.get("editthemeid"));
         window.location.href = "createtheme_1.html";
    }


    //删除作品

    $scope.deleteTask = function (task) {
        loginAPIService.islogin().success(function (data) {
            //已登陆且权限〉2的用户可删除
            if (data[0].flag && data[0].power >= 2) {
                myHomeAPIService.post({ flag: "deleteTask", id: task.taskID }, {}, function (response) {
                    if (response[0].flag) {
                        alert("删除成功");
                        angular.forEach($scope.user.theme.tasks, function (v, k) {
                            if (v.taskID === task.taskID) {
                                $scope.user.theme.tasks.splice(k, 1);
                            }
                        });
                    } else {
                        alert("删除失败");
                    }
                });
            } else {
                if (data[0].flag) {
                    alert("login");
                    window.location.href = "login.html";
                } else {
                    alert("权限不足");
                }
            }
        });
    }

    $scope.submitMotto = function () {
        loginAPIService.islogin().success(function (data) {
            if (data[0].flag && data[0].power >= 2) {
                var motto = encodeURIComponent(($scope.user.motto).trim());
                console.info("[" + motto + "]");
                myHomeAPIService.post({ flag: "motto", motto: motto }, {}, function (data) {

                });
            } else {
                if (data[0].flag) {
                    alert("login");
                    window.location.href = "login.html";
                } else {
                    alert("权限不足");
                }
            }
        });
    }

    $scope.editTask = function (task) {
        loginAPIService.islogin().success(function (data) {
            if (data[0].flag && data[0].power >= 2) {
                console.info(task);
                $cookieStore.put("edittaskid", task.taskID);
                window.location.href = "upload_1.html";

            }
        });
    }


    $scope.link = function (task) {
        console.info(task);
        $cookieStore.put("playtaskid", task.taskID);
        window.location.href = "player.html";
    }
});
