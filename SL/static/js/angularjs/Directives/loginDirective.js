var shareDirectives = angular.module('share.login.directives', []);
shareDirectives.directive("loginD",function(loginAPIService){
    return {
        restrict: 'A',
        controller:'loginController',
        templateUrl: '/static/js/angularjs/Directives/loginD.html',
        link:function($scope, $element, $attrs){
        }
    };
});
