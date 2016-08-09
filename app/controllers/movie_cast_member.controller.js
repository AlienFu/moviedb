var TMDB = TMDB || {};
TMDB.Controllers = TMDB.Controllers || {};
TMDB.Controllers.MovieCastMember = function(MovieDB) {
    var ctrl = this;
    ctrl.selected = false;
    ctrl.profilePhotoPath = function(width) {
        return MovieDB.posterPath(ctrl.member.profile_path, width);
    };
    this.$onInit = function() {
        ctrl.castCtrl.addCast(ctrl);
    };
    ctrl.select = function() {
        ctrl.castCtrl.selectCast(ctrl);

    };
};
