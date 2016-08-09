MovieDBApp.filter("poster_image", function() {

    return function(path, width) {
        return "http://image.tmdb.org/t/p/w" + width + path;
    };
});
