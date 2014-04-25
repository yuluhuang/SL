var app = angular.module('share.imageonload.directives', []);

app.directive('imageonload', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('load', function () {
                alert('image is loaded');
            });
        }
    };
});

