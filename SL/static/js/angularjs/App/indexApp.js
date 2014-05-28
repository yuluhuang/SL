var app = angular.module("indexApp", ['share.header.directives', 'share.login.service', 'baseurl.service', 'share.footer.directives',
'share.metroB.directives', 'share.metroA.directives', 'share.metroC.directives', 'ngRoute', 'ngSanitize']);

app.config(function ($routeProvider) {
    $routeProvider.when("/", {
        controller: "indexShowCtrl",
        templateUrl: "indexShow.html"
    });
    $routeProvider.when("/note/:noteid", {
        controller: "noteShowCtrl",
        templateUrl: "noteShowCtrl.html"
    });
   
});


app.controller('indexShowCtrl', function ($scope, $location, ylhService) {
    ylhService.post({ flag: "noteSearch" }, function (response) {
        console.info("111", response);
        if (response[0] && response[0].noteSearch) {
            var aa = response[0].noteSearch[0].notes;
            angular.forEach(aa, function (v, k) {
                v.noteContent = decodeURIComponent(v.noteContent);
            });
            $scope.notes = aa;
        }
    });


    $scope.showNote = function (note) {
        console.info(note);
        $location.path("note/" + note.noteID);
        $scope.blog = note;
    }
});


app.controller('noteShowCtrl', function ($scope, $location, ylhService, $routeParams) {
    var noteid = $routeParams.noteid;
    console.info("noteid=", noteid);
    ylhService.post({ flag: "noteSearch" }, function (response) {
        console.info("111", response);
        if (response[0] && response[0].noteSearch) {
            var notes = response[0].noteSearch[0].notes;
            angular.forEach(notes, function (v, k) {
                if (v.noteID == noteid) {
                    v.noteContent = decodeURIComponent(v.noteContent);
                    console.info(v.noteContent);
                    $scope.myblog = v;
                }
            });
        }
    });
    $scope.backIndex = function () {
        $location.path("/");
    }
});