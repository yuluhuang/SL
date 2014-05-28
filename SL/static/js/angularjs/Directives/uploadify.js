var app = angular.module('share.uploadify.directives', []);
app.directive("uploadify", function () {
    return {
        restrict: 'AE',
        controller: function ($scope, baseUrlService, $cookieStore) {
            var baseurl = baseUrlService.get();
            var id = $cookieStore.get("taskid"); // $cookies.taskid;
            //console.info(id);
            $("#uploadify").uploadify({
                'auto': false,
                'swf': 'js/uploadify/uploadify.swf', //上传所需的flash文件
                'uploader': 'ashx/upload.ashx', //后台处理文件
                'queueID': 'fileQueue',
                'queueSizeLimit': 8, //限制每次选择文件的个数
                'multi': true, //是否多选
                'fileSizeLimit': '80MB',
                'uploadLimit': 0, //上传文件最大数量
                'formData': { 'id': id }, //占个坑
                'height': '36',
                'successTimeout': 5,
                'onUploadStart': function (file) {
                    $("#uploadify").uploadify("settings", "formData", { "id": id }, false); //将id_zuop传到后台
                },
                'onUploadSuccess': function (file, data, response) {
                }
            });
        },
        templateUrl: './angularjs/Directives/uploadify.html',
        scope: {
    },
    link: function ($scope, $element, $attrs) {
    }
};
});


