var app = angular.module('share.register.service', []);
app.service('registerAPIService', function ($http, baseUrlService) {
    var baseurl = baseUrlService.get();
    var registerAPI = {};
    registerAPI.registerInfo = function (user) {
        return $http({
            method: 'POST',
            url: baseurl + 'ashx/LoginHandler.ashx',
            params: {
                flag: "register",
                username: user.username,
                password: user.password,
                email: user.email
            }
        });
    }
    return registerAPI;
});