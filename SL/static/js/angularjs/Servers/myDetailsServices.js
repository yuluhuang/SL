var app = angular.module('share.mydetails.service', ['ngResource']);
app.service('myDetailsAPIService', function ($http, $resource, baseUrlService) {
    var baseurl = baseUrlService.get();
    return $resource(baseurl + "ashx/MyDetailsHandler.ashx",
    {},
    {
        //get: { method: "GET", params: { flag: "", id: "" }, cache: true, withCredentials: true, isArray: true },
        //save: { method: "POST", params: { flag: "", id: "" }, cache: true, withCredentials: true},
        post: { method: "POST", params: { flag: "", id: "" }, cache: true, withCredentials: true, isArray: true }
    }
    );
});
