var app = angular.module('share.myinfo.controller', []);
app.controller('myInfoController', function ($scope, myInfoAPIService, loginAPIService) {

    $scope.infos = []; //all infos
    $scope.partinfos = []; //show info
    //如果是登录状态
    loginAPIService.islogin().success(function (data) {
        if (data[0].flag) {
            myInfoAPIService.post({ flag: "getinfo" }, {}, function (response) {
                if (response[0] && typeof (response[0].flag) === "undefined") {
                    $scope.infos = response[0].infos || []; //唯一 所有信息
                    var noreadinfos = [];
                    angular.forEach($scope.infos, function (value, key) {
                        //将未读消息筛选出来
                        if (value.read == "False") {
                            noreadinfos.push(value);
                            $scope.partinfos = noreadinfos;
                            console.info($scope.partinfos);
                        }
                    });
                }
            });
        }
    });
    //显示已读消息
    $scope.readedinfo = function () {
        var noreadinfos = [];
        var flag = 0; //解决  如果都未读 即value.read == "False" 就将 $scope.partinfos设为空
        angular.forEach($scope.infos, function (value, key) {
            //将已读消息筛选出来
            if (value.read == "True") {
                flag = 1;
                noreadinfos.push(value);
                $scope.partinfos = noreadinfos;
                console.info($scope.partinfos);
            }
        });
        if (flag == 0) {
            $scope.partinfos = noreadinfos; //为空
        }
    }


    //显示未读消息
    $scope.noreadedinfo = function () {
        var noreadinfos = [];
        var flag = 0;
        angular.forEach($scope.infos, function (value, key) {
            //将未读消息筛选出来
            if (value.read == "False") {
                flag = 1;
                noreadinfos.push(value);
                $scope.partinfos = noreadinfos;
                console.info($scope.partinfos);
            }
        });
        if (flag == 0) {
            $scope.partinfos = noreadinfos; //为空
        }
    }
    //显示所有信息
    $scope.showAll = function () {
        $scope.partinfos = $scope.infos;
    }


    //如果此条消息为true，先找到infos中这天消息设为false，在发送请求
    $scope.setcheckbox = function (info) {
        loginAPIService.islogin().success(function (data) {
            if (data[0].flag && data[0].power >= 2) {
                if (info.read == "True") {
                    angular.forEach($scope.partinfos, function (value, key) {
                        if (value.id == info.id) {
                            value.read = "False";
                        }

                    });

                    myInfoAPIService.post({ flag: "setinfo", id: info.id, read: "False" }, {}, function (response) {
                        if (response[0].flag == "true") {
                            alert("success");
                        }

                    });
                } else {
                    angular.forEach($scope.partinfos, function (value, key) {
                        if (value.id == info.id) {
                            value.read = "True";
                        }

                    });
                    myInfoAPIService.post({ flag: "setinfo", id: info.id, read: "True" }, {}, function (response) {
                        if (response[0].flag == "true") {
                            alert("success");
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
});
