var app = angular.module('share.note.service', ['ngResource']);
app.service('noteAPIService', function ($resource, $http, baseUrlService) {
    var baseurl = baseUrlService.get();
    return $resource(baseurl + "ashx/NoteHandler.ashx",
        {},
        {
            //get: { method: "GET", params: { flag: "", id: "" }, cache: true, withCredentials: true, isArray: true },
            saves: { method: "POST", params: { flag: "", id: "" }, cache: true, withCredentials: true, isArray: true },
            post:
                {
                    method: "POST",
                    params: {},
                    headers: {
                        "X-Requested-With": "XMLHttpRequest",
                        "content-type": "application/x-www-form-urlencoded;charset=UTF-8"
                    },
                    cache: true,
                    withCredentials: true,
                    isArray: true,
                    transformRequest: function (obj) {
                        var str = [];
                        for (var p in obj) {
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        }
                        return str.join("&");
                        //return $.param(obj);
                    }
                }
             }
        );


    //    var API = {};
    //    API.saveNote = function (note) {
    //        return $http({
    //            method: 'POST',
    //            headers: { "X-Requested-With": "XMLHttpRequest" },
    //            url: 'ashx/NoteHandler.ashx',
    //            params: {
    //                flag: "note"
    //            },
    //            data: note,
    //            withCredentials: true
    //        });

    //    }
    //    API.getnote = function () {
    //        return $http({
    //            method: 'POST',
    //            headers: { "X-Requested-With": "XMLHttpRequest" },
    //            url: 'ashx/NoteHandler.ashx',
    //            params: {
    //                flag: "getnote"
    //            },
    //            withCredentials: true
    //        });
    //    }


    //    return API;

});

