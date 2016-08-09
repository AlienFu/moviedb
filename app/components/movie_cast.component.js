MovieDBApp.component("movieCast", {
    templateUrl: 'templates/movie_cast.html',
    controller: TMDB.Controllers.MovieCast,
    bindings: {
        'movieId': '<',
        movie_credits: '<'

    }


});
