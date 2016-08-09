MovieDBApp.component("movieInfo", {
    restrict: 'E',
    templateUrl: 'templates/movie_info.html',
    controller: TMDB.Controllers.MovieInfo,
    bindings: {
        'movieId': '<'


    }


});
