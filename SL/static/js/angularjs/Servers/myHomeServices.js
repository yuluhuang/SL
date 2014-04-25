var app = angular.module('share.myhome.service', ['ngResource']);
app.service('myHomeAPIService', function ($http, $resource, baseUrlService) {
    var baseurl = baseUrlService.get();
    return $resource(baseurl + "ashx/MyHomeHandler.ashx",
    {},
    {
        // get: { method: "GET", params: { flag: "", id: "" }, cache: true, withCredentials: true },
        post: { method: "POST", params: { flag: "", id: "" }, cache: true, withCredentials: true, isArray: true }
    }
    );
});
