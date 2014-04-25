var app = angular.module('share.myinfo.service', ['ngResource']);
app.service('myInfoAPIService', function ($http, $resource, baseUrlService) {
    var baseurl = baseUrlService.get();
    return $resource(baseurl + "ashx/MyInfoHandler.ashx",
    {},
    {
        //get: { method: "GET", params: { flag: "", id: "" }, cache: true, withCredentials: true, isArray: true },
        //save: { method: "POST", params: { flag: "", id: "" }, cache: true, withCredentials: true},
        post: { method: "POST", params: { flag: "", id: "" }, cache: true, withCredentials: true, isArray: true }
    }
    );
});
