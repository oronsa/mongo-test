

(function() {

var app=angular.module('logInF',[]);
app.directive('logInF', function(){
    return {
        restrict: 'E',
        templateUrl: "../views/log-in-f.html"
    };
    });
    var app2=angular.module('logInW',[]);
    app2.directive('logInW', function(){
        return {
            restrict: 'E',
            templateUrl: "../views/log-in-w.html"
        };
    });
})();
