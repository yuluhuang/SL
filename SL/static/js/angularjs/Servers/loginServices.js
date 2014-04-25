var app = angular.module('share.login.service', ['ngResource']);
app.service('searchAPIService', function ($resource, $http, baseUrlService) {
    var baseurl = baseUrlService.get();
    return $resource(baseurl + "/:login/",
        {},
        {
            post:
            { method: "POST", params: {},
            headers: {
             "X-Requested-With": "XMLHttpRequest" ,
            "content-type":"application/x-www-form-urlencoded;charset=UTF-8"
            },
            cache: true,
            withCredentials: true,
            isArray: true ,
            transformRequest:function(obj) {
                   var str = [];
                        for(var p in obj){
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                            }
                        return str.join("&");
                     //return $.param(obj);
             }
            },
            save:
            {
            method: "POST", params: {}, cache: true, withCredentials: true, isArray: false
            }
        }
        );
});



app.service('loginAPIService', function ($http, baseUrlService) {
    var baseurl = baseUrlService.get();
    var loginAPI = {};
    loginAPI.loginInfo = function (user) {
        return $http({
            method: 'POST',
            headers: { "X-Requested-With": "XMLHttpRequest" ,
            "content-type":"application/x-www-form-urlencoded"},
            url: baseurl + '/login/',
            params: {
            username:user.username,
            password:user.password
            },
            withCredentials: true
        });
    }
    loginAPI.islogin = function () {
        return $http({
            method: 'POST',
            headers: { "X-Requested-With": "XMLHttpRequest" },
            url: baseurl + '/islogin/',
            params: {
            },
            withCredentials: true
        });
    }

    loginAPI.logout = function () {
        return $http({
            method: 'POST',
            headers: { "X-Requested-With": "XMLHttpRequest" },
            url: baseurl + '/logout/',
            params: {
            },
            withCredentials: true
        });
    }
    return loginAPI;
});

