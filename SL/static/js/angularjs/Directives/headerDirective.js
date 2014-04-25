var shareDirectives = angular.module('share.header.directives', ['ngCookies']);
shareDirectives.directive("headerD", function ($timeout, loginAPIService, searchAPIService, $location, $cookieStore) {
    return {
        restrict: 'A',
        templateUrl: '/static/js/angularjs/Directives/headerD.html',
        link: function ($scope, $element, $attrs) {
            console.info("dddddd", $location.path());
            $scope.islogining = false;
            $scope.forSearch = false; //����������

            //var loginService=new searchAPIService($scope.user);
            searchAPIService.post({login:"islogin"},{},function(data){
             console.info("ssss",data);
                if (data) {
                    $scope.islogining = true;
                    //$scope.username = data[0].userName;
                }
                else {
                    console.info("ddddd", $location.path());
                    if ($location.path() != "/login" && $location.path() != "/index" && $location.path() != "/fastregister") {
                        alert("qqqlogin");
                        $scope.islogining = false;
                        $scope.username = "";
                    }
                }
            });



            $scope.upload = function () {
                location.href = "upload_1.html";
            }

            $scope.noteLink = function () {
                location.href = "mynote.html";
            }

            $scope.loginShow = true;
            $scope.showLogin = function () {

                $scope.loginShow = false;
            }

            $scope.linkReg = function () {
                location.href = "fastregister.html#fastregister";
            }

            $scope.myhomelink = function () {
                window.location.href = "myhome.html";
            }
            $scope.login = function () {
                loginAPIService.loginInfo($scope.user).success(function (data) {
                    console.info(data);
                    if (data[0].flag) {
                        $scope.loginShow = true;
                        $scope.islogining = true;

                        $scope.username = data[0].userName;
                    } else {
                        alert("�˻����û������");
                    }
                });
            }

            $scope.logout = function () {
                loginAPIService.logout().success(function (data) {
                    if (data[0].flag) {
                        $scope.islogining = false;
                        window.location.href = "index.html#index";
                    }
                });
            }

            $scope.searchByKey = function () {
                loginAPIService.islogin().success(function (data) {
                    if (data[0].flag) {
                        $scope.forSearch = true;
                        var key = $scope.searchContent;
                        if (key == "") {
                            $scope.forSearch = false;
                        } else {
                            $timeout(function () {
                                searchAPIService.post({ flag: "search", key: key }, {}, function (data) {
                                    $scope.searchLists = data[0].search[0];
                                });
                            }, 380)
                        }
                    }
                });
            }
            $scope.tasklink = function (id) {
                $cookieStore.put("playtaskid", id);
                location.href = "player.html";
            }
        }
    }
});
