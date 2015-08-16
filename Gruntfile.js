module.exports = function(grunt) {

  grunt.initConfig({

    jshint: {
      files: {
        src: [
        'db/**/*.js',
        '*.js',
        'client/**/*.js',
        '!client/bower_components/**'
      ]},
    },


    watch: {
      scripts: {
        files: [
          'src/**/*.js',
        ],
        tasks: [
          'jshint'
        ]
      }
    }
  });

  // Don't worry about this one - it just works. You'll see when you run `grunt`.
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

 grunt.registerTask('watch', ['watch']);
  grunt.registerTask('default', [
    'jshint'
  ]);

};
