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
