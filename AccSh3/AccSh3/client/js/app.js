/**
 * Created by oron sason on 21/04/2016.
 */
(function() {

    var app=angular.module('choose',['logInW','logInF']);

    app.directive('choose', function() {
        return {
            restrict: 'E',
            templateUrl: "../views/choose.html",
            controller: function () {
                this.tab=1;
                this.isSet = function (checkTab) {
                    return this.tab === checkTab;
                };
                this.setTab = function (activeTab) {
                    this.tab = activeTab;
                };
            },
            controllerAs: "tab"
        };

    });
})();
