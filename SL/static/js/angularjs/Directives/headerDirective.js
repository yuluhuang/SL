var shareDirectives = angular.module('share.header.directives', ['ngCookies']);
shareDirectives.directive("headerD", function ($timeout,baseService, $location, $cookieStore) {
    return {
        restrict: 'A',
        templateUrl: '/static/js/angularjs/Directives/headerD.html',
        link: function ($scope, $element, $attrs) {
            console.info("ddd", location.href);
            $scope.islogining = false;
            $scope.forSearch = false;
            baseService.post({flag:"islogin"},{},function(response){
                console.info(response[0].code);
                if (response[0].code) {
                    $scope.islogining = true;
                    $scope.username = response[0].username;
                }
                else {
                    console.info("ddd", $location.path());
                    //if ($location.path() != "/login" && $location.path() != "/index" && $location.path() != "/" && $location.path() != "/fastregister" && location.href.slice(-10) != "index.html" && location.href != "http://www.yuluhuang.com/") {
                    if ($location.path() != "/login" && $location.path() != "/index" ) {
                        alert("qqqlogin");
                        $scope.islogining = false;
                        $scope.username = "";
                    }
                }
            })

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
                var user=$scope.user;
                baseService.post({flag:"login"},user,function(response){
                     console.info(response);
                     if (response[0].code) {
                        $scope.loginShow = true;
                        $scope.islogining = true;

                        $scope.username = response[0].user[0].name;
                    } else {
                        alert("error");
                    }
                });

            }

            $scope.logout = function () {
             baseService.post({flag:"logout"},{},function(response){
                     console.info(response);
                     if (response[0].code) {
                        $scope.islogining = false;
                        window.location.href = "/loginhtml/";
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
