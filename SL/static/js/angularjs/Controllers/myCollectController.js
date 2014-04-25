var app = angular.module('share.mycollect.controller', []);
app.controller('myCollectController', function ($scope, myCollectAPIService, loginAPIService) {

    $scope.collects = {};
    $scope.collect = {}; //用于修改收藏
    //如果是登录状态
//var collectService=new myCollectAPIService();

            myCollectAPIService.post({ collect: "getcollect" }, {}, function (response) {
                if (response[0].collect) {
                    console.info("sssss", response[0].collect);
                    $scope.collects =response[0].collect;
                     console.info($scope.collects);
                } else {
                    alert("error");
                }
            });


    //编辑状态
    $scope.showCollect = function (collect) {
        $scope.collect = collect;
    }

    //提交
    $scope.submitCollect = function (collect) {
        loginAPIService.islogin().success(function (data) {
            if (data[0].flag && data[0].power >= 2) {
                var collect = $scope.collect;
                console.info(collect.collectID);
                if (collect.collectID) {
                    myCollectAPIService.post({ flag: "editCollect", id: collect.collectID, title: collect.collectName, description: collect.description, url: collect.URL }, {},
            function (response) {
                console.info(response);
                if (response[0].flag) {

                    alert("success");
                } else {
                    alert("error");
                }
            });
                } else {
                    myCollectAPIService.post({ flag: "insertCollect", title: collect.collectName, description: collect.description, url: collect.URL, time: (new Date()).getTime() }, {},
            function (response) {
                console.info("aaa", response);
                if (response[0].flag) {
                    //$scope.collects.splice(0, 0, collect);
                    $scope.collects.unshift(collect);
                    alert("success");
                } else {
                    alert("error");
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

    //delete collect
    $scope.deleteCollect = function (id) {
        loginAPIService.islogin().success(function (data) {
            if (data[0].flag && data[0].power >= 2) {
                myCollectAPIService.post({ flag: "deleteCollect", id: id }, {}, function (response) {
                    console.info(response);
                    if (response[0].flag) {
                        angular.forEach($scope.collects, function (v, k) {
                            if (v.collectID == id) {
                                $scope.collects.splice(k, 1);
                            }
                        });
                        alert("success");

                    } else {
                        alert("error");
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
});
