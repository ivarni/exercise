module.exports = function(grunt) {

    grunt.initConfig({

        connect: {
            server: {
                options: {
                    port: 8000,
                    base: 'public',
                    keepalive: true
                }
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-connect');


}
