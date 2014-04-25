var app = angular.module('share.uploadTwo.controller', ['ngCookies']);
app.controller('uploadTwoController', function ($scope, $location, uploadAPIService, loginAPIService, $cookieStore, baseUrlService) {
   /// var baseurl = baseUrlService.get();

    //var id = $cookieStore.get("taskid"); // $cookies.taskid;
    //console.info("id", id);
    $scope.nextstep = function () {
        loginAPIService.islogin().success(function (data) {
            if (data[0].flag && data[0].power >= 2) {
                location.href = "upload_3.html";
                //console.info("qqq", $cookies.taskid);
            }
        });
    } 
});
