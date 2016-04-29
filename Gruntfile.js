
/* global module, require */
'use strict';

var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet, _os = require('os');
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {

    // Load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    
    // Set variables
    var serverPort          = grunt.option('serverPort') || 9000;
    var reloadPort          = grunt.option('reloadPort') || serverPort + 1;
    var phantomPort 	    = grunt.option('phantomPort') || 9515;
    var hostname            = grunt.option('hostname') || '0.0.0.0';
    var protractorHostname  = grunt.option('protractor-host') || 'localhost';
    var seleniumAddress     = grunt.option('seleniumAddress') || 'http://localhost:4444/wd/hub';

    grunt.initConfig({
        livereload: {
            port: reloadPort + 1
        },
        
        watch: {
			options: {
				nospawn: true,
				livereload: reloadPort
			},
			// Live reload for web server
			livereload: {
				files: [
					'app/{,*/}*.html',
					'app/{css/{,*/}*.css',
					'app/js/{,*/}*.js',
					'app/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
				],
				tasks: ['livereload']
			},
			// Watch sass files and run the sass task when they change
			sass: {
				files: 'app/sass/*.scss',
				tasks: ['sass']
			}
		},
        
		// Start a webserver
        connect: {
            options: {
                port: serverPort,
                // change this to '0.0.0.0' to access the server from outside
                hostname: hostname
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.')
                        ];
                    }
                }
            },
            test: {
                options: {
                    middleware: function(connect) {
                        return [
                            mountFolder(connect, '')
                        ];
                    }
                }
            }
        },
        
        // Open files in default browser
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>/app/index.html'//,
                //app: 'Chrome'
            },
            coverage: {
                path: 'http://localhost:<%= connect.options.port %>/reports/coverage/phantomjs/index.html'//,
                //app: 'Chrome'
            }
        },
        
        // Start PhantomJS
		phantom: {
			options: {
				port: phantomPort
			},
			protractor: {}
		},
        
        // Run protractor E2E tests
        // Start a selenium server first!
        // $ ./node_modules/protractor/bin webdriver-manager start --seleniumPort [port]
        protractor: {
            options: {
                keepAlive: false,
                noColor: false
            },
            e2e: {
                options: {
                    configFile: 'test/protractor.conf.js',
                    args: {
                        capabilities: {
                            'browserName': 'chrome'
                        },
                        baseUrl: 'http://' + protractorHostname + ':' + serverPort,
                        seleniumAddress: seleniumAddress
                    }
                }
            }
        },
        
        // Run JSHint code quality report
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-junit-reporter'),
				reporterOutput: 'reports/jshint/jshint.xml'
			}, files: {
				src: ['app/js/{,*/}*.js']
			}
		},
        
        // Run Karma unit tests and create a code coverage report
        karma: {
            options: {
                singleRun: true,
                browsers: ['PhantomJS'],
                reporters: ['progress', 'coverage', 'junit']
            },
            unit: {
                configFile: 'test/karma.conf.js'
            }
        },
        
        // Compile SASS
		sass: {
			options: {
				sourceMap: false,
				style: 'compressed'
			},
			dist: {
				/*files: {
					'app/css/app.css': 'app/sass/*.scss'
				},*/
                files: [{
                    expand: true,
                    cwd: 'app/sass/',
                    src: '*.scss',
                    dest: 'app/css',
                    ext: '.css'
                }],
			}
		},
        
    });

    /**
     * @description Starts a grunt webserver.
     * @param serverPort string Port to start the server on. Default is 9000.
     * @example Run '$ grunt server --serverPort=9999'
     */
    grunt.registerTask('server', [
        'livereload-start',
        'connect:livereload',
        'open:server',
        'watch'
    ]);
        
    /**
     * @description Runs all unit tests and opens the coverage report in the default browser.
     * @param serverPort string The port the webserver is running on.
     * @example Run '$ grunt unit-test --serverPort=9999'
     */
    grunt.registerTask('unit-test', [
        'karma:unit',
        'open:coverage'
    ]);

    /**
     * @description Starts a new webserver and then runs all protractor E2E tests. Requires a running selenium server!
     * Start a selenium server with webdriver:
     * $ ./node_modules/protractor/bin webdriver-manager start --seleniumPort [port]
     * @param serverPort string Port to start the webserver on. Default is 9999.
     * @param seleniumAddress string Address of the selenium server to use. Default is 'http://localhost:4444/wd/hub'.
     * @example Run '$ grunt e2e-test --serverPort=9999 --seleniumAddress=http://localhost:5555/wd/hub'
     */
	grunt.registerTask('e2e-test',[
		'connect:test',
		'protractor:e2e',
	]);
    
};