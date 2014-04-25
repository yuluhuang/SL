var app = angular.module('share.mydetails.service', ['ngResource']);
app.service('myDetailsAPIService', function ($http, $resource, baseUrlService) {
    var baseurl = baseUrlService.get();
   return $resource(baseurl + "/:detail/",
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
