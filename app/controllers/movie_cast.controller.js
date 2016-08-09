var TMDB = TMDB || {};
TMDB.Controllers = TMDB.Controllers || {};
TMDB.Controllers.MovieCast = function(MovieDB) {
    var ctrl = this;
    console.log('movieId', this.movieId);
    var current_selected = '';
    var cast_members = [];

    function updateMovieCredits(data) {
        ctrl.cast = data.cast;
    }

    ctrl.selectedCastPhoto = function(width) {
        if (current_selected) {
            return MovieDB.posterPath(current_selected.member.profile_path, width);
        }
    };
    ctrl.profilePhotoPath = function(path, width) {
        if (path) {
            return MovieDB.posterPath(path, width);
        }

    };
    ctrl.addCast = function(castCtrl) {
        cast_members.push(castCtrl);
        castCtrl.selected = false;
        if (!current_selected) {
            ctrl.selectCast(castCtrl);
        }
    };
    ctrl.selectCast = function(castCtrl) {
        if (current_selected) {
            current_selected.selected = false;
        }
        current_selected = castCtrl;
        current_selected.selected = true;
        ctrl.selected_member_photo = current_selected.profile_photo;
    };

    MovieDB.api.movieCredits({
        id: ctrl.movieId
    }, updateMovieCredits);
};
