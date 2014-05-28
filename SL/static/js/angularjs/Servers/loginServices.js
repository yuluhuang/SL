var app = angular.module('share.login.service', ['ngResource']);
app.service('searchAPIService', function ($resource, $http, baseUrlService) {
    var baseurl = baseUrlService.get();
    return $resource(baseurl + "ashx/LoginHandler.ashx",
        {},
        {
            post: { method: "POST", params: { flag: "", id: "" }, cache: true, withCredentials: true, isArray: true }
        }
        );
});



app.service('loginAPIService', function ($http, baseUrlService) {
    var baseurl = baseUrlService.get();
    var loginAPI = {};


    loginAPI.logout = function () {
        return $http({
            method: 'POST',
            headers: { "X-Requested-With": "XMLHttpRequest" },
            url: baseurl + 'ashx/LoginHandler.ashx',
            params: {
                flag: "logout"
            },
            withCredentials: true
        });
    }
    return loginAPI;
});

