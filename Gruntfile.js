module.exports = function(grunt) {

    grunt.initConfig({

        express: {
            dev: {
                options: {
                    script: 'server.js'
                }
            }
        },

        browserify: {
            dist:{
                files: {
                    'public/js/app.js': ['client/src/js/main.js']
                }
            }
        },

        copy: {
            main: {
                files: [{
                    cwd: 'client/src/',
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
                files: ['client/src/**/*.js'],
                tasks: ['browserify']
            },
            resources: {
                files: ['client/src/**/*.html', 'client/src/**/*.css'],
                tasks: ['copy']
            },
            express: {
                files: ['server.js', 'server/**/*.js'],
                tasks: ['express:dev'],
                options: {
                    spawn: false
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('default', ['copy', 'browserify', 'express:dev', 'watch']);

}
