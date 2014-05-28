var app = angular.module('baseurl.service', []);
app.service('baseUrlService', function () {
    this.get=function(){
        var baseurl = "";
        return  baseurl;
    }
});


app.service('ylhService', function ($resource, $http, baseUrlService) {
    var baseurl = baseUrlService.get();
    return $resource(baseurl + "ashx/SearchHandler.ashx",
        {},
        {
            post:
                {
                    method: "POST",
                    params: {},
                    headers: {
                        "X-Requested-With": "XMLHttpRequest",
                        "content-type": "application/x-www-form-urlencoded;charset=UTF-8"
                    },
                    cache: true,
                    withCredentials: true,
                    isArray: true,
                    transformRequest: function (obj) {
                        var str = [];
                        for (var p in obj) {
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        }
                        return str.join("&");
                        //return $.param(obj);
                    }
                }
        }
     );
});