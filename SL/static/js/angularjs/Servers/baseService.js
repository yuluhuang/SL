var app = angular.module('base.service', []);
app.service('baseService', function ($resource, $http) {
    return $resource("/:flag/",
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