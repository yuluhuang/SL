var app = angular.module('share.uploadFour.controller', []);
app.controller('uploadFourController', function ($scope, $location, uploadAPIService, loginAPIService, $cookieStore, baseUrlService) {
    var baseurl = baseUrlService.get();
    var idd = $cookieStore.get("taskid");
    //图片剪切
    $scope.cutPic = function () {
        loginAPIService.islogin().success(function (data) {
            if (data[0].flag && data[0].power >= 2) {
                var x = document.getElementById("x").defaultValue;
                var y = document.getElementById("y").defaultValue;
                var w = document.getElementById("w").defaultValue;
                var h = document.getElementById("h").defaultValue;
                var filepath = document.getElementById("filepath").defaultValue;
                uploadAPIService.post({ flag: "cutpic", id: idd, x: x, y: y, w: w, h: h, filepath: filepath }, {}, function (response) {
                    console.info("sss", response);
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
                $cookieStore.put("playtaskid", idd);
                window.location.href = "player.html";
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
