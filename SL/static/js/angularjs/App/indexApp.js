var app = angular.module("indexApp", ['share.header.directives',  'base.service', 'share.footer.directives',
 'ngRoute', 'ngSanitize','ngCookies','ngResource']);

app.config(function ($routeProvider) {
    $routeProvider.when("/", {
        controller: "indexShowCtrl",
        templateUrl: "/static/indexShow.html"
    });
    $routeProvider.when("/note/:noteid", {
        controller: "noteShowCtrl",
        templateUrl: "/static/noteShowCtrl.html"
    });
   
});


app.controller('indexShowCtrl', function ($scope, $location, baseService) {
    baseService.post({ flag: "noteSearchByUsername" },{},function (response) {
        console.info("111", response);
        if (response[0] && response[0].code) {
            var aa = response[0].notes;
            /*angular.forEach(aa, function (v, k) {
            console.info(v.fields.noteContent);
                v.fields.noteContent = decodeURIComponent(v.fields.noteContent);
            });*/
            $scope.notes = aa;
        }
    });


    $scope.showNote = function (note) {
        console.info(note);
        $location.path("note/" + note.pk);
        $scope.blog = note;
    }


});


app.controller('noteShowCtrl', function ($scope, $location, baseService, $routeParams) {
    $scope.note={};
    $scope.note.id = $routeParams.noteid;
    var note=$scope.note;
    baseService.post({ flag: "noteSearchByNoteId" },note, function (response) {
        console.info("111", response);
        if (response[0] && response[0].code) {
            n = response[0].note[0].fields;
            n.noteContent = decodeURIComponent(n.noteContent);
            $scope.myblog = n;
        }
    });
    $scope.backIndex = function () {
        $location.path("/");
    }
});