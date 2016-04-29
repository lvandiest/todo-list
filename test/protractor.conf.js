var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

exports.config = {

	seleniumAddress: 'http://localhost:4444/wd/hub',
	
	specs: [
		'protractor/specs/**/*Spec.js',
	],
    
    capabilities: {
        browserName: 'chrome',
        shardTestFiles: false
    },
    
	baseUrl: 'http://localhost:9000',

    framework: 'jasmine2',

    onPrepare: function() {
        // html and screenshot report
        jasmine.getEnv().addReporter(
            new Jasmine2HtmlReporter({
                savePath: 'reports/e2e',
                screenshotsFolder: 'screenshots',
                takeScreenshots: true,
                takeScreenshotsOnlyOnFailures: true,
                filePrefix: 'e2eReport'
            })
        );
    },

	jasmineNodeOpts: {
		// onComplete will be called just before the driver quits.
		onComplete: null,
		// If true, display spec names.
		isVerbose: false,
		// If true, print colors to the terminal.
		showColors: true,
		// If true, include stack traces in failures.
		includeStackTrace: true,
		// Default time to wait in ms before a test fails.
		defaultTimeoutInterval: 30000
	}
};
