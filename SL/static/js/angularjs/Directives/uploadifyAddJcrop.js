var app = angular.module('share.uploadifyAddJcrop.directives', []);
app.directive("uploadifyAddJcrop", function () {
    return {
        restrict: 'AE',
        controller: function ($scope, baseUrlService) {
            var baseurl = baseUrlService.get();
            //var _uploadify = document.getElementById("uploadify");
            $("#uploadify").uploadify({
                'auto': false,
                'swf': 'js/uploadify/uploadify.swf', //上传所需的flash文件
                'uploader': 'ashx/upload_img.ashx', //后台处理文件
                'queueID': 'fileQueue',
                'queueSizeLimit': 1, //限制每次选择文件的个数
                'multi': false, //是否多选
                'fileSizeLimit': '5MB',
                'fileTypeExts': '*.gif; *.jpg; *.png',
                'uploadLimit': 0, //上传次数默认999
                'formData': {}, //占个坑
                'height': '36',
                'successTimeout': 5,
                'onUploadStart': function (file) {
                    $("#uploadify").uploadify("settings", "formData", {}, false);
                },
                'onUploadSuccess': function (file, data, response) {
                    var x = $.trim(data); // +"?" + new Date().getTime();
                    if (jcrop_api) jcrop_api.destroy();
                    console.info(x);

                    $("#img_personal").removeAttr("src").attr("src", x);
                    $("#crop_preview").removeAttr("src").attr("src", x);
                    $("#crop_preview1").removeAttr("src").attr("src", x);
                    $("#crop_preview2").removeAttr("src").attr("src", x);
                    $("#filepath").val(x);

                    // var img_personal = document.getElementById("img_personal");
                    $("#img_personal").Jcrop({
                        onChange: showPreview,
                        onSelect: showPreview,
                        aspectRatio: 1
                    }, function () {
                        jcrop_api = this;
                    });
                }
            });


            var jcrop_api = null;
            //  $(document).ready(function () {
            //记得放在jQuery(window).load(...)内调用，否则Jcrop无法正确初始化
            $("#img_personal").Jcrop({
                onChange: showPreview, //选框改变时的事件
                onSelect: showPreview, //选框选定时的事件
                aspectRatio: 1 //选框宽高比。说明：width/height
            }, function () {
                //console.log("111",this);
                jcrop_api = this;
            });
            // });
            //简单的事件处理程序，响应自onChange,onSelect事件，按照上面的Jcrop调用
            function showPreview(coords) {
                $("#x").val(coords.x);
                $("#y").val(coords.y);
                $("#w").val(coords.w);
                $("#h").val(coords.h);

                if (parseInt(coords.w) > 0) {
                    $("crop_submit").removeAttr("disabled");
                    //计算预览区域图片缩放的比例，通过计算显示区域的宽度(与高度)与剪裁的宽度(与高度)之比得到
                    var rx = $("#preview_box").width() / coords.w;
                    var ry = $("#preview_box").height() / coords.h;

                    //通过比例值控制图片的样式与显示
                    $("#crop_preview").css({
                        width: Math.round(rx * $("#img_personal").width()) + "px", //预览图片宽度为计算比例值与原图片宽度的乘积
                        height: Math.round(rx * $("#img_personal").height()) + "px", //预览图片高度为计算比例值与原图片高度的乘积
                        marginLeft: "-" + Math.round(rx * coords.x) + "px",
                        marginTop: "-" + Math.round(ry * coords.y) + "px"
                    });
                    //计算预览区域图片缩放的比例，通过计算显示区域的宽度(与高度)与剪裁的宽度(与高度)之比得到
                    var rx = $("#preview_box1").width() / coords.w;
                    var ry = $("#preview_box1").height() / coords.h;
                    console.log($("#preview_box1").width(), rx);
                    //通过比例值控制图片的样式与显示
                    $("#crop_preview1").css({
                        width: Math.round(rx * $("#img_personal").width()) + "px", //预览图片宽度为计算比例值与原图片宽度的乘积
                        height: Math.round(rx * $("#img_personal").height()) + "px", //预览图片高度为计算比例值与原图片高度的乘积
                        marginLeft: "-" + Math.round(rx * coords.x) + "px",
                        marginTop: "-" + Math.round(ry * coords.y) + "px"
                    });
                    //计算预览区域图片缩放的比例，通过计算显示区域的宽度(与高度)与剪裁的宽度(与高度)之比得到
                    var rx = $("#preview_box2").width() / coords.w;
                    var ry = $("#preview_box2").height() / coords.h;
                    //通过比例值控制图片的样式与显示
                    $("#crop_preview2").css({
                        width: Math.round(rx * $("#img_personal").width()) + "px", //预览图片宽度为计算比例值与原图片宽度的乘积
                        height: Math.round(rx * $("#img_personal").height()) + "px", //预览图片高度为计算比例值与原图片高度的乘积
                        marginLeft: "-" + Math.round(rx * coords.x) + "px",
                        marginTop: "-" + Math.round(ry * coords.y) + "px"
                    });
                }
            }
        },
        templateUrl: '/static/js/angularjs/Directives/uploadifyAddJcrop.html',
        scope: {
    },
    link: function ($scope, $element, $attrs) {
    }
};
});


