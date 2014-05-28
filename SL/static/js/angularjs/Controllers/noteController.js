var app = angular.module("share.note.controller", []);
app.controller("noteController", function ($scope, baseService) {
    $scope.note = {};
    $scope.saveNote = function () {
         baseService.post({flag:"islogin"},{},function(response){
            if (response[0].code) {
                $scope.note.content = encodeURIComponent(nicEditors.findEditor('areacontent').getContent());
                $scope.note.tag = "111";
                $scope.note.time = (new Date()).getTime();

                var note = $scope.note;
                baseService.post({ flag: "note" }, note, function (response) {
                    console.info("11", response);
                    if (response[0].flag) {
                        alert("success");
                    }
                });

            }
        });
    }
});
