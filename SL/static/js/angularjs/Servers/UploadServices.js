var app = angular.module('share.upload.service', ['ngResource']);
app.service('uploadAPIService', function ($http, $resource, baseUrlService) {
    var baseurl = baseUrlService.get();
    return $resource(baseurl + "ashx/uploadHandler.ashx",
    {},
    {
        //get: { method: "GET", params: { flag: "", id: "" }, cache: true, withCredentials: true, isArray: true },
        //save: { method: "POST", params: { flag: "", id: "" }, cache: true, withCredentials: true },
        post: { method: "POST", params: { flag: "", id: "" }, cache: true, withCredentials: true, isArray: true }
    }
    );
});
