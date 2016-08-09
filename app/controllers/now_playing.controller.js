var TMDB = TMDB || {};
TMDB.Controllers = TMDB.Controllers || {};
TMDB.Controllers.NowPlaying = function(MovieDB, $location) {

    var ctrl = this;
    var config = null;
    var movies = [];
    var current_selected = null;

    function updateGenreInfo(data) {
        ctrl.now_playing = data.results;
    }
    ctrl.addMovie = function(castCtrl) {
        movies.push(castCtrl);
        castCtrl.selected = false;
        if (!current_selected) {
            ctrl.selectMovie(castCtrl);
        }
    };
    ctrl.selectMovie = function(castCtrl) {
        if (current_selected) {
            current_selected.selected = false;
        }
        current_selected = castCtrl;
        current_selected.selected = true;
        $location.path("/movie/" + castCtrl.movie.id);
    };
    ctrl.posterPath = function(path, width) {
        if (path) {
            return MovieDB.posterPath(path, width);
        }
    };
    ctrl.$onInit = function() {

        MovieDB.api.now_playing({}, updateGenreInfo);
    };
};
