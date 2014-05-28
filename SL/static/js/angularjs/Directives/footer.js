var app = angular.module('share.footer.directives', []);
app.directive("footerMenu", function () {
    return {
        restrict: 'AE',
        controller: function ($scope) {
        },
        templateUrl: '/static/js/angularjs/Directives/footer.html',
        scope: {
        },
        link: function ($scope, $element, $attrs) {
            var metroJs, appBar;
            // remove the default theme set for noscript and apply user theme
            $(document).ready(function () {
                $("body,.tiles").removeClass("dark blue");
                metroJs = jQuery.fn.metrojs;
                metroJs.theme.loadDefaultTheme();
            });

            $(document).ready(function () {
                var doBind = (typeof (window.bindAppBarKeyboard) === "undefined" || window.bindAppBarKeyboard);
                // create the app bar  foot
                appBar = $(".appbar").applicationBar({
                    applyTheme: false, // apply theme example below
                    preloadAltBaseTheme: true, // load both sets of images so there isn't a flicker when base theme is changed
                    metroLightUrl: 'img/image/3.jpeg',
                    metroDarkUrl: 'img/image/3.jpeg',
                    bindKeyboard: doBind // bind the keyboard unless specified in an included script
                });
                // add the accents and base colors to the appbar
                metroJs.theme.appendAccentColors();
                metroJs.theme.appendBaseThemes();
            });

        }
    };
});

