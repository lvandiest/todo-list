module.exports = function (config) {
    config.set({

            // base path, that will be used to resolve files and exclude
            basePath: '../',

            // frameworks to use
            frameworks: ['jasmine'],

            // list of files / patterns to load in the browser
            files: [
                'app/lib/jquery/jquery.min.js',
                'app/lib/angular/angular.min.js',
                'app/lib/angular-animate/angular-animate.min.js',
                'app/lib/angular-mocks/angular-mocks.js',
                'app/lib/jasmine-jquery/lib/jasmine-jquery.js',
                'app/js/*.js',
                'app/js/**/*.js',
                'app/partials/*.html',
                'test/unit/**/*Spec.js'
            ],

            plugins: [
                'karma-jasmine',
                'karma-junit-reporter',
                'karma-coverage',
                'karma-chrome-launcher',
                'karma-phantomjs-launcher'
            ],

            // list of files to exclude
            exclude: [
            ],

            // test results reporter to use
            // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
            reporters: ['progress', 'junit', 'coverage'],

            preprocessors: {
                'app/js/**/*.js': 'coverage'
            },

            coverageReporter: {
                reporters: [
                    {
                        type: 'html',
                        dir: 'reports/coverage',
                        subdir: function(browser) {
                            return browser.toLowerCase().split(/[ /-]/)[0];
                        }
                    },
                    {
                        type: 'text'
                    }
                ]
            },

            // the default configuration
            junitReporter: {
                outputDir: 'reports/junit',
                suite: ''
            },

            // enable / disable colors in the output (reporters and logs)
            colors: true,

            // level of logging
            // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
            logLevel: config.LOG_INFO,

            // enable / disable watching file and executing tests whenever any file changes
            autoWatch: true,

            // Start these browsers, currently available:
            // - Chrome
            // - ChromeCanary
            // - Firefox
            // - Opera
            // - Safari (only Mac)
            // - PhantomJS
            // - IE (only Windows)
            browsers: ['PhantomJS'],

            // If browser does not capture in given timeout [ms], kill it
            captureTimeout: 60000,

            // Continuous Integration mode
            // if true, it capture browsers, run tests and exit
            singleRun: false
        }
    );
};