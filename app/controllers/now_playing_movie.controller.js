var TMDB = TMDB || {};
TMDB.Controllers = TMDB.Controllers || {};
TMDB.Controllers.NowPlayingMovie = function(MovieDB) {
    var ctrl = this;
    ctrl.selected = false;
    ctrl.posterPath = function(width) {
        return MovieDB.posterPath(ctrl.movie.poster_path, width);
    };
    this.$onInit = function() {
        ctrl.nowPlayingCtrl.addMovie(ctrl);
    };
    ctrl.select = function() {
        ctrl.nowPlayingCtrl.selectMovie(ctrl);

    };
};
