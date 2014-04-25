var app = angular.module('share.ublue.directives', []);
app.directive("ublue", function () {
    return {
        restrict: 'A',
        controller: function ($scope) {
            $scope.images = "[{\"oldName\":\"[天使动漫]和服壁纸112.jpg\",\"path2\":\"uploads/z/2c4286bd0b224fe29e066b1d97529a89.jpg\"}]";
            console.log("sss",$scope.images);
        },
        template: '<div class="focusMain isFocus demoG"><a class="focusBtn focusPrev" href="javascript:;"></a><a class="focusBtn focusNext"href="javascript:;"></a><div class="focusArea"><div class="focusCon" ><h3>{{images}}</h3><div class="focusItem" ng-repeat="image in images"><h4 class="title"><a>{{image.oldName}}</a></h4><a><img ng-src="{{image.path2}}" alt="" /></a></div></div></div><div class="focusIndicators" > <a href="javascript:;" ng-repeat="image in images"><img ng-src="{{image.path2}}" alt="" /></a> </div></div>',
        scope: {
            'images': '@image'
        },
        link: function ($scope, $element, $attrs) {
        }
    };
});
angular.bootstrap(document, ['share.ublue.directives']);
