var app = angular.module('share.createtheme.service', ['ngResource']);
app.service('createThemeService', function ($http, $resource, baseUrlService) {
    var baseurl = baseUrlService.get();
    return $resource(baseurl+"ashx/createThemeHandler.ashx",
    {},
    {
        //get: { method: "GET", params: { flag: "", id: "" }, cache: true, withCredentials: true, isArray: true },
        //save: { method: "POST", params: { flag: "", id: "" }, cache: true, withCredentials: true },
        post: { method: "POST", params: { flag: "", id: "" }, cache: true, withCredentials: true, isArray: true }
    }
    );
});
