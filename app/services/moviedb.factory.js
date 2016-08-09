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
