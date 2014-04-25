var app = angular.module('share.manage.service', ['ngResource']);
app.service('manageAPIService', function ($resource, $http, baseUrlService) {
    var baseurl = baseUrlService.get();
        return $resource(baseurl+"ashx/manageHandler.ashx",
        {},
        {
            //get: { method: "GET", params: { flag: "", id: "" }, cache: true, withCredentials: true, isArray: true },
           // saves: { method: "POST", params: { flag: "", id: "" },cache: true, withCredentials: true },
            post: { method: "POST", params: { flag: "", id: "" },cache: true, withCredentials: true, isArray: true }
        }
        );


});

