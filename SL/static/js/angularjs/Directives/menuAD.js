var shareDirective = angular.module("share.menu.directive", []);
shareDirective.directive('menu', function () {
    return {
        restrict: "A",
        templateUrl: '/static/js/angularjs/Directives/menuAD.html',
        controller: function ($scope, $location) {
            $scope.mylinks = [
            { name: "我的小窝", link: "myhome.html#myhome", active: true, path: "/myhome" },
            { name: "我的收藏", link: "mycollect.html#mycollect", active: false, path: "/mycollect" },
            { name: "我的消息", link: "myinfos.html#myinfos", active: false, path: "/myinfos" },
            { name: "我的资料", link: "mydetails.html#mydetails", active: false, path: "/mydetails" }
            ];
            var aa = $location.path();
            console.info("aaa", aa);
            angular.forEach($scope.mylinks, function (v, k) {
                v.active = false;
                if (( v.path) == aa) {
                    v.active = true;
                }
            });
        }
    };
});
