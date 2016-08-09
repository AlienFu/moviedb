MovieDBApp.component("movieCastMember", {
    templateUrl: 'templates/movie_cast_member.html',
    controller: TMDB.Controllers.MovieCastMember,
    bindings: {
        member: '<',
    },
    require: {
        castCtrl: '^movieCast'
    },



});
