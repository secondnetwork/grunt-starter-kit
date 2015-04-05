var request = require('request');
var wordthemeroot = '../wordpress_dev/wp-content/themes/Themename/';
module.exports = function(grunt) {
    
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-imageoptim');
	
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);
    
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
        browserSync: {
                dev: {
                    
                    options: {
                        proxy: 'localhost:8888/wordpress_dev', //our PHP server
                        files: [wordthemeroot+'style.css',
                                wordthemeroot+'newOrbit.css',
                                wordthemeroot+'js/**/*.js',
                                wordthemeroot+'**/*.php'],
                        //port: 8888, // our new port
                        watchTask: true,
                        debugInfo: true,
                        //logConnections: true,
                        notify: true,
                        logFileChanges: true

                        //server: {baseDir: "./build"}


                } 
            }
        },
        
        concat: {
			js: {
				src: ['assets/js/jquery-1.10.2.js', 'assets/js/plugins/*.js', 'assets/js/main.js'],
                dest: 'build/js/scripts.js',
			}
		},
        uglify: {
			js: {
				src: ['build/js/scripts.js'],
                dest: wordthemeroot+'js/scripts.min.js',
			}
		},
        sass: {         
            dist: {
                 options: {            
                  style: 'compressed'
                },
                files: [
                  {
                      expand: true, // Recursive Output style. Can be nested, compact, compressed, expanded.
                      cwd: "assets/sass/", // The startup directory
                      src: ["**/*.scss"], // Source files
                      dest: wordthemeroot, // Destination
                      ext: ".css" // File extension 
                  }
                ]
            }
        },
        imageoptim: {
              myTask: {
                  src: ['public/assets/site', 'public/assets/images']
              }
        },
		watch: {
            js: {files: ['assets/js/**/*.js'],
                tasks: ['concat','uglify']
            },
			css: {
				files: 'assets/sass/**/*.{scss,sass}',
				tasks: ['sass']
			},

            
		}
	});
    // Optimize images.
    grunt.registerTask('img', ['imageoptim']);
    
    grunt.registerTask('default',['concat','uglify','browserSync', 'watch']);
}