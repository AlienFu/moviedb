var TMDB = TMDB || {};
TMDB.Controllers = TMDB.Controllers || {};
TMDB.Controllers.MovieInfo = function(MovieDB, $routeParams) {
    var ctrl = this;
    var config = null;
    var movie_info = {};
    var movie_credits = {};
    var poster_widths = [];

    var id = ctrl.movie_id || $routeParams.id;

    function updateMovieInfo(data) {
        ctrl.movie_info = data;
    }

    function updateMovieCredits(data) {
        ctrl.movie_credits = data;
    }

    ctrl.posterPath = function(width) {
        if (ctrl.movie_info) {
            return MovieDB.posterPath(ctrl.movie_info.poster_path, width);
        }

    };
    if (id) {
        MovieDB.api.movie({
            id: id
        }, updateMovieInfo);
        MovieDB.api.movieCredits({
            id: id
        }, updateMovieCredits);
    }
};
