var app = angular.module('share.mycollect.service', ['ngResource']);
app.service('myCollectAPIService', function ($http, $resource, baseUrlService) {
    var baseurl = baseUrlService.get();
    return $resource(baseurl + "ashx/MyCollectHandler.ashx",
    {},
    {
        post: { method: "POST", params: { flag: "", id: "" }, cache: true, withCredentials: true, isArray: true }
    }
    );
});
