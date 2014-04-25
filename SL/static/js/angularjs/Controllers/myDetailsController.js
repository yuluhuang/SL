var app = angular.module('share.mydetails.controller', []);
app.controller('myDetailsController', function ($scope, myDetailsAPIService, loginAPIService, baseUrlService) {
    var baseurl = baseUrlService.get();
    $scope.user = {};

    loginAPIService.islogin().success(function (data) {
        if (data[0].flag) {

            myDetailsAPIService.post({ flag: "getuserinfo" }, {}, function (response) {
                console.info(response);
                if (response[0]) {
                    
                    $scope.user = response[0].user[0];
                    console.log($scope.user.icon);

                }
            });
        }

    });
    //修改个人信息
    $scope.modifyMyInfo = function () {
        loginAPIService.islogin().success(function (data) {
            if (data[0].flag && data[0].power >= 2) {
                alert("ol");
                var my = $scope.user;
                myDetailsAPIService.post({ flag: "modifyinfo", name: my.name, email: my.Email, introduction: my.introduction }, {}, function (response) {
                    console.info("sss", response[0].flag);
                    if (response[0].flag) { alert("修改成功"); } else {
                        alert("修改失败");
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

    //修改密码
    $scope.updatepassword = function () {
        loginAPIService.islogin().success(function (data) {
            if (data[0].flag && data[0].power >= 2) {
                var my = $scope.user;
                myDetailsAPIService.post({ flag: "updatepassword", password: my.passwordA }, {}, function (response) {
                    if (response[0].flag) {
                        alert("修改成功");
                    } else {
                        alert("修改失败");
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

    //图片剪切
    $scope.cutPic = function () {
    var pic={};
       // loginAPIService.islogin().success(function (data) {
            //if (data[0].flag && data[0].power >= 2) {
                pic.x = document.getElementById("x").defaultValue;
                pic.y = document.getElementById("y").defaultValue;
                pic.w = document.getElementById("w").defaultValue;
                pic.h = document.getElementById("h").defaultValue;
                pic.div_w=(document.getElementById('img_personal').style.width).replace('px','');
                pic.div_h=(document.getElementById('img_personal').style.height).replace('px','');
                pic.filepath =document.getElementById("filepath").defaultValue;

                console.info(pic);
                myDetailsAPIService.post({ 'detail': "cutpic"}, pic, function (response) {
                     console.info(response);
                    if (response[0].flag) {
                        //alert("保存成功");
                    } else {
                        //alert("保存失败");
                    }
                });
            //}
            //else {
               // if (data[0].flag) {
                   // alert("login");
                   // window.location.href = "login.html";
                //} else {
                   // alert("权限不足");
              //  }
          //  }
       // });
    }

   
});
