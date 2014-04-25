var app = angular.module("share.myNote.controller", ['ngSanitize']);
app.controller("myNoteController", function ($scope, noteAPIService, loginAPIService) {
    $scope.notes = [];
    loginAPIService.islogin().success(function (data) {
        if (data[0].flag) {
            noteAPIService.post({ flag: "getnote" }, {}, function (response) {
                if (response[0] && typeof (response[0].flag) === "undefined") {
                    var aa = response[0].notes;
                    console.info(aa);
                    angular.forEach(aa, function (v, k) {
                        v.noteContent = decodeURIComponent(v.noteContent);
                    });
                    $scope.notes = aa;
                    console.info($scope.notes);
                } else {
                    alert("error");
                }
            });
        }
    });

    $scope.selectNote = function (id) {
        angular.forEach($scope.notes, function (v, k) {
            if (v.noteID == id) {
                $scope.noteContent = v.noteContent;
            }
        });
    }

    $scope.deleteNote = function (id) {
        loginAPIService.islogin().success(function (data) {
            if (data[0].flag && data[0].power >= 2) {
                if (confirm('你确定要删除吗')) {
                    angular.forEach($scope.notes, function (v, k) {
                        if (v.noteID == id) {
                            $scope.notes.splice(k, 1);
                            $scope.noteContent = "";
                            noteAPIService.post({ flag: "delnote", id: id }, {}, function (response) {
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
            } else {
                if (data[0].flag) {
                    alert("login");
                    window.location.href = "login.html";
                } else {
                    alert("权限不足");
                }
            }
        });
    }
});
