var app = angular.module('share.uploadThree.controller', []);
app.controller('uploadThreeController', function ($scope, $location, uploadAPIService, loginAPIService, $cookieStore) {

    var id = $cookieStore.get("taskid");
    console.info(id);
    loginAPIService.islogin().success(function (data) {
        if (data != "false") {
            uploadAPIService.post({ flag: "getItems", id: id }, {}, function (response) {
                console.info(response);
                if (response[0] && typeof (response[0].flag) === "undefined") {
                    $scope.items = response[0].items;
                    angular.forEach($scope.items, function (v, k) {
                        v.remark = decodeURIComponent(v.remark);
                    });

                } else {
                    alert("error");
                }
            });
        }
    });
    //删除条目
    $scope.deleteItem = function (item) {
        loginAPIService.islogin().success(function (data) {
            if (data[0].flag && data[0].power >= 2) {
                if (confirm('你确定要删除吗')) {
                    uploadAPIService.post({ flag: "delItem", id: item.itemID }, {}, function (response) {
                        if (response[0].flag) {
                            alert("success");
                            angular.forEach($scope.items, function (v, k) {
                                if (v === item) {
                                    $scope.items.splice(k, 1);
                                }
                            });
                        } else {
                            alert("error");
                        }
                        console.info(response);
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

    //提交修改
    $scope.submitItem = function (item) {
        loginAPIService.islogin().success(function (data) {
            if (data[0].flag && data[0].power >= 2) {
                var remark = encodeURIComponent((item.remark).trim());
                uploadAPIService.post({ flag: "modifyItem", id: item.itemID, title: item.title, remark: remark }, {}, function (response) {
                    if (response[0].flag) {
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


    $scope.nextstep = function () {
        loginAPIService.islogin().success(function (data) {
            if (data[0].flag && data[0].power >= 2) {
                location.href = "upload_4.html";
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
