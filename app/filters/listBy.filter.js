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
