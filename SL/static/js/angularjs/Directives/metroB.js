var app = angular.module('share.metroB.directives', []);
app.directive("metroB", function () {
    return {
        restrict: 'A',
        //controller: 'registerController',
        templateUrl: './angularjs/Directives/metroB.html',
        link: function ($scope, $element, $attrs) {
           
        }
    };
});
