var shareDirectives = angular.module('share.login.directives', []);
shareDirectives.directive("loginD",function(baseService){
    return {
        restrict: 'A',
        controller:'loginController',
        templateUrl: '/static/js/angularjs/Directives/loginD.html',
        link:function($scope, $element, $attrs){
        //登录
        $scope.loginClick = function () {
          var user=$scope.user;
          baseService.post({flag:"login"},user,function(response){
                     console.info(response);
                     if (response[0].code) {
                       window.location.href = "/index/";
                    } else {
                        alert("error");
                    }
                });
            }
        }
    };
});
