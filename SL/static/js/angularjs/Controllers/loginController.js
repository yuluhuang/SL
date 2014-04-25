var app = angular.module("share.login.controller", []);
app.controller('loginController', function ($http,$scope, searchAPIService) {

    //登录
    $scope.loginClick = function () {
    var user=$scope.user;
    //console.info(user);

    /*var loginService=new searchAPIService(user);
    loginService.$post({login:"login"},{},function(data){
            console.info('qqqq',data[0].user);

        });*/

       searchAPIService.post({login:"login"},user,function(data){
       console.info(data);

       });
    }
});