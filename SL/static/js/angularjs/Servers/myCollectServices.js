var app = angular.module('share.mycollect.service', ['ngResource']);
app.service('myCollectAPIService', function ($http, $resource, baseUrlService) {
    var baseurl = baseUrlService.get();
    return $resource(baseurl + "/:collect/",
    {},
    {
        post: { method: "POST", params: {}, cache: true, withCredentials: true, isArray: true }
    }
    );
});
