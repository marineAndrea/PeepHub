module.exports = function(grunt) {

  grunt.initConfig({

    jshint: {
      files: {
        src: [
        'db/**/*.js',
        '*.js',
        'client/**/*.js',
        '!client/bower_components/**',
        '!**/*min.js'
      ]},
    },

    // uglify:{
    //   my_target: {
    //     files: {
    //       'client/style.min.css': ['src/input1.js', 'src/input2.js']
    //     }
    //   }
    // }

    // concat: {
    //   files{
    //     src: [

    //     ]
    //   }
    // }

    // uglify: {
    //     min: {
    //         files: grunt.file.expandMapping(['client/**/*.js', 'DB/**/*.js', '!client/bower_components/**/*/js'], 'minified/', {
    //             rename: function(destBase, destPath) {
    //                 return destBase+destPath.replace('.js', '.min.js');
    //             }
    //         })
    //     }
    // },

    'heroku-deploy' : {
        production : {
            deployBranch : 'prod'
        },
        staging : {
            deployBranch : 'staging'
        }
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
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-minified');

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

 grunt.registerTask('watch', ['watch']);
  grunt.registerTask('default', [
    'jshint'
  ]);

};
