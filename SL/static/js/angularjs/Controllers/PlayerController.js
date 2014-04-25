var app = angular.module('share.player.controller', ['ngSanitize']);
app.controller('playerController', function ($scope, playerAPIService, loginAPIService, $cookieStore, baseUrlService, $sce) {
    $cookieStore.remove("editthemeid");
    $cookieStore.remove("taskid");
    var baseurl = baseUrlService.get();
    var id = $cookieStore.get("playtaskid")
    console.info(id);
    //如果是登录状态
    $scope.images = [];
    $scope.vedios = [];
    $scope.swf = [];
    $scope.pdf = [];
    loginAPIService.islogin().success(function (data) {
        console.info("aaa", data);
        if (data[0].flag) {
            playerAPIService.post({ flag: "getplayer", id: id }, {}, function (response) {
                if (response[0] && typeof (response[0].flag) === "undefined") {
                    var images = [];
                    var vedios = [];
                    var pdfs = [];
                    var swfs = [];
                    angular.forEach(response[0].items, function (v, k) {
                       v.remark = decodeURIComponent(v.remark);
                        if (v.category === "image") {
                            images.push(v);
                        } else if (v.category === "vedio") {
                            vedios.push(v);
                        } else if (v.category === "pdf") {
                            pdfs.push(v);
                        } else if (v.category === "swf") {
                            swfs.push(v);
                        }

                    });
                    var defaultimage = [{ path2: "./img/image/4.jpg"}];
                    if (images.length == 0) {
                        images.push(defaultimage[0]); //没图片设置一张默认图片
                    }
                    $scope.images = images;

                    angular.forEach($scope.images, function (v, k) {
                        v.active = false;
                        if (v && k == 0) {
                            v.active = true;
                        }
                    });
                    $scope.vedios = vedios;
                    $scope.swfs = swfs;
                    $scope.pdfs = pdfs;
                }
                console.info(response);
                //播放内容设置
                var playlist = "";
                var playlists = [];
                console.info("ssss", $scope.vedios);
                if ($scope.vedios != "") {
                    angular.forEach($scope.vedios, function (v, k) {
                        if ($scope.vedios.length - 1 != k) {
                            playlist = playlist + "{image: '', file:\'" + v.path2 + "\', title:\'" + v.oldName + "\'},";
                        }
                        else {
                            playlist = playlist + "{image: '', file:\'" + v.path2 + "\', title:\'" + v.oldName + "\'}";
                        }
                    });
                    playlists = eval("[(" + playlist + ")]"); //将 JSON 转换为 JavaScript 对象
                }
                //播放器设置
                $(function () {
                    jwplayer("container").setup({
                        playlist: playlists,
                        listbar: {
                            position: 'right',
                            size: 188
                        },
                        duration: 57,

                        flashplayer: "jwplayer/jwplayer.flash.swf",
                        volume: 80,
                        width: 960,
                        height: 400
                    });
                });
            });
        }

    });

    $scope.wendanurl = function (url) {
        $("#wendanswf").html("");
        $("#wendanswf").append('<div id="flashContent"/>');
        x_flashvars.SwfFile = escape(url);
        swfobject.embedSWF("Flash/FlexPaperViewer.swf", "flashContent", "642", "470", swfVersionStr, xiSwfUrlStr, x_flashvars, x_params, x_attributes);
        swfobject.createCSS("#flashContent", "display:block;text-align:left;");

    }

    $scope.pdfClick = function (url) {
        $scope.docpdf = baseurl + url;
        var aaaa = '<embed width="800" height="600" src="' + $scope.docpdf + '"></embed>';
        $scope.iframeHtml = $sce.trustAsHtml(aaaa);

    }
});

