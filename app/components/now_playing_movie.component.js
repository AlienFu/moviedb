MovieDBApp.component("nowPlayingMovie", {
    templateUrl: 'templates/now_playing_movie.html',
    controller: TMDB.Controllers.NowPlayingMovie,
    bindings: {
        movie: '<',
    },
    require: {
        nowPlayingCtrl: '^nowPlaying'
    },



});
