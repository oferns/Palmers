/// <binding />
// This file in the main entry point for defining grunt tasks and using grunt plugins.
// Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
module.exports = function (grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //bower: {
        //    install: {
        //        options: {
        //            targetDir: "wwwroot/lib",
        //            layout: "byComponent",
        //            cleanTargetDir: true
        //        }
        //    }
        //},

        // Sass
        sass: {
            options: {
                sourceMap: true, // Create source map
                outputStyle: 'compressed', // Minify output 
                noCache: true
            },
            dist: {
                files: [
                  {
                      expand: true, // Recursive
                      cwd: "sass", // The startup directory
                      src: ["**/*.scss"], // Source files
                      dest: "wwwroot/css", // Destination
                      ext: ".css" // File extension 
                  }
                ]
            }
        },

        concat: {
            bootstrap: {
                src: [
                    'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/transition.js'
                    , 'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/alert.js'
                    , 'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/button.js'
                    , 'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/carousel.js'
                    , 'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/collapse.js'
                    , 'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/dropdown.js'
                    , 'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/modal.js'
                    , 'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tooltip.js'
                    , 'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/popover.js'
                    , 'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/scrollspy.js'
                    , 'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tab.js'
                    , 'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/affix.js'
                ],
                dest: 'wwwroot/js/bootstrap.js'
            }
        },

        copy: {
            font_bootstrap: {
                //for bootstrap fonts
                expand: true,
                dot: true,
                flatten: true,
                cwd: 'bower_components/bootstrap-sass-official/assets',
                src: ['fonts/bootstrap/*'],
                dest: 'wwwroot/fonts'
            },
            font_awesome: {
                expand: true,
                flatten: true,
                cwd: 'bower_components/font-awesome-sass/assets',
                src: ['fonts/font-awesome/*'],
                dest: 'wwwroot/fonts'
            }
        },

        // Autoprefixer
        autoprefixer: {
            options: {
                browsers: ['last 2 versions'],
                map: true // Update source map (creates one if it can't find an existing map)
            },

            // Prefix all files
            multiple_files: {
                src: 'wwwroot/css/**/*.css'
            },
        },

        // Watch
        watch: {
            css: {
                files: ['**/*.scss'],
                tasks: ['sass', 'autoprefixer'],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.registerTask('dev', ['sass', 'concat', 'copy', 'autoprefixer', 'watch']);
    grunt.registerTask('prod', ['sass', 'concat', 'copy', 'autoprefixer']);
};