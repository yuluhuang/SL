var app = angular.module('share.metroA.directives', []);
app.directive("metroA", function () {
    return {
        restrict: 'A',
        //controller: 'registerController',
        templateUrl: './angularjs/Directives/metroA.html',
        link: function ($scope, $element, $attrs) {
           
        }
    };
});
