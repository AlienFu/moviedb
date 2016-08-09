module.exports = function(grunt) {

    grunt.initConfig({
        concat: {
            "scripts/app.js": ['app/app.js', 'app/**/*factory.js', 'app/**/*controller.js', 'app/**/*']
        },
        watch: {
            scripts: {
                files: ['app/**/*.js'],
                tasks: ['concat'],
                options: {
                    spawn: false,
                },
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['watch']);
};
