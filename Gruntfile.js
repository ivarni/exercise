module.exports = function(grunt) {

    grunt.initConfig({

        connect: {
            server: {
                options: {
                    port: 8000,
                    base: 'public'
                }
            }
        },

        browserify: {
            dist:{
                files: {
                    'public/js/app.js': ['src/js/main.js']
                }
            }
        },

        copy: {
            main: {
                files: [{
                    cwd: 'src/',
                    expand: true,
                    src: '**',
                    dest: 'public/',
                    filter: function(file) {
                        return file.substring(file.length - 3) !== '.js';
                    }
                }]
            }
        },

        watch: {
            scripts: {
                files: ['src/**/*.js'],
                tasks: ['browserify']
            },
            resources: {
                files: ['src/**/*.html', 'src/**/*.css'],
                tasks: ['copy']
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('default', ['copy', 'browserify', 'connect:server', 'watch']);

}
