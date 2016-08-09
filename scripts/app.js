MovieDBApp = angular.module('MovieDBApp', ['ngResource', 'ngRoute']);
MovieDBApp.config(["MovieDBProvider", "$routeProvider", function(MovieP, $routeProvider) {
    MovieP.setApiKey("8982a1d4df3385e9d5ba67d808fc59dc");

    $routeProvider.when("/movie/:id", {
        template: "<movie_info></movie_info>"
    });

}]);

MovieDBApp.factory("MovieApi", function($resource) {
    var base_url = "https://api.themoviedb.org/3";

    return function(default_params, transform_functions) {
        var actions = {
            collection: {
                url: base_url + '/collection/:id',
                cache: true
            },
            movie: {
                url: base_url + '/movie/:id',
                cache: true
            },
            movieCredits: {
                url: base_url + '/movie/:id/credits',
                cache: true
            },
            configuration: {
                url: base_url + '/configuration',
                cache: true
            },
            genre_movies: {
                url: base_url + '/genre/:id/movies',
                cache: true
            },
            now_playing: {
                url: base_url + '/movie/now_playing',
                cache: true
            }
        };

        angular.forEach(transform_functions, function(func, key) {
            if (actions[key]) {

                actions[key].transformResponse = func;
            }

        });


        return $resource(base_url, default_params, actions);

    };
});

MovieDBApp.controller('MainController', function MainController($scope, MovieDB) {


});
//http://api.themoviedb.org/3/configuration?api_key=8982a1d4df3385e9d5ba67d808fc59dc
//https://api.themoviedb.org/3/configuration?api_key=8982a1d4df3385e9d5ba67d808fc59dc

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


MovieDBApp.component("movieCast", {
    templateUrl: 'templates/movie_cast.html',
    controller: TMDB.Controllers.MovieCast,
    bindings: {
        'movieId': '<',
        movie_credits: '<'

    }


});

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

MovieDBApp.component("movieInfo", {
    restrict: 'E',
    templateUrl: 'templates/movie_info.html',
    controller: TMDB.Controllers.MovieInfo,
    bindings: {
        'movieId': '<'


    }


});

MovieDBApp.component("nowPlaying", {
    templateUrl: 'templates/now_playing.html',
    controller: TMDB.Controllers.NowPlaying,
    bindings: {}
});

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



MovieDBApp.filter("listBy", function() {

    return function(arr, key, delimiter, limit) {
        var return_string = "";
        var length = 0;

        if (!arr || !arr.length) {
            return;
        }

        limit = limit || arr.length;
        length = limit - 1;
        for (var x = 0; x < limit; x++) {
            var value = arr[x];
            var str = value[key];

            if (str) {
                return_string += str;
                if (x < length) {
                    return_string += delimiter;
                }
            }
        }

        return return_string;
    };
});

MovieDBApp.filter("poster_image", function() {

    return function(path, width) {
        return "http://image.tmdb.org/t/p/w" + width + path;
    };
});


MovieDBApp.provider("MovieDB", function() {

    var api_key = "";
    var config = {};
    var default_params = {

    };
    var cached_widths = {
        'poster_sizes': [],
        'profile_sizes': []
    };

    function getClosestWidth(width, type) {
        if (!cached_widths[type].length) {
            angular.forEach(config.images[type], function(value, key) {
                var substr = value.substr(1);
                var w = parseInt(substr);
                if (!isNaN(w)) {
                    cached_widths[type].push(w);
                }
            });

        }

        if (cached_widths[type].length) {
            for (var x = 0, i = cached_widths[type].length; x < i; x++) {
                w = cached_widths[type][x];
                if (width < w) {
                    width = w;
                    break;
                }
            }
        }
        return width;
    }

    function posterPath(path, width) {
        var image_src = '';
        if (config && config.images) {
            width = getClosestWidth(width, 'poster_sizes');
            image_src = config.images.base_url + "w" + width + path;
        }
        return image_src;
    }

    function profilePath(path, width) {
        var image_src = '';
        if (config && config.images) {
            width = getClosestWidth(width, 'profile_sizes');
            image_src = config.images.base_url + "w" + width + path;
        }
        return image_src;
    }


    function setConfig(data) {
        config = angular.fromJson(data);
        console.log("WOOT");
        return config;
    }

    function transformCredits(data) {
        var modified_data = angular.fromJson(data);

        modified_data.crew_by_job = {};
        // first change the crew to something more easliy used. to be keyed by job

        angular.forEach(modified_data.crew, function(crew_obj, key) {
            var job = crew_obj.job;
            if (angular.isArray(modified_data.crew_by_job[job])) {
                modified_data.crew_by_job[job].push(crew_obj);
            } else {
                modified_data.crew_by_job[job] = [crew_obj];
            }

        });
        return modified_data;

    }
    this.setApiKey = function(key) {
        api_key = key;
        default_params.api_key = key;
    };

    this.$get = function(MovieApi) {
        var api = MovieApi({
            api_key: api_key
        }, {
            movieCredits: transformCredits,
            configuration: setConfig

        });
        api.configuration();


        return {
            posterPath: posterPath,
            profilePath: profilePath,
            api: api
        };
    };
});
