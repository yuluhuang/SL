var app = angular.module('share.filter', []);
app.filter("imgpath", function () {
    var userInfoFilter = function (input) {
            return "uploads/z/min_" + input.substring(10);
    };
    return userInfoFilter;
});

app.filter("unescape", function () {
    var userInfoFilter = function (input) {
    //console.log(input);
            return eval("'"+input+"'")
    };
    return userInfoFilter;
});
