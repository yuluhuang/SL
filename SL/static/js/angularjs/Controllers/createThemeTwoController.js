var app = angular.module('share.createthemeT.controller', []);
app.controller('createThemeTwoController', function ($scope, $timeout, createThemeService, loginAPIService, $cookieStore, baseUrlService) {
    var baseurl = baseUrlService.get();
    var id = $cookieStore.get("editthemeid");
    console.info("id",id);
    //图片剪切
    $scope.cutPic = function () {
        loginAPIService.islogin().success(function (data) {
            if (data[0].flag && data[0].power >= 2) {
                var x = document.getElementById("x").defaultValue;
                var y = document.getElementById("y").defaultValue;
                var w = document.getElementById("w").defaultValue;
                var h = document.getElementById("h").defaultValue;
                var filepath = document.getElementById("filepath").defaultValue;
                createThemeService.post({ flag: "cutpic", id: id, x: x, y: y, w: w, h: h, filepath: filepath }, {}, function (response) {
                    console.info("sss", response);
                    if (response[0].flag) {
                        alert("success");
                    } else {
                        alert("error");
                    }
                });
            } else {
                alert("login");
            }
        });
    }

    $scope.nextstep = function () {
        loginAPIService.islogin().success(function (data) {
            if (data[0].flag && data[0].power >= 2) {
                $cookieStore.remove("editthemeid")
                window.location.href = "myhome.html";
            } else {
                alert("login");
            }
        });
    }

});
