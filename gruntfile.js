/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

        banner: '/* hello */',

    uglify: {
        dist: {
            src: ['<%= banner %>', 'app/js/login.js'],
            dest: 'app/js/login.min.js'
        }
    }
  });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-banner');
    grunt.registerTask('default', ['uglify']);
};

