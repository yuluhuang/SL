var app = angular.module("showTelApp", ['ngResource','base.service','share.filter']);


app.controller('showTelController', function ($scope,baseService,$timeout) {

//splice

    $scope.spliceClick=function(){
      baseService.post({ flag: "splice" },{},
          function (response) {
                console.info("111", response);

          },
          function(data){
             //失败后重新发请求
             console.info("222", data);
             if(data.status!=="200"){
                console.info("aa");
                $timeout(function(){
                  $scope.spliceClick();
                },1)

            }
          });
    }

    $scope.start=function(){
         baseService.post({flag:"showTel"},{},function(response){
                    //console.log(response[0].tel);
                   //angular.forEach(response[0].tel,function(v,k){

                       //var a=unescape(v.fields.telName);
                        //console.log(a);

                    //});
                    //console.log(response[0].tel);
                    $scope.tels=response[0].tel;


            });
         }


    $scope.proxy1Click=function(){
             baseService.post({flag:"spiderIp"},{},function(response){
                console.log(response);



        });
    }
});

