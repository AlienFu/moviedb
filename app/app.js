MovieDBApp = angular.module('MovieDBApp', ['ngResource', 'ngRoute']);
MovieDBApp.config(["MovieDBProvider", "$routeProvider", function(MovieP, $routeProvider) {
    MovieP.setApiKey("8982a1d4df3385e9d5ba67d808fc59dc");

    $routeProvider.when("/movie/:id", {
        template: "<movie_info></movie_info>"
    });

}]);
