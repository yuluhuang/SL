var app = angular.module('share.player.service', ['ngResource']);
app.service('playerAPIService', function ($http, $resource, baseUrlService) {
    var baseurl = baseUrlService.get();
    return $resource(baseurl + "ashx/playerHandler.ashx",
    {},
    {
        //get: { method: "GET", params: { flag: "", id: "" }, cache: true, withCredentials: true, isArray: true },
        //save: { method: "POST", params: { flag: "", id: "" }, cache: true, withCredentials: true },
        post: { method: "POST", params: { flag: "", id: "" }, cache: true, withCredentials: true, isArray: true }
    }
    );
});
