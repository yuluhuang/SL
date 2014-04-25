var app = angular.module("share.note.controller", []);
app.controller("noteController", function ($scope, noteAPIService, loginAPIService) {
    $scope.note = {};
    $scope.saveNote = function () {
        loginAPIService.islogin().success(function (data) {
            if (data[0].flag) {
                $scope.note.content = encodeURIComponent(nicEditors.findEditor('areacontent').getContent());
                $scope.note.tag = "111";
                $scope.note.time = (new Date()).getTime();
                console.info($scope.note.content);
                //                noteAPIService.saveNote($scope.note).success(function (date) {
                //                });


                var savenote = new noteAPIService($scope.note);
                savenote.$saves({ flag: "note" }, function (response) {
                    console.info(response);
                    if (response[0].flag) {
                        alert("success");
                        console.info(response);
                    } else {
                        alert("error");
                    }
                });
            }
        });
    }
});
