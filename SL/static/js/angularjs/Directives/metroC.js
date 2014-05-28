var app = angular.module('share.metroC.directives', []);
app.directive("metroC", function () {
    return {
        restrict: 'A',
        //controller: 'registerController',
        templateUrl: './angularjs/Directives/metroC.html',
        link: function ($scope, $element, $attrs) {
           
        }
    };
});
